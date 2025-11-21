import { Router } from "express";
import otpController from "../controller/otpController.js";

const route = Router();
route.post("/", otpController.sendOtp);
export default route;
