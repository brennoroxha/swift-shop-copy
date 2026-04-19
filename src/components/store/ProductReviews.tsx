import { Star, CheckCircle2 } from "lucide-react";
import { getProductReviews } from "@/data/productReviews";

interface ProductReviewsProps {
  productId: string;
}

const formatDateBR = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const Stars = ({ value, size = "w-4 h-4" }: { value: number; size?: string }) => {
  return (
    <div className="inline-flex items-center" aria-label={`${value} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${i <= Math.round(value) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
};

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { average, count, distribution, reviews } = getProductReviews(productId);

  return (
    <section className="container py-8 md:py-12">
      <div className="border-t border-border pt-8">
        <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">
          Avaliações dos Clientes
        </h2>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 mb-8">
          <div className="bg-secondary/40 rounded-md p-5 flex flex-col items-center justify-center text-center">
            <p className="text-4xl font-bold text-foreground">{average.toFixed(1)}</p>
            <Stars value={average} size="w-5 h-5" />
            <p className="text-sm text-muted-foreground mt-2">{count} avaliações</p>
          </div>

          <div className="space-y-2">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const n = distribution[star];
              const pct = count > 0 ? (n / count) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-muted-foreground">{star}★</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${pct}%` }}
                      aria-hidden
                    />
                  </div>
                  <span className="w-8 text-right text-muted-foreground tabular-nums">{n}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews list */}
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="border border-border rounded-md p-4 bg-card"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <Stars value={r.rating} />
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Compra verificada
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDateBR(r.date)}
                </span>
              </div>
              <h3 className="font-heading font-bold text-sm text-foreground mb-1">
                {r.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                {r.comment}
              </p>
              <p className="text-xs text-muted-foreground">{r.author}</p>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground mt-4">
          Exibindo {reviews.length} de {count} avaliações
        </p>
      </div>
    </section>
  );
};

export default ProductReviews;
