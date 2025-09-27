// User & Auth Types
export interface User {
  id: number
  username: string
  email: string
  role: 'user' | 'admin'
  fullName?: string
  phone?: string
  address?: string
  createdAt?: string
  updatedAt?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  fullName: string
  phone: string
}

// Product Types
export interface Product {
  id: number
  name: string
  category: string
  price: number
  salePrice?: number
  image: string
  description?: string
  stock?: number
  status?: 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}

export interface CreateProductData {
  name: string
  category: string
  price: number
  salePrice?: number
  image: string
  description?: string
  stock?: number
}

// Order Types
export interface OrderItem {
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Order {
  id: string
  customerName: string
  phone: string
  address: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt?: string
  notes?: string
}

// Blog Types
export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt?: string
  authorId?: number
}

export interface CreateBlogData {
  title: string
  excerpt: string
  content: string
  image?: string
  status: 'draft' | 'published'
}

// Cart Types
export interface CartItem {
  id: number
  quantity: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Settings Types
export interface AppSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  shippingFee: number
  currency: string
}

// Stats Types
export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalBlogs: number
  recentOrders: Order[]
}
