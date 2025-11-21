import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await dispatch(logoutUser());
    navigate("/login");
  };

  const handleDashboardClick = () => {
    setIsProfileOpen(false);
    if (user?.role === "seller") {
      navigate("/seller-dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/order-history");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0 left-0 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="http://cookiesbakery.nop-station.com/images/thumbs/0000107_logo.png"
              alt="Logo"
              className="w-[165px] h-[62px] object-contain"
            />
          </Link>

          {/* Search bar (visible in md and up) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative w-1/3"
          >
            <FaSearch className="absolute left-3 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              placeholder="Search for cakes, pastries..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="absolute right-2 px-3 py-1 text-sm text-amber-700 hover:text-amber-800 font-medium"
            >
              Search
            </button>
          </form>

          {/* Right Section (Cart, Fav, Profile) */}
          <div className="flex items-center space-x-5 md:order-2">
            {/* Favourites */}
            {isAuthenticated && (
              <Link
                to="/favorites"
                className="relative text-gray-700 hover:text-pink-600 transition-colors"
                title="Favorites"
              >
                <FaHeart className="text-xl" />
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-pink-600 transition-colors"
              title="Shopping Cart"
            >
              <FaShoppingCart className="text-xl" />
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Profile Dropdown or Login */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <FaUserCircle className="text-2xl" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <p className="font-semibold text-gray-800">
                        {user?.name || "User"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email || ""}
                      </p>
                      {user?.role && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded capitalize">
                          {user.role}
                        </span>
                      )}
                    </div>
                    <ul className="text-sm text-gray-600">
                      <li>
                        <button
                          onClick={handleDashboardClick}
                          className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <FaUserCircle className="text-sm" />
                          {user?.role === "seller"
                            ? "Seller Dashboard"
                            : user?.role === "admin"
                            ? "Admin Dashboard"
                            : "My Account"}
                        </button>
                      </li>
                      {user?.role !== "seller" && (
                        <li>
                          <Link
                            to="/order-history"
                            className="block px-4 py-2.5 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            My Orders
                          </Link>
                        </li>
                      )}
                      <li className="border-t border-gray-200 mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                        >
                          <FaSignOutAlt className="text-sm" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
              >
                <FaUserCircle className="text-2xl" />
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-pink-600"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>

          {/* Nav Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-pink-600 md:text-gray-800 hover:text-pink-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/new_products"
                  className="block py-2 px-3 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Products
                </Link>
              </li>
              {!isAuthenticated && (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-700 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Search bar (mobile only) */}
            <form
              onSubmit={handleSearch}
              className="relative mt-3 md:hidden"
            >
              <FaSearch className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
