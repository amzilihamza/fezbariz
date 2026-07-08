import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand-dark bg-sand">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-xl text-charcoal">Fez &amp; Bariz</p>
          <p className="mt-2 text-sm text-charcoal/70">{t("tagline")}</p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-sm font-semibold text-charcoal">{t("shop")}</p>
            <ul className="mt-3 space-y-2 text-sm text-charcoal/70">
              <li>
                <Link href="/produits" className="hover:text-terracotta">
                  {t("shop")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-charcoal">{t("about")}</p>
            <ul className="mt-3 space-y-2 text-sm text-charcoal/70">
              <li>
                <Link href="/a-propos" className="hover:text-terracotta">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-sand-dark px-4 py-4 text-center text-xs text-charcoal/60 sm:px-6">
        © {year} Fez &amp; Bariz — {t("rights")}
      </div>
    </footer>
  );
}
