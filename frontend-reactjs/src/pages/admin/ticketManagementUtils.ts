import type { TicketRow } from './ticketManagementTypes';

export function pickGhiChuFromRow(r: unknown): string | null {
  if (r == null || typeof r !== 'object') return null;
  const o = r as Record<string, unknown>;
  const g = o.ghiChu ?? o.ghi_chu;
  if (g == null) return null;
  return String(g);
}

export function formatGhiChuAdminHienThi(trangThai: string | undefined, raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (s === '') return null;
  const t = trangThai || '';
  if (t === 'DA_HUY') {
    const leg = s.match(/\[Hủy vé thành công:\s*([^\]]+)\]/);
    if (leg) return `Hủy vé thành công: ${leg[1].trim()}`;
    const k = s.lastIndexOf('Hủy vé thành công:');
    if (k >= 0) return s.slice(k).trim();
    return s;
  }
  if (t === 'DANG_XU_LY') {
    const k = s.lastIndexOf('Yêu cầu hủy');
    if (k >= 0) return s.slice(k).trim();
    return s;
  }
  if (t === 'DA_THANH_TOAN') {
    const leg = s.match(/\[Từ chối hủy:\s*([^\]]*)\]/);
    if (leg) {
      const b = leg[1].trim();
      return b ? `Từ chối hủy: ${b}` : s;
    }
    const k = s.lastIndexOf('Từ chối hủy:');
    if (k >= 0) return s.slice(k).trim();
    return s;
  }
  return s;
}

export function formatInstant(s: string | undefined): string {
  if (!s) return '—';
  try {
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return s;
    return d.toLocaleString('vi-VN');
  } catch {
    return s;
  }
}

export function formatGio(g: TicketRow['gioChuyen']): string {
  if (g == null) return '';
  if (typeof g === 'string') {
    const m = g.match(/^(\d{1,2}):(\d{2})/);
    if (m) return `${m[1].padStart(2, '0')}:${m[2]}`;
    return g;
  }
  const h = g.hour ?? 0;
  const mi = g.minute ?? 0;
  return `${String(h).padStart(2, '0')}:${String(mi).padStart(2, '0')}`;
}

export function instantToLocalInput(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes(),
  )}`;
}

export function localInputToIso(local: string): string | null {
  if (!local.trim()) return null;
  const t = new Date(local).getTime();
  if (Number.isNaN(t)) return null;
  return new Date(local).toISOString();
}

export function parseGheList(text: string): string[] {
  return text
    .split(/[\s,;，]+/u)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}

export function apiErrMessage(err: unknown): string {
  return (
    (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
    (err as { message?: string })?.message ||
    'Lỗi không xác định'
  );
}
