import { Star } from "lucide-react";
import type { Review } from "@/lib/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-sand-dark bg-white p-6">
      <div className="flex gap-0.5 text-gold">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-3 text-charcoal/85">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-4 flex items-center justify-between text-sm text-charcoal/60">
        <span className="font-medium text-charcoal">{review.author}</span>
        <span>{review.date}</span>
      </div>
    </div>
  );
}
