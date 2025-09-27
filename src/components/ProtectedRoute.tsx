import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  redirectTo 
}: ProtectedRouteProps) {
  const { user, isAdmin, isLoading } = useAuth()
  const location = useLocation()

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-sm opacity-60">Đang kiểm tra...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if authentication is required but user is not logged in
  if (requireAuth && !user) {
    const redirectPath = redirectTo || '/dang-nhap'
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  // Redirect to home if admin access is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  // Redirect to admin dashboard if admin tries to access user-only pages
  if (user && isAdmin && location.pathname.startsWith('/user')) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <>{children}</>
}
