import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  signUpUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// signUp route
router.post("/signup", signUpUser);

// login route
router.post("/login", loginUser);

// logout route
router.post("/logout", logoutUser);

// Profile route
router.get("/profile/:uid", protectRoute, getProfile);

export default router;
