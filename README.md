# Hệ Thống Quản Lý Rạp Chiếu Phim

Dự án này là một hệ thống quản lý rạp chiếu phim hoàn chỉnh với phần Backend (BE) và Frontend (FE). Hệ thống cho phép quản lý phim, suất chiếu, rạp, phòng chiếu, vé, giỏ hàng, thanh toán và khuyến mãi.

## Cấu Trúc Dự Án

Dự án được chia thành hai phần chính:

### Backend (BE)

Backend được xây dựng bằng Node.js với Express.js và MongoDB làm cơ sở dữ liệu.

#### Công Nghệ Sử Dụng

- **Node.js & Express.js**: Framework để xây dựng RESTful API
- **MongoDB & Mongoose**: Cơ sở dữ liệu NoSQL và ODM
- **Swagger**: Tài liệu API tự động
- **Bcrypt**: Mã hóa mật khẩu
- **Nodemailer**: Gửi email
- **Multer**: Xử lý tải lên tệp

#### Cấu Trúc Thư Mục

- **models/**: Chứa các schema MongoDB (User, Phim, Ve, Suatchieu, Giohang, Khuyenmai, Admin, PhongChieu, Thanhtoan, Rap)
- **routes/**: Chứa các API endpoint
- **utils/**: Chứa các tiện ích như cấu hình Swagger, Multer, và Nodemailer
- **public/**: Chứa tài nguyên tĩnh
- **views/**: Chứa các template HBS

#### API Endpoints

Backend cung cấp các API cho:

- Quản lý người dùng (đăng ký, đăng nhập, cập nhật thông tin)
- Quản lý phim (thêm, sửa, xóa, xem chi tiết)
- Quản lý suất chiếu
- Quản lý vé
- Quản lý giỏ hàng
- Quản lý thanh toán
- Quản lý khuyến mãi
- Quản lý rạp và phòng chiếu

Tài liệu API có thể được truy cập tại: `http://localhost:3000/api-docs`

### Frontend (FE)

Frontend được xây dựng bằng React với Vite làm công cụ build.

#### Công Nghệ Sử Dụng

- **React**: Thư viện JavaScript để xây dựng giao diện người dùng
- **React Router**: Điều hướng trong ứng dụng
- **React Helmet**: Quản lý thẻ head
- **Vite**: Công cụ build hiện đại

#### Cấu Trúc Thư Mục

- **src/**: Mã nguồn chính
  - **assets/**: Chứa tài nguyên như CSS, JSX, và HTML
  - **components/**: Chứa các component React
  - **App.jsx**: Component gốc của ứng dụng
  - **main.jsx**: Điểm vào của ứng dụng

## Cài Đặt và Chạy Dự Án

### Yêu Cầu

- Node.js (v14 trở lên)
- MongoDB (v4 trở lên)
- npm hoặc yarn

### Backend

1. Di chuyển vào thư mục BE:

   ```
   cd BE
   ```

2. Cài đặt các dependencies:

   ```
   npm install
   ```

3. Chạy server trong chế độ development:
   ```
   npm run dev
   ```

Backend sẽ chạy tại `http://localhost:3000`

### Frontend

1. Di chuyển vào thư mục FE:

   ```
   cd FE
   ```

2. Cài đặt các dependencies:

   ```
   npm install
   ```

3. Chạy ứng dụng trong chế độ development:
   ```
   npm run dev
   ```

Frontend sẽ chạy tại `http://localhost:5173`

## Cơ Sở Dữ Liệu

Dự án sử dụng MongoDB làm cơ sở dữ liệu. Các collections chính bao gồm:

- **users**: Thông tin người dùng
- **phims**: Thông tin phim
- **suatchieus**: Thông tin suất chiếu
- **ves**: Thông tin vé
- **giohangs**: Thông tin giỏ hàng
- **khuyenmais**: Thông tin khuyến mãi
- **admins**: Thông tin quản trị viên
- **phongchieus**: Thông tin phòng chiếu
- **thanhtoans**: Thông tin thanh toán
- **raps**: Thông tin rạp

## Tính Năng Chính

### Dành Cho Người Dùng

- Đăng ký, đăng nhập tài khoản
- Xem danh sách phim đang chiếu, sắp chiếu
- Xem thông tin chi tiết phim
- Đặt vé xem phim
- Quản lý giỏ hàng
- Thanh toán
- Sử dụng mã khuyến mãi
- Tích lũy điểm thành viên

### Dành Cho Quản Trị Viên

- Quản lý phim (thêm, sửa, xóa)
- Quản lý suất chiếu
- Quản lý rạp và phòng chiếu
- Quản lý khuyến mãi
- Xem báo cáo doanh thu

## Đóng Góp

Nếu bạn muốn đóng góp vào dự án, vui lòng tạo pull request hoặc báo cáo các vấn đề tại mục Issues.

## Giấy Phép

Dự án này được phân phối dưới giấy phép [MIT](LICENSE).
