import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-20 bg-amber-900 px-4">
        <input
          type="email"
          className="h-9 w-full max-w-md rounded-full px-4 bg-white"
          placeholder="Enter your email here"
        />
      </div>

      <div className="bg-amber-800 text-white p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          <div>
            <h1 className="text-xl font-bold mb-4">FIND US</h1>
            <p className="mb-2">Electronic Complex, Indore M.P</p>
            <p className="mb-2">vazatwisha@gmail.com</p>
            <p className="mb-2">Phone: 7203910946</p>

            <div className="flex gap-3 mt-3 items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                alt="Facebook"
                className="w-6 h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
                alt="Twitter"
                className="w-6 h-6"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjkP_XcungzetNxeksC2zRdQGjKQzt2t6avw&s"
                alt="YouTube"
                className="w-7 h-7"
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold mb-4">INFORMATION</h1>
            <p className="mb-2">Shipping & returns</p>
            <p className="mb-2">Privacy notice</p>
            <p className="mb-2">Conditions of Use</p>
            <p className="mb-2">About us</p>
            <p className="mb-2">Contact us</p>
          </div>

          <div>
            <h1 className="text-xl font-bold mb-4">Customer Service</h1>
            <p className="mb-2">Search</p>
            <p className="mb-2">Blog</p>
            <p className="mb-2">Recently viewed products</p>
            <p className="mb-2">Compare products list</p>
            <p className="mb-2">New products</p>
          </div>

          <div>
            <h1 className="text-xl font-bold mb-4">My Account</h1>
            <p className="mb-2">My account</p>
            <p className="mb-2">Orders</p>
            <p className="mb-2">Addresses</p>
            <p className="mb-2">Shopping cart</p>
            <p className="mb-2">Wishlist</p>
            <p className="mb-2">Apply for vendor account</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-20 px-4">
        <img
          src="http://cookiesbakery.nop-station.com/images/thumbs/0000107_logo.png"
          alt="Logo"
          className="w-[165px] h-[62px] object-contain"
        />
      </div>

      <div className="bg-amber-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-3">
          <span className="text-sm">
            Copyright © 2025 CookiesBakery Responsive Theme
          </span>

          <p className="text-sm">Powered by nopCommerce</p>

          <div className="flex gap-4 items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="w-10"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e5/RuPay.svg"
              alt="RuPay"
              className="w-12"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Discover_Card_logo.svg"
              alt="Discover"
              className="w-12"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              className="w-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
