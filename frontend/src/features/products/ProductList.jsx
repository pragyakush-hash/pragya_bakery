// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import {
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   Autoplay,
// } from "swiper/modules";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// import { Link } from "react-router-dom";
// import { getProducts } from "./productSlice";
// import { addToCart } from "../cart/cartSlice";

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.product);

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   const handleAddToCart = ({ productId, quantity }) => {
//     dispatch(addToCart({ productId, quantity }));
//   };

//   const featuredProducts =
//     products?.filter((item) => item.brand === "Featured products") || [];

//   return (
//     <div>
//       {/* HERO SLIDER */}
//       <h2 className="text-3xl font-bold text-amber-700 mb-4 text-center">
//         Featured Categories
//       </h2>

//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//         spaceBetween={20}
//         slidesPerView={1}
//         navigation
//         autoplay={{ delay: 2000, disableOnInteraction: false }}
//         className="rounded-xl"
//       >
//         {products?.slice(0, 3).map((item) => (
//           <SwiperSlide key={item._id}>
//             <Link to="">
//               <img
//                 className="rounded-xl w-full h-60 object-cover"
//                 src={item.image}
//                 alt=""
//               />
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* SECOND SLIDER */}
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={20}
//         slidesPerView={3}
//         navigation
//         breakpoints={{
//           320: { slidesPerView: 1 },
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//         className="mt-10 rounded-xl"
//       >
//         {products?.slice(9, 12).map((item) => (
//           <SwiperSlide key={item._id}>
//             <div className="p-4">
//               <Link to="">
//                 <img
//                   className="rounded-xl w-full h-48 object-cover"
//                   src={item.image}
//                   alt=""
//                 />
//               </Link>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* CATEGORY SLIDER */}
//       <h2 className="text-3xl font-bold text-amber-700 mt-10 text-center">
//         Categories
//       </h2>

//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//         spaceBetween={10}
//         slidesPerView={5}
//         navigation
//         autoplay={{ delay: 3000 }}
//         breakpoints={{
//           320: { slidesPerView: 2 },
//           640: { slidesPerView: 3 },
//           1024: { slidesPerView: 5 },
//         }}
//         className="mt-6"
//       >
//         {products?.slice(3, 12).map((item) => (
//           <SwiperSlide key={item._id}>
//             <div className="w-full text-center">
//               <Link to="">
//                 <img
//                   className="rounded-xl w-full h-44 object-cover"
//                   src={item.image}
//                   alt=""
//                 />
//               </Link>

//               <div className="flex justify-center gap-3 mt-3">
//                 <button className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded-lg font-medium truncate max-w-[120px]">
//                   {item.category}
//                 </button>

//                 <button
//                   onClick={() =>
//                     handleAddToCart({ productId: item._id, quantity: 1 })
//                   }
//                   className="bg-amber-900 hover:bg-amber-800 text-white py-2 px-4 rounded-lg font-medium"
//                 >
//                   AddToCart
//                 </button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* FEATURED PRODUCTS */}
//       <h2 className="text-3xl font-bold text-amber-700 mt-14 text-center">
//         Featured Products
//       </h2>
//       <p className="text-center text-gray-600">
//         Items: {featuredProducts.length}
//       </p>

//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//         spaceBetween={15}
//         slidesPerView={4}
//         navigation
//         autoplay={{ delay: 4000 }}
//         breakpoints={{
//           320: { slidesPerView: 1 },
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 4 },
//         }}
//         className="mt-6"
//       >
//         {featuredProducts?.map((item) => (
//           <SwiperSlide key={item._id}>
//             <div className="p-6">
//               <Link to="">
//                 <img
//                   className="rounded-xl w-full h-52 object-cover"
//                   src={item.image}
//                   alt=""
//                 />
//               </Link>

//               <div className="flex gap-3 mt-3">
//                 <button className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded-lg font-medium truncate max-w-[120px]">
//                   {item.category}
//                 </button>

//                 <button
//                   onClick={() =>
//                     handleAddToCart({ productId: item._id, quantity: 1 })
//                   }
//                   className="bg-amber-900 hover:bg-amber-800 text-white py-2 px-4 rounded-lg font-medium"
//                 >
//                   AddToCart
//                 </button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ProductList;


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "./productSlice";
import { addToCart } from "../cart/cartSlice";
import HeroSlider from "./HeroSlider";
import ProductSlider from "./ProductSlider";
import CategorySlider from "./CategorySlider";
import ProductCard from "./ProductCard";



const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = ({ productId, quantity }) => {
    dispatch(addToCart({ productId, quantity }));
  };

  if (!products || products.length === 0) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  // Filters
  const heroSlides = products.slice(0, 3);
  const secondSlider = products.slice(9, 13);
  const categorySlider = products.slice(3, 12);

  const featuredProducts = products.filter(
    (item) => item.brand === "Featured products"
  );

  return (
    <div className="mt-6">

      <h2 className="text-3xl font-bold text-amber-700 mb-4 text-center">
        Featured Categories
      </h2>
      <HeroSlider slides={heroSlides} />

      <h2 className="text-2xl font-bold text-amber-700 mt-10 text-center">
        Trending Items
      </h2>
      <ProductSlider slides={secondSlider} handleAddToCart={handleAddToCart} />

      <h2 className="text-3xl font-bold text-amber-700 mt-10 text-center">
        Categories
      </h2>
      <CategorySlider
        slides={categorySlider}
        handleAddToCart={handleAddToCart}
      />

      <h2 className="text-3xl font-bold text-amber-700 mt-14 text-center">
        Featured Products
      </h2>
      <p className="text-center text-gray-600">
        Items: {featuredProducts.length}
      </p>
      <ProductSlider
        slides={featuredProducts}
        handleAddToCart={handleAddToCart}
      />

      <h2 className="text-3xl font-bold text-amber-700 mt-14 text-center">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 gap-8 px-4">
        {products.map((item) => (
          <ProductCard
            key={item._id}
            item={item}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

