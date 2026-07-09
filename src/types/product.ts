export type Category = "gandouras" | "caftans";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type Product = {
  slug: string;
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
