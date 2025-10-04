import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-center px-4">
      <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-400 drop-shadow-lg">
        404
      </h1>

      <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-lg">
        The page you are looking for does not exist or has been moved
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>

      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    </div>
  );
}

export default NotFound;
