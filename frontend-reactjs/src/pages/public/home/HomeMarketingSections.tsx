import { useEffect, useState } from 'react';
import { promoSlides, routeCards } from './homeMarketingData';

export function HomePromoSection() {
  const [activePromo, setActivePromo] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePromo((current) => (current + 1) % promoSlides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  return (
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
                    <div key={slide.title} className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
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
  );
}

export function HomeRouteCardsSection() {
  return (
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
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-4">
                {card.destinations.map((destination) => (
                  <div
                    key={`${card.title}-${destination.name}`}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
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
  );
}
