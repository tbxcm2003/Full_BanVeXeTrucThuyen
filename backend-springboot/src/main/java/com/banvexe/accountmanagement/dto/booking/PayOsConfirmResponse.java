package com.banvexe.accountmanagement.dto.booking;

public record PayOsConfirmResponse(
    Long orderCode,
    String paymentStatus,
    boolean paid
) {
}
