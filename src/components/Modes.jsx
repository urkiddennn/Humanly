import React, { useState } from "react";

export function Modes({ onModeChange }) {
  const options = [
    { label: "Simple", value: "Simple" },
    { label: "Advanced", value: "Advanced" },
  ];
  const [value, setValue] = useState("");

  const handleClick = (option) => {
    setValue(option.value);
    onModeChange(option.value);
    console.log("Mode changed to:", option.value);
  };

  return (
    <div className="pl-4 pr-4 w-3/4 h-28 border border-gray-300 rounded-lg flex justify-start gap-10 items-center">
      <h1 className="text-2xl text-gray-500 font-semibold">Options:</h1>
      <div className="flex h-full">
        {options.map((option) => (
          <button
            key={option.value}
            className={`border-r border-l border-t-0 border-b-0 font-semibold text-2xl border-gray-300 px-4 py-2 h-full ${
              value === option.value
                ? "bg-green-600 text-white"
                : "text-gray-500"
            }`}
            onClick={() => handleClick(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Modes;
