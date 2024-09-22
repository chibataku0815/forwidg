import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * ユーザーのサブスクリプションが有効かどうかを確認する
 * @example
 * const isActive = await isSubscriptionActive("user-id");
 */
export async function isSubscriptionActive(userId: string): Promise<boolean> {
  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
  if (!userSubscription) {
    return false;
  }

  // 'subscribed'プロパティが存在しない場合はfalseを返す
  if (typeof userSubscription.subscribed !== 'boolean') {
    throw new Error(`Invalid subscription status for userId: ${userId}`);
  }

  return userSubscription.subscribed;
}
