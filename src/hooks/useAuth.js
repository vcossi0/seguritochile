import { useMemo } from "react"

export default function useAuth() {
  const data = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("agus_auth") || "null")
    } catch { return null }
  }, [])

  const role = data?.role || "vendedor"

  return {
    user: data,
    role,
    isAdmin: role === "admin",
    isGestor: role === "gestor",
    isVendedor: role === "vendedor",
    isAdminOrGestor: role === "admin" || role === "gestor",
    isAuthenticated: !!data,
    logout: () => {
      localStorage.removeItem("agus_auth")
      window.location.href = "/login"
    }
  }
}
