export type TicketRow = {
  id: number;
  maVe: string;
  trangThai: string;
  tongTien: number | string;
  ngayDat: string;
  emailKhach?: string;
  hoTenKhach?: string;
  ghiChu?: string | null;
  tenTuyen?: string;
  ngayChuyen?: string;
  gioChuyen?: string | { hour?: number; minute?: number };
};

export type PageData = {
  content: TicketRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type TripOption = {
  id: number;
  tenTuyen?: string;
  diemDi?: string;
  diemDen?: string;
  ngayDi?: string;
  bienSo?: string;
};

export type TicketEditFormState = {
  maVe: string;
  khachHangId: string;
  chuyenXeId: string;
  trangThai: string;
  ghiChu: string;
  ngayDatLocal: string;
  tongTienStr: string;
  maGheText: string;
};

export type TicketDetail = {
  id: number;
  maVe: string;
  trangThai: string;
  tongTien: number | string;
  ngayDat: string;
  ghiChu?: string | null;
  khachHangId: number;
  emailKhach?: string;
  hoTenKhach?: string;
  maGhe: string[];
  chuyen: { id: number; tenTuyen?: string; giaVe?: number | string } | null;
};
