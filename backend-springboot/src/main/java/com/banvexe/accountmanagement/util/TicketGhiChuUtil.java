package com.banvexe.accountmanagement.util;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * Hủy thành công: ghi chú vé được thay thế bằng dòng tóm tắt, không giữ
 * nội dung đặt vé / hệ thống cũ.
 */
public final class TicketGhiChuUtil {

    private static final DateTimeFormatter WHEN =
        DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm").withZone(ZoneId.of("Asia/Ho_Chi_Minh"));

    private TicketGhiChuUtil() {
    }

    /**
     * Một dòng ghi chú thay thế toàn bộ bản cũ (không dùng ngoặc []).
     * Ví dụ: {@code Hủy vé thành công: yêu cầu hủy đã được duyệt — 26/04/2026 19:15}
     */
    public static String ghiChuHuyThanhCong(String noiDung) {
        String khi = WHEN.format(Instant.now());
        return String.format("Hủy vé thành công: %s — %s", noiDung, khi);
    }

    /**
     * Khách gửi yêu cầu hủy (chờ NV) — một dòng, có thời gian, không giữ nội dung đặt vé cũ.
     * Ví dụ: {@code Yêu cầu hủy vé chờ nhân viên duyệt — 26/04/2026 19:15}
     */
    public static String ghiChuYeuCauHuyChoDuyet() {
        String khi = WHEN.format(Instant.now());
        return String.format("Yêu cầu hủy vé chờ nhân viên duyệt — %s", khi);
    }

    /**
     * NV từ chối hủy — một dòng, không dùng ngoặc [], không giữ ghi chú đặt vé cũ.
     * Ví dụ: {@code Từ chối hủy: hết ghế — 26/04/2026 19:15}
     */
    public static String ghiChuTuChoiHuy(String reason) {
        String r = (reason == null || reason.isBlank()) ? "Không nêu lý do" : reason.trim();
        String khi = WHEN.format(Instant.now());
        return String.format("Từ chối hủy: %s — %s", r, khi);
    }

    /**
     * Nội dung ngắn đưa vào {@link #ghiChuHuyThanhCong} khi quản lý/nhân viên đổi trạng thái hủy;
     * bỏ ghi chú form nếu vẫn là chuỗi tự hệ thống khi đặt vé.
     */
    public static String noiDungHuyTheoCapNhat(String rawGhiChuForm, String macDinh) {
        if (rawGhiChuForm == null || rawGhiChuForm.isBlank()) {
            return macDinh;
        }
        String t = rawGhiChuForm.trim();
        if (t.contains("Đặt vé thành công")) {
            return macDinh;
        }
        return t;
    }

    /**
     * Dùng khi lọc / duyệt yêu cầu hủy. Không phụ thuộc hoa/thường ở ký tự Latin đầu từ (Y/y).
     * Vẫn khớp bản cũ nối thêm câu phía trước (trước khi tách bản ghi ghi chú mới).
     */
    public static boolean ghiChuCoYeuCauHuy(String g) {
        if (g == null || g.isBlank()) {
            return false;
        }
        return g.toLowerCase(Locale.ROOT).contains("yêu cầu hủy");
    }
}
