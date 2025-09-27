import { api } from './api'
import { API_ENDPOINTS } from '../constants'
import type { User, LoginCredentials, RegisterData, ApiResponse } from '../types'

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    return api.post(API_ENDPOINTS.LOGIN, credentials)
  },

  // Register new user
  async register(userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    return api.post(API_ENDPOINTS.REGISTER, userData)
  },

  // Logout user
  async logout(): Promise<ApiResponse<void>> {
    return api.post(API_ENDPOINTS.LOGOUT)
  },

  // Get current user profile
  async getProfile(): Promise<ApiResponse<User>> {
    return api.get(API_ENDPOINTS.PROFILE)
  },

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return api.put(API_ENDPOINTS.PROFILE, userData)
  }
}
