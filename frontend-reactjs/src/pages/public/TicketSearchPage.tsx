const TicketSearchPage = () => {
  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-[#fff8f5] to-white py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ef5222]">Tra cứu vé</p>
          <h2 className="mt-2 text-3xl font-bold text-[#00613d]">Tìm thông tin đặt vé nhanh chóng</h2>
          <p className="mt-3 text-gray-500">Nhập đúng số điện thoại và mã vé để xem thông tin chuyến đi của bạn.</p>
        </div>

        <div className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-orange-100/60 ring-1 ring-[#ef5222]/10 md:p-8">
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Vui lòng nhập số điện thoại" 
                className="w-full rounded-2xl border border-gray-200 bg-[#fdf8f5] px-4 py-4 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#ef5222] focus:bg-white focus:ring-2 focus:ring-[#ef5222]/15" 
              />
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Vui lòng nhập mã vé" 
                className="w-full rounded-2xl border border-gray-200 bg-[#fdf8f5] px-4 py-4 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#ef5222] focus:bg-white focus:ring-2 focus:ring-[#ef5222]/15" 
              />
            </div>
            <button className="w-full rounded-2xl bg-[#ef5222] py-4 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#d84a1e]">
              Tra cứu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSearchPage;