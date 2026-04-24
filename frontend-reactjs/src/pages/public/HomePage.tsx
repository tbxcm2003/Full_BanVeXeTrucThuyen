import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import bannerImage from '../../assets/banner.png';
import tphcmImage from '../../assets/TPHCM.png';
import daLatImage from '../../assets/DaLat.png';
import daNangImage from '../../assets/DaNang.png';
import km1 from '../../assets/KM1.png';
import km2 from '../../assets/KM2.png';
import km3 from '../../assets/KM3.png';
import km4 from '../../assets/KM4.png';
import km5 from '../../assets/KM5.png';
import km6 from '../../assets/KM6.png';

const HomePage = () => {
  const promoSlides = [
    [
      { title: 'Ưu đãi tuyến Đà Lạt', image: km1 },
      { title: 'Đặt vé online - giảm ngay', image: km2 },
      { title: 'Giảm thời gian trung chuyển', image: km3 },
    ],
    [
      { title: 'Mua vé sớm - giá tốt', image: km4 },
      { title: 'Ưu đãi cuối tuần', image: km5 },
      { title: 'Giảm thêm khi thanh toán online', image: km6 },
    ],
  ];

  const [activePromo, setActivePromo] = useState(0);
  const routeCards = [
    {
      title: 'Tuyến xe từ Tp Hồ Chí Minh',
      image: tphcmImage,
      imageAlt: 'Tp Hồ Chí Minh',
      destinations: [
        { name: 'Đà Lạt', distance: '310km - 480 giờ', price: '290.000đ' },
        { name: 'Cần Thơ', distance: '170km - 310 giờ', price: '165.000đ' },
      ],
    },
    {
      title: 'Tuyến xe từ Đà Lạt',
      image: daLatImage,
      imageAlt: 'Đà Lạt',
      destinations: [
        { name: 'Tp Hồ Chí Minh', distance: '310km - 480 giờ', price: '290.000đ' },
        { name: 'Đà Nẵng', distance: '700km - 840 giờ', price: '430.000đ' },
      ],
    },
    {
      title: 'Tuyến xe từ Đà Nẵng',
      image: daNangImage,
      imageAlt: 'Đà Nẵng',
      destinations: [
        { name: 'Nha Trang', distance: '100km - 120 giờ', price: '180.000đ' },
        { name: 'Hà Nội', distance: '800km - 900 giờ', price: '500.000đ' },
      ],
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePromo((current) => (current + 1) % promoSlides.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [promoSlides.length]);

  return (
    <div className="bg-white">
      <div className="w-full py-4 flex justify-center">
         <img src={bannerImage} alt="Banner" className="object-cover rounded-xl shadow-md w-full max-w-6xl max-h-[400px]" />
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-w-5xl mx-auto">
           <div className="flex space-x-6 mb-4 border-b border-gray-200 pb-2">
             <label className="flex items-center space-x-2 cursor-pointer text-[#ef5222] font-medium">
               <input type="radio" name="tripType" defaultChecked className="form-radio text-[#ef5222]" />
               <span>Một chiều</span>
             </label>
             <label className="flex items-center space-x-2 cursor-pointer text-gray-500">
               <input type="radio" name="tripType" className="form-radio" />
               <span>Khứ hồi</span>
             </label>
             <div className="ml-auto text-sm text-[#ef5222] hover:underline cursor-pointer">Hướng dẫn mua vé</div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Điểm đi</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Thành phố Hồ Chí Minh" className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#ef5222]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Điểm đến</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Đồng Tháp" className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#ef5222]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ngày đi</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input type="date" className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#ef5222]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Số vé</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#ef5222] appearance-none bg-white">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
           </div>
           
           <div className="flex justify-center mt-6">
             <button className="bg-[#ef5222] hover:bg-[#d84a1e] text-white px-12 py-3 rounded-full font-bold shadow-lg transition transform hover:scale-105 flex items-center">
               Tìm chuyến xe
             </button>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-[#00613d] mb-8 uppercase">KHUYẾN MÃI NỔI BẬT</h2>
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex w-[200%] transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activePromo * 50}%)` }}
            >
              {promoSlides.map((group) => (
                <div key={group[0].title} className="w-1/2 shrink-0 px-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {group.map((slide) => (
                      <div
                        key={slide.title}
                        className="rounded-xl overflow-hidden shadow-lg border border-gray-100"
                      >
                        <div className="relative h-40 md:h-48 bg-white">
                          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-black/15" />
                          <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-white font-semibold text-sm md:text-base">
                            {slide.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {promoSlides.map((slide, index) => (
              <button
                key={slide[0].title}
                type="button"
                onClick={() => setActivePromo(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activePromo ? 'w-10 bg-[#ef5222]' : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Chuyển tới khuyến mãi ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-[#00613d] mb-2 uppercase">TUYẾN PHỔ BIẾN</h2>
          <p className="text-center text-gray-500 mb-8">Được khách hàng tin tưởng và lựa chọn</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routeCards.map((card) => (
              <div key={card.title} className="bg-white rounded-xl shadow overflow-hidden">
                <div className="h-32 bg-gray-300 relative group overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition z-10">
                    <span className="text-white font-bold text-lg drop-shadow-md">{card.title}</span>
                  </div>
                  <img src={card.image} alt={card.imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="p-4">
                  {card.destinations.map((destination) => (
                    <div key={`${card.title}-${destination.name}`} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <h4 className="font-semibold text-gray-800">{destination.name}</h4>
                        <p className="text-xs text-gray-500">{destination.distance}</p>
                      </div>
                      <span className="font-bold text-[#ef5222]">{destination.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;