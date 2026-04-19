import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowLeft, ChevronDown, Lock, Truck, Copy, Check, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getProductSlug } from "@/pages/ProductPage";
import logo from "@/assets/logo.jpg";
import seloRA1000 from "@/assets/selo-ra1000.png";
import premioRA2025 from "@/assets/premio-ra2025.png";

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const maskCPF = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const maskPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const maskCEP = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

const validateCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== parseInt(digits[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  return rest === parseInt(digits[10]);
};

const CheckoutPage = () => {
  const { items, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cpfError, setCpfError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao">("pix");
  const [generatingPix, setGeneratingPix] = useState(false);
  const [pixData, setPixData] = useState<{ qr_code: string; expiration_date: string; amount: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    celular: "",
    cpf: "",
  });

  const [address, setAddress] = useState({
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const pixDiscount = totalPrice * 0.10;
  const totalWithDiscount = totalPrice - pixDiscount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cpf") {
      setForm((prev) => ({ ...prev, cpf: maskCPF(value) }));
      setCpfError("");
    } else if (name === "celular") {
      setForm((prev) => ({ ...prev, celular: maskPhone(value) }));
      setPhoneError("");
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cep") {
      const masked = maskCEP(value);
      setAddress((prev) => ({ ...prev, cep: masked }));
      const digits = value.replace(/\D/g, "");
      if (digits.length === 8) {
        fetchCEP(digits);
      }
    } else {
      setAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchCEP = async (cep: string) => {
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setAddress((prev) => ({
          ...prev,
          endereco: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }));
      }
    } catch {
      // silently fail
    } finally {
      setCepLoading(false);
    }
  };

  const handleStep1Continue = () => {
    let valid = true;
    if (!validateCPF(form.cpf)) {
      setCpfError("CPF inválido");
      valid = false;
    }
    if (form.celular.replace(/\D/g, "").length < 11) {
      setPhoneError("Celular inválido");
      valid = false;
    }
    if (valid && isStep1Valid) setStep(2);
  };

  const isStep1Valid = form.nome.trim() !== "" && form.email.trim() !== "" && form.celular.trim() !== "" && form.cpf.trim() !== "";

  const handleFinalizePix = async () => {
    if (paymentMethod !== "pix") {
      toast.info("Pagamento por Cartão estará disponível em breve. Selecione PIX para continuar.");
      return;
    }
    if (!isStep1Valid) {
      toast.error("Preencha os dados pessoais antes de finalizar.");
      setStep(1);
      return;
    }
    setGeneratingPix(true);
    try {
      const amountInCents = Math.round(totalWithDiscount * 100);
      const orderItems = items.map(({ product, quantity }) => ({
        title: product.name.slice(0, 100),
        unit_price: Math.round(product.salePrice * 100),
        quantity,
        tangible: true,
      }));

      const { data, error } = await supabase.functions.invoke("freepay-pix", {
        body: {
          amount: amountInCents,
          customer: {
            name: form.nome,
            email: form.email,
            phone: form.celular,
            document: form.cpf,
          },
          items: orderItems,
          metadata: { source: "kompleta-checkout" },
        },
      });

      if (error) throw new Error(error.message);
      if (!data?.pix?.qr_code) throw new Error("Resposta inválida do gateway");

      setPixData({
        qr_code: data.pix.qr_code,
        expiration_date: data.pix.expiration_date,
        amount: data.amount,
      });
      toast.success("PIX gerado com sucesso!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao gerar PIX";
      toast.error(msg);
    } finally {
      setGeneratingPix(false);
    }
  };

  const copyPixCode = async () => {
    if (!pixData) return;
    try {
      await navigator.clipboard.writeText(pixData.qr_code);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Não foi possível copiar");
    }
  };

  if (items.length === 0) {
    navigate("/carrinho");
    return null;
  }




  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container flex items-center justify-between py-3 md:py-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="La Roche-Posay" className="h-7 md:h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-primary font-semibold">Compra</span>
            <span className="text-primary font-bold">100% segura</span>
            <Lock className="w-5 h-5 text-primary" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-xl md:text-2xl font-bold text-foreground">
            Finalizar Compra
          </h1>
          <span className="text-sm text-muted-foreground border border-border rounded px-3 py-1">
            Passo {step} de 3
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left Column - Steps */}
          <div className="space-y-4">
            {/* Step 1 - Dados Pessoais */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setStep(1)}
                className="w-full flex items-center gap-3 px-6 py-5 text-left"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </span>
                <span className="font-heading font-bold text-foreground">Dados Pessoais</span>
                <ChevronDown className={`w-4 h-4 ml-auto text-muted-foreground transition-transform ${step === 1 ? "rotate-180" : ""}`} />
              </button>

              {step === 1 && (
                <div className="px-6 pb-8 space-y-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Nome Completo <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        E-mail <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Celular <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        name="celular"
                        value={form.celular}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                      {phoneError && <p className="text-xs text-destructive mt-1">{phoneError}</p>}
                    </div>
                  </div>

                  <div className="md:max-w-[50%]">
                    <label className="text-sm text-muted-foreground mb-1 block">
                      CPF <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={form.cpf}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                    {cpfError && <p className="text-xs text-destructive mt-1">{cpfError}</p>}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleStep1Continue}
                      disabled={!isStep1Valid}
                      className="w-full md:w-auto bg-foreground text-background font-heading font-bold text-sm tracking-wider px-10 py-4 rounded hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continuar para Entrega
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2 - Entrega */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => step >= 2 && isStep1Valid && setStep(2)}
                className="w-full flex items-center gap-3 px-6 py-5 text-left"
              >
                <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  2
                </span>
                <span className={`font-heading font-bold ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>Endereço de Entrega</span>
                {step >= 2 && (
                  <ChevronDown className={`w-4 h-4 ml-auto text-muted-foreground transition-transform ${step === 2 ? "rotate-180" : ""}`} />
                )}
              </button>

              {step === 2 && (
                <div className="px-6 pb-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        CEP <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="cep"
                        value={address.cep}
                        onChange={handleAddressChange}
                        placeholder="00000-000"
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                      {cepLoading && <p className="text-xs text-muted-foreground mt-1">Buscando endereço...</p>}
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Rua / Avenida <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="endereco"
                        value={address.endereco}
                        onChange={handleAddressChange}
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Número <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="numero"
                        value={address.numero}
                        onChange={handleAddressChange}
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Complemento (opcional)
                      </label>
                      <input
                        type="text"
                        name="complemento"
                        value={address.complemento}
                        onChange={handleAddressChange}
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Bairro <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="bairro"
                        value={address.bairro}
                        onChange={handleAddressChange}
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Cidade <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="cidade"
                        value={address.cidade}
                        onChange={handleAddressChange}
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Estado <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="estado"
                        value={address.estado}
                        onChange={handleAddressChange}
                        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  {address.cep.replace(/\D/g, "").length === 8 &&
                    address.endereco.trim() !== "" &&
                    address.numero.trim() !== "" &&
                    address.bairro.trim() !== "" &&
                    address.cidade.trim() !== "" &&
                    address.estado.trim() !== "" && (
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Opção de frete</p>
                        <label className="flex items-center gap-3 border-2 border-primary bg-primary/5 rounded-md px-4 py-3 cursor-pointer">
                          <input type="radio" name="frete" defaultChecked className="accent-primary" />
                          <Truck className="w-5 h-5 text-primary shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-primary-foreground bg-primary px-2 py-0.5 rounded">GRÁTIS</span>
                              <span className="text-sm font-semibold text-foreground">via Transportadora</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">Entrega em 3 a 6 dias úteis</p>
                          </div>
                          <span className="text-sm font-bold text-foreground">R$ 0,00</span>
                        </label>
                      </div>
                    )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setStep(3)}
                      className="w-full md:w-auto bg-foreground text-background font-heading font-bold text-sm tracking-wider px-10 py-4 rounded hover:opacity-90 transition-opacity"
                    >
                      Ir para Pagamento
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3 - Pagamento */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => step >= 3 && setStep(3)}
                className="w-full flex items-center gap-3 px-6 py-5 text-left"
              >
                <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  3
                </span>
                <span className={`font-heading font-bold ${step >= 3 ? "text-foreground" : "text-muted-foreground"}`}>Pagamento</span>
                {step >= 3 && (
                  <ChevronDown className={`w-4 h-4 ml-auto text-muted-foreground transition-transform ${step === 3 ? "rotate-180" : ""}`} />
                )}
              </button>

              {step === 3 && (
                <div className="px-6 pb-6 space-y-5">
                  {!pixData ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Selecione a forma de pagamento desejada:
                      </p>

                      <div className="space-y-3">
                        <label className={`flex items-center gap-3 border rounded px-4 py-3 cursor-pointer transition-colors ${paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}>
                          <input
                            type="radio"
                            name="payment"
                            value="pix"
                            checked={paymentMethod === "pix"}
                            onChange={() => setPaymentMethod("pix")}
                            className="accent-primary"
                          />
                          <span className="text-sm font-medium">PIX (10% de desconto)</span>
                        </label>
                        <label className={`flex items-center gap-3 border rounded px-4 py-3 cursor-pointer transition-colors ${paymentMethod === "cartao" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}>
                          <input
                            type="radio"
                            name="payment"
                            value="cartao"
                            checked={paymentMethod === "cartao"}
                            onChange={() => setPaymentMethod("cartao")}
                            className="accent-primary"
                          />
                          <span className="text-sm font-medium">Cartão de Crédito (até 3x sem juros)</span>
                        </label>
                      </div>

                      <button
                        onClick={handleFinalizePix}
                        disabled={generatingPix}
                        className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider py-4 rounded hover:opacity-90 transition-opacity mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {generatingPix && <Loader2 className="w-4 h-4 animate-spin" />}
                        {generatingPix ? "Gerando PIX..." : "Finalizar Compra"}
                      </button>
                    </>
                  ) : (
                    <div className="space-y-5 text-center">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-foreground">Pague com PIX</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Escaneie o QR Code abaixo ou copie o código para pagar
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <div className="bg-white p-4 border border-border rounded-lg">
                          <QRCodeSVG value={pixData.qr_code} size={220} level="M" />
                        </div>
                      </div>

                      <div className="text-2xl font-bold text-primary">
                        R$ {formatPrice(pixData.amount / 100)}
                      </div>

                      <div className="space-y-2 text-left">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          PIX Copia e Cola
                        </label>
                        <div className="flex items-stretch gap-2">
                          <div className="flex-1 border border-border rounded px-3 py-2 bg-muted/30 text-xs text-foreground break-all font-mono max-h-20 overflow-y-auto">
                            {pixData.qr_code}
                          </div>
                          <button
                            onClick={copyPixCode}
                            className="shrink-0 px-4 bg-foreground text-background rounded hover:opacity-90 transition-opacity flex items-center justify-center"
                            aria-label="Copiar código PIX"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground bg-muted/50 rounded p-3 text-left space-y-1">
                        <p>1. Abra o app do seu banco e acesse a área PIX</p>
                        <p>2. Escolha pagar com QR Code ou Pix Copia e Cola</p>
                        <p>3. Confirme o pagamento</p>
                        <p className="pt-2 text-foreground">
                          Validade: {new Date(pixData.expiration_date).toLocaleString("pt-BR")}
                        </p>
                      </div>

                      <button
                        onClick={() => setPixData(null)}
                        className="text-xs text-primary underline hover:opacity-70 transition-opacity"
                      >
                        Gerar novo PIX
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:sticky lg:top-8 self-start">
            <div className="bg-white rounded-lg border border-border p-6 space-y-5">
              <h2 className="font-heading font-bold text-lg text-foreground">Resumo do pedido</h2>

              {/* Shipping */}
              <div className="flex items-center justify-between border border-border rounded px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">ENTREGA</p>
                  <p className="text-xs text-muted-foreground">3 a 6 dias úteis</p>
                </div>
                <span className="text-sm font-semibold text-primary">Grátis</span>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 items-start">
                    <div className="relative shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-contain bg-secondary/30 rounded"
                      />
                      <span className="absolute -top-2 -left-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                        {quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground leading-snug line-clamp-2">{product.name}</p>
                      <p className="text-sm font-semibold text-foreground mt-1">
                        R$ {formatPrice(product.salePrice * quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>R$ {formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-primary">
                  <span>Descontos (10% PIX)</span>
                  <span>-R$ {formatPrice(pixDiscount)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-heading font-bold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">
                  R$ {formatPrice(totalWithDiscount)}
                </span>
              </div>

              <button
                onClick={() => { setStep(3); handleFinalizePix(); }}
                disabled={generatingPix}
                className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider py-4 rounded hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {generatingPix && <Loader2 className="w-4 h-4 animate-spin" />}
                {generatingPix ? "Gerando PIX..." : "Finalizar Compra"}
              </button>

              <p className="text-xs text-center text-muted-foreground uppercase tracking-wide">
                Cálculo do frete realizado no checkout
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-12">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Segurança</p>
              <div className="flex items-center gap-4">
                <img src={seloRA1000} alt="Certificado RA 1000" className="h-8 object-contain" />
                <img src={premioRA2025} alt="Prêmio RA 2025" className="h-10 object-contain" />
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground max-w-md space-y-1">
              <p>La Roche-Posay Perfumaria | Razão Social: Campos Floridos Comercio de Cosmeticos Ltda | CNPJ: 01.239.313/0001-60 Rua Francisco Sá, 23 / 907 - Copacabana - Rio de Janeiro</p>
              <p>Ofertas válidas na compra de até 5 peças de cada produto por cliente, até o término dos nossos estoques para internet.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
