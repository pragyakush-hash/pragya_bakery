import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "./productSlice";
import { addToCart } from "../cart/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCart({ productId, quantity }));
  };

  if (isLoading || !product) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />

        <div>
          {/* <h2 className="text-4xl font-bold mb-3">{product.name}</h2> */}

          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>

          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold">Seller ID:</span> {product.seller}
          </p>

          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold">Stock:</span> {product.stock} items
          </p>

          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Rating:</span> ⭐ {product.rating}/5
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <p className="text-amber-800 font-extrabold text-3xl mb-6">
            ₹{product.price}
          </p>

          <button
            className="bg-amber-900 hover:bg-amber-800 text-white py-3 px-6 rounded-lg text-lg"
            onClick={() => handleAddToCart(product._id, 1)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
