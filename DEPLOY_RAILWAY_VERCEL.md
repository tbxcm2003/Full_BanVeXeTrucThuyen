# Deploy nhanh: Railway + Vercel

Mục tiêu: người dùng chỉ cần 1 link web để dùng ngay.

## 1) Deploy backend + database trên Railway

1. Tạo project mới trên Railway.
2. Add service **MariaDB**.
3. Add service **backend** từ repo này, chọn thư mục gốc là `backend-springboot`.
4. Railway sẽ tự build bằng Maven.
5. Cấu hình biến môi trường cho backend service:

```env
SPRING_DATASOURCE_URL=<RAILWAY_MARIADB_JDBC_URL>
SPRING_DATASOURCE_USERNAME=<RAILWAY_DB_USER>
SPRING_DATASOURCE_PASSWORD=<RAILWAY_DB_PASSWORD>
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
APP_EXPOSE_INTERNAL_ERROR_MESSAGE=false

APP_JWT_SECRET=<SECRET_DAI_IT_NHAT_64_KY_TU>
APP_JWT_EXPIRATION_MINUTES=60

SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=<EMAIL_GUI>
SPRING_MAIL_PASSWORD=<APP_PASSWORD_SMTP>

PAYOS_CLIENT_ID=<PAYOS_CLIENT_ID>
PAYOS_API_KEY=<PAYOS_API_KEY>
PAYOS_CHECKSUM_KEY=<PAYOS_CHECKSUM_KEY>
PAYOS_BASE_URL=https://api-merchant.payos.vn
PAYOS_RETURN_URL=<VERCEL_FRONTEND_URL>/thanh-toan/ket-qua
PAYOS_CANCEL_URL=<VERCEL_FRONTEND_URL>/thanh-toan

APP_CORS_ALLOWED_ORIGINS=<VERCEL_FRONTEND_URL>

APP_BOOKING_BRAND_NAME=VinaGo
APP_BOOKING_BRAND_LOGO_URL=<LOGO_URL>
APP_BOOKING_BRAND_HOTLINE=1900 6789
APP_BOOKING_BRAND_SUPPORT_EMAIL=support@vinago.vn
APP_BOOKING_BRAND_PRIMARY_COLOR=#ef5222
APP_BOOKING_BRAND_SECONDARY_COLOR=#f97316
APP_BOOKING_BRAND_SUCCESS_COLOR=#059669
APP_BOOKING_BRAND_WEBSITE_URL=<VERCEL_FRONTEND_URL>
APP_BOOKING_BRAND_TICKET_LOOKUP_URL=<VERCEL_FRONTEND_URL>/tra-cuu-ve
APP_BOOKING_BRAND_HISTORY_URL=<VERCEL_FRONTEND_URL>/lich-su-dat-ve
```

6. Deploy backend thành công, lấy URL API Railway (ví dụ: `https://api-banvexe.up.railway.app`).

---

## 2) Deploy frontend trên Vercel

1. Import repo vào Vercel.
2. Root directory: `frontend-reactjs`.
3. Build command: `npm run build` (mặc định).
4. Output directory: `dist` (mặc định Vite).
5. Cấu hình env trên Vercel:

```env
VITE_API_BASE_URL=<RAILWAY_BACKEND_URL>
VITE_CLOUDINARY_CLOUD_NAME=<CLOUDINARY_CLOUD_NAME>
```

6. Deploy frontend, lấy link public (ví dụ: `https://banvexe.vercel.app`).

---

## 3) Cập nhật lại backend theo URL frontend thật

Sau khi có URL Vercel thật, quay lại Railway và cập nhật:

- `APP_CORS_ALLOWED_ORIGINS`
- `PAYOS_RETURN_URL`
- `PAYOS_CANCEL_URL`
- `APP_BOOKING_BRAND_WEBSITE_URL`
- `APP_BOOKING_BRAND_TICKET_LOOKUP_URL`
- `APP_BOOKING_BRAND_HISTORY_URL`

Redeploy backend.

---

## 4) Smoke test trước public

1. Mở link frontend Vercel.
2. Đăng nhập/đăng ký.
3. Đặt vé 1 chiều + khứ hồi.
4. Thanh toán PayOS:
   - thành công
   - hủy trên PayOS
5. Kiểm tra mail:
   - mail đặt vé
   - mail thanh toán
6. Kiểm tra auto hủy sau hold-time (5 phút).

Nếu tất cả pass thì public link frontend cho người dùng.
