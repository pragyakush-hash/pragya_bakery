import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllOrderByUser } from "./orderSlice";
import { useDispatch, useSelector } from "react-redux";

const OrderHistory = () => {
    const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);
  console.log(orders,"orders all")

  useEffect(() => {
    dispatch(getAllOrderByUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <p className="text-center text-gray-600 mt-20 text-xl">
        Loading your orders...
      </p>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-20 text-xl">
        You have no orders yet.
      </p>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Your Orders</h1>

      <div className="space-y-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* ORDER HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  ORDER ID: <span className="text-gray-800">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Placed On:{" "}
                  <span className="text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>

              {/* STATUS BADGE */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status || "pending"}
              </span>
            </div>

            {/* PRODUCT LIST */}
            <div className="divide-y">
              {order.products && order.products.length > 0 ? (
                order.products.map((item, index) => (
                  <div
                    key={item.product?._id || item.product || index}
                    className="flex items-center py-4 gap-4 hover:bg-gray-50 rounded-lg px-2"
                  >
                    {item.product?.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.name || "Product"}
                        className="w-20 h-20 object-cover rounded-lg shadow"
                      />
                    )}

                    <div className="flex-1">
                      <p className="text-lg font-medium">
                        {item.product?.name || "Product"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        ${item.product?.price || 0}
                      </p>
                    </div>

                    {item.product?._id && (
                      <Link
                        to={`/product/${item.product._id}`}
                        className="text-blue-600 underline text-sm hover:text-blue-800"
                      >
                        View Product
                      </Link>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 py-4">No products in this order</p>
              )}
            </div>

            {/* ORDER FOOTER */}
            <div className="flex justify-between items-center pt-4 mt-4 border-t">
              <div>
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="text-xl font-semibold text-gray-800">
                  ${order.totalAmount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
