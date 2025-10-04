import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../Context/themecontext";
import { isLoggedIn } from "../Authenticate";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/logouthandler";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={
        (darkMode
          ? "bg-gray-900 shadow-lg text-gray-100"
          : "bg-white shadow-lg text-gray-900") +
        " sticky top-0 z-50 px-6 py-3 relative"
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className={
              "text-xl md:text-2xl font-extrabold tracking-tight hover:scale-105 transition-transform duration-300 flex items-center gap-2 " +
              (darkMode ? "text-blue-300" : "text-blue-600")
            }
          >
            <img
              src="/logo.jpg"
              alt="logo"
              className="w-[35px] h-[35px] object-contain rounded-full transition-transform duration-300 hover:scale-125"
            />
            <span className="hidden md:inline">ShopSmart</span>
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Search products..."
            className={
              "w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition " +
              (darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
                : "border-gray-300 focus:ring-blue-500")
            }
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Icons */}
          {isLoggedIn() && (
            <>
              <Link
                to="/profile"
                className="hover:scale-110 transition-transform"
              >
                <FaUser
                  className={
                    "text-xl " +
                    (darkMode
                      ? "text-blue-300 hover:text-blue-400"
                      : "text-blue-500 hover:text-blue-700")
                  }
                />
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-1 hover:scale-105 transition-transform"
              >
                <FaShoppingCart
                  className={
                    "text-xl " +
                    (darkMode
                      ? "text-blue-300 hover:text-blue-400"
                      : "text-blue-500 hover:text-blue-700")
                  }
                />
              </Link>
            </>
          )}

          {/* Login Button */}
          {!isLoggedIn() ? (
            <Link to="/login" className="hidden md:block">
              <button
                className={
                  "px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition duration-300 " +
                  (darkMode
                    ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700")
                }
              >
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className={
                "px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition duration-300 hidden md:block " +
                (darkMode
                  ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700")
              }
            >
              Logout
            </button>
          )}

          <button
            onClick={toggleTheme}
            className={
              "ml-2 px-2 py-1 rounded transition hidden md:inline-block " +
              (darkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300")
            }
            title="Toggle Theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            {isOpen ? (
              <FaTimes
                className={
                  "text-2xl cursor-pointer " +
                  (darkMode ? "text-gray-100" : "text-gray-800")
                }
                onClick={toggleMenu}
              />
            ) : (
              <FaBars
                className={
                  "text-2xl cursor-pointer " +
                  (darkMode ? "text-gray-100" : "text-gray-800")
                }
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Overlay Style */}
      {isOpen && (
        <div
          className={
            "md:hidden absolute top-full left-0 w-full shadow-lg flex flex-col gap-4 p-4 z-40 font-medium " +
            (darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-700")
          }
        >
          {!isLoggedIn() ? (
            <Link to="/login" onClick={toggleMenu}>
              <button
                className={
                  "w-full py-2 rounded-full transition " +
                  (darkMode
                    ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700")
                }
              >
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className={
                "w-full py-2 rounded-full transition " +
                (darkMode
                  ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700")
              }
            >
              Logout
            </button>
          )}

          {/* Theme Toggle (Mobile) */}
          <button
            onClick={toggleTheme}
            className={
              "mt-2 px-2 py-1 rounded-full  rounded transition " +
              (darkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300")
            }
            title="Toggle Theme"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
