import useAuth from "../../hooks/useAuth"

export default function RoleGuard({ allow, children, fallback = null }) {
  const { role } = useAuth()
  if (allow.includes(role)) return children
  return fallback
}
