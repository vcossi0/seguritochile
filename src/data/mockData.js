// Centralized mock data for the entire CRM

export const VENDORS = [
  { id: "v1", name: "María Fernández", email: "maria@seguritochile.cl", active: true, joinDate: "2025-11-15", lastAccess: "2026-04-03 14:30", avatar: "M" },
  { id: "v2", name: "Juan Pérez", email: "juan@seguritochile.cl", active: true, joinDate: "2026-01-08", lastAccess: "2026-04-03 10:15", avatar: "J" },
  { id: "v3", name: "Camila Soto", email: "camila@seguritochile.cl", active: true, joinDate: "2026-02-20", lastAccess: "2026-04-02 18:45", avatar: "C" },
  { id: "v4", name: "Diego Muñoz", email: "diego@seguritochile.cl", active: false, joinDate: "2025-09-01", lastAccess: "2026-03-15 09:00", avatar: "D" },
]

export const LEAD_STATES = [
  { key: "sin_contactar", label: "Sin contactar", color: "bg-amber-400/10 text-amber-400 border-amber-400/20" },
  { key: "contactado", label: "Contactado", color: "bg-sky-400/10 text-sky-400 border-sky-400/20" },
  { key: "interesado", label: "Interesado", color: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
  { key: "cotizacion", label: "Cotización Enviada", color: "bg-violet-400/10 text-violet-400 border-violet-400/20" },
  { key: "negociacion", label: "En negociación", color: "bg-orange-400/10 text-orange-400 border-orange-400/20" },
  { key: "cerrado", label: "Cerrado", color: "bg-primary/10 text-primary border-primary/20" },
  { key: "perdido", label: "Perdido", color: "bg-red-400/10 text-red-400 border-red-400/20" },
]

export const PRODUCTS = [
  "APV Régimen A",
  "APV Régimen B",
  "Vida Entera Máxima",
  "Seguro Temporal",
  "Desgravamen Individual",
]

export const TRAFFIC_SOURCES = [
  { key: "facebook", label: "Facebook", color: "#1877F2", icon: "📘" },
  { key: "instagram", label: "Instagram", color: "#E4405F", icon: "📸" },
  { key: "tiktok", label: "TikTok", color: "#000000", icon: "🎵" },
  { key: "google", label: "Google Ads", color: "#4285F4", icon: "🔍" },
  { key: "organico", label: "Orgánico", color: "#22c55e", icon: "🌿" },
  { key: "referido", label: "Referido Directo", color: "#f59e0b", icon: "🤝" },
]

export const MOCK_LEADS = [
  { id: 1, nombre: "María González", telefono: "+56987654321", email: "maria.g@gmail.com", producto: "APV Régimen B", estado: "sin_contactar", fecha: "2026-04-03T10:30:00", vendedorId: "v1", fuente: "facebook", utm_campaign: "apv_abril", monto: null, 
    edad: "30 a 45 años", ingresos: "Más de $2.500.000", ocupacion: "Independiente/Empresario", hijos: "Sí", comuna: "Vitacura",
    notas: [ { fecha: "2026-04-03T10:30:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde Facebook (campaña: apv_abril)" } ]
  },
  { id: 2, nombre: "Carlos Muñoz", telefono: "+56912345678", email: "carlos.m@outlook.com", producto: "Seguro Temporal", estado: "interesado", fecha: "2026-04-01T14:00:00", vendedorId: "v1", fuente: "instagram", utm_campaign: "seguros_marzo", monto: null,
    edad: "30 a 45 años", ingresos: "$1.000.000 - $2.500.000", ocupacion: "Oficina/Administrativo", hijos: "Sí", comuna: "Providencia",
    notas: [
      { fecha: "2026-04-01T14:00:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde Instagram (campaña: seguros_marzo)" },
      { fecha: "2026-04-01T16:30:00", autor: "María Fernández", tipo: "llamada", texto: "Llamé, interesado en Seguro Temporal 20 años. Pide cotización." },
      { fecha: "2026-04-02T09:00:00", autor: "María Fernández", tipo: "nota", texto: "Cotización preparada. Enviando por email." }
    ]
  },
  { id: 3, nombre: "Ana Rodríguez", telefono: "+56955551234", email: "ana.r@gmail.com", producto: "Desgravamen Individual", estado: "sin_contactar", fecha: "2026-04-03T08:15:00", vendedorId: "v1", fuente: "facebook", utm_campaign: "desgravamen_q2", monto: null,
    edad: "30 a 45 años", ingresos: "Menos de $1.000.000", ocupacion: "Oficina/Administrativo", hijos: "No", comuna: "Ñuñoa",
    notas: [ { fecha: "2026-04-03T08:15:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde Facebook (campaña: desgravamen_q2)" } ]
  },
  { id: 4, nombre: "Pedro Soto", telefono: "+56967890123", email: "pedro.s@gmail.com", producto: "APV Régimen A", estado: "cerrado", fecha: "2026-03-25T11:00:00", vendedorId: "v2", fuente: "google", utm_campaign: "apv_search", monto: 85000,
    edad: "Menor a 30 años", ingresos: "Menos de $1.000.000", ocupacion: "Oficina/Administrativo", hijos: "No", comuna: "Santiago",
    notas: [
      { fecha: "2026-03-25T11:00:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde Google Ads (campaña: apv_search)" },
      { fecha: "2026-03-25T15:00:00", autor: "Juan Pérez", tipo: "llamada", texto: "Contactado. Muy interesado, ya conoce APV." },
      { fecha: "2026-03-26T10:00:00", autor: "Juan Pérez", tipo: "nota", texto: "Cotización enviada. APV Régimen A, $85.000/mes." },
      { fecha: "2026-03-28T14:00:00", autor: "Juan Pérez", tipo: "venta", texto: "¡VENTA CERRADA! APV Régimen A, $85.000/mes. Póliza emitida." }
    ]
  },
  { id: 5, nombre: "Francisca López", telefono: "+56934567890", email: "fran.l@gmail.com", producto: "Vida Entera Máxima", estado: "cotizacion", fecha: "2026-03-30T09:00:00", vendedorId: "v2", fuente: "instagram", utm_campaign: "vida_entera", monto: null,
    edad: "46 a 55 años", ingresos: "Más de $2.500.000", ocupacion: "Independiente/Empresario", hijos: "Sí", comuna: "Las Condes",
    notas: [
      { fecha: "2026-03-30T09:00:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde Instagram (campaña: vida_entera)" },
      { fecha: "2026-03-30T14:00:00", autor: "Juan Pérez", tipo: "llamada", texto: "Contactada. Quiere protección hereditaria para sus hijos." },
      { fecha: "2026-03-31T11:00:00", autor: "Juan Pérez", tipo: "nota", texto: "Cotización preparada y enviada. Seguimiento el viernes." }
    ],
    seguimiento: "2026-04-04T10:00:00"
  },
  { id: 6, nombre: "Roberto Díaz", telefono: "+56923456789", email: "roberto.d@hotmail.com", producto: "Seguro Temporal", estado: "perdido", fecha: "2026-03-20T16:00:00", vendedorId: "v3", fuente: "tiktok", utm_campaign: "tiktok_marzo", monto: null,
    edad: "Menor a 30 años", ingresos: "Menos de $1.000.000", ocupacion: "Transporte/Maquinaria", hijos: "No", comuna: "Maipú",
    notas: [
      { fecha: "2026-03-20T16:00:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde TikTok (campaña: tiktok_marzo)" },
      { fecha: "2026-03-21T10:00:00", autor: "Camila Soto", tipo: "llamada", texto: "Llamé, no contestó." },
      { fecha: "2026-03-22T10:00:00", autor: "Camila Soto", tipo: "llamada", texto: "Segundo intento, no contestó." },
      { fecha: "2026-03-25T10:00:00", autor: "Camila Soto", tipo: "nota", texto: "Tercer intento. Dijo que no le interesa. Lead perdido." }
    ]
  },
  { id: 7, nombre: "Valentina Herrera", telefono: "+56989012345", email: "vale.h@gmail.com", producto: "APV Régimen B", estado: "sin_contactar", fecha: "2026-04-03T14:00:00", vendedorId: "v3", fuente: "facebook", utm_campaign: "apv_abril", monto: null,
    edad: "Menor a 30 años", ingresos: "$1.000.000 - $2.500.000", ocupacion: "Oficina/Administrativo", hijos: "No", comuna: "Ñuñoa",
    notas: [ { fecha: "2026-04-03T14:00:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde Facebook (campaña: apv_abril)" } ]
  },
  { id: 8, nombre: "Ignacio Fuentes", telefono: "+56978901234", email: "nacho.f@gmail.com", producto: "Desgravamen Individual", estado: "negociacion", fecha: "2026-03-28T09:00:00", vendedorId: "v1", fuente: "referido", utm_campaign: null, monto: null,
    edad: "30 a 45 años", ingresos: "$1.000.000 - $2.500.000", ocupacion: "Mineria", hijos: "Sí", comuna: "Antofagasta",
    notas: [
      { fecha: "2026-03-28T09:00:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado por Referido Directo" },
      { fecha: "2026-03-28T15:00:00", autor: "María Fernández", tipo: "llamada", texto: "Contactado. Tiene crédito hipotecario en BCI, paga $45.000/mes de desgravamen." },
      { fecha: "2026-03-29T09:00:00", autor: "María Fernández", tipo: "nota", texto: "Cotización: $22.000/mes, ahorro de 51%. Muy interesado." },
      { fecha: "2026-04-01T14:00:00", autor: "María Fernández", tipo: "nota", texto: "En negociación con el banco para hacer el traspaso. Seguimiento miércoles." }
    ],
    seguimiento: "2026-04-04T14:00:00"
  },
  { id: 9, nombre: "Sofía Araya", telefono: "+56945678901", email: "sofia.a@gmail.com", producto: "APV Régimen B", estado: "cerrado", fecha: "2026-03-18T10:00:00", vendedorId: "v1", fuente: "google", utm_campaign: "apv_search", monto: 150000,
    edad: "30 a 45 años", ingresos: "Más de $2.500.000", ocupacion: "Salud/Educacion", hijos: "No", comuna: "Providencia",
    notas: [
      { fecha: "2026-03-18T10:00:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde Google Ads" },
      { fecha: "2026-03-18T16:00:00", autor: "María Fernández", tipo: "llamada", texto: "Contactada. Renta alta, ideal para Régimen B." },
      { fecha: "2026-03-19T10:00:00", autor: "María Fernández", tipo: "nota", texto: "Cotización APV Régimen B $150.000/mes. Ahorro tributario de $600.000/año." },
      { fecha: "2026-03-22T11:00:00", autor: "María Fernández", tipo: "venta", texto: "¡VENTA CERRADA! APV Régimen B, $150.000/mes." }
    ]
  },
  { id: 10, nombre: "Martín Reyes", telefono: "+56956789012", email: "martin.r@gmail.com", producto: "Vida Entera Máxima", estado: "contactado", fecha: "2026-04-02T11:00:00", vendedorId: "v3", fuente: "instagram", utm_campaign: "vida_entera", monto: null,
    edad: "Mayor a 55 años", ingresos: "$1.000.000 - $2.500.000", ocupacion: "FFAA/Seguridad", hijos: "Sí", comuna: "Valparaíso",
    notas: [
      { fecha: "2026-04-02T11:00:00", autor: "Sistema", tipo: "sistema", texto: "Lead ingresado desde Instagram (campaña: vida_entera)" },
      { fecha: "2026-04-02T16:00:00", autor: "Camila Soto", tipo: "llamada", texto: "Llamé, interesado pero quiere pensarlo. Seguimiento lunes." }
    ],
    seguimiento: "2026-04-07T10:00:00"
  },
]

export const TRAFFIC_DATA = {
  facebook: { visitas: 1200, clicks: 480, formularios: 120, leads: 45, ventas: 12, gasto: 112500 },
  instagram: { visitas: 890, clicks: 356, formularios: 98, leads: 35, ventas: 8, gasto: 108500 },
  tiktok: { visitas: 520, clicks: 156, formularios: 42, leads: 18, ventas: 3, gasto: 75600 },
  google: { visitas: 340, clicks: 238, formularios: 85, leads: 22, ventas: 9, gasto: 198000 },
  organico: { visitas: 280, clicks: 112, formularios: 28, leads: 12, ventas: 4, gasto: 0 },
  referido: { visitas: 95, clicks: 65, formularios: 11, leads: 8, ventas: 3, gasto: 0 },
}

export function getLeadsByVendor(vendorId) {
  return MOCK_LEADS.filter(l => l.vendedorId === vendorId)
}

export function getVendorStats(vendorId) {
  const leads = getLeadsByVendor(vendorId)
  return {
    total: leads.length,
    sinContactar: leads.filter(l => l.estado === "sin_contactar").length,
    enProceso: leads.filter(l => !["sin_contactar", "cerrado", "perdido"].includes(l.estado)).length,
    cerrados: leads.filter(l => l.estado === "cerrado").length,
    perdidos: leads.filter(l => l.estado === "perdido").length,
    conversion: leads.length > 0 ? ((leads.filter(l => l.estado === "cerrado").length / leads.length) * 100).toFixed(1) : "0",
    ingresoEstimado: leads.filter(l => l.estado === "cerrado" && l.monto).reduce((acc, l) => acc + l.monto, 0),
  }
}

export function getGlobalStats() {
  return {
    totalLeads: MOCK_LEADS.length,
    sinContactar: MOCK_LEADS.filter(l => l.estado === "sin_contactar").length,
    cerrados: MOCK_LEADS.filter(l => l.estado === "cerrado").length,
    perdidos: MOCK_LEADS.filter(l => l.estado === "perdido").length,
    pipeline: MOCK_LEADS.filter(l => !["cerrado", "perdido", "sin_contactar"].includes(l.estado)).length,
    conversionGlobal: ((MOCK_LEADS.filter(l => l.estado === "cerrado").length / MOCK_LEADS.length) * 100).toFixed(1),
    ingresoTotal: MOCK_LEADS.filter(l => l.monto).reduce((acc, l) => acc + l.monto, 0),
  }
}
