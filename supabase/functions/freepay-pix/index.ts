// Edge function: cria cobrança PIX na Freepay e devolve QR Code + copia-e-cola
// Autenticação Freepay: Basic Base64(PUBLIC_KEY:SECRET_KEY)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CartItem {
  title: string;
  unit_price: number; // em centavos
  quantity: number;
  tangible?: boolean;
}

interface RequestBody {
  amount: number; // total em centavos
  customer: {
    name: string;
    email: string;
    phone: string; // apenas dígitos
    document: string; // apenas dígitos (CPF)
  };
  items: CartItem[];
  metadata?: Record<string, unknown>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PUBLIC_KEY = Deno.env.get("FREEPAY_PUBLIC_KEY");
    const SECRET_KEY = Deno.env.get("FREEPAY_SECRET_KEY");

    if (!PUBLIC_KEY || !SECRET_KEY) {
      throw new Error("Credenciais Freepay não configuradas");
    }

    const body = (await req.json()) as RequestBody;

    // Validação básica
    if (!body.amount || body.amount < 1) {
      return new Response(
        JSON.stringify({ error: "Valor inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!body.customer?.name || !body.customer?.email || !body.customer?.phone || !body.customer?.document) {
      return new Response(
        JSON.stringify({ error: "Dados do cliente incompletos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Itens do pedido obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const auth = btoa(`${PUBLIC_KEY}:${SECRET_KEY}`);

    const payload = {
      amount: body.amount,
      payment_method: "pix",
      customer: {
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone.replace(/\D/g, ""),
        document: {
          number: body.customer.document.replace(/\D/g, ""),
          type: "cpf",
        },
      },
      items: body.items.map((it) => ({
        title: it.title,
        unit_price: it.unit_price,
        quantity: it.quantity,
        tangible: it.tangible ?? true,
      })),
      pix: { expires_in_days: 1 },
      metadata: body.metadata ?? { source: "lovable-checkout" },
    };

    const resp = await fetch(
      "https://api.freepaybrasil.com/v1/payment-transaction/create",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await resp.json();

    if (!resp.ok || !data?.data?.pix?.qr_code) {
      console.error("Freepay error", resp.status, JSON.stringify(data));
      return new Response(
        JSON.stringify({
          error: "Falha ao gerar PIX",
          status: resp.status,
          details: data,
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        id: data.data.id,
        amount: data.data.amount,
        status: data.data.status,
        pix: {
          qr_code: data.data.pix.qr_code, // copia-e-cola
          expiration_date: data.data.pix.expiration_date,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("freepay-pix error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
