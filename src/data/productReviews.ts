// Deterministic review generator: same product id -> same reviews/ratings forever.
// This keeps SEO/JSON-LD stable and avoids hydration mismatch.

export interface Review {
  id: string;
  author: string;
  rating: number; // 1..5
  title: string;
  comment: string;
  date: string; // ISO yyyy-mm-dd
  verified: boolean;
}

export interface ProductReviewSummary {
  average: number; // 1 decimal, 4.1..4.9
  count: number;   // 51..139
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  reviews: Review[]; // 7..15 displayed
}

// Mulberry32 PRNG seeded from a string -> stable across renders/builds
const hashSeed = (str: string): number => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const FIRST_NAMES = [
  "Carlos", "Patricia", "João", "Mariana", "Rafael", "Aline", "Bruno", "Camila",
  "Diego", "Fernanda", "Gustavo", "Juliana", "Leonardo", "Mateus", "Natália",
  "Paulo", "Renata", "Rodrigo", "Sabrina", "Thiago", "Vanessa", "André",
  "Beatriz", "Eduardo", "Larissa", "Marcelo", "Priscila", "Vinícius", "Roberta",
  "Felipe", "Tatiana", "Ricardo", "Letícia", "Gabriel", "Amanda",
];
const LAST_INITIALS = ["S.", "M.", "A.", "R.", "C.", "L.", "P.", "B.", "G.", "N.", "F.", "T.", "O.", "D."];

const TITLES_5 = [
  "Excelente produto!", "Superou minhas expectativas", "Vale cada centavo",
  "Recomendo demais", "Qualidade impecável", "Compra perfeita",
  "Muito satisfeito", "Produto top de linha", "Entrega rápida e produto ótimo",
];
const TITLES_4 = [
  "Muito bom, recomendo", "Atendeu o esperado", "Bom custo-benefício",
  "Gostei bastante", "Produto de qualidade", "Recomendo a compra",
];
const TITLES_3 = [
  "Bom, mas pode melhorar", "Atende o básico", "Razoável pelo preço",
];

const COMMENTS_5 = [
  "Produto chegou antes do prazo, muito bem embalado. Qualidade excelente, exatamente como descrito no anúncio. Já estou usando e estou super satisfeito.",
  "Comprei e recebi rapidamente. O acabamento é ótimo, parece muito resistente. Recomendo a loja, atendimento nota 10.",
  "Excelente custo-benefício. Cumpre tudo que promete e a entrega foi muito rápida. Comprarei novamente.",
  "Produto original, com nota fiscal e entregue no prazo. Qualidade perceptível desde a abertura da caixa.",
  "Estou usando há algumas semanas e está perfeito. Robusto, bem feito e o preço foi ótimo comparado a outras lojas.",
  "Atendeu 100% das minhas expectativas. Já é a segunda vez que compro nessa loja e nunca tive problema.",
  "Chegou tudo certo, bem protegido. O produto é de qualidade superior, recomendo sem dúvidas.",
];
const COMMENTS_4 = [
  "Produto bom, atendeu o que eu precisava. A entrega demorou um pouco mais do que o esperado, mas chegou em perfeito estado.",
  "Boa qualidade pelo preço pago. Recomendo, mas a embalagem poderia ser um pouco melhor.",
  "Cumpre o que promete. Material parece resistente e o acabamento é satisfatório.",
  "Gostei do produto, está dentro do esperado. Entrega rápida e bem embalado.",
  "Bom produto, funciona como descrito. Recomendaria para amigos e familiares.",
];
const COMMENTS_3 = [
  "Produto razoável. Funciona, mas esperava um acabamento um pouco melhor pelo preço.",
  "Atende o básico. Para uso eventual está ótimo, para uso intenso talvez não seja a melhor escolha.",
];

const pick = <T,>(rng: () => number, arr: T[]): T => arr[Math.floor(rng() * arr.length)];

const formatDate = (d: Date): string => d.toISOString().slice(0, 10);

