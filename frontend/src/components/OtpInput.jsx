import React from "react";
import { useState } from "react";

const OtpInput = ({ length = 6, onOtpChange, inputRefs }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleOtpChangeInternal = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    onOtpChange(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <div>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleOtpChangeInternal(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-12 h-12 text-center text-xl font-medium rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 m-1"
        />
      ))}
    </div>
  );
};

export default OtpInput;

//
