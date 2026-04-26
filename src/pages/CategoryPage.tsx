import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";
import SEO, { SITE_NAME, SITE_URL } from "@/components/SEO";
import { getProductsByCategory, categories, allProducts, type CategorySlug } from "@/data/products";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortOption = "relevancia" | "maior-preco" | "menor-preco" | "nome-az" | "nome-za" | "desconto";

const sortLabels: Record<SortOption, string> = {
  relevancia: "Relevância",
  "maior-preco": "Maior preço",
  "menor-preco": "Menor preço",
  "nome-az": "Nome, A-Z",
  "nome-za": "Nome, Z-A",
  desconto: "Desconto",
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sort, setSort] = useState<SortOption>("relevancia");
  const isVerTudo = slug === "ver-tudo";
  const category = isVerTudo
    ? { slug: "ver-tudo", name: "Ver Tudo", path: "/categoria/ver-tudo" }
    : categories.find((c) => c.slug === slug);
  const rawProducts = isVerTudo
    ? allProducts
    : slug ? getProductsByCategory(slug as CategorySlug) : [];

  const products = useMemo(() => {
    const sorted = [...rawProducts];
    switch (sort) {
      case "maior-preco":
        return sorted.sort((a, b) => b.salePrice - a.salePrice);
      case "menor-preco":
        return sorted.sort((a, b) => a.salePrice - b.salePrice);
      case "nome-az":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "nome-za":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "desconto":
        return sorted.sort((a, b) => {
          const dA = (a.originalPrice - a.salePrice) / a.originalPrice;
          const dB = (b.originalPrice - b.salePrice) / b.originalPrice;
          return dB - dA;
        });
      default:
        return sorted;
    }
  }, [rawProducts, sort]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold mb-4">Categoria não encontrada</h1>
            <Link to="/" className="text-primary underline">Voltar ao início</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const slugifyName = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: category.name, item: `${SITE_URL}/categoria/${slug}` },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 30).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/produto/${slugifyName(p.name)}`,
      name: p.name,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${category.name} | ${SITE_NAME}`}
        description={`Compre ${category.name.toLowerCase()} originais com frete grátis para todo o Brasil. ${products.length} produtos disponíveis com garantia do fabricante.`}
        path={`/categoria/${slug}`}
        jsonLd={[breadcrumbJsonLd, itemListJsonLd]}
      />
      <TopBar />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{category.name}</span>
            </div>
          </div>
        </div>

        {/* Title + Count */}
        <div className="container pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                {category.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {products.length} {products.length === 1 ? "produto" : "produtos"}
              </p>
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(sortLabels) as [SortOption, string][]).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <section className="pb-16">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
