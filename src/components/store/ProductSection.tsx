import ProductCard from "./ProductCard";
import { type Product } from "@/data/products";

interface ProductSectionProps {
  title: string;
  products: Product[];
  bgAlt?: boolean;
}

const ProductSection = ({ title, products, bgAlt = false }: ProductSectionProps) => {
  return (
    <section className={`py-12 md:py-16 ${bgAlt ? "bg-section-bg" : "bg-background"}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
