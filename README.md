# BanVeXe - Hệ thống Bán Vé Xe Trực Tuyến

## 📋 Giới thiệu dự án

**BanVeXe** là một hệ thống bán vé xe trực tuyến hoàn chỉnh được xây dựng bằng công nghệ hiện đại. Dự án này cung cấp nền tảng backend mạnh mẽ để quản lý tài khoản người dùng, xác thực, quản lý chuyến xe, đặt vé, thanh toán trực tuyến và các chức năng liên quan đến bán vé xe.

### 👥 Thông tin dự án
- **Mô tả**: Hệ thống quản lý bán vé xe trực tuyến
- **Phát triển bởi**: Nguyễn Thành Nhân, Trần Bảo Xuyên
- **Hướng dẫn bởi**: ThS. Đặng Văn Thuận
- **Tổ chức**: Trường Đại học Công nghiệp TP.HCM - Khoa CNTT

## 🏗️ Kiến trúc hệ thống

### Sơ đồ Use Case Tổng quát
Hệ thống được thiết kế với 3 vai trò chính:
- **Khách vãng lai/Khách hàng**: Tìm kiếm, xem thông tin, đặt vé, thanh toán
- **Nhân viên**: Quản lý vé, cập nhật trạng thái chuyến
- **Quản trị viên**: Quản lý chuyến xe, tuyến xe, tài khoản

### Cấu trúc Layer Backend
```
backend-springboot/
├── src/main/java/com/banvexe/accountmanagement/
│   ├── controller/          # REST API endpoints
│   │   ├── AccountController.java
│   │   ├── AuthController.java
│   │   ├── AdminController.java
│   ├── service/             # Business logic
│   │   ├── AuthService.java
│   │   ├── PasswordService.java
│   ├── entity/              # JPA entities
│   │   ├── UserAccount.java
│   │   ├── AccountStatus.java
│   ├── dto/                 # Data Transfer Objects
│   │   ├── AuthResponse.java
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── UserProfileResponse.java
│   ├── repository/          # Data access layer
│   │   └── UserAccountRepository.java
│   ├── security/            # JWT & Security
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── JwtService.java
│   │   ├── SecurityConfig.java
│   └── config/              # Configuration
│       └── GlobalExceptionHandler.java
└── src/main/resources/
    └── application.yml      # Spring Boot configuration
```

## ✨ Chức năng chính

### Chức năng dành cho Khách hàng
- Đăng ký tài khoản mới
- Đăng nhập với email/mật khẩu
- Tìm kiếm chuyến xe theo tuyến đường, ngày giờ
- Xem thông tin chi tiết chuyến xe (giá, thời gian, loại xe, lộ trình)
- Quản lý thông tin cá nhân
- Đặt vé và chọn ghế
- Thanh toán vé qua nhiều phương thức (VNPay, MoMo, ZaloPay, thẻ ngân hàng)
- Tra cứu lịch sử đặt vé
- Hủy vé (trong vòng 12 giờ từ lúc đặt)

### Chức năng dành cho Nhân viên
- Quản lý thông tin vé khách hàng
- Cập nhật trạng thái chuyến xe
- Duyệt các yêu cầu hủy vé

### Chức năng dành cho Quản trị viên
- Quản lý chuyến xe (thêm, sửa, xóa)
- Quản lý tuyến xe (thêm, sửa, xóa)
- Tạo và xóa tài khoản nhân viên
- Xem thông tin chi tiết khách hàng và lịch sử đặt vé

## 🚀 Công nghệ sử dụng

### Backend & Framework
- **Java**: Ngôn ngữ lập trình chính
- **Spring Boot**: Framework phát triển ứng dụng web
- **Spring Security**: Quản lý xác thực và phân quyền

### Database & Storage
- **MySQL**: Hệ quản trị cơ sở dữ liệu quan hệ (RDBMS)
- **Cloudinary**: Lưu trữ và quản lý hình ảnh trên nền tảng điện toán đám mây

### Bảo mật & Xác thực
- **JWT (JSON Web Token)**: Xác thực và phân quyền API
- **Spring Security**: Quản lý phiên đăng nhập
- **BCrypt**: Mã hóa mật khẩu an toàn

### Email & Notification
- **JavaMailSender**: Gửi email xác thực, thông báo đặt vé, mã vé điện tử

### Build Tool & IDE
- **Maven**: Công cụ quản lý dự án và build
- **IntelliJ IDEA / VS Code**: Các IDE hỗ trợ phát triển

## 📖 Hướng dẫn cài đặt & chạy dự án

### Yêu cầu hệ thống
- **Java**: JDK 11 trở lên
- **MySQL**: MySQL 5.7+ hoặc MariaDB 10.3+
- **Maven**: 3.6.0+
- **IDE**: IntelliJ IDEA hoặc VS Code

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd BanVeXe
```

### Bước 2: Thiết lập cơ sở dữ liệu
```bash
# Truy cập MySQL
mysql -u root -p

# Chạy file SQL để tạo database, bảng và dữ liệu ban đầu
source database/data.sql
```

### Bước 3: Cấu hình kết nối database
Cập nhật file `backend-springboot/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/banvexe
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
  
  mail:
    host: smtp.gmail.com
    port: 587
    username: your_email@gmail.com
    password: your_app_password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true

jwt:
  secret: your_jwt_secret_key_here
  expiration: 86400000  # 24 hours
```

### Bước 4: Chạy ứng dụng
```bash
# Sử dụng Maven
cd backend-springboot
mvn spring-boot:run

# Hoặc chạy class chính trực tiếp trong IDE
# Class: com.banvexe.accountmanagement.AccountManagementApplication
```

Ứng dụng sẽ chạy tại `http://localhost:8080`

### Bước 5: Test API
- Sử dụng Postman hoặc Insomnia để test các API endpoints
- API Documentation có thể được generate bằng Swagger (nếu được cấu hình)

## 📝 Công nghệ & Triển khai chính

### 🗄️ MySQL - Cơ sở dữ liệu
Hệ thống sử dụng MySQL để lưu trữ toàn bộ dữ liệu bao gồm: tài khoản người dùng, thông tin tuyến xe, chuyến xe, đặt vé, thanh toán và lịch sử giao dịch. MySQL đảm bảo tính toàn vẹn dữ liệu và xử lý truy vấn hiệu quả.

### 🔐 JWT - Xác thực & phân quyền
Sử dụng JSON Web Token để xác thực người dùng. Khi đăng nhập, hệ thống tạo JWT token được sử dụng trong các request tiếp theo để xác thực quyền truy cập API.

### 📧 JavaMailSender - Gửi email
Tự động hóa gửi email thông báo cho người dùng như: xác nhận đăng ký, thông báo đặt vé thành công, gửi mã vé điện tử, thông báo hủy vé...

### ☁️ Cloudinary - Lưu trữ media
Lưu trữ hình ảnh và tài liệu trên nền tảng đám mây, giúp giảm tải server và tăng tốc độ truy cập.

---

## 📧 Liên hệ & Hỗ trợ

Để có thêm thông tin hoặc đóng góp cho dự án, vui lòng liên hệ:
- **Giáo viên hướng dẫn**: ThS. Đặng Văn Thuận
- **Sinh viên**: Nguyễn Thành Nhân, Trần Bảo Xuyên
