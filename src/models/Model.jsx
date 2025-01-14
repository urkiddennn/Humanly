import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBZm4-Unp7cnMZrjdUbEGN8WYtGLQWhUmI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt, mode) => {
  const result = await model.generateContent(
    prompt +
      `Make the result ${mode} to AI detector. Make basic words only and don't change teh context.`
  );
  console.log(result.response.text());
  return result.response.text;
};
