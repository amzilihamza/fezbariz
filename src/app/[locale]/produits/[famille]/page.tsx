import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/ProductCard";
import { categoriesForFamily, families, getProducts } from "@/lib/products";
import type { Category, Family } from "@/types/product";
import { localizedUrls } from "@/lib/site";

function isFamily(value: string): value is Family {
  return (families as string[]).includes(value);
}

export function generateStaticParams() {
  return families.map((famille) => ({ famille }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "fr" | "en"; famille: string }>;
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { locale, famille } = await params;
  if (!isFamily(famille)) return {};

  const { categorie } = await searchParams;
  const categories = categoriesForFamily(famille);
  const activeCategory =
    categorie && (categories as string[]).includes(categorie) ? (categorie as Category) : null;

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const title = activeCategory ? tNav(activeCategory) : tNav(famille);
  const { languages, canonicalFor } = localizedUrls(`/produits/${famille}`);
  const canonical = activeCategory
    ? `${canonicalFor(locale)}?categorie=${activeCategory}`
    : canonicalFor(locale);

  return {
    title,
    alternates: {
      canonical,
      languages: activeCategory ? undefined : languages,
    },
  };
}

export default async function FamilyShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "fr" | "en"; famille: string }>;
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { locale, famille } = await params;
  if (!isFamily(famille)) notFound();
  setRequestLocale(locale);

  const { categorie } = await searchParams;
  const t = await getTranslations("shop");
  const tNav = await getTranslations("nav");

  const categories = categoriesForFamily(famille);
  const activeCategory =
    categorie && (categories as string[]).includes(categorie) ? (categorie as Category) : "all";

  const products = getProducts({
    family: famille,
    category: activeCategory === "all" ? undefined : activeCategory,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm text-charcoal/60">
        <Link href="/produits" className="hover:text-terracotta">
          {t("title")}
        </Link>
        <span className="mx-2">/</span>
        {tNav(famille)}
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal">{tNav(famille)}</h1>

      {categories.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/produits/${famille}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "border-terracotta bg-terracotta text-white"
                : "border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {t("allCategories")}
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/produits/${famille}?categorie=${category}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "border-terracotta bg-terracotta text-white"
                  : "border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {tNav(category)}
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-16 text-center text-charcoal/60">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
