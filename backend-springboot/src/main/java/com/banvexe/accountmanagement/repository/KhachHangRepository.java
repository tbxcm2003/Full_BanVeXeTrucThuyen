package com.banvexe.accountmanagement.repository;

import com.banvexe.accountmanagement.entity.KhachHang;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {

    Optional<KhachHang> findByEmail(String email);

    Optional<KhachHang> findByPhone(String phone);

    boolean existsByPhone(String phone);

    boolean existsByPhoneAndIdNot(String phone, Integer id);

    @Query(
        """
        SELECT k FROM KhachHang k
        WHERE (:q IS NULL OR :q = ''
            OR LOWER(k.fullName) LIKE LOWER(CONCAT('%', :q, '%'))
            OR (k.phone IS NOT NULL AND k.phone LIKE CONCAT('%', :q, '%'))
            OR LOWER(k.email) LIKE LOWER(CONCAT('%', :q, '%')))
        """
    )
    Page<KhachHang> searchByKeyword(@Param("q") String q, Pageable pageable);
}
