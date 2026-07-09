import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReviewCard } from "@/components/ReviewCard";
import { getAllReviews } from "@/lib/reviews";
import { localizedUrls, siteName } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviews" });
  const { languages, canonicalFor } = localizedUrls("/avis");
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: canonicalFor(locale), languages },
  };
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reviews");
  const reviews = getAllReviews();

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: average.toFixed(1),
      reviewCount: reviews.length,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
      reviewBody: review.text,
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <h1 className="font-display text-3xl text-charcoal">{t("title")}</h1>
      <p className="mt-4 text-charcoal/80">{t("intro")}</p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide text-terracotta">
        {t("source")}
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={`${review.author}-${review.date}`} review={review} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/produits"
          className="inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}
