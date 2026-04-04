import { motion } from "framer-motion"
import { Users, ShoppingCart, TrendingUp, Clock, AlertTriangle, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import KPICard from "../../components/dashboard/KPICard"
import { getGlobalStats, MOCK_LEADS, VENDORS, TRAFFIC_SOURCES, TRAFFIC_DATA } from "../../data/mockData"

export default function Overview() {
  const stats = getGlobalStats()
  const recentActivity = [...MOCK_LEADS].flatMap(l => l.notas.map(n => ({ ...n, leadName: l.nombre, leadId: l.id })))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 8)

  const coldLeads = MOCK_LEADS.filter(l => {
    if (l.estado !== "sin_contactar") return false
    return (Date.now() - new Date(l.fecha).getTime()) > 48 * 60 * 60 * 1000
  })

  // Best source
  const sourceEntries = Object.entries(TRAFFIC_DATA).sort((a, b) => b[1].leads - a[1].leads)
  const bestSource = TRAFFIC_SOURCES.find(s => s.key === sourceEntries[0]?.[0])

  return (
    <div className="space-y-6">
      {/* Quick Stats Ticker */}
      <div className="glass-panel px-5 py-3 flex items-center justify-between flex-wrap gap-3 text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-foreground font-medium">{stats.sinContactar}</span> leads nuevos hoy
        </span>
        <span className="text-muted-foreground">
          📊 <span className="text-foreground font-medium">{stats.cerrados}</span> ventas este mes
        </span>
        <span className="text-muted-foreground">
          ⏰ <span className={`font-medium ${coldLeads.length > 0 ? "text-red-400" : "text-foreground"}`}>{coldLeads.length}</span> leads sin atender {">"}48h
        </span>
        {bestSource && (
          <span className="text-muted-foreground">
            🏆 Mejor fuente: <span className="text-primary font-medium">{bestSource.label}</span>
          </span>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={<Users className="w-5 h-5 text-primary" />} label="Total Leads" value={stats.totalLeads} trend={18} trendLabel="vs. mes anterior" />
        <KPICard icon={<ShoppingCart className="w-5 h-5 text-primary" />} label="Ventas Cerradas" value={stats.cerrados} trend={12} trendLabel="vs. mes anterior" />
        <KPICard icon={<TrendingUp className="w-5 h-5 text-primary" />} label="Conversión Global" value={`${stats.conversionGlobal}%`} trend={5} trendLabel="vs. mes anterior" />
        <KPICard icon={<Clock className="w-5 h-5 text-primary" />} label="Pipeline Activo" value={stats.pipeline} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources Mini */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-lg text-foreground">Fuentes de Tráfico</h3>
            <Link to="/dashboard/trafico" className="text-xs text-primary hover:underline flex items-center gap-1">Ver detalle <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-3">
            {sourceEntries.slice(0, 5).map(([key, data]) => {
              const source = TRAFFIC_SOURCES.find(s => s.key === key)
              const totalLeads = Object.values(TRAFFIC_DATA).reduce((a, d) => a + d.leads, 0)
              const pct = ((data.leads / totalLeads) * 100).toFixed(0)
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-sm w-6">{source?.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{source?.label}</span>
                      <span className="text-xs text-foreground font-medium">{data.leads} leads</span>
                    </div>
                    <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Vendor Ranking Mini */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-lg text-foreground">Ranking Vendedores</h3>
            <Link to="/dashboard/vendedores" className="text-xs text-primary hover:underline flex items-center gap-1">Gestionar <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-3">
            {VENDORS.filter(v => v.active).map((vendor, i) => {
              const vendorLeads = MOCK_LEADS.filter(l => l.vendedorId === vendor.id)
              const cerrados = vendorLeads.filter(l => l.estado === "cerrado").length
              return (
                <div key={vendor.id} className="flex items-center gap-3 p-2 rounded-sm hover:bg-card/50 transition-colors">
                  <span className="text-lg w-6 text-center">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {vendor.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{vendorLeads.length} leads · {cerrados} cerrados</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-5">Actividad Reciente</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-border/20 last:border-0">
                <span className="text-sm mt-0.5">{act.tipo === "venta" ? "🎉" : act.tipo === "llamada" ? "📞" : act.tipo === "sistema" ? "⚙️" : "📝"}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground font-medium">{act.leadName}</p>
                  <p className="text-xs text-muted-foreground truncate">{act.texto.substring(0, 60)}...</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                    {new Date(act.fecha).toLocaleDateString("es-CL")} · {act.autor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cold Leads Alert */}
      {coldLeads.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-red-400/5 border border-red-400/20 rounded-sm p-5 flex items-center gap-4">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">⚠️ {coldLeads.length} leads llevan más de 48 horas sin ser contactados</p>
            <p className="text-xs text-muted-foreground mt-1">
              {coldLeads.map(l => l.nombre).join(", ")}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
