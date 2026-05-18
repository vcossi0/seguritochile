import { motion } from "framer-motion"
import { TrendingUp, ShoppingCart, Users, Award, Flame, Target } from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PieChart, Pie, Cell,
} from "recharts"
import KPICard from "../../../components/dashboard/KPICard"
import { getVendorStats, getLeadsByVendor, PRODUCTS } from "../../../data/mockData"

const PRIMARY_GOLD = "#c8a96e"
const CHART_COLORS = ["#c8a96e", "#7c6f5b", "#a89070", "#e0d4b8", "#5a4e3a"]

const tooltipWrapperStyle = {
  background: "transparent",
  border: "none",
  boxShadow: "none",
  padding: 0,
  outline: "none",
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card/95 backdrop-blur-xl border border-border/60 px-4 py-3 rounded-sm shadow-xl">
      <p className="text-xs text-muted-foreground font-medium mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}

export default function MyPerformance() {
  const vendorId = "v1"
  const stats = getVendorStats(vendorId)
  const leads = getLeadsByVendor(vendorId)

  // Product breakdown for donut
  const byProduct = PRODUCTS.map((p, i) => ({
    name: p.length > 16 ? p.slice(0, 14) + "…" : p,
    fullName: p,
    value: leads.filter(l => l.producto === p).length,
    color: CHART_COLORS[i % CHART_COLORS.length],
  })).filter(p => p.value > 0)

  // Monthly trend data
  const months = ["Nov", "Dic", "Ene", "Feb", "Mar", "Abr"]
  const monthlyVentas = [1, 2, 1, 3, 2, stats.cerrados]
  const monthlyLeads = [3, 4, 3, 6, 5, stats.total]
  const trendData = months.map((m, i) => ({
    name: m,
    ventas: monthlyVentas[i],
    leads: monthlyLeads[i],
  }))

  // Conversion gauge
  const conversionValue = parseFloat(stats.conversion) || 0
  const conversionGoal = 35 // target %

  // Gamification
  const badges = [
    { earned: stats.cerrados >= 1, icon: "🎯", label: "Primer Cierre", desc: "Cerraste tu primera venta" },
    { earned: stats.cerrados >= 3, icon: "🔥", label: "Racha de Fuego", desc: "3+ ventas en un mes" },
    { earned: conversionValue > 30, icon: "⭐", label: "Alta Conversión", desc: "Conversión superior al 30%" },
    { earned: stats.ingresoEstimado >= 100000, icon: "💎", label: "Club Premium", desc: "Más de $100K en aportes mensuales" },
  ]

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={<Users className="w-5 h-5 text-primary" />} label="Leads Totales" value={stats.total} />
        <KPICard icon={<ShoppingCart className="w-5 h-5 text-primary" />} label="Ventas Cerradas" value={stats.cerrados} trend={15} trendLabel="vs. mes anterior" />
        <KPICard icon={<TrendingUp className="w-5 h-5 text-primary" />} label="Tasa de Conversión" value={`${stats.conversion}%`} trend={3} trendLabel="vs. promedio equipo" />
        <KPICard icon={<Award className="w-5 h-5 text-primary" />} label="Ingreso Generado" value={`$${stats.ingresoEstimado.toLocaleString()}`} />
      </div>

      {/* Trend + Conversion Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Mi Tendencia</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="vendorGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PRIMARY_GOLD} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={PRIMARY_GOLD} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} wrapperStyle={tooltipWrapperStyle} cursor={{ stroke: "rgba(200,169,110,0.2)", strokeWidth: 1 }} />
                <Area type="monotone" dataKey="ventas" name="Ventas" stroke={PRIMARY_GOLD} strokeWidth={2.5}
                  fill="url(#vendorGold)" dot={{ r: 3, fill: PRIMARY_GOLD, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: PRIMARY_GOLD, stroke: "#fff", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="leads" name="Leads" stroke="#7c6f5b" strokeWidth={1.5}
                  fill="transparent" strokeDasharray="5 3" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Conversion Gauge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-panel p-6 flex flex-col items-center justify-center">
          <h3 className="font-serif text-lg text-foreground mb-4">Meta de Conversión</h3>
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              {/* Background circle */}
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              {/* Progress arc */}
              <circle cx="60" cy="60" r="50" fill="none" stroke={PRIMARY_GOLD}
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(Math.min(conversionValue, conversionGoal) / conversionGoal) * 314} 314`}
                style={{ transition: "stroke-dasharray 1s ease-out" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-serif text-primary">{stats.conversion}%</span>
              <span className="text-xs text-muted-foreground">Meta: {conversionGoal}%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            {conversionValue >= conversionGoal
              ? "🎉 ¡Meta superada!"
              : `Faltan ${(conversionGoal - conversionValue).toFixed(1)}% para la meta`}
          </p>
        </motion.div>
      </div>

      {/* Product Distribution + Gamification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Donut */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Mis Productos</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byProduct} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                  paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {byProduct.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip wrapperStyle={tooltipWrapperStyle} content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  const d = payload[0]
                  return (
                    <div className="bg-card/95 backdrop-blur-xl border border-border/60 px-4 py-3 rounded-sm shadow-xl">
                      <p className="text-sm font-medium text-foreground">{d.payload.fullName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{d.value} leads</p>
                    </div>
                  )
                }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {byProduct.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-xs text-muted-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gamification */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-lg text-foreground">Mis Logros</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, i) => (
              <div key={i}
                className={`p-4 bg-background border rounded-sm text-center transition-all ${
                  badge.earned ? "border-primary/30 hover:border-primary/50" : "border-border/30 opacity-40 grayscale"
                }`}>
                <div className="text-2xl mb-1.5">{badge.icon}</div>
                <p className="text-xs font-medium text-foreground mb-0.5">{badge.label}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{badge.desc}</p>
                {badge.earned && <p className="text-[10px] text-primary mt-1.5 font-medium">✓ Obtenido</p>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
