import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import CartSidebar from "@/components/store/CartSidebar";
import PageLoader from "@/components/PageLoader";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PagamentoAprovado from "./pages/PagamentoAprovado";
import SearchPage from "./pages/SearchPage";
import GoogleShoppingFeed from "./pages/GoogleShoppingFeed";
import SobreNos from "./pages/SobreNos";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import PoliticaEnvio from "./pages/PoliticaEnvio";
import PoliticaReembolso from "./pages/PoliticaReembolso";
import PoliticaTrocas from "./pages/PoliticaTrocas";
import TermosCondicoes from "./pages/TermosCondicoes";
import MinhaConta from "./pages/MinhaConta";
import RastrearPedido from "./pages/RastrearPedido";
import FaleConosco from "./pages/FaleConosco";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminPedidos from "./pages/AdminPedidos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CartSidebar />
          <PageLoader>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categoria/:slug" element={<CategoryPage />} />
              <Route path="/produto/:slug" element={<ProductPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/pagamento-aprovado" element={<PagamentoAprovado />} />
              <Route path="/busca" element={<SearchPage />} />
              <Route path="/feed" element={<GoogleShoppingFeed />} />
              <Route path="/sobre-nos" element={<SobreNos />} />
              <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
              <Route path="/politica-envio" element={<PoliticaEnvio />} />
              <Route path="/politica-reembolso" element={<PoliticaReembolso />} />
              <Route path="/politica-trocas" element={<PoliticaTrocas />} />
              <Route path="/termos-condicoes" element={<TermosCondicoes />} />
              <Route path="/minha-conta" element={<MinhaConta />} />
              <Route path="/rastrear-pedido" element={<RastrearPedido />} />
              <Route path="/fale-conosco" element={<FaleConosco />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageLoader>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
