import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI("AIzaSyBZm4-Unp7cnMZrjdUbEGN8WYtGLQWhUmI");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// Function to check if input is a question
const isQuestion = (input) => {
  // Check if the input ends with a question mark
  if (input.trim().endsWith("?")) {
    return true;
  }

  // Define a list of question words
  const questionWords = ["who", "what", "where", "when", "why", "how"];

  // Split the input into sentences and check each sentence
  const sentences = input.split(/[.!?]/); // Split by sentence-ending punctuation
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim().toLowerCase();
    if (
      trimmedSentence.length > 0 &&
      questionWords.some((word) => trimmedSentence.startsWith(word))
    ) {
      return true;
    }
  }

  return false;
};

// Main function to generate content
export const generateContent = async (prompt, mode) => {
  // **System message to enforce behavior**
  const systemMessage =
    "You are an AI that strictly does not answer questions. If a user asks a question, do not respond.";

  // **Step 1: Filter out questions before sending to AI**
  if (isQuestion(prompt)) {
    console.log("Input is a question. AI will not generate a response.");
    return "I am not allowed to answer questions.";
  }

  try {
    // **Step 2: AI Call with system instructions**
    const result = await model.generateContent([
      systemMessage,
      `${prompt} Make the result ${mode} to AI detector. Use basic words only, keep the original context, tone, and length. Make it like a high schooler wrote it.`,
    ]);

    let text = result.response.text();

    // **Step 3: Post-processing - Ensure the AI response is not a question**
    if (isQuestion(text)) {
      console.log("AI response was a question. Returning default message.");
      return "I am not allowed to answer questions.";
    }

    console.log(text);
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while generating content.";
  }
};
