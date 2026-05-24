import TopBar from "@/components/store/TopBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const SobreNos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Sobre Nós</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            A <strong className="text-foreground">Kompleta Ferragens</strong> é uma empresa especializada no segmento de ferragens, construção e móveis, atuando com compromisso e dedicação para oferecer os melhores produtos aos nossos clientes.
          </p>
          <p>
            Com sede em Três Rios, no estado do Rio de Janeiro, trabalhamos para garantir qualidade, variedade e os melhores preços em nosso catálogo de produtos. Nossa missão é proporcionar uma experiência de compra prática, segura e confiável.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">Dados da Empresa</h2>
          <ul className="list-none space-y-1">
            <li><strong className="text-foreground">Razão Social:</strong> Kompleta Ferragens Construcao e Moveis LTDA</li>
            <li><strong className="text-foreground">Nome Fantasia:</strong> Kompleta Ferragens</li>
            <li><strong className="text-foreground">CNPJ:</strong> 30.063.962/0001-50</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">Localização</h2>
          <ul className="list-none space-y-1">
            <li><strong className="text-foreground">Endereço:</strong> Avenida Ruy Barbosa, 626 – Loja 01</li>
            <li><strong className="text-foreground">Bairro:</strong> Cantagalo</li>
            <li><strong className="text-foreground">Município:</strong> Três Rios – RJ</li>
            <li><strong className="text-foreground">CEP:</strong> 25805-000</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">Contato</h2>
          <ul className="list-none space-y-1">
            <li><strong className="text-foreground">Telefone:</strong> (24) 2251-2189</li>
            <li><strong className="text-foreground">E-mail:</strong> sac@kompletaferragens.shop</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SobreNos;
