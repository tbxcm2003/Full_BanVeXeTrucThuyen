import { useMemo, useState } from 'react';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { getStoredRole, getToken } from '../../auth/storage';

type TripPayload = {
  id: number;
  tenTuyen: string;
  diemDi: string;
  diemDen: string;
  ngayDi: string;
  gioDi: string;
  giaVe: number;
};

type CreatedTicket = {
  id: number;
  maVe: string;
  trangThai: string;
};

type PaymentState = {
  tripType: 'one-way' | 'round-trip';
  customer: {
    fullName: string;
    phone: string;
    email: string;
  };
  createdTickets?: CreatedTicket[];
  outboundTrip?: TripPayload;
  returnTrip?: TripPayload;
  selectedOutboundSeats?: string[];
  selectedReturnSeats?: string[];
  totalOutbound?: number;
  totalReturn?: number;
  totalAmount?: number;
};

type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type PaymentMethodPayload = 'CHUYEN_KHOAN' | 'VI_DIEN_TU' | 'THE';

const MERCHANT_NAME = 'VinaGo';
const BANK_NAME = 'MB Bank';
const BANK_ACCOUNT = '0123456789';

const methods = [
  'Thanh toán VietQR',
  'ZaloPay',
  'VNPAY',
  'ShopeePay',
  'MoMo',
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);

const formatDateTime = (trip?: TripPayload) => {
  if (!trip) return '';
  const [y, m, d] = (trip.ngayDi || '').split('-');
  return `${trip.gioDi?.slice(0, 5) || '--:--'} ${d && m && y ? `${d}/${m}/${y}` : ''}`.trim();
};

const toPaymentMethodPayload = (method: string): PaymentMethodPayload => {
  if (method === 'Thanh toán VietQR') return 'CHUYEN_KHOAN';
  return 'VI_DIEN_TU';
};

