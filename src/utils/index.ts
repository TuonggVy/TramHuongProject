import { DEFAULTS } from '../constants'

// Format currency
export const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount)
}

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

// Format datetime
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('vi-VN')
}

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,11}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Calculate discount percentage
export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  if (salePrice >= originalPrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Local storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },
  
  remove: (key: string): void => {
    localStorage.removeItem(key)
  },
  
  clear: (): void => {
    localStorage.clear()
  }
}

// File validation
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (file.size > DEFAULTS.MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File size must be less than ${DEFAULTS.MAX_FILE_SIZE / 1024 / 1024}MB` 
    }
  }
  
  if (!DEFAULTS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Only JPEG, PNG, and WebP images are allowed' 
    }
  }
  
  return { valid: true }
}

// Error handling
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
