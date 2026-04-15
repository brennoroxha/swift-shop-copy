import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const PoliticaReembolso = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Política de Reembolso</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            A <strong className="text-foreground">Kompleta Ferragens</strong> preza pela satisfação de seus clientes. Caso seja necessário solicitar um reembolso, siga as orientações abaixo.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">1. Quando o Reembolso é Aplicável</h2>
          <p>O reembolso poderá ser solicitado nas seguintes situações:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Produto recebido com defeito de fabricação</li>
            <li>Produto diferente do que foi adquirido</li>
            <li>Produto danificado durante o transporte</li>
            <li>Desistência da compra dentro do prazo de 7 dias corridos após o recebimento (direito de arrependimento – Art. 49 do CDC)</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">2. Como Solicitar o Reembolso</h2>
          <p>
            Para solicitar o reembolso, entre em contato conosco informando o número do pedido e o motivo da solicitação:
          </p>
          <ul className="list-none space-y-1">
            <li><strong className="text-foreground">E-mail:</strong> contato@kompletaferragen.com.br</li>
            <li><strong className="text-foreground">Telefone:</strong> (24) 2251-2189</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">3. Prazo para Reembolso</h2>
          <p>
            Após a aprovação da solicitação e o recebimento do produto devolvido (quando aplicável), o reembolso será processado em até <strong className="text-foreground">10 dias úteis</strong>, conforme a forma de pagamento original:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Cartão de crédito:</strong> estorno na fatura seguinte ou em até 2 faturas</li>
            <li><strong className="text-foreground">Pix ou boleto:</strong> depósito na conta bancária informada pelo cliente</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">4. Custos de Devolução</h2>
          <p>
            Em caso de defeito ou erro no envio, os custos de devolução serão arcados pela Kompleta Ferragens. Para desistência por arrependimento, os custos de devolução são de responsabilidade do cliente.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">5. Condições do Produto</h2>
          <p>
            O produto deve ser devolvido em sua embalagem original, sem sinais de uso, acompanhado de todos os acessórios e nota fiscal.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaReembolso;
