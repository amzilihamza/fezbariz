"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const t = useTranslations("cart");

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sand shadow-2xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-sand-dark px-5 py-4">
          <h2 className="font-display text-xl text-charcoal">{t("title")}</h2>
          <button onClick={closeCart} aria-label="Close" className="p-1 text-charcoal/70 hover:text-charcoal">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-charcoal/60">{t("empty")}</p>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={`${item.slug}-${item.size}-${item.color}`} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-sand-dark">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-charcoal">{item.name}</p>
                      <p className="text-xs text-charcoal/60">
                        {t("size")}: {item.size} · {item.color}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          className="h-6 w-6 rounded-full border border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
                          onClick={() =>
                            updateQuantity(item.slug, item.size, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm">{item.quantity}</span>
                        <button
                          className="h-6 w-6 rounded-full border border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
                          onClick={() =>
                            updateQuantity(item.slug, item.size, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-charcoal">
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
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sand-dark px-5 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-charcoal/70">{t("subtotal")}</span>
              <span className="font-display text-lg text-charcoal">
                {formatPrice(subtotal, items[0]?.currency ?? "EUR")}
              </span>
            </div>
            <Link
              href="/panier"
              onClick={closeCart}
              className="block w-full rounded-full bg-terracotta py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
            >
              {t("checkout")}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
