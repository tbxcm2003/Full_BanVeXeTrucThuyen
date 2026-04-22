package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.ApiResponse;
import com.banvexe.accountmanagement.dto.DashboardStatsResponse;
import com.banvexe.accountmanagement.service.AdminAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
// @PreAuthorize("hasRole('QUAN_TRI')") // Tạm vô hiệu hóa xác thực để test frontend
public class AdminDashboardController {

    private final AdminAccountService adminAccountService;

    public AdminDashboardController(AdminAccountService adminAccountService) {
        this.adminAccountService = adminAccountService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        DashboardStatsResponse data = adminAccountService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
