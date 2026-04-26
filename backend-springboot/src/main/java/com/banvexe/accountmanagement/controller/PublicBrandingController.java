package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.BrandingResponse;
import com.banvexe.accountmanagement.service.SiteBrandingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicBrandingController {

    private final SiteBrandingService siteBrandingService;

    public PublicBrandingController(SiteBrandingService siteBrandingService) {
        this.siteBrandingService = siteBrandingService;
    }

    @GetMapping("/branding")
    public ResponseEntity<BrandingResponse> getBranding() {
        return ResponseEntity.ok(siteBrandingService.getPublicBranding());
    }
}
