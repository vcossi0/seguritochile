import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, DollarSign, Award, TrendingUp, CalendarDays } from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar,
} from "recharts"
import KPICard from "../../components/dashboard/KPICard"
import { MOCK_LEADS, VENDORS, PRODUCTS, LEAD_STATES, getGlobalStats } from "../../data/mockData"

// ── Color palette for charts ──────────────────────────────────────
const CHART_COLORS = ["#c8a96e", "#7c6f5b", "#a89070", "#e0d4b8", "#5a4e3a"]
const PRIMARY_GOLD = "#c8a96e"

// ── Generate revenue trend from mock closed leads ─────────────────
function buildRevenueTrend() {
  const closedLeads = MOCK_LEADS.filter(l => l.estado === "cerrado" && l.monto)
  // Simulate 12 weeks of data for a richer chart
  const weeks = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now)
    weekStart.setDate(weekStart.getDate() - i * 7)
    const label = `Sem ${12 - i}`
    // Distribute real data + simulated baseline
    const base = Math.floor(Math.random() * 80000) + 120000
    const realInWeek = closedLeads
      .filter(l => {
        const d = new Date(l.fecha)
        return d >= new Date(weekStart.getTime() - 7 * 86400000) && d <= weekStart
      })
      .reduce((a, l) => a + l.monto, 0)
    weeks.push({
      name: label,
      ingresos: base + realInWeek,
      leads: Math.floor(Math.random() * 12) + 5,
    })
  }
  return weeks
}

// ── Build product distribution for PieChart ───────────────────────
function buildProductDistribution() {
  return PRODUCTS.map((p, i) => ({
    name: p.length > 18 ? p.slice(0, 16) + "…" : p,
    fullName: p,
    value: MOCK_LEADS.filter(l => l.producto === p).length,
    color: CHART_COLORS[i % CHART_COLORS.length],
  })).filter(p => p.value > 0)
}

// ── Build vendor performance for BarChart ─────────────────────────
function buildVendorPerformance() {
  return VENDORS.filter(v => v.active).map(v => {
    const leads = MOCK_LEADS.filter(l => l.vendedorId === v.id)
    return {
      name: v.name.split(" ")[0],
      fullName: v.name,
      cerradas: leads.filter(l => l.estado === "cerrado").length,
      enProceso: leads.filter(l => !["cerrado", "perdido", "sin_contactar"].includes(l.estado)).length,
      perdidas: leads.filter(l => l.estado === "perdido").length,
    }
  })
}

// ── Shared wrapper style to kill Recharts' default white box ──────
const tooltipWrapperStyle = {
  background: "transparent",
  border: "none",
  boxShadow: "none",
  padding: 0,
  outline: "none",
}

// ── Custom Tooltip ────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card/95 backdrop-blur-xl border border-border/60 px-4 py-3 rounded-sm shadow-xl">
      <p className="text-xs text-muted-foreground font-medium mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === "number" && entry.name.toLowerCase().includes("ingreso")
            ? `$${entry.value.toLocaleString()}`
            : entry.value}
        </p>
      ))}
    </div>
  )
}

// ── Custom Pie Tooltip ────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-card/95 backdrop-blur-xl border border-border/60 px-4 py-3 rounded-sm shadow-xl">
      <p className="text-sm font-medium text-foreground">{d.payload.fullName}</p>
      <p className="text-xs text-muted-foreground mt-1">{d.value} leads · {((d.percent || 0) * 100).toFixed(1)}%</p>
    </div>
  )
}

// ── Time filter options ───────────────────────────────────────────
const TIME_FILTERS = [
  { key: "7d", label: "7 Días" },
  { key: "30d", label: "Mes Actual" },
  { key: "90d", label: "Trimestre" },
  { key: "all", label: "Todo" },
]

