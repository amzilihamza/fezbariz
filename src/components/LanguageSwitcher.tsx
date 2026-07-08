"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`rounded-full px-2 py-1 uppercase transition-colors ${
            loc === locale
              ? "bg-terracotta text-white"
              : "text-charcoal/60 hover:text-charcoal"
          }`}
          aria-current={loc === locale}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
