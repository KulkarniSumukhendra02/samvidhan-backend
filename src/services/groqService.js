const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateAnswer = async (context, question) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are Samvidhan AI. Explain Indian legal, constitutional, permission and government procedure information in very simple language for ordinary citizens. Use examples whenever helpful.",
      },
      {
        role: "user",
        content: `
Question:
${question}

Information:
${context}

Explain this in simple language.
`,
      },
    ],
    temperature: 0.3,
  });

  return completion.choices[0].message.content;
};

module.exports = {
  generateAnswer,
};