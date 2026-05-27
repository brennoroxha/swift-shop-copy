// Edge function: cria cobrança PIX na KlivoPay e devolve QR Code + copia-e-cola
// Docs: https://docs.klivopay.com.br/
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const KLIVOPAY_OFFER_HASH = "6wbegywf4e";
const KLIVOPAY_PRODUCT_CODE = "b0uk6yxoiw";
const KLIVOPAY_URL = "https://api.klivopay.com.br/api/public/v1/transactions";

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
    const API_TOKEN = Deno.env.get("KLIVOPAY_API_TOKEN");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!API_TOKEN) throw new Error("KLIVOPAY_API_TOKEN não configurado");

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

    const webhookUrl = `${SUPABASE_URL}/functions/v1/klivopay-webhook`;
    const phone = body.customer.phone.replace(/\D/g, "");
    const documentNumber = body.customer.document.replace(/\D/g, "");

    const cart = body.items.map((it) => ({
      name: it.title,
      quantity: it.quantity,
      price: it.unit_price,
      unit_price: it.unit_price,
      product_code: KLIVOPAY_PRODUCT_CODE,
      product_hash: KLIVOPAY_PRODUCT_CODE,
      offer_hash: KLIVOPAY_OFFER_HASH,
      tangible: it.tangible ?? true,
    }));

    const payload = {
      api_token: API_TOKEN,
      amount: body.amount,
      offer_hash: KLIVOPAY_OFFER_HASH,
      payment_method: "pix",
      postback_url: webhookUrl,
      customer: {
        name: body.customer.name,
        email: body.customer.email,
        phone_number: phone,
        document: documentNumber,
      },
      cart,
      metadata: body.metadata ?? { source: "lovable-checkout" },
    };

    const resp = await fetch(KLIVOPAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
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
      console.error("KlivoPay error", resp.status, raw);
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

    const tx: any =
      (data && typeof data.data === "object" && data.data) ||
      (data && typeof data.transaction === "object" && data.transaction) ||
      data;
    const qrCode: string =
      tx?.pix_qr_code ??
      tx?.pix_copy_paste ??
      tx?.pix?.qr_code ??
      tx?.pix?.pix_qr_code ??
      "";
    const expiration: string =
      tx?.expires_at ?? tx?.pix?.expiration_date ?? "";
    const txId: string = String(
      tx?.hash ?? tx?.transaction_hash ?? tx?.id ?? "",
    );
    const amount: number = Number(tx?.amount ?? body.amount);
    const status: string = String(tx?.status ?? "pending");

    if (!qrCode || !txId) {
      console.error("KlivoPay resposta inesperada:", raw);
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
    console.error("klivopay-pix error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
