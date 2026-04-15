export type CategorySlug = "escadas";

export interface Product {
  id: string;
  name: string;
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
    image: "https://cdn.leroymerlin.com.br/products/escada_aluminio_5_degraus_1,53m_120kg_prata_e_vermelho_reisam_91713286_7dde_600x600.png",
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
