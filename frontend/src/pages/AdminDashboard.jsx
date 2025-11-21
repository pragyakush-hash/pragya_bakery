import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import {
  getAdminStats,
  getAllUsers,
  getAllProducts,
  getAllOrders,
  deleteUser,
  deleteProduct,
  updateOrderStatus,
} from "../features/admin/adminSlice";
import AdminUsersList from "../features/admin/AdminUsersList";
import AdminProductsList from "../features/admin/AdminProductsList";
import AdminOrdersList from "../features/admin/AdminOrdersList";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { stats, users, products, orders, isLoading } = useSelector(
    (state) => state.admin
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userFilter, setUserFilter] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    // Load initial data
    dispatch(getAdminStats());
    dispatch(getAllUsers());
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [isAuthenticated, user, navigate, dispatch]);

  useEffect(() => {
    if (activeTab === "users") {
      dispatch(getAllUsers(userFilter));
    }
  }, [userFilter, activeTab, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(userId));
      dispatch(getAllUsers(userFilter));
      dispatch(getAdminStats());
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(productId));
      dispatch(getAllProducts());
      dispatch(getAdminStats());
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    await dispatch(updateOrderStatus({ orderId, status }));
    dispatch(getAllOrders());
    dispatch(getAdminStats());
  };

  if (!isAuthenticated || !user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-amber-700">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-800"
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
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Users
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-amber-700">
                  {stats.totalUsers || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Total Sellers
                </h3>
                <p className="text-3xl font-bold text-amber-700">
                  {stats.totalSellers || 0}
                </p>
              </div>
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
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Total Revenue
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ${stats.totalRevenue || 0}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("users")}
                  className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
                >
                  Manage Users
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Manage Products
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  View Orders
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

        {activeTab === "users" && (
          <AdminUsersList
            users={users}
            isLoading={isLoading}
            onDelete={handleDeleteUser}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
          />
        )}

        {activeTab === "products" && (
          <AdminProductsList
            products={products}
            isLoading={isLoading}
            onDelete={handleDeleteProduct}
          />
        )}

        {activeTab === "orders" && (
          <AdminOrdersList
            orders={orders}
            isLoading={isLoading}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

