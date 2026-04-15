package com.banvexe.accountmanagement.dto;

import com.banvexe.accountmanagement.entity.AccountStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateCustomerStatusRequest(
    @NotNull AccountStatus status
) {
}
