import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import LeadCaptureForm from "./LeadCaptureForm"

export default function CTASection() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section id="cotizar" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-panel p-12 border-primary/20 max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-foreground">
            Asegura tu <span className="text-primary italic">Tranquilidad</span> Hoy
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl leading-relaxed">
            Completa nuestro cuestionario de perfilamiento en menos de 2 minutos y obtén una propuesta a medida, diseñada específicamente para maximizar tus ahorros y proteger a quienes más quieres.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button onClick={() => setFormOpen(true)}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-none font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all text-lg tracking-wide">
              Comenzar Evaluación <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent text-foreground border border-border px-8 py-4 rounded-none font-semibold flex items-center justify-center gap-2 hover:bg-card hover:border-primary/50 transition-all text-lg tracking-wide">
              Agendar Asesoría
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-8 uppercase tracking-widest font-medium">Proceso 100% Confidencial y Seguro</p>
        </motion.div>
      </div>

      <LeadCaptureForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
