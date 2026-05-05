package com.banvexe.accountmanagement.dto.booking;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GuestCancelTicketRequest(
    @NotBlank @Size(max = 20) String soDienThoai,
    @NotBlank @Size(max = 20) String maVe
) {
}
