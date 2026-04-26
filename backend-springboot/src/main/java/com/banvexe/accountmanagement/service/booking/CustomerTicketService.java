package com.banvexe.accountmanagement.service.booking;

import com.banvexe.accountmanagement.dto.booking.BookTicketRequest;
import com.banvexe.accountmanagement.dto.booking.CustomerTicketDto;
import com.banvexe.accountmanagement.dto.booking.GuestBookTicketRequest;
import com.banvexe.accountmanagement.dto.booking.GuestPayTicketRequest;
import com.banvexe.accountmanagement.dto.booking.PayTicketRequest;
import com.banvexe.accountmanagement.dto.booking.PublicTicketLookupDto;
import com.banvexe.accountmanagement.dto.booking.TripSummaryDto;
import com.banvexe.accountmanagement.entity.AccountStatus;
import com.banvexe.accountmanagement.entity.ChiTietVe;
import com.banvexe.accountmanagement.entity.ChuyenXe;
import com.banvexe.accountmanagement.entity.PaymentTxnStatus;
import com.banvexe.accountmanagement.entity.ThanhToan;
import com.banvexe.accountmanagement.entity.TicketStatus;
import com.banvexe.accountmanagement.entity.TripRunStatus;
import com.banvexe.accountmanagement.entity.UserAccount;
import com.banvexe.accountmanagement.entity.VeXe;
import com.banvexe.accountmanagement.repository.ChiTietVeRepository;
import com.banvexe.accountmanagement.repository.ChuyenXeRepository;
import com.banvexe.accountmanagement.repository.ThanhToanRepository;
import com.banvexe.accountmanagement.repository.UserAccountRepository;
import com.banvexe.accountmanagement.repository.VeXeRepository;
import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CustomerTicketService {

    private final VeXeRepository veXeRepository;
    private final ChuyenXeRepository chuyenXeRepository;
    private final ChiTietVeRepository chiTietVeRepository;
    private final ThanhToanRepository thanhToanRepository;
    private final UserAccountRepository userAccountRepository;
    private final BookingCatalogService bookingCatalogService;
    private final PasswordEncoder passwordEncoder;

    public CustomerTicketService(
        VeXeRepository veXeRepository,
        ChuyenXeRepository chuyenXeRepository,
        ChiTietVeRepository chiTietVeRepository,
        ThanhToanRepository thanhToanRepository,
        UserAccountRepository userAccountRepository,
        BookingCatalogService bookingCatalogService,
        PasswordEncoder passwordEncoder
    ) {
        this.veXeRepository = veXeRepository;
        this.chuyenXeRepository = chuyenXeRepository;
        this.chiTietVeRepository = chiTietVeRepository;
        this.thanhToanRepository = thanhToanRepository;
        this.userAccountRepository = userAccountRepository;
        this.bookingCatalogService = bookingCatalogService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public CustomerTicketDto book(String email, BookTicketRequest req) {
        var user = userAccountRepository.findByEmail(normalizeEmail(email))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));
        return bookForUser(user, req.chuyenXeId(), req.maGhe(), req.ghiChu());
    }

    @Transactional
    public CustomerTicketDto bookGuest(GuestBookTicketRequest req) {
        UserAccount user = resolveOrCreateGuest(req.email(), req.soDienThoai(), req.hoTen());
        return bookForUser(user, req.chuyenXeId(), req.maGhe(), req.ghiChu());
    }

    private CustomerTicketDto bookForUser(UserAccount user, Integer chuyenXeId, List<String> rawSeats, String ghiChu) {
        ChuyenXe chuyen = chuyenXeRepository.findByIdWithDetails(chuyenXeId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy chuyến xe"));

        if (chuyen.getTrangThai() != TripRunStatus.CHUA_KHOI_HANH) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chuyến không mở bán vé");
        }
        LocalDateTime dep = LocalDateTime.of(chuyen.getNgayDi(), chuyen.getGioDi());
        if (!dep.isAfter(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chuyến đã khởi hành hoặc hết hạn đặt");
        }

        List<String> seats = rawSeats.stream()
            .map(s -> BookingCatalogService.normalizeSeatCode(chuyen, s))
            .filter(s -> s != null && !s.isBlank())
            .distinct()
            .toList();
        if (seats.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chọn ít nhất một ghế");
        }

        int cap = Math.max(0, BookingCatalogService.safeTongGhe(chuyen));
        if (cap < 1) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Chuyến hoặc xe thiếu số ghế; không thể đặt vé."
            );
        }
        Set<String> allowed = new HashSet<>(BookingCatalogService.generateSeatLabels(chuyen));
        for (String s : seats) {
            if (!allowed.contains(s)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mã ghế không hợp lệ: " + s);
            }
        }

        List<String> occupied = chiTietVeRepository.findOccupiedSeatCodes(chuyen.getId(), BookingCatalogService.STATUSES_BLOCKING_SEAT);
        for (String s : seats) {
            if (occupied.contains(s)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Ghế đã được đặt: " + s);
            }
        }

        BigDecimal tong = chuyen.getGiaVe().multiply(BigDecimal.valueOf(seats.size()));
        VeXe ve = new VeXe();
        ve.setMaVe(generateMaVe());
        ve.setKhachHangId(user.getId());
        ve.setChuyenXe(chuyen);
        ve.setNgayDat(Instant.now());
        ve.setSoLuongGhe(seats.size());
        ve.setTongTien(tong);
        ve.setTrangThai(TicketStatus.CHO_THANH_TOAN);
        ve.setGhiChu(ghiChu);
        veXeRepository.save(ve);

        for (String seat : seats) {
            ChiTietVe ct = new ChiTietVe();
            ct.setVeXe(ve);
            ct.setSoGhe(seat);
            chiTietVeRepository.save(ct);
        }

        return toCustomerDto(veXeRepository.findByIdWithDetails(ve.getId()).orElse(ve));
    }

    @Transactional
    public void pay(String email, Integer ticketId, PayTicketRequest req) {
        var user = userAccountRepository.findByEmail(normalizeEmail(email))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));
        payForUser(user, ticketId, req.phuongThuc(), req.dongYDieuKhoan());
    }

    @Transactional
    public void payGuest(Integer ticketId, GuestPayTicketRequest req) {
        UserAccount user = resolveGuestByEmailPhone(req.email(), req.soDienThoai());
        payForUser(user, ticketId, req.phuongThuc(), req.dongYDieuKhoan());
    }

    private void payForUser(UserAccount user, Integer ticketId, com.banvexe.accountmanagement.entity.PaymentMethod paymentMethod, Boolean agreeTerms) {
        if (!Boolean.TRUE.equals(agreeTerms)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phải đồng ý điều khoản để thanh toán");
        }
        VeXe ve = veXeRepository.findByIdWithDetails(ticketId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy vé"));

        if (!ve.getKhachHangId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Không phải vé của bạn");
        }
        if (ve.getTrangThai() != TicketStatus.CHO_THANH_TOAN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vé không ở trạng thái chờ thanh toán");
        }

        ThanhToan tt = new ThanhToan();
        tt.setVeXe(ve);
        tt.setSoTien(ve.getTongTien());
        tt.setPhuongThuc(paymentMethod);
        tt.setMaGiaoDich("MOCK-" + UUID.randomUUID().toString().substring(0, 12));
        tt.setTrangThai(PaymentTxnStatus.THANH_CONG);
        tt.setNgayThanhToan(Instant.now());
        thanhToanRepository.save(tt);

        ve.setTrangThai(TicketStatus.DA_THANH_TOAN);
        veXeRepository.save(ve);
    }

    public List<CustomerTicketDto> myTickets(String email) {
        var user = userAccountRepository.findByEmail(normalizeEmail(email))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));
        return veXeRepository.findAllByKhachHangIdWithRoute(user.getId()).stream()
            .map(this::toCustomerDto)
            .toList();
    }

    public CustomerTicketDto getMyTicket(String email, Integer ticketId) {
        var user = userAccountRepository.findByEmail(normalizeEmail(email))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));
        VeXe ve = veXeRepository.findByIdAndKhachHangId(ticketId, user.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy vé"));
        return toCustomerDto(veXeRepository.findByIdWithDetails(ve.getId()).orElse(ve));
    }

    public PublicTicketLookupDto lookupGuestTicket(String rawPhone, String rawMaVe) {
        String phone = normalizePhone(rawPhone);
        String maVe = rawMaVe == null ? "" : rawMaVe.trim();
        if (phone.isBlank() || maVe.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vui lòng nhập số điện thoại và mã vé");
        }

        VeXe ve = veXeRepository.findByMaVeIgnoreCase(maVe)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy vé phù hợp"));

        UserAccount user = userAccountRepository.findById(ve.getKhachHangId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy vé phù hợp"));

        if (!phone.equals(normalizePhone(user.getPhone()))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy vé phù hợp");
        }

        VeXe detailed = veXeRepository.findByIdWithDetails(ve.getId()).orElse(ve);
        return toPublicLookupDto(detailed, user);
    }

    @Transactional
    public void cancelOrRequestCancel(String email, Integer ticketId) {
        var user = userAccountRepository.findByEmail(normalizeEmail(email))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));
        VeXe ve = veXeRepository.findByIdAndKhachHangId(ticketId, user.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy vé"));

        if (ve.getTrangThai() == TicketStatus.CHO_THANH_TOAN) {
            Duration since = Duration.between(ve.getNgayDat(), Instant.now());
            if (since.toHours() > 2) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quá 2 giờ kể từ đặt vé, không thể tự hủy vé chờ thanh toán");
            }
            ve.setTrangThai(TicketStatus.DA_HUY);
            veXeRepository.save(ve);
            return;
        }
        if (ve.getTrangThai() == TicketStatus.DA_THANH_TOAN) {
            ve.setTrangThai(TicketStatus.DANG_XU_LY);
            ve.setGhiChu(trimNote(ve.getGhiChu()) + " [Yêu cầu hủy vé chờ nhân viên duyệt]");
            veXeRepository.save(ve);
            return;
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vé không thể hủy ở trạng thái hiện tại");
    }

    private String trimNote(String g) {
        return g == null ? "" : g;
    }

    private String generateMaVe() {
        return "VX" + System.currentTimeMillis() % 1_000_000_000L + UUID.randomUUID().toString().substring(0, 4).toUpperCase(Locale.ROOT);
    }

    private CustomerTicketDto toCustomerDto(VeXe ve) {
        ChuyenXe c = ve.getChuyenXe();
        if (c == null) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Vé #" + ve.getId() + " thiếu thông tin chuyến."
            );
        }
        var t = c.getTuyenXe();
        var x = c.getXe();
        int trong = bookingCatalogService.countAvailableSeats(c);
        int tongGhe = BookingCatalogService.safeTongGhe(c);
        Integer thoiGianDuKienPhut = t != null ? t.getThoiGianDuKien() : null;
        var gioDenDuKien = (thoiGianDuKienPhut != null && c.getGioDi() != null)
            ? c.getGioDi().plusMinutes(thoiGianDuKienPhut)
            : null;
        TripSummaryDto trip = new TripSummaryDto(
            c.getId(),
            t != null ? t.getTenTuyen() : "",
            t != null ? t.getDiemDi() : "",
            t != null ? t.getDiemDen() : "",
            c.getNgayDi(),
            c.getGioDi(),
            gioDenDuKien,
            thoiGianDuKienPhut,
            t != null ? t.getKhoangCach() : null,
            c.getGiaVe(),
            x != null ? x.getLoaiXe() : "",
            x != null ? x.getBienSo() : "",
            tongGhe,
            trong,
            c.getTrangThai() != null ? c.getTrangThai().name() : "UNKNOWN"
        );
        List<String> seats = chiTietVeRepository.findByVeXeId(ve.getId()).stream()
            .map(ChiTietVe::getSoGhe)
            .toList();
        return new CustomerTicketDto(
            ve.getId(),
            ve.getMaVe(),
            ve.getTrangThai(),
            ve.getTongTien(),
            ve.getNgayDat(),
            ve.getGhiChu(),
            seats,
            trip
        );
    }

    private PublicTicketLookupDto toPublicLookupDto(VeXe ve, UserAccount user) {
        CustomerTicketDto base = toCustomerDto(ve);
        return new PublicTicketLookupDto(
            base.id(),
            base.maVe(),
            base.trangThai(),
            base.tongTien(),
            base.ngayDat(),
            base.ghiChu(),
            user.getFullName(),
            user.getPhone(),
            user.getEmail(),
            base.maGhe(),
            base.chuyen()
        );
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizePhone(String phone) {
        return phone == null ? "" : phone.trim().replace(" ", "");
    }

    private String normalizeName(String fullName) {
        return fullName == null ? "" : fullName.trim();
    }

    private UserAccount resolveOrCreateGuest(String rawEmail, String rawPhone, String rawName) {
        String email = normalizeEmail(rawEmail);
        String phone = normalizePhone(rawPhone);
        String fullName = normalizeName(rawName);

        if (email.isBlank() || phone.isBlank() || fullName.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Thiếu thông tin khách hàng để đặt vé");
        }

        var byEmail = userAccountRepository.findByEmail(email);
        if (byEmail.isPresent()) {
            UserAccount user = byEmail.get();
            if (user.getRole() != UserAccount.UserRole.KHACH_HANG) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email thuộc tài khoản không hợp lệ để đặt vé công khai");
            }
            if (user.getStatus() != AccountStatus.ACTIVE) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Tài khoản khách hàng đang bị khóa");
            }
            if (user.getPhone() != null && !user.getPhone().isBlank() && !normalizePhone(user.getPhone()).equals(phone)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email và số điện thoại không khớp");
            }

            boolean needSave = false;
            if (user.getPhone() == null || user.getPhone().isBlank()) {
                if (userAccountRepository.existsByPhone(phone)) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Số điện thoại đã được sử dụng");
                }
                user.setPhone(phone);
                needSave = true;
            }
            if (user.getFullName() == null || user.getFullName().isBlank()) {
                user.setFullName(fullName);
                needSave = true;
            }
            return needSave ? userAccountRepository.save(user) : user;
        }

        if (userAccountRepository.existsByPhone(phone)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Số điện thoại đã được sử dụng");
        }

        UserAccount guest = new UserAccount();
        guest.setEmail(email);
        guest.setPhone(phone);
        guest.setFullName(fullName);
        guest.setRole(UserAccount.UserRole.KHACH_HANG);
        guest.setStatus(AccountStatus.ACTIVE);
        guest.setPasswordHash(passwordEncoder.encode(UUID.randomUUID().toString()));
        return userAccountRepository.save(guest);
    }

    private UserAccount resolveGuestByEmailPhone(String rawEmail, String rawPhone) {
        String email = normalizeEmail(rawEmail);
        String phone = normalizePhone(rawPhone);
        if (email.isBlank() || phone.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Thiếu thông tin khách hàng để thanh toán");
        }
        UserAccount user = userAccountRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy khách hàng"));
        if (user.getRole() != UserAccount.UserRole.KHACH_HANG) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản không hợp lệ");
        }
        if (user.getStatus() != AccountStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Tài khoản khách hàng đang bị khóa");
        }
        if (user.getPhone() == null || user.getPhone().isBlank() || !normalizePhone(user.getPhone()).equals(phone)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email và số điện thoại không khớp");
        }
        return user;
    }
}
