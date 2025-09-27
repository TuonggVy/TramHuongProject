import { api } from './api'
import { API_ENDPOINTS } from '../constants'
import type { BlogPost, CreateBlogData, ApiResponse, PaginatedResponse } from '../types'

export const blogService = {
  // Get all blog posts with pagination
  async getBlogs(
    page = 1, 
    limit = 10, 
    status = '', 
    search = ''
  ): Promise<ApiResponse<PaginatedResponse<BlogPost>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
      ...(search && { search })
    })
    return api.get(`${API_ENDPOINTS.BLOGS}?${params}`)
  },

  // Get published blogs (for public)
  async getPublishedBlogs(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<BlogPost>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      status: 'published'
    })
    return api.get(`${API_ENDPOINTS.BLOGS}?${params}`)
  },

  // Get blog by ID
  async getBlogById(id: number): Promise<ApiResponse<BlogPost>> {
    return api.get(API_ENDPOINTS.BLOG_BY_ID(id))
  },

  // Create new blog post
  async createBlog(blogData: CreateBlogData): Promise<ApiResponse<BlogPost>> {
    return api.post(API_ENDPOINTS.BLOGS, blogData)
  },

  // Update blog post
  async updateBlog(id: number, blogData: Partial<CreateBlogData>): Promise<ApiResponse<BlogPost>> {
    return api.put(API_ENDPOINTS.BLOG_BY_ID(id), blogData)
  },

  // Delete blog post
  async deleteBlog(id: number): Promise<ApiResponse<void>> {
    return api.delete(API_ENDPOINTS.BLOG_BY_ID(id))
  },

  // Upload blog image
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('image', file)
    
    return api.post('/upload/blog-image', formData)
  }
}
