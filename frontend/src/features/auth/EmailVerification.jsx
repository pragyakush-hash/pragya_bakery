import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailVerification } from "./authSlice";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(emailVerification(emailInput));
  };

  useEffect(() => {
    if (error) {
      console.log(`Signup failed: ${error.message || "Unknown error"}`);
    }
    if (isLoading) {
        navigate("/register");
    }
  }, [error, isLoading]);

  return (
    <>
      <div className="mt-30 text-2xl text-amber-700 text-center font-bold ">
        <h1>First You Need To Verify Your Email</h1>
      </div>
      <div className="mt-10 ">
        <form className="max-w-sm mx-auto border p-20" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="mt-30 text-xl text-amber-700">
              Your email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded text-center"
          >
            {/* sent otp */}
            {console.log(isLoading, "isloading")}
            {isLoading ? "sending otp..." : "opt send"}
          </button>
          {error ? (
            <p style={{ color: "red" }}>
              {error.message || "Please enter valid email address"}
            </p>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
};

export default EmailVerification;
