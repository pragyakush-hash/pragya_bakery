import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NewProductsPage from "./pages/NewProductsPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import EmailVerification from "./features/auth/EmailVerification";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import CartPage from "./features/cart/CartPage";
import ProductDetail from "./features/products/ProductDetail";
import OrderSuccess from "./features/orders/OrderSuccess";
// import OrderHistory from "./features/orders/OrderHistory";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SearchResultsPage from "./pages/SearchResultsPage";
import AuthInitializer from "./components/AuthInitializer";
import OrderHistory from "./features/orders/OrderHistory";

const AppContent = () => {
  const location = useLocation();
  const isSellerDashboard = location.pathname.startsWith("/seller-dashboard");
  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");
  const hideNavbarFooter = isSellerDashboard || isAdminDashboard;

  return (
    <div>
      <AuthInitializer />
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/new_products" element={<NewProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email_verification" element={<EmailVerification />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
