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
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-1.jpg",
    originalPrice: 129.90,
    salePrice: 99.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "2",
    name: "Escada Articulada 4x4 16 Degraus em Alumínio 4,48m Reisam",
    brand: "Reisam",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-2.jpg",
    originalPrice: 549.90,
    salePrice: 439.91,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "3",
    name: "Escada Alumínio 3 Degraus 1,08m 120kg Prata e Vermelho Reisam",
    brand: "Reisam",
    ean: "7892761000411",
    image: "https://kompletaferragens.shop/produtos/produto-3.jpg",
    originalPrice: 99.90,
    salePrice: 79.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "4",
    name: "Escada Extensível 15x2 30 Degraus em Alumínio 7,66m Botafogo",
    brand: "Botafogo",
    ean: "7908155402812",
    image: "https://kompletaferragens.shop/produtos/produto-4.jpg",
    originalPrice: 829.90,
    salePrice: 663.92,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "5",
    name: "Banqueta Escada Alumínio 3 Degraus 0,65m 120kg Prata e Vermelho Reisam",
    brand: "Reisam",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-5.jpg",
    originalPrice: 139.90,
    salePrice: 109.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "6",
    name: "Escada Alumínio 5 Degraus 1,56m 120kg Prata e Vermelho Botafogo",
    brand: "Botafogo",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-6.jpg",
    originalPrice: 129.90,
    salePrice: 99.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "7",
    name: "Escada Articulada 4x3 12 Degraus em Alumínio 3,4m Reisam",
    brand: "Reisam",
    ean: "7892761904771",
    image: "https://kompletaferragens.shop/produtos/produto-7.jpg",
    originalPrice: 489.90,
    salePrice: 391.91,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "8",
    name: "Escada Articulada 4x3 De Alumínio 12 Degraus 3,50 Metros de Altura",
    brand: "Multiuso",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-8.jpg",
    originalPrice: 359.90,
    salePrice: 284.42,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "9",
    name: "Escada Articulada 4x4 16 Degraus em Alumínio 4,23m Botafogo",
    brand: "Botafogo",
    ean: "7908155402942",
    image: "https://kompletaferragens.shop/produtos/produto-9.jpg",
    originalPrice: 409.90,
    salePrice: 325.98,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "10",
    name: "Escada Banqueta Bilateral Prática 2 Degraus Art Factory",
    brand: "Art Factory",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-10.jpg",
    originalPrice: 129.90,
    salePrice: 99.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "11",
    name: "Escada De Alumínio 5 Degraus New Star Art Factory",
    brand: "Art Factory",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-11.jpg",
    originalPrice: 229.90,
    salePrice: 183.20,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "12",
    name: "Escada De Alumínio Dupla 3 Degraus Natural 120kg Reisam",
    brand: "Reisam",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-12.jpg",
    originalPrice: 189.90,
    salePrice: 153.92,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "13",
    name: "Escada De Alumínio Dupla 5 Degraus Natural 120kg Reisam",
    brand: "Reisam",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-13.jpg",
    originalPrice: 249.90,
    salePrice: 199.40,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "14",
    name: "Escada De Alumínio Tesoura Real Escadas 006 Prateado/Azul",
    brand: "Real Escadas",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-14.jpg",
    originalPrice: 149.90,
    salePrice: 118.05,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "15",
    name: "Escada Doméstica Alumínio 4 Degraus Natural 120 Kg Reisam",
    brand: "Reisam",
    ean: "",
    image: "https://kompletaferragens.shop/produtos/produto-15.jpg",
    originalPrice: 149.90,
    salePrice: 114.90,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "16",
    name: "Escada Doméstica Alumínio 7 Degraus Natural 120 Kg Reisam",
    brand: "Reisam",
    ean: "7892761000657",
    image: "https://kompletaferragens.shop/produtos/produto-16.jpg",
    originalPrice: 289.90,
    salePrice: 229.05,
    installments: 10,
    categories: ["escadas"],
  },
  {
    id: "17",
    name: "Escada Extensível 9x2 18 Degraus em Alumínio 4,44m Botafogo",
    brand: "Botafogo",
    ean: "7908155402751",
    image: "https://kompletaferragens.shop/produtos/produto-17.jpg",
    originalPrice: 729.90,
    salePrice: 583.92,
    installments: 10,
    categories: ["escadas"],
  },
];

export const getProductsByCategory = (slug: CategorySlug): Product[] => {
  return allProducts.filter((p) => p.categories.includes(slug));
};

export const bestSellers: Product[] = allProducts.filter((p) =>
  ["1", "5", "3", "6", "15", "10", "14"].includes(p.id)
);
export const kits: Product[] = [];
export const lastUnits: Product[] = allProducts.filter((p) =>
  ["4", "17", "2", "7", "9"].includes(p.id)
);

export const categories: { slug: CategorySlug; name: string; path: string }[] = [
  { slug: "escadas", name: "Escadas", path: "/categoria/escadas" },
];
