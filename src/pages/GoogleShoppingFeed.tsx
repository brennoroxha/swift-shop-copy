import { allProducts } from "@/data/products";

const SITE_URL = "https://storefront-soulmate.lovable.app";

const slugify = (name: string) =>
  name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const generateXML = () => {
  const items = allProducts.map((p) => {
    const slug = slugify(p.name);
    const link = `${SITE_URL}/produto/${slug}`;
    const imageUrl = p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`;
    const hasEan = p.ean && p.ean.trim().length > 0;

    return `    <item>
      <g:id>${p.id}</g:id>
      <title><![CDATA[${p.name}]]></title>
      <description><![CDATA[${p.name} - ${p.brand} Original com Frete Grátis]]></description>
      <link>${link}</link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${p.originalPrice.toFixed(2)} BRL</g:price>
      <g:sale_price>${p.salePrice.toFixed(2)} BRL</g:sale_price>
      <g:brand>${p.brand}</g:brand>
      <g:condition>new</g:condition>
      ${hasEan ? `<g:gtin>${p.ean}</g:gtin>` : `<g:identifier_exists>no</g:identifier_exists>`}
      <g:google_product_category>Hardware &gt; Tools &gt; Ladders</g:google_product_category>
      <g:product_type><![CDATA[Escadas]]></g:product_type>
      <g:shipping>
        <g:country>BR</g:country>
        <g:price>0.00 BRL</g:price>
      </g:shipping>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Eletroferragens - Loja Online</title>
    <link>${SITE_URL}</link>
    <description>Escadas e ferramentas com Frete Grátis</description>
${items.join("\n")}
  </channel>
</rss>`;
};

const GoogleShoppingFeed = () => {
  const handleDownload = () => {
    const xml = generateXML();
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "google-shopping-feed.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const xml = generateXML();
    navigator.clipboard.writeText(xml);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-6 text-center">
        <h1 className="font-heading font-bold text-2xl text-foreground">Google Shopping Feed</h1>
        <p className="text-muted-foreground text-sm">
          Gere o XML com {allProducts.length} produtos para enviar ao Google Merchant Center.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            Baixar XML
          </button>
          <button
            onClick={handleCopy}
            className="w-full border-2 border-primary text-primary font-bold py-3 rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Copiar XML
          </button>
        </div>
        <pre className="text-left text-xs text-muted-foreground bg-secondary/50 p-4 rounded-md overflow-auto max-h-64">
          {generateXML().slice(0, 800)}...
        </pre>
      </div>
    </div>
  );
};

export default GoogleShoppingFeed;
