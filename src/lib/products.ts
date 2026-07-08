import productsData from "@/data/products.json";
import type { Category, Product } from "@/types/product";

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByCategory(category: Category | "all"): Product[] {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const categories: Category[] = ["jellabas", "jabadors", "caftans"];
