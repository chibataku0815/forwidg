/**
 * @file Stripe顧客ポータル作成ハンドラー
 *
 * このファイルは、ユーザーのStripe顧客ポータルセッションを作成します。
 * 主に、ユーザーの認証、サブスクリプション確認、Stripe顧客の作成または取得、
 * そしてポータルセッションの作成を行います。
 *
 * @path apps/dashboard/src/app/api/stripe/create-portal/route.ts
 */

import { stripe } from "@/services/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * ユーザーのサブスクリプション情報を取得します
 * @param {string} userId - ユーザーID
 * @returns {Promise<{ stripeCustomerId: string } | null>} サブスクリプション情報 または null
 */
async function getUserSubscription(userId: string) {
  return db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
}

/**
 * 新しいStripe顧客を作成し、データベースに保存します
 * @param {string} userId - ユーザーID
 * @returns {Promise<{ id: string }>} 作成されたStripe顧客情報
 * @throws {Error} Stripe顧客の作成に失敗した場合
 */
async function createStripeCustomer(userId: string) {
  try {
    const customerData = { metadata: { dbId: userId } };
    const response = await stripe.customers.create(customerData);

    if (!response.id) {
      throw new Error("Stripe顧客の作成に失敗しました。response.id が undefined です。");
    }

    await db.insert(subscriptions).values({
      userId,
      stripeCustomerId: response.id,
    });
    return { id: response.id };
  } catch (error) {
    console.error("createStripeCustomer関数でエラーが発生しました:", { userId, error });
    throw new Error(`createStripeCustomer関数でエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
}

/**
 * Stripe顧客ポータルセッションを作成します
 * @param {string} customerId - Stripe顧客ID
 * @returns {Promise<{ url: string }>} 作成されたポータルセッションのURL
 * @throws {Error} ポータルセッションの作成に失敗した場合
 */
async function createPortalSession(customerId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${baseUrl}/payments`,
    });

    if (!session.url) {
      throw new Error("ポータルセッションの作成に失敗しました。session.url が undefined です。");
    }

    return { url: session.url };
  } catch (error) {
    console.error("createPortalSession関数でエラーが発生しました:", { customerId, error });
    throw new Error(`createPortalSession関数でエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
}

/**
 * POSTリクエストを処理するハンドラー
 *
 * @param {Request} req - リクエストオブジェクト
 * @returns {Promise<Response>} レスポンスオブジェクト
 */
export async function POST(req: Request): Promise<Response> {
  /**
   * 処理の流れ:
   * 1. ユーザー認証を確認
   * 2. ユーザーのサブスクリプション情報を取得
   * 3. Stripe顧客IDを取得または新規作成
   * 4. Stripe顧客ポータルセッションを作成
   * 5. ポータルセッションのURLを返す
   */
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userSubscription = await getUserSubscription(userId);

    // Stripe顧客IDを取得または新規作成
    const customerId = userSubscription?.stripeCustomerId || (await createStripeCustomer(userId)).id;

    if (!customerId) {
      return new Response(JSON.stringify({ error: "Failed to get or create a customer id" }), { status: 500 });
    }

    // Stripe顧客ポータルセッションを作成
    const portalSession = await createPortalSession(customerId);

    return new Response(JSON.stringify({ url: portalSession.url }), { status: 200 });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return new Response(JSON.stringify({ error: `Internal server error: ${error instanceof Error ? error.message : '不明なエラー'}` }), { status: 500 });
  }
}
