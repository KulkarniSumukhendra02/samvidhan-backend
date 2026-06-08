const express = require("express");
const router = express.Router();

const Permission = require("../models/Permission");

const {
  getPermissions,
  getPermissionById,
} = require("../controllers/permissionController");

router.get("/", getPermissions);

router.get("/seed", async (req, res) => {
  try {
    await Permission.deleteMany({});

    const permissions = await Permission.insertMany([
      {
        title: "FSSAI License",
        category: "Food Business",
        description: "Required to operate any food-related business.",
        documents: [
          "Aadhaar Card",
          "PAN Card",
          "Business Address Proof",
        ],
        steps: [
          "Register on FSSAI portal",
          "Submit documents",
          "Pay fees",
          "Receive license",
        ],
        authority: "FSSAI",
      },
      {
        title: "Trade License",
        category: "Business",
        description:
          "Permission from local municipal authority to conduct business.",
        documents: [
          "Identity Proof",
          "Address Proof",
          "Business Details",
        ],
        steps: [
          "Apply to municipality",
          "Upload documents",
          "Pay fees",
          "Get approval",
        ],
        authority: "Municipal Corporation",
      },
      {
        title: "GST Registration",
        category: "Tax",
        description:
          "Required for businesses crossing GST thresholds.",
        documents: [
          "PAN Card",
          "Aadhaar Card",
          "Business Proof",
        ],
        steps: [
          "Apply on GST portal",
          "Verify OTP",
          "Submit application",
          "Receive GSTIN",
        ],
        authority: "GST Department",
      },
    ]);

    res.json(permissions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", getPermissionById);

module.exports = router;