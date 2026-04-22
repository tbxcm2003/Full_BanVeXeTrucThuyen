package com.banvexe.accountmanagement.service.booking;

import com.banvexe.accountmanagement.dto.booking.CreateVehicleRequest;
import com.banvexe.accountmanagement.dto.booking.UpdateVehicleRequest;
import com.banvexe.accountmanagement.dto.booking.VehicleSummaryDto;
import com.banvexe.accountmanagement.entity.Xe;
import com.banvexe.accountmanagement.repository.ChuyenXeRepository;
import com.banvexe.accountmanagement.repository.XeRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ManagerVehicleService {

    private static final Logger log = LoggerFactory.getLogger(ManagerVehicleService.class);

    private final XeRepository xeRepository;
    private final ChuyenXeRepository chuyenXeRepository;

    public ManagerVehicleService(XeRepository xeRepository, ChuyenXeRepository chuyenXeRepository) {
        this.xeRepository = xeRepository;
        this.chuyenXeRepository = chuyenXeRepository;
    }

    @Transactional(readOnly = true)
    public List<VehicleSummaryDto> listVehicles() {
        try {
            return xeRepository.findAllVehicleScalarRows().stream()
                .map(ManagerVehicleService::rowToVehicle)
                .toList();
        } catch (Exception e) {
            log.warn("Ne native SQL liet ke Xe (ten bang/kieu co the khac tren CSDL): {} — fallback JPA findAll.", e.getMessage());
            return xeRepository.findAll().stream()
                .map(this::toDto)
                .toList();
        }
    }

    @Transactional
    public VehicleSummaryDto create(CreateVehicleRequest request) {
        String bs = request.bienSo().trim();
        if (xeRepository.existsByBienSo(bs)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Biển số đã tồn tại");
        }
        Xe x = new Xe();
        x.setBienSo(bs);
        x.setLoaiXe(request.loaiXe().trim());
        x.setSoGhe(request.soGhe());
        xeRepository.save(x);
        return toDto(x);
    }

    @Transactional
    public VehicleSummaryDto update(Integer id, UpdateVehicleRequest request) {
        Xe x = xeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy xe"));
        String bs = request.bienSo().trim();
        if (xeRepository.existsByBienSoAndIdNot(bs, id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Biển số đã được sử dụng");
        }
        x.setBienSo(bs);
        x.setLoaiXe(request.loaiXe().trim());
        x.setSoGhe(request.soGhe());
        xeRepository.save(x);
        return toDto(x);
    }

    @Transactional
    public void delete(Integer id) {
        if (!xeRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy xe");
        }
        if (chuyenXeRepository.countChuyenByXeId(id) > 0) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Không thể xóa xe đang gắn với chuyến. Hãy xóa hoặc điều chỉnh chuyến trước."
            );
        }
        xeRepository.deleteById(id);
    }

    private static VehicleSummaryDto rowToVehicle(Object[] r) {
        return new VehicleSummaryDto(
            r[0] != null ? ((Number) r[0]).intValue() : null,
            r[1] != null ? (String) r[1] : "",
            r[2] != null ? (String) r[2] : "",
            r[3] != null ? ((Number) r[3]).intValue() : 0
        );
    }

    private VehicleSummaryDto toDto(Xe x) {
        // soGhe là int trong DTO; nếu DB/JPA trả về Integer null, unbox null → NPE
        int seats = (x.getSoGhe() != null) ? x.getSoGhe() : 0;
        return new VehicleSummaryDto(
            x.getId(),
            x.getBienSo() != null ? x.getBienSo() : "",
            x.getLoaiXe() != null ? x.getLoaiXe() : "",
            seats
        );
    }
}
