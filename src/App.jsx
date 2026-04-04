import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import DashboardLayout from "./pages/dashboard/Layout"

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
  const isAuthenticated = localStorage.getItem("agus_auth")
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Private Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute><DashboardLayout /></PrivateRoute>
        }>
          {/* Admin / Gestor */}
          <Route index element={<Overview />} />
          <Route path="vendedores" element={<Vendors />} />
          <Route path="metricas-ventas" element={<SalesMetrics />} />
          <Route path="trafico" element={<Traffic />} />
          <Route path="leads" element={<AllLeads />} />
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
      </Routes>
    </BrowserRouter>
  )
}
