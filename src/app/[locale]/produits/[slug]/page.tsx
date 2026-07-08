import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AddToCartForm } from "@/components/AddToCartForm";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name[locale],
    description: product.shortDescription[locale],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("product");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link href="/produits" className="text-sm text-charcoal/60 hover:text-terracotta">
        ← {t("backToShop")}
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          {product.images.map((image, index) => (
            <div
              key={image}
              className={`relative aspect-[5/6] overflow-hidden rounded-xl bg-sand-dark ${
                index === 0 ? "col-span-2" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${product.name[locale]} ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div>
          <h1 className="font-display text-3xl text-charcoal">{product.name[locale]}</h1>
          <p className="mt-2 text-xl text-charcoal/80">
            {formatPrice(product.price, product.currency)}
          </p>
          <p className="mt-4 text-charcoal/80">{product.description[locale]}</p>

          <dl className="mt-6 space-y-2 text-sm text-charcoal/70">
            <div className="flex gap-2">
              <dt className="font-medium text-charcoal">{t("materials")}:</dt>
              <dd>{product.materials[locale]}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-charcoal">{t("care")}:</dt>
              <dd>{product.care[locale]}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <AddToCartForm product={product} name={product.name[locale]} />
          </div>
        </div>
      </div>
    </div>
  );
}
