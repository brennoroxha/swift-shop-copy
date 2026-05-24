import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const PoliticaEnvio = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Política de Envio e Prazo de Entrega</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            A <strong className="text-foreground">Kompleta Ferragens</strong> realiza entregas para todo o Brasil, utilizando transportadoras confiáveis como Correios e Total Express.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">1. Prazo de Entrega</h2>
          <p>
            O prazo estimado de entrega é de <strong className="text-foreground">3 a 6 dias úteis</strong> após a confirmação do pagamento. O prazo pode variar de acordo com a região de destino e a disponibilidade do produto em estoque.
          </p>
          <p>
            O prazo de entrega começa a contar a partir da confirmação do pagamento:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Cartão de crédito:</strong> após aprovação pela operadora</li>
            <li><strong className="text-foreground">Pix:</strong> após confirmação do pagamento</li>
            <li><strong className="text-foreground">Boleto bancário:</strong> até 2 dias úteis após o pagamento</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">2. Transportadoras</h2>
          <p>
            Trabalhamos com as seguintes transportadoras:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Correios</li>
            <li>Total Express</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">3. Rastreamento</h2>
          <p>
            Após o envio, você receberá um código de rastreamento por e-mail para acompanhar o status da sua entrega em tempo real.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">4. Tentativas de Entrega</h2>
          <p>
            As transportadoras realizam até 3 tentativas de entrega no endereço informado. Caso não haja ninguém para receber, o pedido poderá ser encaminhado para a agência mais próxima ou devolvido ao remetente.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">5. Endereço de Entrega</h2>
          <p>
            É responsabilidade do cliente fornecer o endereço de entrega correto e completo. A Kompleta Ferragens não se responsabiliza por atrasos ou devoluções causadas por informações incorretas.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">6. Dúvidas</h2>
          <p>
            Para dúvidas sobre envio e entrega, entre em contato pelo e-mail <strong className="text-foreground">sac@kompletaferragens.shop</strong> ou pelo telefone <strong className="text-foreground">(24) 2251-2189</strong>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaEnvio;
