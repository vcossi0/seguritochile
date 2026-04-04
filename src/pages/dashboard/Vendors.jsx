import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus, ToggleLeft, ToggleRight, ChevronRight } from "lucide-react"
import KPICard from "../../components/dashboard/KPICard"
import Drawer from "../../components/ui/Drawer"
import { VENDORS, MOCK_LEADS, getVendorStats } from "../../data/mockData"

export default function Vendors() {
  const [vendors, setVendors] = useState(VENDORS)
  const [selectedVendor, setSelectedVendor] = useState(null)

  const toggleActive = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, active: !v.active } : v))
  }

  const activeCount = vendors.filter(v => v.active).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard icon={<UserPlus className="w-5 h-5 text-primary" />} label="Total Vendedores" value={vendors.length} />
        <KPICard icon={<ToggleRight className="w-5 h-5 text-primary" />} label="Activos" value={activeCount} />
        <KPICard icon={<ToggleLeft className="w-5 h-5 text-primary" />} label="Inactivos" value={vendors.length - activeCount} />
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <h3 className="font-serif text-lg text-foreground">Equipo de Ventas</h3>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <UserPlus className="w-4 h-4" /> Invitar Vendedor
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-card/50">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Vendedor</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden md:table-cell">Email</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Estado</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Leads</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium">Cerrados</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden sm:table-cell">Conversión</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-medium hidden lg:table-cell">Último Acceso</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(vendor => {
                const vStats = getVendorStats(vendor.id)
                return (
                  <tr key={vendor.id} className="border-b border-border/20 hover:bg-card/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${vendor.active ? "bg-primary/20 text-primary" : "bg-muted/30 text-muted-foreground"}`}>
                          {vendor.avatar}
                        </div>
                        <span className={`font-medium ${vendor.active ? "text-foreground" : "text-muted-foreground line-through"}`}>{vendor.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{vendor.email}</td>
                    <td className="px-5 py-4 text-center">
                      <button onClick={() => toggleActive(vendor.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-sm border transition-all ${
                          vendor.active ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" : "bg-red-400/10 text-red-400 border-red-400/20 hover:bg-red-400/20"
                        }`}>
                        {vendor.active ? <><ToggleRight className="w-3 h-3" /> Activo</> : <><ToggleLeft className="w-3 h-3" /> Inactivo</>}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-center text-foreground font-medium">{vStats.total}</td>
                    <td className="px-5 py-4 text-center text-primary font-medium">{vStats.cerrados}</td>
                    <td className="px-5 py-4 text-center text-muted-foreground hidden sm:table-cell">{vStats.conversion}%</td>
                    <td className="px-5 py-4 text-center text-muted-foreground text-xs hidden lg:table-cell">{vendor.lastAccess}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => setSelectedVendor(vendor)}
                        className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-card border border-transparent hover:border-border/50 text-muted-foreground hover:text-primary transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Detail Drawer */}
      <Drawer isOpen={!!selectedVendor} onClose={() => setSelectedVendor(null)} title={selectedVendor?.name || ""}>
        {selectedVendor && <VendorDetail vendor={selectedVendor} />}
      </Drawer>
    </div>
  )
}

function VendorDetail({ vendor }) {
  const stats = getVendorStats(vendor.id)
  const leads = MOCK_LEADS.filter(l => l.vendedorId === vendor.id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
          {vendor.avatar}
        </div>
        <div>
          <h3 className="text-xl font-serif font-semibold text-foreground">{vendor.name}</h3>
          <p className="text-sm text-muted-foreground">{vendor.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background border border-border/40 p-4 rounded-sm text-center">
          <p className="text-2xl font-serif text-primary">{stats.total}</p>
          <p className="text-xs text-muted-foreground mt-1">Leads Asignados</p>
        </div>
        <div className="bg-background border border-border/40 p-4 rounded-sm text-center">
          <p className="text-2xl font-serif text-primary">{stats.cerrados}</p>
          <p className="text-xs text-muted-foreground mt-1">Ventas Cerradas</p>
        </div>
        <div className="bg-background border border-border/40 p-4 rounded-sm text-center">
          <p className="text-2xl font-serif text-primary">{stats.conversion}%</p>
          <p className="text-xs text-muted-foreground mt-1">Conversión</p>
        </div>
        <div className="bg-background border border-border/40 p-4 rounded-sm text-center">
          <p className="text-2xl font-serif text-primary">${stats.ingresoEstimado.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Ingreso Generado</p>
        </div>
      </div>

      <div>
        <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">Leads Actuales</h4>
        <div className="space-y-2">
          {leads.map(l => (
            <div key={l.id} className="bg-background border border-border/30 p-3 rounded-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{l.nombre}</p>
                <p className="text-xs text-muted-foreground">{l.producto}</p>
              </div>
              <span className="text-xs text-muted-foreground capitalize">{l.estado.replace("_", " ")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
