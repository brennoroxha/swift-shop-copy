import { useState } from "react";
import { Truck } from "lucide-react";

const ShippingCalculator = () => {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState(false);

  const handleCalc = () => {
    if (cep.replace(/\D/g, "").length >= 5) {
      setResult(true);
    }
  };

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return digits;
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">Calcular Frete</p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => { setCep(formatCep(e.target.value)); setResult(false); }}
          className="flex-1 border border-border rounded-sm px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={handleCalc}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:opacity-90 transition-opacity"
        >
          Calcular
        </button>
      </div>
      {result && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-2 rounded-md">
          <Truck className="w-4 h-4 shrink-0" />
          <span>Frete Grátis — entrega em 3 a 6 dias úteis</span>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
