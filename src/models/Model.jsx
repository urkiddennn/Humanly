import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBZm4-Unp7cnMZrjdUbEGN8WYtGLQWhUmI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt, mode) => {
  const result = await model.generateContent(
    prompt +
      `(Mode: ${mode})` +
      "Make it humanly so that it doesn't look like it is AI generated. Make sure not to change the context."
  );
  console.log(result.response.text());
  return result.response.text; // return the response
};
