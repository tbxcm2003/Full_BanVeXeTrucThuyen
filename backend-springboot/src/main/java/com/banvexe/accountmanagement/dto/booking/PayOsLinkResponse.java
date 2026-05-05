package com.banvexe.accountmanagement.dto.booking;

public record PayOsLinkResponse(
    Long orderCode,
    String checkoutUrl,
    String qrCode
) {
}
