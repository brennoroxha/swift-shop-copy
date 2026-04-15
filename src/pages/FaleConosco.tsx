import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FaleConosco = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Fale Conosco</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Dados da empresa */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-sm">
              Entre em contato conosco. Teremos prazer em atendê-lo!
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">Endereço</h4>
                  <p className="text-sm text-muted-foreground">
                    Rua Nelson Viana, 180 – Loja 10<br />
                    Centro, Três Rios – RJ<br />
                    CEP: 25805-290
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">Telefone</h4>
                  <p className="text-sm text-muted-foreground">(24) 2251-2189</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">E-mail</h4>
                  <p className="text-sm text-muted-foreground">contato@kompletaferragen.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">Horário de Atendimento</h4>
                  <p className="text-sm text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm text-foreground mb-1">Dados da Empresa</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong className="text-foreground">Razão Social:</strong> Kompleta Ferragens Construcao e Moveis LTDA</li>
                <li><strong className="text-foreground">CNPJ:</strong> 30.063.962/0001-50</li>
              </ul>
            </div>
          </div>

          {/* Formulário */}
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-foreground">Envie sua Mensagem</h2>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Nome Completo</label>
              <Input placeholder="Seu nome" />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
              <Input type="email" placeholder="seu@email.com" />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Telefone</label>
              <Input type="tel" placeholder="(00) 00000-0000" />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Assunto</label>
              <Input placeholder="Ex: Dúvida sobre pedido" />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Mensagem</label>
              <Textarea placeholder="Escreva sua mensagem aqui..." className="min-h-[120px]" />
            </div>

            <Button className="w-full">Enviar Mensagem</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaleConosco;
