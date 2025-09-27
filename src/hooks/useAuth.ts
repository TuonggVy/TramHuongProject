import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { authService } from '../services/authService'
import { storage, handleApiError } from '../utils'
import { STORAGE_KEYS } from '../constants'
import type { User, LoginCredentials, RegisterData } from '../types'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.login(credentials)
      
      if (response.success) {
        const { user, token } = response.data
        
        // Store user and token
        storage.set(STORAGE_KEYS.USER, { ...user, token })
        
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin/dashboard')
        } else {
          navigate('/')
        }
        
        return user
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.register(userData)
      
      if (response.success) {
        const { user, token } = response.data
        
        // Store user and token
        storage.set(STORAGE_KEYS.USER, { ...user, token })
        
        // Auto login after registration
        navigate('/')
        return user
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading, error }
}

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const logout = async () => {
    setIsLoading(true)

    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local storage regardless of API call result
      storage.remove(STORAGE_KEYS.USER)
      setIsLoading(false)
      navigate('/')
    }
  }

  return { logout, isLoading }
}
