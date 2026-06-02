const express = require("express");

const router = express.Router();

const {
  getArticles,
  createArticle,
  getArticleByNumber,
} = require("../controllers/articleController");

const Article = require("../models/Article");

// Get all articles
router.get("/", getArticles);

// Get article by number
router.get("/:number", getArticleByNumber);

// Create article
router.post("/", createArticle);

// Seed article
router.get("/seed", async (req, res) => {
  try {
    const article = await Article.create({
      articleNumber: "21",
      title: "Right to Life and Personal Liberty",
      description:
        "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    });

    res.json(article);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;