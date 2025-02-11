import React, { useState } from "react";

export function Modes({ onModeChange }) {
  const options = [
    { label: "Basic", value: "Basic" },
    { label: "Undetectable", value: "Undetectable" },
  ];
  const [value, setValue] = useState("");

  const handleClick = (option) => {
    setValue(option.value);
    onModeChange(option.value);
    console.log("Mode changed to:", option.value);
  };

  return (
    <div className="pl-4 pr-4 md:w-3/4 w-full md:h-24 h-12 border border-gray-300 rounded-lg flex justify-start gap-10 items-center">
      <h1 className="text-md md:text-2xl text-gray-500 font-semibold">
        Options:
      </h1>
      <div className="flex h-full">
        {options.map((option) => (
          <button
            key={option.value}
            className={`border-r border-l border-t-0 border-b-0 font-semibold text-md  md:text-2xl border-gray-300 px-4 py-2 h-full ${
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
