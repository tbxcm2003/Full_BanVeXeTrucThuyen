package com.banvexe.accountmanagement.service.booking;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.banvexe.accountmanagement.entity.TicketStatus;
import com.banvexe.accountmanagement.entity.VeXe;
import com.banvexe.accountmanagement.repository.VeXeRepository;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings("null")
class TicketHoldTimeoutSchedulerTest {

    @Mock
    private VeXeRepository veXeRepository;

    @Test
    void cancelExpiredPendingTickets_updatesStatusAndNote() {
        VeXe ticket = new VeXe();
        ticket.setTrangThai(TicketStatus.CHO_THANH_TOAN);
        ticket.setNgayDat(Instant.now().minusSeconds(10 * 60));

        when(veXeRepository.findTop200ByTrangThaiAndNgayDatBeforeOrderByNgayDatAsc(
            any(TicketStatus.class), any(Instant.class))
        ).thenReturn(List.of(ticket));

        TicketHoldTimeoutScheduler scheduler = new TicketHoldTimeoutScheduler(veXeRepository, 5);
        scheduler.cancelExpiredPendingTickets();

        assertThat(ticket.getTrangThai()).isEqualTo(TicketStatus.DA_HUY);
        assertThat(ticket.getGhiChu()).contains("quá thời gian giữ chỗ 5 phút");
        verify(veXeRepository).saveAll(argThat(saved -> saved != null && saved.iterator().hasNext()));
    }

    @Test
    void cancelExpiredPendingTickets_noExpiredTickets_skipSave() {
        when(veXeRepository.findTop200ByTrangThaiAndNgayDatBeforeOrderByNgayDatAsc(
            any(TicketStatus.class), any(Instant.class))
        ).thenReturn(List.of());

        TicketHoldTimeoutScheduler scheduler = new TicketHoldTimeoutScheduler(veXeRepository, 5);
        scheduler.cancelExpiredPendingTickets();

        verify(veXeRepository, never()).saveAll(argThat(saved -> saved != null && saved.iterator().hasNext()));
    }
}
