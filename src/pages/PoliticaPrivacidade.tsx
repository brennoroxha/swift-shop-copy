import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Política de Privacidade</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            A <strong className="text-foreground">Kompleta Ferragens Construcao e Moveis LTDA</strong> (CNPJ: 30.063.962/0001-50), com sede na Rua Nelson Viana, 180 – Loja 10, Centro, Três Rios – RJ, CEP 25805-290, está comprometida com a proteção da privacidade e dos dados pessoais de seus clientes e visitantes, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">1. Dados Coletados</h2>
          <p>Coletamos os seguintes dados pessoais quando você utiliza nosso site ou realiza uma compra:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nome completo</li>
            <li>CPF</li>
            <li>Endereço de entrega</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Dados de navegação (cookies, IP, páginas visitadas)</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">2. Finalidade do Uso dos Dados</h2>
          <p>Os dados pessoais coletados são utilizados para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Processar e entregar pedidos</li>
            <li>Emitir notas fiscais</li>
            <li>Entrar em contato sobre status de pedidos</li>
            <li>Melhorar a experiência de navegação no site</li>
            <li>Enviar comunicações promocionais (quando autorizado)</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">3. Compartilhamento de Dados</h2>
          <p>
            Seus dados pessoais não são vendidos a terceiros. Podemos compartilhar informações apenas com parceiros essenciais para a operação, como transportadoras para entrega e gateways de pagamento, sempre em conformidade com a LGPD.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">4. Segurança dos Dados</h2>
          <p>
            Adotamos medidas de segurança técnicas e administrativas para proteger seus dados pessoais contra acesso não autorizado, destruição, perda ou alteração.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">5. Direitos do Titular</h2>
          <p>Você tem o direito de:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Acessar seus dados pessoais</li>
            <li>Solicitar correção de dados incompletos ou inexatos</li>
            <li>Solicitar a exclusão de dados pessoais</li>
            <li>Revogar o consentimento para uso dos dados</li>
          </ul>
          <p>
            Para exercer seus direitos, entre em contato pelo e-mail <strong className="text-foreground">sac@kompletaferragens.shop</strong> ou pelo telefone <strong className="text-foreground">(24) 2251-2189</strong>.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">6. Cookies</h2>
          <p>
            Utilizamos cookies para melhorar a experiência de navegação. Você pode gerenciar as preferências de cookies nas configurações do seu navegador.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">7. Alterações nesta Política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. Recomendamos que você a consulte regularmente para estar ciente de quaisquer alterações.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
