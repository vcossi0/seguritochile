import { motion } from "framer-motion"

const stages = [
  { label: "Visitas al Landing", value: 2847, color: "bg-primary/20", barWidth: "100%" },
  { label: "Click en CTA", value: 1203, color: "bg-primary/30", barWidth: "42%" },
  { label: "Formulario Completado", value: 384, color: "bg-primary/50", barWidth: "13.5%" },
  { label: "Lead Calificado", value: 127, color: "bg-primary/70", barWidth: "4.5%" },
  { label: "Venta Cerrada", value: 43, color: "bg-primary", barWidth: "1.5%" },
]

export default function FunnelChart() {
  return (
    <div className="glass-panel p-6">
      <h3 className="font-serif text-lg text-foreground mb-6">Embudo de Conversión</h3>
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-muted-foreground">{stage.label}</span>
              <span className="text-sm font-medium text-foreground font-mono">{stage.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-background rounded-sm h-8 overflow-hidden border border-border/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: stage.barWidth }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className={`h-full ${stage.color} flex items-center justify-end pr-2`}
              >
                {parseFloat(stage.barWidth) > 10 && (
                  <span className="text-xs text-foreground font-medium">
                    {index > 0 ? `${((stage.value / stages[0].value) * 100).toFixed(1)}%` : ""}
                  </span>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conversion rates */}
      <div className="mt-6 pt-5 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "CTA → Form", value: "31.9%" },
          { label: "Form → Lead", value: "33.1%" },
          { label: "Lead → Venta", value: "33.9%" },
          { label: "Total Funnel", value: "1.51%" },
        ].map((rate, i) => (
          <div key={i} className="text-center">
            <p className="text-lg font-serif text-primary">{rate.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{rate.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
