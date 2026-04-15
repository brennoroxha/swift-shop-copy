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

  const shippingOptions = [
    { price: "R$ 0,00", days: "1 dia útil", method: "Retirar pessoalmente" },
    { price: "R$ 17,17", days: "7 dias úteis", method: "PAC" },
    { price: "R$ 19,69", days: "3 dias úteis", method: "SEDEX" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Truck className="w-5 h-5 text-muted-foreground shrink-0" />
        <span className="text-sm font-semibold text-foreground whitespace-nowrap">Calcule o frete</span>
        <div className="flex flex-1 gap-2">
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
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded hover:opacity-90 transition-opacity"
          >
            OK
          </button>
        </div>
      </div>

      {showResult && (
        <>
          <div className="border border-border rounded-md divide-y divide-border">
            {shippingOptions.map((opt, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-primary font-medium w-20">{opt.price}</span>
                <span className="font-bold text-foreground w-24 text-center">{opt.days}</span>
                <span className="text-muted-foreground text-right flex-1">{opt.method}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            * Este prazo de entrega está considerando a disponibilidade do produto + prazo de entrega.
          </p>
        </>
      )}
    </div>
  );
};

export default ShippingCalculator;
