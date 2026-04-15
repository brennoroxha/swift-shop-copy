import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import HeroBanner from "@/components/store/HeroBanner";
import ProductSection from "@/components/store/ProductSection";
import BannerImage from "@/components/store/BannerImage";
import Footer from "@/components/store/Footer";
import { bestSellers, kits, lastUnits } from "@/data/products";
import bannerSpotscan from "@/assets/banner-spotscan.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <ProductSection title="Os Mais Vendidos" products={bestSellers} />
        <ProductSection title="Kits em Oferta" products={kits} bgAlt />
        <BannerImage src={bannerSpotscan} alt="Descubra sua rotina de cuidados" />
        <ProductSection title="Últimas Unidades" products={lastUnits} />
        <ProductSection title="Ofertas 70% OFF" products={[...lastUnits].reverse()} bgAlt />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
