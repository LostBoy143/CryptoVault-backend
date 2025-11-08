import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  signupSchema,
  loginSchema,
} from "../utils/validate.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(
      req.body
    );
    if (!parsed.success)
      return res
        .status(400)
        .json({ errors: parsed.error.flatten() });

    const { name, email, password } = parsed.data;

    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(409)
        .json({
          message: "Email already registered",
        });

    const passwordHash = await bcrypt.hash(
      password,
      10
    );
    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(201).json({ token });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(
      req.body
    );
    if (!parsed.success)
      return res
        .status(400)
        .json({ errors: parsed.error.flatten() });

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(
      password,
      user.passwordHash
    );
    if (!ok)
      return res
        .status(401)
        .json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Login failed" });
  }
});

export default router;
