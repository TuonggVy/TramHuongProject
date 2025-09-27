import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { storage } from '../utils'
import { STORAGE_KEYS } from '../constants'
import type { User, LoginCredentials, RegisterData } from '../types'
// import { authService } from '../services/authService' // Will use when backend is ready

interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<User | null>
  register: (userData: RegisterData) => Promise<User | null>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
  isUser: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => null,
  register: async () => null,
  logout: () => {},
  isLoading: false,
  isAdmin: false,
  isUser: false
})


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = storage.get<User>(STORAGE_KEYS.USER)
    if (savedUser) {
      setUser(savedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<User | null> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay for demo
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Demo users data
      const DEMO_USERS = [
        {
          id: 1,
          username: 'admin',
          email: 'admin@tramhuong.vn',
          role: 'admin' as const,
          fullName: 'Quản trị viên'
        },
        {
          id: 2,
          username: 'user1',
          email: 'user1@example.com',
          role: 'user' as const,
          fullName: 'Nguyễn Văn A',
          phone: '0901234567',
          address: '123 Đường ABC, Quận 1, TP.HCM'
        }
      ]
      
      const DEMO_PASSWORDS: Record<string, string> = {
        'admin': 'admin123',
        'user1': 'user123'
      }
      
      // Check credentials
      const storedPassword = DEMO_PASSWORDS[credentials.username]
      if (storedPassword && storedPassword === credentials.password) {
        const foundUser = DEMO_USERS.find(u => u.username === credentials.username)
        if (foundUser) {
          setUser(foundUser)
          storage.set(STORAGE_KEYS.USER, foundUser)
          setIsLoading(false)
          return foundUser
        }
      }
      
      setIsLoading(false)
      return null
    } catch (error) {
      setIsLoading(false)
      return null
    }
  }

  const register = async (userData: RegisterData): Promise<User | null> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay for demo
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Demo users data
      const DEMO_USERS = [
        {
          id: 1,
          username: 'admin',
          email: 'admin@tramhuong.vn',
          role: 'admin' as const,
          fullName: 'Quản trị viên'
        },
        {
          id: 2,
          username: 'user1',
          email: 'user1@example.com',
          role: 'user' as const,
          fullName: 'Nguyễn Văn A',
          phone: '0901234567',
          address: '123 Đường ABC, Quận 1, TP.HCM'
        }
      ]
      
      // Check if username or email already exists
      const existingUser = DEMO_USERS.find(u => 
        u.username === userData.username || u.email === userData.email
      )
      
      if (existingUser) {
        setIsLoading(false)
        return null
      }
      
      // Create new user
      const newUser: User = {
        id: Math.max(...DEMO_USERS.map(u => u.id)) + 1,
        username: userData.username,
        email: userData.email,
        role: 'user',
        fullName: userData.fullName,
        phone: userData.phone
      }
      
      // Auto login after registration
      setUser(newUser)
      storage.set(STORAGE_KEYS.USER, newUser)
      
      setIsLoading(false)
      return newUser
    } catch (error) {
      setIsLoading(false)
      return null
    }
  }

  const logout = () => {
    setUser(null)
    storage.remove(STORAGE_KEYS.USER)
  }

  const isAdmin = user?.role === 'admin'
  const isUser = user?.role === 'user'

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      isAdmin,
      isUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
