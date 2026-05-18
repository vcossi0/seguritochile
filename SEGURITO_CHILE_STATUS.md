# Estado del Proyecto: Segurito Chile CRM (VC-OS)
**Fecha de última actualización:** 6 de Abril, 2026

Este documento sirve como punto de partida para retomar el desarrollo de la plataforma, detallando lo construido y los objetivos pendientes.

## 🚀 Funcionalidades Implementadas (Sesión Actual)

### 1. Motor de Scoring Predictivo (InsurTech)
- **Lógica Actuarial:** Implementada en `LeadDetail.jsx`. Evalúa automáticamente a cada lead basándose en:
    - **Ingresos:** Bonificación de score para rentas > 2.5M (Foco APV B).
    - **Edad:** Optimización para rangos de 30-45 años.
    - **Hijos/Comuna:** Perfilamiento de asegurabilidad familiar.
    - **Ocupación de Riesgo:** Penalización de score y alertas para Minería, FFAA y Construcción.
- **Visualización:** Badge de "Score: X/100" con código de colores (Verde/Ámbar/Rojo) en el detalle del lead.

### 2. Copiloto de Ventas Contextual
- **Panel Inteligente:** Bloque en el detalle del lead que entrega un "Pitch" sugerido al vendedor.
- **Reglas de Negocio:**
    - Sugiere argumentos de ahorro tributario para rentas altas en APV.
    - Sugiere argumentos de protección educación para clientes con hijos.
    - **Alertas de Suscripción:** Banderas rojas automáticas si la ocupación es de alto riesgo para evitar sorpresas en el proceso de póliza.

### 3. Perfilamiento Extendido en Landing
- **Formulario Captura:** Actualizado en `LeadCaptureForm.jsx` para incluir:
    - Rango de Edad.
    - Nivel de Ingresos.
    - ¿Tiene Hijos?
    - Comuna.
    - Ocupación / Rubro específico de riesgo.

### 4. Navegación y Legal
- **Footer Funcional:** Enlaces absolutos con anclas (`/#vida`, `/#servicios`) para navegación entre secciones y páginas.
- **Página Legal:** Nueva ruta `/legal` con Políticas de Privacidad y Términos de Servicio ajustados a la normativa chilena (CMF / Ley 19.628).
- **Acceso Trabajadores:** Movido exclusivamente al Footer para mantener la Landing limpia para el cliente final.
- **Puerto de Desarrollo:** Configurado en `vite.config.js` para correr siempre en el **puerto 3000**.

## 🛠️ Arquitectura Técnica Actual
- **Frontend:** React + Vite.
- **Estilos:** Tailwind CSS (Dark/Gold Premium Design).
- **Animaciones:** Framer Motion.
- **Estado:** `localStorage` para Auth y Configuración (Preparado para Supabase).
- **Datos:** `mockData.js` centraliza los leads y métricas de tráfico.

## 🎯 Roadmap de Continuidad (Pendiente)

### Fase A: Herramientas Enterprise (Siguiente paso lógico)
1. **Generador de Cotizaciones PDF:** Crear un motor que genere la propuesta formal de Segurito Chile en un clic desde el panel del vendedor.
2. **Dashboard de Kanban:** Cambiar la lista de clientes por un tablero visual de arrastrar y soltar.
3. **Historial de Interacciones (Timeline):** Registro automático de cuándo se pulsó el botón de WhatsApp o se hizo una llamada.

### Fase B: Backend & Cloud
1. **Migración a Supabase:** Reemplazar los mocks por una base de datos real.
2. **Webhooks de Notificaciones:** Alertas reales al navegador cuando entra un lead nuevo.
3. **PWA:** Hacer la aplicación instalable en móviles.

---
> [!TIP]
> **Para el próximo modelo de IA:** "Lee este archivo y el `implementation_plan.md` en los artefactos. El proyecto es un CRM de seguros para Chile. Actualmente estamos trabajando en la vista de vendedores (`MyClients.jsx` y `LeadDetail.jsx`) para maximizar su productividad mediante IA y lógica prescriptiva."
