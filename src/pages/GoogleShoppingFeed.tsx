import { allProducts } from "@/data/products";
import { productDescriptions } from "@/data/productDescriptions";
import { SITE_URL } from "@/components/SEO";

const slugify = (name: string) =>
  name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Escape XML special chars; safe to wrap result in CDATA OR use raw.
const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

// Wrap text in CDATA, escaping any literal "]]>" sequences first.
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

const buildDescription = (id: string, name: string, brand: string): string => {
  const d = productDescriptions[id];
  const parts: string[] = [];
  if (d?.intro) parts.push(d.intro);
  if (d?.details) parts.push(d.details);
  if (d?.benefits?.length) parts.push("Benefícios: " + d.benefits.join("; ") + ".");
  const text = parts.join(" ").trim();
  if (text.length >= 70) return text.slice(0, 4900);
  // Fallback que ainda atende ao mínimo recomendado pelo Google (>=70 chars).
  return `${name} da marca ${brand}. Produto original, novo, com nota fiscal e garantia. Frete grátis para todo o Brasil. Pagamento via Pix, cartão de crédito ou boleto.`;
};

// MPN sintético estável (não inventa GTIN — só identificador interno do fabricante).
const buildMpn = (brand: string, id: string) =>
  `${brand.toUpperCase().replace(/[^A-Z0-9]/g, "")}-${id.padStart(4, "0")}`;

const generateXML = () => {
  const today = new Date();
  const validUntil = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    .toISOString()
    .slice(0, 10);

  const items = allProducts.map((p) => {
    const slug = slugify(p.name);
    const link = `${SITE_URL}/produto/${slug}`;
    const imageUrl = p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`;
    const hasEan = p.ean && p.ean.trim().length > 0;
    const mpn = buildMpn(p.brand, p.id);
    const description = buildDescription(p.id, p.name, p.brand);

    return `    <item>
      <g:id>${xmlEscape(p.id)}</g:id>
      <title>${cdata(p.name)}</title>
      <description>${cdata(description)}</description>
      <link>${xmlEscape(link)}</link>
      <g:image_link>${xmlEscape(imageUrl)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:availability_date>${today.toISOString().slice(0, 10)}T00:00-03:00</g:availability_date>
      <g:price>${p.originalPrice.toFixed(2)} BRL</g:price>
      <g:sale_price>${p.salePrice.toFixed(2)} BRL</g:sale_price>
      <g:sale_price_effective_date>${today.toISOString().slice(0, 10)}T00:00-03:00/${validUntil}T23:59-03:00</g:sale_price_effective_date>
      <g:brand>${cdata(p.brand)}</g:brand>
      <g:mpn>${xmlEscape(mpn)}</g:mpn>
      <g:condition>new</g:condition>
      <g:adult>no</g:adult>
      <g:age_group>adult</g:age_group>
      ${hasEan ? `<g:gtin>${xmlEscape(p.ean!)}</g:gtin>` : `<g:identifier_exists>no</g:identifier_exists>`}
      <g:google_product_category>632</g:google_product_category>
      <g:product_type>${cdata("Ferramentas > Escadas")}</g:product_type>
      <g:item_group_id>${xmlEscape(p.brand.toLowerCase().replace(/\s+/g, "-"))}-escadas</g:item_group_id>
      <g:shipping>
        <g:country>BR</g:country>
        <g:service>Padrão</g:service>
        <g:price>0.00 BRL</g:price>
      </g:shipping>
      <g:shipping_weight>5.0 kg</g:shipping_weight>
      <g:tax>
        <g:country>BR</g:country>
        <g:rate>0.00</g:rate>
        <g:tax_ship>no</g:tax_ship>
      </g:tax>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${cdata("Kompleta Ferragens - Loja Online")}</title>
    <link>${SITE_URL}</link>
    <description>${cdata("Escadas, ferramentas e materiais de construção com frete grátis para todo o Brasil.")}</description>
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

  const withGtin = allProducts.filter((p) => p.ean && p.ean.trim().length > 0).length;
  const withoutGtin = allProducts.length - withGtin;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-6 text-center">
        <h1 className="font-heading font-bold text-2xl text-foreground">Google Shopping Feed</h1>
        <p className="text-muted-foreground text-sm">
          Gere o XML com {allProducts.length} produtos para enviar ao Google Merchant Center.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-secondary/50 rounded-md p-3">
            <p className="font-bold text-foreground text-lg">{withGtin}</p>
            <p className="text-muted-foreground text-xs">com GTIN/EAN real</p>
          </div>
          <div className="bg-secondary/50 rounded-md p-3">
            <p className="font-bold text-foreground text-lg">{withoutGtin}</p>
            <p className="text-muted-foreground text-xs">com identifier_exists:no</p>
          </div>
        </div>
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
          {generateXML().slice(0, 1200)}...
        </pre>
      </div>
    </div>
  );
};

export default GoogleShoppingFeed;
