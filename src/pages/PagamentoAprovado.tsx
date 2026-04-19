import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Package, Mail } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.jpg";

const PagamentoAprovado = () => {
  const [params] = useSearchParams();
  const { clearCart } = useCart();
  const txId = params.get("tx") ?? "";

  useEffect(() => {
    clearCart();
  }, [clearCart]);

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
