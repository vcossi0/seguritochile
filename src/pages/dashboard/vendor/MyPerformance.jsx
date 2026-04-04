import { motion } from "framer-motion"
import { TrendingUp, ShoppingCart, Users, Award, Flame } from "lucide-react"
import KPICard from "../../../components/dashboard/KPICard"
import { getVendorStats, getLeadsByVendor, PRODUCTS } from "../../../data/mockData"

export default function MyPerformance() {
  const vendorId = "v1"
  const stats = getVendorStats(vendorId)
  const leads = getLeadsByVendor(vendorId)

  // Product breakdown
  const byProduct = PRODUCTS.map(p => ({
    product: p,
    total: leads.filter(l => l.producto === p).length,
    cerrados: leads.filter(l => l.producto === p && l.estado === "cerrado").length,
  })).filter(p => p.total > 0)

  // Mock monthly data
  const months = ["Nov", "Dic", "Ene", "Feb", "Mar", "Abr"]
  const monthlyData = [1, 2, 1, 3, 2, stats.cerrados]
  const maxMonthly = Math.max(...monthlyData)

  // Gamification
  const badges = [
    { earned: stats.cerrados >= 1, icon: "🎯", label: "Primer Cierre", desc: "Cerraste tu primera venta" },
    { earned: stats.cerrados >= 3, icon: "🔥", label: "Racha de Fuego", desc: "3+ ventas en un mes" },
    { earned: stats.conversion > 30, icon: "⭐", label: "Alta Conversión", desc: "Conversión superior al 30%" },
    { earned: stats.ingresoEstimado >= 100000, icon: "💎", label: "Club Premium", desc: "Más de $100K en aportes mensuales" },
  ]

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={<Users className="w-5 h-5 text-primary" />} label="Leads Totales" value={stats.total} />
        <KPICard icon={<ShoppingCart className="w-5 h-5 text-primary" />} label="Ventas Cerradas" value={stats.cerrados} trend={15} trendLabel="vs. mes anterior" />
        <KPICard icon={<TrendingUp className="w-5 h-5 text-primary" />} label="Tasa de Conversión" value={`${stats.conversion}%`} trend={3} trendLabel="vs. promedio equipo" />
        <KPICard icon={<Award className="w-5 h-5 text-primary" />} label="Ingreso Generado" value={`$${stats.ingresoEstimado.toLocaleString()}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Chart */}
        <div className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Ventas Mensuales</h3>
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">{val}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxMonthly) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`w-full rounded-t-sm ${i === monthlyData.length - 1 ? "bg-primary" : "bg-primary/30"}`}
                  style={{ minHeight: val > 0 ? "8px" : "2px" }}
                />
                <span className="text-xs text-muted-foreground">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By Product */}
        <div className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Por Producto</h3>
          <div className="space-y-4">
            {byProduct.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="text-muted-foreground">{p.product}</span>
                  <span className="text-foreground font-medium">{p.cerrados}/{p.total}</span>
                </div>
                <div className="w-full bg-background h-3 rounded-sm overflow-hidden border border-border/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.total / stats.total) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="h-full bg-primary/40 relative"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: p.total > 0 ? `${(p.cerrados / p.total) * 100}%` : "0%" }}
                      transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                      className="h-full bg-primary absolute left-0 top-0"
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-serif text-foreground">Logros</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel p-5 text-center transition-colors ${badge.earned ? "border-primary/30" : "opacity-40 grayscale"}`}>
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-sm font-medium text-foreground mb-1">{badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.desc}</p>
              {badge.earned && <p className="text-xs text-primary mt-2 font-medium">✓ Obtenido</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
