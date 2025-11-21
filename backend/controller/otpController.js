import Otp from "../models/otpModel.js";
import User from "../models/userModel.js";
import speakeasy from "speakeasy";

const sendOtp = async (req, res) => {
  console.log("hello from send otp");
  try {
    const { email } = req.body;
    console.log(email, "email");
    const checkUserPresent = await User.findOne({ email });
    console.log(checkUserPresent, "checkuserpresent");

    if (checkUserPresent) {
      return res.status(401).json({ message: "User is already registerted" });
    }
    // let otp = otpGenerator.generate(6, {
    //   digits: true,
    //   upperCaseAlphabets: false,
    //   lowerCaseAlphabets: false,
    //   specialChars: false,
    // });

    // let result = await Otp.findOne({ otp });

    // while (result) {
    //   otp = otpGenerator.generate(6, {
    //     digits: true,
    //     upperCaseAlphabets: false,
    //     lowerCaseAlphabets: false,
    //     specialChars: false,
    //   });
    //   result = await Otp.findOne({ otp });
    // }

    const otp = speakeasy.totp({
      secret: speakeasy.generateSecret().base32,
      digit: 6,
      step: 600,
    });
    const otpPayload = { email, otp, expireAt: Date.now() + 10 * 60 * 1000 };
    const otpBody = await Otp.create(otpPayload);
    console.log(otpBody, "otpbodyyy");
    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
export default { sendOtp };
