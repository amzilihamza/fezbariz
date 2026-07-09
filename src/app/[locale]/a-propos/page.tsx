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
    <div>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden">
        <Image src="/images/story/garde-royale.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6">
          <h1 className="font-display text-4xl text-white">{t("title")}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <p className="text-lg text-charcoal/80">{t("intro")}</p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl">
          <Image src="/images/brand/boutique-ambiance.jpg" alt="" fill className="object-cover" />
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

      <section className="bg-forest/5 py-16">
        <div className="mx-auto grid max-w-4xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-2xl text-charcoal">{t("craftTitle")}</h2>
            <p className="mt-4 text-charcoal/80">{t("craftText")}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/images/story/calligraphe.jpg" alt="" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:col-span-2 sm:row-span-2 sm:aspect-auto">
            <Image src="/images/story/medersa.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src="/images/story/tannerie.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src="/images/story/fontaine-bleue.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src="/images/story/artisan-zellige.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src="/images/story/fontaine-vannerie.jpg" alt="" fill className="object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
