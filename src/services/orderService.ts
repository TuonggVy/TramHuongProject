import { api } from './api'
import { API_ENDPOINTS } from '../constants'
import type { Order, ApiResponse, PaginatedResponse } from '../types'

export const orderService = {
  // Get all orders with pagination and filters
  async getOrders(
    page = 1, 
    limit = 10, 
    status = '', 
    search = ''
  ): Promise<ApiResponse<PaginatedResponse<Order>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
      ...(search && { search })
    })
    return api.get(`${API_ENDPOINTS.ORDERS}?${params}`)
  },

  // Get order by ID
  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return api.get(API_ENDPOINTS.ORDER_BY_ID(id))
  },

  // Update order status
  async updateOrderStatus(id: string, status: string): Promise<ApiResponse<Order>> {
    return api.put(API_ENDPOINTS.ORDER_BY_ID(id), { status })
  },

  // Create new order (for checkout)
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<ApiResponse<Order>> {
    return api.post(API_ENDPOINTS.ORDERS, orderData)
  },

  // Get user orders
  async getUserOrders(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Order>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return api.get(`${API_ENDPOINTS.ORDERS}/my-orders?${params}`)
  }
}
