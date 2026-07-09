"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const t = useTranslations("cart");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout error");
      }
      window.location.href = data.url;
    } catch {
      setError(
        locale === "fr"
          ? "Le paiement n'est pas encore configuré. Merci de réessayer plus tard."
          : "Payment is not configured yet. Please try again later."
      );
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-charcoal">{t("title")}</h1>

      {items.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-charcoal/60">{t("empty")}</p>
          <Link
            href="/produits"
            className="mt-6 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta-dark"
          >
            {t("continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          <ul className="space-y-6 md:col-span-2">
            {items.map((item) => (
              <li
                key={`${item.slug}-${item.size}-${item.color}`}
                className="flex gap-4 border-b border-sand-dark pb-6"
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-sand-dark">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="font-medium text-charcoal">{item.name}</p>
                    <p className="text-sm text-charcoal/60">
                      {t("size")}: {item.size} · {item.color}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        className="h-7 w-7 rounded-full border border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
                        onClick={() =>
                          updateQuantity(item.slug, item.size, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-5 text-center">{item.quantity}</span>
                      <button
                        className="h-7 w-7 rounded-full border border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
                        onClick={() =>
                          updateQuantity(item.slug, item.size, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="font-medium text-charcoal">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug, item.size)}
                    className="mt-1 self-start text-xs text-charcoal/50 underline hover:text-terracotta"
                  >
                    {t("remove")}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-xl border border-sand-dark p-6">
            <div className="flex items-center justify-between text-charcoal">
              <span className="font-medium">{t("subtotal")}</span>
              <span className="font-display text-xl">
                {formatPrice(subtotal, items[0]?.currency ?? "EUR")}
              </span>
            </div>
            {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-full bg-terracotta py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark disabled:opacity-60"
            >
              {loading ? "…" : t("checkout")}
            </button>
            <Link
              href="/produits"
              className="mt-3 block text-center text-sm text-charcoal/60 hover:text-terracotta"
            >
              {t("continueShopping")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
