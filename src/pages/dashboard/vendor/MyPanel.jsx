import { useState } from "react"
import { motion } from "framer-motion"
import { Users, UserCheck, ShoppingCart, TrendingUp, AlertTriangle, Clock, Phone, MessageCircle } from "lucide-react"
import KPICard from "../../../components/dashboard/KPICard"
import Drawer from "../../../components/ui/Drawer"
import LeadDetail from "../../../components/dashboard/LeadDetail"
import { MOCK_LEADS, getLeadsByVendor, getVendorStats, LEAD_STATES } from "../../../data/mockData"

export default function MyPanel() {
  const vendorId = "v1" // mock — will come from auth
  const stats = getVendorStats(vendorId)
  const myLeads = getLeadsByVendor(vendorId)
  const urgent = myLeads.filter(l => l.estado === "sin_contactar")
  const followUps = myLeads.filter(l => l.seguimiento)
  const inProcess = myLeads.filter(l => !["sin_contactar", "cerrado", "perdido"].includes(l.estado))
  const [selectedLead, setSelectedLead] = useState(null)
  const [leads, setLeads] = useState(myLeads)

  const changeStatus = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, estado: newStatus } : l))
    setSelectedLead(prev => prev && prev.id === id ? { ...prev, estado: newStatus } : prev)
  }

  const buildWaUrl = (lead) => {
    const msg = encodeURIComponent(`Hola ${lead.nombre.split(" ")[0]}, soy de Segurito Chile. Vi que estás interesado/a en nuestro plan ${lead.producto}. ¿Te conviene conversar ahora?`)
    return `https://wa.me/${lead.telefono.replace(/\D/g, "")}?text=${msg}`
  }

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-serif text-foreground">¡Buenos días! 👋</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tienes <span className="text-primary font-medium">{urgent.length} leads pendientes</span> y <span className="text-primary font-medium">{followUps.length} seguimientos</span> agendados.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={<AlertTriangle className="w-5 h-5 text-primary" />} label="Pendientes Hoy" value={stats.sinContactar} trend={null} />
        <KPICard icon={<Clock className="w-5 h-5 text-primary" />} label="En Proceso" value={stats.enProceso} trend={null} />
        <KPICard icon={<ShoppingCart className="w-5 h-5 text-primary" />} label="Cerrados (Mes)" value={stats.cerrados} trend={15} trendLabel="vs. mes anterior" />
        <KPICard icon={<TrendingUp className="w-5 h-5 text-primary" />} label="Mi Conversión" value={`${stats.conversion}%`} trend={3} trendLabel="vs. promedio" />
      </div>

      {/* Urgent — Leads sin contactar */}
      {urgent.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <h2 className="text-lg font-serif text-foreground">Acción Inmediata — Leads sin contactar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urgent.map(lead => {
              const hours = Math.floor((Date.now() - new Date(lead.fecha).getTime()) / (1000 * 60 * 60))
              return (
                <motion.div key={lead.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`glass-panel p-5 transition-colors ${hours > 48 ? "border-red-400/30" : ""}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-muted-foreground">{hours}h sin atender</span>
                    {hours > 48 && <span className="text-xs bg-red-400/10 text-red-400 px-2 py-0.5 rounded-sm border border-red-400/20">Urgente</span>}
                  </div>
                  <h3 className="font-medium text-foreground mb-1 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setSelectedLead(lead)}>{lead.nombre}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{lead.producto}</p>
                  <p className="text-xs text-muted-foreground mb-4">{lead.telefono}</p>
                  
                  {/* Quick action buttons */}
                  <div className="flex items-center gap-2">
                    <a href={`tel:${lead.telefono}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary/10 border border-primary/30 text-primary text-xs font-medium rounded-sm hover:bg-primary/20 transition-colors">
                      <Phone className="w-3.5 h-3.5" /> Llamar
                    </a>
                    <a href={buildWaUrl(lead)} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-medium rounded-sm hover:bg-green-500/20 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* In Process */}
      {inProcess.length > 0 && (
        <div>
          <h2 className="text-lg font-serif text-foreground mb-4">En Proceso</h2>
          <div className="glass-panel divide-y divide-border/30">
            {inProcess.map(lead => {
              const stateConfig = LEAD_STATES.find(s => s.key === lead.estado)
              const lastNote = lead.notas?.[lead.notas.length - 1]
              return (
                <div key={lead.id} onClick={() => setSelectedLead(lead)}
                  className="flex items-center justify-between p-4 hover:bg-card/50 cursor-pointer transition-colors group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{lead.nombre}</p>
                      <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-sm border ${stateConfig?.color}`}>
                        {stateConfig?.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{lead.producto}</p>
                    {lastNote && (
                      <p className="text-xs text-muted-foreground/70 mt-1 italic truncate max-w-md">
                        💬 {lastNote.texto.substring(0, 80)}...
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <a href={buildWaUrl(lead)} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 flex items-center justify-center rounded-sm border border-border/40 text-muted-foreground hover:text-green-500 hover:border-green-500/40 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                    <a href={`tel:${lead.telefono}`} onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 flex items-center justify-center rounded-sm border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Follow-ups */}
      {followUps.length > 0 && (
        <div>
          <h2 className="text-lg font-serif text-foreground mb-4">Seguimientos Agendados</h2>
          <div className="glass-panel divide-y divide-border/30">
            {followUps.map(lead => (
              <div key={lead.id} onClick={() => setSelectedLead(lead)}
                className="flex items-center justify-between p-4 hover:bg-card/50 cursor-pointer transition-colors">
                <div>
                  <p className="font-medium text-foreground text-sm">{lead.nombre}</p>
                  <p className="text-xs text-muted-foreground">{lead.producto}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-primary font-mono">
                      {new Date(lead.seguimiento).toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(lead.seguimiento).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <a href={buildWaUrl(lead)} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 flex items-center justify-center rounded-sm border border-border/40 text-muted-foreground hover:text-green-500 hover:border-green-500/40 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drawer */}
      <Drawer isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title={selectedLead?.nombre || ""}>
        <LeadDetail lead={selectedLead} onChangeStatus={changeStatus} />
      </Drawer>
    </div>
  )
}
