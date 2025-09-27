# Hướng dẫn sử dụng hệ thống đăng nhập và Admin Panel

## Hệ thống đăng nhập chung

### Truy cập đăng nhập
1. Truy cập vào địa chỉ: `http://localhost:5173/dang-nhap`
2. Có thể đăng nhập hoặc đăng ký tài khoản mới

### Tài khoản demo
- **Admin**: 
  - Tên đăng nhập: `admin`
  - Mật khẩu: `admin123`
- **User**: 
  - Tên đăng nhập: `user1`
  - Mật khẩu: `user123`

### Truy cập Admin Panel
Sau khi đăng nhập bằng tài khoản admin, bạn sẽ **tự động được chuyển đến Admin Dashboard** tại: `http://localhost:5173/admin/dashboard`

**Lưu ý**: Admin sẽ luôn được chuyển hướng đến dashboard bất kể đăng nhập từ đâu.

## Các tính năng chính

### 1. Dashboard
- Xem tổng quan thống kê: sản phẩm, đơn hàng, doanh thu, bài viết
- Theo dõi đơn hàng gần đây
- Truy cập nhanh đến các chức năng quản lý

### 2. Quản lý sản phẩm (`/admin/products`)
- **Xem danh sách**: Tất cả sản phẩm với thông tin chi tiết
- **Thêm sản phẩm mới**: Nhập đầy đủ thông tin sản phẩm
- **Chỉnh sửa**: Cập nhật thông tin sản phẩm hiện có
- **Xóa sản phẩm**: Xóa sản phẩm khỏi hệ thống
- **Quản lý danh mục**: Chuỗi trầm hương, Nhang trầm hương, Phụ kiện phong thuỷ

### 3. Quản lý đơn hàng (`/admin/orders`)
- **Xem danh sách đơn hàng**: Tất cả đơn hàng với trạng thái
- **Lọc theo trạng thái**: Chờ xác nhận, Đã xác nhận, Đang xử lý, Đã giao, Hoàn thành, Đã hủy
- **Xem chi tiết đơn hàng**: Thông tin khách hàng, sản phẩm, tổng tiền
- **Cập nhật trạng thái**: Thay đổi trạng thái đơn hàng
- **Theo dõi tiến trình**: Từ đặt hàng đến giao hàng

### 4. Quản lý tin tức (`/admin/blogs`)
- **Viết bài mới**: Tạo nội dung bài viết về trầm hương
- **Chỉnh sửa bài viết**: Cập nhật nội dung hiện có
- **Quản lý trạng thái**: Bản nháp hoặc Xuất bản
- **Xóa bài viết**: Loại bỏ nội dung không cần thiết
- **Tối ưu SEO**: Tiêu đề, mô tả, nội dung chi tiết

### 5. Cài đặt hệ thống (`/admin/settings`)
- **Thông tin website**: Tên, mô tả trang web
- **Thông tin liên hệ**: Email, số điện thoại, địa chỉ
- **Cài đặt thương mại**: Phí vận chuyển, đơn vị tiền tệ
- **Thông tin hệ thống**: Phiên bản, trạng thái hoạt động

## Phân quyền và bảo mật

### Phân quyền
- **User**: Có thể đăng nhập, xem sản phẩm, mua hàng, quản lý tài khoản cá nhân
- **Admin**: Có tất cả quyền của User + quyền truy cập Admin Panel để quản lý hệ thống

### Bảo mật
- Tất cả trang admin đều được bảo vệ bằng xác thực và phân quyền
- Tự động chuyển hướng khi không có quyền truy cập
- Có thể đăng xuất từ header hoặc menu user
- Session được lưu trữ trong localStorage

## Lưu ý quan trọng

1. **Backup dữ liệu**: Luôn sao lưu dữ liệu trước khi thực hiện thay đổi lớn
2. **Kiểm tra kỹ**: Xem lại thông tin trước khi lưu thay đổi
3. **Bảo mật**: Không chia sẻ thông tin đăng nhập admin
4. **Cập nhật thường xuyên**: Kiểm tra và cập nhật trạng thái đơn hàng

## Hỗ trợ

Nếu gặp vấn đề, vui lòng liên hệ:
- Email: contact@tramhuong.vn
- Điện thoại: 0900 000 000
