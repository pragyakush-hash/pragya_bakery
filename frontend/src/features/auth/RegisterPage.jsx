import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "../../components/OtpInput";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  console.log("formdatafinal,", formData);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isAuthenticated){
      toast.success("Registration successfully..")
       navigate("/")
    };
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, otp: formData.otp.join("") };
    dispatch(registerUser(finalData));
    console.log("Form submitted:", finalData);
  };
  const handleOtpChange = (newOtpArray) => {
    setFormData((prevData) => ({
      ...prevData,
      otp: newOtpArray,
    }));
  };

  return (
    <>
      <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center m-30">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
          Welcome to Bakery Bliss
        </h1>
        <form
          action="#"
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              Role:
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              OTP:
            </label>

            <OtpInput
              length={6}
              onOtpChange={handleOtpChange}
              inputRefs={inputRefs}
            />
          </div>

          <button
            type="submit"
            className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded text-center"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Already have an account?{" "}
          </span>
          <Link to="/login" className="text-amber-700 hover:text-amber-800">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
