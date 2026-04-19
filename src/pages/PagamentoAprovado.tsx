import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Package, Mail, Upload, Image as ImageIcon, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

const PagamentoAprovado = () => {
  const [params] = useSearchParams();
  const { clearCart } = useCart();
  const txId = params.get("tx") ?? "";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Carregar comprovante existente, se já enviado
  useEffect(() => {
    if (!txId) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("proof_url")
        .eq("transaction_id", txId)
        .maybeSingle();
      if (data?.proof_url) setProofUrl(data.proof_url);
    })();
  }, [txId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Envie uma imagem (JPG, PNG, etc).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo 10MB.");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${txId || "sem-tx"}/${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("payment-proofs")
        .upload(path, file, { contentType: file.type, upsert: false });

      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage.from("payment-proofs").getPublicUrl(path);
      const publicUrl = urlData.publicUrl;

      if (txId) {
        await supabase
          .from("orders")
          .update({ proof_url: publicUrl })
          .eq("transaction_id", txId);
      }

      setProofUrl(publicUrl);
      toast.success("Comprovante enviado com sucesso!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Erro ao enviar comprovante.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <header className="bg-white border-b border-border">
        <div className="container py-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 md:h-9 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-12 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-border max-w-xl w-full p-8 md:p-10 text-center space-y-5">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
          </div>

          <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
            Pagamento aprovado!
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Recebemos seu pagamento via PIX. Em breve seu pedido será preparado e enviado.
          </p>

          {txId && (
            <p className="text-xs text-muted-foreground">
              Código da transação: <span className="font-mono">{txId}</span>
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
            <div className="flex items-start gap-3 border border-border rounded p-4">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Confirmação por e-mail</p>
                <p className="text-xs text-muted-foreground">Você receberá os detalhes em instantes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-border rounded p-4">
              <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Entrega em 3 a 6 dias úteis</p>
                <p className="text-xs text-muted-foreground">Frete grátis via transportadora.</p>
              </div>
            </div>
          </div>

          {/* Enviar comprovante */}
          <div className="border border-dashed border-primary/40 rounded-lg p-5 text-left bg-primary/5 space-y-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-foreground text-sm">
                Enviar comprovante de pagamento
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Anexe a imagem do comprovante PIX para acelerar a conferência do seu pedido.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />

            {proofUrl ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  <Check className="w-4 h-4" />
                  Comprovante enviado
                </div>
                <a
                  href={proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={proofUrl}
                    alt="Comprovante enviado"
                    className="max-h-48 mx-auto rounded border border-border"
                  />
                </a>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full text-xs text-primary underline hover:no-underline"
                >
                  Enviar outro comprovante
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider px-6 py-3 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Upload className="w-4 h-4" />
                {uploading ? "Enviando..." : "Selecionar imagem"}
              </button>
            )}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider px-8 py-3 rounded hover:opacity-90 transition-opacity"
            >
              Voltar para a loja
            </Link>
            <Link
              to="/rastrear-pedido"
              className="border border-border text-foreground font-heading font-bold text-sm uppercase tracking-wider px-8 py-3 rounded hover:bg-muted transition-colors"
            >
              Rastrear pedido
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PagamentoAprovado;
