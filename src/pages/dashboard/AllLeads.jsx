import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import Drawer from "../../components/ui/Drawer"
import LeadDetail from "../../components/dashboard/LeadDetail"
import { MOCK_LEADS, LEAD_STATES, VENDORS, TRAFFIC_SOURCES } from "../../data/mockData"

export default function AllLeads() {
  const [leads, setLeads] = useState(MOCK_LEADS)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [filterSource, setFilterSource] = useState("todos")
  const [selectedLead, setSelectedLead] = useState(null)

  const filtered = leads.filter(l => {
    const matchSearch = l.nombre.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "todos" || l.estado === filterStatus
    const matchSource = filterSource === "todos" || l.fuente === filterSource
    return matchSearch && matchStatus && matchSource
  })

  const changeStatus = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, estado: newStatus } : l))
    setSelectedLead(prev => prev && prev.id === id ? { ...prev, estado: newStatus } : prev)
  }

  const exportCSV = () => {
    const headers = "Nombre,Teléfono,Email,Producto,Estado,Fuente,Fecha,Vendedor\n"
    const rows = filtered.map(l => {
      const vendor = VENDORS.find(v => v.id === l.vendedorId)
      return `"${l.nombre}","${l.telefono}","${l.email}","${l.producto}","${l.estado}","${l.fuente}","${l.fecha}","${vendor?.name || "—"}"`
    }).join("\n")
    const blob = new Blob([headers + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `leads_seguritochile_${new Date().toISOString().slice(0, 10)}.csv`; a.click()
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="w-full bg-card border border-border/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm" />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-card border border-border/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 rounded-sm cursor-pointer">
              <option value="todos">Todos los estados</option>
              {LEAD_STATES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>
          <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}
            className="bg-card border border-border/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 rounded-sm cursor-pointer">
            <option value="todos">Todas las fuentes</option>
            {TRAFFIC_SOURCES.map(s => <option key={s.key} value={s.key}>{s.icon} {s.label}</option>)}
          </select>
          <button onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-sm text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-card/50">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Nombre</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden lg:table-cell">Contacto</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Producto</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Estado</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden md:table-cell">Fuente</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden md:table-cell">Vendedor</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden sm:table-cell">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => {
                const stateConfig = LEAD_STATES.find(s => s.key === lead.estado)
                const source = TRAFFIC_SOURCES.find(s => s.key === lead.fuente)
                const vendor = VENDORS.find(v => v.id === lead.vendedorId)
                return (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)}
                    className="border-b border-border/20 hover:bg-card/40 transition-colors cursor-pointer">
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">{lead.nombre}</p>
                      <p className="text-xs text-muted-foreground lg:hidden">{lead.telefono}</p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">
                      <p>{lead.telefono}</p>
                      <p className="text-xs">{lead.email}</p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{lead.producto}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-sm border ${stateConfig?.color}`}>{stateConfig?.label}</span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{source?.icon} {source?.label}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{vendor?.name || "—"}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden sm:table-cell">{new Date(lead.fecha).toLocaleDateString("es-CL")}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border/40 flex items-center justify-between bg-card/30">
          <span className="text-xs text-muted-foreground">Mostrando {filtered.length} de {leads.length} leads</span>
        </div>
      </div>

      <Drawer isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title={selectedLead?.nombre || ""}>
        <LeadDetail lead={selectedLead} onChangeStatus={changeStatus} />
      </Drawer>
    </div>
  )
}
