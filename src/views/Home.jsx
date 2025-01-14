import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { generateContent } from "../models/Model.jsx";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header.jsx";
import Modes from "../components/Modes.jsx";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("");

  const handleModeChange = (newMode) => {
    setMode(newMode);
    console.log("Mode changed to:", newMode);
  };

  const wordCount = userInput.split(/\s+/).filter(Boolean).length;

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
      const res = await generateContent(userInput, mode);
      setResponse(res);
      setUserInput(userInput);
    } catch (err) {
      console.error("Error generating response:", err);
      setResponse("Failed to generate response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-container flex justify-center p-1 items-center flex-col md:p-5">
      <Header />
      <Modes onModeChange={handleModeChange} />
      <div className="md:w-3/4 w-full h-full flex sm:flex-row flex-col">
        <div className="input-side h-1/2 md:h-full rounded-t-lg sm:rounded-l-lg md:rounded-r-none">
          <textarea
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyPress}
            placeholder="Type or paste your text here...."
            className="h-full p-1 text-xl md:text-2xl text-gray-800 border-none outline-none"
          ></textarea>

          <div className="button-group items-center">
            <button
              onClick={handleClear}
              className="text-gray-500 text-2xl md:text-3xl bg-none"
            >
              <RiDeleteBin6Line />
            </button>
            <h1 className="text-gray-500 md:text-xl text-lg font-semibold">
              {wordCount}/300
            </h1>
            <button
              onClick={handleSubmit}
              className="send-btn flex justify-center items-center gap-2 text-lg md:text-xl"
            >
              <IoIosSend />
              <p>Humanize</p>
            </button>
          </div>
        </div>

        <div className="response-side h-1/2 md:h-full">
          {isLoading ? (
            <p className="loading-text">Generating response...</p>
          ) : response ? (
            <ReactMarkdown className="text-2xl text-gray-700">
              {response}
            </ReactMarkdown>
          ) : (
            <p className="text-5xl align-center"></p>
          )}
        </div>
      </div>
    </div>
  );
}
