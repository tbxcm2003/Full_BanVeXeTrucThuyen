package com.banvexe.accountmanagement.dto.booking;

import com.banvexe.accountmanagement.entity.TicketStatus;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;

public record ManagerTicketStatusRequest(
    @NotNull TicketStatus status,
    @Nullable String ghiChu
) {
}
