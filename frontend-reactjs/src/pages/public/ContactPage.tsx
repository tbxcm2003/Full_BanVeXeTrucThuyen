import { Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#fff8f5] to-white py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/60 ring-1 ring-gray-100 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ef5222]">Liên hệ</p>
            <h2 className="mt-2 text-3xl font-bold text-[#00613d]">Kết nối với Vina Go</h2>
            <div className="mt-6 flex items-center text-sm font-semibold text-[#00613d]">
              <span className="mr-2">▶</span> VINA GO BUS LINES
            </div>
            <h3 className="mt-3 text-lg font-semibold uppercase text-[#ef5222]">CÔNG TY CỔ PHẦN VINA GO - VINA GO BUS LINES</h3>
            
            <div className="mt-6 space-y-4 text-gray-700">
              <p className="rounded-2xl bg-[#fdf8f5] p-4">Địa chỉ: 12 Nguyễn Văn Bảo, Phường Hạnh Thông, Quận Gò Vấp, TP. Hồ Chí Minh</p>
              <p className="rounded-2xl bg-[#fdf8f5] p-4">Website: <a href="https://vinago.vn/" className="text-blue-600 hover:underline">https://vinago.vn/</a></p>
              <p className="rounded-2xl bg-[#fdf8f5] p-4">Điện thoại: 02838386852</p>
              <p className="rounded-2xl bg-[#fdf8f5] p-4">Email: <a href="mailto:support.banvexe@gmail.com" className="text-[#ef5222] hover:underline">support.banvexe@gmail.com</a></p>
              <p className="rounded-2xl bg-[#fdf8f5] p-4">Hotline: <span className="font-bold text-[#00613d]">1900 9999</span></p>
            </div>
          </div>

          <div className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-orange-100/40 md:p-8">
            <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center rounded-full border border-[#ef5222]/10 bg-white px-5 py-2 text-lg font-bold text-[#ef5222] shadow-sm">
               <Mail className="mr-2 h-8 w-8" />
               Gửi thông tin liên hệ
            </div>

            <form className="mt-10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  disabled
                  value="VINA GO BUS LINES" 
                  className="hidden w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 md:block" 
                />
                <input 
                  type="text" 
                  placeholder="Họ Tên" 
                  className="col-span-2 w-full rounded-2xl border border-gray-200 bg-[#fdf8f5] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#ef5222] focus:bg-white focus:ring-2 focus:ring-[#ef5222]/15 md:col-span-1" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="col-span-2 w-full rounded-2xl border border-gray-200 bg-[#fdf8f5] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#ef5222] focus:bg-white focus:ring-2 focus:ring-[#ef5222]/15 md:col-span-1" 
                />
                <input 
                  type="tel" 
                  placeholder="Điện thoại" 
                  className="col-span-2 w-full rounded-2xl border border-gray-200 bg-[#fdf8f5] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#ef5222] focus:bg-white focus:ring-2 focus:ring-[#ef5222]/15 md:col-span-1" 
                />
              </div>
              
              <input 
                  type="text" 
                  placeholder="Nhập Tiêu đề" 
                  className="w-full rounded-2xl border border-gray-200 bg-[#fdf8f5] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#ef5222] focus:bg-white focus:ring-2 focus:ring-[#ef5222]/15" 
              />
              
              <textarea 
                  rows={5} 
                  placeholder="Nhập ghi chú" 
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-[#fdf8f5] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#ef5222] focus:bg-white focus:ring-2 focus:ring-[#ef5222]/15" 
              ></textarea>

              <div className="flex justify-center pt-2">
                 <button type="button" className="rounded-2xl bg-[#ef5222] px-12 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#d84a1e]">
                    Gửi
                 </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;