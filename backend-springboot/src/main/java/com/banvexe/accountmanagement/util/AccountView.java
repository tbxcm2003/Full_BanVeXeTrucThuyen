package com.banvexe.accountmanagement.util;

import com.banvexe.accountmanagement.entity.UserAccount;
import com.banvexe.accountmanagement.entity.UserAccount.UserRole;

public final class AccountView {

    private AccountView() {
    }

    public static Integer publicId(UserAccount u) {
        if (u.getRole() == UserRole.KHACH_HANG && u.getKhachHang() != null) {
            return u.getKhachHang().getId();
        }
        return u.getId();
    }

    public static String fullName(UserAccount u) {
        if (u.getKhachHang() != null) {
            return u.getKhachHang().getFullName();
        }
        return u.getFullName() != null ? u.getFullName() : "";
    }

    public static String phone(UserAccount u) {
        if (u.getKhachHang() != null) {
            return u.getKhachHang().getPhone();
        }
        return u.getPhone();
    }
}
