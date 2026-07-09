import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { localizedUrls } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const { languages, canonicalFor } = localizedUrls("/contact");
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: canonicalFor(locale), languages },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-charcoal">{t("title")}</h1>
      <p className="mt-4 text-charcoal/80">{t("intro")}</p>

      <div className="mt-10">
        <ContactForm />
      </div>

      <p className="mt-8 text-sm text-charcoal/60">
        {t("or")}: <span className="font-medium text-charcoal">contact@fezbariz.ma</span>
      </p>
    </div>
  );
}
