import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";

import { getTecStu } from "../controllers/teacher.studentControler.js";
const router = express.Router();

router.get("/get-stu-tec", getTecStu);



export default router;
