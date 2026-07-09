"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types/product";

export function AddToCartForm({
  product,
  name,
  color,
}: {
  product: Product;
  name: string;
  color: string;
}) {
  const t = useTranslations("shop");
  const tProduct = useTranslations("product");
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (product.price === null) {
    return (
      <div className="space-y-4 rounded-xl border border-sand-dark p-5">
        <p className="text-sm text-charcoal/70">{tProduct("priceOnRequestNote")}</p>
        <Link
          href="/contact"
          className="block w-full rounded-full bg-terracotta py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
        >
          {tProduct("requestPrice")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-charcoal">{t("sizeLabel")}</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                size === s
                  ? "border-terracotta bg-terracotta text-white"
                  : "border-sand-dark text-charcoal/70 hover:border-terracotta"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-charcoal">{tProduct("quantity")}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-9 w-9 rounded-full border border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
          >
            −
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="h-9 w-9 rounded-full border border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
          >
            +
          </button>
        </div>
      </div>

      <button
        disabled={!product.inStock}
        onClick={() => {
          addItem({ ...product, price: product.price as number }, name, color, size, quantity);
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
        className="w-full rounded-full bg-terracotta py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:bg-charcoal/30"
      >
        {!product.inStock ? t("outOfStock") : added ? "✓" : tProduct("addToCart")}
      </button>
    </div>
  );
}
