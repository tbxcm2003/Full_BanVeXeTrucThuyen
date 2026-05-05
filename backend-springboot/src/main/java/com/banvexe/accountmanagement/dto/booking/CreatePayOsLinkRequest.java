package com.banvexe.accountmanagement.dto.booking;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record CreatePayOsLinkRequest(
    @NotEmpty List<@NotNull Integer> ticketIds,
    @NotBlank @Email @Size(max = 100) String email,
    @NotBlank @Size(max = 20) String soDienThoai,
    @NotBlank @Size(max = 100) String hoTen
) {
}
