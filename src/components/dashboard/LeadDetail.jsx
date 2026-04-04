import { Phone, Mail, MessageCircle, Clock, Tag } from "lucide-react"
import { LEAD_STATES, TRAFFIC_SOURCES } from "../../data/mockData"

function NoteIcon({ tipo }) {
  const icons = { sistema: "⚙️", llamada: "📞", nota: "📝", venta: "🎉", whatsapp: "💬" }
  return <span className="text-sm">{icons[tipo] || "📝"}</span>
}

export default function LeadDetail({ lead, onClose, onAddNote, onChangeStatus }) {
  if (!lead) return null
  const source = TRAFFIC_SOURCES.find(s => s.key === lead.fuente)
  const stateConfig = LEAD_STATES.find(s => s.key === lead.estado)
  const daysInPipeline = Math.floor((Date.now() - new Date(lead.fecha).getTime()) / (1000 * 60 * 60 * 24))

  const waMessage = encodeURIComponent(`Hola ${lead.nombre.split(" ")[0]}, soy de Agus Star. Vi que estás interesado/a en nuestro plan ${lead.producto}. ¿Te conviene conversar ahora?`)
  const waUrl = `https://wa.me/${lead.telefono.replace(/\D/g, "")}?text=${waMessage}`

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-sm border ${stateConfig?.color}`}>
            {stateConfig?.label}
          </span>
          {source && (
            <span className="text-xs bg-background px-2 py-1 rounded-sm border border-border/40 text-muted-foreground">
              {source.icon} {source.label}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-serif font-semibold text-foreground mb-1">{lead.nombre}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{lead.producto}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{daysInPipeline} días en pipeline</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <a href={`tel:${lead.telefono}`} className="flex flex-col items-center gap-1.5 py-3 bg-background border border-border/50 rounded-sm hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground">
          <Phone className="w-4 h-4" /><span className="text-xs">Llamar</span>
        </a>
        <a href={`mailto:${lead.email}`} className="flex flex-col items-center gap-1.5 py-3 bg-background border border-border/50 rounded-sm hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground">
          <Mail className="w-4 h-4" /><span className="text-xs">Email</span>
        </a>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 py-3 bg-background border border-border/50 rounded-sm hover:border-green-500/50 hover:text-green-500 transition-colors text-muted-foreground">
          <MessageCircle className="w-4 h-4" /><span className="text-xs">WhatsApp</span>
        </a>
      </div>

      {/* Contact Info */}
      <div className="bg-background border border-border/40 p-4 rounded-sm space-y-2 text-sm">
        <p className="text-muted-foreground"><span className="text-foreground font-medium">Teléfono:</span> {lead.telefono}</p>
        <p className="text-muted-foreground"><span className="text-foreground font-medium">Email:</span> {lead.email}</p>
        <p className="text-muted-foreground"><span className="text-foreground font-medium">Ingreso:</span> {new Date(lead.fecha).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}</p>
        {lead.utm_campaign && <p className="text-muted-foreground"><span className="text-foreground font-medium">Campaña:</span> {lead.utm_campaign}</p>}
        {lead.monto && <p className="text-muted-foreground"><span className="text-foreground font-medium">Monto:</span> ${lead.monto.toLocaleString()}/mes</p>}
      </div>

      {/* Status Changer */}
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2 block">Cambiar Estado</label>
        <div className="flex flex-wrap gap-1.5">
          {LEAD_STATES.map(s => (
            <button key={s.key} onClick={() => onChangeStatus?.(lead.id, s.key)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-sm border transition-all ${
                lead.estado === s.key ? s.color + " ring-1 ring-current" : "bg-background border-border/40 text-muted-foreground hover:text-foreground"
              }`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-4">Historial de Interacciones</h4>
        <div className="space-y-0 relative">
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border/50" />
          {[...(lead.notas || [])].reverse().map((nota, i) => (
            <div key={i} className="flex gap-4 pb-5 relative">
              <div className="w-6 h-6 rounded-full bg-card border border-border/60 flex items-center justify-center z-10 shrink-0 mt-0.5">
                <NoteIcon tipo={nota.tipo} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground">{nota.autor}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(nota.fecha).toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit" })} {new Date(nota.fecha).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{nota.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
