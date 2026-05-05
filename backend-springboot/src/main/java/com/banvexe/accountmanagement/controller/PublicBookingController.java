package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.ApiResponse;
import com.banvexe.accountmanagement.dto.booking.CustomerTicketDto;
import com.banvexe.accountmanagement.dto.booking.CreatePayOsLinkRequest;
import com.banvexe.accountmanagement.dto.booking.GuestCancelTicketRequest;
import com.banvexe.accountmanagement.dto.booking.GuestBookTicketRequest;
import com.banvexe.accountmanagement.dto.booking.GuestPayTicketRequest;
import com.banvexe.accountmanagement.dto.booking.PayOsConfirmRequest;
import com.banvexe.accountmanagement.dto.booking.PayOsConfirmResponse;
import com.banvexe.accountmanagement.dto.booking.PayOsLinkResponse;
import com.banvexe.accountmanagement.dto.booking.PublicTicketLookupDto;
import com.banvexe.accountmanagement.service.booking.CustomerTicketService;
import com.banvexe.accountmanagement.service.booking.PayOsService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/public/booking")
public class PublicBookingController {

    private final CustomerTicketService customerTicketService;
    private final PayOsService payOsService;

    public PublicBookingController(CustomerTicketService customerTicketService, PayOsService payOsService) {
        this.customerTicketService = customerTicketService;
        this.payOsService = payOsService;
    }

    @PostMapping("/tickets")
    public ResponseEntity<ApiResponse<CustomerTicketDto>> book(@Valid @RequestBody GuestBookTicketRequest request) {
        CustomerTicketDto data = customerTicketService.bookGuest(request);
        return ResponseEntity.ok(ApiResponse.success("Đặt vé thành công", data));
    }

    @PostMapping("/tickets/{ticketId}/pay")
    public ResponseEntity<ApiResponse<Void>> pay(
        @PathVariable Integer ticketId,
        @Valid @RequestBody GuestPayTicketRequest request
    ) {
        customerTicketService.payGuest(ticketId, request);
        return ResponseEntity.ok(ApiResponse.success("Thanh toán thành công", null));
    }

    @GetMapping("/tickets/lookup")
    public ResponseEntity<ApiResponse<PublicTicketLookupDto>> lookupTicket(
        @RequestParam("phone") String phone,
        @RequestParam("maVe") String maVe
    ) {
        PublicTicketLookupDto data = customerTicketService.lookupGuestTicket(phone, maVe);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PostMapping("/tickets/cancel")
    public ResponseEntity<ApiResponse<Void>> cancelTicket(@Valid @RequestBody GuestCancelTicketRequest request) {
        String msg = customerTicketService.cancelGuest(request.soDienThoai(), request.maVe());
        return ResponseEntity.ok(ApiResponse.success(msg, null));
    }

    @PostMapping("/payos/create-link")
    public ResponseEntity<ApiResponse<PayOsLinkResponse>> createPayOsLink(
        @Valid @RequestBody CreatePayOsLinkRequest request
    ) {
        var kh = customerTicketService.resolveGuestForPayment(request.email(), request.soDienThoai(), request.hoTen());
        PayOsLinkResponse response = payOsService.createLink(kh, request.ticketIds(), request.hoTen());
        return ResponseEntity.ok(ApiResponse.success("Tạo liên kết thanh toán thành công", response));
    }

    @PostMapping("/payos/confirm")
    public ResponseEntity<ApiResponse<PayOsConfirmResponse>> confirmPayOs(
        @Valid @RequestBody PayOsConfirmRequest request
    ) {
        PayOsConfirmResponse response = payOsService.confirmOrder(request.orderCode());
        return ResponseEntity.ok(ApiResponse.success("Đồng bộ trạng thái thanh toán thành công", response));
    }

    @PostMapping("/payos/webhook")
    public ResponseEntity<ApiResponse<Void>> payOsWebhook(@RequestBody Map<String, Object> payload) {
        payOsService.handleWebhook(payload);
        return ResponseEntity.ok(ApiResponse.success("Webhook processed", null));
    }
}