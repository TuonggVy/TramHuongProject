import { useState } from 'react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  status: 'draft' | 'published'
  image?: string
}

export default function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Cách phân biệt trầm hương tự nhiên',
      excerpt: 'Nhận biết trầm hương chất lượng qua hương thơm và vân gỗ...',
      content: 'Nội dung bài viết 1. Mô tả chi tiết cách phân biệt trầm hương tự nhiên và nhân tạo. Trầm hương tự nhiên có mùi thơm đặc trưng, vân gỗ rõ ràng và màu sắc tự nhiên. Cần chú ý đến nguồn gốc và chứng nhận chất lượng.',
      date: '2024-01-15',
      status: 'published'
    },
    {
      id: 2,
      title: 'Lợi ích của nhang trầm',
      excerpt: 'Nhang trầm giúp thư giãn, tĩnh tâm và khử mùi...',
      content: 'Nội dung bài viết 2. Tác dụng và cách sử dụng nhang trầm hiệu quả. Nhang trầm không chỉ mang lại không gian thơm mát mà còn có tác dụng tâm linh, giúp thư giãn và tĩnh tâm.',
      date: '2024-01-10',
      status: 'published'
    },
    {
      id: 3,
      title: 'Bảo quản vòng tay trầm',
      excerpt: 'Giữ mùi hương bền lâu và vân gỗ đẹp...',
      content: 'Nội dung bài viết 3. Hướng dẫn chi tiết bảo quản vòng tay trầm. Để giữ được mùi hương và vẻ đẹp của vòng tay trầm, cần bảo quản đúng cách, tránh ẩm ướt và ánh nắng trực tiếp.',
      date: '2024-01-05',
      status: 'draft'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    date: '',
    status: 'draft',
    image: ''
  })

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('vi-VN')

  const handleOpenModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post)
      setFormData(post)
    } else {
      setEditingPost(null)
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        status: 'draft',
        image: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingPost(null)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      date: '',
      status: 'draft',
      image: ''
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(p => 
        p.id === editingPost.id 
          ? { ...formData, id: editingPost.id } as BlogPost
          : p
      ))
    } else {
      // Add new post
      const newPost: BlogPost = {
        ...formData as BlogPost,
        id: Math.max(...posts.map(p => p.id)) + 1
      }
      setPosts([...posts, newPost])
    }
    
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setPosts(posts.filter(p => p.id !== id))
    }
  }

  const toggleStatus = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    ))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý tin tức</h1>
        <button
          onClick={() => handleOpenModal()}
          className="button-primary"
        >
          Viết bài mới
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white border border-black overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm opacity-60 truncate max-w-md">
                      {post.excerpt}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published' 
                      ? 'text-green-600 bg-green-100' 
                      : 'text-yellow-600 bg-yellow-100'
                  }`}>
                    {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{formatDate(post.date)}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(post)}
                      className="text-sm border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => toggleStatus(post.id)}
                      className={`text-sm px-3 py-1 transition-colors ${
                        post.status === 'published'
                          ? 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
                          : 'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                      }`}
                    >
                      {post.status === 'published' ? 'Ẩn' : 'Xuất bản'}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-black p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingPost ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tóm tắt</label>
                <textarea
                  required
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2 h-20"
                  placeholder="Mô tả ngắn gọn về nội dung bài viết..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nội dung</label>
                <textarea
                  required
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2 h-40"
                  placeholder="Viết nội dung chi tiết của bài viết..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày xuất bản</label>
                  <input
                    type="date"
                    required
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Trạng thái</label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                    className="w-full rounded border border-black bg-transparent px-3 py-2"
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="published">Xuất bản</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL hình ảnh (tùy chọn)</label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full rounded border border-black bg-transparent px-3 py-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 button-primary"
                >
                  {editingPost ? 'Cập nhật' : 'Tạo bài viết'}
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
