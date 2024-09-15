import Stripe from "stripe";

console.log("😄process.env.STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || " ", {
  apiVersion: "2024-06-20",
  typescript: true,
});
