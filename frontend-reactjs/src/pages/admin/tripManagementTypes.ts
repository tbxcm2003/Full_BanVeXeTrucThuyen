export type RouteOpt = { id: number; tenTuyen: string; diemDi: string; diemDen: string };

export type VehicleOpt = { id: number; bienSo: string; loaiXe: string; soGhe: number };

export type TripRunStatus = 'CHUA_KHOI_HANH' | 'DANG_CHAY' | 'HOAN_THANH' | 'HUY_CHUYEN';

export type TripRow = {
  id: number;
  tuyenXeId: number;
  tenTuyen: string;
  diemDi: string;
  diemDen: string;
  ngayDi: string;
  gioDi: string | { hour?: number; minute?: number; second?: number };
  giaVe: number | string;
  xeId: number;
  loaiXe: string;
  bienSo: string;
  tongSoGhe: number;
  soGheTrong: number;
  trangThaiChuyen: string;
};

export type TripFormState = {
  tuyenXeId: string;
  xeId: string;
  ngayDi: string;
  gioDi: string;
  giaVe: string;
  trangThai: TripRunStatus;
};
