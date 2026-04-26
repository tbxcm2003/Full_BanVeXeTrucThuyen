# Cloudinary



- Không commit `CLOUDINARY_API_SECRET`. Secret lộ: [Dashboard](https://console.cloudinary.com) → Settings → rotate.

- Cấu hình: `database/data.sql` (và chạy `database/migration_*.sql` nếu nâng cấp từ DB cũ). `backend-springboot/.env` từ `.env.example` — 3 biến `CLOUDINARY_*`.

- Upload: `public_id` cố định, `overwrite` + `unique_filename: false` + `invalidate: true` (xóa cache CDN, tránh vẫn thấy ảnh cũ dù file đã thay trên server).
- Bản tải trước khi bật `public_id` cố định vẫn là asset khác tên; xóa thủ công trên [Media Library](https://console.cloudinary.com) nếu cần.



| Method | Path | Note |

|--------|------|------|

| GET | `/api/public/branding` | public |

| POST | `/api/accounts/me/avatar` | `tai_khoan.anh_dai_dien_url` |

| POST | `/api/admin/branding/logo` | `QUAN_TRI` |

| POST | `/api/admin/branding/banner` | `QUAN_TRI` |



Thiếu 3 biến → bean Cloudinary không tạo, upload 503.

