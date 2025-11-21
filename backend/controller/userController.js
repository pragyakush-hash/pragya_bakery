import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Otp from "../models/otpModel.js";

// create all the remaining controllers 

const createUser = async (req, res) => {
  try {
    console.log(req.body, "resquestbody");
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error, "error for create user");
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error, "error for get user");

    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    if (role) {
      query.role = role;
    }
    const users = await User.find(query).select("-password");
    res.status(200).json({ users, total: users.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "user not found!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userDelete = await User.findByIdAndDelete(req.params.id);
    if (!userDelete)
      return res.status(404).json({ message: "user not found for deletion" });
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updating = await User.findByIdAndUpdate(req.params.id, res.body, {
      new: true,
    });
    if (!updating)
      return res.status(404).json({ message: "user not found for updating" });
    res.json({ message: "user updating successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, password, email, role, otp } = req.body;
    console.log(req.body, "request");
    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    // Secure password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, role, otp, password: hashedPassword });
    await user.save();
    console.log("user", user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch, "passwordMatch");
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Generate access token (short-lived, 15 minutes)
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, "p123", {
      expiresIn: "15m",
    });

    // Generate refresh token (long-lived, 7 days)
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, "p123", {
      expiresIn: "7d",
    });

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log(user._id);
    console.log(user.role);
    console.log(accessToken, "access token");
    
    res.status(200).json({ 
      token: accessToken, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      message: "login Successful" 
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Refresh token not provided" });
    }

    try {
      const decoded = jwt.verify(token, "p123");
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      // Generate new access token
      const accessToken = jwt.sign({ userId: user._id, role: user.role }, "p123", {
        expiresIn: "15m",
      });

      res.status(200).json({ 
        token: accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
  } catch (error) {
    res.status(500).json({ error: "Token refresh failed" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};

export default {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  register,
  login,
  refreshToken,
  logout,
};
