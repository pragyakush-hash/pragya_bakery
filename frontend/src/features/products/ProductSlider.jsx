import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import ProductCard from "./ProductCard";

const ProductSlider = ({ slides, handleAddToCart }) => {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      autoplay={{ delay: 3000 }}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="mt-6 rounded-xl"
    >
      {slides.map((item) => (
        <SwiperSlide key={item._id}>
          <ProductCard item={item} handleAddToCart={handleAddToCart} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
