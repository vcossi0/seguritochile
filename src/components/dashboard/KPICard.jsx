import { motion } from "framer-motion"

export default function KPICard({ icon, label, value, trend, trendLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{label}</span>
        <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-serif text-foreground tracking-tight">{value}</div>
      {trend !== undefined && (
        <div className={`text-xs font-medium flex items-center gap-1 ${trend >= 0 ? "text-primary" : "text-red-400"}`}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% {trendLabel}
        </div>
      )}
    </motion.div>
  )
}
