import { Search, User, ShoppingCart, Menu, X, ChevronRight, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-kompleta.png";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { categories } from "@/data/products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsOpen } = useCart();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const navItems = [
    { label: "Ver tudo", path: "/categoria/ver-tudo" },
    ...categories.map((c) => ({ 
      label: c.name, 
      path: c.path, 
      slug: c.slug,
      subcategories: c.subcategories 
    })),
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  if (isMobile) {
    return (
      <>
        <div className="bg-background border-b border-border sticky top-0 z-50">
          <div className="flex items-center justify-between px-4 py-3 relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-foreground"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img src={logo} alt="Logo" className="h-[4.5rem] w-auto" />
            </Link>

            <div className="flex items-center gap-4">
              <button className="text-foreground" aria-label="Conta">
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="text-foreground relative"
                aria-label="Carrinho"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full min-w-[18px] h-[18px]">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-50">
              <nav className="flex flex-col">
                {navItems.map((item, i) => (
                  <div key={item.label} className={i < navItems.length - 1 ? "border-b border-border" : ""}>
                    {item.subcategories ? (
                      <>
                        <div 
                          className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors cursor-pointer"
                          onClick={() => setExpandedCategory(expandedCategory === item.label ? null : item.label)}
                        >
                          {item.label}
                          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedCategory === item.label ? "rotate-180" : ""}`} />
                        </div>
                        {expandedCategory === item.label && (
                          <div className="bg-secondary/20 flex flex-col">
                            <Link
                              to={item.path}
                              onClick={() => { setMenuOpen(false); setExpandedCategory(null); }}
                              className="px-8 py-2.5 text-sm text-foreground hover:bg-secondary/50 transition-colors border-b border-border/50"
                            >
                              Ver Tudo em {item.label}
                            </Link>
                            {item.subcategories.map((sub) => (
                              <Link
                                key={sub.slug}
                                to={sub.path}
                                onClick={() => { setMenuOpen(false); setExpandedCategory(null); }}
                                className="px-8 py-2.5 text-sm text-foreground hover:bg-secondary/50 transition-colors last:border-0 border-b border-border/50"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        {item.label}
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>

        <div className="bg-background px-4 py-3 border-b border-border">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você procura?"
              className="w-full bg-secondary rounded-full pl-4 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Buscar">
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Logo" className="h-[4.5rem] w-auto" />
        </Link>

        <div className="flex-1 max-w-lg mx-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você procura?"
              className="w-full border border-border rounded-none pl-4 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Buscar">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors" aria-label="Conta">
            <User className="w-5 h-5" />
            <div className="text-left">
              <span className="text-xs font-medium block leading-tight">Oie!</span>
              <span className="text-[11px] text-muted-foreground leading-tight">Vem fazer seu login ;)</span>
            </div>
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="text-foreground hover:text-primary transition-colors relative"
            aria-label="Carrinho"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full min-w-[18px] h-[18px]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {navItems.length > 0 && (
        <div className="border-t border-b border-border">
          <div className="container flex items-center py-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 pr-4 border-r border-border mr-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Frete Grátis</span>
            </div>
            <nav className="flex items-center gap-1 overflow-x-auto">
              <Menu className="w-4 h-4 text-muted-foreground shrink-0 mr-1" />
              {navItems.map((item) => (
                item.subcategories ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 whitespace-nowrap text-sm text-foreground hover:text-primary transition-colors px-2 py-1 outline-none">
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to={item.path} className="w-full cursor-pointer">
                          Ver Tudo
                        </Link>
                      </DropdownMenuItem>
                      {item.subcategories.map((sub) => (
                        <DropdownMenuItem key={sub.slug} asChild>
                          <Link to={sub.path} className="w-full cursor-pointer">
                            {sub.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="whitespace-nowrap text-sm text-foreground hover:text-primary transition-colors px-2 py-1"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
