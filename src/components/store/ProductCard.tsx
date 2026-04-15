import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { type Product } from "@/data/products";
import { getProductSlug } from "@/pages/ProductPage";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      to={`/produto/${getProductSlug(product)}`}
      className="product-card group block bg-card rounded-lg border border-border shadow-sm overflow-hidden"
    >
      {/* Image container with discount badge */}
      <div className="relative bg-background p-4 flex items-center justify-center aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="space-y-0.5">
          <p className="text-base font-bold text-foreground">
            R$ {formatPrice(product.salePrice)}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 w-full mt-3 border border-primary/40 text-muted-foreground font-medium text-sm uppercase tracking-wider py-2.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Lock className="w-3.5 h-3.5" />
          COMPRAR
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
