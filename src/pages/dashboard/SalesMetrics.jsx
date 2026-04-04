import { motion } from "framer-motion"
import { ShoppingCart, DollarSign, Award, TrendingUp } from "lucide-react"
import KPICard from "../../components/dashboard/KPICard"
import { MOCK_LEADS, VENDORS, PRODUCTS, LEAD_STATES, getGlobalStats } from "../../data/mockData"

export default function SalesMetrics() {
  const stats = getGlobalStats()
  const closedLeads = MOCK_LEADS.filter(l => l.estado === "cerrado")
  const avgTicket = closedLeads.length > 0 ? Math.round(closedLeads.reduce((a, l) => a + (l.monto || 0), 0) / closedLeads.length) : 0

  // By product
  const byProduct = PRODUCTS.map(p => ({
    product: p,
    total: MOCK_LEADS.filter(l => l.producto === p).length,
    cerrados: MOCK_LEADS.filter(l => l.producto === p && l.estado === "cerrado").length,
    inPipeline: MOCK_LEADS.filter(l => l.producto === p && !["cerrado", "perdido"].includes(l.estado)).length,
  })).sort((a, b) => b.cerrados - a.cerrados)

  // By vendor
  const byVendor = VENDORS.filter(v => v.active).map(v => {
    const leads = MOCK_LEADS.filter(l => l.vendedorId === v.id)
    return { ...v, total: leads.length, cerrados: leads.filter(l => l.estado === "cerrado").length, ingreso: leads.filter(l => l.monto).reduce((a, l) => a + l.monto, 0) }
  }).sort((a, b) => b.cerrados - a.cerrados)

  // Pipeline
  const pipelineStates = LEAD_STATES.filter(s => !["cerrado", "perdido"].includes(s.key))
  const pipelineCounts = pipelineStates.map(s => ({ ...s, count: MOCK_LEADS.filter(l => l.estado === s.key).length }))

  // Closed sales table
  const recentSales = closedLeads.map(l => {
    const vendor = VENDORS.find(v => v.id === l.vendedorId)
    const closeNote = l.notas?.find(n => n.tipo === "venta")
    const daysInPipeline = closeNote ? Math.floor((new Date(closeNote.fecha) - new Date(l.fecha)) / (1000 * 60 * 60 * 24)) : "—"
    return { ...l, vendorName: vendor?.name || "—", daysInPipeline }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={<ShoppingCart className="w-5 h-5 text-primary" />} label="Ventas Cerradas (Mes)" value={stats.cerrados} trend={12} trendLabel="vs. mes anterior" />
        <KPICard icon={<DollarSign className="w-5 h-5 text-primary" />} label="Ingreso Total" value={`$${stats.ingresoTotal.toLocaleString()}`} trend={8} trendLabel="vs. mes anterior" />
        <KPICard icon={<Award className="w-5 h-5 text-primary" />} label="Ticket Promedio" value={`$${avgTicket.toLocaleString()}`} />
        <KPICard icon={<TrendingUp className="w-5 h-5 text-primary" />} label="Pipeline Activo" value={stats.pipeline} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Product */}
        <div className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Ventas por Producto</h3>
          <div className="space-y-4">
            {byProduct.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="text-muted-foreground">{p.product}</span>
                  <span className="text-foreground font-medium">{p.cerrados} cerradas · {p.inPipeline} en proceso</span>
                </div>
                <div className="w-full bg-background h-6 rounded-sm overflow-hidden border border-border/30 flex">
                  <motion.div initial={{ width: 0 }} animate={{ width: p.total > 0 ? `${(p.cerrados / Math.max(...byProduct.map(x => x.total))) * 100}%` : "0%" }}
                    transition={{ duration: 0.7, delay: i * 0.1 }} className="h-full bg-primary flex items-center justify-end pr-2">
                    {p.cerrados > 0 && <span className="text-[10px] text-primary-foreground font-medium">{p.cerrados}</span>}
                  </motion.div>
                  <motion.div initial={{ width: 0 }} animate={{ width: p.total > 0 ? `${(p.inPipeline / Math.max(...byProduct.map(x => x.total))) * 100}%` : "0%" }}
                    transition={{ duration: 0.7, delay: i * 0.1 + 0.2 }} className="h-full bg-primary/30" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Ranking */}
        <div className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Ranking de Vendedores</h3>
          <div className="space-y-3">
            {byVendor.map((v, i) => (
              <div key={v.id} className="flex items-center gap-4 p-3 bg-background border border-border/30 rounded-sm">
                <span className="text-xl w-8 text-center">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{v.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.cerrados} ventas · {v.total} leads · ${v.ingreso.toLocaleString()}/mes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Pipeline */}
      <div className="glass-panel p-6">
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
      </div>

      {/* Recent Sales Table */}
      <div className="glass-panel overflow-hidden">
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
      </div>
    </div>
  )
}
