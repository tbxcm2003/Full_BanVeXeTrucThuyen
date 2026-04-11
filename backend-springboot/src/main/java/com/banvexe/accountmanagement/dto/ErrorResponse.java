package com.banvexe.accountmanagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ErrorResponse(
    @JsonProperty("status") int status,
    @JsonProperty("message") String message,
    @JsonProperty("timestamp") String timestamp
) {
}
