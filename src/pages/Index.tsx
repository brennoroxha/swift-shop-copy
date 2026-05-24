import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import HeroBanner from "@/components/store/HeroBanner";
import ProductSection from "@/components/store/ProductSection";
import Footer from "@/components/store/Footer";
import SEO, { SITE_URL, SITE_NAME } from "@/components/SEO";
import { allProducts } from "@/data/products";

const Index = () => {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: SITE_NAME,
    legalName: "Kompleta Ferragens Construcao e Moveis LTDA",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    image: `${SITE_URL}/favicon.png`,
    description: "Loja online de escadas, ferramentas e materiais de construção com frete grátis para todo o Brasil.",
    areaServed: "BR",
    taxID: "30.063.962/0001-50",
    vatID: "30.063.962/0001-50",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida Ruy Barbosa, 626 - Loja 01",
      addressLocality: "Três Rios",
      addressRegion: "RJ",
      postalCode: "25805-000",
      addressCountry: "BR",
    },
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: "+55-24-2251-2189",
      contactType: "customer service",
      email: "sac@kompletaferragens.shop",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    }],
    sameAs: [],
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/busca?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${SITE_NAME} - Escadas e Ferramentas com Frete Grátis`}
        description="Compre escadas de alumínio, ferramentas e materiais de construção com frete grátis para todo o Brasil. Produtos originais, garantia do fabricante."
        path="/"
        jsonLd={[orgJsonLd, websiteJsonLd]}
      />
      <TopBar />
      <Header />
      <main className="flex-1">
        <HeroBanner />
        {allProducts.length > 0 ? (
          <ProductSection title="Escadas" products={allProducts.slice(0, 4)} />
        ) : (
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
