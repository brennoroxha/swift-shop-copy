import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { getProductSlug } from "@/pages/ProductPage";
import Header from "@/components/store/Header";
import TopBar from "@/components/store/TopBar";
import Footer from "@/components/store/Footer";

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />

      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Meu Carrinho ({totalItems})
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors underline"
            >
              Limpar carrinho
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6 text-muted-foreground">
            <ShoppingBag className="w-20 h-20 opacity-20" />
            <p className="text-lg">Seu carrinho está vazio</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-0 border border-border rounded-md overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-secondary/50 text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
                <span>Produto</span>
                <span className="text-center">Preço</span>
                <span className="text-center">Quantidade</span>
                <span className="text-center">Total</span>
                <span className="w-8" />
              </div>

              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 border-b border-border last:border-0"
                >
                  {/* Product */}
                  <div className="flex gap-4 items-center">
                    <Link to={`/produto/${getProductSlug(product)}`} className="shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-contain bg-secondary/50 rounded"
                      />
                    </Link>
                    <Link
                      to={`/produto/${getProductSlug(product)}`}
                      className="text-sm font-medium text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors"
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <span className="md:hidden text-xs text-muted-foreground mr-2">Preço:</span>
                    <span className="text-sm font-semibold text-foreground">
                      R${formatPrice(product.salePrice)}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center">
                    <div className="flex items-center border border-border rounded">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm font-medium min-w-[2.5rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-center">
                    <span className="md:hidden text-xs text-muted-foreground mr-2">Total:</span>
                    <span className="text-sm font-bold text-foreground">
                      R${formatPrice(product.salePrice * quantity)}
                    </span>
                  </div>

                  {/* Remove */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1.5"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-md p-6 space-y-5 sticky top-28">
                <h2 className="font-heading font-bold text-lg text-foreground">Resumo do Pedido</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})</span>
                    <span>R${formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span className="text-primary font-medium">Grátis</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="font-heading font-bold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">
                    R${formatPrice(totalPrice)}
                  </span>
                </div>


                <Link
                  to="/checkout"
                  className="block w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider py-4 rounded-sm hover:opacity-90 transition-opacity text-center"
                >
                  Finalizar Compra
                </Link>

                <Link
                  to="/"
                  className="block w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
