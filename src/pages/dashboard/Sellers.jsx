import { Users, UserCheck, ShoppingCart, TrendingUp } from "lucide-react"
import KPICard from "../../components/dashboard/KPICard"
import LeadsTable from "../../components/dashboard/LeadsTable"

export default function SellersDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={<Users className="w-5 h-5 text-primary" />}
          label="Sin Contactar"
          value="3"
          trend={12}
          trendLabel="vs. semana pasada"
        />
        <KPICard
          icon={<UserCheck className="w-5 h-5 text-primary" />}
          label="Contactados Hoy"
          value="5"
          trend={25}
          trendLabel="vs. ayer"
        />
        <KPICard
          icon={<ShoppingCart className="w-5 h-5 text-primary" />}
          label="Ventas Cerradas (Mes)"
          value="12"
          trend={8}
          trendLabel="vs. mes anterior"
        />
        <KPICard
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          label="Tasa de Conversión"
          value="33.9%"
          trend={-2}
          trendLabel="vs. mes anterior"
        />
      </div>

      {/* Leads Table */}
      <div>
        <h2 className="text-lg font-serif text-foreground mb-4">Leads y Prospectos</h2>
        <LeadsTable />
      </div>
    </div>
  )
}
