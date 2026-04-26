package com.banvexe.accountmanagement.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

@Configuration
@Conditional(CloudinaryOnPropertyCondition.class)
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary(
        @Value("${cloudinary.cloud-name:}") String cloudName,
        @Value("${cloudinary.api-key:}") String apiKey,
        @Value("${cloudinary.api-secret:}") String apiSecret) {
        if (!StringUtils.hasText(cloudName) || !StringUtils.hasText(apiKey) || !StringUtils.hasText(apiSecret)) {
            throw new IllegalStateException("Thiếu cấu hình cloudinary (cloud-name, api-key, api-secret).");
        }
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", cloudName.trim(),
            "api_key", apiKey.trim(),
            "api_secret", apiSecret.trim(),
            "secure", true));
    }
}
