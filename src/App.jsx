import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Legal from "./pages/Legal"
import NotFound from "./pages/NotFound"
import DashboardLayout from "./pages/dashboard/Layout"
import useMetaPixel from "./hooks/useMetaPixel"

// Admin / Gestor pages
import Overview from "./pages/dashboard/Overview"
import Vendors from "./pages/dashboard/Vendors"
import SalesMetrics from "./pages/dashboard/SalesMetrics"
import Traffic from "./pages/dashboard/Traffic"
import AllLeads from "./pages/dashboard/AllLeads"
import ConfigDashboard from "./pages/dashboard/Config"

// Vendor pages
import MyPanel from "./pages/dashboard/vendor/MyPanel"
import MyClients from "./pages/dashboard/vendor/MyClients"
import MyAgenda from "./pages/dashboard/vendor/MyAgenda"
import MyPerformance from "./pages/dashboard/vendor/MyPerformance"

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("segurito_auth")
  return isAuthenticated ? children : <Navigate to="/login" />
}

// Role guard — redirects if user doesn't have the required role
const RoleRoute = ({ children, allowed }) => {
  try {
    const data = JSON.parse(localStorage.getItem("segurito_auth") || "null")
    if (!data) return <Navigate to="/login" />
    if (!allowed.includes(data.role)) return <Navigate to="/dashboard" />
    return children
  } catch {
    return <Navigate to="/login" />
  }
}

export default function App() {
  // Inicialización de integraciones globales
  useMetaPixel()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/legal" element={<Legal />} />

        {/* Private Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute><DashboardLayout /></PrivateRoute>
        }>
          {/* Admin / Gestor */}
          <Route index element={<Overview />} />
          <Route path="vendedores" element={<RoleRoute allowed={["admin"]}><Vendors /></RoleRoute>} />
          <Route path="metricas-ventas" element={<RoleRoute allowed={["admin", "gestor"]}><SalesMetrics /></RoleRoute>} />
          <Route path="trafico" element={<RoleRoute allowed={["admin", "gestor"]}><Traffic /></RoleRoute>} />
          <Route path="leads" element={<RoleRoute allowed={["admin", "gestor"]}><AllLeads /></RoleRoute>} />
          <Route path="config" element={<ConfigDashboard />} />

          {/* Vendor */}
          <Route path="mi-panel" element={<MyPanel />} />
          <Route path="mis-clientes" element={<MyClients />} />
          <Route path="mi-agenda" element={<MyAgenda />} />
          <Route path="mi-rendimiento" element={<MyPerformance />} />

          {/* Legacy redirects */}
          <Route path="ventas" element={<Navigate to="/dashboard" replace />} />
          <Route path="marketing" element={<Navigate to="/dashboard/trafico" replace />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
