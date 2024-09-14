import { loadStripe } from "@stripe/stripe-js";
import type { Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY || "");
  }
  return stripePromise;
};