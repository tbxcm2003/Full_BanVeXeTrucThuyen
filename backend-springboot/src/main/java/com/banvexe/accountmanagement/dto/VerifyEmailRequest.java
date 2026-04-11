package com.banvexe.accountmanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record VerifyEmailRequest(
    @NotBlank @Email String email,
    @NotBlank @Pattern(regexp = "\\d{6}", message = "OTP phải gồm 6 chữ số") String otp
) {
}
