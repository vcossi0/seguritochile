import { Shield } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">Agus Star</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-6">
              Liderando el mercado con soluciones patrimoniales y de protección diseñadas con arquitectura financiera de primer nivel.
            </p>
            <div className="flex gap-4">
              {/* Dummy social links */}
              <div className="w-10 h-10 rounded bg-background border border-border/50 flex items-center justify-center hover:text-primary hover:border-primary/50 transition-colors cursor-pointer">
                in
              </div>
              <div className="w-10 h-10 rounded bg-background border border-border/50 flex items-center justify-center hover:text-primary hover:border-primary/50 transition-colors cursor-pointer">
                tw
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-medium mb-6 text-foreground text-lg">Servicios</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Seguro de Vida</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ahorro Previsional Voluntario</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Protección de Patrimonio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Seguros Médicos Plus</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-medium mb-6 text-foreground text-lg">Legal</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Políticas de Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Regulación y Cumplimiento</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Portal de Denuncias</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Agus Star Seguros y Vida. Todos los derechos reservados.
          </p>
          <div className="text-xs font-mono text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">
            CMF Registrada
          </div>
        </div>
      </div>
    </footer>
  )
}
