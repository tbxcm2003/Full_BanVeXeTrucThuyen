package com.banvexe.accountmanagement.dto;

public record UserProfileResponse(
    Long id,
    String email,
    String fullName,
    String phone,
    String role,
    String status
) {
}
