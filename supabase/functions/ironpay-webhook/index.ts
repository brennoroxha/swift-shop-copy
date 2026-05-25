// Edge function: webhook (postback) da IronPay
// Payload esperado: { transaction_hash, status, amount, payment_method, paid_at }
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const raw = await req.text();
    let payload: Record<string, unknown> = {};
    try {
      payload = JSON.parse(raw);
    } catch {
      console.error("Webhook payload inválido:", raw);
      return new Response(
        JSON.stringify({ ok: false, error: "invalid json" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("IronPay webhook payload:", JSON.stringify(payload));

    const data: any =
      (payload as any).data ?? (payload as any).transaction ?? payload;

    const transactionId = String(
      data?.transaction_hash ?? data?.hash ?? data?.id ?? data?.transaction_id ?? "",
    );
    const status = String(data?.status ?? "").toLowerCase();

    if (!transactionId || !status) {
      console.warn("Webhook sem id/status reconhecível");
      return new Response(JSON.stringify({ ok: true, ignored: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isPaid = ["paid", "approved", "succeeded", "completed"].includes(
      status,
    );

    const update: Record<string, unknown> = { status };
    if (isPaid) update.paid_at = new Date().toISOString();

    const { error } = await supabase
      .from("orders")
      .update(update)
      .eq("transaction_id", transactionId);

    if (error) {
      console.error("Erro ao atualizar pedido:", error);
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("ironpay-webhook error:", message);
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
