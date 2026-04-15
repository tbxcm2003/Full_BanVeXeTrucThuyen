package com.banvexe.accountmanagement.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateCustomerRequest(
    @NotBlank @Email @Size(max = 100) String email,
    @NotBlank @Size(min = 6, max = 100) String password,
    @NotBlank @Size(max = 100) String fullName,
    @Nullable @Size(max = 15) @Pattern(regexp = "^$|^0[0-9]{9,10}$", message = "Số điện thoại không hợp lệ") String phone
) {
}
