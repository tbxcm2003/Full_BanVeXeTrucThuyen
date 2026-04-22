package com.banvexe.accountmanagement.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
    @NotBlank @Size(max = 100) String fullName,
    @Nullable @Size(max = 20) String phone
) {
}
