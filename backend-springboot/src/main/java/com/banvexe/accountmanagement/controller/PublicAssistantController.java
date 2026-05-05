package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.ApiResponse;
import com.banvexe.accountmanagement.dto.assistant.AssistantChatRequest;
import com.banvexe.accountmanagement.dto.assistant.AssistantChatResponse;
import com.banvexe.accountmanagement.service.assistant.AssistantChatService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/assistant")
public class PublicAssistantController {

    private final AssistantChatService assistantChatService;

    public PublicAssistantController(AssistantChatService assistantChatService) {
        this.assistantChatService = assistantChatService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<AssistantChatResponse>> chat(@Valid @RequestBody AssistantChatRequest request) {
        AssistantChatResponse response = assistantChatService.chat(request.question());
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
