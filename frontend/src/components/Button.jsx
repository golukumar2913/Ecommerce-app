import React from "react";

function Button({ children, variant = "buy", onClick }) {
  // Button variants
  const variants = {
    addProduct:
      "bg-green-600 text-white font-semibold shadow hover:bg-green-700 focus:ring-2 focus:ring-green-400 rounded-lg transition",
    edit: "bg-indigo-500 text-white font-semibold shadow hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 rounded-lg transition",
    delete:
      "bg-red-600 text-white font-semibold shadow hover:bg-red-700 focus:ring-2 focus:ring-red-400 rounded-lg transition",
    addCart:
      "bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 rounded-lg transition",
    details:
      "bg-gray-500 text-white font-semibold shadow hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 rounded-lg transition",
    buy: "bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 rounded-lg transition",
  };

  const size = "px-5 py-2 text-md";

  return (
    <button className={`${size} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
