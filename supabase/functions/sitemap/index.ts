// Public sitemap.xml for Google / Bing
// URL: https://ihnvrnatzfzdcwdjscec.supabase.co/functions/v1/sitemap

const SITE_URL = "https://kompletaferragens.shop";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const products = [
  "Escada Alumínio 5 Degraus 1,53m 120kg Prata e Vermelho Reisam",
  "Escada Articulada 4x4 16 Degraus em Alumínio 4,48m Reisam",
  "Escada Alumínio 3 Degraus 1,08m 120kg Prata e Vermelho Reisam",
  "Escada Extensível 15x2 30 Degraus em Alumínio 7,66m Botafogo",
  "Banqueta Escada Alumínio 3 Degraus 0,65m 120kg Prata e Vermelho Reisam",
  "Escada Alumínio 5 Degraus 1,56m 120kg Prata e Vermelho Botafogo",
  "Escada Articulada 4x3 12 Degraus em Alumínio 3,4m Reisam",
  "Escada Articulada 4x3 De Alumínio 12 Degraus 3,50 Metros de Altura",
  "Escada Articulada 4x4 16 Degraus em Alumínio 4,23m Botafogo",
  "Escada Banqueta Bilateral Prática 2 Degraus Art Factory",
  "Escada De Alumínio 5 Degraus New Star Art Factory",
  "Escada De Alumínio Dupla 3 Degraus Natural 120kg Reisam",
  "Escada De Alumínio Dupla 5 Degraus Natural 120kg Reisam",
  "Escada De Alumínio Tesoura Real Escadas 006 Prateado/Azul",
  "Escada Doméstica Alumínio 4 Degraus Natural 120 Kg Reisam",
  "Escada Doméstica Alumínio 7 Degraus Natural 120 Kg Reisam",
  "Escada Extensível 9x2 18 Degraus em Alumínio 4,44m Botafogo",
];

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/categoria/escadas", priority: "0.9", changefreq: "daily" },
  { path: "/categoria/ver-tudo", priority: "0.9", changefreq: "daily" },
  { path: "/sobre-nos", priority: "0.5", changefreq: "monthly" },
  { path: "/fale-conosco", priority: "0.5", changefreq: "monthly" },
  { path: "/politica-privacidade", priority: "0.3", changefreq: "yearly" },
  { path: "/politica-trocas", priority: "0.3", changefreq: "yearly" },
  { path: "/politica-envio", priority: "0.3", changefreq: "yearly" },
  { path: "/politica-reembolso", priority: "0.3", changefreq: "yearly" },
  { path: "/termos-condicoes", priority: "0.3", changefreq: "yearly" },
  { path: "/rastrear-pedido", priority: "0.4", changefreq: "monthly" },
];

const slugify = (name: string) =>
  name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const generateSitemap = () => {
  const today = new Date().toISOString().slice(0, 10);

  const staticUrls = staticPages.map((p) => `  <url>
    <loc>${xmlEscape(SITE_URL + p.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n");

  const productUrls = products.map((name) => `  <url>
    <loc>${xmlEscape(`${SITE_URL}/produto/${slugify(name)}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${productUrls}
</urlset>`;
};

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    return new Response(generateSitemap(), {
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
