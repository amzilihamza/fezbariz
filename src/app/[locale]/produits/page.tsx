import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { families } from "@/lib/products";
import { localizedUrls } from "@/lib/site";

const familyImages: Record<string, string> = {
  homme: "/images/products/gandoura-vert-porte.jpg",
  femme: "/images/products/caftan-blanc-creme-1.jpg",
  enfant: "/images/products/jabador-dore-1.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  const { languages, canonicalFor } = localizedUrls("/produits");
  return {
    title: t("title"),
    alternates: { canonical: canonicalFor(locale), languages },
  };
}

export default async function ShopHubPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shop");
  const tNav = await getTranslations("nav");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-charcoal">{t("title")}</h1>
      <p className="mt-3 max-w-xl text-charcoal/70">{t("hubIntro")}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {families.map((famille) => (
          <Link
            key={famille}
            href={`/produits/${famille}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl"
          >
            <Image
              src={familyImages[famille]}
              alt={tNav(famille)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5">
              <span className="font-display text-2xl text-white">{tNav(famille)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
