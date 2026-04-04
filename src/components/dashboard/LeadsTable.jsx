import { useState } from "react"
import { Search, Filter, ChevronDown, Phone, Mail, MoreHorizontal } from "lucide-react"

const MOCK_LEADS = [
  { id: 1, nombre: "María González", telefono: "+56 9 8765 4321", email: "maria.g@gmail.com", producto: "APV Régimen B", estado: "sin_contactar", fecha: "2026-04-03" },
  { id: 2, nombre: "Carlos Muñoz", telefono: "+56 9 1234 5678", email: "carlos.m@outlook.com", producto: "Seguro de Vida", estado: "en_proceso", fecha: "2026-04-02" },
  { id: 3, nombre: "Ana Rodríguez", telefono: "+56 9 5555 1234", email: "ana.r@gmail.com", producto: "Desgravamen", estado: "sin_contactar", fecha: "2026-04-03" },
  { id: 4, nombre: "Pedro Soto", telefono: "+56 9 6789 0123", email: "pedro.s@yahóo.com", producto: "APV Régimen A", estado: "cerrado", fecha: "2026-04-01" },
  { id: 5, nombre: "Francisca López", telefono: "+56 9 3456 7890", email: "fran.l@gmail.com", producto: "Vida Entera", estado: "en_proceso", fecha: "2026-04-02" },
  { id: 6, nombre: "Roberto Díaz", telefono: "+56 9 2345 6789", email: "roberto.d@hotmail.com", producto: "Seguro Temporal", estado: "perdido", fecha: "2026-03-31" },
  { id: 7, nombre: "Valentina Herrera", telefono: "+56 9 8901 2345", email: "vale.h@gmail.com", producto: "APV Régimen B", estado: "sin_contactar", fecha: "2026-04-03" },
  { id: 8, nombre: "Ignacio Fuentes", telefono: "+56 9 7890 1234", email: "nacho.f@gmail.com", producto: "Desgravamen", estado: "en_proceso", fecha: "2026-04-01" },
]

const STATUS_CONFIG = {
  sin_contactar: { label: "Sin contactar", color: "bg-amber-400/10 text-amber-400 border-amber-400/20" },
  en_proceso: { label: "En proceso", color: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
  cerrado: { label: "Cerrado", color: "bg-primary/10 text-primary border-primary/20" },
  perdido: { label: "Perdido", color: "bg-red-400/10 text-red-400 border-red-400/20" },
}

const ALL_STATES = ["sin_contactar", "en_proceso", "cerrado", "perdido"]

export default function LeadsTable() {
  const [leads, setLeads] = useState(MOCK_LEADS)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [stateMenuOpen, setStateMenuOpen] = useState(null)

  const filtered = leads.filter(lead => {
    const matchSearch = lead.nombre.toLowerCase().includes(search.toLowerCase()) || lead.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "todos" || lead.estado === filterStatus
    return matchSearch && matchStatus
  })

  const changeStatus = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, estado: newStatus } : l))
    setStateMenuOpen(null)
  }

  return (
    <div className="glass-panel overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-border/40">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="w-full bg-background border border-border/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-background border border-border/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors rounded-sm cursor-pointer"
          >
            <option value="todos">Todos los estados</option>
            <option value="sin_contactar">Sin contactar</option>
            <option value="en_proceso">En proceso</option>
            <option value="cerrado">Cerrado</option>
            <option value="perdido">Perdido</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 bg-card/50">
              <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Nombre</th>
              <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden md:table-cell">Contacto</th>
              <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Producto</th>
              <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Estado</th>
              <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden sm:table-cell">Fecha</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-b border-border/20 hover:bg-card/40 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-foreground">{lead.nombre}</p>
                  <p className="text-xs text-muted-foreground md:hidden">{lead.email}</p>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <div className="flex items-center gap-3">
                    <a href={`tel:${lead.telefono}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="w-3 h-3" /> {lead.telefono}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                    <Mail className="w-3 h-3" /> {lead.email}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-muted-foreground">{lead.producto}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-sm border ${STATUS_CONFIG[lead.estado].color}`}>
                    {STATUS_CONFIG[lead.estado].label}
                  </span>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell text-muted-foreground">{lead.fecha}</td>
                <td className="px-5 py-4 relative">
                  <button
                    onClick={() => setStateMenuOpen(stateMenuOpen === lead.id ? null : lead.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-card border border-transparent hover:border-border/50 text-muted-foreground hover:text-foreground transition-all"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  
                  {stateMenuOpen === lead.id && (
                    <div className="absolute right-5 top-full z-20 bg-card border border-border/60 rounded-sm shadow-xl py-1 w-44">
                      <p className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-widest border-b border-border/30">Cambiar estado</p>
                      {ALL_STATES.map(s => (
                        <button
                          key={s}
                          onClick={() => changeStatus(lead.id, s)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-background transition-colors ${lead.estado === s ? "text-primary" : "text-muted-foreground"}`}
                        >
                          {STATUS_CONFIG[s].label}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="px-5 py-3 border-t border-border/40 flex items-center justify-between bg-card/30">
        <span className="text-xs text-muted-foreground">
          Mostrando {filtered.length} de {leads.length} leads
        </span>
        <div className="flex gap-3">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <span key={key} className="text-xs text-muted-foreground">
              {cfg.label}: <span className="text-foreground font-medium">{leads.filter(l => l.estado === key).length}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