export default function SalesMetrics() {
  const [timeFilter, setTimeFilter] = useState("all")
  const stats = getGlobalStats()
  const closedLeads = MOCK_LEADS.filter(l => l.estado === "cerrado")
  const avgTicket = closedLeads.length > 0 ? Math.round(closedLeads.reduce((a, l) => a + (l.monto || 0), 0) / closedLeads.length) : 0

  const revenueTrend = buildRevenueTrend()
  const productDist = buildProductDistribution()
  const vendorPerf = buildVendorPerformance()

  // Pipeline visual
  const pipelineStates = LEAD_STATES.filter(s => !["cerrado", "perdido"].includes(s.key))
  const pipelineCounts = pipelineStates.map(s => ({ ...s, count: MOCK_LEADS.filter(l => l.estado === s.key).length }))

  // Recent sales
  const recentSales = closedLeads.map(l => {
    const vendor = VENDORS.find(v => v.id === l.vendedorId)
    const closeNote = l.notas?.find(n => n.tipo === "venta")
    const daysInPipeline = closeNote ? Math.floor((new Date(closeNote.fecha) - new Date(l.fecha)) / (1000 * 60 * 60 * 24)) : "—"
    return { ...l, vendorName: vendor?.name || "—", daysInPipeline }
  })

  return (
    <div className="space-y-6">
      {/* Header with time filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif text-foreground">Analíticas de Ventas</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Rendimiento comercial y métricas de conversión.</p>
        </div>
        <div className="flex items-center gap-1 bg-card border border-border/50 rounded-sm p-1">
          {TIME_FILTERS.map(f => (
            <button key={f.key} onClick={() => setTimeFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
                timeFilter === f.key
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={<ShoppingCart className="w-5 h-5 text-primary" />} label="Ventas Cerradas (Mes)" value={stats.cerrados} trend={12} trendLabel="vs. mes anterior" />
        <KPICard icon={<DollarSign className="w-5 h-5 text-primary" />} label="Ingreso Total" value={`$${stats.ingresoTotal.toLocaleString()}`} trend={8} trendLabel="vs. mes anterior" />
        <KPICard icon={<Award className="w-5 h-5 text-primary" />} label="Ticket Promedio" value={`$${avgTicket.toLocaleString()}`} />
        <KPICard icon={<TrendingUp className="w-5 h-5 text-primary" />} label="Pipeline Activo" value={stats.pipeline} />
      </div>

      {/* Revenue Trend (Area Chart) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg text-foreground">Tendencia de Ingresos</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="w-3.5 h-3.5" /> Últimas 12 semanas
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PRIMARY_GOLD} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={PRIMARY_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} wrapperStyle={tooltipWrapperStyle} cursor={{ stroke: "rgba(200,169,110,0.2)", strokeWidth: 1 }} />
              <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke={PRIMARY_GOLD} strokeWidth={2.5}
                fill="url(#goldGradient)" dot={{ r: 3, fill: PRIMARY_GOLD, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: PRIMARY_GOLD, stroke: "#fff", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Product Distribution (Donut) + Vendor Performance (Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Distribución por Producto</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={productDist} cx="50%" cy="50%" innerRadius={65} outerRadius={100}
                  paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {productDist.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} wrapperStyle={tooltipWrapperStyle} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Vendor Performance Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Rendimiento por Vendedor</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorPerf} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} wrapperStyle={tooltipWrapperStyle} cursor={{ fill: "rgba(200,169,110,0.08)" }} />
                <Bar dataKey="cerradas" name="Cerradas" fill={PRIMARY_GOLD} radius={[3, 3, 0, 0]} />
                <Bar dataKey="enProceso" name="En Proceso" fill="#7c6f5b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="perdidas" name="Perdidas" fill="#5a4e3a" radius={[3, 3, 0, 0]} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Visual Pipeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass-panel p-6">
        <h3 className="font-serif text-lg text-foreground mb-6">Pipeline Visual</h3>
        <div className="flex flex-wrap gap-2">
          {pipelineCounts.map((stage, i) => (
            <motion.div key={stage.key} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 min-w-[120px] bg-background border border-border/30 p-4 rounded-sm text-center relative">
              <p className="text-2xl font-serif text-primary">{stage.count}</p>
              <p className="text-xs text-muted-foreground mt-1">{stage.label}</p>
              {i < pipelineCounts.length - 1 && (
                <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-muted-foreground/30 text-lg hidden md:block">→</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Sales Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass-panel overflow-hidden">
        <div className="p-5 border-b border-border/40">
          <h3 className="font-serif text-lg text-foreground">Ventas Cerradas Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-card/50">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Cliente</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Vendedor</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Producto</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Monto</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden sm:table-cell">Días Pipeline</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map(sale => (
                <tr key={sale.id} className="border-b border-border/20 hover:bg-card/40 transition-colors">
                  <td className="px-5 py-4 font-medium text-foreground">{sale.nombre}</td>
                  <td className="px-5 py-4 text-muted-foreground">{sale.vendorName}</td>
                  <td className="px-5 py-4 text-muted-foreground">{sale.producto}</td>
                  <td className="px-5 py-4 text-right text-primary font-medium">${sale.monto?.toLocaleString() || "—"}/mes</td>
                  <td className="px-5 py-4 text-right text-muted-foreground hidden sm:table-cell">{sale.daysInPipeline} días</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
