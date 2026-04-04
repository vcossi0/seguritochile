import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Mail, Lock, ArrowRight, AlertCircle, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ROLES = [
  { value: "admin", label: "Administrador", description: "Acceso total al sistema" },
  { value: "gestor", label: "Gestor Comercial", description: "Métricas y gestión global" },
  { value: "vendedor", label: "Vendedor", description: "Mis clientes y seguimiento" },
]

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("vendedor")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      if (email && password.length >= 4) {
        const vendorId = role === "vendedor" ? "v1" : undefined
        localStorage.setItem("agus_auth", JSON.stringify({ 
          email, 
          role, 
          vendorId,
          name: email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase())
        }))
        if (role === "vendedor") {
          navigate("/dashboard/mi-panel")
        } else {
          navigate("/dashboard")
        }
      } else {
        setError("Credenciales inválidas. Verifica tu email y contraseña.")
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-10">
          <Shield className="h-8 w-8 text-primary" />
          <span className="font-serif text-3xl font-semibold tracking-tight">Agus Star</span>
        </div>

        <div className="glass-panel p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-semibold mb-2">Acceso Trabajadores</h1>
            <p className="text-sm text-muted-foreground">Ingresa tus credenciales para acceder al panel de gestión</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Role Selector */}
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2 block">Perfil de Acceso</label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`px-3 py-2.5 rounded-sm text-xs font-medium border transition-all text-center ${
                      role === r.value 
                        ? "bg-primary/10 text-primary border-primary/40" 
                        : "bg-background border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60 mt-1.5 text-center italic">
                {ROLES.find(r => r.value === role)?.description}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2 block">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@agusstar.cl"
                  className="w-full bg-background border border-border/60 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2 block">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border/60 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </motion.div>
            )}

            <button type="submit" disabled={loading}
              className="bg-primary text-primary-foreground py-3 rounded-none font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>Ingresar <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/40 text-center">
            <p className="text-xs text-muted-foreground">¿Problemas para acceder? Contacta al administrador del sistema.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="text-xs font-mono text-muted-foreground/60 bg-card px-3 py-1.5 rounded-full border border-border/30">
            Sistema Interno · Acceso Restringido
          </div>
        </div>
      </motion.div>
    </div>
  )
}
