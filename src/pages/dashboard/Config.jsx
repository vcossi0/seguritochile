import { Shield, Bell, Palette, Database, Lock } from "lucide-react"

const settingsSections = [
  { icon: <Shield className="w-5 h-5 text-primary" />, title: "Perfil de Usuario", description: "Actualizar nombre, email y foto de perfil." },
  { icon: <Lock className="w-5 h-5 text-primary" />, title: "Seguridad", description: "Cambiar contraseña y configurar autenticación de dos factores." },
  { icon: <Bell className="w-5 h-5 text-primary" />, title: "Notificaciones", description: "Preferencias de alertas y notificaciones por email." },
  { icon: <Palette className="w-5 h-5 text-primary" />, title: "Apariencia", description: "Tema, tamaño de fuente y preferencias de visualización." },
  { icon: <Database className="w-5 h-5 text-primary" />, title: "Conexión a Base de Datos", description: "Configurar credenciales de Supabase y sincronización." },
]

export default function ConfigDashboard() {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm text-muted-foreground mb-6">Administra las preferencias de tu cuenta y del sistema.</p>
      {settingsSections.map((section, i) => (
        <div key={i} className="glass-panel p-6 flex items-center gap-5 group hover:border-primary/50 transition-colors cursor-pointer">
          <div className="w-11 h-11 rounded-sm bg-card border border-border/50 flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
            {section.icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">{section.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
