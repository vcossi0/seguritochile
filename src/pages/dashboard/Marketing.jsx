import { Eye, MousePointerClick, FileText, UserCheck } from "lucide-react"
import KPICard from "../../components/dashboard/KPICard"
import FunnelChart from "../../components/dashboard/FunnelChart"

const recentLeads = [
  { nombre: "María González", producto: "APV Régimen B", fecha: "Hace 2 horas", fuente: "Landing CTA" },
  { nombre: "Ana Rodríguez", producto: "Desgravamen", fecha: "Hace 3 horas", fuente: "Landing CTA" },
  { nombre: "Valentina Herrera", producto: "APV Régimen B", fecha: "Hace 5 horas", fuente: "Landing CTA" },
  { nombre: "Ignacio Fuentes", producto: "Desgravamen", fecha: "Hace 1 día", fuente: "Referido Directo" },
  { nombre: "Pedro Soto", producto: "APV Régimen A", fecha: "Hace 2 días", fuente: "Landing CTA" },
]

export default function MarketingDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={<Eye className="w-5 h-5 text-primary" />}
          label="Visitas (Mes)"
          value="2,847"
          trend={18}
          trendLabel="vs. mes anterior"
        />
        <KPICard
          icon={<MousePointerClick className="w-5 h-5 text-primary" />}
          label="Clicks en CTA"
          value="1,203"
          trend={22}
          trendLabel="vs. mes anterior"
        />
        <KPICard
          icon={<FileText className="w-5 h-5 text-primary" />}
          label="Formularios"
          value="384"
          trend={15}
          trendLabel="vs. mes anterior"
        />
        <KPICard
          icon={<UserCheck className="w-5 h-5 text-primary" />}
          label="Leads Calificados"
          value="127"
          trend={-3}
          trendLabel="vs. mes anterior"
        />
      </div>

      {/* Funnel + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FunnelChart />
        </div>

        {/* Recent leads sidebar */}
        <div className="glass-panel p-6">
          <h3 className="font-serif text-lg text-foreground mb-5">Leads Recientes</h3>
          <div className="space-y-4">
            {recentLeads.map((lead, i) => (
              <div key={i} className="flex items-start justify-between pb-4 border-b border-border/30 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{lead.nombre}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{lead.producto}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-xs text-muted-foreground">{lead.fecha}</p>
                  <p className="text-xs text-primary mt-0.5">{lead.fuente}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
