const { generateAnswer } = require("../services/groqService");
const Article = require("../models/Article");
const Permission = require("../models/Permission");
const Procedure = require("../models/Procedure");

const chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        answer: "Question is required",
      });
    }

    // ======================
    // SEARCH ARTICLES
    // ======================
    const articleMatch = question.match(/\d+/);

    if (articleMatch) {
      const article = await Article.findOne({
        articleNumber: articleMatch[0],
      });

      if (article) {
        const aiAnswer = await generateAnswer(
          `
Article ${article.articleNumber}
Title: ${article.title}
Description: ${article.description}
          `,
          question
        );

        return res.json({
          success: true,
          type: "article",
          answer: aiAnswer,
        });
      }
    }

    // ======================
    // SEARCH PERMISSIONS
    // ======================
    const permissions = await Permission.find();

    const permission = permissions.find((p) =>
      question.toLowerCase().includes(p.title.toLowerCase())
    );

    if (permission) {
      const aiAnswer = await generateAnswer(
        `
Permission: ${permission.title}
Category: ${permission.category}
Description: ${permission.description}
Documents: ${permission.documents.join(", ")}
Steps: ${permission.steps.join(", ")}
Authority: ${permission.authority}
        `,
        question
      );

      return res.json({
        success: true,
        type: "permission",
        answer: aiAnswer,
      });
    }

    // ======================
    // SEARCH PROCEDURES
    // ======================
    const procedures = await Procedure.find();

    const procedure = procedures.find((p) =>
      question.toLowerCase().includes(p.title.toLowerCase())
    );

    if (procedure) {
      const aiAnswer = await generateAnswer(
        `
Procedure: ${procedure.title}
Description: ${procedure.description}
Documents: ${procedure.documents.join(", ")}
Steps: ${procedure.steps.join(", ")}
Authority: ${procedure.authority}
        `,
        question
      );

      return res.json({
        success: true,
        type: "procedure",
        answer: aiAnswer,
      });
    }

    // ======================
    // NOTHING FOUND
    // ======================
    return res.json({
      success: false,
      answer: "No matching article, permission, or procedure found.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  chat,
};