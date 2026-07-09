import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedUrls } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const { languages, canonicalFor } = localizedUrls("/a-propos");
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: canonicalFor(locale), languages },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-charcoal">{t("title")}</h1>
      <p className="mt-6 text-lg text-charcoal/80">{t("intro")}</p>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl">
        <Image src="/images/placeholders/hero.svg" alt="" fill className="object-cover" />
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-charcoal">{t("missionTitle")}</h2>
          <p className="mt-3 text-charcoal/80">{t("missionText")}</p>
        </div>
        <div>
          <h2 className="font-display text-xl text-charcoal">{t("qualityTitle")}</h2>
          <p className="mt-3 text-charcoal/80">{t("qualityText")}</p>
        </div>
      </div>
    </div>
  );
}
