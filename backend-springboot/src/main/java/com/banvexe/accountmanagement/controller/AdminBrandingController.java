package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.ApiResponse;
import com.banvexe.accountmanagement.dto.BrandingResponse;
import com.banvexe.accountmanagement.service.SiteBrandingService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/branding")
@PreAuthorize("hasRole('QUAN_TRI')")
public class AdminBrandingController {

    private final SiteBrandingService siteBrandingService;

    public AdminBrandingController(SiteBrandingService siteBrandingService) {
        this.siteBrandingService = siteBrandingService;
    }

    @PostMapping(value = "/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<BrandingResponse>> uploadLogo(@RequestParam("file") MultipartFile file) {
        BrandingResponse data = siteBrandingService.uploadLogo(file);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật logo (Cloudinary + CSDL).", data));
    }

    @PostMapping(value = "/banner", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<BrandingResponse>> uploadBanner(@RequestParam("file") MultipartFile file) {
        BrandingResponse data = siteBrandingService.uploadBanner(file);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật banner (Cloudinary + CSDL).", data));
    }
}
