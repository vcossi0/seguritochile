import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Globe, Award, TrendingDown, DollarSign, Settings, Save, CheckCircle2 } from "lucide-react"
import KPICard from "../../components/dashboard/KPICard"
import { TRAFFIC_SOURCES, TRAFFIC_DATA } from "../../data/mockData"

export default function Traffic() {
  const [pixelId, setPixelId] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("meta_pixel_id")
    if (saved) setPixelId(saved)
  }, [])

  const handleSavePixel = () => {
    localStorage.setItem("meta_pixel_id", pixelId)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
    window.dispatchEvent(new Event("storage")) // Triggers our App listener if needed
  }

  const sourceEntries = Object.entries(TRAFFIC_DATA)
  const totalVisits = sourceEntries.reduce((a, [, d]) => a + d.visitas, 0)
  const totalLeads = sourceEntries.reduce((a, [, d]) => a + d.leads, 0)
  const totalVentas = sourceEntries.reduce((a, [, d]) => a + d.ventas, 0)
  const totalGasto = sourceEntries.reduce((a, [, d]) => a + d.gasto, 0)
  const costPerLead = totalLeads > 0 ? Math.round(totalGasto / totalLeads) : 0

  const sorted = sourceEntries.sort((a, b) => b[1].leads - a[1].leads)
  const bestKey = sorted[0]?.[0]
  const worstKey = sorted[sorted.length - 1]?.[0]
  const bestSource = TRAFFIC_SOURCES.find(s => s.key === bestKey)
  const worstSource = TRAFFIC_SOURCES.find(s => s.key === worstKey)

  return (
    <div className="space-y-6">
      {/* Meta Pixel Config */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-foreground">Integración Meta Ads (Facebook Píxel)</h3>
            <p className="text-sm text-muted-foreground">Configura tu ID de píxel para rastrear visitas y leads de forma automática.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Ej: 123456789012345" 
            value={pixelId}
            onChange={(e) => setPixelId(e.target.value)}
            className="flex-1 md:w-64 bg-background border border-border/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm"
          />
          <button 
            onClick={handleSavePixel}
            className="bg-primary text-primary-foreground px-4 py-2.5 rounded-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shrink-0"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaved ? "Guardado" : "Guardar"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={<Globe className="w-5 h-5 text-primary" />} label="Visitas Totales (Mes)" value={totalVisits.toLocaleString()} trend={18} trendLabel="vs. mes anterior" />
        <KPICard icon={<Award className="w-5 h-5 text-primary" />} label="Mejor Fuente" value={bestSource?.label || "—"} />
        <KPICard icon={<TrendingDown className="w-5 h-5 text-primary" />} label="Peor Fuente" value={worstSource?.label || "—"} />
        <KPICard icon={<DollarSign className="w-5 h-5 text-primary" />} label="Costo por Lead" value={`$${costPerLead.toLocaleString()}`} trend={-5} trendLabel="vs. mes anterior" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut-like chart */}
        <div className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Distribución de Leads por Fuente</h3>
          <div className="space-y-3">
            {sorted.map(([key, data], i) => {
              const source = TRAFFIC_SOURCES.find(s => s.key === key)
              const pct = ((data.leads / totalLeads) * 100).toFixed(1)
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{source?.icon}</span> {source?.label}
                    </span>
                    <span className="text-sm text-foreground font-medium">{data.leads} leads ({pct}%)</span>
                  </div>
                  <div className="w-full bg-background h-7 rounded-sm overflow-hidden border border-border/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full flex items-center pl-2"
                      style={{ backgroundColor: source?.color + "40" }}
                    >
                      <span className="text-xs font-medium text-foreground">{pct}%</span>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Conversion by source */}
        <div className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-6">Eficiencia por Fuente</h3>
          <div className="space-y-3">
            {sorted.map(([key, data], i) => {
              const source = TRAFFIC_SOURCES.find(s => s.key === key)
              const convRate = data.visitas > 0 ? ((data.ventas / data.visitas) * 100).toFixed(2) : "0"
              const cpl = data.leads > 0 && data.gasto > 0 ? Math.round(data.gasto / data.leads) : "—"
              const roi = data.gasto > 0 ? ((data.ventas / data.gasto) * 100000).toFixed(0) : "∞"
              return (
                <motion.div key={key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-background border border-border/30 p-4 rounded-sm flex items-center gap-4">
                  <span className="text-xl">{source?.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{source?.label}</p>
                    <p className="text-xs text-muted-foreground">Conversión: {convRate}% · CPL: ${typeof cpl === "number" ? cpl.toLocaleString() : cpl}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-serif text-primary">{data.ventas}</p>
                    <p className="text-xs text-muted-foreground">ventas</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Full Performance Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-5 border-b border-border/40">
          <h3 className="font-serif text-lg text-foreground">Rendimiento Detallado por Fuente</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-card/50">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Fuente</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Visitas</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Clicks CTA</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Formularios</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Leads</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Ventas</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden md:table-cell">Conv %</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden md:table-cell">CPL</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(([key, data]) => {
                const source = TRAFFIC_SOURCES.find(s => s.key === key)
                const conv = data.visitas > 0 ? ((data.ventas / data.visitas) * 100).toFixed(2) : "0"
                const cpl = data.leads > 0 && data.gasto > 0 ? `$${Math.round(data.gasto / data.leads).toLocaleString()}` : "—"
                return (
                  <tr key={key} className="border-b border-border/20 hover:bg-card/40 transition-colors">
                    <td className="px-5 py-4 font-medium text-foreground">{source?.icon} {source?.label}</td>
                    <td className="px-5 py-4 text-right text-muted-foreground">{data.visitas.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right text-muted-foreground">{data.clicks.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right text-muted-foreground">{data.formularios}</td>
                    <td className="px-5 py-4 text-right text-foreground font-medium">{data.leads}</td>
                    <td className="px-5 py-4 text-right text-primary font-medium">{data.ventas}</td>
                    <td className="px-5 py-4 text-right text-muted-foreground hidden md:table-cell">{conv}%</td>
                    <td className="px-5 py-4 text-right text-muted-foreground hidden md:table-cell">{cpl}</td>
                  </tr>
                )
              })}
              {/* Totals Row */}
              <tr className="border-t-2 border-border/60 bg-card/30 font-medium">
                <td className="px-5 py-4 text-foreground">Total</td>
                <td className="px-5 py-4 text-right text-foreground">{totalVisits.toLocaleString()}</td>
                <td className="px-5 py-4 text-right text-foreground">{sourceEntries.reduce((a, [, d]) => a + d.clicks, 0).toLocaleString()}</td>
                <td className="px-5 py-4 text-right text-foreground">{sourceEntries.reduce((a, [, d]) => a + d.formularios, 0)}</td>
                <td className="px-5 py-4 text-right text-foreground">{totalLeads}</td>
                <td className="px-5 py-4 text-right text-primary">{totalVentas}</td>
                <td className="px-5 py-4 text-right text-foreground hidden md:table-cell">{((totalVentas / totalVisits) * 100).toFixed(2)}%</td>
                <td className="px-5 py-4 text-right text-foreground hidden md:table-cell">${costPerLead.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
