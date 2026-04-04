import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../../components/dashboard/Sidebar"

const routeTitles = {
  "/dashboard": "Dashboard General",
  "/dashboard/vendedores": "Gestión de Vendedores",
  "/dashboard/metricas-ventas": "Métricas de Ventas",
  "/dashboard/trafico": "Tráfico y Fuentes",
  "/dashboard/leads": "Base de Clientes",
  "/dashboard/config": "Configuración",
  "/dashboard/mi-panel": "Mi Panel",
  "/dashboard/mis-clientes": "Mis Clientes",
  "/dashboard/mi-agenda": "Mi Agenda",
  "/dashboard/mi-rendimiento": "Mi Rendimiento",
}

export default function Layout() {
  const location = useLocation()
  const title = routeTitles[location.pathname] || "Dashboard"

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-semibold text-foreground tracking-tight">{title}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {new Date().toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="text-xs font-mono text-muted-foreground bg-card px-3 py-1.5 rounded-full border border-border/50 hidden sm:block">
            En línea
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
