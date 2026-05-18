import { useState } from "react"
import { Search, Filter, Phone, MessageCircle, Mail } from "lucide-react"
import Drawer from "../../../components/ui/Drawer"
import LeadDetail from "../../../components/dashboard/LeadDetail"
import { getLeadsByVendor, LEAD_STATES } from "../../../data/mockData"

export default function MyClients() {
  const vendorId = "v1"
  const [leads, setLeads] = useState(getLeadsByVendor(vendorId))
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [selectedLead, setSelectedLead] = useState(null)

  const filtered = leads.filter(l => {
    const matchSearch = l.nombre.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "todos" || l.estado === filterStatus
    return matchSearch && matchStatus
  })

  const changeStatus = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, estado: newStatus } : l))
    setSelectedLead(prev => prev && prev.id === id ? { ...prev, estado: newStatus } : prev)
  }

  const buildWaUrl = (lead) => {
    const msg = encodeURIComponent(`Hola ${lead.nombre.split(" ")[0]}, soy de Segurito Chile. Vi que estás interesado/a en nuestro plan ${lead.producto}. ¿Te conviene conversar ahora?`)
    return `https://wa.me/${lead.telefono.replace(/\D/g, "")}?text=${msg}`
  }

  // Summary counts
  const statusCounts = LEAD_STATES.map(s => ({
    ...s,
    count: leads.filter(l => l.estado === s.key).length,
  })).filter(s => s.count > 0)

  return (
    <div className="space-y-6">
      {/* Status chips summary */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilterStatus("todos")}
          className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-all ${
            filterStatus === "todos"
              ? "bg-primary/10 text-primary border-primary/30"
              : "bg-card border-border/40 text-muted-foreground hover:text-foreground"
          }`}>
          Todos ({leads.length})
        </button>
        {statusCounts.map(s => (
          <button key={s.key} onClick={() => setFilterStatus(s.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-all ${
              filterStatus === s.key
                ? s.color + " ring-1 ring-current"
                : "bg-card border-border/40 text-muted-foreground hover:text-foreground"
            }`}>
            {s.label} ({s.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="w-full bg-card border border-border/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm" />
        </div>
        <span className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(lead => {
          const stateConfig = LEAD_STATES.find(s => s.key === lead.estado)
          const lastNote = lead.notas?.[lead.notas.length - 1]
          return (
            <div key={lead.id}
              className="glass-panel p-5 cursor-pointer hover:border-primary/50 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-sm border ${stateConfig?.color}`}>
                  {stateConfig?.label}
                </span>
                <span className="text-xs text-muted-foreground">{new Date(lead.fecha).toLocaleDateString("es-CL")}</span>
              </div>
              <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors"
                onClick={() => setSelectedLead(lead)}>{lead.nombre}</h3>
              <p className="text-sm text-muted-foreground mb-1">{lead.producto}</p>
              {lastNote && (
                <p className="text-xs text-muted-foreground/60 mb-3 italic truncate">
                  💬 {lastNote.texto.substring(0, 60)}...
                </p>
              )}
              
              {/* Quick contact row */}
              <div className="flex items-center justify-between pt-3 border-t border-border/30">
                <p className="text-xs text-muted-foreground">{lead.notas?.length || 0} interacciones</p>
                <div className="flex items-center gap-1.5">
                  <a href={buildWaUrl(lead)} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 flex items-center justify-center rounded-sm border border-border/40 text-muted-foreground hover:text-green-500 hover:border-green-500/40 transition-colors"
                    title="WhatsApp">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                  <a href={`tel:${lead.telefono}`} onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 flex items-center justify-center rounded-sm border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    title="Llamar">
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 flex items-center justify-center rounded-sm border border-border/40 text-muted-foreground hover:text-sky-400 hover:border-sky-400/40 transition-colors"
                    title="Email">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-serif mb-2">Sin resultados</p>
          <p className="text-sm">No hay leads que coincidan con tu búsqueda.</p>
        </div>
      )}

      <Drawer isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title={selectedLead?.nombre || ""}>
        <LeadDetail lead={selectedLead} onChangeStatus={changeStatus} />
      </Drawer>
    </div>
  )
}
