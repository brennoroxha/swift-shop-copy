import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { getProductSlug } from "@/pages/ProductPage";

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CartSidebar = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalItems, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-heading text-lg">
            Meu Carrinho ({totalItems})
          </SheetTitle>
          <SheetDescription className="sr-only">Itens no seu carrinho de compras</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="w-16 h-16 opacity-30" />
            <p className="text-sm">Seu carrinho está vazio</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary text-sm underline"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
                  <Link
                    to={`/produto/${getProductSlug(product)}`}
                    onClick={() => setIsOpen(false)}
                    className="shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-contain bg-secondary/50 rounded"
                    />
                  </Link>
                  <div className="flex-1 min-w-0 space-y-2">
                    <Link
                      to={`/produto/${getProductSlug(product)}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm font-bold text-foreground">
                      R${formatPrice(product.salePrice)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 hover:bg-secondary transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 hover:bg-secondary transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold text-foreground">
                  R${formatPrice(totalPrice)}
                </span>
              </div>
              <Link
                to="/carrinho"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider py-3.5 rounded-sm hover:opacity-90 transition-opacity text-center"
              >
                Ver Carrinho
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
