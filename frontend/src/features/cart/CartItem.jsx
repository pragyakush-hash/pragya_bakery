// import React from "react";
// import { Link } from "react-router-dom";

// const CartItem = ({ item, handleDeleteToCart }) => {
//   console.log(item, "item in cart");
//   return (
//     <div
//       key={item?._id}
//       className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center"
//     >
//       <Link to="">
//         <img
//           className="rounded-lg w-full h-40 object-cover"
//           src={item?.product?.image}
//           alt={item?.product?.name}
//         />
//       </Link>

//       <h2 className="mt-3 text-lg font-semibold text-center truncate max-w-[160px]">
//         {item?.product?.name}
//       </h2>

//       <p className="bg-amber-700 text-white mt-2 text-sm px-3 py-1 rounded-lg truncate max-w-[150px]">
//         {item?.product?.category}
//       </p>

//       {/* <div className="flex items-center gap-3 mt-4">
//         <button
//           onClick={() => updateQuantity(item?.product?._id, item?.quantity - 1)}
//           className="bg-amber-900 hover:bg-amber-800 text-white px-3 py-1 rounded-lg"
//         >
//           –
//         </button>

//         <span className="text-lg font-semibold">{item?.quantity}</span>

//         <button
//           onClick={() => updateQuantity(item?.product?._id, item?.quantity + 1)}
//           className="bg-amber-900 hover:bg-amber-800 text-white px-3 py-1 rounded-lg"
//         >
//           +
//         </button>
//       </div> */}

//       <button
//         onClick={() => handleDeleteToCart(item._id)}
//         className="bg-amber-900 hover:bg-amber-800 text-white mt-4 px-4 py-2 w-full rounded-lg font-medium"
//       >
//         Remove from cart
//       </button>
//     </div>
//   );
// };

// export default CartItem;



const CartItem = ({ item, updateQuantity, handleDeleteToCart }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white">
      <img
        src={item.product?.image}
        alt={item.product?.name}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* <h3 className="text-lg font-semibold mt-2">
        {item.product.name.length > 20
          ? item.product.name.slice(0, 20) + "..."
          : item.product.name}
      </h3> */}

      <p className="text-amber-700 font-bold text-lg mt-1">
        ₹{item?.product?.price}
      </p>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 mt-3">
        <button
          className="bg-gray-200 px-3 py-1 rounded-md"
          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
        >
          -
        </button>
        <span className="px-4 py-1 border rounded-md text-lg">{item.quantity}</span>
        <button
          className="bg-gray-200 px-3 py-1 rounded-md"
          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <p className="mt-2 text-gray-700 font-medium">
        Total: ₹{item.product?.price * item.quantity}
      </p>

      <button
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        onClick={() => handleDeleteToCart(item._id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
