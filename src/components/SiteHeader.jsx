import { useState } from "react"
import { Shield, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const navLinks = [
  { href: "#servicios", label: "Seguros APV" },
  { href: "#vida", label: "Seguros de Vida" },
]

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">Segurito Chile</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#cotizar" className="bg-primary text-primary-foreground px-5 py-2 rounded-none hover:bg-primary/90 shadow-sm transition-colors text-sm font-semibold">
            Cotizar Ahora
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/20 bg-background/98 backdrop-blur-xl"
          >
            <nav className="flex flex-col p-4 space-y-1">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-sm transition-colors">
                  {l.label}
                </a>
              ))}
              <div className="border-t border-border/30 my-2" />
              <a href="#cotizar" onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors">
                Cotizar Ahora
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
