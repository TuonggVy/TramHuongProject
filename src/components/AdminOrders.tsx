import { useState } from 'react'

interface OrderItem {
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

interface Order {
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
  notes?: string
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipped', label: 'Đã giao' },
  { value: 'delivered', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' }
]

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      items: [
        { productId: 1, productName: 'Trầm hương 1', quantity: 2, unitPrice: 320000, total: 640000 },
        { productId: 2, productName: 'Trầm hương 2', quantity: 1, unitPrice: 420000, total: 420000 }
      ],
      subtotal: 1060000,
      shipping: 30000,
      total: 1090000,
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z',
      notes: 'Giao hàng vào cuối tuần'
    },
    {
      id: 'ORD002',
      customerName: 'Trần Thị B',
      phone: '0987654321',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      items: [
        { productId: 3, productName: 'Trầm hương 3', quantity: 1, unitPrice: 480000, total: 480000 }
      ],
      subtotal: 480000,
      shipping: 30000,
      total: 510000,
      status: 'delivered',
      createdAt: '2024-01-14T14:20:00Z'
    },
    {
      id: 'ORD003',
      customerName: 'Lê Văn C',
      phone: '0912345678',
      address: '789 Đường DEF, Quận 5, TP.HCM',
      items: [
        { productId: 1, productName: 'Trầm hương 1', quantity: 3, unitPrice: 320000, total: 960000 },
        { productId: 3, productName: 'Trầm hương 3', quantity: 1, unitPrice: 480000, total: 480000 }
      ],
      subtotal: 1440000,
      shipping: 30000,
      total: 1470000,
      status: 'processing',
      createdAt: '2024-01-13T09:15:00Z'
    }
  ])

  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const formatVND = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('vi-VN')

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-100',
      confirmed: 'text-blue-600 bg-blue-100',
      processing: 'text-purple-600 bg-purple-100',
      shipped: 'text-indigo-600 bg-indigo-100',
      delivered: 'text-green-600 bg-green-100',
      cancelled: 'text-red-600 bg-red-100'
    }
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100'
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as Order['status'] }
        : order
    ))
  }

  const filteredOrders = orders.filter(order => 
    selectedStatus === 'all' || order.status === selectedStatus
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-black bg-transparent px-3 py-2"
        >
          <option value="all">Tất cả trạng thái</option>
          {ORDER_STATUSES.map(status => (
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-black overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn hàng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm opacity-60">{order.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4">{formatVND(order.total)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {ORDER_STATUSES.find(s => s.value === order.status)?.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{formatDate(order.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-sm border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
                    >
                      Xem
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="text-sm border border-black bg-transparent px-2 py-1"
                    >
                      {ORDER_STATUSES.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-black p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chi tiết đơn hàng {selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-2xl opacity-60 hover:opacity-100"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Customer Info */}
              <div className="border border-black p-4">
                <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="opacity-60">Tên:</span> {selectedOrder.customerName}
                  </div>
                  <div>
                    <span className="opacity-60">SĐT:</span> {selectedOrder.phone}
                  </div>
                  <div className="md:col-span-2">
                    <span className="opacity-60">Địa chỉ:</span> {selectedOrder.address}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border border-black p-4">
                <h3 className="font-semibold mb-2">Sản phẩm</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-sm opacity-60">x{item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div>{formatVND(item.unitPrice)}</div>
                        <div className="font-medium">{formatVND(item.total)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border border-black p-4">
                <h3 className="font-semibold mb-2">Tổng kết</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatVND(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vận chuyển:</span>
                    <span>{formatVND(selectedOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                    <span>Tổng cộng:</span>
                    <span>{formatVND(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="border border-black p-4">
                  <h3 className="font-semibold mb-2">Ghi chú</h3>
                  <p className="text-sm">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Status Update */}
              <div className="flex items-center space-x-4">
                <label className="font-semibold">Cập nhật trạng thái:</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  className="border border-black bg-transparent px-3 py-2"
                >
                  {ORDER_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
