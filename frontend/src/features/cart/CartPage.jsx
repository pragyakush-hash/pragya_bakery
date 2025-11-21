import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteItemFromCart, viewAllCartItems } from "./cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartCheckoutForm from "./CartCheckoutForm";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    dispatch(viewAllCartItems());
  }, [dispatch]);

  const handleUpdateQuantity = async (productId, newQty) => {
    if (newQty < 1) {
      const item = cartItems.find((item) => {
        const prodId = item.product?._id || item.product;
        return (
          prodId === productId || prodId?.toString() === productId?.toString()
        );
      });
      if (item) {
        await dispatch(deleteItemFromCart(item._id));
      }
      return;
    }
    await dispatch(updateCartQuantity({ productId, quantity: newQty }));
  };

  const handleDeleteToCart = async (cartItemId) => {
    await dispatch(deleteItemFromCart(cartItemId));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 0;
    return acc + price * quantity;
  }, 0);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
  const totalAmount = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {cartItems.length === 0
              ? "Your cart is empty"
              : `${totalItems} ${
                  totalItems === 1 ? "item" : "items"
                } in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Add some delicious items to get started!
            </p>
            <Link
              to="/"
              className="mt-6 inline-block bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="col-span-5 font-semibold text-gray-700">
                    Product
                  </div>
                  <div className="col-span-2 font-semibold text-gray-700 text-center">
                    Price
                  </div>
                  <div className="col-span-2 font-semibold text-gray-700 text-center">
                    Quantity
                  </div>
                  <div className="col-span-2 font-semibold text-gray-700 text-center">
                    Subtotal
                  </div>
                  <div className="col-span-1"></div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    const productId = item.product?._id || item.product;
                    const productPrice = item.product?.price || 0;
                    const quantity = item.quantity || 0;
                    const itemSubtotal = productPrice * quantity;

                    return (
                      <div
                        key={item._id}
                        className="p-4 md:p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                          {/* Product Image & Name */}
                          <div className="col-span-5 flex items-center gap-4 w-full md:w-auto">
                            <Link
                              to={`/product/${productId}`}
                              className="flex-shrink-0"
                            >
                              <img
                                src={item.product?.image}
                                alt={item.product?.name}
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-gray-200"
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link
                                to={`/product/${productId}`}
                                className="text-base md:text-lg font-semibold text-gray-900 hover:text-amber-800 line-clamp-2"
                              >
                                {item.product?.name}
                              </Link>
                              <p className="text-sm text-gray-500 mt-1">
                                {item.product?.category}
                              </p>
                              {item.product?.brand && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Brand: {item.product.brand}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="col-span-2 text-center w-full md:w-auto">
                            <p className="text-lg font-semibold text-gray-900">
                              ₹{productPrice.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 md:hidden">
                              Price
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="col-span-2 flex items-center justify-center gap-2 w-full md:w-auto">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(productId, quantity - 1)
                                }
                                className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading || quantity <= 1}
                              >
                                <span className="text-lg font-semibold">−</span>
                              </button>
                              <span className="px-4 py-2 min-w-[3rem] text-center font-semibold border-x border-gray-300">
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(productId, quantity + 1)
                                }
                                className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                              >
                                <span className="text-lg font-semibold">+</span>
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 md:hidden ml-2">
                              Qty
                            </p>
                          </div>

                          {/* Subtotal */}
                          <div className="col-span-2 text-center w-full md:w-auto">
                            <p className="text-lg font-bold text-gray-900">
                              ₹{itemSubtotal.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 md:hidden">
                              Subtotal
                            </p>
                          </div>

                          {/* Remove Button */}
                          <div className="col-span-1 flex justify-end w-full md:w-auto">
                            <button
                              onClick={() => handleDeleteToCart(item._id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
                              disabled={isLoading}
                              title="Remove item"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                            <p className="text-sm text-gray-500 md:hidden ml-2">
                              Remove
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-6">
                <Link
                  to="/"
                  className="text-amber-800 hover:text-amber-900 font-semibold inline-flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      Subtotal ({totalItems}{" "}
                      {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {subtotal < 500 && (
                    <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded">
                      Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-amber-800">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  Proceed to Checkout
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure checkout • Free returns
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCheckout && (
        <CartCheckoutForm
          onClose={() => setShowCheckout(false)}
          totalAmount={totalAmount}
        />
      )}
    </div>
  );
};

export default CartPage;


