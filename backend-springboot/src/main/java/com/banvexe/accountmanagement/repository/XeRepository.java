package com.banvexe.accountmanagement.repository;

import com.banvexe.accountmanagement.entity.Xe;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface XeRepository extends JpaRepository<Xe, Integer> {

    boolean existsByBienSo(String bienSo);

    boolean existsByBienSoAndIdNot(String bienSo, Integer id);

    /**
     * Native: không dùng backtick quanh tên bảng — trên MariaDB/Linux backtick + phân biệt hoa thường
     * dễ gây "Table '...' doesn't exist" dù tồn tại bảng (lưu dưới dạng tên thường: xe, vexe).
     */
    @Query(
        value = "SELECT id, COALESCE(bien_so, ''), COALESCE(loai_xe, ''), COALESCE(so_ghe, 0) FROM Xe ORDER BY id",
        nativeQuery = true
    )
    List<Object[]> findAllVehicleScalarRows();
}
