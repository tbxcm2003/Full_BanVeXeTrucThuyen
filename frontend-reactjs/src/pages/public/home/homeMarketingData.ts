import tphcmImage from '../../../assets/TPHCM.png';
import daLatImage from '../../../assets/DaLat.png';
import daNangImage from '../../../assets/DaNang.png';
import km1 from '../../../assets/KM1.png';
import km2 from '../../../assets/KM2.png';
import km3 from '../../../assets/KM3.png';
import km4 from '../../../assets/KM4.png';
import km5 from '../../../assets/KM5.png';
import km6 from '../../../assets/KM6.png';

export type PromoSlide = { title: string; image: string };
export type PromoSlideGroup = PromoSlide[];

export const promoSlides: PromoSlideGroup[] = [
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

export type RouteCardDest = { name: string; distance: string; price: string };
export type RouteCard = {
  title: string;
  image: string;
  imageAlt: string;
  destinations: RouteCardDest[];
};

export const routeCards: RouteCard[] = [
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
