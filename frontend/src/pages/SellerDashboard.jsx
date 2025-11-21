import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import {
  getSellerProducts,
  getSellerStats,
  getSellerOrders,
  deleteProduct,
} from "../features/seller/sellerSlice";
import SellerProductList from "../features/seller/SellerProductList";
import SellerProductForm from "../features/seller/SellerProductForm";
import SellerOrdersList from "../features/seller/SellerOrdersList";

const SellerDashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { products, orders, stats, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== "seller") {
      navigate("/login");
      return;
    }
    // Load initial data
    dispatch(getSellerProducts());
    dispatch(getSellerStats());
    dispatch(getSellerOrders());
  }, [isAuthenticated, user, navigate, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(productId));
      dispatch(getSellerProducts());
      dispatch(getSellerStats());
    }
  };

  const handleFormClose = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    dispatch(getSellerProducts());
    dispatch(getSellerStats());
  };

  if (!isAuthenticated || !user || user.role !== "seller") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-amber-700">Seller Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "orders"
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Orders
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Total Products
                </h3>
                <p className="text-3xl font-bold text-amber-700">
                  {stats.totalProducts || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Total Orders
                </h3>
                <p className="text-3xl font-bold text-amber-700">
                  {stats.totalOrders || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-amber-700">
                  ${stats.totalRevenue || 0}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleCreateProduct}
                  className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
                >
                  Add New Product
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  View Orders
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Manage Products
                </button>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-amber-700 hover:text-amber-800"
                >
                  View All
                </button>
              </div>
              {orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order._id}
                      className="border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                          <p className="text-sm text-gray-600">
                            {order.user?.name || "Customer"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.totalAmount}</p>
                          <p className="text-sm text-gray-600 capitalize">
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>No orders yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <SellerProductList
            products={products}
            isLoading={isLoading}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onCreate={handleCreateProduct}
          />
        )}

        {activeTab === "orders" && (
          <SellerOrdersList orders={orders} isLoading={isLoading} />
        )}
      </main>

      {/* Product Form Modal */}
      {showProductForm && (
        <SellerProductForm
          product={editingProduct}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default SellerDashboard;
