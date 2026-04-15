package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.AdminCustomerDetailResponse;
import com.banvexe.accountmanagement.dto.ApiResponse;
import com.banvexe.accountmanagement.dto.CreateCustomerRequest;
import com.banvexe.accountmanagement.dto.CustomerSummaryResponse;
import com.banvexe.accountmanagement.dto.PageResponse;
import com.banvexe.accountmanagement.dto.UpdateCustomerRequest;
import com.banvexe.accountmanagement.dto.UpdateCustomerStatusRequest;
import com.banvexe.accountmanagement.service.AdminAccountService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/customers")
@PreAuthorize("hasRole('QUAN_TRI')")
public class AdminCustomerController {

    private final AdminAccountService adminAccountService;

    public AdminCustomerController(AdminAccountService adminAccountService) {
        this.adminAccountService = adminAccountService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CustomerSummaryResponse>>> listCustomers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String search
    ) {
        PageResponse<CustomerSummaryResponse> data =
            adminAccountService.listCustomers(search, page, size);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<ApiResponse<AdminCustomerDetailResponse>> getCustomer(
        @PathVariable Integer customerId
    ) {
        AdminCustomerDetailResponse data = adminAccountService.getCustomerDetail(customerId);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CustomerSummaryResponse>> createCustomer(
        @Valid @RequestBody CreateCustomerRequest request
    ) {
        CustomerSummaryResponse data = adminAccountService.createCustomer(request);
        return ResponseEntity.ok(ApiResponse.success("Tạo tài khoản khách hàng thành công", data));
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<ApiResponse<CustomerSummaryResponse>> updateCustomer(
        @PathVariable Integer customerId,
        @Valid @RequestBody UpdateCustomerRequest request
    ) {
        CustomerSummaryResponse data = adminAccountService.updateCustomer(customerId, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật khách hàng thành công", data));
    }

    @PutMapping("/{customerId}/status")
    public ResponseEntity<ApiResponse<Void>> updateCustomerStatus(
        @PathVariable Integer customerId,
        @Valid @RequestBody UpdateCustomerStatusRequest request
    ) {
        adminAccountService.updateCustomerStatus(customerId, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật trạng thái khách hàng thành công", null));
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<ApiResponse<Void>> deleteCustomer(
        @PathVariable Integer customerId
    ) {
        adminAccountService.deleteCustomer(customerId);
        return ResponseEntity.ok(ApiResponse.success("Xóa khách hàng thành công", null));
    }
}
