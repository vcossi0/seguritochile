import { useState } from "react"
import { motion } from "framer-motion"
import { Users, UserCheck, ShoppingCart, TrendingUp, AlertTriangle, Clock } from "lucide-react"
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
  const [selectedLead, setSelectedLead] = useState(null)

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={<AlertTriangle className="w-5 h-5 text-primary" />} label="Pendientes Hoy" value={stats.sinContactar} trend={null} />
        <KPICard icon={<Clock className="w-5 h-5 text-primary" />} label="Seguimientos Hoy" value={followUps.length} trend={null} />
        <KPICard icon={<ShoppingCart className="w-5 h-5 text-primary" />} label="Cerrados (Mes)" value={stats.cerrados} trend={15} trendLabel="vs. mes anterior" />
        <KPICard icon={<TrendingUp className="w-5 h-5 text-primary" />} label="Mi Conversión" value={`${stats.conversion}%`} trend={3} trendLabel="vs. promedio" />
      </div>

      {/* Urgent */}
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
                  onClick={() => setSelectedLead(lead)}
                  className={`glass-panel p-5 cursor-pointer hover:border-primary/50 transition-colors ${hours > 48 ? "border-red-400/30" : ""}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-muted-foreground">{hours}h sin atender</span>
                    {hours > 48 && <span className="text-xs bg-red-400/10 text-red-400 px-2 py-0.5 rounded-sm border border-red-400/20">Urgente</span>}
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{lead.nombre}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{lead.producto}</p>
                  <p className="text-xs text-muted-foreground">{lead.telefono}</p>
                </motion.div>
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
                <div className="text-right">
                  <p className="text-sm text-primary font-mono">
                    {new Date(lead.seguimiento).toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "short" })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(lead.seguimiento).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drawer */}
      <Drawer isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title={selectedLead?.nombre || ""}>
        <LeadDetail lead={selectedLead} />
      </Drawer>
    </div>
  )
}
