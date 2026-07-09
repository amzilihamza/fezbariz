import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, categories } from "@/lib/products";

const categoryImages: Record<string, string> = {
  gandouras: "/images/products/gandoura-bordeaux-porte.jpg",
  caftans: "/images/products/caftan-bleu-roi-porte.jpg",
};

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

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src="/images/products/gandoura-vert-porte.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
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
        <h2 className="font-display text-2xl text-charcoal">{t("categoriesTitle")}</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={{ pathname: "/produits", query: { categorie: category } }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={categoryImages[category]}
                alt={tNav(category)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="font-display text-xl text-white">{tNav(category)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl text-charcoal">{t("featuredTitle")}</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-forest/5">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/brand/zellige.webp"
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
