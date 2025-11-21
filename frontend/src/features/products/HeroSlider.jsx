import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";

const HeroSlider = ({ slides }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      className="rounded-xl"
    >
      {slides.map((item) => (
        <SwiperSlide key={item._id}>
          <img
            className="rounded-xl w-full h-60 object-cover"
            src={item.image}
            alt=""
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
