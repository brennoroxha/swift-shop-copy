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
              <li><a href="#" className="hover:text-foreground transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de Envio e Prazo de Entrega</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de Reembolso</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Termos e Condições</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Formas de Pagamento</a></li>
            </ul>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-1">Navegação</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Minha Conta</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Rastrear Pedido</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Fale Conosco</a></li>
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

        {/* Copyright */}
        <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>© 2025 Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
