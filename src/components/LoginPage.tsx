import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { LoginCredentials, RegisterData } from '../types'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { login, register, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Determine redirect path after login based on user role
  const getRedirectPath = (user: any) => {
    const from = location.state?.from?.pathname
    
    // If user is admin, always go to admin dashboard
    if (user && user.role === 'admin') {
      return '/admin/dashboard'
    }
    
    // If coming from admin route but user is not admin, go to home
    if (from && from.startsWith('/admin')) {
      return '/'
    }
    
    // If login page was accessed directly, go to home
    if (!from) {
      return '/'
    }
    
    return from
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (isLogin) {
      const credentials: LoginCredentials = {
        username: formData.username,
        password: formData.password
      }
      
      const user = await login(credentials)
      if (user) {
        if (user.role === 'admin') {
          setSuccess('Chào mừng Admin! Đang chuyển đến dashboard...')
          setTimeout(() => {
            const redirectPath = getRedirectPath(user)
            navigate(redirectPath, { replace: true })
          }, 1000)
        } else {
          const redirectPath = getRedirectPath(user)
          navigate(redirectPath, { replace: true })
        }
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng')
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu xác nhận không khớp')
        return
      }
      
      const userData: RegisterData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone
      }
      
      const user = await register(userData)
      
      if (user) {
        setSuccess('Đăng ký thành công! Bạn đã được đăng nhập tự động.')
        setTimeout(() => {
          const redirectPath = getRedirectPath(user)
          navigate(redirectPath, { replace: true })
        }, 1500)
      } else {
        setError('Tên đăng nhập hoặc email đã tồn tại')
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setSuccess('')
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: ''
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold">
            {isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
          </h2>
          <p className="mt-2 text-center text-sm opacity-60">
            {isLogin 
              ? 'Đăng nhập vào tài khoản của bạn' 
              : 'Tạo tài khoản mới để mua sắm'
            }
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-3 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-green-600 text-sm text-center bg-green-50 border border-green-200 p-3 rounded">
              {success}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium">
                    Họ và tên
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required={!isLogin}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required={!isLogin}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2"
                    placeholder="Nhập email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required={!isLogin}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2"
                placeholder="Nhập tên đăng nhập"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2"
                placeholder="Nhập mật khẩu"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="mt-1 w-full rounded border border-black bg-transparent px-3 py-2"
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {isLogin 
                ? 'Chưa có tài khoản? Đăng ký ngay' 
                : 'Đã có tài khoản? Đăng nhập'
              }
            </button>
          </div>

          <div className="text-center">
            <Link 
              to="/" 
              className="text-sm opacity-60 hover:opacity-100"
            >
              ← Quay lại trang chủ
            </Link>
          </div>

          {/* Demo credentials */}
          <div className="text-center text-xs opacity-60 border-t border-gray-200 pt-4">
            <p className="font-medium mb-2">Tài khoản demo:</p>
            <p>Admin: admin / admin123</p>
            <p>User: user1 / user123</p>
          </div>
        </form>
      </div>
    </div>
  )
}
