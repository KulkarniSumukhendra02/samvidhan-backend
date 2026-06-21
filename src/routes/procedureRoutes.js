const express = require("express");

const router = express.Router();

const {
  getProcedures,
  getProcedureById,
} = require("../controllers/procedureController");

const Procedure = require("../models/Procedure");

// Get all procedures
router.get("/", getProcedures);

// Get single procedure by ID
router.get("/:id", getProcedureById);

// Seed procedures
router.get("/seed", async (req, res) => {
  try {
    await Procedure.deleteMany({});

    const procedures = await Procedure.insertMany([
      {
        title: "RTI Application",
        description: "Request information from government departments.",
        documents: [
          "Application Form",
          "Identity Proof",
        ],
        steps: [
          "Write RTI application",
          "Submit to Public Information Officer",
          "Pay fee",
          "Receive response",
        ],
        authority: "RTI Department",
      },
      {
        title: "Income Certificate",
        description: "Certificate showing annual income.",
        documents: [
          "Aadhaar Card",
          "Income Proof",
          "Address Proof",
        ],
        steps: [
          "Apply online",
          "Upload documents",
          "Verification",
          "Receive certificate",
        ],
        authority: "Revenue Department",
      },
      {
        title: "Caste Certificate",
        description: "Official proof of caste category.",
        documents: [
          "Aadhaar Card",
          "Address Proof",
          "Community Proof",
        ],
        steps: [
          "Apply online",
          "Upload documents",
          "Verification",
          "Certificate issued",
        ],
        authority: "Revenue Department",
      },
    ]);

    res.json(procedures);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;