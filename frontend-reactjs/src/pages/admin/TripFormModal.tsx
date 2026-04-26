import React from 'react';
import { Bus, Save, X } from 'lucide-react';
import { TRIP_STATUS_OPTIONS } from './tripManagementShared';
import type { RouteOpt, TripFormState, VehicleOpt } from './tripManagementTypes';

type TripFormModalProps = {
  mode: 'add' | 'edit';
  form: TripFormState;
  setForm: React.Dispatch<React.SetStateAction<TripFormState>>;
  routes: RouteOpt[];
  vehicles: VehicleOpt[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  saving: boolean;
};

const TripFormModal: React.FC<TripFormModalProps> = ({ mode, form, setForm, routes, vehicles, onSubmit, onClose, saving }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
    <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900">
          <Bus className="text-[#ef5222]" size={20} />
          {mode === 'add' ? 'Thêm chuyến' : 'Sửa chuyến'}
        </h3>
        <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>
      <form onSubmit={onSubmit} className="p-4 space-y-3">
        <div>
          <label className="text-sm text-gray-700">Tuyến</label>
          <select
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={form.tuyenXeId}
            onChange={(e) => setForm((f) => ({ ...f, tuyenXeId: e.target.value }))}
            required
          >
            <option value="">— Chọn —</option>
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.tenTuyen} ({r.diemDi} → {r.diemDen})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-700">Xe</label>
          <select
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={form.xeId}
            onChange={(e) => setForm((f) => ({ ...f, xeId: e.target.value }))}
            required
          >
            <option value="">— Chọn —</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.bienSo} — {v.loaiXe} ({v.soGhe} chỗ)
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-700">Ngày đi</label>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={form.ngayDi}
              onChange={(e) => setForm((f) => ({ ...f, ngayDi: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Giờ đi</label>
            <input
              type="time"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={form.gioDi}
              onChange={(e) => setForm((f) => ({ ...f, gioDi: e.target.value }))}
              required
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-700">Giá vé (VNĐ)</label>
          <input
            type="number"
            min={0}
            step={1000}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={form.giaVe}
            onChange={(e) => setForm((f) => ({ ...f, giaVe: e.target.value }))}
            required
          />
        </div>
        {mode === 'edit' && (
          <div>
            <label className="text-sm text-gray-700">Trạng thái chuyến</label>
            <select
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={form.trangThai}
              onChange={(e) => setForm((f) => ({ ...f, trangThai: e.target.value as TripFormState['trangThai'] }))}
            >
              {TRIP_STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-sm">
            Hủy
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-[#ef5222] text-white text-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Lưu
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default TripFormModal;
