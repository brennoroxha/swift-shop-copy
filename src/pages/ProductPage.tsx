import { useParams, Link, useNavigate } from "react-router-dom";
import ShippingCalculator from "@/components/store/ShippingCalculator";
import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";
import ProductGallery from "@/components/store/ProductGallery";
import ProductReviews from "@/components/store/ProductReviews";
import SEO, { SITE_URL, SITE_NAME } from "@/components/SEO";
import { allProducts, type Product } from "@/data/products";
import { productDescriptions } from "@/data/productDescriptions";
import { productGalleryImages } from "@/data/productImages";
import { getProductReviews } from "@/data/productReviews";
import { ShieldCheck, Truck, ChevronRight, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import pixIcon from "@/assets/pix-icon.png";

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getProductSlug = (product: Product) => slugify(product.name);

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const product = allProducts.find((p) => getProductSlug(p) === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold mb-4">Produto não encontrado</h1>
            <Link to="/" className="text-primary underline">Voltar ao início</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const installmentValue = product.salePrice / product.installments;
  const discount = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
  const description = productDescriptions[product.id];
  const reviewSummary = getProductReviews(product.id);

  // Related products from same categories
  const related = allProducts
    .filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, 4);

  const productPath = `/produto/${slug}`;
  const productImageAbs = product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`;
  const validUntil = new Date(new Date().getFullYear() + 1, 11, 31).toISOString().slice(0, 10);
  const seoDescription = description?.intro
    ? description.intro.slice(0, 160)
    : `${product.name} da marca ${product.brand}. Original, novo, com nota fiscal e frete grátis.`;

  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [productImageAbs],
    description: description?.intro || `${product.name} - ${product.brand}`,
    sku: product.id,
    mpn: `${product.brand.toUpperCase().replace(/[^A-Z0-9]/g, "")}-${product.id.padStart(4, "0")}`,
    ...(product.ean ? { gtin13: product.ean } : {}),
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewSummary.average.toFixed(1),
      reviewCount: reviewSummary.count,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviewSummary.reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
        worstRating: "1",
      },
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      name: r.title,
      reviewBody: r.comment,
    })),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${productPath}`,
      priceCurrency: "BRL",
      price: product.salePrice.toFixed(2),
      priceValidUntil: validUntil,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0.00", currency: "BRL" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "BR" },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "BR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: product.categories[0], item: `${SITE_URL}/categoria/${product.categories[0]}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}${productPath}` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${product.name} | ${SITE_NAME}`}
        description={seoDescription}
        path={productPath}
        image={productImageAbs}
        type="product"
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      <TopBar />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to={`/categoria/${product.categories[0]}`} className="hover:text-primary transition-colors capitalize">{product.categories[0]}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <section className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Image Gallery */}
            <ProductGallery
              mainImage={product.image}
              extraImages={productGalleryImages[product.id] || []}
              productName={product.name}
            />

            {/* Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h1 className="font-heading font-bold text-xl md:text-2xl lg:text-3xl text-foreground leading-tight">
                  {product.name}
                </h1>
                <a
                  href="#avaliacoes"
                  className="inline-flex items-center gap-2 mt-3 text-sm hover:underline"
                  aria-label={`${reviewSummary.average.toFixed(1)} de 5 estrelas, ${reviewSummary.count} avaliações`}
                >
                  <span className="inline-flex" aria-hidden>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        viewBox="0 0 20 20"
                        className={`w-4 h-4 ${i <= Math.round(reviewSummary.average) ? "fill-yellow-400" : "fill-muted"}`}
                      >
                        <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78L1.58 7.62l5.82-.85L10 1.5z" />
                      </svg>
                    ))}
                  </span>
                  <span className="font-medium text-foreground">
                    {reviewSummary.average.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">
                    ({reviewSummary.count} avaliações)
                  </span>
                </a>
              </div>

              {/* Price */}
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  R${formatPrice(product.salePrice)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Em até 3x de R$ {formatPrice(product.salePrice / 3)} sem juros
                </p>
                <p className="text-sm text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-md mt-2 inline-flex items-center gap-1.5">
                  <img src={pixIcon} alt="Pix" className="w-4 h-4" /> À vista R$ {formatPrice(product.salePrice * 0.9)} no Pix com 10% de desconto
                </p>
              </div>
              {/* Buy Button */}
              <div className="space-y-3">
                <button
                  onClick={() => { addItem(product, 1, false); navigate("/carrinho"); }}
                  className="w-full bg-primary text-primary-foreground font-heading font-bold text-base uppercase tracking-wider py-4 rounded-sm hover:opacity-90 transition-opacity"
                >
                  Comprar Agora
                </button>
                <button
                  onClick={() => addItem(product)}
                  className="w-full border-2 border-primary text-primary font-heading font-bold text-sm uppercase tracking-wider py-3 rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
              </div>

              {/* Calcular Frete */}
              <ShippingCalculator />
              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex flex-col items-center text-center gap-1.5 p-3 bg-secondary/50 rounded-md">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-[11px] text-muted-foreground font-medium leading-tight">
                    Frete Grátis
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-3 bg-secondary/50 rounded-md">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-[11px] text-muted-foreground font-medium leading-tight">
                    Produto 100% Original
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-3 bg-secondary/50 rounded-md">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <span className="text-[11px] text-muted-foreground font-medium leading-tight">
                    Devoluções Gratuitas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Description */}
        {description && (
          <section className="container py-8 md:py-12">
            <div className="border-t border-border pt-8">
              <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">Descrição</h2>
              
              {description.title && (
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{description.title}</h3>
              )}
              
              <p className="text-foreground/90 leading-relaxed mb-4">{description.intro}</p>
              
              {description.details && (
                <p className="text-muted-foreground leading-relaxed mb-6">{description.details}</p>
              )}

              {description.benefits && description.benefits.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-heading font-bold text-base text-foreground mb-3">Benefícios:</h4>
                  <ul className="space-y-2">
                    {description.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-primary mt-1">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.ean && (
                <div className="mb-6">
                  <h4 className="font-heading font-bold text-base text-foreground mb-2">Código EAN:</h4>
                  <p className="text-muted-foreground text-sm">{product.ean}</p>
                </div>
              )}

              {product.brand && (
                <div className="mb-6">
                  <h4 className="font-heading font-bold text-base text-foreground mb-2">Marca:</h4>
                  <p className="text-muted-foreground text-sm">{product.brand}</p>
                </div>
              )}

              {description.howToUse && (
                <div className="mb-6">
                  <h4 className="font-heading font-bold text-base text-foreground mb-3">Como Usar:</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{description.howToUse}</p>
                </div>
              )}

              {description.ingredients && (
                <div className="mb-6">
                  <h4 className="font-heading font-bold text-base text-foreground mb-3">Ativos / Ingredientes:</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{description.ingredients}</p>
                </div>
              )}

              {description.expertTip && (
                <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
                  <h4 className="font-heading font-bold text-sm text-primary mb-2">💡 Nossos Experts Ensinam:</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{description.expertTip}</p>
                </div>
              )}
            </div>
          </section>
        )}
        {/* Related Products */}
        {related.length > 0 && (
          <section className="bg-secondary/20 py-12">
            <div className="container">
              <h2 className="section-title">Você também pode gostar</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
