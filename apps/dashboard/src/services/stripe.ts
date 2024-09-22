import Stripe from "stripe";

/**
 * Stripeサーバーインスタンスを作成する
 * @returns {Stripe} Stripeインスタンス
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || " ", {
  apiVersion: "2024-06-20",
  typescript: true,
});
