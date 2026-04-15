import { useSearchParams, Link } from "react-router-dom";
import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";
import { allProducts } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return allProducts.filter((p) => {
      const name = p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return name.includes(q);
    });
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <div className="bg-secondary/30 border-b border-border">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">Busca: "{query}"</span>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <h1 className="font-heading font-bold text-xl md:text-2xl mb-2">
            Resultados para "{query}"
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            {results.length} {results.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Nenhum produto encontrado para "{query}".</p>
              <Link to="/" className="text-primary underline mt-4 inline-block">Voltar ao início</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
