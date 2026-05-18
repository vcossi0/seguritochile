import { useState } from "react"
import { Phone, Mail, MessageCircle, Clock, Tag, Send, PhoneCall, FileText, PartyPopper } from "lucide-react"
import { LEAD_STATES, TRAFFIC_SOURCES } from "../../data/mockData"

function NoteIcon({ tipo }) {
  const icons = { sistema: "⚙️", llamada: "📞", nota: "📝", venta: "🎉", whatsapp: "💬" }
  return <span className="text-sm">{icons[tipo] || "📝"}</span>
}

const NOTE_TYPES = [
  { key: "llamada", label: "Llamada", icon: PhoneCall, color: "text-sky-400 border-sky-400/30 bg-sky-400/10" },
  { key: "nota", label: "Nota", icon: FileText, color: "text-primary border-primary/30 bg-primary/10" },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle, color: "text-green-500 border-green-500/30 bg-green-500/10" },
  { key: "venta", label: "Venta", icon: PartyPopper, color: "text-amber-400 border-amber-400/30 bg-amber-400/10" },
]

export default function LeadDetail({ lead, onClose, onAddNote, onChangeStatus }) {
  const [noteText, setNoteText] = useState("")
  const [noteType, setNoteType] = useState("nota")
  const [notes, setNotes] = useState(lead?.notas || [])

  if (!lead) return null

  // --- AI Scoring Logic ---
  const calculateScore = (l) => {
    let score = 50 // Base score
    // Renta
    if (l.renta === "Más de $5.000.000" || l.renta === "$2.500.000 - $5.000.000") score += 30
    else if (l.renta === "$1.000.000 - $2.500.000") score += 15

    // Ahorro
    if (l.ahorro_mensual === "Más de $1.000.000") score += 20
    else if (l.ahorro_mensual === "$500.000 - $1.000.000") score += 15
    else if (l.ahorro_mensual === "$300.000 - $500.000") score += 10

    // Hijos
    if (l.hijos === "Sí") score += 15

    // Riesgos
    if (l.riesgo_extremo === "Deportes Extremos" || l.riesgo_extremo === "Motociclismo") score -= 10
    if (l.riesgo_extremo === "Aviación Privada") score -= 20

    return Math.max(0, Math.min(100, score))
  }

  const score = calculateScore(lead)
  
  let scoreColor = "text-amber-400 bg-amber-400/10 border-amber-400/30"
  if (score >= 80) scoreColor = "text-green-500 bg-green-500/10 border-green-500/30"
  else if (score <= 40) scoreColor = "text-red-400 bg-red-400/10 border-red-400/30"

  // --- Sales Copilot Logic (Basado en Playbook) ---
  const generatePitch = (l) => {
    let title = ""
    let pitch = ""
    let objection = ""
    let flag = null
    
    // Flags de Riesgo
    if (l.riesgo_extremo && l.riesgo_extremo !== "Ninguna") {
      flag = `⚠️ Alerta de Suscripción: Practica ${l.riesgo_extremo}. Posible exclusión o sobreprima en Seguro de Vida.`
    }
    if (l.ocupacion === "Minería" || l.ocupacion === "Fuerzas Armadas / Seguridad") {
      flag = `⚠️ Ocupación de riesgo (${l.ocupacion}). Verificar tabla de exclusiones con la compañía.`
    }

    // Clasificación de Perfiles (Marketing Playbook)
    const isHighIncome = l.renta === "Más de $5.000.000" || l.renta === "$2.500.000 - $5.000.000"
    const isParent = l.hijos === "Sí"
    
    if (l.producto === "Seguro de Desgravamen Hipotecario") {
      title = "Perfil C: El Dueño de Propiedad 🏠"
      pitch = `Hola ${l.nombre.split(" ")[0]}, te hablo de Segurito Chile. Vi tu perfil e indiqué que podrías estar pagando un sobreprecio sistémico al banco. Hacemos portabilidad bajo la ley 20.552, ¿quieres ver cuánto dinero estás dejando en la mesa?`
      objection = "Si dice que le da flojera cambiar el seguro: 'El banco no quiere que lo cambies porque es su negocio más rentable. El trámite lo hacemos 100% nosotros gratis y te ahorras literalmente millones en los próximos 15 años.'"
    } else if (isParent) {
      title = "Perfil B: El Protector Familiar 👨‍👩‍👧"
      pitch = `Hola ${l.nombre.split(" ")[0]}, analizamos tu perfil en Segurito Chile. Me llamó la atención que priorizas la seguridad de tu familia (${l.hijos_edades ? l.hijos_edades : 'tus hijos'}). Hemos diseñado una estructura que garantiza su educación incluso si tú llegaras a faltar.`
      objection = `Si dice que ${l.seguros_activos ? `ya tiene seguro (${l.seguros_activos})` : 'ya tiene seguro del trabajo'}: 'Los seguros corporativos mueren si dejas la empresa, y tu edad va a ser más alta para tomar uno nuevo. Armemos un piso personal que no dependa de tu empleador.'`
    } else if (isHighIncome) {
      title = "Perfil A: El Estratega de Impuestos 📈"
      pitch = `Hola ${l.nombre.split(" ")[0]}, según el perfilamiento de Segurito Chile estás en un tramo de renta donde el Global Complementario te castiga fuerte. Usando el Art. 42 bis podrías recuperar hasta el 40% de tus ahorros en la Operación Renta. ¿Te muestro exactamente cuánto puedes rescatar?`
      objection = "Si dice que ya invierte por su cuenta: 'Invertir está perfecto, pero sin protección tributaria estás pagando al fisco rentabilidades que podrías quedarte tú. El Régimen B es dinero que el Estado literalmente te devuelve por tu nivel de renta.'"
    } else {
      title = "Perfil Base: Constructor Patrimonial 🌱"
      pitch = `Hola ${l.nombre.split(" ")[0]}, vi que tienes capacidad de ahorro mensual de ${l.ahorro_mensual}. Nuestro sistema determinó que la mejor forma de proteger ese dinero de la inflación a largo plazo es combinándolo con protección ante enfermedades graves. ¿Te cuento cómo funciona nuestra arquitectura?`
      objection = "Usa el miedo a la invalidez laboral si confían mucho en su AFP."
    }

    return { title, pitch, objection, flag }
  }

  const { title, pitch, objection, flag } = generatePitch(lead)

  const source = TRAFFIC_SOURCES.find(s => s.key === lead.fuente)
  const stateConfig = LEAD_STATES.find(s => s.key === lead.estado)
  const daysInPipeline = Math.floor((Date.now() - new Date(lead.fecha).getTime()) / (1000 * 60 * 60 * 24))

  const waMessage = encodeURIComponent(`Hola ${lead.nombre.split(" ")[0]}, soy de Segurito Chile. Vi que estás interesado/a en nuestro plan ${lead.producto}. ¿Te conviene conversar ahora?`)
  const waUrl = `https://wa.me/${lead.telefono.replace(/\D/g, "")}?text=${waMessage}`

  const handleAddNote = () => {
    if (!noteText.trim()) return
    const newNote = {
      fecha: new Date().toISOString(),
      autor: "Tú",
      tipo: noteType,
      texto: noteText.trim(),
    }
    setNotes(prev => [...prev, newNote])
    if (onAddNote) onAddNote(lead.id, newNote)
    if (lead.notas) lead.notas.push(newNote)
    else lead.notas = [newNote]
    setNoteText("")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-sm border ${stateConfig?.color}`}>
            {stateConfig?.label}
          </span>
          {source && (
            <span className="text-xs bg-background px-2 py-1 rounded-sm border border-border/40 text-muted-foreground flex items-center gap-1">
              <span>{source.icon}</span> <span>{source.label}</span>
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-sm border ${scoreColor} font-semibold flex items-center gap-1 ml-auto`}>
            ⭐ Score: {score}/100
          </span>
        </div>
        <h3 className="text-2xl font-serif font-semibold text-foreground mb-1">{lead.nombre}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{lead.producto}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{daysInPipeline} días en pipeline</span>
        </div>
      </div>

      {/* AI Copilot Panel */}
      <div className="bg-primary/5 border border-primary/20 rounded-md p-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <span className="text-primary text-xl">🤖</span>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-primary uppercase tracking-widest">Sales Copilot</h4>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-sm border border-primary/20">
                {title}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider mb-1">Guión de Contacto</p>
                <div className="bg-background/80 border border-border/50 p-3 rounded-sm">
                  <p className="text-sm text-foreground/90 leading-relaxed font-serif italic text-pretty">
                    "{pitch}"
                  </p>
                </div>
              </div>

              {objection && (
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider mb-1">Manejo de Objeciones</p>
                  <div className="bg-amber-400/5 border border-amber-400/20 p-2.5 rounded-sm">
                    <p className="text-xs text-amber-500/90 leading-relaxed font-medium">
                      🛡️ {objection}
                    </p>
                  </div>
                </div>
              )}

              {flag && (
                <div className="pt-1 mt-2 border-t border-red-400/10">
                  <p className="text-xs text-red-500/90 font-medium bg-red-500/10 px-2.5 py-1.5 rounded-sm border border-red-500/20 flex items-center gap-1.5 w-max">
                    {flag}
                  </p>
                </div>
              )}
            </div>
          </div>
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

      {/* Add Note */}
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2 block">Agregar Nota</label>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {NOTE_TYPES.map(t => {
            const Icon = t.icon
            return (
              <button key={t.key} onClick={() => setNoteType(t.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-sm border transition-all ${
                  noteType === t.key ? t.color + " ring-1 ring-current" : "bg-background border-border/40 text-muted-foreground hover:text-foreground"
                }`}>
                <Icon className="w-3 h-3" /> {t.label}
              </button>
            )
          })}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
            placeholder="Ej: Llamé, quedó en enviar documentos..."
            className="flex-1 bg-background border border-border/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm"
          />
          <button onClick={handleAddNote} disabled={!noteText.trim()}
            className="px-3 py-2.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-4">Historial de Interacciones ({notes.length})</h4>
        <div className="space-y-0 relative">
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border/50" />
          {[...notes].reverse().map((nota, i) => (
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
