import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/ProductCard";
import { categories, getProductsByCategory } from "@/lib/products";
import type { Category } from "@/types/product";

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { categorie } = await searchParams;
  const t = await getTranslations("shop");
  const tNav = await getTranslations("nav");

  const activeCategory =
    categorie && categories.includes(categorie as Category)
      ? (categorie as Category)
      : "all";

  const products = getProductsByCategory(activeCategory);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-charcoal">{t("title")}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={{ pathname: "/produits" }}
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
            href={{ pathname: "/produits", query: { categorie: category } }}
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
