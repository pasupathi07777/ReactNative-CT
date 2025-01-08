import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  verifyEmail,
  updateProfile,
  updateProfilePhoto,
  verifyOtp,
} from "../controllers/profileControler.js";
const router = express.Router();

router.put("/update-data/:userId", updateProfile);
router.put("/update-photo/:userId", updateProfilePhoto);
router.post("/verify-email/:userId", verifyEmail);
router.post("/verify-otp/:userId", verifyOtp);


export default router;
