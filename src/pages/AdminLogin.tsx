import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo-kompleta.png";

const ADMIN_USER = "brenno";
const ADMIN_PASS = "g!8594221G";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("admin_logged") === "1") {
      navigate("/admin/pedidos", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("admin_logged", "1");
      toast.success("Login realizado com sucesso!");
      navigate("/admin/pedidos");
    } else {
      toast.error("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4">
      <img src={logo} alt="Logo" className="h-16 md:h-20 w-auto mb-8" />
      <div className="bg-white rounded-lg border border-border max-w-md w-full p-8 space-y-5">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground">Painel Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Acesso restrito</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Usuário
            </label>
            <div className="relative mt-1">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full border border-border rounded pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Senha
            </label>
            <div className="relative mt-1">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full border border-border rounded pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider py-3 rounded hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
