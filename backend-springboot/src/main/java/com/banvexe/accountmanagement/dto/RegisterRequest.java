package com.banvexe.accountmanagement.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank @Email String email,
    @NotBlank @Size(min = 6, max = 100) String password,
    @NotBlank @Size(max = 100) String fullName,
    @Nullable @Size(max = 20) String phone
) {
}
