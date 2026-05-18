import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, Loader2, ChevronRight, ChevronLeft } from "lucide-react"
import { PRODUCTS } from "../../data/mockData"
import { supabase } from "../../lib/supabaseClient"

export default function LeadCaptureForm({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const [form, setForm] = useState({ 
    // Paso 1: Personales
    nombre: "", rut: "", fecha_nacimiento: "",
    // Paso 2: Contacto
    email: "", telefono: "", ocupacion: "",
    // Paso 3: Familia y Finanzas
    hijos: "", hijos_edades: "", renta: "", ahorro_mensual: "",
    // Paso 4: Riesgos y Producto
    seguros_activos: "", riesgo_extremo: "", producto: "", comuna: "", mensaje: "" 
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const validateStep = (currentStep) => {
    const e = {}
    if (currentStep === 1) {
      if (!form.nombre.trim()) e.nombre = "Requerido"
      if (!/^\d{7,8}-[0-9Kk]$/.test(form.rut.trim())) e.rut = "Formato 12345678-9"
      if (!form.fecha_nacimiento) e.fecha_nacimiento = "Requerido"
    }
    if (currentStep === 2) {
      if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido"
      if (!/^\+?56\s?9\s?\d{4}\s?\d{4}$/.test(form.telefono.replace(/\s/g, ""))) e.telefono = "Formato: +56 9 XXXX XXXX"
      if (!form.ocupacion) e.ocupacion = "Requerido"
    }
    if (currentStep === 3) {
      if (!form.hijos) e.hijos = "Requerido"
      if (form.hijos === "Sí" && !form.hijos_edades.trim()) e.hijos_edades = "Indica las edades"
      if (!form.renta) e.renta = "Requerido"
      if (!form.ahorro_mensual) e.ahorro_mensual = "Requerido"
    }
    if (currentStep === 4) {
      if (!form.riesgo_extremo) e.riesgo_extremo = "Requerido"
      if (!form.producto) e.producto = "Requerido"
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) setStep(s => Math.min(s + 1, totalSteps))
  }
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(4)) return
    setLoading(true)

    // Preparar el payload mapeando con las columnas exactas de Supabase
    const leadData = {
      nombre: form.nombre,
      rut: form.rut,
      fecha_nacimiento: form.fecha_nacimiento,
      email: form.email,
      telefono: form.telefono,
      ocupacion: form.ocupacion,
      hijos: form.hijos,
      hijos_edades: form.hijos_edades || null,
      renta: form.renta,
      ahorro_mensual: form.ahorro_mensual,
      seguros_activos: form.seguros_activos || null,
      riesgo_extremo: form.riesgo_extremo,
      producto: form.producto,
      comuna: form.comuna || null,
      mensaje: form.mensaje || null
    }

    try {
      const { error } = await supabase.from('leads').insert([leadData])
      
      if (error) {
        console.error("Error al guardar lead:", error)
        alert("Hubo un problema guardando tu solicitud. Por favor intenta más tarde.")
        setLoading(false)
        return
      }

      console.log("Lead guardado exitosamente en Supabase.")

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: form.producto, currency: "CLP", value: 0 })
      }

      setLoading(false)
      setSuccess(true)
    } catch (err) {
      console.error("Error crítico de conexión:", err)
      alert("Error de conexión al servidor.")
      setLoading(false)
    }
  }

  const handleClose = () => {
    setForm({ nombre: "", rut: "", fecha_nacimiento: "", email: "", telefono: "", ocupacion: "", hijos: "", hijos_edades: "", renta: "", ahorro_mensual: "", seguros_activos: "", riesgo_extremo: "", producto: "", comuna: "", mensaje: "" })
    setStep(1)
    setErrors({})
    setSuccess(false)
    onClose()
  }

  const inputClass = (field) => `w-full bg-white border ${errors[field] ? "border-red-400" : "border-border"} px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all rounded-sm`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-background p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-border rounded-sm">
              <button onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                <X className="w-4 h-4" />
              </button>

              {!success ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Perfilamiento Estratégico</h2>
                    <p className="text-sm text-muted-foreground">Paso {step} de {totalSteps}. Procesamos tus datos de forma 100% segura.</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-border/40 h-1.5 mt-4 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                    </div>
                  </div>

                  <form className="flex flex-col gap-5">
                    {/* PASO 1 */}
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Nombre Completo</label>
                          <input type="text" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Ej: María González" className={inputClass("nombre")} />
                          {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">RUT</label>
                            <input type="text" value={form.rut} onChange={e => setForm({ ...form, rut: e.target.value })} placeholder="12345678-9" className={inputClass("rut")} />
                            {errors.rut && <p className="text-xs text-red-500 mt-1">{errors.rut}</p>}
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Fecha de Nacimiento</label>
                            <input type="date" value={form.fecha_nacimiento} onChange={e => setForm({ ...form, fecha_nacimiento: e.target.value })} className={inputClass("fecha_nacimiento")} />
                            {errors.fecha_nacimiento && <p className="text-xs text-red-500 mt-1">{errors.fecha_nacimiento}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* PASO 2 */}
                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Teléfono</label>
                            <input type="tel" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} placeholder="+56 9 8765 4321" className={inputClass("telefono")} />
                            {errors.telefono && <p className="text-xs text-red-500 mt-1">{errors.telefono}</p>}
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Correo Electrónico</label>
                            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="correo@ejemplo.cl" className={inputClass("email")} />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Ocupación / Trabajo Actual</label>
                          <input type="text" value={form.ocupacion} onChange={e => setForm({ ...form, ocupacion: e.target.value })} placeholder="Ej: Ingeniera en Minería, Independiente..." className={inputClass("ocupacion")} />
                          {errors.ocupacion && <p className="text-xs text-red-500 mt-1">{errors.ocupacion}</p>}
                        </div>
                      </motion.div>
                    )}

                    {/* PASO 3 */}
                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">¿Tienes Hijos?</label>
                            <select value={form.hijos} onChange={e => setForm({ ...form, hijos: e.target.value })} className={inputClass("hijos")}>
                              <option value="">Seleccionar...</option>
                              <option value="Sí">Sí</option>
                              <option value="No">No</option>
                            </select>
                            {errors.hijos && <p className="text-xs text-red-500 mt-1">{errors.hijos}</p>}
                          </div>
                          {form.hijos === "Sí" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">¿Cuántos y qué edades?</label>
                              <input type="text" value={form.hijos_edades} onChange={e => setForm({ ...form, hijos_edades: e.target.value })} placeholder="Ej: 2 hijos (4 y 7 años)" className={inputClass("hijos_edades")} />
                              {errors.hijos_edades && <p className="text-xs text-red-500 mt-1">{errors.hijos_edades}</p>}
                            </motion.div>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Renta Mensual Líquida</label>
                            <select value={form.renta} onChange={e => setForm({ ...form, renta: e.target.value })} className={inputClass("renta")}>
                              <option value="">Seleccionar...</option>
                              <option value="Menos de $1.000.000">Menos de $1.000.000</option>
                              <option value="$1.000.000 - $2.500.000">$1.000.000 - $2.500.000</option>
                              <option value="Más de $2.500.000">Más de $2.500.000</option>
                            </select>
                            {errors.renta && <p className="text-xs text-red-500 mt-1">{errors.renta}</p>}
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Capacidad Ahorro Mensual</label>
                            <select value={form.ahorro_mensual} onChange={e => setForm({ ...form, ahorro_mensual: e.target.value })} className={inputClass("ahorro_mensual")}>
                              <option value="">Seleccionar...</option>
                              <option value="$50.000 - $100.000">$50.000 - $100.000</option>
                              <option value="$100.000 - $300.000">$100.000 - $300.000</option>
                              <option value="$300.000 - $500.000">$300.000 - $500.000</option>
                              <option value="Más de $500.000">Más de $500.000</option>
                            </select>
                            {errors.ahorro_mensual && <p className="text-xs text-red-500 mt-1">{errors.ahorro_mensual}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* PASO 4 */}
                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Actividades de Riesgo Extremo</label>
                            <select value={form.riesgo_extremo} onChange={e => setForm({ ...form, riesgo_extremo: e.target.value })} className={inputClass("riesgo_extremo")}>
                              <option value="">Seleccionar...</option>
                              <option value="Ninguna">Ninguna</option>
                              <option value="Deportes Motores (motocross, autos)">Deportes Motores</option>
                              <option value="Acuáticos Extremos (buceo, surf)">Acuáticos Extremos</option>
                              <option value="Aéreos (Paracaidismo, Parapente)">Deportes Aéreos</option>
                              <option value="Montañismo / Escalada en roca">Montañismo / Escalada en roca</option>
                            </select>
                            {errors.riesgo_extremo && <p className="text-xs text-red-500 mt-1">{errors.riesgo_extremo}</p>}
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Producto de Interés</label>
                            <select value={form.producto} onChange={e => setForm({ ...form, producto: e.target.value })} className={inputClass("producto")}>
                              <option value="">Seleccionar...</option>
                              {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            {errors.producto && <p className="text-xs text-red-500 mt-1">{errors.producto}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Otros Seguros Activos <span className="text-muted-foreground/50">(opcional)</span></label>
                          <input type="text" value={form.seguros_activos} onChange={e => setForm({ ...form, seguros_activos: e.target.value })} placeholder="Ej: Seguro de salud colectivo, Desgravamen banco..." className={inputClass("seguros_activos")} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Comuna <span className="text-muted-foreground/50">(opcional)</span></label>
                            <input type="text" value={form.comuna} onChange={e => setForm({ ...form, comuna: e.target.value })} placeholder="Ej: Las Condes" className={inputClass("comuna")} />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Mensaje <span className="text-muted-foreground/50">(opcional)</span></label>
                            <input type="text" value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} placeholder="Dudas extra" className={inputClass("mensaje")} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Controles del Wizard */}
                    <div className="flex items-center justify-between mt-4">
                      {step > 1 ? (
                        <button type="button" onClick={prevStep} className="text-muted-foreground hover:text-foreground text-sm font-medium flex items-center gap-1 transition-colors">
                          <ChevronLeft className="w-4 h-4" /> Atrás
                        </button>
                      ) : (
                        <div></div> // Spacer
                      )}
                      
                      {step < totalSteps ? (
                        <button type="button" onClick={nextStep} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all text-sm">
                          Siguiente <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button type="submit" disabled={loading} onClick={handleSubmit} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all min-w-[140px] text-sm">
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enviar Perfil"}
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">¡Perfil Recibido!</h2>
                  <p className="text-muted-foreground mb-8">Un asesor de Segurito Chile analizará tu configuración y se contactará contigo por teléfono en las próximas 24 horas.</p>
                  <button onClick={handleClose}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-none font-semibold hover:bg-primary/90 transition-all text-sm tracking-wide">
                    VOLVER AL SITIO
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
