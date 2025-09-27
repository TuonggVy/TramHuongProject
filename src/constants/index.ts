// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id: string) => `/orders/${id}`,
  
  // Blogs
  BLOGS: '/blogs',
  BLOG_BY_ID: (id: number) => `/blogs/${id}`,
  
  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
  
  // Settings
  SETTINGS: '/settings'
} as const

// Product Categories
export const PRODUCT_CATEGORIES = [
  'Nhang trầm hương',
  'Chuỗi trầm hương', 
  'Phụ kiện phong thuỷ'
] as const

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed', 
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Chờ xác nhận',
  [ORDER_STATUS.CONFIRMED]: 'Đã xác nhận',
  [ORDER_STATUS.PROCESSING]: 'Đang xử lý', 
  [ORDER_STATUS.SHIPPED]: 'Đã giao',
  [ORDER_STATUS.DELIVERED]: 'Hoàn thành',
  [ORDER_STATUS.CANCELLED]: 'Đã hủy'
} as const

// Blog Status
export const BLOG_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published'
} as const

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  CART: 'cart',
  SETTINGS: 'settings'
} as const

// Default Values
export const DEFAULTS = {
  SHIPPING_FEE: 30000,
  CURRENCY: 'VND',
  PAGE_SIZE: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp']
} as const
