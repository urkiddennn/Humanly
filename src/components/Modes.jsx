import React, { useState } from "react";

export function Modes() {
  const options = [
    {
      label: "Simple",
      value: "Simple",
    },
    {
      label: "advance",
      value: "advance",
    },
  ];
  const [value, setValue] = useState("");

  return (
    <div className="pl-4 pr-4 w-3/4 h-28 border border-gray-300 rounded-lg flex justify-start gap-10 items-center">
      <h1 className="text-2xl text-gray-500 font-semibold">Options:</h1>
    </div>
  );
}

export default Modes;
