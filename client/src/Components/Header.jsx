import React from "react";
import { useNavigate } from "react-router-dom";
const Header = ({ goTo }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex items-center justify-between shadow-md">
      <div className="text-white text-2xl font-bold">Dynamic App</div>
      <button
        onClick={() => {
          goTo === "banner" ? navigate("/") : navigate("/dashboard");
        }}
        className="px-4 py-2 bg-white text-indigo-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
      >
        Go to {goTo}
      </button>
    </header>
  );
};

export default Header;
