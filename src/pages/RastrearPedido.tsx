import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RastrearPedido = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Rastrear Pedido</h1>
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm text-center">
              Insira o código de rastreamento para acompanhar o status da sua entrega.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Código de Rastreamento</label>
              <Input placeholder="Ex: BR123456789XX" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">E-mail do Pedido</label>
              <Input type="email" placeholder="seu@email.com" />
            </div>
            <Button className="w-full gap-2">
              <Search className="w-4 h-4" />
              Rastrear
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RastrearPedido;
