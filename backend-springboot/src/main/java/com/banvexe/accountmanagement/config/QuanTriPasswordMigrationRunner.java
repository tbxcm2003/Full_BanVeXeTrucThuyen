package com.banvexe.accountmanagement.config;

import com.banvexe.accountmanagement.entity.UserAccount;
import com.banvexe.accountmanagement.entity.UserAccount.UserRole;
import com.banvexe.accountmanagement.repository.UserAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Cập nhật mật khẩu tài khoản QUAN_TRI từ hash cũ (ví dụ MD5 32 ký tự) sang BCrypt để đăng nhập được bằng /api/auth/login.
 */
@Component
@Order(0)
public class QuanTriPasswordMigrationRunner implements CommandLineRunner {

    private static final String DEFAULT_PLAIN = "123456";

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public QuanTriPasswordMigrationRunner(
        UserAccountRepository userAccountRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        userAccountRepository.findAll().stream()
            .filter(u -> u.getRole() == UserRole.QUAN_TRI)
            .forEach(this::upgradeIfPlainMd5);
    }

    private void upgradeIfPlainMd5(UserAccount u) {
        String h = u.getPasswordHash();
        if (!StringUtils.hasText(h) || h.startsWith("$2a$") || h.startsWith("$2b$")) {
            return;
        }
        if (h.length() == 32 && h.matches("^[0-9a-fA-F]{32}$")) {
            u.setPasswordHash(passwordEncoder.encode(DEFAULT_PLAIN));
            userAccountRepository.save(u);
        }
    }
}
