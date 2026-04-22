package com.banvexe.accountmanagement.dto.booking;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateVehicleRequest(
    @NotBlank @Size(max = 20) String bienSo,
    @NotBlank @Size(max = 50) String loaiXe,
    @NotNull @Min(1) @Max(200) Integer soGhe
) {
}
