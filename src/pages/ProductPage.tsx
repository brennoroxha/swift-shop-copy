import { useParams, Link, useNavigate } from "react-router-dom";
import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";
import ProductGallery from "@/components/store/ProductGallery";
import { allProducts, type Product } from "@/data/products";
import { productDescriptions } from "@/data/productDescriptions";
import { productGalleryImages } from "@/data/productImages";
import { ShieldCheck, Truck, ChevronRight, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

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

  // Related products from same categories
  const related = allProducts
    .filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
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
                  💎 À vista R$ {formatPrice(product.salePrice * 0.9)} no Pix com 10% de desconto
                </p>
              </div>
              {/* Buy Button */}
              <div className="space-y-3">
                <button
                  onClick={() => { addItem(product); navigate("/carrinho"); }}
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
