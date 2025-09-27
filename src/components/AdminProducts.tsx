import { useState } from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  salePrice?: number
  image: string
  description?: string
}

const CATEGORIES = ['Nhang trầm hương', 'Chuỗi trầm hương', 'Phụ kiện phong thuỷ']

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Trầm hương 1', category: 'Chuỗi trầm hương', price: 350000, salePrice: 320000, image: '/src/assets/chuoi1.png', description: 'Mùi hương thuần khiết, giúp thư giãn và tĩnh tâm.' },
    { id: 2, name: 'Trầm hương 2', category: 'Nhang trầm hương', price: 420000, image: '/src/assets/nhangtram.png', description: 'Nhang trầm chất lượng cao.' },
    { id: 3, name: 'Trầm hương 3', category: 'Phụ kiện phong thuỷ', price: 520000, salePrice: 480000, image: '/src/assets/tinhdau.png', description: 'Tinh dầu trầm hương nguyên chất.' }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: 0,
    salePrice: undefined,
    image: '',
    description: ''
  })

  const formatVND = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData(product)
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        category: '',
        price: 0,
        salePrice: undefined,
        image: '',
        description: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      category: '',
      price: 0,
      salePrice: undefined,
      image: '',
      description: ''
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id } as Product
          : p
      ))
    } else {
      // Add new product
      const newProduct: Product = {
        ...formData as Product,
        id: Math.max(...products.map(p => p.id)) + 1
      }
      setProducts([...products, newProduct])
    }
    
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={() => handleOpenModal()}
          className="button-primary"
        >
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-black overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hình ảnh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá khuyến mãi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover border border-black"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm opacity-60 truncate max-w-xs">
                      {product.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{product.category}</td>
                <td className="px-6 py-4 text-sm">{formatVND(product.price)}</td>
                <td className="px-6 py-4 text-sm">
                  {product.salePrice ? formatVND(product.salePrice) : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="text-sm border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-sm border border-red-500 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border border-black p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Danh mục</label>
                <select
                  required
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2"
                >
                  <option value="">Chọn danh mục</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Giá gốc (VND)</label>
                <input
                  type="number"
                  required
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Giá khuyến mãi (VND)</label>
                <input
                  type="number"
                  value={formData.salePrice || ''}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL hình ảnh</label>
                <input
                  type="url"
                  required
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2 h-20"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 button-primary"
                >
                  {editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
