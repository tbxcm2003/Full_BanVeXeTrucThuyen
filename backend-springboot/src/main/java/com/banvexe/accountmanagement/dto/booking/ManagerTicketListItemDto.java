package com.banvexe.accountmanagement.dto.booking;

import com.banvexe.accountmanagement.entity.TicketStatus;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

public record ManagerTicketListItemDto(
    Integer id,
    String maVe,
    TicketStatus trangThai,
    BigDecimal tongTien,
    Instant ngayDat,
    String emailKhach,
    String hoTenKhach,
    @JsonProperty("ghiChu") @JsonAlias("ghi_chu") String ghiChu,
    String tenTuyen,
    LocalDate ngayChuyen,
    LocalTime gioChuyen
) {
}
