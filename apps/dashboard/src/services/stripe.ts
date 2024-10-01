/**
 * @file Stripeサービス
 *
 * このファイルは、Stripe APIを操作するためのStripeインスタンスをエクスポートします。
 * シークレットキーを使用して初期化され、APIバージョンとTypeScriptの型指定が設定されています。
 */

import Stripe from "stripe";

/**
 * Stripeサーバーインスタンスを作成します
 * @returns {Stripe} Stripeインスタンス
 * @throws {Error} STRIPE_SECRET_KEY が未定義の場合
 */
const createStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY が未定義です。.env ファイルに設定してください。");
  }

  return new Stripe(secretKey, {
    apiVersion: "2024-06-20",
    typescript: true,
  });
};

export const stripe = createStripeInstance();
