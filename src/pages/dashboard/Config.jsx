import { useState, useEffect } from "react"
import { Shield, Bell, Palette, Database, Lock, Save, Check, Moon, Sun } from "lucide-react"
import useAuth from "../../hooks/useAuth"

export default function ConfigDashboard() {
  const { user, role } = useAuth()

  // Profile
  const [name, setName] = useState(user?.name || user?.email?.split("@")[0] || "")
  const [email, setEmail] = useState(user?.email || "")
  const [profileSaved, setProfileSaved] = useState(false)

  // Security
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [passSaved, setPassSaved] = useState(false)
  const [passError, setPassError] = useState("")

  // Notifications
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifNewLead, setNotifNewLead] = useState(true)
  const [notifSale, setNotifSale] = useState(true)
  const [notifFollowUp, setNotifFollowUp] = useState(false)

  // Appearance
  const [fontSize, setFontSize] = useState("normal")

  // Supabase
  const [supaUrl, setSupaUrl] = useState(localStorage.getItem("supabase_url") || "")
  const [supaKey, setSupaKey] = useState(localStorage.getItem("supabase_key") || "")
  const [supaSaved, setSupaSaved] = useState(false)

  const handleProfileSave = () => {
    const auth = JSON.parse(localStorage.getItem("segurito_auth") || "{}")
    auth.name = name
    auth.email = email
    localStorage.setItem("segurito_auth", JSON.stringify(auth))
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  const handlePassSave = () => {
    setPassError("")
    if (!currentPass) { setPassError("Ingresa tu contraseña actual"); return }
    if (newPass.length < 4) { setPassError("La nueva contraseña debe tener al menos 4 caracteres"); return }
    if (newPass !== confirmPass) { setPassError("Las contraseñas no coinciden"); return }
    setCurrentPass(""); setNewPass(""); setConfirmPass("")
    setPassSaved(true)
    setTimeout(() => setPassSaved(false), 2000)
  }

  const handleSupaSave = () => {
    localStorage.setItem("supabase_url", supaUrl)
    localStorage.setItem("supabase_key", supaKey)
    setSupaSaved(true)
    setTimeout(() => setSupaSaved(false), 2000)
  }

  const Toggle = ({ checked, onChange, label }) => (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
      <button onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-primary" : "bg-border"}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
    </label>
  )

  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-sm text-muted-foreground mb-2">Administra las preferencias de tu cuenta y del sistema.</p>

      {/* Profile */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-sm bg-card border border-border/50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Perfil de Usuario</h3>
            <p className="text-xs text-muted-foreground">Actualizar nombre y email.</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Nombre</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-background border border-border/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors rounded-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-background border border-border/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors rounded-sm" />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-muted-foreground">Rol:</span>
            <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm ${
              role === "admin" ? "bg-primary/10 text-primary" : role === "gestor" ? "bg-blue-400/10 text-blue-400" : "bg-amber-400/10 text-amber-400"
            }`}>{role === "admin" ? "Administrador" : role === "gestor" ? "Gestor Comercial" : "Vendedor"}</span>
          </div>
        </div>
        <button onClick={handleProfileSave}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors">
          {profileSaved ? <><Check className="w-4 h-4" /> Guardado</> : <><Save className="w-4 h-4" /> Guardar Perfil</>}
        </button>
      </div>

      {/* Security */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-sm bg-card border border-border/50 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Seguridad</h3>
            <p className="text-xs text-muted-foreground">Cambiar contraseña.</p>
          </div>
        </div>
        <div className="space-y-3">
          <input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} placeholder="Contraseña actual"
            className="w-full bg-background border border-border/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm" />
          <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Nueva contraseña"
            className="w-full bg-background border border-border/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm" />
          <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Confirmar nueva contraseña"
            className="w-full bg-background border border-border/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm" />
          {passError && <p className="text-xs text-red-400">{passError}</p>}
        </div>
        <button onClick={handlePassSave}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors">
          {passSaved ? <><Check className="w-4 h-4" /> Actualizada</> : <><Lock className="w-4 h-4" /> Cambiar Contraseña</>}
        </button>
      </div>

      {/* Notifications */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-sm bg-card border border-border/50 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Notificaciones</h3>
            <p className="text-xs text-muted-foreground">Preferencias de alertas.</p>
          </div>
        </div>
        <div className="space-y-4">
          <Toggle checked={notifEmail} onChange={setNotifEmail} label="Notificaciones por email" />
          <Toggle checked={notifNewLead} onChange={setNotifNewLead} label="Alerta de nuevo lead" />
          <Toggle checked={notifSale} onChange={setNotifSale} label="Alerta de venta cerrada" />
          <Toggle checked={notifFollowUp} onChange={setNotifFollowUp} label="Recordatorio de seguimiento" />
        </div>
      </div>

      {/* Supabase — Admin only */}
      {role === "admin" && (
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-sm bg-card border border-border/50 flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">Conexión a Base de Datos</h3>
              <p className="text-xs text-muted-foreground">Configurar credenciales de Supabase.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Project URL</label>
              <input type="url" value={supaUrl} onChange={e => setSupaUrl(e.target.value)} placeholder="https://xxxxx.supabase.co"
                className="w-full bg-background border border-border/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm font-mono text-xs" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1.5 block">Anon Key</label>
              <input type="password" value={supaKey} onChange={e => setSupaKey(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIs..."
                className="w-full bg-background border border-border/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors rounded-sm font-mono text-xs" />
            </div>
          </div>
          <button onClick={handleSupaSave}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors">
            {supaSaved ? <><Check className="w-4 h-4" /> Guardado</> : <><Database className="w-4 h-4" /> Guardar Conexión</>}
          </button>
        </div>
      )}
    </div>
  )
}
