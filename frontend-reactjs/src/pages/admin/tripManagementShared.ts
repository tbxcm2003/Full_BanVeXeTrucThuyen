import type { TripRunStatus, TripRow } from './tripManagementTypes';

export const TRIP_STATUS_OPTIONS: { value: TripRunStatus; label: string }[] = [
  { value: 'CHUA_KHOI_HANH', label: 'Chưa khởi hành' },
  { value: 'DANG_CHAY', label: 'Đang chạy' },
  { value: 'HOAN_THANH', label: 'Hoàn thành' },
  { value: 'HUY_CHUYEN', label: 'Hủy chuyến' },
];

export function formatTimeForInput(gioDi: TripRow['gioDi']): string {
  if (gioDi == null) return '06:00';
  if (typeof gioDi === 'string') {
    const m = gioDi.match(/^(\d{1,2}):(\d{2})/);
    if (m) return `${m[1].padStart(2, '0')}:${m[2]}`;
    return '06:00';
  }
  const h = gioDi.hour ?? 0;
  const mi = gioDi.minute ?? 0;
  return `${String(h).padStart(2, '0')}:${String(mi).padStart(2, '0')}`;
}

export function toLocalTimeString(hhmm: string): string {
  const t = hhmm.trim();
  if (t.length === 5 && t[2] === ':') return `${t}:00`;
  return t;
}
