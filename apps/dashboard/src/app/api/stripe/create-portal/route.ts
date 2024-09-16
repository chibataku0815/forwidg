/**
 * @file Stripe顧客ポータル作成ハンドラー
 *
 * このファイルは、ユーザーのStripe顧客ポータルセッションを作成します。
 * 主に、ユーザーの認証、サブスクリプション確認、Stripe顧客の作成または取得、
 * そしてポータルセッションの作成を行います。
 *
 * @path apps/dashboard/src/app/api/stripe/create-portal/route.ts
 */

import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * ユーザーのサブスクリプション情報を取得します
 * @param {string} userId - ユーザーID
 * @returns {Promise<{ stripeCustomerId: string } | null>} サブスクリプション情報
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
 */
async function createStripeCustomer(userId: string) {
  const customerData = { metadata: { dbId: userId } };
  const response = await stripe.customers.create(customerData);
  await db.insert(subscriptions).values({
    userId,
    stripeCustomerId: response.id,
  });
  return { id: response.id };
}

/**
 * Stripe顧客ポータルセッションを作成します
 * @param {string} customerId - Stripe顧客ID
 * @returns {Promise<{ url: string }>} 作成されたポータルセッションのURL
 */
async function createPortalSession(customerId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${baseUrl}/payments`,
  });
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

  const { userId } = auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    // ユーザーのサブスクリプション情報を取得
    const userSubscription = await getUserSubscription(userId);

    // Stripe顧客IDを取得または新規作成
    const customerId = userSubscription?.stripeCustomerId || (await createStripeCustomer(userId)).id;

    if (!customerId) {
      return new Response(JSON.stringify({ error: "Failed to get or create a customer id" }), { status: 500 });
    }

    // Stripe顧客ポータルセッションを作成
    const portalSession = await createPortalSession(customerId);

    if (portalSession?.url) {
      return new Response(JSON.stringify({ url: portalSession.url }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Failed to create a portal session" }), { status: 500 });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
