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

// ✅ Allow only specific origins (Vercel + Localhost)
const allowedOrigins = [
  "http://localhost:3000",
  "https://crypto-vault-frontend-pink.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn(
          "Blocked CORS request from:",
          origin
        );
        return callback(
          new Error("Not allowed by CORS")
        );
      }
    },
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
app.get("/", (req, res) => {
  res.send(
    "Welcome to CryptoVault Backend Server..."
  );
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/assets", assetRouter);

// Start the server
async function start() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("✅ MongoDB connected");

    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(
        `🚀 Server running on http://localhost:${port}`
      )
    );
  } catch (err) {
    console.error(
      "❌ MongoDB connection error:",
      err
    );
    process.exit(1);
  }
}

start();

export default app;
