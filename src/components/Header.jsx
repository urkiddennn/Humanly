import React from "react";
import { SiRobotframework } from "react-icons/si";
import { FaFacebook, FaGithub } from "react-icons/fa";

function Header() {
  return (
    <div className="w-3/4 h-28 pr-4 pl-4 flex justify-between text-white items-center rounded-lg bg-green-600">
      <div className="flex items-center justify-center gap-3 text-3xl font-bold">
        <SiRobotframework className="text-5xl text-white" />
        <h1>Humanly.AI</h1>
      </div>
      <div className="flex items-center justify-center gap-3 text-3xl">
        <a href="https://www.facebook.com/Urkidden">
          <FaFacebook />
        </a>
        <a href="https://github.com/urkiddennn/Humanly">
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default Header;
