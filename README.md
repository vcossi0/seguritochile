# Segurito Chile

Portal de seguros online: **landing de marketing + autenticación + dashboard de cliente**. Un producto
end-to-end pensado para captar leads y darles un espacio privado donde ver su información.

**▶ Demo en vivo: [seguritochile.vercel.app](https://seguritochile.vercel.app)**

<!-- 👉 Alto impacto: agrega una captura o GIF real. Guarda la imagen en docs/preview.png y descomenta la línea:
![Segurito Chile](docs/preview.png)
-->

---

## Qué resuelve

Combina las dos caras de un producto SaaS real: una **cara pública** optimizada para conversión
(landing + tracking) y una **cara privada** con login y dashboard. El mismo proyecto cubre marketing
y aplicación.

## Qué demuestra (skills)

- **Integración de backend-as-a-service** real: autenticación y datos con **Supabase**.
- **Código defensivo**: el cliente de Supabase no rompe la app si falta configuración.
- **Mentalidad de producto/negocio**: integración de **Meta Pixel** para medir conversión, páginas
  legales y manejo de 404.
- Rutas protegidas y flujo de autenticación completo (login → dashboard).

## Stack

| Capa | Tecnologías |
|---|---|
| Framework | **React** + **Vite** |
| Routing | React Router v6 |
| Backend / Auth | **Supabase** (Postgres + Auth) |
| UI | Tailwind CSS · Framer Motion · Lucide |
| Gráficos | Recharts |
| Analítica | Meta Pixel |
| Deploy | Vercel |

## Features clave

- **Landing** de marketing con animaciones y tracking de conversión (Meta Pixel).
- **Login** con Supabase Auth (`useAuth`, `supabaseClient`).
- **Dashboard** de cliente protegido con visualizaciones (Recharts).
- Páginas **legales** y **404** — detalles de un producto terminado.

## Decisiones técnicas

- **Cliente Supabase defensivo:** la inicialización tolera la ausencia de variables de entorno sin
  tirar la app, lo que evita pantallas en blanco en entornos mal configurados.
- **Separación público/privado:** la landing y el dashboard viven en el mismo bundle pero con rutas
  y estado de auth claramente separados.
- **Hooks propios** (`useAuth`, `useMetaPixel`) para encapsular sesión y analítica.

## Correr en local

```bash
npm install
cp .env.example .env.local   # completa las variables de Supabase
npm run dev                  # http://localhost:5173
```

## Estado

Funcional y desplegado en Vercel.

---

Hecho por **Vicente Cossío** · [GitHub](https://github.com/vcossi0) · vichocossio@gmail.com
