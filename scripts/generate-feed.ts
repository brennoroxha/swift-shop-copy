import { allProducts } from "../src/data/products";
import { productDescriptions } from "../src/data/productDescriptions";

const SITE_URL = "https://kompletaferragens.shop";

const slugify = (name: string) =>
  name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

const buildDescription = (id: string, name: string, brand: string): string => {
  const d = productDescriptions[id];
  const parts: string[] = [];
  if (d?.intro) parts.push(d.intro);
  if (d?.details) parts.push(d.details);
  if (d?.benefits?.length) parts.push("Benefícios: " + d.benefits.join("; ") + ".");
  const text = parts.join(" ").trim();
  if (text.length >= 70) return text.slice(0, 4900);
  return `${name} da marca ${brand}. Produto original, novo, com nota fiscal e garantia. Frete grátis para todo o Brasil. Pagamento via Pix, cartão de crédito ou boleto.`;
};

const buildMpn = (brand: string, id: string) =>
  `${brand.toUpperCase().replace(/[^A-Z0-9]/g, "")}-${id.padStart(4, "0")}`;

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

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${cdata("Kompleta Ferragens - Loja Online")}</title>
    <link>${SITE_URL}</link>
    <description>${cdata("Escadas, ferramentas e materiais de construção com frete grátis para todo o Brasil.")}</description>
${items.join("\n")}
  </channel>
</rss>`;

import { writeFileSync } from "fs";
import { resolve } from "path";
writeFileSync(resolve("public/google-shopping-feed.xml"), xml);
console.log(`google-shopping-feed.xml gerado com ${allProducts.length} produtos`);
