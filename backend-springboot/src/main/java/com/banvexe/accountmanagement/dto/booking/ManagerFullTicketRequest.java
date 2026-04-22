package com.banvexe.accountmanagement.dto.booking;

import com.banvexe.accountmanagement.entity.TicketStatus;
import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

/**
 * Sửa vé đầy đủ: mã, khách, chuyến, ghế, tiền, trạng thái, ghi chú, ngày đặt.
 * {@code tongTien} tùy chọn: nếu bỏ trống sẽ tính theo giá vé chuyến × số ghế.
 */
public record ManagerFullTicketRequest(
    @NotBlank @Size(max = 20) String maVe,
    @NotNull Integer khachHangId,
    @NotNull Integer chuyenXeId,
    @NotEmpty @Size(min = 1, max = 64) List<@Size(min = 1, max = 10) String> maGhe,
    @NotNull TicketStatus trangThai,
    @JsonAlias("ghi_chu") @Nullable @Size(max = 10000) String ghiChu,
    @Nullable Instant ngayDat,
    @Nullable BigDecimal tongTien
) {
}
