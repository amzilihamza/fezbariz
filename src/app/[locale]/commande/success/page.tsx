"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const t = useTranslations("checkout");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl text-charcoal">{t("successTitle")}</h1>
      <p className="mt-4 text-charcoal/80">{t("successText")}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta-dark"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
