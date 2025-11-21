import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import ProductCard from "./ProductCard";

const CategorySlider = ({ slides, handleAddToCart }) => {
  return (
    <Swiper
      modules={[Navigation, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={5}
      navigation
      autoplay={{ delay: 3000 }}
      breakpoints={{
        320: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
      className="mt-6"
    >
      {slides.map((item) => (
        <SwiperSlide key={item._id}>
          {/* <div className="w-full text-center">
            <img
              className="rounded-xl w-full h-44 object-cover"
              src={item.image}
              alt=""
            />

            <div className="flex justify-center gap-3 mt-3">
              <button className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded-lg font-medium truncate max-w-[120px]">
                {item.category}
              </button>

              <button
                onClick={() =>
                  handleAddToCart({ productId: item._id, quantity: 1 })
                }
                className="bg-amber-900 hover:bg-amber-800 text-white py-2 px-4 rounded-lg font-medium"
              >
                AddToCart
              </button>
            </div>
          </div> */}
                    <ProductCard item={item} handleAddToCart={handleAddToCart} />

        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorySlider;
