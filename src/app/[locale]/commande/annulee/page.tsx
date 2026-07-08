import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CheckoutCancelPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl text-charcoal">{t("cancelTitle")}</h1>
      <p className="mt-4 text-charcoal/80">{t("cancelText")}</p>
      <Link
        href="/panier"
        className="mt-8 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta-dark"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
