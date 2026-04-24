import { Search } from 'lucide-react';

const SchedulePage = () => {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#fff8f5] to-white py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 rounded-3xl bg-white/90 p-6 shadow-lg shadow-orange-100/60 ring-1 ring-[#ef5222]/10 backdrop-blur">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ef5222]">Lịch trình</p>
              <h2 className="text-2xl font-bold text-[#00613d] md:text-3xl">Tra cứu tuyến xe theo điểm đi và điểm đến</h2>
            </div>
            <p className="max-w-xl text-sm text-gray-500">
              Bố cục cũ được giữ nguyên, nhưng bảng và khu vực tìm kiếm được làm sáng hơn để dễ đọc và nhìn hiện đại hơn.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-[#fdf8f5] p-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Nhập điểm đi" className="w-full rounded-xl border border-white bg-white/95 py-3 pl-10 pr-3 shadow-sm outline-none transition focus:border-[#ef5222] focus:ring-2 focus:ring-[#ef5222]/15" />
            </div>
            <div className="flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-400 shadow-sm">
              ⇌
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Nhập điểm đến" className="w-full rounded-xl border border-white bg-white/95 py-3 pl-10 pr-3 shadow-sm outline-none transition focus:border-[#ef5222] focus:ring-2 focus:ring-[#ef5222]/15" />
            </div>
            <button className="rounded-xl bg-[#ef5222] px-6 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#d84a1e]">
              Tìm chuyến
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/60 ring-1 ring-gray-100">
          <div className="border-b border-gray-100 bg-gradient-to-r from-[#00613d] to-[#0e7a4d] px-6 py-4 text-white">
            <h3 className="text-lg font-semibold">Danh sách tuyến phổ biến</h3>
            <p className="text-sm text-white/80">Tổng hợp các tuyến xe nổi bật đang được khách hàng tìm kiếm nhiều.</p>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-[#f8faf8] text-left text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Tuyến xe</th>
                <th className="px-6 py-4 font-semibold">Loại xe</th>
                <th className="px-6 py-4 font-semibold">Quãng đường</th>
                <th className="px-6 py-4 font-semibold">Thời gian hành trình</th>
                <th className="px-6 py-4 font-semibold">Giá vé</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100/80 transition hover:bg-[#fff8f5] cursor-pointer">
                <td className="px-6 py-4 font-semibold text-[#ef5222]">Phan Thiết (BXB) - Đà Lạt</td>
                <td className="px-6 py-4 text-gray-600">Limousine</td>
                <td className="px-6 py-4 text-gray-600">115km</td>
                <td className="px-6 py-4 text-gray-600">5 giờ</td>
                <td className="px-6 py-4 font-bold text-[#00613d]">220.000 đ</td>
              </tr>
              <tr className="border-b border-gray-100/80 transition hover:bg-[#fff8f5] cursor-pointer">
                <td className="px-6 py-4 font-semibold text-[#ef5222]">Đà Lạt - Phan Thiết (BXB)</td>
                <td className="px-6 py-4 text-gray-600">Limousine</td>
                <td className="px-6 py-4 text-gray-600">115km</td>
                <td className="px-6 py-4 text-gray-600">6 giờ</td>
                <td className="px-6 py-4 font-bold text-[#00613d]">220.000 đ</td>
              </tr>
              <tr className="border-b border-gray-100/80 transition hover:bg-[#fff8f5] cursor-pointer">
                <td className="px-6 py-4 font-semibold text-[#ef5222]">Quảng Ngãi - Miền Tây</td>
                <td className="px-6 py-4 text-gray-600">Limousine</td>
                <td className="px-6 py-4 text-gray-600">230km</td>
                <td className="px-6 py-4 text-gray-600">17 giờ</td>
                <td className="px-6 py-4 font-bold text-[#00613d]">210.000 đ</td>
              </tr>
              <tr className="border-b border-gray-100/80 transition hover:bg-[#fff8f5] cursor-pointer">
                <td className="px-6 py-4 font-semibold text-[#ef5222]">Bảo Lộc - Huế (Quảng Điền)</td>
                <td className="px-6 py-4 text-gray-600">Limousine</td>
                <td className="px-6 py-4 text-gray-600">811km</td>
                <td className="px-6 py-4 text-gray-600">20 giờ</td>
                <td className="px-6 py-4 font-bold text-[#00613d]">175.000 đ</td>
              </tr>
              <tr className="border-b border-gray-100/80 transition hover:bg-[#fff8f5] cursor-pointer">
                <td className="px-6 py-4 font-semibold text-[#ef5222]">Đà Nẵng trạm - Miền Đông Mới</td>
                <td className="px-6 py-4 text-gray-600">Limousine</td>
                <td className="px-6 py-4 text-gray-600">140km</td>
                <td className="px-6 py-4 text-gray-600">21 giờ</td>
                <td className="px-6 py-4 font-bold text-[#00613d]">140.000 đ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;