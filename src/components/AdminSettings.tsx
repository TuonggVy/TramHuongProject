import { useState } from 'react'

interface Settings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  shippingFee: number
  currency: string
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Trầm Hương',
    siteDescription: 'Cửa hàng trầm hương: vòng tay, nhang trầm, tinh dầu, phụ kiện.',
    contactEmail: 'contact@tramhuong.vn',
    contactPhone: '0900 000 000',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    shippingFee: 30000,
    currency: 'VND'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Settings>(settings)

  const handleEdit = () => {
    setFormData(settings)
    setIsEditing(true)
  }

  const handleSave = () => {
    setSettings(formData)
    setIsEditing(false)
    alert('Cài đặt đã được lưu thành công!')
  }

  const handleCancel = () => {
    setFormData(settings)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof Settings, value: string | number) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
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

      <div className="max-w-2xl">
        <div className="bg-white border border-black p-6 space-y-6">
          {/* Site Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Thông tin website</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên website</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  />
                ) : (
                  <p className="py-2">{settings.siteName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mô tả website</label>
                {isEditing ? (
                  <textarea
                    value={formData.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2 h-20"
                  />
                ) : (
                  <p className="py-2">{settings.siteDescription}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email liên hệ</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  />
                ) : (
                  <p className="py-2">{settings.contactEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  />
                ) : (
                  <p className="py-2">{settings.contactPhone}</p>
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
                  <p className="py-2">{settings.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* E-commerce Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Cài đặt thương mại</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phí vận chuyển (VND)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.shippingFee}
                    onChange={(e) => handleInputChange('shippingFee', Number(e.target.value))}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  />
                ) : (
                  <p className="py-2">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(settings.shippingFee)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Đơn vị tiền tệ</label>
                {isEditing ? (
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  >
                    <option value="VND">VND (Việt Nam Đồng)</option>
                    <option value="USD">USD (US Dollar)</option>
                  </select>
                ) : (
                  <p className="py-2">{settings.currency}</p>
                )}
              </div>
            </div>
          </div>

          {/* System Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Thông tin hệ thống</h2>
            <div className="bg-gray-50 border border-black p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Phiên bản:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Lần cập nhật cuối:</span>
                <span>{new Date().toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Trạng thái:</span>
                <span className="text-green-600">Hoạt động bình thường</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
