import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import HeroBanner from "@/components/store/HeroBanner";
import ProductSection from "@/components/store/ProductSection";
import Footer from "@/components/store/Footer";
import { bestSellers, kits, lastUnits } from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <HeroBanner />
        {bestSellers.length > 0 && (
          <ProductSection title="Os Mais Vendidos" products={bestSellers} />
        )}
        {kits.length > 0 && (
          <ProductSection title="Kits em Oferta" products={kits} bgAlt />
        )}
        {lastUnits.length > 0 && (
          <ProductSection title="Últimas Unidades" products={lastUnits} />
        )}
        {bestSellers.length === 0 && kits.length === 0 && lastUnits.length === 0 && (
          <div className="container py-20 text-center">
            <p className="text-muted-foreground text-lg">Nenhum produto cadastrado ainda.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
