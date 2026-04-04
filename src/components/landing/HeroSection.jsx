import { motion } from "framer-motion"
import { ArrowRight, BarChart3, TrendingUp, ShieldCheck, Scale } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative px-4 pt-24 pb-32 overflow-hidden border-b border-border/40">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Typographical Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight"
          >
            Estrategias de <br/><span className="text-primary italic">Protección</span> y <span className="text-primary italic">Crecimiento</span> Patrimonial.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-[600px] leading-relaxed"
          >
            Módulo de validación técnica VC-OS para la asignación estratégica de instrumentos de protección bajo normativa CMF y respaldo de Augustar Seguros.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 pt-4"
          >
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-none font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all">
              Evaluar mi Perfil <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Regulation Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 pt-2"
          >
            <div className="text-xs font-mono text-muted-foreground bg-card px-3 py-1.5 rounded-full border border-border/50 flex items-center gap-1.5">
              <Scale className="w-3 h-3" /> CMF · Art. 42 bis LIR · DFL 251
            </div>
          </motion.div>
        </div>

        {/* Stats Right Column */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <h3 className="font-serif text-lg text-primary">Indicadores de Referencia</h3>
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
            
            <div className="grid grid-cols-1 gap-5">
              <div className="flex items-start justify-between pb-4 border-b border-border/30">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ahorro Tributario APV Régimen B</p>
                  <p className="font-serif text-3xl">600 UF</p>
                </div>
                <p className="text-xs text-primary flex items-center gap-1 mt-1 bg-primary/5 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3" /> Tope Anual
                </p>
              </div>
              <div className="flex items-start justify-between pb-4 border-b border-border/30">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bonificación Estatal APV Régimen A</p>
                  <p className="font-serif text-3xl">15%</p>
                </div>
                <p className="text-xs text-primary flex items-center gap-1 mt-1 bg-primary/5 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3" /> Tope 6 UTM
                </p>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reducción Prima Desgravamen Individual</p>
                  <p className="font-serif text-3xl">30–50%</p>
                </div>
                <p className="text-xs text-primary flex items-center gap-1 mt-1 bg-primary/5 px-2 py-1 rounded">
                   <ShieldCheck className="w-3 h-3"/> vs. Bancario
                </p>
              </div>
            </div>

            <div className="bg-card p-4 border border-border/50 rounded-sm">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground">Marco Regulatorio:</span> Información sujeta a condiciones de póliza. Inscrita en registro CMF. Respaldo de Augustar Compañía de Seguros de Vida S.A.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
