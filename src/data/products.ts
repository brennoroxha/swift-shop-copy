export type CategorySlug = string;

export interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  installments: number;
  categories: CategorySlug[];
}

// Master product list — empty, ready for new products
export const allProducts: Product[] = [];

// Helper to get products by category
export const getProductsByCategory = (slug: CategorySlug): Product[] => {
  return allProducts.filter((p) => p.categories.includes(slug));
};

// Legacy arrays for the home page
export const bestSellers: Product[] = [];
export const kits: Product[] = [];
export const lastUnits: Product[] = [];

// Category metadata — empty, ready for new categories
export const categories: { slug: CategorySlug; name: string; path: string }[] = [];
