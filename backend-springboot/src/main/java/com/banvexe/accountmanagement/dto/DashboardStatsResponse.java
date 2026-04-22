package com.banvexe.accountmanagement.dto;

public record DashboardStatsResponse(
    long customers,
    long staff,
    long locked,
    long total,
    long routes,
    long trips,
    long tickets,
    long vehicles
) {
}
