import { Shield } from "lucide-react"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-semibold tracking-tight">Agus Star</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#apv" className="hover:text-primary transition-colors">Seguros APV</a>
          <a href="#vida" className="hover:text-primary transition-colors">Seguros de Vida</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium hover:text-primary transition-colors">
            Acceso Trabajadores
          </button>
          <a href="#cotizar" className="bg-primary text-primary-foreground px-5 py-2 rounded-none hover:bg-primary/90 transition-colors text-sm font-semibold">
            Cotizar Ahora
          </a>
        </div>
      </div>
    </header>
  )
}
