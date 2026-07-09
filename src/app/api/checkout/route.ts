import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/products";

type CheckoutItem = {
  slug: string;
  size: string;
  color: string;
  quantity: number;
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured on this server." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const items: CheckoutItem[] = body.items ?? [];
  const locale: "fr" | "en" = body.locale === "en" ? "en" : "fr";

  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  // Prices are always resolved from the server-side catalog, never trusted from the client.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const product = getProductBySlug(item.slug);
    if (!product || !product.inStock || product.price === null) {
      return NextResponse.json(
        { error: `Product unavailable: ${item.slug}` },
        { status: 400 }
      );
    }
    const quantity = Math.min(Math.max(Math.trunc(item.quantity), 1), 20);
    lineItems.push({
      quantity,
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name[locale],
          description: `${item.size} · ${product.color[locale]}`,
        },
      },
    });
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/${locale}/commande/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/commande/annulee`,
      shipping_address_collection: {
        allowed_countries: ["MA", "FR", "ES", "BE", "US", "CA", "GB"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
