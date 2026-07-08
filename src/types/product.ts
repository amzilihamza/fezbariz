export type Category = "jellabas" | "jabadors" | "caftans";

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
  materials: LocalizedText;
  care: LocalizedText;
  price: number;
  currency: "MAD" | "EUR" | "USD";
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured?: boolean;
};
