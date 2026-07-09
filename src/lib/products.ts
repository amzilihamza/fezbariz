import productsData from "@/data/products.json";
import type { Category, Family, Product } from "@/types/product";
import { familyCategories } from "@/types/product";

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByFamily(family: Family): Product[] {
  return products.filter((product) => product.family === family);
}

export function getProducts({
  family,
  category,
}: {
  family?: Family;
  category?: Category;
}): Product[] {
  return products.filter(
    (product) =>
      (!family || product.family === family) && (!category || product.category === category)
  );
}

export function getFeaturedProducts(family?: Family): Product[] {
  return products.filter((product) => product.featured && (!family || product.family === family));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const families: Family[] = ["homme", "femme", "enfant"];

export function categoriesForFamily(family: Family): Category[] {
  return familyCategories[family];
}
