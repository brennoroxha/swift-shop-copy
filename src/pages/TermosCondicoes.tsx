import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const TermosCondicoes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Termos e Condições</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Ao acessar e utilizar o site da <strong className="text-foreground">Kompleta Ferragens</strong>, você concorda com os termos e condições descritos abaixo. Leia atentamente antes de realizar qualquer compra.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">1. Identificação da Empresa</h2>
          <ul className="list-none space-y-1">
            <li><strong className="text-foreground">Razão Social:</strong> Kompleta Ferragens Construcao e Moveis LTDA</li>
            <li><strong className="text-foreground">CNPJ:</strong> 30.063.962/0001-50</li>
            <li><strong className="text-foreground">Endereço:</strong> Avenida Ruy Barbosa, 626 – Loja 01, Cantagalo, Três Rios – RJ, CEP 25805-000</li>
            <li><strong className="text-foreground">Contato:</strong> (24) 2251-2189 | contato@kompletaferragen.com.br</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">2. Produtos e Preços</h2>
          <p>
            Os preços exibidos no site são válidos exclusivamente para compras online e podem sofrer alterações sem aviso prévio. As imagens dos produtos são meramente ilustrativas e podem apresentar variações em relação ao produto real.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">3. Formas de Pagamento</h2>
          <p>Aceitamos as seguintes formas de pagamento:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cartão de crédito (Visa, Mastercard, Elo, American Express)</li>
            <li>Pix</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">4. Entrega</h2>
          <p>
            As entregas são realizadas para todo o Brasil, com prazo estimado de <strong className="text-foreground">3 a 6 dias úteis</strong> após a confirmação do pagamento. Consulte nossa <a href="/politica-envio" className="text-primary hover:underline">Política de Envio</a> para mais detalhes.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">5. Trocas e Devoluções</h2>
          <p>
            As trocas e devoluções seguem as normas do Código de Defesa do Consumidor. Consulte nossa <a href="/politica-trocas" className="text-primary hover:underline">Política de Trocas e Devoluções</a> para mais informações.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">6. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo do site, incluindo textos, imagens, logotipos e layout, é de propriedade da Kompleta Ferragens e protegido pelas leis de propriedade intelectual. É proibida a reprodução total ou parcial sem autorização prévia.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">7. Responsabilidades do Usuário</h2>
          <p>O usuário é responsável por:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fornecer informações verdadeiras e atualizadas durante o cadastro e compra</li>
            <li>Manter a segurança de seus dados de acesso</li>
            <li>Informar corretamente o endereço de entrega</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">8. Limitação de Responsabilidade</h2>
          <p>
            A Kompleta Ferragens não se responsabiliza por danos indiretos decorrentes do uso do site, incluindo interrupções de serviço, erros técnicos ou invasões por terceiros.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">9. Legislação Aplicável</h2>
          <p>
            Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Três Rios – RJ para dirimir quaisquer controvérsias.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">10. Alterações</h2>
          <p>
            A Kompleta Ferragens reserva-se o direito de alterar estes termos a qualquer momento. As alterações entrarão em vigor a partir da publicação no site.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosCondicoes;
