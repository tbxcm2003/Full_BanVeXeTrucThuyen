package com.banvexe.accountmanagement.dto.assistant;

import jakarta.validation.constraints.NotBlank;

public record AssistantChatRequest(
    @NotBlank(message = "Câu hỏi không được để trống")
    String question
) {
}
