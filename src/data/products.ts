import escadaCapa from "@/assets/escada-5-degraus-capa.png";

export type CategorySlug = "escadas";

export interface Product {
  id: string;
  name: string;
  brand: string;
  ean: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  installments: number;
  categories: CategorySlug[];
}

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Escada Alumínio 5 Degraus 1,53m 120kg Prata e Vermelho Reisam",
    brand: "Reisam",
    image: escadaCapa,
    originalPrice: 249.00,
    salePrice: 199.90,
    installments: 10,
    categories: ["escadas"],
  },
];

export const getProductsByCategory = (slug: CategorySlug): Product[] => {
  return allProducts.filter((p) => p.categories.includes(slug));
};

export const bestSellers: Product[] = allProducts.filter((p) => ["1"].includes(p.id));
export const kits: Product[] = [];
export const lastUnits: Product[] = [];

export const categories: { slug: CategorySlug; name: string; path: string }[] = [
  { slug: "escadas", name: "Escadas", path: "/categoria/escadas" },
];
