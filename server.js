import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import assetRouter from "./routes/assets.js";

const app = express();

// Parse incoming JSON
app.use(express.json());

// ✅ FIXED: Removed the extra `app.use(` line and closed parentheses properly
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);

// Health check route
app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "cryptovault-backend",
    ts: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/assets", assetRouter);

// Start the server
async function start() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("MongoDB connected");

    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(
        `Server running on http://localhost:${port}`
      )
    );
  } catch (err) {
    console.error(
      "MongoDB connection error:",
      err
    );
    process.exit(1);
  }
}

start();

export default app;
