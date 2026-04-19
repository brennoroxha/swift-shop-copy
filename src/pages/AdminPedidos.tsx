import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  LogOut,
  RefreshCw,
  Search,
  ShieldAlert,
  Calendar as CalendarIcon,
} from "lucide-react";
import logo from "@/assets/logo-kompleta.png";

type Order = {
  id: string;
  transaction_id: string;
  amount: number;
  status: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_document: string | null;
  proof_url: string | null;
  paid_at: string | null;
  created_at: string;
  items: any;
};

const formatBRL = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const dayKey = (iso: string) => {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const todayKey = () => dayKey(new Date().toISOString());
const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d.toISOString());
};

const formatDayLabel = (key: string) => {
  if (key === todayKey()) return "Hoje";
  if (key === yesterdayKey()) return "Ontem";
  const [y, m, d] = key.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

type FilterKey = "all" | "suspicious" | "pending" | "paid" | "with_proof";
type DateFilter = "all" | "today" | "yesterday" | "last7" | "custom";

const AdminPedidos = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [customDate, setCustomDate] = useState<string>("");

  useEffect(() => {
    if (sessionStorage.getItem("admin_logged") !== "1") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (!error && data) setOrders(data as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const t = setInterval(fetchOrders, 15000);
    return () => clearInterval(t);
  }, []);

  const counts = useMemo(() => {
    const paidStatuses = ["paid", "approved", "succeeded", "completed"];
    const pending = orders.filter((o) => !paidStatuses.includes(o.status.toLowerCase()));
    const paid = orders.filter((o) => paidStatuses.includes(o.status.toLowerCase()));
    const withProof = orders.filter((o) => !!o.proof_url);
    const suspicious = pending.filter((o) => !!o.proof_url);
    return {
      total: orders.length,
      pending: pending.length,
      paid: paid.length,
      withProof: withProof.length,
      suspicious: suspicious.length,
    };
  }, [orders]);

  const filtered = useMemo(() => {
    const paidStatuses = ["paid", "approved", "succeeded", "completed"];
    let list = orders;

    // filtro de data
    if (dateFilter !== "all") {
      const now = new Date();
      if (dateFilter === "today") {
        const k = todayKey();
        list = list.filter((o) => dayKey(o.created_at) === k);
      } else if (dateFilter === "yesterday") {
        const k = yesterdayKey();
        list = list.filter((o) => dayKey(o.created_at) === k);
      } else if (dateFilter === "last7") {
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - 6);
        cutoff.setHours(0, 0, 0, 0);
        list = list.filter((o) => new Date(o.created_at) >= cutoff);
      } else if (dateFilter === "custom" && customDate) {
        list = list.filter((o) => dayKey(o.created_at) === customDate);
      }
    }

    if (filter === "suspicious") {
      list = list.filter(
        (o) => !!o.proof_url && !paidStatuses.includes(o.status.toLowerCase())
      );
    } else if (filter === "pending") {
      list = list.filter((o) => !paidStatuses.includes(o.status.toLowerCase()));
    } else if (filter === "paid") {
      list = list.filter((o) => paidStatuses.includes(o.status.toLowerCase()));
    } else if (filter === "with_proof") {
      list = list.filter((o) => !!o.proof_url);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.transaction_id.toLowerCase().includes(q) ||
          o.customer_name?.toLowerCase().includes(q) ||
          o.customer_email?.toLowerCase().includes(q) ||
          o.customer_document?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, filter, search, dateFilter, customDate]);

  // agrupar por dia (mantendo ordem decrescente)
  const groupedByDay = useMemo(() => {
    const groups: { day: string; items: Order[]; total: number; paidCount: number }[] = [];
    const map = new Map<string, Order[]>();
    for (const o of filtered) {
      const k = dayKey(o.created_at);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(o);
    }
    for (const [day, items] of map) {
      const paidStatuses = ["paid", "approved", "succeeded", "completed"];
      const total = items.reduce((s, i) => s + i.amount, 0);
      const paidCount = items.filter((i) => paidStatuses.includes(i.status.toLowerCase())).length;
      groups.push({ day, items, total, paidCount });
    }
    groups.sort((a, b) => (a.day < b.day ? 1 : -1));
    return groups;
  }, [filtered]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged");
    navigate("/admin/login");
  };

  const isPaid = (s: string) =>
    ["paid", "approved", "succeeded", "completed"].includes(s.toLowerCase());

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container py-3 flex items-center justify-between gap-4">
          <Link to="/admin/pedidos" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="font-heading font-bold text-foreground hidden sm:inline">
              Painel Admin
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              className="border border-border rounded px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted"
              title="Atualizar"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </button>
            <button
              onClick={handleLogout}
              className="border border-border rounded px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Total" value={counts.total} />
          <StatCard label="Pendentes" value={counts.pending} tone="warn" icon={<Clock className="w-4 h-4" />} />
          <StatCard label="Pagos" value={counts.paid} tone="ok" icon={<CheckCircle2 className="w-4 h-4" />} />
          <StatCard label="Com comprovante" value={counts.withProof} icon={<ImageIcon className="w-4 h-4" />} />
          <StatCard
            label="Suspeitos"
            value={counts.suspicious}
            tone="danger"
            icon={<ShieldAlert className="w-4 h-4" />}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-border p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              Todos
            </FilterChip>
            <FilterChip
              active={filter === "suspicious"}
              onClick={() => setFilter("suspicious")}
              tone="danger"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Suspeitos ({counts.suspicious})
            </FilterChip>
            <FilterChip active={filter === "pending"} onClick={() => setFilter("pending")} tone="warn">
              Pendentes
            </FilterChip>
            <FilterChip active={filter === "paid"} onClick={() => setFilter("paid")} tone="ok">
              Pagos
            </FilterChip>
            <FilterChip
              active={filter === "with_proof"}
              onClick={() => setFilter("with_proof")}
            >
              Com comprovante
            </FilterChip>
          </div>

          {/* Date filter */}
          <div className="flex flex-wrap gap-2 items-center pt-1 border-t border-border">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1 mr-1 mt-2">
              <CalendarIcon className="w-3.5 h-3.5" /> Período:
            </span>
            <FilterChip active={dateFilter === "all"} onClick={() => setDateFilter("all")}>
              Todo período
            </FilterChip>
            <FilterChip active={dateFilter === "today"} onClick={() => setDateFilter("today")}>
              Hoje
            </FilterChip>
            <FilterChip active={dateFilter === "yesterday"} onClick={() => setDateFilter("yesterday")}>
              Ontem
            </FilterChip>
            <FilterChip active={dateFilter === "last7"} onClick={() => setDateFilter("last7")}>
              Últimos 7 dias
            </FilterChip>
            <input
              type="date"
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setDateFilter(e.target.value ? "custom" : "all");
              }}
              className="border border-border rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, e-mail, CPF ou ID da transação..."
              className="w-full border border-border rounded pl-10 pr-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Suspicious alert */}
        {counts.suspicious > 0 && filter !== "suspicious" && (
          <div className="bg-destructive/10 border border-destructive/40 text-destructive rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>{counts.suspicious}</strong> pedido(s) com comprovante enviado mas ainda
              marcado(s) como pendente. Possível desvio no gateway.{" "}
              <button
                onClick={() => setFilter("suspicious")}
                className="underline font-semibold"
              >
                Ver suspeitos
              </button>
            </div>
          </div>
        )}

        {/* Orders grouped by day */}
        <div className="space-y-6">
          {loading && orders.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Carregando pedidos...</p>
          )}
          {!loading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Nenhum pedido encontrado.</p>
          )}
          {groupedByDay.map((group) => (
            <section key={group.day} className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 sticky top-[64px] bg-[#f5f5f5] py-2 z-10">
                <h2 className="font-heading font-bold text-foreground capitalize">
                  {formatDayLabel(group.day)}
                </h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    <strong className="text-foreground">{group.items.length}</strong> pedido(s)
                  </span>
                  <span>
                    <strong className="text-green-700">{group.paidCount}</strong> pago(s)
                  </span>
                  <span>
                    Total: <strong className="text-foreground">{formatBRL(group.total)}</strong>
                  </span>
                </div>
              </div>

              {group.items.map((order) => {
                const paid = isPaid(order.status);
                const suspicious = !paid && !!order.proof_url;
                return (
                  <article
                    key={order.id}
                    className={`rounded-lg border p-4 space-y-3 ${
                      suspicious
                        ? "bg-destructive/5 border-destructive/50 ring-1 ring-destructive/30"
                        : "bg-white border-border"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs text-muted-foreground">
                            #{order.transaction_id.slice(0, 12)}
                          </span>
                          {paid ? (
                            <span className="text-[11px] font-bold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              Pago
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                              Pendente
                            </span>
                          )}
                          {order.proof_url && (
                            <span className="text-[11px] font-bold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded inline-flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" /> Comprovante
                            </span>
                          )}
                          {suspicious && (
                            <span className="text-[11px] font-bold uppercase tracking-wide bg-destructive text-destructive-foreground px-2 py-0.5 rounded inline-flex items-center gap-1">
                              <ShieldAlert className="w-3 h-3" /> Possível desvio
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-bold text-foreground mt-1 truncate">
                          {order.customer_name || "Sem nome"}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {order.customer_email || "—"} • {order.customer_document || "—"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Criado em {formatDate(order.created_at)}
                          {order.paid_at && ` • Pago em ${formatDate(order.paid_at)}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-heading font-bold text-lg text-foreground">
                          {formatBRL(order.amount)}
                        </p>
                      </div>
                    </div>

                    {order.proof_url && (
                      <a
                        href={order.proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={order.proof_url}
                          alt="Comprovante"
                          className="max-h-56 rounded border border-border"
                        />
                      </a>
                    )}
                  </article>
                );
              })}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: number;
  tone?: "ok" | "warn" | "danger";
  icon?: React.ReactNode;
}) => {
  const toneClass =
    tone === "ok"
      ? "text-green-700 bg-green-50 border-green-200"
      : tone === "warn"
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : tone === "danger"
      ? "text-destructive bg-destructive/10 border-destructive/30"
      : "text-foreground bg-white border-border";
  return (
    <div className={`rounded-lg border p-3 ${toneClass}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide opacity-80">
        {icon}
        {label}
      </div>
      <p className="font-heading font-bold text-2xl mt-1">{value}</p>
    </div>
  );
};

const FilterChip = ({
  children,
  active,
  onClick,
  tone,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  tone?: "ok" | "warn" | "danger";
}) => {
  const toneActive =
    tone === "danger"
      ? "bg-destructive text-destructive-foreground border-destructive"
      : tone === "warn"
      ? "bg-amber-500 text-white border-amber-500"
      : tone === "ok"
      ? "bg-green-600 text-white border-green-600"
      : "bg-primary text-primary-foreground border-primary";
  return (
    <button
      onClick={onClick}
      className={`text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full border inline-flex items-center gap-1.5 transition-colors ${
        active ? toneActive : "bg-white text-foreground border-border hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
};

export default AdminPedidos;
