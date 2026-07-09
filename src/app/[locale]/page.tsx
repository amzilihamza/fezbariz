import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ReviewCard } from "@/components/ReviewCard";
import { families, getFeaturedProducts } from "@/lib/products";
import { getFeaturedReviews } from "@/lib/reviews";

const familyImages: Record<string, string> = {
  homme: "/images/products/gandoura-bordeaux-porte.jpg",
  femme: "/images/products/caftan-bleu-roi-porte.jpg",
  enfant: "/images/products/jabador-bleu-1.jpg",
};

const craftPieces = [
  {
    image: "/images/story/tannerie.jpg",
    labelKey: "craftDye",
  },
  {
    image: "/images/story/artisan-zellige.jpg",
    labelKey: "craftZellige",
  },
  {
    image: "/images/story/calligraphe.jpg",
    labelKey: "craftCalligraphy",
  },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const featured = getFeaturedProducts();
  const reviews = getFeaturedReviews(3);

  const craftLabels: Record<string, string> = {
    craftDye: locale === "fr" ? "La teinture" : "Dyeing",
    craftZellige: locale === "fr" ? "Le zellige" : "Zellige tiling",
    craftCalligraphy: locale === "fr" ? "La calligraphie" : "Calligraphy",
  };

  return (
    <div>
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">
        <Image
          src="/images/products/gandoura-vert-porte.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6">
          <h1 className="max-w-xl font-display text-4xl text-white sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 max-w-lg text-white/90">{t("heroSubtitle")}</p>
          <Link
            href="/produits"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-sand"
          >
            {t("heroCta")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">{t("familiesTitle")}</h2>
        <p className="mt-2 max-w-xl text-charcoal/70">{t("familiesSubtitle")}</p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/5 to-transparent p-5">
                <span className="font-display text-2xl text-white">{tNav(famille)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl text-charcoal sm:text-3xl">{t("featuredTitle")}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <Image src="/images/story/medersa.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h2 className="font-display text-3xl text-white sm:text-4xl">{t("journeyTitle")}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/90">{t("journeyText")}</p>
          <Link
            href="/a-propos"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-sand"
          >
            {t("journeyCta")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {craftPieces.map((piece) => (
            <div key={piece.image} className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={piece.image}
                alt={craftLabels[piece.labelKey]}
                fill
                className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="font-display text-lg text-white">
                  {craftLabels[piece.labelKey]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="bg-sand py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                  {t("reviewsTitle")}
                </h2>
                <p className="mt-2 text-charcoal/70">{t("reviewsSubtitle")}</p>
              </div>
              <Link
                href="/avis"
                className="text-sm font-semibold text-terracotta underline underline-offset-4"
              >
                {t("reviewsCta")}
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={`${review.author}-${review.date}`} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-forest/5">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/story/fontaine-vannerie.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl text-charcoal">{t("storyTitle")}</h2>
            <p className="mt-4 text-charcoal/80">{t("storyText")}</p>
            <Link
              href="/a-propos"
              className="mt-6 inline-block text-sm font-semibold text-terracotta underline underline-offset-4"
            >
              {t("storyCta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
