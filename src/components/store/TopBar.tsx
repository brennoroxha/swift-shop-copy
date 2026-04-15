import { X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const TopBar = () => {
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();

  if (!visible) return null;

  return (
    <div className={`topbar flex items-center justify-center relative ${!isMobile ? "md:hidden" : ""}`}>
      <span>Frete grátis para todo o Brasil</span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 hover:opacity-70 transition-opacity"
        aria-label="Fechar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TopBar;
