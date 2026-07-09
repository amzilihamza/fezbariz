import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/panier", "/en/panier", "/commande", "/en/commande"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
