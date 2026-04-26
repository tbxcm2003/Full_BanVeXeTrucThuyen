package com.banvexe.accountmanagement.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CloudinaryImageService {

    private static final String NO_CONFIG =
        "Chưa cấu hình Cloudinary. Đặt CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.";

    private final ObjectProvider<Cloudinary> cloudinary;

    public CloudinaryImageService(ObjectProvider<Cloudinary> cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadOrReplaceImage(MultipartFile file, String publicId) {
        Cloudinary c = cloudinary.getIfAvailable();
        if (c == null) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, NO_CONFIG);
        }
        validateImage(file);
        if (publicId == null || publicId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Thiếu public_id.");
        }
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = c.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                    "public_id", publicId.trim(),
                    "overwrite", true,
                    "unique_filename", false,
                    "invalidate", true,
                    "resource_type", "image"));
            return requireSecureUrl(result);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Upload thất bại: " + e.getMessage());
        }
    }

    private static void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Thiếu file ảnh.");
        }
        String ct = file.getContentType();
        if (ct == null || !ct.startsWith("image/")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chỉ chấp nhận file ảnh.");
        }
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ảnh tối đa 5MB.");
        }
    }

    private static String requireSecureUrl(Map<String, Object> result) {
        String url = (String) result.get("secure_url");
        if (url == null || url.isBlank()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cloudinary không trả URL.");
        }
        return url;
    }
}
