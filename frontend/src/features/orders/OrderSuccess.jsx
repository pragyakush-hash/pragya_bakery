import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="text-center mt-30">
      <h1 className="text-3xl font-bold text-green-600">
        Order Placed Successfully!
      </h1>
      <p className="text-xl mt-3 text-gray-700">Thank you for your purchase.</p>

      <Link
        to="/order-history"
        className="mt-5 inline-block bg-amber-700 text-white px-6 py-2 rounded-lg"
      >
        View Order History
      </Link>
    </div>
  );
};

export default OrderSuccess;
