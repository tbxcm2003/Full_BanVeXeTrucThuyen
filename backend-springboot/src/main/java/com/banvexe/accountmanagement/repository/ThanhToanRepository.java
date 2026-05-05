package com.banvexe.accountmanagement.repository;

import com.banvexe.accountmanagement.entity.ThanhToan;
import java.util.List;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ThanhToanRepository extends JpaRepository<ThanhToan, Integer> {

    List<ThanhToan> findByVeXe_Id(Integer veXeId);
    List<ThanhToan> findByMaGiaoDich(String maGiaoDich);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select t from ThanhToan t where t.maGiaoDich = :maGiaoDich")
    List<ThanhToan> findByMaGiaoDichForUpdate(@Param("maGiaoDich") String maGiaoDich);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("DELETE FROM ThanhToan t WHERE t.veXe.id = :veId")
    void deleteByVeId(@Param("veId") Integer veId);
}