const buildReviews = (productId: string): ProductReviewSummary => {
  const seed = hashSeed(`reviews:${productId}`);
  const rng = mulberry32(seed);

  // Total review count between 51 and 139
  const count = 51 + Math.floor(rng() * (139 - 51 + 1));

  // Average rating between 4.1 and 4.9 (one decimal)
  const average = Math.round((4.1 + rng() * 0.8) * 10) / 10;

  // Build a star distribution that roughly matches the average
  // Allocate weights skewed toward 5 stars when avg is high
  const dist: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  // Heuristic weights based on average
  const w5 = Math.max(0, average - 3.5);          // higher avg -> more 5★
  const w4 = 0.6;
  const w3 = Math.max(0.05, 4.5 - average) * 0.4;
  const w2 = Math.max(0.02, 4.7 - average) * 0.15;
  const w1 = Math.max(0.01, 4.8 - average) * 0.08;
  const totalW = w1 + w2 + w3 + w4 + w5;

  let assigned = 0;
  dist[5] = Math.round((w5 / totalW) * count);
  dist[4] = Math.round((w4 / totalW) * count);
  dist[3] = Math.round((w3 / totalW) * count);
  dist[2] = Math.round((w2 / totalW) * count);
  assigned = dist[5] + dist[4] + dist[3] + dist[2];
  dist[1] = Math.max(0, count - assigned);

  // Adjust so the weighted average stays in 4.1..4.9 range (small correction)
  const computeAvg = () =>
    (dist[1] * 1 + dist[2] * 2 + dist[3] * 3 + dist[4] * 4 + dist[5] * 5) / count;
  let safety = 0;
  while (Math.abs(computeAvg() - average) > 0.15 && safety < 20) {
    if (computeAvg() < average && dist[3] > 0) {
      dist[3]--; dist[5]++;
    } else if (computeAvg() > average && dist[5] > 0) {
      dist[5]--; dist[3]++;
    } else break;
    safety++;
  }

  // Number of reviews to display: 7..15
  const displayCount = 7 + Math.floor(rng() * (15 - 7 + 1));

  // Pick ratings for displayed reviews proportional to distribution
  const ratingPool: number[] = [];
  ([5, 4, 3, 2, 1] as const).forEach((star) => {
    const proportion = dist[star] / count;
    const n = Math.round(proportion * displayCount);
    for (let i = 0; i < n; i++) ratingPool.push(star);
  });
  // Pad/truncate to displayCount
  while (ratingPool.length < displayCount) ratingPool.push(5);
  ratingPool.length = displayCount;

  // Shuffle deterministically
  for (let i = ratingPool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [ratingPool[i], ratingPool[j]] = [ratingPool[j], ratingPool[i]];
  }

  const today = new Date();
  const reviews: Review[] = ratingPool.map((rating, idx) => {
    const titles = rating >= 5 ? TITLES_5 : rating >= 4 ? TITLES_4 : TITLES_3;
    const comments = rating >= 5 ? COMMENTS_5 : rating >= 4 ? COMMENTS_4 : COMMENTS_3;
    const author = `${pick(rng, FIRST_NAMES)} ${pick(rng, LAST_INITIALS)}`;
    // Date within the past ~9 months
    const daysAgo = 5 + Math.floor(rng() * 270);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    return {
      id: `${productId}-r${idx + 1}`,
      author,
      rating,
      title: pick(rng, titles),
      comment: pick(rng, comments),
      date: formatDate(date),
      verified: rng() > 0.1, // ~90% verified
    };
  });

  // Sort newest first
  reviews.sort((a, b) => (a.date < b.date ? 1 : -1));

  return { average, count, distribution: dist, reviews };
};

const cache = new Map<string, ProductReviewSummary>();

export const getProductReviews = (productId: string): ProductReviewSummary => {
  const cached = cache.get(productId);
  if (cached) return cached;
  const built = buildReviews(productId);
  cache.set(productId, built);
  return built;
};
