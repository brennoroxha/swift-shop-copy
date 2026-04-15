import { useState } from "react";
import { Truck } from "lucide-react";

const ShippingCalculator = () => {
  const [cep, setCep] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCalc = () => {
    if (cep.replace(/\D/g, "").length >= 5) {
      setShowResult(true);
    }
  };

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return digits;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Truck className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => { setCep(formatCep(e.target.value)); setShowResult(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleCalc()}
          className="flex-1 border border-border rounded px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={handleCalc}
          className="px-4 py-2 text-primary text-sm font-bold uppercase tracking-wide hover:opacity-70 transition-opacity"
        >
          CALCULAR FRETE
        </button>
      </div>

      {showResult && (
        <div className="border border-border rounded-md p-4 space-y-2">
          <p className="text-xs text-muted-foreground">O prazo de entrega não contabiliza feriados.</p>
          <div className="flex items-start gap-2">
            <Truck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground">Grátis</p>
              <p className="text-sm text-muted-foreground">Chega em 3 a 6 dias úteis</p>
              <p className="text-xs text-muted-foreground">Transportadora</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
