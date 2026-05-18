import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, HeartPulse, Shield, Home, ChevronRight, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import Drawer from "../ui/Drawer"

const services = [
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "APV (Art. 42 bis LIR)",
    subtitle: "Ahorro Previsional Voluntario",
    shortDescription: "Maximiza tu pensión futura con beneficios tributarios inmediatos. Asesoría experta para elegir el mejor régimen según tu perfil de ingresos.",
    drawerContent: {
      headline: "Instrumento 01: APV — Análisis Técnico",
      intro: "El Ahorro Previsional Voluntario es un mecanismo regulado que permite incrementar los fondos de pensión con ventajas tributarias directas. Es el instrumento más eficiente para optimizar la carga impositiva en rentas medias y altas.",
      regimes: [
        {
          name: "Régimen A — Bonificación Estatal",
          details: [
            "El Estado bonifica el 15% de lo ahorrado anualmente.",
            "Tope de bonificación: 6 UTM (~$420.000 anuales).",
            "El retiro anticipado tributa con un impuesto único.",
            "Ideal para rentas medias buscando beneficio fiscal directo."
          ]
        },
        {
          name: "Régimen B — Rebaja Base Imponible",
          details: [
            "Permite rebajar la base imponible hasta 600 UF anuales (~$22.5M).",
            "Crítico para rentas superiores a $3.6M mensual.",
            "El ahorro tributario marginal supera la bonificación del Régimen A en tramos altos.",
            "Tope anual de rebaja: 600 UF sobre la base imponible."
          ]
        }
      ],
      faq: [
        { q: "¿Los rescates tienen plazo mínimo?", a: "No tienen plazo mínimo, pero el retiro anticipado implica devolución de la bonificación (Régimen A) o reliquidación de impuestos (Régimen B)." },
        { q: "¿El APV es portátil?", a: "Sí, el APV es 100% portátil e independiente del empleador. Puedes mantenerlo al cambiar de trabajo." }
      ],
      regulation: "CMF · Art. 42 bis LIR"
    }
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: "Vida Entera Máxima",
    subtitle: "Planificación Hereditaria",
    shortDescription: "Póliza vitalicia con ahorro a tasa fija garantizada, independiente del mercado. Capital pagado a beneficiarios sin posesión efectiva.",
    drawerContent: {
      headline: "Instrumento 02: Vida Entera Máxima — Análisis Técnico",
      intro: "Es la herramienta de planificación hereditaria más eficiente del mercado. Permite transferir riqueza a la siguiente generación evitando los trámites y tiempos de la posesión efectiva.",
      features: [
        {
          title: "Valores Garantizados",
          description: "Póliza vitalicia con ahorro a tasa fija garantizada, completamente independiente de las fluctuaciones del mercado financiero."
        },
        {
          title: "Uso Hereditario",
          description: "Capital pagado directamente a beneficiarios sin pasar por posesión efectiva. Proceso de liberación en aproximadamente 15 días hábiles."
        },
        {
          title: "Préstamo sobre Póliza",
          description: "Permite solicitar préstamos contra el valor de rescate de la póliza manteniendo la cobertura activa en todo momento."
        }
      ],
      faq: [
        { q: "¿Cómo se determinan las primas?", a: "Las primas se basan en tablas actuariales (edad, sexo, condición de fumador) y quedan niveladas por contrato una vez emitida la póliza." }
      ],
      regulation: "DFL 251 · Normativa CMF"
    }
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Seguro Temporal",
    subtitle: "Protección de Capital",
    shortDescription: "Cobertura del 100% del capital libre de impuestos en plazos de 10, 20 o 30 años. Incluye cláusula ITP 2/3 ante invalidez.",
    drawerContent: {
      headline: "Instrumento 03: Seguro Temporal — Análisis Técnico",
      intro: "El Seguro Temporal es la opción de protección más costo-eficiente para cubrir períodos críticos de responsabilidad financiera (hipotecas, educación de hijos, deuda empresarial).",
      features: [
        {
          title: "Cobertura Pura",
          description: "100% del capital asegurado libre de impuestos, disponible en plazos de 10, 20 o 30 años según la necesidad del asegurado."
        },
        {
          title: "Cláusula ITP 2/3",
          description: "Recibe la totalidad del capital en vida ante una invalidez certificada superior al 66.6%, con exención total del pago de primas futuras."
        },
        {
          title: "Flexibilidad de Plazos",
          description: "Selecciona la duración que calce exactamente con tus compromisos financieros: créditos, educación, o cobertura hasta la jubilación."
        }
      ],
      faq: [],
      regulation: "DFL 251 · SVS / CMF"
    }
  },
  {
    icon: <Home className="w-8 h-8 text-primary" />,
    title: "Desgravamen Individual",
    subtitle: "Alternativa Hipotecaria",
    shortDescription: "Ley 20.552 garantiza tu derecho a contratar externamente el seguro hipotecario. Ahorro del 30-50% vs. seguro bancario colectivo.",
    drawerContent: {
      headline: "Instrumento 04: Desgravamen Individual — Análisis Técnico",
      intro: "La Ley 20.552 consagra el derecho del deudor hipotecario a contratar su propio seguro de desgravamen fuera del banco. Esto genera ahorros significativos y mejores coberturas.",
      features: [
        {
          title: "Ley 20.552",
          description: "Garantiza legalmente el derecho a contratar externamente el seguro hipotecario. El banco debe aceptar la póliza individual si cumple las coberturas mínimas."
        },
        {
          title: "Ahorro Real",
          description: "Reducción del 30% al 50% en la prima respecto al seguro bancario colectivo, con prima nivelada que no aumenta con la edad."
        },
        {
          title: "Cobertura Portátil",
          description: "La póliza se mantiene contigo independientemente de refinanciamientos o cambios de banco. No se pierde al repactar."
        }
      ],
      faq: [
        { q: "¿El banco puede rechazar mi póliza externa?", a: "No. El banco debe aceptar la póliza individual por ley si cumple las coberturas mínimas exigidas. Este es un derecho consagrado en la Ley 20.552." }
      ],
      regulation: "Ley 20.552 · CMF"
    }
  }
]

