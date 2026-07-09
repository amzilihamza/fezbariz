import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProducts } from "@/lib/products";
import { siteUrl } from "@/lib/site";

function urlFor(pathname: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${pathname}`;
}

function alternatesFor(pathname: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, urlFor(pathname, locale)])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/produits", "/a-propos", "/contact"];
  const productPaths = getAllProducts().map((product) => `/produits/${product.slug}`);
  const paths = [...staticPaths, ...productPaths];

  const entries: MetadataRoute.Sitemap = [];
  for (const path of paths) {
    for (const locale of routing.locales) {
      entries.push({
        url: urlFor(path, locale),
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/produits/") ? 0.8 : 0.6,
        alternates: { languages: alternatesFor(path) },
      });
    }
  }
  return entries;
}
