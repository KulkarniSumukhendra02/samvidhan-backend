require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const articleRoutes = require("./routes/articleRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const procedureRoutes = require("./routes/procedureRoutes");
const chatRoutes = require("./routes/chatRoutes");
const articleSeed = require("./routes/articleSeed");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/procedures", procedureRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/seed/articles", articleSeed);
// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Samvidhan AI Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});