function DrawerBody({ data }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Intro */}
      <p className="text-muted-foreground leading-relaxed text-[15px]">{data.intro}</p>

      {/* Regimes (APV specific) */}
      {data.regimes && data.regimes.map((regime, i) => (
        <div key={i} className="bg-background border border-border/50 p-6 rounded-sm">
          <h4 className="font-serif text-primary text-lg mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> {regime.name}
          </h4>
          <ul className="space-y-3">
            {regime.details.map((detail, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Features (Vida, Temporal, Desgravamen) */}
      {data.features && data.features.map((feature, i) => (
        <div key={i} className="bg-background border border-border/50 p-6 rounded-sm">
          <h4 className="font-serif text-primary text-lg mb-3">{feature.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        </div>
      ))}

      {/* FAQ */}
      {data.faq && data.faq.length > 0 && (
        <div>
          <h4 className="font-serif text-foreground text-lg mb-4 flex items-center gap-2 border-b border-border/40 pb-3">
            <AlertCircle className="w-4 h-4 text-primary" /> Preguntas Frecuentes
          </h4>
          <div className="space-y-4">
            {data.faq.map((item, i) => (
              <div key={i} className="bg-background/50 p-5 border border-border/30 rounded-sm">
                <p className="font-medium text-foreground text-sm mb-2">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regulation Badge */}
      <div className="pt-4 border-t border-border/40 flex items-center gap-3">
        <div className="text-xs font-mono text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border/50">
          {data.regulation}
        </div>
        <span className="text-xs text-muted-foreground">Marco regulatorio aplicable</span>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const [activeDrawer, setActiveDrawer] = useState(null)

  return (
    <>
      <section id="servicios" className="py-16 sm:py-24 px-4 sm:px-6 bg-background">
        <div className="container mx-auto">
          <div className="mb-10 sm:mb-16 md:w-2/3">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-4 sm:mb-6 text-foreground">
              Ecosistema de <span className="text-primary italic">Protección</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed">
              Módulo de validación técnica para la asignación estratégica de instrumentos de protección bajo normativa CMF y respaldo de Augustar Seguros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-5 sm:p-8 group hover:border-primary/50 border border-border/50 shadow-sm transition-all cursor-pointer rounded-sm"
                onClick={() => setActiveDrawer(index)}
              >
                <div className="mb-4 sm:mb-6 bg-background w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border border-primary/20 group-hover:bg-primary/5 group-hover:scale-105 transition-all duration-300">
                  {service.icon}
                </div>
                <p className="text-[10px] sm:text-xs text-primary font-semibold uppercase tracking-widest mb-1 sm:mb-2">{service.subtitle}</p>
                <h3 className="text-lg sm:text-xl font-serif font-medium mb-2 sm:mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm mb-4 sm:mb-5">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary font-semibold group-hover:gap-3 transition-all">
                  Análisis Técnico <ChevronRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Drawers */}
      {services.map((service, index) => (
        <Drawer
          key={index}
          isOpen={activeDrawer === index}
          onClose={() => setActiveDrawer(null)}
          title={service.title}
        >
          <DrawerBody data={service.drawerContent} />
        </Drawer>
      ))}
    </>
  )
}
