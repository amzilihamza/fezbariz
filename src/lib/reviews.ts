import reviewsData from "@/data/reviews.json";

export type Review = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

const reviews = reviewsData as Review[];

export function getAllReviews(): Review[] {
  return reviews;
}

export function getFeaturedReviews(count = 3): Review[] {
  return reviews.slice(0, count);
}
