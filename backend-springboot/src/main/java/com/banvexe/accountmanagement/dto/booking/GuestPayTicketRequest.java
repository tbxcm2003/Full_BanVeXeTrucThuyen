package com.banvexe.accountmanagement.dto.booking;

import com.banvexe.accountmanagement.entity.PaymentMethod;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record GuestPayTicketRequest(
    @NotNull PaymentMethod phuongThuc,
    @NotNull Boolean dongYDieuKhoan,
    @NotBlank @Email @Size(max = 100) String email,
    @NotBlank @Size(max = 20) String soDienThoai
) {
}