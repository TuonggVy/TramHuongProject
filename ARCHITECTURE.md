# Kiến trúc Frontend - Trầm Hương

## 📁 Cấu trúc thư mục

```
src/
├── components/          # React Components
│   ├── AdminLayout.tsx  # Layout cho admin
│   ├── AdminDashboard.tsx
│   ├── AdminProducts.tsx
│   ├── AdminOrders.tsx
│   ├── AdminBlogs.tsx
│   ├── AdminSettings.tsx
│   ├── LoginPage.tsx
│   ├── UserAccount.tsx
│   └── ProtectedRoute.tsx
├── contexts/            # React Contexts
│   └── AuthContext.tsx  # Authentication context
├── hooks/               # Custom Hooks
│   ├── useAuth.ts       # Authentication hooks
│   └── useProducts.ts   # Product management hooks
├── services/            # API Services
│   ├── api.ts           # API client
│   ├── authService.ts   # Authentication API
│   ├── productService.ts # Product API
│   ├── orderService.ts  # Order API
│   ├── blogService.ts   # Blog API
│   └── dashboardService.ts # Dashboard API
├── types/               # TypeScript Types
│   └── index.ts         # All type definitions
├── utils/               # Utility Functions
│   └── index.ts         # Helper functions
├── constants/           # Constants & Configuration
│   └── index.ts         # App constants
└── assets/              # Static Assets
    └── ...
```

## 🔄 Luồng dữ liệu (Data Flow)

### 1. Authentication Flow
```
LoginPage → useAuth hook → AuthContext → authService → API
```

### 2. Product Management Flow
```
AdminProducts → useProducts hook → productService → API
```

### 3. Order Management Flow
```
AdminOrders → orderService → API
```

### 4. Blog Management Flow
```
AdminBlogs → blogService → API
```

## 🛠️ API Integration

### Backend Endpoints Expected:

#### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/profile` - Lấy thông tin user

#### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy sản phẩm theo ID
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

#### Orders
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy đơn hàng theo ID
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật trạng thái đơn hàng

#### Blogs
- `GET /api/blogs` - Lấy danh sách bài viết
- `GET /api/blogs/:id` - Lấy bài viết theo ID
- `POST /api/blogs` - Tạo bài viết mới
- `PUT /api/blogs/:id` - Cập nhật bài viết
- `DELETE /api/blogs/:id` - Xóa bài viết

#### Dashboard
- `GET /api/dashboard/stats` - Lấy thống kê dashboard

## 🔧 Cách sử dụng

### 1. Thêm API mới

```typescript
// 1. Định nghĩa types trong types/index.ts
export interface NewEntity {
  id: number
  name: string
  // ...
}

// 2. Thêm endpoint trong constants/index.ts
export const API_ENDPOINTS = {
  // ...
  NEW_ENTITY: '/new-entity',
  NEW_ENTITY_BY_ID: (id: number) => `/new-entity/${id}`
}

// 3. Tạo service trong services/newEntityService.ts
export const newEntityService = {
  async getEntities(): Promise<ApiResponse<NewEntity[]>> {
    return api.get(API_ENDPOINTS.NEW_ENTITY)
  },
  // ...
}

// 4. Tạo hook trong hooks/useNewEntity.ts
export const useNewEntity = () => {
  // Custom hook logic
}

// 5. Sử dụng trong component
const { entities, isLoading } = useNewEntity()
```

### 2. Tích hợp với Backend

```typescript
// Cập nhật API_BASE_URL trong constants/index.ts
export const API_BASE_URL = 'https://your-backend-api.com/api'

// Hoặc sử dụng environment variable
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
```

### 3. Error Handling

```typescript
// Tất cả API calls đều có error handling tự động
try {
  const response = await productService.createProduct(data)
  // Handle success
} catch (error) {
  // Error đã được format sẵn
  console.error(error.message)
}
```

## 🎯 Benefits

### 1. **Separation of Concerns**
- Components chỉ lo UI
- Services lo API calls
- Hooks lo business logic
- Types lo type safety

### 2. **Reusability**
- Services có thể dùng ở nhiều component
- Hooks có thể tái sử dụng
- Utils functions dùng chung

### 3. **Maintainability**
- Dễ tìm và sửa code
- Dễ thêm tính năng mới
- Dễ test từng phần

### 4. **Type Safety**
- TypeScript types cho tất cả API
- Compile-time error checking
- Better IDE support

### 5. **Scalability**
- Dễ scale khi thêm features
- Dễ thêm team members
- Clear code organization

## 🚀 Next Steps

1. **Backend Integration**: Cập nhật API endpoints thực tế
2. **Error Handling**: Thêm global error handling
3. **Loading States**: Cải thiện UX với loading indicators
4. **Caching**: Thêm React Query cho caching
5. **Testing**: Thêm unit tests cho services và hooks
