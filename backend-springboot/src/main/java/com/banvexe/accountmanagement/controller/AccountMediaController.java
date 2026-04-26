package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.ApiResponse;
import com.banvexe.accountmanagement.dto.ImageUploadResponse;
import com.banvexe.accountmanagement.service.UserAvatarService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/accounts/me")
public class AccountMediaController {

    private final UserAvatarService userAvatarService;

    public AccountMediaController(UserAvatarService userAvatarService) {
        this.userAvatarService = userAvatarService;
    }

    @PostMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ImageUploadResponse>> uploadAvatar(
        Authentication authentication,
        @RequestParam("file") MultipartFile file) {
        ImageUploadResponse data = userAvatarService.uploadAvatar(authentication.getName(), file);
        return ResponseEntity.ok(ApiResponse.success("Đã tải ảnh lên. URL đã lưu vào hồ sơ.", data));
    }
}
