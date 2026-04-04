import { motion } from "framer-motion"

const stats = [
  { value: "600 UF", label: "Tope Anual Rebaja Régimen B" },
  { value: "15%", label: "Bonificación Estatal Régimen A" },
  { value: "30–50%", label: "Ahorro vs. Seguro Bancario" },
  { value: "15 días", label: "Liberación Capital Hereditario" }
]

export default function StatsSection() {
  return (
    <section className="py-20 border-y border-border/40 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-serif text-primary mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
