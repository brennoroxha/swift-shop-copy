// Public Google Shopping XML feed (RSS 2.0 + g: namespace)
// URL: https://ihnvrnatzfzdcwdjscec.supabase.co/functions/v1/google-shopping-feed

const SITE_URL = "https://kompletaferragens.shop";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Product = {
  id: string;
  name: string;
  brand: string;
  ean: string;
  image: string;
  originalPrice: number;
  salePrice: number;
};

const products: Product[] = [
  { id: "1", name: "Escada Alumínio 5 Degraus 1,53m 120kg Prata e Vermelho Reisam", brand: "Reisam", ean: "", image: `${SITE_URL}/assets/escada-5-degraus-capa.png`, originalPrice: 129.90, salePrice: 99.90 },
  { id: "2", name: "Escada Articulada 4x4 16 Degraus em Alumínio 4,48m Reisam", brand: "Reisam", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_articulada_4x4_16_degraus_em_aluminio_448m_reisam_90927781_4853_1800x1800-1-600x600.jpeg", originalPrice: 549.90, salePrice: 439.91 },
  { id: "3", name: "Escada Alumínio 3 Degraus 1,08m 120kg Prata e Vermelho Reisam", brand: "Reisam", ean: "7892761000411", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_aluminio_3_degraus_108m_120kg_prata_e_vermelho_91713272_0001_600x600.jpg", originalPrice: 99.90, salePrice: 79.90 },
  { id: "4", name: "Escada Extensível 15x2 30 Degraus em Alumínio 7,66m Botafogo", brand: "Botafogo", ean: "7908155402812", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_extensivel_15x2_30_degraus_em_aluminio_766m_botafogo_89961746_fea3_1800x1800-1-600x600.jpg", originalPrice: 829.90, salePrice: 663.92 },
  { id: "5", name: "Banqueta Escada Alumínio 3 Degraus 0,65m 120kg Prata e Vermelho Reisam", brand: "Reisam", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/banqueta_escada_aluminio_3_degraus_065m_120kg_91713265_0001_600x600.jpg", originalPrice: 139.90, salePrice: 109.90 },
  { id: "6", name: "Escada Alumínio 5 Degraus 1,56m 120kg Prata e Vermelho Botafogo", brand: "Botafogo", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_5_degraus_aluminio_106m.jpg", originalPrice: 129.90, salePrice: 99.90 },
  { id: "7", name: "Escada Articulada 4x3 12 Degraus em Alumínio 3,4m Reisam", brand: "Reisam", ean: "7892761904771", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_articulada_4x3_12_degraus_em_aluminio_34m_reisam_90927774_6811_1800x1800-1-600x600.jpeg", originalPrice: 489.90, salePrice: 391.91 },
  { id: "8", name: "Escada Articulada 4x3 De Alumínio 12 Degraus 3,50 Metros de Altura", brand: "Multiuso", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/D_NQ_NP_2X_923015-MLA96131444617_102025-F-600x600.webp", originalPrice: 359.90, salePrice: 284.42 },
  { id: "9", name: "Escada Articulada 4x4 16 Degraus em Alumínio 4,23m Botafogo", brand: "Botafogo", ean: "7908155402942", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_articulada_4x4_degraus_13_89961683_0001_600x600.jpg", originalPrice: 409.90, salePrice: 325.98 },
  { id: "10", name: "Escada Banqueta Bilateral Prática 2 Degraus Art Factory", brand: "Art Factory", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_banqueta_bilateral_pratica_2_degraus_art_factory_1569749508_540b_600x600.jpg", originalPrice: 129.90, salePrice: 99.90 },
  { id: "11", name: "Escada De Alumínio 5 Degraus New Star Art Factory", brand: "Art Factory", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_de_aluminio_5_degraus_new_star_art_factory_1567199739_2d94_1800x1800-600x600.jpg", originalPrice: 229.90, salePrice: 183.20 },
  { id: "12", name: "Escada De Alumínio Dupla 3 Degraus Natural 120kg Reisam", brand: "Reisam", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_de_aluminio_dupla_3_degraus_natural_120kg_reisam_91839720_2e10_600x600.jpg", originalPrice: 189.90, salePrice: 153.92 },
  { id: "13", name: "Escada De Alumínio Dupla 5 Degraus Natural 120kg Reisam", brand: "Reisam", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_de_aluminio_dupla_5_degraus_natural_120kg_reisam_91839734_e13f_600x600.jpg", originalPrice: 249.90, salePrice: 199.40 },
  { id: "14", name: "Escada De Alumínio Tesoura Real Escadas 006 Prateado/Azul", brand: "Real Escadas", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_de_aluminio_tesoura_real_escadas_006_prateado_azul_1567481594_4ce7_600x600.jpg", originalPrice: 149.90, salePrice: 118.05 },
  { id: "15", name: "Escada Doméstica Alumínio 4 Degraus Natural 120 Kg Reisam", brand: "Reisam", ean: "", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_domestica_aluminio_4_degraus_natural_reisam_91836990_6bc5_600x600.jpg", originalPrice: 149.90, salePrice: 114.90 },
  { id: "16", name: "Escada Doméstica Alumínio 7 Degraus Natural 120 Kg Reisam", brand: "Reisam", ean: "7892761000657", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_domestica_aluminio_7_degraus_natural_reisam_91837025_ec8d_600x600.jpg", originalPrice: 289.90, salePrice: 229.05 },
  { id: "17", name: "Escada Extensível 9x2 18 Degraus em Alumínio 4,44m Botafogo", brand: "Botafogo", ean: "7908155402751", image: "https://eletroferragens.com/wp-content/uploads/2025/11/escada_extensivel_9x2_18_degraus_em_aluminio_444m_botafogo_89961704_cc8f_1800x1800-1-600x600.jpg", originalPrice: 729.90, salePrice: 583.92 },
];

const slugify = (name: string) =>
  name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

const buildMpn = (brand: string, id: string) =>
  `${brand.toUpperCase().replace(/[^A-Z0-9]/g, "")}-${id.padStart(4, "0")}`;

const buildDescription = (name: string, brand: string) =>
  `${name} da marca ${brand}. Produto original, novo, com nota fiscal e garantia. Frete grátis para todo o Brasil. Pagamento via Pix com 10% de desconto.`;

const generateXML = () => {
  const today = new Date();
  const validUntil = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    .toISOString().slice(0, 10);
  const todayStr = today.toISOString().slice(0, 10);

  const items = products.map((p) => {
    const slug = slugify(p.name);
    const link = `${SITE_URL}/produto/${slug}`;
    const hasEan = p.ean && p.ean.trim().length > 0;
    const mpn = buildMpn(p.brand, p.id);
    const description = buildDescription(p.name, p.brand);

    return `    <item>
      <g:id>${xmlEscape(p.id)}</g:id>
      <title>${cdata(p.name)}</title>
      <description>${cdata(description)}</description>
      <link>${xmlEscape(link)}</link>
      <g:image_link>${xmlEscape(p.image)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:availability_date>${todayStr}T00:00-03:00</g:availability_date>
      <g:price>${p.originalPrice.toFixed(2)} BRL</g:price>
      <g:sale_price>${p.salePrice.toFixed(2)} BRL</g:sale_price>
      <g:sale_price_effective_date>${todayStr}T00:00-03:00/${validUntil}T23:59-03:00</g:sale_price_effective_date>
      <g:brand>${cdata(p.brand)}</g:brand>
      <g:mpn>${xmlEscape(mpn)}</g:mpn>
      <g:condition>new</g:condition>
      <g:adult>no</g:adult>
      <g:age_group>adult</g:age_group>
      ${hasEan ? `<g:gtin>${xmlEscape(p.ean)}</g:gtin>` : `<g:identifier_exists>no</g:identifier_exists>`}
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

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const xml = generateXML();
    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(`<?xml version="1.0"?><error>${msg}</error>`, {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/xml" },
    });
  }
});
