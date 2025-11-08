import { Router } from "express";
import User from "../models/User.js";
import auth from "../middlewares/auth.js";
const requireAuth = auth;

const router = Router();

router.get(
  "/profile",
  requireAuth,
  async (req, res) => {
    const user = await User.findById(
      req.user.id
    ).select("name email createdAt updatedAt");
    return res.json({ user });
  }
);

router.put(
  "/profile",
  requireAuth,
  async (req, res) => {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { ...(name ? { name } : {}) },
      { new: true }
    ).select("name email createdAt updatedAt");
    return res.json({ user });
  }
);

export default router;
