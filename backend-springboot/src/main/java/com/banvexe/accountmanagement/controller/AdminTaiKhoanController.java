package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.ApiResponse;
import com.banvexe.accountmanagement.dto.CustomerSummaryResponse;
import com.banvexe.accountmanagement.dto.PageResponse;
import com.banvexe.accountmanagement.service.AdminAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Danh sách tài khoản ({@code tai_khoan}) theo bối cảnh quản lý, bổ sung so với
 * {@code /api/admin/customers} (bảng hồ sơ / KhachHang) — dùng cho tab tài khoản khách.
 */
@RestController
@RequestMapping("/api/admin/tai-khoan")
@PreAuthorize("hasRole('QUAN_TRI')")
public class AdminTaiKhoanController {

    private final AdminAccountService adminAccountService;

    public AdminTaiKhoanController(AdminAccountService adminAccountService) {
        this.adminAccountService = adminAccountService;
    }

    /** Tài khoản khách hàng: bảng {@code tai_khoan} (role KHACH_HANG), bắt buộc có hồ sơ gắn. */
    @GetMapping("/danh-sach-khach")
    public ResponseEntity<ApiResponse<PageResponse<CustomerSummaryResponse>>> listCustomerAccounts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String search
    ) {
        PageResponse<CustomerSummaryResponse> data = adminAccountService.listCustomerTaiKhoan(search, page, size);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
