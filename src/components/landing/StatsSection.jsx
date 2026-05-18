import { motion } from "framer-motion"

const stats = [
  { value: "600 UF", label: "Tope Anual Rebaja Régimen B" },
  { value: "15%", label: "Bonificación Estatal Régimen A" },
  { value: "30–50%", label: "Ahorro vs. Seguro Bancario" },
  { value: "15 días", label: "Liberación Capital Hereditario" }
]

export default function StatsSection() {
  return (
    <section className="py-20 border-y border-border/20 bg-background overflow-hidden relative">
      {/* Abstract Office Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/stats-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-white/40 p-6 rounded-2xl border border-white/50 shadow-sm backdrop-blur-sm"
            >
              <div className="text-3xl md:text-5xl font-serif text-primary mb-3 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-sm text-foreground/80 uppercase tracking-widest font-bold px-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
