import { api } from './api'
import { API_ENDPOINTS } from '../constants'
import type { DashboardStats, ApiResponse } from '../types'

export const dashboardService = {
  // Get dashboard statistics
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return api.get(API_ENDPOINTS.DASHBOARD_STATS)
  }
}
