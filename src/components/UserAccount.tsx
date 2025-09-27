import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function UserAccount() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  const handleSave = () => {
    // In real app, this would update user data via API
    alert('Thông tin đã được cập nhật!')
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    })
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!user) {
    return (
      <div className="container-page py-10">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h1>
          <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem thông tin tài khoản.</p>
          <a href="/dang-nhap" className="button-primary">Đăng nhập ngay</a>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tài khoản của tôi</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="button-primary"
            >
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="button-primary"
              >
                Lưu
              </button>
              <button
                onClick={handleCancel}
                className="border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
              >
                Hủy
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-black p-6 space-y-6">
          {/* Account Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Thông tin tài khoản</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên đăng nhập</label>
                <p className="py-2 font-medium">{user.username}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Họ và tên</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  />
                ) : (
                  <p className="py-2">{user.fullName || 'Chưa cập nhật'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  />
                ) : (
                  <p className="py-2">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  />
                ) : (
                  <p className="py-2">{user.phone || 'Chưa cập nhật'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2 h-20"
                  />
                ) : (
                  <p className="py-2">{user.address || 'Chưa cập nhật'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Order History */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Lịch sử đơn hàng</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium">Đơn hàng #001</p>
                  <p className="text-sm opacity-60">2 sản phẩm - 15/01/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1,090,000 VND</p>
                  <p className="text-sm text-green-600">Đã giao</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium">Đơn hàng #002</p>
                  <p className="text-sm opacity-60">1 sản phẩm - 10/01/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">510,000 VND</p>
                  <p className="text-sm text-blue-600">Đang giao</p>
                </div>
              </div>

              <div className="text-center py-4">
                <a href="/san-pham" className="text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                  Xem tất cả đơn hàng
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Đăng xuất</h3>
                <p className="text-sm opacity-60">Đăng xuất khỏi tài khoản</p>
              </div>
              <button
                onClick={logout}
                className="border border-red-500 text-red-500 px-4 py-2 hover:bg-red-500 hover:text-white transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
