const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    documents: [String],
    steps: [String],
    authority: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", PermissionSchema);