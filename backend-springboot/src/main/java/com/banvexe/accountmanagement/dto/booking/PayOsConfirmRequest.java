package com.banvexe.accountmanagement.dto.booking;

import jakarta.validation.constraints.NotNull;

public record PayOsConfirmRequest(
    @NotNull Long orderCode
) {
}
