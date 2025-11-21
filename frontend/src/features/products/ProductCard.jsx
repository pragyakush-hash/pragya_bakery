import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item, handleAddToCart }) => {
  return (
    <div className="p-4 rounded-xl shadow-md bg-white">
      <Link to={`/product/${item._id}`}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover rounded-xl"
        />
      </Link>

      {/* <h3 className="font-bold text-lg mt-3 truncate">{item.name}</h3> */}
      <p className="text-gray-600">{item.category}</p>

      <button
        onClick={() => handleAddToCart({ productId: item._id, quantity: 1 })}
        className="bg-amber-900 hover:bg-amber-800 text-white py-2 px-4 rounded-lg w-full mt-3"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
