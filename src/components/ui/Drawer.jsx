import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function Drawer({ isOpen, onClose, children, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-xl overflow-y-auto bg-card/95 backdrop-blur-2xl border-l border-border/60 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 bg-card/80 backdrop-blur-xl px-8 py-5">
              <h2 className="text-xl font-serif font-semibold text-foreground tracking-tight">{title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-8">
              {children}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
