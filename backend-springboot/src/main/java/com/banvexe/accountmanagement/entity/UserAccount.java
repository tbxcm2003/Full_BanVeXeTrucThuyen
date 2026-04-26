package com.banvexe.accountmanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tai_khoan")
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "khach_hang_id", unique = true)
    private KhachHang khachHang;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "so_dien_thoai", unique = true, length = 15)
    private String phone;

    @Column(name = "mat_khau", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "ho_ten", length = 100)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "vai_tro", columnDefinition = "ENUM('KHACH_HANG', 'NHAN_VIEN', 'QUAN_TRI')")
    private UserRole role = UserRole.KHACH_HANG;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", columnDefinition = "ENUM('ACTIVE', 'INACTIVE', 'DELETED')")
    private AccountStatus status = AccountStatus.ACTIVE;

    @Column(name = "anh_dai_dien_url", length = 512)
    private String avatarUrl;

    public enum UserRole {
        KHACH_HANG, NHAN_VIEN, QUAN_TRI
    }
}
