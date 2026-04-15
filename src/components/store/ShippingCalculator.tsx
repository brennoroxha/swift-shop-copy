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
    <div className="space-y-4">
      <p className="text-sm font-medium text-foreground">Consulte o prazo de entrega</p>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 border border-border rounded-md px-3 py-2.5 bg-background">
          <Truck className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => { setCep(formatCep(e.target.value)); setShowResult(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleCalc()}
            className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
          />
        </div>
        <button
          onClick={handleCalc}
          className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Calcular
        </button>
      </div>

      <button className="text-xs text-primary underline hover:opacity-70 transition-opacity">
        Não sei meu CEP
      </button>

      {showResult && (
        <div className="border border-border rounded-md p-3 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-background bg-primary px-2 py-0.5 rounded">GRÁTIS</span>
            <span className="text-sm font-semibold text-foreground">Transportadora</span>
          </div>
          <p className="text-xs text-muted-foreground">Entrega em 3 a 6 dias úteis</p>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
