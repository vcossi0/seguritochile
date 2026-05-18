import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Shield, LayoutDashboard, ShoppingCart, BarChart3, Settings, LogOut, Menu, X, ChevronRight, Users, Globe, Bell, Home, ClipboardList, Calendar, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import useAuth from "../../hooks/useAuth"
import { MOCK_LEADS } from "../../data/mockData"

const adminNav = [
  { to: "/dashboard", label: "Dashboard General", icon: LayoutDashboard, end: true },
  { to: "/dashboard/vendedores", label: "Vendedores", icon: Users },
  { to: "/dashboard/metricas-ventas", label: "Métricas de Ventas", icon: ShoppingCart },
  { to: "/dashboard/trafico", label: "Tráfico y Fuentes", icon: Globe },
  { to: "/dashboard/leads", label: "Base de Clientes", icon: ClipboardList },
  { to: "/dashboard/config", label: "Configuración", icon: Settings },
]

const gestorNav = [
  { to: "/dashboard", label: "Dashboard General", icon: LayoutDashboard, end: true },
  { to: "/dashboard/metricas-ventas", label: "Métricas de Ventas", icon: ShoppingCart },
  { to: "/dashboard/trafico", label: "Tráfico y Fuentes", icon: Globe },
  { to: "/dashboard/leads", label: "Base de Clientes", icon: ClipboardList },
]

const vendedorNav = [
  { to: "/dashboard/mi-panel", label: "Mi Panel", icon: Home },
  { to: "/dashboard/mis-clientes", label: "Mis Clientes", icon: ClipboardList },
  { to: "/dashboard/mi-agenda", label: "Mi Agenda", icon: Calendar },
  { to: "/dashboard/mi-rendimiento", label: "Mi Rendimiento", icon: TrendingUp },
]

export default function Sidebar() {
  const { user, role, isAdmin, isVendedor, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [notifications, setNotifications] = useState([])

  // Build notifications from mock data
  useEffect(() => {
    const sinContactar = MOCK_LEADS.filter(l => l.estado === "sin_contactar")
    const seguimientos = MOCK_LEADS.filter(l => l.seguimiento)
    const notifs = []

    sinContactar.forEach(l => {
      const hours = Math.floor((Date.now() - new Date(l.fecha).getTime()) / (1000 * 60 * 60))
      notifs.push({
        id: `new-${l.id}`,
        type: "lead",
        title: `Nuevo lead: ${l.nombre}`,
        desc: `${l.producto} · ${hours}h sin atender`,
        time: new Date(l.fecha).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }),
        urgent: hours > 48,
      })
    })

    seguimientos.forEach(l => {
      notifs.push({
        id: `fu-${l.id}`,
        type: "followup",
        title: `Seguimiento: ${l.nombre}`,
        desc: l.producto,
        time: new Date(l.seguimiento).toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "short" }),
        urgent: false,
      })
    })

    setNotifications(notifs)
  }, [])

  const navItems = isVendedor ? vendedorNav : isAdmin ? adminNav : gestorNav
  const unreadCount = notifications.filter(n => n.type === "lead").length

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border/40">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-serif text-lg font-semibold tracking-tight">Segurito Chile</span>
      </div>

      <div className="px-4 py-3 border-b border-border/30 flex items-center justify-between">
        <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm ${
          role === "admin" ? "bg-primary/10 text-primary" : role === "gestor" ? "bg-blue-400/10 text-blue-400" : "bg-amber-400/10 text-amber-400"
        }`}>
          {role === "admin" ? "Administrador" : role === "gestor" ? "Gestor Comercial" : "Vendedor"}
        </span>

        {/* Notification bell */}
        <button onClick={() => setShowNotif(!showNotif)} className="relative w-7 h-7 flex items-center justify-center rounded-sm hover:bg-card/80 text-muted-foreground hover:text-primary transition-colors">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border/30 overflow-hidden"
          >
            <div className="max-h-[250px] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-xs text-muted-foreground text-center">Sin notificaciones</p>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 border-b border-border/20 last:border-0 hover:bg-card/50 transition-colors ${n.urgent ? "bg-red-400/5" : ""}`}>
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        n.type === "lead" ? (n.urgent ? "bg-red-400 animate-pulse" : "bg-primary") : "bg-blue-400"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{n.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.desc}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all group ${
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/80"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
            {/* Badge for vendor's Mi Panel */}
            {label === "Mi Panel" && unreadCount > 0 && (
              <span className="ml-auto w-5 h-5 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
            {/* Badge for admin's Base de Clientes */}
            {label === "Base de Clientes" && unreadCount > 0 && (
              <span className="ml-auto w-5 h-5 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
            <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold uppercase">
            {user?.email?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground font-medium truncate">{user?.name || user?.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
        <button onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-background border border-border/50 rounded-sm text-sm text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-colors">
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden lg:flex w-[260px] shrink-0 bg-card/60 backdrop-blur-xl border-r border-border/40 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      <button onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-card border border-border/50 rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} className="lg:hidden fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 z-[90] h-full w-[280px] bg-card/95 backdrop-blur-2xl border-r border-border/60 shadow-2xl">
              <button onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
