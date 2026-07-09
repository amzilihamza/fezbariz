import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("shop");

  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[5/6] overflow-hidden rounded-xl bg-sand-dark">
        <Image
          src={product.images[0]}
          alt={product.name[locale]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-white">
            {t("outOfStock")}
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-charcoal">{product.name[locale]}</h3>
        <p className="mt-1 text-sm text-charcoal/70">
          {product.price === null
            ? t("priceOnRequest")
            : formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
