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
    ean: "7898943046158",
    image: escadaCapa,
    originalPrice: 249.00,
    salePrice: 199.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "2",
    name: "Escada Articulada 4x4 16 Degraus em Alumínio 4,48m Reisam",
    brand: "Reisam",
    ean: "7892761904788",
    image: "https://cdn.leroymerlin.com.br/products/escada_articulada_4x4_16_degraus_em_aluminio_4,48m_reisam_90927781_0001_600x600.jpg",
    originalPrice: 749.00,
    salePrice: 599.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "3",
    name: "Escada Alumínio 3 Degraus 1,08m 120kg Prata e Vermelho Reisam",
    brand: "Reisam",
    ean: "7892761000411",
    image: "https://cdn.leroymerlin.com.br/products/escada_aluminio_3_degraus_1,08m_120kg_prata_e_vermelho_91713272_0001_600x600.jpg",
    originalPrice: 179.00,
    salePrice: 149.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "4",
    name: "Escada Extensível 15x2 30 Degraus em Alumínio 7,66m Botafogo",
    brand: "Botafogo",
    ean: "7908155402812",
    image: "https://lojaacal.vtexassets.com/arquivos/ids/165467-800-auto?v=637387073210370000&width=800&height=auto&aspect=true",
    originalPrice: 1299.00,
    salePrice: 1099.90,
    installments: 10,
    categories: ["escadas"],
  },
];

export const getProductsByCategory = (slug: CategorySlug): Product[] => {
  return allProducts.filter((p) => p.categories.includes(slug));
};

export const bestSellers: Product[] = allProducts.filter((p) => ["1", "2", "3", "4"].includes(p.id));
export const kits: Product[] = [];
export const lastUnits: Product[] = [];

export const categories: { slug: CategorySlug; name: string; path: string }[] = [
  { slug: "escadas", name: "Escadas", path: "/categoria/escadas" },
];
