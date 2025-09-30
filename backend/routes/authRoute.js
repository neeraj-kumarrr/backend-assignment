import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  loginUser,
  verifyToken,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// ✅ PUBLIC - Anyone can try to login
router.post("/login", loginUser);

// ✅ PROTECTED - Need valid token to verify
router.get("/verify", protect, verifyToken);

// ✅ PROTECTED - Need valid token to logout
router.post("/logout", protect, logoutUser);

export default router;
