import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://kompletaferragens.shop";
export const SITE_NAME = "Kompleta Ferragens";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "product" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  product?: {
    price: number;
    currency?: string;
    availability?: "in stock" | "out of stock";
    brand?: string;
    condition?: "new" | "used" | "refurbished";
  };
}

const SEO = ({ title, description, path = "/", image, type = "website", jsonLd, noindex, product }: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.length > 60 ? title.slice(0, 57) + "..." : title;
  const desc = description.length > 160 ? description.slice(0, 157) + "..." : description;
  const ogImage = image || `${SITE_URL}/placeholder.svg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />

      {product && (
        <>
          <meta property="product:price:amount" content={product.price.toFixed(2)} />
          <meta property="product:price:currency" content={product.currency || "BRL"} />
          <meta property="product:availability" content={product.availability || "in stock"} />
          <meta property="product:condition" content={product.condition || "new"} />
          {product.brand && <meta property="product:brand" content={product.brand} />}
          <meta property="og:price:amount" content={product.price.toFixed(2)} />
          <meta property="og:price:currency" content={product.currency || "BRL"} />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
