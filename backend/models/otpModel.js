import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

const verifycationEmail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>PLease confirm your otp</h1> 
      <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("mailResponse", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
  }
};
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await verifycationEmail(this.email, this.otp);
  }
  next();
});
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
