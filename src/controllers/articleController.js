const Article = require("../models/Article");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getArticleByNumber = async (req, res) => {
  try {
    const article = await Article.findOne({
      articleNumber: req.params.number,
    });

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getArticles,
  createArticle,
  getArticleByNumber,
};