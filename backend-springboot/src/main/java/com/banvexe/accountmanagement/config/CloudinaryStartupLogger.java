package com.banvexe.accountmanagement.config;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CloudinaryStartupLogger {

    private final ObjectProvider<Cloudinary> cloudinary;

    @EventListener(ApplicationReadyEvent.class)
    public void onReady() {
        if (cloudinary.getIfAvailable() != null) {
            log.info("Cloudinary: đã cấu hình (upload ảnh bật).");
        } else {
            log.warn("Cloudinary: chưa cấu hình (CLOUDINARY_* trong .env).");
        }
    }
}
