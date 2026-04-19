import { useEffect, useMemo, useState } from "react";
import { Star, CheckCircle2, ChevronDown } from "lucide-react";
import { getProductReviews, type Review } from "@/data/productReviews";
import { toast } from "@/hooks/use-toast";

interface ProductReviewsProps {
  productId: string;
}

const INITIAL_VISIBLE = 3;

const formatDateBR = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const Stars = ({
  value,
  size = "w-4 h-4",
  interactive = false,
  onChange,
}: {
  value: number;
  size?: string;
  interactive?: boolean;
  onChange?: (v: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="inline-flex items-center" aria-label={`${value} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= (hover || value);
        const baseClass = `${size} ${
          active ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground/40"
        }`;
        if (interactive) {
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange?.(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              className="p-0.5"
              aria-label={`Avaliar com ${i} estrela${i > 1 ? "s" : ""}`}
            >
              <Star className={baseClass} />
            </button>
          );
        }
        return <Star key={i} className={baseClass} />;
      })}
    </div>
  );
};

const storageKey = (productId: string) => `user-reviews:${productId}`;

const loadUserReviews = (productId: string): Review[] => {
  try {
    const raw = localStorage.getItem(storageKey(productId));
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
};

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const generated = getProductReviews(productId);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Form state
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setUserReviews(loadUserReviews(productId));
    setShowAll(false);
  }, [productId]);

  const allReviews = useMemo(
    () => [...userReviews, ...generated.reviews],
    [userReviews, generated.reviews]
  );

  const visibleReviews = showAll ? allReviews : allReviews.slice(0, INITIAL_VISIBLE);

  // Combined totals (include user reviews in count + average)
  const totalCount = generated.count + userReviews.length;
  const sumGenerated = generated.average * generated.count;
  const sumUser = userReviews.reduce((acc, r) => acc + r.rating, 0);
  const combinedAvg = totalCount > 0 ? (sumGenerated + sumUser) / totalCount : 0;

  // Distribution including user reviews
  const distribution = useMemo(() => {
    const dist = { ...generated.distribution };
    userReviews.forEach((r) => {
      const k = r.rating as 1 | 2 | 3 | 4 | 5;
      dist[k] = (dist[k] || 0) + 1;
    });
    return dist;
  }, [generated.distribution, userReviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) {
      toast({ title: "Selecione uma nota", description: "Clique nas estrelas para avaliar.", variant: "destructive" });
      return;
    }
    if (!author.trim()) {
      toast({ title: "Informe seu nome", variant: "destructive" });
      return;
    }
    if (!comment.trim()) {
      toast({ title: "Escreva um comentário", variant: "destructive" });
      return;
    }

    const newReview: Review = {
      id: `${productId}-u${Date.now()}`,
      author: author.trim(),
      rating,
      title: title.trim() || (rating >= 4 ? "Recomendo" : "Minha avaliação"),
      comment: comment.trim(),
      date: new Date().toISOString().slice(0, 10),
      verified: false,
    };

    const updated = [newReview, ...userReviews];
    setUserReviews(updated);
    try {
      localStorage.setItem(storageKey(productId), JSON.stringify(updated));
    } catch {
      // ignore quota errors
    }

    // Reset form
    setRating(0);
    setAuthor("");
    setTitle("");
    setComment("");
    setShowAll(true);
    toast({ title: "Avaliação enviada!", description: "Obrigado por compartilhar sua opinião." });
  };

  return (
    <section className="container py-8 md:py-12">
      <div className="border-t border-border pt-8">
        <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">
          Avaliações dos Clientes
        </h2>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 mb-8">
          <div className="bg-secondary/40 rounded-md p-5 flex flex-col items-center justify-center text-center">
            <p className="text-4xl font-bold text-foreground">{combinedAvg.toFixed(1)}</p>
            <Stars value={combinedAvg} size="w-5 h-5" />
            <p className="text-sm text-muted-foreground mt-2">{totalCount} avaliações</p>
          </div>

          <div className="space-y-2">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const n = distribution[star] || 0;
              const pct = totalCount > 0 ? (n / totalCount) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-muted-foreground">{star}★</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400" style={{ width: `${pct}%` }} aria-hidden />
                  </div>
                  <span className="w-8 text-right text-muted-foreground tabular-nums">{n}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews list */}
        <ul className="space-y-4">
          {visibleReviews.map((r) => (
            <li key={r.id} className="border border-border rounded-md p-4 bg-card">
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
              <h3 className="font-heading font-bold text-sm text-foreground mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">{r.comment}</p>
              <p className="text-xs text-muted-foreground">{r.author}</p>
            </li>
          ))}
        </ul>

        {/* Show all toggle */}
        {allReviews.length > INITIAL_VISIBLE && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="w-full mt-4 border border-border rounded-md py-3 text-sm font-medium text-primary hover:bg-secondary/50 transition-colors inline-flex items-center justify-center gap-2"
          >
            {showAll ? "Mostrar menos" : `Exibir todas as avaliações (${allReviews.length})`}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {/* Leave a review form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-secondary/40 border border-border rounded-md p-5 space-y-4"
        >
          <h3 className="font-heading font-bold text-base text-foreground">Deixe sua avaliação</h3>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Sua nota</label>
            <Stars value={rating} interactive onChange={setRating} size="w-6 h-6" />
          </div>

          <div>
            <label htmlFor="rev-name" className="block text-sm text-muted-foreground mb-1">
              Seu nome
            </label>
            <input
              id="rev-name"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: João S."
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label htmlFor="rev-title" className="block text-sm text-muted-foreground mb-1">
              Título <span className="text-xs">(opcional)</span>
            </label>
            <input
              id="rev-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Ótimo produto!"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label htmlFor="rev-comment" className="block text-sm text-muted-foreground mb-1">
              Seu comentário
            </label>
            <textarea
              id="rev-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte o que achou do produto..."
              rows={4}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            Enviar Avaliação
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductReviews;
