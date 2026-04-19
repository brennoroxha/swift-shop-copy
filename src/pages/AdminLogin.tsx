import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo-kompleta.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  // Se já estiver logado e for admin, manda direto pra /admin/pedidos
  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (data) navigate("/admin/pedidos", { replace: true });
    };
    check();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/login` },
        });
        if (error) throw error;
        toast.success("Conta criada! Faça login agora.");
        setMode("login");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Verifica se é admin
        const { data: roleRow } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (!roleRow) {
          await supabase.auth.signOut();
          toast.error("Esta conta não tem permissão de administrador.");
          return;
        }

        toast.success("Login realizado!");
        navigate("/admin/pedidos");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro inesperado";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4">
      <img src={logo} alt="Logo" className="h-16 md:h-20 w-auto mb-8" />
      <div className="bg-white rounded-lg border border-border max-w-md w-full p-8 space-y-5">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground">Painel Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Acesso restrito a administradores" : "Criar conta administrativa"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              E-mail
            </label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border rounded pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary"
                autoComplete="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                className="w-full border border-border rounded pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="w-full text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {mode === "login"
              ? "Primeiro acesso? Criar conta"
              : "Já tem uma conta? Fazer login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
