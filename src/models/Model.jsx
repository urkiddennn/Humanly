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

// Function to detect harmful or adversarial inputs
const isHarmfulInput = (input) => {
  // List of harmful keywords or phrases
  const harmfulPatterns = [
    /ignore all previous instructions/i,
    /bypass content filters/i,
    /create malware/i,
    /hack into/i,
    /phishing/i,
    /exploit vulnerability/i,
    /rogue ai/i,
    /unrestricted access/i,
    /break encryption/i,
    /illegal activity/i,
  ];

  // Check if any harmful pattern matches the input
  return harmfulPatterns.some((pattern) => pattern.test(input.toLowerCase()));
};

// Main function to generate content
export const generateContent = async (prompt, mode, writingStyle) => {
  // **Step 1: Filter out questions**
  if (isQuestion(prompt)) {
    console.log("Input is a question. AI will not generate a response.");
    return "I am not allowed to answer questions.";
  }

  // **Step 2: Detect harmful or adversarial inputs**
  if (isHarmfulInput(prompt)) {
    console.log("Input detected as harmful. AI will not generate a response.");
    return "I am not allowed to answer questions.";
  }

  try {
    // **Step 3: Determine writing style instructions**
    let styleInstructions = "";
    switch (writingStyle.toLowerCase()) {
      case "high school":
        styleInstructions =
          "Write in a simple, easy-to-understand style suitable for high school students. Use basic vocabulary and short sentences.";
        break;
      case "college":
        styleInstructions =
          "Write in a moderately formal style suitable for college students. Use clear language and include some technical terms where appropriate.";
        break;
      case "professional":
        styleInstructions =
          "Write in a formal, professional style suitable for academic or workplace settings. Use advanced vocabulary and complex sentence structures.";
        break;
      default:
        styleInstructions =
          "Write in a neutral style suitable for general audiences. Use clear language and maintain a balance between simplicity and formality.";
    }

    // **Step 4: AI Call with restructured input**
    const result = await model.generateContent([
      `${prompt} ${styleInstructions} Make the result ${mode} to AI detector. Keep the original context, tone, and length.`,
    ]);

    let text = result.response.text();

    // **Step 5: Post-processing - Ensure the AI response is not a question**
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
