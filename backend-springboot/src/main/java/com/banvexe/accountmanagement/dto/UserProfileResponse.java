package com.banvexe.accountmanagement.dto;

public record UserProfileResponse(
    Integer id,
    String email,
    String fullName,
    String phone,
    String role,
    String status,
    String avatarUrl
) {
}
