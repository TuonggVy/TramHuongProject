import { useState, useEffect } from 'react'

interface Stats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalBlogs: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalBlogs: 0
  })

  useEffect(() => {
    // Simulate loading stats (in real app, fetch from API)
    setStats({
      totalProducts: 9,
      totalOrders: 24,
      totalRevenue: 12500000,
      totalBlogs: 3
    })
  }, [])

  const formatVND = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-black p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm opacity-60">Tổng sản phẩm</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-black text-white rounded flex items-center justify-center">
              📦
            </div>
          </div>
        </div>

        <div className="bg-white border border-black p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm opacity-60">Tổng đơn hàng</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-black text-white rounded flex items-center justify-center">
              📋
            </div>
          </div>
        </div>

        <div className="bg-white border border-black p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm opacity-60">Doanh thu</p>
              <p className="text-2xl font-bold">{formatVND(stats.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-black text-white rounded flex items-center justify-center">
              💰
            </div>
          </div>
        </div>

        <div className="bg-white border border-black p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm opacity-60">Bài viết</p>
              <p className="text-2xl font-bold">{stats.totalBlogs}</p>
            </div>
            <div className="w-12 h-12 bg-black text-white rounded flex items-center justify-center">
              📝
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-black p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <div>
              <p className="font-medium">Đơn hàng #001</p>
              <p className="text-sm opacity-60">Nguyễn Văn A - 2 sản phẩm</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatVND(650000)}</p>
              <p className="text-sm opacity-60">Đang xử lý</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <div>
              <p className="font-medium">Đơn hàng #002</p>
              <p className="text-sm opacity-60">Trần Thị B - 1 sản phẩm</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatVND(320000)}</p>
              <p className="text-sm opacity-60">Đã giao</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Đơn hàng #003</p>
              <p className="text-sm opacity-60">Lê Văn C - 3 sản phẩm</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatVND(1200000)}</p>
              <p className="text-sm opacity-60">Chờ xác nhận</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-black p-6">
          <h3 className="text-lg font-semibold mb-3">Sản phẩm</h3>
          <p className="text-sm opacity-60 mb-4">Quản lý danh sách sản phẩm</p>
          <a href="/admin/products" className="button-primary">Quản lý sản phẩm</a>
        </div>

        <div className="bg-white border border-black p-6">
          <h3 className="text-lg font-semibold mb-3">Đơn hàng</h3>
          <p className="text-sm opacity-60 mb-4">Theo dõi và xử lý đơn hàng</p>
          <a href="/admin/orders" className="button-primary">Quản lý đơn hàng</a>
        </div>

        <div className="bg-white border border-black p-6">
          <h3 className="text-lg font-semibold mb-3">Tin tức</h3>
          <p className="text-sm opacity-60 mb-4">Viết và chỉnh sửa bài viết</p>
          <a href="/admin/blogs" className="button-primary">Quản lý tin tức</a>
        </div>
      </div>
    </div>
  )
}
