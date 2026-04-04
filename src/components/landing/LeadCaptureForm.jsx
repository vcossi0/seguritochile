import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, Loader2 } from "lucide-react"
import { PRODUCTS } from "../../data/mockData"

export default function LeadCaptureForm({ isOpen, onClose }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", producto: "", mensaje: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = "Nombre requerido"
    if (!/^\+?56\s?9\s?\d{4}\s?\d{4}$/.test(form.telefono.replace(/\s/g, ""))) e.telefono = "Formato: +56 9 XXXX XXXX"
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido"
    if (!form.producto) e.producto = "Selecciona un producto"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    // Capture UTM params from URL
    const params = new URLSearchParams(window.location.search)
    const utmData = {
      utm_source: params.get("utm_source") || "organico",
      utm_medium: params.get("utm_medium") || "direct",
      utm_campaign: params.get("utm_campaign") || null,
      landing_url: window.location.href,
      timestamp: new Date().toISOString(),
    }

    // Mock submit
    setTimeout(() => {
      console.log("Lead capturado:", { ...form, ...utmData })
      setLoading(false)
      setSuccess(true)
    }, 1200)
  }

  const handleClose = () => {
    setForm({ nombre: "", telefono: "", email: "", producto: "", mensaje: "" })
    setErrors({})
    setSuccess(false)
    onClose()
  }

  const inputClass = (field) => `w-full bg-background border ${errors[field] ? "border-red-400/60" : "border-border/60"} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="w-full max-w-lg glass-panel p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                <X className="w-4 h-4" />
              </button>

              {!success ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Evaluación de Perfil</h2>
                    <p className="text-sm text-muted-foreground">Completa tus datos y un asesor se comunicará contigo en las próximas 24 horas.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Nombre Completo</label>
                      <input type="text" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })}
                        placeholder="María González" className={inputClass("nombre")} />
                      {errors.nombre && <p className="text-xs text-red-400 mt-1">{errors.nombre}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Teléfono</label>
                      <input type="tel" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })}
                        placeholder="+56 9 8765 4321" className={inputClass("telefono")} />
                      {errors.telefono && <p className="text-xs text-red-400 mt-1">{errors.telefono}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Correo Electrónico</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="correo@ejemplo.cl" className={inputClass("email")} />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Producto de Interés</label>
                      <select value={form.producto} onChange={e => setForm({ ...form, producto: e.target.value })}
                        className={`${inputClass("producto")} cursor-pointer`}>
                        <option value="">Seleccionar...</option>
                        {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.producto && <p className="text-xs text-red-400 mt-1">{errors.producto}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Mensaje Adicional <span className="text-muted-foreground/50">(opcional)</span></label>
                      <textarea value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })}
                        placeholder="¿Alguna consulta específica?" rows={3}
                        className={`${inputClass("mensaje")} resize-none`} />
                    </div>
                    <button type="submit" disabled={loading}
                      className="bg-primary text-primary-foreground py-3 rounded-none font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 mt-2">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar Evaluación"}
                    </button>
                    <p className="text-xs text-muted-foreground text-center mt-1">Proceso 100% confidencial y seguro.</p>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">¡Recibido!</h2>
                  <p className="text-muted-foreground mb-6">Un asesor especializado se comunicará contigo en las próximas 24 horas hábiles.</p>
                  <button onClick={handleClose}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-none font-semibold hover:bg-primary/90 transition-all">
                    Cerrar
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
