/**
 * @file Stripeチェックアウトセッション作成APIハンドラー
 * @description このファイルは、Stripeのチェックアウトセッションを作成するためのAPIエンドポイントを定義します。
 * ユーザー認証、顧客作成、サブスクリプション管理を行います。
 */

import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * POSTリクエストを処理する関数
 * @param {Request} req - リクエストオブジェクト
 * @returns {Promise<Response>} レスポンスオブジェクト
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const { price, quantity = 1 } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    const customer = await getOrCreateCustomer(userId);

    if (!customer?.id) {
      return createErrorResponse("Failed to get a customer id", 500);
    }

    const session = await createCheckoutSession(customer.id, price, quantity);

    if (!session) {
      return createErrorResponse("Failed to create a session", 500);
    }

    return new Response(JSON.stringify({ sessionId: session.id }), { status: 200 });
  } catch (error) {
    console.error(error);
    return createErrorResponse("Failed to create a session", 500);
  }
}

/**
 * 顧客を取得または作成する関数
 * @param {string} userId - ユーザーID
 * @returns {Promise<{ id: string } | null>} 顧客オブジェクト
 */
async function getOrCreateCustomer(userId: string): Promise<{ id: string } | null> {
  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  if (userSubscription) {
    return { id: userSubscription.stripeCustomerId };
  }

  const response = await stripe.customers.create({
    metadata: { dbId: userId },
  });

  await db.insert(subscriptions).values({
    userId,
    stripeCustomerId: response.id,
  });

  return { id: response.id };
}

/**
 * チェックアウトセッションを作成する関数
 * @param {string} customerId - 顧客ID
 * @param {string} price - 価格ID
 * @param {number} quantity - 数量
 * @returns {Promise<Stripe.Checkout.Session | null>} チェックアウトセッション
 */
async function createCheckoutSession(
  customerId: string,
  price: string,
  quantity: number
): Promise<Stripe.Checkout.Session | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return stripe.checkout.sessions.create({
    success_url: `${baseUrl}/payments/checkout-success`,
    customer: customerId,
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price, quantity }],
  });
}

/**
 * エラーレスポンスを作成する関数
 * @param {string} message - エラーメッセージ
 * @param {number} status - HTTPステータスコード
 * @returns {Response} エラーレスポンス
 */
function createErrorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), { status });
}
