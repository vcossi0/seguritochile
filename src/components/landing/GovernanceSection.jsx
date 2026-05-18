import { motion } from "framer-motion"
import { User, Shield } from "lucide-react"

const team = [
  {
    name: "Nando Sanzana",
    role: "Gestión Comercial",
    description: "Especialista en normativa Augustar y estructuración de propuestas comerciales. Responsable de la validación y emisión de pólizas."
  },
  {
    name: "Vicente Cossio",
    role: "Sistemas y Datos",
    description: "Arquitecto de Protocolos VC-OS y gobernanza de datos (Ley 19.628). Encargado de la infraestructura tecnológica y cumplimiento digital."
  }
]

export default function GovernanceSection() {
  return (
    <section id="vida" className="py-16 sm:py-24 px-4 sm:px-6 bg-background border-t border-border/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
          {/* Left: Team / Governance */}
          <div>
            <p className="text-[10px] sm:text-xs text-primary font-semibold uppercase tracking-widest mb-3 sm:mb-4">Directorio</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-foreground text-balance">
              Gobernanza y <span className="text-primary italic">Alianzas</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-10 max-w-lg text-sm sm:text-base">
              Equipo acreditado bajo los estándares de Augustar Compañía de Seguros de Vida S.A., con especialización en normativa financiera chilena.
            </p>

            <div className="space-y-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white p-6 flex items-start gap-5 border border-border/60 shadow-sm rounded-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-background border border-primary/20 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-foreground text-lg font-medium">{member.name}</h4>
                    <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/10 pl-3">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Legal Disclosure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <div className="bg-white p-8 border border-primary/20 shadow-xl rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="font-serif text-xl text-foreground font-medium">Respaldo Institucional</h3>
              </div>
              
              <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-medium underline decoration-primary/30 underline-offset-4">Compañía:</span> Augustar Compañía de Seguros de Vida S.A.
                </p>
                <p>
                  <span className="text-foreground font-medium underline decoration-primary/30 underline-offset-4">Registro:</span> Inscrita en el registro de la Comisión para el Mercado Financiero (CMF).
                </p>
                <p>
                  <span className="text-foreground font-medium underline decoration-primary/30 underline-offset-4">Gobernanza de Datos:</span> Cumplimiento con Ley 19.628 sobre protección de la vida privada y datos personales.
                </p>
                <p className="border-t border-border pt-5 text-xs text-muted-foreground/70 italic bg-background/30 -mx-8 px-8 pb-0">
                  La información presentada en este sitio es exclusivamente informativa y no constituye una oferta ni una asesoría financiera. Todos los productos están sujetos a las condiciones específicas de cada póliza y a la normativa vigente.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["CMF", "DFL 251", "Art. 42 bis LIR", "Ley 20.552", "Ley 19.628"].map(tag => (
                  <span key={tag} className="text-xs font-mono text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
