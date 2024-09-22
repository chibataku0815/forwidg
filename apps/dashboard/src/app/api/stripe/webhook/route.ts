/**
 * @file Stripeウェブフックハンドラー
 *
 * このファイルは、Stripeからのウェブフックイベントを処理します。
 * 主に、サブスクリプションの作成と削除に関するイベントを扱います。
 *
 * @path apps/dashboard/src/api/webhook/route.ts
 */

import type Stripe from "stripe";
import { stripe } from "@/services/stripe";
import { createSubscription, cancelSubscription } from "@/actions/userSubscriptions";

// 処理対象のStripeイベント
const RELEVANT_EVENTS = {
  CHECKOUT_SESSION_COMPLETED: "checkout.session.completed",
  SUBSCRIPTION_CREATED: "customer.subscription.created",
  SUBSCRIPTION_DELETED: "customer.subscription.deleted",
} as const;

// RELEVANT_EVENTSの値の型を定義
type RelevantEventType = typeof RELEVANT_EVENTS[keyof typeof RELEVANT_EVENTS];

/**
 * ウェブフックシークレットを取得します
 * @returns {string | undefined} ウェブフックシークレット
 */
const getWebhookSecret = (): string | undefined => {
  return process.env.NODE_ENV === "production"
    ? process.env.STRIPE_WEBHOOK_SECRET
    : process.env.STRIPE_WEBHOOK_LOCAL_SECRET;
};

/**
 * Stripeイベントを処理します
 * @param {Stripe.Event} event - Stripeイベント
 */
const handleStripeEvent = async (event: Stripe.Event) => {
  const data = event.data.object as Stripe.Subscription;

  switch (event.type) {
    case RELEVANT_EVENTS.SUBSCRIPTION_CREATED:
      await createSubscription({ stripeCustomerId: data.customer as string });
      break;
    case RELEVANT_EVENTS.SUBSCRIPTION_DELETED:
      await cancelSubscription({ stripeCustomerId: data.customer as string });
      break;
    // 他のイベントタイプも必要に応じて追加
  }
};

/**
 * POSTリクエストを処理するハンドラー
 *
 * 1. リクエストボディとStripe署名を取得します。
 * 2. ウェブフックシークレットを取得します。
 * 3. シークレットまたは署名がない場合は、エラーレスポンスを返します。
 * 4. Stripeイベントを構築します。
 * 5. イベントが処理対象かどうかを確認します。
 * 6. 処理対象の場合は、対応するイベントハ��ドラーを呼び出します。
 * 7. 正常に処理された場合は、成功レスポンスを返します。
 * 8. エラーが発生した場合は、エラーログを出力し、エラーレスポンスを返します。
 *
 * @param {Request} req - リクエストオブジェクト
 * @returns {Response} レスポンスオブジェクト
 */
export async function POST(req: Request): Promise<Response> {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = getWebhookSecret();

  if (!webhookSecret) {
    return new Response("Webhook secret not set", { status: 400 });
  }

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // イベントタイプをRelevantEventTypeとして扱い、includesメソッドを使用
    if (Object.values(RELEVANT_EVENTS).includes(event.type as RelevantEventType)) {
      await handleStripeEvent(event);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 400 });
  }
}
