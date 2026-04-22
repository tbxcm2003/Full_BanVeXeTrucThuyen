package com.banvexe.accountmanagement.service.booking;

import com.banvexe.accountmanagement.dto.booking.CreateTripRequest;
import com.banvexe.accountmanagement.dto.booking.TripDetailDto;
import com.banvexe.accountmanagement.dto.booking.UpdateTripRequest;
import com.banvexe.accountmanagement.entity.ChuyenXe;
import com.banvexe.accountmanagement.entity.RouteStatus;
import com.banvexe.accountmanagement.entity.TripRunStatus;
import com.banvexe.accountmanagement.entity.TuyenXe;
import com.banvexe.accountmanagement.entity.VeXe;
import com.banvexe.accountmanagement.entity.Xe;
import com.banvexe.accountmanagement.repository.ChiTietVeRepository;
import com.banvexe.accountmanagement.repository.ChuyenXeRepository;
import com.banvexe.accountmanagement.repository.ThanhToanRepository;
import com.banvexe.accountmanagement.repository.TuyenXeRepository;
import com.banvexe.accountmanagement.repository.VeXeRepository;
import com.banvexe.accountmanagement.repository.XeRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ManagerTripService {

    private final ChuyenXeRepository chuyenXeRepository;
    private final TuyenXeRepository tuyenXeRepository;
    private final XeRepository xeRepository;
    private final VeXeRepository veXeRepository;
    private final ThanhToanRepository thanhToanRepository;
    private final ChiTietVeRepository chiTietVeRepository;
    private final BookingCatalogService bookingCatalogService;

    public ManagerTripService(
        ChuyenXeRepository chuyenXeRepository,
        TuyenXeRepository tuyenXeRepository,
        XeRepository xeRepository,
        VeXeRepository veXeRepository,
        ThanhToanRepository thanhToanRepository,
        ChiTietVeRepository chiTietVeRepository,
        BookingCatalogService bookingCatalogService
    ) {
        this.chuyenXeRepository = chuyenXeRepository;
        this.tuyenXeRepository = tuyenXeRepository;
        this.xeRepository = xeRepository;
        this.veXeRepository = veXeRepository;
        this.thanhToanRepository = thanhToanRepository;
        this.chiTietVeRepository = chiTietVeRepository;
        this.bookingCatalogService = bookingCatalogService;
    }

    @Transactional(readOnly = true)
    public List<TripDetailDto> listAll() {
        return chuyenXeRepository.findAllWithTuyenAndXe().stream()
            .map(c -> toDetail(c, bookingCatalogService.countAvailableSeats(c)))
            .toList();
    }

    @Transactional
    public TripDetailDto create(CreateTripRequest req) {
        TuyenXe tuyen = tuyenXeRepository.findById(req.tuyenXeId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tuyến"));
        if (tuyen.getTrangThai() != RouteStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tuyến không hoạt động");
        }
        Xe xe = xeRepository.findById(req.xeId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy xe"));
        validateDeparture(req.ngayDi(), req.gioDi());

        ChuyenXe c = new ChuyenXe();
        c.setTuyenXe(tuyen);
        c.setXe(xe);
        c.setNgayDi(req.ngayDi());
        c.setGioDi(req.gioDi());
        c.setGiaVe(req.giaVe());
        c.setTrangThai(TripRunStatus.CHUA_KHOI_HANH);
        chuyenXeRepository.save(c);
        ChuyenXe full = chuyenXeRepository.findByIdWithDetails(c.getId()).orElse(c);
        return toDetail(full, bookingCatalogService.countAvailableSeats(full));
    }

    @Transactional
    public TripDetailDto update(Integer id, UpdateTripRequest req) {
        ChuyenXe c = chuyenXeRepository.findByIdWithDetails(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy chuyến"));
        TuyenXe tuyen = tuyenXeRepository.findById(req.tuyenXeId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tuyến"));
        Xe xe = xeRepository.findById(req.xeId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy xe"));
        validateDeparture(req.ngayDi(), req.gioDi());
        c.setTuyenXe(tuyen);
        c.setXe(xe);
        c.setNgayDi(req.ngayDi());
        c.setGioDi(req.gioDi());
        c.setGiaVe(req.giaVe());
        c.setTrangThai(req.trangThai());
        chuyenXeRepository.save(c);
        ChuyenXe full = chuyenXeRepository.findByIdWithDetails(c.getId()).orElse(c);
        return toDetail(full, bookingCatalogService.countAvailableSeats(full));
    }

    /**
     * Xóa bản ghi chuyến khỏi CSDL. Trước đó gỡ vé liên quan: bản ghi thanh toán, vé (chi tiết ghế
     * theo bảng ChiTietVe thường cascade khi xóa VeXe tùy cấu hình FK; xóa thủ công nếu cần).
     */
    @Transactional
    public void deleteTrip(Integer id) {
        ChuyenXe c = chuyenXeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy chuyến"));
        List<VeXe> veList = veXeRepository.findByChuyenXe_Id(c.getId());
        for (VeXe ve : veList) {
            thanhToanRepository.deleteByVeId(ve.getId());
            chiTietVeRepository.deleteByVeId(ve.getId());
            veXeRepository.delete(ve);
        }
        chuyenXeRepository.delete(c);
    }

    private void validateDeparture(LocalDate ngay, java.time.LocalTime gio) {
        LocalDateTime dep = LocalDateTime.of(ngay, gio);
        if (!dep.isAfter(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ngày giờ khởi hành phải trong tương lai");
        }
    }

    private TripDetailDto toDetail(ChuyenXe c, int soGheTrong) {
        TuyenXe t = c.getTuyenXe();
        Xe x = c.getXe();
        if (t == null || x == null) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Chuyến #" + c.getId() + " thiếu tuyến hoặc xe (TuyenXe/Xe). Kiểm tra FK trong ChuyenXe."
            );
        }
        // TripDetailDto.tongSoGhe là int; Xe.soGhe là Integer — null sẽ NPE khi unbox
        int tongGhe = (x.getSoGhe() != null) ? x.getSoGhe() : 0;
        return new TripDetailDto(
            c.getId(),
            t.getId(),
            nn(t.getTenTuyen()),
            nn(t.getDiemDi()),
            nn(t.getDiemDen()),
            c.getNgayDi(),
            c.getGioDi(),
            c.getGiaVe(),
            x.getId(),
            nn(x.getLoaiXe()),
            nn(x.getBienSo()),
            tongGhe,
            soGheTrong,
            c.getTrangThai() != null ? c.getTrangThai().name() : "UNKNOWN"
        );
    }

    private static String nn(String s) {
        return s != null ? s : "";
    }
}
