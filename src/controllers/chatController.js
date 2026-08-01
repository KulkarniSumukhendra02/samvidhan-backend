const { generateAnswer } = require("../services/groqService");
const Article = require("../models/Article");
const Permission = require("../models/Permission");
const Procedure = require("../models/Procedure");

const chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        answer: "Question is required",
      });
    }

    const normalizedQuestion = question.toLowerCase().trim();

    // ==========================================
    // 1. MATCH OUR MAIN SUGGESTED QUESTIONS
    // ==========================================

    let procedureTitle = null;

    // What are my constitutional rights?
    if (
      normalizedQuestion.includes("constitutional rights") ||
      normalizedQuestion.includes("fundamental rights")
    ) {
      procedureTitle = "Constitutional Fundamental Rights";
    }

    // How to register property?
    else if (
      normalizedQuestion.includes("register property") ||
      normalizedQuestion.includes("property registration") ||
      normalizedQuestion.includes("register a property")
    ) {
      procedureTitle = "Property Registration";
    }

    // Can police arrest without warrant?
    else if (
      normalizedQuestion.includes("arrest without warrant") ||
      normalizedQuestion.includes("police arrest without warrant") ||
      (
        normalizedQuestion.includes("police") &&
        normalizedQuestion.includes("warrant")
      )
    ) {
      procedureTitle = "Police Arrest Without Warrant";
    }

    // How to apply for income certificate?
    else if (
      normalizedQuestion.includes("income certificate")
    ) {
      procedureTitle = "Income Certificate";
    }

    // ==========================================
    // 2. GET MATCHED PROCEDURE FROM MONGODB
    // ==========================================

    if (procedureTitle) {
      const procedure = await Procedure.findOne({
        title: procedureTitle,
      });

      if (procedure) {
        const context = `
Procedure: ${procedure.title}

Description:
${procedure.description || "Not available"}

Documents:
${
  procedure.documents && procedure.documents.length
    ? procedure.documents.join(", ")
    : "Not available"
}

Steps:
${
  procedure.steps && procedure.steps.length
    ? procedure.steps.join("\n")
    : "Not available"
}

Authority:
${procedure.authority || "Not available"}
        `;

        const aiAnswer = await generateAnswer(
          context,
          question
        );

        return res.json({
          success: true,
          type: "procedure",
          answer: aiAnswer,
        });
      }
    }

    // ==========================================
    // 3. SEARCH ARTICLE NUMBER
    // Example: "Explain Article 21"
    // ==========================================

    const articleMatch = normalizedQuestion.match(
      /article\s*(\d+[a-z]?)/i
    );

    if (articleMatch) {
      const article = await Article.findOne({
        articleNumber: articleMatch[1],
      });

      if (article) {
        const context = `
Article ${article.articleNumber}

Title:
${article.title}

Description:
${article.description}
        `;

        const aiAnswer = await generateAnswer(
          context,
          question
        );

        return res.json({
          success: true,
          type: "article",
          answer: aiAnswer,
        });
      }
    }

    // ==========================================
    // 4. SEARCH PERMISSIONS
    // ==========================================

    const permissions = await Permission.find();

    const permission = permissions.find((p) => {
      const title = p.title.toLowerCase();

      return (
        normalizedQuestion.includes(title) ||
        title
          .split(" ")
          .some(
            (word) =>
              word.length > 3 &&
              normalizedQuestion.includes(word)
          )
      );
    });

    if (permission) {
      const context = `
Permission: ${permission.title}

Category:
${permission.category || "Not available"}

Description:
${permission.description || "Not available"}

Documents:
${
  permission.documents && permission.documents.length
    ? permission.documents.join(", ")
    : "Not available"
}

Steps:
${
  permission.steps && permission.steps.length
    ? permission.steps.join("\n")
    : "Not available"
}

Authority:
${permission.authority || "Not available"}
      `;

      const aiAnswer = await generateAnswer(
        context,
        question
      );

      return res.json({
        success: true,
        type: "permission",
        answer: aiAnswer,
      });
    }

    // ==========================================
    // 5. SEARCH OTHER PROCEDURES
    // ==========================================

    const procedures = await Procedure.find();

    const procedure = procedures.find((p) => {
      const title = p.title.toLowerCase();

      return (
        normalizedQuestion.includes(title) ||
        title
          .split(" ")
          .some(
            (word) =>
              word.length > 3 &&
              normalizedQuestion.includes(word)
          )
      );
    });

    if (procedure) {
      const context = `
Procedure: ${procedure.title}

Description:
${procedure.description || "Not available"}

Documents:
${
  procedure.documents && procedure.documents.length
    ? procedure.documents.join(", ")
    : "Not available"
}

Steps:
${
  procedure.steps && procedure.steps.length
    ? procedure.steps.join("\n")
    : "Not available"
}

Authority:
${procedure.authority || "Not available"}
      `;

      const aiAnswer = await generateAnswer(
        context,
        question
      );

      return res.json({
        success: true,
        type: "procedure",
        answer: aiAnswer,
      });
    }

    // ==========================================
    // 6. NOTHING FOUND
    // ==========================================

    return res.json({
      success: false,
      type: "not_found",
      answer:
        "I couldn't find information about that topic in the Samvidhan AI database.",
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  chat,
};