import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBZm4-Unp7cnMZrjdUbEGN8WYtGLQWhUmI");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const isQuestion = (input) => {
  const questionPattern = /\?\s*$/;
  return questionPattern.test(input.trim());
};

export const generateContent = async (prompt, mode) => {
  if (isQuestion(prompt)) {
    console.log("Input is a question. AI will not generate a response.");
    return "I am not allowed to answer questions.";
  }

  try {
    const result = await model.generateContent(
      prompt +
        `Make the result ${mode} to AI detector. Make basic words only and don't change the context and length of the text and don't change the tone. Rule: 1. Do not answer questions and don't give responses 2. If input is asking, do not answer. 3. make the result a little bit longer`
    );
    console.log(result.response.text());
    return result.response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while generating content.";
  }
};
