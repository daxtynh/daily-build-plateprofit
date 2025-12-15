import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  return new Stripe(key);
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe();

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables." },
        { status: 500 }
      );
    }

    const { priceType } = await request.json();

    const prices: Record<string, { amount: number; interval?: "month" | "year" }> = {
      monthly: { amount: 1900, interval: "month" },
      yearly: { amount: 14900, interval: "year" },
    };

    const selectedPrice = prices[priceType] || prices.monthly;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "PlateProfit Pro",
              description: "Full access to recipe costing and profit analysis",
            },
            unit_amount: selectedPrice.amount,
            recurring: selectedPrice.interval
              ? { interval: selectedPrice.interval }
              : undefined,
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${request.headers.get("origin")}/?success=true`,
      cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      subscription_data: {
        trial_period_days: 7,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
