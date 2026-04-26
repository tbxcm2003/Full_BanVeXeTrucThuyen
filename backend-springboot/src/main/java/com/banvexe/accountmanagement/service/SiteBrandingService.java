package com.banvexe.accountmanagement.service;

import com.banvexe.accountmanagement.dto.BrandingResponse;
import com.banvexe.accountmanagement.entity.SiteBranding;
import com.banvexe.accountmanagement.repository.SiteBrandingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SiteBrandingService {

    private final SiteBrandingRepository siteBrandingRepository;
    private final CloudinaryImageService cloudinaryImageService;

    public SiteBrandingService(SiteBrandingRepository siteBrandingRepository, CloudinaryImageService cloudinaryImageService) {
        this.siteBrandingRepository = siteBrandingRepository;
        this.cloudinaryImageService = cloudinaryImageService;
    }

    @Transactional(readOnly = true)
    public BrandingResponse getPublicBranding() {
        SiteBranding row = siteBrandingRepository.findById(1).orElse(null);
        if (row == null) {
            return new BrandingResponse(null, null);
        }
        return new BrandingResponse(row.getLogoUrl(), row.getBannerUrl());
    }

    @Transactional
    public BrandingResponse uploadLogo(MultipartFile file) {
        String url = cloudinaryImageService.uploadOrReplaceImage(file, "banvexe/site/logo");
        SiteBranding b = siteBrandingRepository.findById(1).orElseGet(() -> {
            SiteBranding n = new SiteBranding();
            n.setId(1);
            return n;
        });
        b.setLogoUrl(url);
        siteBrandingRepository.save(b);
        return new BrandingResponse(b.getLogoUrl(), b.getBannerUrl());
    }

    @Transactional
    public BrandingResponse uploadBanner(MultipartFile file) {
        String url = cloudinaryImageService.uploadOrReplaceImage(file, "banvexe/site/banner");
        SiteBranding b = siteBrandingRepository.findById(1).orElseGet(() -> {
            SiteBranding n = new SiteBranding();
            n.setId(1);
            return n;
        });
        b.setBannerUrl(url);
        siteBrandingRepository.save(b);
        return new BrandingResponse(b.getLogoUrl(), b.getBannerUrl());
    }
}
