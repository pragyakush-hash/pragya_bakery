import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    minlength: [6, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
  },
});

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);
export default User;
