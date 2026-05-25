// Edge function: cria cobrança PIX na IronPay e devolve QR Code + copia-e-cola
// Docs: https://docs.ironpayapp.com.br/  (base: https://api.ironpayapp.com.br/api/public/v1)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const IRONPAY_PRODUCT_HASH = "dhax2fql90";
const IRONPAY_OFFER_HASH = "uqftytyrci";
const IRONPAY_BASE_URL = "https://api.ironpayapp.com.br/api/public/v1";

interface CartItem {
  title: string;
  unit_price: number;
  quantity: number;
  tangible?: boolean;
}

interface RequestBody {
  amount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    document: string;
  };
  items: CartItem[];
  metadata?: Record<string, unknown>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const API_TOKEN = Deno.env.get("IRONPAY_API_TOKEN");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!API_TOKEN) throw new Error("IRONPAY_API_TOKEN não configurado");

    const body = (await req.json()) as RequestBody;

    if (!body.amount || body.amount < 1) {
      return new Response(JSON.stringify({ error: "Valor inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (
      !body.customer?.name ||
      !body.customer?.email ||
      !body.customer?.phone ||
      !body.customer?.document
    ) {
      return new Response(
        JSON.stringify({ error: "Dados do cliente incompletos" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Itens do pedido obrigatórios" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const webhookUrl = `${SUPABASE_URL}/functions/v1/ironpay-webhook`;
    const phone = body.customer.phone.replace(/\D/g, "");
    const documentNumber = body.customer.document.replace(/\D/g, "");

    const payload = {
      api_token: API_TOKEN,
      amount: body.amount,
      payment_method: "pix",
      postback_url: webhookUrl,
      offer_hash: IRONPAY_OFFER_HASH,
      product_hash: IRONPAY_PRODUCT_HASH,
      customer: {
        name: body.customer.name,
        email: body.customer.email,
        phone,
        document: documentNumber,
        document_type: "cpf",
      },
      items: body.items.map((it) => ({
        title: it.title,
        unit_price: it.unit_price,
        quantity: it.quantity,
        tangible: it.tangible ?? true,
        offer_hash: IRONPAY_OFFER_HASH,
        product_hash: IRONPAY_PRODUCT_HASH,
      })),
      pix: { expires_in_days: 1 },
      metadata: body.metadata ?? { source: "lovable-checkout" },
    };

    const url = `${IRONPAY_BASE_URL}/transactions?api_token=${encodeURIComponent(API_TOKEN)}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
        "X-API-Token": API_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const raw = await resp.text();
    let data: any = {};
    try {
      data = JSON.parse(raw);
    } catch {
      data = { raw };
    }

    if (!resp.ok) {
      console.error("IronPay error", resp.status, raw);
      return new Response(
        JSON.stringify({
          error: "Falha ao gerar PIX",
          status: resp.status,
          details: data,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Resposta pode vir como { data: {...} } ou plana
    const tx: any = data?.data ?? data?.transaction ?? data;
    const pix: any = tx?.pix ?? tx?.pix_qr_code ?? tx;
    const qrCode: string =
      pix?.qr_code ??
      pix?.qrcode ??
      pix?.emv ??
      pix?.pix_qr_code ??
      tx?.qr_code ??
      "";
    const expiration: string =
      pix?.expiration_date ?? pix?.expires_at ?? tx?.expires_at ?? "";
    const txId: string = String(
      tx?.hash ?? tx?.transaction_hash ?? tx?.id ?? tx?.transaction_id ?? "",
    );
    const amount: number = Number(tx?.amount ?? body.amount);
    const status: string = String(tx?.status ?? "pending");

    if (!qrCode || !txId) {
      console.error("IronPay resposta inesperada:", raw);
      return new Response(
        JSON.stringify({
          error: "Resposta inesperada do gateway",
          details: data,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    try {
      const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
      await supabase.from("orders").insert({
        transaction_id: txId,
        amount,
        status,
        customer_name: body.customer.name,
        customer_email: body.customer.email,
        customer_document: documentNumber,
        items: body.items,
      });
    } catch (dbErr) {
      console.error("Erro ao salvar pedido:", dbErr);
    }

    return new Response(
      JSON.stringify({
        id: txId,
        amount,
        status,
        pix: { qr_code: qrCode, expiration_date: expiration },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("ironpay-pix error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
