package com.banvexe.accountmanagement.controller;

import com.banvexe.accountmanagement.dto.ApiResponse;
import com.banvexe.accountmanagement.dto.booking.CustomerTicketDto;
import com.banvexe.accountmanagement.dto.booking.GuestBookTicketRequest;
import com.banvexe.accountmanagement.dto.booking.GuestPayTicketRequest;
import com.banvexe.accountmanagement.dto.booking.PublicTicketLookupDto;
import com.banvexe.accountmanagement.service.booking.CustomerTicketService;
import jakarta.validation.Valid;
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

    public PublicBookingController(CustomerTicketService customerTicketService) {
        this.customerTicketService = customerTicketService;
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
}