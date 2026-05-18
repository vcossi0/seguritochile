import { motion } from "framer-motion"
import { ArrowRight, BarChart3, ShieldCheck, Scale } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden border-b border-border/20 bg-background">
      <div className="container relative mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Image Column — Appears FIRST on mobile for emotional hook */}
        <div className="lg:col-span-6 lg:order-2 relative flex flex-col gap-5 sm:gap-6">
          {/* Family Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/family-hero.png" 
                alt="Familia protegida por Segurito Chile" 
                className="w-full h-[220px] sm:h-[280px] lg:h-[320px] object-cover object-center"
              />
            </div>
            {/* Floating trust badge */}
            <div className="absolute -bottom-3 sm:-bottom-4 left-4 sm:left-6 bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl shadow-lg border border-border flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-foreground">+2,400 familias</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">protegidas en Chile</p>
              </div>
            </div>
          </motion.div>

          {/* Compact Stats Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 sm:p-5 shadow-lg border border-border rounded-xl"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-2 sm:pb-3 mb-3 sm:mb-4">
              <h3 className="font-serif text-sm sm:text-base text-primary">Indicadores de Referencia</h3>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl text-foreground">600 UF</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Tope APV Rég. B</p>
              </div>
              <div className="text-center border-x border-border/30">
                <p className="font-serif text-xl sm:text-2xl text-foreground">15%</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Bonificación Rég. A</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl text-foreground">30–50%</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Ahorro vs. Banco</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text Column — Appears SECOND on mobile (after the image grabs attention) */}
        <div className="lg:col-span-6 lg:order-1 flex flex-col gap-4 sm:gap-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.15] tracking-tight text-foreground"
          >
            Estrategias de <br className="hidden sm:block"/><span className="text-primary">Protección</span> y <span className="text-primary">Crecimiento</span> Patrimonial.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-muted-foreground max-w-[520px] leading-relaxed"
          >
            Módulo de validación técnica VC-OS para la asignación estratégica de instrumentos de protección bajo normativa CMF y respaldo de Segurito Chile.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 pt-2 sm:pt-4"
          >
            <a href="#cotizar" className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 rounded-sm font-semibold flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all text-sm sm:text-base">
              Evaluar mi Perfil <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Regulation Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 pt-1 sm:pt-2"
          >
            <div className="text-[10px] sm:text-xs font-mono text-muted-foreground bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border flex items-center gap-1.5">
              <Scale className="w-3 h-3" /> CMF · Art. 42 bis LIR · DFL 251
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
