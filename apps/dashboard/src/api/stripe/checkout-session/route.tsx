import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { price } = await req.json();

		const subscription = await db.query.subscriptions.findFirst({
			where: eq(subscriptions.userId, userId),
		});

		let stripeCustomerId = subscription?.stripeCustomerId;

		if (!stripeCustomerId) {
			const customer = await stripe.customers.create({
				metadata: {
					userId,
				},
			});
			stripeCustomerId = customer.id;

			await db.insert(subscriptions).values({
				userId,
				stripeCustomerId,
			});
		}

		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

		const session = await stripe.checkout.sessions.create({
			customer: stripeCustomerId,
			line_items: [
				{
					price,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${baseUrl}/dashboard`,
		});

		return NextResponse.json({ sessionId: session.id });
	} catch (error) {
		console.error("Error in POST /api/stripe/checkout-session:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
