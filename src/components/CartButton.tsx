"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useTranslations } from "next-intl";

export function CartButton() {
  const { itemCount, openCart } = useCart();
  const t = useTranslations("nav");

  return (
    <button
      onClick={openCart}
      aria-label={t("cart")}
      className="relative flex items-center gap-2 rounded-full p-2 text-charcoal transition-colors hover:text-terracotta"
    >
      <ShoppingBag size={22} strokeWidth={1.75} />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-xs font-semibold text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}
