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
      setUserInput("");
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
    <div className="chat-container flex justify-center items-center flex-col">
      <Header />
      <Modes onModeChange={handleModeChange} />
      <div className="w-3/4 h-full flex">
        <div className="input-side">
          <textarea
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyPress}
            placeholder="Type or paste your text here...."
            className="h-full p-1 text-2xl text-gray-800 border-none outline-none"
          ></textarea>

          <div className="button-group items-center">
            <button
              onClick={handleClear}
              className="text-gray-500 text-3xl bg-none"
            >
              <RiDeleteBin6Line />
            </button>
            <h1 className="text-gray-500 font-semibold">{wordCount}/300</h1>
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
