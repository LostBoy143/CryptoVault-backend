import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    }, // e.g., Bitcoin
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    }, // e.g., BTC
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    buyPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currentPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Asset",
  assetSchema
);
