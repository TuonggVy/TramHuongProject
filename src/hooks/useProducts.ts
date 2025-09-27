import { useState, useEffect } from 'react'
import { productService } from '../services/productService'
import { handleApiError } from '../utils'
import type { Product, CreateProductData, PaginatedResponse } from '../types'

export const useProducts = (page = 1, limit = 10, search = '', category = '') => {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await productService.getProducts(page, limit, search, category)
      
      if (response.success) {
        const { data, pagination: paginationData } = response.data
        setProducts(data)
        setPagination(paginationData)
      } else {
        throw new Error(response.message || 'Failed to fetch products')
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page, limit, search, category])

  const createProduct = async (productData: CreateProductData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await productService.createProduct(productData)
      
      if (response.success) {
        // Refresh products list
        await fetchProducts()
        return response.data
      } else {
        throw new Error(response.message || 'Failed to create product')
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateProduct = async (id: number, productData: Partial<CreateProductData>) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await productService.updateProduct(id, productData)
      
      if (response.success) {
        // Update product in list
        setProducts(prev => 
          prev.map(product => 
            product.id === id ? response.data : product
          )
        )
        return response.data
      } else {
        throw new Error(response.message || 'Failed to update product')
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProduct = async (id: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await productService.deleteProduct(id)
      
      if (response.success) {
        // Remove product from list
        setProducts(prev => prev.filter(product => product.id !== id))
      } else {
        throw new Error(response.message || 'Failed to delete product')
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    products,
    pagination,
    isLoading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = async () => {
    if (!id) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await productService.getProductById(id)
      
      if (response.success) {
        setProduct(response.data)
      } else {
        throw new Error(response.message || 'Failed to fetch product')
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  return {
    product,
    isLoading,
    error,
    fetchProduct
  }
}
