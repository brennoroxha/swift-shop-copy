import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const PoliticaTrocas = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Política de Trocas e Devoluções</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            A <strong className="text-foreground">Kompleta Ferragens</strong> segue as normas do Código de Defesa do Consumidor (CDC) para garantir seus direitos em relação a trocas e devoluções.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">1. Direito de Arrependimento</h2>
          <p>
            <strong className="text-foreground">Quanto tempo um cliente tem para devolver um produto?</strong> O cliente tem <strong className="text-foreground">7 dias</strong> para devolver o produto.
          </p>
          <p>
            De acordo com o Art. 49 do CDC, você pode desistir da compra em até <strong className="text-foreground">7 dias corridos</strong> após o recebimento do produto, sem necessidade de justificativa. O produto deve ser devolvido em sua embalagem original, sem sinais de uso.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">2. Troca por Defeito</h2>
          <p>
            Caso o produto apresente defeito de fabricação, você tem até <strong className="text-foreground">30 dias corridos</strong> (para produtos não duráveis) ou <strong className="text-foreground">90 dias corridos</strong> (para produtos duráveis) após o recebimento para solicitar a troca.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">3. Produto Diferente ou Danificado</h2>
          <p>
            Se você recebeu um produto diferente do adquirido ou danificado no transporte, entre em contato imediatamente para providenciarmos a troca sem custos adicionais.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">4. Como Solicitar Troca ou Devolução</h2>
          <p>Entre em contato conosco informando:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Número do pedido</li>
            <li>Motivo da troca ou devolução</li>
            <li>Fotos do produto (em caso de defeito ou dano)</li>
          </ul>
          <ul className="list-none space-y-1 mt-3">
            <li><strong className="text-foreground">E-mail:</strong> contato@kompletaferragen.com.br</li>
            <li><strong className="text-foreground">Telefone:</strong> (24) 2251-2189</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">5. Condições para Troca e Devolução</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>O produto deve estar em sua embalagem original</li>
            <li>Sem sinais de uso ou avarias causadas pelo cliente</li>
            <li>Acompanhado de todos os acessórios e nota fiscal</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">6. Custos de Envio</h2>
          <p>
            Em caso de defeito ou erro no envio, os custos de devolução serão arcados pela Kompleta Ferragens. Para desistência por arrependimento, os custos de devolução são de responsabilidade do cliente.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaTrocas;
