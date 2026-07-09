export type Family = "homme" | "femme" | "enfant";

export type Category = "gandouras" | "jellabas" | "caftans" | "jabadors";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type Product = {
  slug: string;
  family: Family;
  category: Category;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  color: LocalizedText;
  materials: LocalizedText;
  care: LocalizedText;
  /** null while the price is still being confirmed with the workshop. */
  price: number | null;
  currency: "EUR";
  images: string[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
};

export const familyCategories: Record<Family, Category[]> = {
  homme: ["gandouras", "jellabas"],
  femme: ["caftans"],
  enfant: ["jabadors"],
};
