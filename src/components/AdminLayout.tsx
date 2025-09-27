import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Sản phẩm', icon: '📦' },
    { path: '/admin/orders', label: 'Đơn hàng', icon: '📋' },
    { path: '/admin/blogs', label: 'Tin tức', icon: '📝' },
    { path: '/admin/settings', label: 'Cài đặt', icon: '⚙️' }
  ]

  const navLinkClass = (path: string) => {
    const isActive = location.pathname === path
    return `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-black text-white shadow-lg transform scale-[1.02]' 
        : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:shadow-md hover:transform hover:scale-[1.01]'
    }`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Admin Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <span className="text-xl">☰</span>
              </button>
              <Link to="/admin/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  Admin Panel
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <span>👋</span>
                <span>Xin chào, <span className="font-medium">{user?.fullName || user?.username}</span></span>
              </div>
              <Link 
                to="/" 
                className="text-sm px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                🌐 Xem trang chủ
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors"
              >
                🚪 Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <nav className={`${sidebarOpen ? 'w-64' : 'w-0 lg:w-64'} bg-white/95 backdrop-blur-sm border-r border-gray-200 min-h-screen transition-all duration-300 shadow-lg fixed lg:relative z-30 overflow-hidden`}>
          <div className="p-4">
            {/* User Profile Section */}
            <div className="px-4 py-4 border-b border-gray-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.username?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.fullName || user?.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={navLinkClass(item.path)}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Thống kê nhanh
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Sản phẩm:</span>
                  <span className="font-medium">9</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Đơn hàng:</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Bài viết:</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 transition-all duration-300">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 min-h-[calc(100vh-8rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
