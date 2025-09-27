import { api } from './api'
import { API_ENDPOINTS } from '../constants'
import type { Product, CreateProductData, ApiResponse, PaginatedResponse } from '../types'

export const productService = {
  // Get all products with pagination
  async getProducts(page = 1, limit = 10, search = '', category = ''): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(category && { category })
    })
    return api.get(`${API_ENDPOINTS.PRODUCTS}?${params}`)
  },

  // Get product by ID
  async getProductById(id: number): Promise<ApiResponse<Product>> {
    return api.get(API_ENDPOINTS.PRODUCT_BY_ID(id))
  },

  // Create new product
  async createProduct(productData: CreateProductData): Promise<ApiResponse<Product>> {
    return api.post(API_ENDPOINTS.PRODUCTS, productData)
  },

  // Update product
  async updateProduct(id: number, productData: Partial<CreateProductData>): Promise<ApiResponse<Product>> {
    return api.put(API_ENDPOINTS.PRODUCT_BY_ID(id), productData)
  },

  // Delete product
  async deleteProduct(id: number): Promise<ApiResponse<void>> {
    return api.delete(API_ENDPOINTS.PRODUCT_BY_ID(id))
  },

  // Upload product image
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('image', file)
    
    return api.post('/upload/product-image', formData)
  }
}
