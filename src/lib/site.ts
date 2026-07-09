import { routing } from "@/i18n/routing";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fezbariz.ma").replace(
  /\/$/,
  ""
);

export const siteName = "Fez & Bariz";

const ogLocales: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export function ogLocale(locale: string) {
  return ogLocales[locale] ?? "fr_FR";
}

/**
 * Builds absolute URL + hreflang alternates for a given unprefixed pathname
 * (e.g. "" for home, "/produits/caftan-simple" for a product page).
 */
export function localizedUrls(pathname: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    languages[locale] = `${siteUrl}${prefix}${pathname}`;
  }
  return {
    languages: { ...languages, "x-default": `${siteUrl}${pathname}` },
    canonicalFor: (locale: string) => languages[locale] ?? languages[routing.defaultLocale],
  };
}
