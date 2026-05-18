import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import LeadCaptureForm from "./LeadCaptureForm"

export default function CTASection() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section id="cotizar" className="py-16 sm:py-24 px-4 sm:px-6 bg-background relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/30 flex flex-col lg:flex-row"
        >
          {/* Image Side — stretches to match content height */}
          <div className="hidden lg:block lg:w-5/12 relative">
            <img 
              src="/advisor-meeting.png" 
              alt="Asesoría financiera personalizada" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content Side */}
          <div className="lg:w-7/12 bg-white p-8 sm:p-12 flex flex-col items-center text-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-foreground">
              Asegura tu <span className="text-primary italic">Tranquilidad</span> Hoy
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed">
              Completa nuestro cuestionario de perfilamiento en menos de 2 minutos y obtén una propuesta a medida, diseñada específicamente para maximizar tus ahorros y proteger a quienes más quieres.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
              <button onClick={() => setFormOpen(true)}
                className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all text-sm sm:text-lg tracking-wide shadow-lg shadow-primary/20">
                Comenzar Evaluación <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <a href="https://wa.me/56912345678?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa%20comercial%20con%20Segurito%20Chile" target="_blank" rel="noopener noreferrer" className="bg-transparent text-foreground border border-border px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-semibold flex items-center justify-center gap-2 hover:bg-background hover:border-primary/50 transition-all text-sm sm:text-lg tracking-wide">
                Agendar Asesoría
              </a>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-6 sm:mt-8 uppercase tracking-widest font-medium">Proceso 100% Confidencial y Seguro</p>
          </div>
        </motion.div>
      </div>

      <LeadCaptureForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