const toQrAppCode = (method: string) => {
  if (method === 'Thanh toán VietQR') return 'vietqr';
  if (method === 'ZaloPay') return 'zalopay';
  if (method === 'VNPAY') return 'vnpay';
  if (method === 'ShopeePay') return 'shopeepay';
  if (method === 'MoMo') return 'momo';
  return 'vietqr';
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as PaymentState;
  const [method, setMethod] = useState('Thanh toán VietQR');
  const [dangThanhToan, setDangThanhToan] = useState(false);

  const totalAmount = Number(state.totalAmount || 0);
  const totalOutbound = Number(state.totalOutbound || 0);
  const totalReturn = Number(state.totalReturn || 0);
  const seatsOut = state.selectedOutboundSeats ?? [];
  const seatsReturn = state.selectedReturnSeats ?? [];

  const title = useMemo(() => {
    if (!state.outboundTrip) return 'Thanh toán';
    return state.outboundTrip.tenTuyen || `${state.outboundTrip.diemDi} - ${state.outboundTrip.diemDen}`;
  }, [state.outboundTrip]);

  if (!state.customer || !state.outboundTrip || !state.createdTickets?.length) {
    return (
      <div className="min-h-[65vh] bg-[#f3f3f5] px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-800">Không có dữ liệu thanh toán. Vui lòng đặt vé và bấm Thanh toán ở trang đặt vé.</p>
          <button type="button" onClick={() => navigate('/')} className="mt-5 rounded-full bg-[#ef5222] px-6 py-2 text-sm font-semibold text-white hover:bg-[#d84a1e]">
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const ticketCodes = (state.createdTickets ?? []).map((t) => t.maVe).filter(Boolean);
  const shortTicketRef = ticketCodes.join('-').slice(0, 30);
  const transferNote = `TT ${shortTicketRef || 'BOOKING'} ${state.customer.phone}`.slice(0, 60);

  const qrData = useMemo(() => {
    if (method === 'Thanh toán VietQR') {
      return [
        'PAYMENT',
        `merchant=${MERCHANT_NAME}`,
        `bank=${BANK_NAME}`,
        `account=${BANK_ACCOUNT}`,
        `amount=${Math.max(0, Math.round(totalAmount))}`,
        `note=${transferNote}`,
      ].join('|');
    }

    return [
      'PAYMENT',
      `provider=${toQrAppCode(method)}`,
      `merchant=${MERCHANT_NAME}`,
      `amount=${Math.max(0, Math.round(totalAmount))}`,
      `ticket=${shortTicketRef || 'BOOKING'}`,
      `phone=${state.customer.phone}`,
    ].join('|');
  }, [method, totalAmount, transferNote, shortTicketRef, state.customer.phone]);

  const qrUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=12&data=${encodeURIComponent(qrData)}`;
  }, [qrData]);

  const paymentGuide = useMemo(() => {
    if (method === 'Thanh toán VietQR') {
      return `Mở app ngân hàng, quét QR, kiểm tra số tiền và nội dung "${transferNote}" trước khi xác nhận.`;
    }
    return `Mở ứng dụng ${method}, quét mã QR và xác nhận thanh toán ${formatCurrency(totalAmount)}.`;
  }, [method, totalAmount, transferNote]);

  const onFinish = () => {
    void (async () => {
      if (dangThanhToan) return;
      setDangThanhToan(true);
      try {
        const phuongThuc = toPaymentMethodPayload(method);
        const tickets = state.createdTickets ?? [];
        const token = getToken();
        const role = getStoredRole();
        const useAuthenticatedPayment = Boolean(token && role === 'KHACH_HANG');
        for (const ticket of tickets) {
          if (useAuthenticatedPayment) {
            await api.post<ApiResponse<null>>(`/api/me/booking/tickets/${ticket.id}/pay`, {
              phuongThuc,
              dongYDieuKhoan: true,
            });
          } else {
            await api.post<ApiResponse<null>>(`/api/public/booking/tickets/${ticket.id}/pay`, {
              phuongThuc,
              dongYDieuKhoan: true,
              email: state.customer.email,
              soDienThoai: state.customer.phone,
            });
          }
        }
        window.alert(`Thanh toán thành công ${tickets.length} vé.`);
        navigate('/tra-cuu-ve', {
          state: {
            highlightedTicketCodes: ticketCodes,
          },
        });
      } catch (error) {
        const axiosErr = error as { response?: { data?: { message?: string } } };
        const msg = axiosErr.response?.data?.message || 'Thanh toán thất bại. Vui lòng thử lại.';
        window.alert(msg);
      } finally {
        setDangThanhToan(false);
      }
    })();
  };

  return (
    <div className="bg-[#f3f3f5] pb-10">
      <div className="bg-gradient-to-b from-[#ff7a00] via-[#ef5222] to-[#df3b18] px-4 py-7 text-white">
        <div className="mx-auto max-w-6xl">
          <button type="button" onClick={() => navigate(-1)} className="mb-2 inline-flex items-center gap-1 text-sm hover:underline">
            <ChevronLeft className="h-4 w-4" />
            Quay lại
          </button>
          <h1 className="text-center text-3xl font-bold">{title}</h1>
        </div>
      </div>

      <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-5 px-4 lg:grid-cols-12">
        <section className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-4">
          <h3 className="text-xl font-bold text-gray-800">Chọn phương thức thanh toán</h3>
          {ticketCodes.length > 0 && (
            <div className="mt-3 rounded-lg border border-[#0e5a32]/20 bg-[#f0faf5] p-3 text-sm">
              <p className="font-semibold text-[#0e5a32]">Mã vé (chờ thanh toán)</p>
              <p className="mt-1 break-all font-mono text-gray-800">{ticketCodes.join(', ')}</p>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {methods.map((item) => (
              <label key={item} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50">
                <input type="radio" name="pay-method" checked={method === item} onChange={() => setMethod(item)} />
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">Vé đã được lưu ở trạng thái chờ thanh toán. Chọn phương thức và hoàn tất theo hướng dẫn bên cạnh.</p>
          <button
            type="button"
            disabled={dangThanhToan}
            onClick={onFinish}
            className="mt-4 w-full rounded-full bg-[#ef5222] py-3 font-semibold text-white hover:bg-[#d84a1e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {dangThanhToan ? 'Đang xác nhận thanh toán...' : 'Thanh toán thành công'}
          </button>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-4">
          <p className="text-center text-sm text-gray-500">Tổng tiền vé</p>
          <p className="text-center text-5xl font-extrabold text-[#e45a2f]">{formatCurrency(totalAmount)}</p>
          <div className="mt-4 rounded-xl bg-[#fafafa] p-4">
            <p className="mb-2 text-center text-sm text-[#e89b66]">Thời gian giữ chỗ còn lại 04 : 50</p>
            <div className="mx-auto w-fit rounded-2xl border border-[#f3b29e] bg-white p-3 shadow-sm">
              <img
                src={qrUrl}
                alt={`QR thanh toán ${method}`}
                className="h-56 w-56 rounded-lg border border-gray-200 object-cover"
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-[#0e5a32]">{paymentGuide}</p>
            {method === 'Thanh toán VietQR' && (
              <div className="mt-3 rounded-lg border border-[#0e5a32]/15 bg-[#f6fcf8] p-3 text-xs text-gray-700">
                <p><span className="font-semibold">Ngân hàng:</span> {BANK_NAME}</p>
                <p><span className="font-semibold">Số tài khoản:</span> {BANK_ACCOUNT}</p>
                <p><span className="font-semibold">Nội dung:</span> {transferNote}</p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4 lg:col-span-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-2xl font-bold text-gray-800">Thông tin hành khách</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Họ và tên</span><span className="font-semibold">{state.customer.fullName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Số điện thoại</span><span className="font-semibold">{state.customer.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-semibold">{state.customer.email}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Thông tin chuyến đi</h3>
              <span className="text-lg text-[#ef5222]">Chi tiết</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Tuyến xe</span><span className="font-semibold">{state.outboundTrip.tenTuyen}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Thời gian xuất bến</span><span className="font-semibold text-[#00613d]">{formatDateTime(state.outboundTrip)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Số lượng ghế</span><span className="font-semibold">{seatsOut.length} Ghế</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Số ghế</span><span className="font-semibold">{seatsOut.join(', ') || 'Chưa chọn'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tổng tiền lượt đi</span><span className="font-semibold text-[#00613d]">{formatCurrency(totalOutbound)}</span></div>
            </div>
          </div>

          {state.tripType === 'round-trip' && state.returnTrip && (
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Thông tin chuyến đi</h3>
                <span className="text-lg text-[#ef5222]">Chi tiết</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Tuyến xe</span><span className="font-semibold">{state.returnTrip.tenTuyen}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Thời gian xuất bến</span><span className="font-semibold text-[#00613d]">{formatDateTime(state.returnTrip)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Số lượng ghế</span><span className="font-semibold">{seatsReturn.length} Ghế</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Số ghế</span><span className="font-semibold">{seatsReturn.join(', ') || 'Chưa chọn'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tổng tiền lượt đi</span><span className="font-semibold text-[#00613d]">{formatCurrency(totalReturn)}</span></div>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-800">Chi tiết giá</h3>
              <AlertCircle className="h-5 w-5 text-[#ef5222]" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Giá vé lượt đi 1</span><span className="text-[#e45a2f]">{formatCurrency(totalOutbound)}</span></div>
              {state.tripType === 'round-trip' && <div className="flex justify-between"><span className="text-gray-500">Giá vé lượt đi 2</span><span className="text-[#e45a2f]">{formatCurrency(totalReturn)}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500">Phí thanh toán</span><span>0đ</span></div>
              <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-2xl font-bold">
                <span className="text-gray-700">Tổng tiền</span>
                <span className="text-[#e45a2f]">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentPage;
