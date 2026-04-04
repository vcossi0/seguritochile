import { useState } from "react"
import Drawer from "../../../components/ui/Drawer"
import LeadDetail from "../../../components/dashboard/LeadDetail"
import { getLeadsByVendor } from "../../../data/mockData"

export default function MyAgenda() {
  const vendorId = "v1"
  const myLeads = getLeadsByVendor(vendorId)
  const withFollowUp = myLeads.filter(l => l.seguimiento)
  const [selectedLead, setSelectedLead] = useState(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  const overdue = withFollowUp.filter(l => new Date(l.seguimiento) < today)
  const todayItems = withFollowUp.filter(l => { const d = new Date(l.seguimiento); return d >= today && d < tomorrow })
  const upcoming = withFollowUp.filter(l => { const d = new Date(l.seguimiento); return d >= tomorrow && d < nextWeek })

  const AgendaGroup = ({ title, items, accent }) => (
    items.length > 0 && (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {accent && <div className={`w-2 h-2 rounded-full ${accent}`} />}
          <h2 className="text-lg font-serif text-foreground">{title}</h2>
          <span className="text-xs text-muted-foreground bg-card px-2 py-0.5 rounded-full border border-border/40">{items.length}</span>
        </div>
        <div className="glass-panel divide-y divide-border/30">
          {items.map(lead => (
            <div key={lead.id} onClick={() => setSelectedLead(lead)}
              className="flex items-center justify-between p-4 hover:bg-card/50 cursor-pointer transition-colors">
              <div>
                <p className="font-medium text-foreground text-sm">{lead.nombre}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{lead.producto}</p>
                <p className="text-xs text-muted-foreground mt-1 italic">
                  {lead.notas?.[lead.notas.length - 1]?.texto?.substring(0, 80)}...
                </p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-sm text-primary font-mono">
                  {new Date(lead.seguimiento).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(lead.seguimiento).toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "short" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )

  return (
    <div>
      <AgendaGroup title="Atrasados" items={overdue} accent="bg-red-400 animate-pulse" />
      <AgendaGroup title="Hoy" items={todayItems} accent="bg-primary" />
      <AgendaGroup title="Próximos 7 días" items={upcoming} accent="bg-blue-400" />

      {withFollowUp.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-serif mb-2">Sin seguimientos agendados</p>
          <p className="text-sm">Agenda seguimientos desde el detalle de un lead.</p>
        </div>
      )}

      <Drawer isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title={selectedLead?.nombre || ""}>
        <LeadDetail lead={selectedLead} />
      </Drawer>
    </div>
  )
}
