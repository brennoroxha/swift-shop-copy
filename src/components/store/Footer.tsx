import { Link } from "react-router-dom";
import metodospag from "@/assets/metodospag.png";
import correios from "@/assets/correios.png";
import totalexpress from "@/assets/totalexpress.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-foreground pt-10 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Informações Comerciais */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-1">Informações Comerciais</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sobre-nos" className="hover:text-foreground transition-colors">Sobre Nós</Link></li>
              <li><Link to="/politica-privacidade" className="hover:text-foreground transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/politica-envio" className="hover:text-foreground transition-colors">Política de Envio e Prazo de Entrega</Link></li>
              <li><Link to="/politica-reembolso" className="hover:text-foreground transition-colors">Política de Reembolso</Link></li>
              <li><Link to="/politica-trocas" className="hover:text-foreground transition-colors">Política de Trocas e Devoluções</Link></li>
              <li><Link to="/termos-condicoes" className="hover:text-foreground transition-colors">Termos e Condições</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Formas de Pagamento</a></li>
            </ul>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-1">Navegação</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/minha-conta" className="hover:text-foreground transition-colors">Minha Conta</Link></li>
              <li><Link to="/rastrear-pedido" className="hover:text-foreground transition-colors">Rastrear Pedido</Link></li>
              <li><Link to="/fale-conosco" className="hover:text-foreground transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>
        </div>

        {/* Formas de Pagamento */}
        <div className="mb-6">
          <h4 className="font-heading font-bold text-sm mb-1">Formas de Pagamento</h4>
          <div className="w-8 h-0.5 bg-primary mb-4" />
          <img src={metodospag} alt="Formas de pagamento: American Express, Visa, Mastercard, Elo, Pix" className="h-8 object-contain" />
        </div>

        {/* Formas de Envio */}
        <div className="mb-6">
          <h4 className="font-heading font-bold text-sm mb-1">Formas de Envio</h4>
          <div className="w-8 h-0.5 bg-primary mb-4" />
          <div className="flex items-center gap-4">
            <img src={correios} alt="Correios" className="h-8 object-contain" />
            <img src={totalexpress} alt="Total Express" className="h-8 object-contain" />
          </div>
        </div>

        {/* Identidade Legal (exigido pelo Google Shopping) */}
        <div className="border-t border-border pt-6 mb-4">
          <h4 className="font-heading font-bold text-sm mb-1">Dados da Empresa</h4>
          <div className="w-8 h-0.5 bg-primary mb-4" />
          <div className="text-xs text-muted-foreground space-y-1 leading-relaxed">
            <p><strong className="text-foreground">Kompleta Ferragens Construcao e Moveis LTDA</strong></p>
            <p>CNPJ: 30.063.962/0001-50</p>
            <p>Rua Nelson Viana, 180 – Loja 10 – Centro – Três Rios – RJ – CEP 25805-290</p>
            <p>Telefone: (24) 2251-2189 · E-mail: contato@kompletaferragen.com.br</p>
            <p>Horário de atendimento: Segunda a Sexta, 8h às 18h</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>© 2025 Kompleta Ferragens. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
