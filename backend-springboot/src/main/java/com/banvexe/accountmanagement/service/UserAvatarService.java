package com.banvexe.accountmanagement.service;

import com.banvexe.accountmanagement.dto.ImageUploadResponse;
import com.banvexe.accountmanagement.entity.UserAccount;
import com.banvexe.accountmanagement.repository.UserAccountRepository;
import java.util.Locale;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserAvatarService {

    private final UserAccountRepository userAccountRepository;
    private final CloudinaryImageService cloudinaryImageService;

    public UserAvatarService(
        UserAccountRepository userAccountRepository,
        CloudinaryImageService cloudinaryImageService) {
        this.userAccountRepository = userAccountRepository;
        this.cloudinaryImageService = cloudinaryImageService;
    }

    @Transactional
    public ImageUploadResponse uploadAvatar(String email, MultipartFile file) {
        UserAccount user = userAccountRepository.findByEmail(normalizeEmail(email))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));

        String url = cloudinaryImageService.uploadOrReplaceImage(file, "banvexe/avatars/u_" + user.getId());

        user.setAvatarUrl(url);
        userAccountRepository.save(user);
        return new ImageUploadResponse(url);
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase(Locale.ROOT);
    }
}
