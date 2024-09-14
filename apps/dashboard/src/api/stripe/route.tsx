/**
 * @file Stripeチェックアウトセッション作成APIハンドラー
 * @description このファイルは、Stripeのチェックアウトセッションを作成するためのAPIエンドポイントを定義します。
 * ユーザー認証、顧客作成、サブスクリプション管理を行います。
 * @path apps/dashboard/src/api/stripe/route.tsx
 */

import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Stripe } from "stripe";
import { NextResponse } from "next/server";

/**
 * POSTリクエストを処理する関数
 *
 * 1. リクエストボディから価格と数量を取得します。
 * 2. Clerkを使ってユーザーを認証します。
 * 3. 認証に成功したら、`getOrCreateCustomer` 関数を使って顧客を取得または作成します。
 * 4. 顧客の作成に成功したら、`createCheckoutSession` 関数を使ってチェックアウトセッションを作成します。
 * 5. セッションの作成に成功したら、セッションIDを含むJSONレスポンスを返します。
 * 6. エラーが発生した場合は、エラーメッセージを含むJSONレスポンスを返します。
 *
 * @param {Request} req - リクエストオブジェクト
 * @returns {Promise<NextResponse>} レスポンスオブジェクト
 */
export async function POST(req: Request): Promise<NextResponse> {
	try {
		const { price, quantity = 1 } = await req.json();
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const customer = await getOrCreateCustomer(userId);

		if (!customer) {
			return new NextResponse("Failed to get a customer id", { status: 500 });
		}

		const session = await createCheckoutSession(customer.id, price, quantity);

		if (!session) {
			return new NextResponse("Failed to create a session", { status: 500 });
		}
		return NextResponse.json({ sessionId: session.id });
	} catch (error) {
		console.error("Error in POST /api/stripe/route:", error);
		return new NextResponse("Failed to create a session", {
			status: 500,
		});
	}
}

/**
 * 顧客を取得または作成する関数
 *
 * 1. ユーザーのサブスクリプションをデータベースから取得します。
 * 2. サブスクリプションが存在し、Stripeの顧客IDが設定されている場合は、その顧客IDを返します。
 * 3. サブスクリプションが存在しないか、Stripeの顧客IDが設定されていない場合は、Stripe APIを使って新しい顧客を作成します。
 * 4. 新しい顧客の作成に成功したら、データベースにサブスクリプションを作成します。
 * 5. 顧客IDを返します。
 *
 * @param {string} userId - ユーザーID
 * @returns {Promise<{ id: string } | null>} 顧客オブジェクト
 */
async function getOrCreateCustomer(
	userId: string,
): Promise<{ id: string } | null> {
	const userSubscription = await db.query.subscriptions.findFirst({
		where: eq(subscriptions.userId, userId),
	});

	if (userSubscription?.stripeCustomerId) {
		return { id: userSubscription.stripeCustomerId };
	}

	const customer = await stripe.customers.create({
		metadata: { dbId: userId },
	});

	if (!customer.id) {
		return null;
	}

	await db.insert(subscriptions).values({
		userId,
		stripeCustomerId: customer.id,
	});

	return { id: customer.id };
}

/**
 * チェックアウトセッションを作成する関数
 *
 * 1. ベースURLを取得します。
 * 2. Stripe APIを使ってチェックアウトセッションを作成します。
 * 3. セッションを返します。
 *
 * @param {string} customerId - 顧客ID
 * @param {string} price - 価格ID
 * @param {number} quantity - 数量
 * @returns {Promise<Stripe.Checkout.Session | null>} チェックアウトセッション
 */
async function createCheckoutSession(
	customerId: string,
	price: string,
	quantity: number,
): Promise<Stripe.Checkout.Session | null> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

	const session = await stripe.checkout.sessions.create({
		success_url: `${baseUrl}/payments/checkout-success`,
		customer: customerId,
		payment_method_types: ["card"],
		mode: "subscription",
		line_items: [{ price, quantity }],
	});

	return session;
}
