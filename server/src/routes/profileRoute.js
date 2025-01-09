import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  verifyEmail,
  updateProfile,
  updateProfilePhoto,
  verifyOtp,
} from "../controllers/profileControler.js";
const router = express.Router();

router.put("/update-details", protectRoute, updateProfile);
router.put("/update-photo",protectRoute, updateProfilePhoto);
router.post("/verify-email/:userId", verifyEmail);
router.post("/verify-otp/:userId", verifyOtp);


export default router;
