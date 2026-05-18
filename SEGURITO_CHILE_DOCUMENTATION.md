# Documentación y Estado del Proyecto: Segurito Chile CRM

Esta documentación fue generada automáticamente para preservar todo el conocimiento acumulado durante la fase de desarrollo frontend del proyecto "Segurito Chile CRM".

## 1. Arquitectura General y Stack Tecnológico
- **Core Framework**: React (Vite)
- **Routing**: React Router DOM (v6+)
- **Estilos**: TailwindCSS y CSS Vanilla (`index.css`)
- **Gestión de Estado Actual**: Local (Props y Context implícito / `localStorage` simulado)
- **Estructura Modular**: Separación estricta entre `/landing` (página pública orientada a conversión) y `/dashboard` (aplicación privada).

## 2. Descripción de Fases y Componentes Desarrollados

### 🟢 Landing Page (Orientada a Venta y Captación)
La Landing Page sirve como el embudo de conversión principal, diseñada de manera premium.
- **`HeroSection.jsx`**: Propuesta de valor y CTA principal.
- **`StatsSection.jsx` & `GovernanceSection.jsx`**: Validadores de confianza y normativa (CMF, Ley de protección de datos).
- **`ServicesSection.jsx` & `FAQSection.jsx`**: Desglose de servicios principales (APV, Vida, Desgravamen).
- **`LeadCaptureForm.jsx`**: Formulario dinámico avanzado para captura de datos, con campos ocultos para eventual trackeo de UTM/fuentes.

### 🟢 Sistema de Autenticación y Routing
- Regulado en `App.jsx` mediante un `PrivateRoute`.
- Utiliza la variable `segurito_auth` en `localStorage` para simular la sesión.
- Incluye un sistema de redirecciones (Legacy redirects) para asegurar retrocompatibilidad con las rutas.

### 🟢 Dashboard Administrativo (Rol: Admin / Gestor)
- **`Overview.jsx`**: Panel principal con métricas globales (Pipeline, Tasa de Cierre).
- **`SalesMetrics.jsx`** & **`FunnelChart.jsx`**: Gráficos enfocados en métricas de oportunidad y progreso del funnel.
- **`Traffic.jsx`**: Origen de los leads captados por la landing page (Google Ads, Facebook, SEO).
- **`Vendors.jsx`**: Gestión de la fuerza y equipo de ventas.
- **`AllLeads.jsx`** & **`LeadsTable.jsx`**: Listado crudo y administrable de todos los contactos captados.

### 🟢 Panel del Vendedor (Rol: Vendor)
Interfaz dedicada exclusivamente para el trabajador en calle o call-center, evitando que vean métricas globales para las que no tienen permisos.
- **`MyPanel.jsx`**: Resumen personal de leads asignados y sus conversiones.
- **`MyClients.jsx`**: Pipeline y gestión de la cartera activa.
- **`MyAgenda.jsx`**: Gestión de reuniones y seguimientos agendados.
- **`MyPerformance.jsx`**: KPIs individuales comparados con metas de la empresa.

## 3. Próximos Pasos Recomendados (Backlog Futuro)
Este es el punto de partida al retomar el proyecto:

1. **Integración Backend (Auth Real)**: 
   - Reemplazar `localStorage.getItem("segurito_auth")` por un sistema real basado en tokens (ej. JWT o sesión Supabase/Firebase) o conexión con el motor en C++ de **V Agentic OS**.
2. **Contexto de Usuario (Rol)**:
   - Crear un `AuthContext` en React para propagar el Rol del empleado (admin vs vendor) y sus datos perfil (foto, email) sin hacer prop-drilling en `Sidebar.jsx`.
3. **Punto final del Formulario de Leads**:
   - Conectar el `LeadCaptureForm.jsx` a una API REST para procesar las cotizaciones en una base de datos real y mapearlos hacia el `AllLeads.jsx`.
4. **Base de Datos**: 
   - Estructuración del esquema SQL o NoSQL (Entidades: Users, Leads, Deals, Tasks/Agenda).

---
*Guardado por Antigravity AI - Geminí Deepmind. Todos los módulos, rutas y gráficas fueron confirmadas como funcionales (Exit code 0).*
