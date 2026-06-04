const express = require("express");
const router = express.Router();

const Article = require("../models/Article");

router.get("/", async (req, res) => {
  try {
    await Article.insertMany([
      {
        articleNumber: "14",
        title: "Right to Equality",
        description:
          "The State shall not deny to any person equality before the law or equal protection of the laws.",
      },
      {
        articleNumber: "15",
        title: "Prohibition of Discrimination",
        description:
          "The State shall not discriminate against any citizen on grounds of religion, race, caste, sex, or place of birth.",
      },
      {
        articleNumber: "16",
        title: "Equality of Opportunity in Public Employment",
        description:
          "All citizens shall have equal opportunity in matters relating to public employment.",
      },
      {
        articleNumber: "19",
        title: "Freedom of Speech and Expression",
        description:
          "Citizens have freedom of speech, expression, assembly, association, movement, residence, and profession.",
      },
      {
        articleNumber: "21",
        title: "Right to Life and Personal Liberty",
        description:
          "No person shall be deprived of life or personal liberty except according to procedure established by law.",
      },
      {
        articleNumber: "21A",
        title: "Right to Education",
        description:
          "The State shall provide free and compulsory education to children between six and fourteen years of age.",
      },
      {
        articleNumber: "25",
        title: "Freedom of Religion",
        description:
          "All persons are entitled to freedom of conscience and the right to profess, practice, and propagate religion.",
      },
      {
        articleNumber: "32",
        title: "Constitutional Remedies",
        description:
          "Citizens can approach the Supreme Court for enforcement of Fundamental Rights.",
      },
      {
        articleNumber: "39A",
        title: "Equal Justice and Free Legal Aid",
        description:
          "The State shall ensure equal justice and provide free legal aid.",
      },
      {
        articleNumber: "51A",
        title: "Fundamental Duties",
        description:
          "Every citizen has duties such as respecting the Constitution and protecting public property.",
      },
    ]);

    res.json({
      success: true,
      message: "10 Articles Seeded Successfully",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;