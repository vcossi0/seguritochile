import { Shield } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <Shield className="w-12 h-12 text-primary mx-auto mb-6 opacity-40" />
        <h1 className="text-6xl font-serif text-primary mb-4">404</h1>
        <h2 className="text-xl font-serif text-foreground mb-3">Página no encontrada</h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          La página que buscas no existe o fue movida. Puedes volver al inicio o acceder a tu panel de trabajo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/"
            className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors">
            Volver al Inicio
          </a>
          <a href="/login"
            className="px-6 py-2.5 bg-card border border-border/50 text-sm font-medium text-muted-foreground rounded-sm hover:text-primary hover:border-primary/50 transition-colors">
            Acceso Trabajadores
          </a>
        </div>
      </div>
    </div>
  )
}
