export default function Legal() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-24 px-4">
      <div className="max-w-3xl w-full glass-panel p-12">
        <h1 className="text-4xl font-serif text-foreground mb-8">Información Legal y Cumplimiento</h1>
        
        <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-serif text-primary mb-4">Políticas de Privacidad (Ley 19.628)</h2>
            <p>
              En Segurito Chile Compañía de Seguros, el tratamiento de datos personales se realiza en estricto cumplimiento de la Ley 19.628 sobre Protección de la Vida Privada. Los datos provistos a través de nuestras plataformas de evaluación y cotización son utilizados exclusivamente para el perfilamiento de riesgo y estructuración de propuestas comerciales de seguros y ahorro. Ningún dato es comercializado con terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-primary mb-4">Términos de Servicio y Condiciones Generales</h2>
            <p>
              El uso de la plataforma VC-OS y el portal Segurito Chile constituye la aceptación de estos términos. Las propuestas generadas, incluyendo proyecciones de APV (Régimen A y B) y coberturas de seguros (DFL 251, Ley 20.552 para desgravamen), son de carácter referencial y están sujetas a evaluación de asegurabilidad, cumplimiento de requisitos legales y condiciones contractuales de la póliza definitiva aprobada por la CMF.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-primary mb-4">Regulación y Fiscalización (CMF)</h2>
            <p>
              Segurito Chile Compañía de Seguros opera bajo la supervisión directa de la Comisión para el Mercado Financiero (CMF). Todos los instrumentos de ahorro y protección comercializados (Vida Entera, Temporal, Desgravamen y APV) se rigen por la normativa vigente para el mercado asegurador chileno.
            </p>
          </section>

          <div className="pt-8 border-t border-border/40 mt-12 flex justify-center">
            <a href="/" className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-colors">
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
