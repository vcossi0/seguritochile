import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "¿Los rescates del APV tienen plazo mínimo?",
    answer: "No tienen plazo mínimo. Sin embargo, el retiro anticipado implica la devolución de la bonificación estatal (Régimen A) o la reliquidación de impuestos (Régimen B). Es importante considerar el horizonte de inversión antes de realizar rescates."
  },
  {
    question: "¿Cómo se determinan las primas de los seguros?",
    answer: "Las primas se calculan en base a tablas actuariales que consideran edad, sexo y condición de fumador del asegurado. Una vez emitida la póliza, las primas quedan niveladas por contrato, lo que significa que no aumentarán con el paso del tiempo."
  },
  {
    question: "¿El banco puede rechazar mi póliza de desgravamen individual?",
    answer: "No. La Ley 20.552 garantiza el derecho del deudor hipotecario a contratar externamente su seguro. El banco debe aceptar la póliza individual si cumple con las coberturas mínimas exigidas por la normativa vigente."
  },
  {
    question: "¿El APV es portátil entre empleadores?",
    answer: "Sí, el APV es 100% portátil e independiente del empleador. Puedes mantener tu plan de ahorro al cambiar de trabajo sin ningún tipo de penalización o trámite adicional."
  },
  {
    question: "¿Qué sucede con el seguro Vida Entera Máxima al fallecer el asegurado?",
    answer: "El capital se paga directamente a los beneficiarios designados sin necesidad de pasar por posesión efectiva. El proceso de liberación de fondos toma aproximadamente 15 días hábiles, brindando liquidez inmediata a la familia."
  },
  {
    question: "¿Qué cubre la cláusula ITP 2/3 del Seguro Temporal?",
    answer: "La cláusula ITP 2/3 permite recibir la totalidad del capital asegurado en vida ante una invalidez certificada superior al 66.6%. Además, otorga la exención total del pago de primas futuras mientras dure la invalidez."
  }
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-border/40">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-foreground font-medium text-[15px] pr-8 group-hover:text-primary transition-colors">
          {item.question}
        </span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-sm text-muted-foreground leading-relaxed pb-6 pl-0 pr-12">
          {item.answer}
        </p>
      </motion.div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 px-4 bg-card">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-foreground">
            FAQ <span className="text-primary italic">Técnica</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Respuestas claras a las consultas más frecuentes sobre nuestros instrumentos de protección y ahorro.
          </p>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
