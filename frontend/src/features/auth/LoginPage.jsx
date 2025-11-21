import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./authSlice";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({});
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("isAuthenticated in login", isAuthenticated);
    if (isAuthenticated === true && user) {
      toast.success("Login Successfully...");
      if (user.role === "seller") {
        navigate("/seller-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard"); 
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  return (
    <div className="px-4 py-10 md:px-20 m-30">
      <h1 className="text-center text-3xl font-bold text-amber-700 mb-5">
        Welcome, Please Sign In!
      </h1>
      <hr className="mb-10" />

      <div className="flex flex-col md:flex-row items-stretch justify-between gap-10">
        <div className="w-full md:w-1/2 flex">
          <div className="w-full max-w-md bg-white rounded-lg shadow p-6 h-full flex flex-col">
            <h2 className="text-center text-2xl font-bold text-amber-700 mb-3">
              New Customer
            </h2>
            <hr className="mb-4" />

            <p className="text-gray-700 mb-6 flex-grow">
              By creating an account on our website, you will be able to shop
              faster, stay updated on order status, and keep track of previous
              orders.
            </p>

            <Link to="/email_verification" className="mt-auto">
              <button className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded">
                Register
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex">
          <div className="w-full max-w-md bg-white rounded-lg shadow p-6 h-full flex flex-col">
            <h2 className="text-center text-2xl font-bold text-amber-700 mb-3">
              Returning Customer
            </h2>
            <hr className="mb-4" />

            <form className="space-y-4 flex-grow" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={loginData.email || ""}
                onChange={handleOnChange}
                placeholder="Email (name@company.com)"
                className="w-full p-2.5 border rounded-lg bg-gray-50"
                required
              />

              <input
                type="password"
                name="password"
                value={loginData.password || ""}
                onChange={handleOnChange}
                placeholder="••••••••"
                className="w-full p-2.5 border rounded-lg bg-gray-50"
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="h-4 w-4" />
                  Remember me
                </label>

                <Link className="text-sm text-amber-700 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
