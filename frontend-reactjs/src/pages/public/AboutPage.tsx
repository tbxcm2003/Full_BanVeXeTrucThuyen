import { Award, Clock3, ShieldCheck, Sparkles, Ticket } from 'lucide-react';

const highlights = [
  {
    icon: Ticket,
    title: 'Đặt vé nhanh',
    description: 'Tìm chuyến, chọn ghế và thanh toán ngay trên một luồng thao tác gọn gàng.',
  },
  {
    icon: ShieldCheck,
    title: 'Thông tin rõ ràng',
    description: 'Mã vé, trạng thái thanh toán và thông tin chuyến đi được hiển thị minh bạch.',
  },
  {
    icon: Clock3,
    title: 'Hỗ trợ kịp thời',
    description: 'Tra cứu vé, xem lịch trình và liên hệ hỗ trợ nhanh chóng khi cần.',
  },
];

const values = [
  'Tối giản thao tác nhưng vẫn giữ đủ thông tin cần thiết.',
  'Ưu tiên trải nghiệm của khách hàng.',
  'Tập trung vào tính nhất quán giữa đặt vé, thanh toán và tra cứu.',
];

const AboutPage = () => {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#fff8f5] to-white py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="rounded-3xl bg-white p-6 shadow-xl shadow-orange-100/50 ring-1 ring-[#ef5222]/10 lg:col-span-7 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ef5222]">Về chúng tôi</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-[#00613d]">Vina Go là nền tảng đặt vé xe khách hướng đến sự nhanh gọn và rõ ràng.</h1>
            <p className="mt-4 text-gray-600 leading-7">
              Chúng tôi xây dựng hệ thống để khách có thể tìm chuyến, chọn ghế, đặt vé, thanh toán và tra cứu thông tin dễ dàng trên một giao diện thống nhất.
              Mục tiêu là giảm thao tác thừa, hạn chế nhầm lẫn và giúp người dùng kiểm tra lại thông tin vé bất cứ lúc nào.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-gray-100 bg-[#fffdfc] p-4 shadow-sm">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0ea] text-[#ef5222]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 lg:col-span-5 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0ea] text-[#ef5222]">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Giá trị cốt lõi</p>
                <h2 className="text-2xl font-bold text-gray-800">Trải nghiệm đặt vé tốt hơn</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {values.map((value) => (
                <div key={value} className="rounded-2xl bg-[#fdf8f5] p-4 text-gray-700 shadow-sm">
                  {value}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#ef5222]/15 bg-[#fff7f3] p-5">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-[#ef5222]" />
                <p className="font-semibold text-gray-800">Mục tiêu của chúng tôi</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Tạo ra một hệ thống bán vé online dễ dùng, nhìn hiện đại, có thể mở rộng thêm các tiện ích như tra cứu vé, lịch sử mua vé và hỗ trợ khách hàng.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
