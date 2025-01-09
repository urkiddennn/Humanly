import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { generateContent } from "../models/Model.jsx";
import ReactMarkdown from "react-markdown"; // to render markdown responses

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const wordCount = userInput.split(/\s+/).filter(Boolean).length;
  const letterCount = userInput.length;

  //
  const handleTextChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClear = () => {
    setUserInput("");
    setResponse("");
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setResponse("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await generateContent(userInput);
      setResponse(res());
      setUserInput("");
    } catch (err) {
      console.error("Error generating response:", err);
      setResponse("Failed to generate response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-container flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold">Humanly</h1>
      <div className="w-3/4 h-28 border border-gray-300 rounded-lg"></div>
      <div className="w-3/4 h-full flex gap-5">
        <div className="input-side ">
          <textarea
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            className="h-full p-1"
          ></textarea>

          <div className="button-group">
            <button onClick={handleClear} className="clear-btn">
              Clear
            </button>
            <p classsname="text-4xl text-gray-400 align-center">
              {wordCount}/300
            </p>
            <button
              onClick={handleSubmit}
              className="send-btn flex justify-center items-center gap-2"
            >
              <IoIosSend />
              <p>Humanize</p>
            </button>
          </div>
        </div>

        <div className="response-side">
          {isLoading ? (
            <p className="loading-text">Generating response...</p>
          ) : response ? (
            <ReactMarkdown className="text-lg">{response}</ReactMarkdown>
          ) : (
            <p className="text-5xl align-center"></p>
          )}
        </div>
      </div>
    </div>
  );
}
