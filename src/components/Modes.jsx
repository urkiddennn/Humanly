import React, { useState } from "react";

export function Modes({ onModeChange, onWritingStyleChange }) {
  const options = [
    { label: "Basic", value: "Basic" },
    { label: "Undetectable", value: "Undetectable" },
  ];
  const styleOptions = [
    { label: "High School", value: "High School" },
    { label: "College", value: "College" },
    { label: "Professional", value: "Professional" },
  ];
  const [value, setValue] = useState("");
  const [styles, setStyle] = useState("");

  const handleClick = (option) => {
    setValue(option.value);
    onModeChange(option.value);
    console.log("Mode changed to:", option.value);
  };

  const handleStyleClick = (styleOption) => {
    setStyle(styleOption.value);
    onWritingStyleChange(styleOption.value);
    console.log("Style changed to:", styleOption.value);
  };

  return (
    <div className="p-4 w-full flex  md:flex-row flex-col md:w-3/4 border border-gray-300 rounded-lg justify-start md:items-center items-start">
      {/* Options Section */}
      <div className="flex flex-col md:flex-row gap-3 mb-2 md:mb-0 md:items-center">
        <h1 className="text-lg md:text-lg text-green-600 font-semibold">
          Options:
        </h1>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              className={`px-4 py-2 rounded-md text-sm md:text-base font-medium ${
                value === option.value
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:ml-4 ml-0 md:flex-row gap-4 md:items-center">
        <h1 className="text-lg md:text-xl text-green-600 font-semibold text-start">
          Style:
        </h1>
        <div className="flex flex-wrap gap-2 ">
          {styleOptions.map((style) => (
            <button
              key={style.value}
              className={`px-4 py-2 border rounded-md text-sm md:text-base font-medium ${
                styles === style.value
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleStyleClick(style)}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modes;
