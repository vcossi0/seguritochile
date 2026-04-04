import { useState } from "react"
import { Search, Filter } from "lucide-react"
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

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="w-full bg-card border border-border/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-card border border-border/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 rounded-sm cursor-pointer">
            <option value="todos">Todos</option>
            {LEAD_STATES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(lead => {
          const stateConfig = LEAD_STATES.find(s => s.key === lead.estado)
          return (
            <div key={lead.id} onClick={() => setSelectedLead(lead)}
              className="glass-panel p-5 cursor-pointer hover:border-primary/50 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-sm border ${stateConfig?.color}`}>
                  {stateConfig?.label}
                </span>
                <span className="text-xs text-muted-foreground">{new Date(lead.fecha).toLocaleDateString("es-CL")}</span>
              </div>
              <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{lead.nombre}</h3>
              <p className="text-sm text-muted-foreground mb-2">{lead.producto}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{lead.telefono}</p>
                <p className="text-xs text-muted-foreground">{lead.notas?.length || 0} notas</p>
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
