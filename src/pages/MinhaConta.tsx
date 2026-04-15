import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { User, Package, MapPin, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MinhaConta = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Minha Conta</h1>
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm text-center">Faça login para acessar seus dados e pedidos.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
              <Input type="email" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Senha</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full">Entrar</Button>
            <p className="text-center text-sm text-muted-foreground">
              Não tem conta? <span className="text-primary cursor-pointer hover:underline">Cadastre-se</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MinhaConta;
