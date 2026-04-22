package com.banvexe.accountmanagement.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = true)
public record CreateStaffRequest(
    @JsonProperty("email") @NotBlank @Email @Size(max = 100) String email,
    @JsonProperty("password") @NotBlank @Size(min = 6, max = 100) String password,
    @JsonProperty("fullName") @NotBlank @Size(max = 100) String fullName,
    @JsonProperty("phone") @Nullable @Size(max = 32) String phone
) {
}
