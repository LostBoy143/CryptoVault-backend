import { Router } from "express";
import Asset from "../models/Asset.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @route POST /api/assets
 * @desc Add a new asset
 */
router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      symbol,
      quantity,
      buyPrice,
      currentPrice,
    } = req.body;

    if (
      !name ||
      !symbol ||
      !quantity ||
      !buyPrice
    ) {
      return res
        .status(400)
        .json({
          message: "All fields are required",
        });
    }

    const asset = await Asset.create({
      userId: req.user.sub,
      name,
      symbol,
      quantity,
      buyPrice,
      currentPrice: currentPrice || 0,
    });

    res.status(201).json(asset);
  } catch (err) {
    console.error("Error adding asset:", err);
    res
      .status(500)
      .json({ message: "Failed to add asset" });
  }
});

/**
 * @route GET /api/assets
 * @desc Get all assets for a user
 */
router.get("/", auth, async (req, res) => {
  try {
    const assets = await Asset.find({
      userId: req.user.sub,
    }).sort({
      createdAt: -1,
    });
    res.json(assets);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to fetch assets",
      });
  }
});

/**
 * @route PUT /api/assets/:id
 * @desc Update an asset
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const asset = await Asset.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.sub,
      },
      req.body,
      { new: true }
    );

    if (!asset) {
      return res
        .status(404)
        .json({ message: "Asset not found" });
    }

    res.json(asset);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to update asset",
      });
  }
});

/**
 * @route DELETE /api/assets/:id
 * @desc Delete an asset
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const asset = await Asset.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.sub,
    });

    if (!asset) {
      return res
        .status(404)
        .json({ message: "Asset not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to delete asset",
      });
  }
});

export default router;
