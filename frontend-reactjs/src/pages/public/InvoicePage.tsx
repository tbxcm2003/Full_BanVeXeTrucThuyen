import { Search, User, RefreshCw } from 'lucide-react';

const InvoicePage = () => {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#fff8f5] to-white py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ef5222]">Hóa đơn</p>
          <h2 className="mt-2 text-3xl font-bold text-[#00613d]">Tra cứu hóa đơn gọn gàng, dễ nhìn</h2>
          <p className="mt-3 text-gray-500">Thiết kế mới sáng hơn, các trường nhập liệu rõ ràng hơn nhưng vẫn giữ luồng tra cứu cũ.</p>
        </div>

        <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/70 ring-1 ring-gray-100 md:p-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-[#ef5222]">Tra cứu hóa đơn</h3>

          <div className="space-y-4">
            <div className="relative flex overflow-hidden rounded-2xl border border-gray-200 bg-[#fdf8f5] shadow-sm">
              <div className="flex items-center justify-center border-r border-gray-200 bg-white px-4">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Mã số bí mật" className="flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-gray-400" />
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-[#f8faf8] p-4">
              <div className="flex-1 rounded-xl bg-gradient-to-r from-gray-200 to-gray-100 px-4 py-3 text-center font-mono text-2xl font-bold tracking-[0.35em] text-amber-900 shadow-inner">
                01974
              </div>
              <button className="rounded-xl bg-white p-3 text-green-500 shadow-sm ring-1 ring-gray-100 transition hover:bg-gray-50">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl border border-gray-200 bg-[#fdf8f5] shadow-sm">
              <input type="text" placeholder="Nhập mã xác thực" className="w-full bg-transparent px-4 py-4 text-sm outline-none placeholder:text-gray-400" />
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ef5222] py-4 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#d84a1e]">
              <Search className="w-4 h-4" />
              Tra cứu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;