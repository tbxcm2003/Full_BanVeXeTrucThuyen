package com.banvexe.accountmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RejectCancelRequest(
    @NotBlank @Size(max = 1000) String lyDo
) {}
