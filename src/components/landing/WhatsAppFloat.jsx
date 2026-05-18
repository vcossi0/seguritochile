import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  const phone = "56912345678" // Número de la empresa — cambiar en producción
  const options = [
    { label: "Quiero cotizar un seguro", emoji: "📋", msg: "Hola, quiero cotizar un seguro. ¿Me pueden ayudar?" },
    { label: "Tengo dudas sobre APV", emoji: "💰", msg: "Hola, tengo dudas sobre los planes APV. ¿Me pueden asesorar?" },
    { label: "Ya soy cliente", emoji: "🤝", msg: "Hola, ya soy cliente de Segurito Chile y necesito ayuda." },
    { label: "Otro motivo", emoji: "💬", msg: "Hola, me gustaría hablar con un asesor de Segurito Chile." },
  ]

  const sendWa = (msg) => {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank")
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-16 right-0 w-72 bg-card/95 backdrop-blur-2xl border border-border/60 rounded-lg shadow-2xl overflow-hidden mb-2"
          >
            {/* Header */}
            <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Segurito Chile</p>
                <p className="text-green-100 text-xs">Respuesta en menos de 5 min</p>
              </div>
            </div>

            {/* Chat bubble */}
            <div className="px-4 py-3 bg-background/50">
              <div className="bg-card border border-border/40 rounded-lg p-3 relative">
                <div className="absolute -top-1 left-4 w-3 h-3 bg-card border-l border-t border-border/40 rotate-45" />
                <p className="text-sm text-foreground">¡Hola! 👋 ¿En qué podemos ayudarte?</p>
                <p className="text-xs text-muted-foreground mt-1">Elige una opción:</p>
              </div>
            </div>

            {/* Options */}
            <div className="px-3 pb-3 space-y-1.5">
              {options.map((opt, i) => (
                <button key={i} onClick={() => sendWa(opt.msg)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-background border border-border/40 rounded-md text-left text-sm text-foreground hover:border-green-500/50 hover:bg-green-500/5 transition-all group">
                  <span className="text-base">{opt.emoji}</span>
                  <span className="group-hover:text-green-500 transition-colors">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-900/30 transition-colors ${
          open ? "bg-card border border-border/60" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {open
          ? <X className="w-5 h-5 text-muted-foreground" />
          : <MessageCircle className="w-6 h-6 text-white" />
        }
      </motion.button>

      {/* Pulse ring when closed */}
      {!open && (
        <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping pointer-events-none" />
      )}
    </div>
  )
}
