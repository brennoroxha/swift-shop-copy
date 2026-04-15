const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-foreground pt-10 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Institucional */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-1">Institucional</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Quem Somos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Políticas de Privacidade</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Login */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-1">Login</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Login</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Meus Pedidos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Troca e Devolução</a></li>
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-1">Ajuda</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Perguntas Frequentes</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Formas de Pagamento</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Entrega</a></li>
            </ul>
          </div>

          {/* SAC */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-1">SAC</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cadastre-se, receba descontos exclusivos e fique por dentro de todas as novidades!
            </p>
          </div>
        </div>

        {/* Frete info */}
        <div className="text-center text-sm mb-6">
          <span className="font-bold text-foreground">*Frete Grátis: </span>
          <span className="text-primary">
            Em compras acima de R$299 para as regiões Sul e Sudeste e capitais do Nordeste e Centro Oeste.
          </span>
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
