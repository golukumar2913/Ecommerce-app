import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themecontext";

import { getUserFromToken } from "../Authenticate";

import {
  FaUserCircle,
  FaHeart,
  FaBox,
  FaTools,
  FaStore,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";
import Button from "../components/Button";

export default function Profile() {
  const { darkMode, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log("No user found in localStorage");
    }

    const tokenUser = getUserFromToken();
    if (tokenUser) {
      setDecoded(tokenUser);
    } else {
      console.log("No valid token found or failed to decode");
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">No user found Please login</p>
      </div>
    );
  }

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 px-6 py-10"
          : "min-h-screen bg-gray-100 px-6 py-10"
      }
    >
      {/* Main Card */}
      <div
        className={
          "max-w-5xl mx-auto rounded-2xl shadow-lg border p-10 " +
          (darkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200")
        }
      >
        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b pb-8 mb-8">
          <FaUserCircle
            className={
              "text-8xl " + (darkMode ? "text-blue-400" : "text-blue-600")
            }
          />
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h2
              className={
                "text-2xl font-bold tracking-tight " +
                (darkMode ? "text-white" : "text-gray-900")
              }
            >
              {user.name}
            </h2>
            <p
              className={
                "text-sm flex items-center gap-2 " +
                (darkMode ? "text-gray-400" : "text-gray-600")
              }
            >
              <FaEnvelope /> {user.email}
            </p>
            <p
              className={
                "text-sm flex items-center gap-2 " +
                (darkMode ? "text-gray-400" : "text-gray-600")
              }
            >
              <FaCalendarAlt /> {new Date(user.dob).toLocaleDateString("en-GB")}
            </p>
            <p
              className={
                "text-sm flex items-center gap-2 " +
                (darkMode ? "text-gray-400" : "text-gray-600")
              }
            >
              <FaPhone /> {user.phone}
            </p>
            <p
              className={
                "text-sm flex items-center gap-2 font-medium " +
                (darkMode ? "text-blue-400" : "text-blue-700")
              }
            >
              <FaShieldAlt /> {decoded?.role || "user"}
            </p>
            <Button size="sm" variant="danger" children={"Edit"} />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Favorites */}
          <Link
            to="/favourite"
            className={
              "p-6 rounded-xl border shadow-sm hover:shadow-md transition flex flex-col gap-3 " +
              (darkMode
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100")
            }
          >
            <FaHeart
              className={
                "text-2xl " + (darkMode ? "text-pink-400" : "text-pink-600")
              }
            />
            <h2
              className={
                "text-lg font-semibold " +
                (darkMode ? "text-white" : "text-gray-900")
              }
            >
              Favorites
            </h2>
            <p
              className={
                "text-sm " + (darkMode ? "text-gray-400" : "text-gray-600")
              }
            >
              View your favorite products
            </p>
          </Link>

          {/* Orders */}
          <Link
            to="/orders"
            className={
              "p-6 rounded-xl border shadow-sm hover:shadow-md transition flex flex-col gap-3 " +
              (darkMode
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100")
            }
          >
            <FaBox
              className={
                "text-2xl " + (darkMode ? "text-yellow-400" : "text-yellow-600")
              }
            />
            <h2
              className={
                "text-lg font-semibold " +
                (darkMode ? "text-white" : "text-gray-900")
              }
            >
              Orders
            </h2>
            <p
              className={
                "text-sm " + (darkMode ? "text-gray-400" : "text-gray-600")
              }
            >
              Track your order history
            </p>
          </Link>

          {/* Admin Panel */}
          {decoded?.role === "admin" && (
            <Link
              to="/admin"
              className={
                "p-6 rounded-xl border shadow-sm hover:shadow-md transition flex flex-col gap-3 " +
                (darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100")
              }
            >
              <FaTools
                className={
                  "text-2xl " + (darkMode ? "text-blue-400" : "text-blue-600")
                }
              />
              <h2
                className={
                  "text-lg font-semibold " +
                  (darkMode ? "text-white" : "text-gray-900")
                }
              >
                Admin Panel
              </h2>
              <p
                className={
                  "text-sm " + (darkMode ? "text-gray-400" : "text-gray-600")
                }
              >
                Manage users and settings
              </p>
            </Link>
          )}

          {/* Seller Products */}
          {decoded?.role === "seller" && (
            <Link
              to="/product"
              className={
                "p-6 rounded-xl border shadow-sm hover:shadow-md transition flex flex-col gap-3 " +
                (darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100")
              }
            >
              <FaStore
                className={
                  "text-2xl " + (darkMode ? "text-green-400" : "text-green-600")
                }
              />
              <h2
                className={
                  "text-lg font-semibold " +
                  (darkMode ? "text-white" : "text-gray-900")
                }
              >
                Products
              </h2>
              <p
                className={
                  "text-sm " + (darkMode ? "text-gray-400" : "text-gray-600")
                }
              >
                Manage your products
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="flex justify-center mt-10">
        <button
          onClick={toggleTheme}
          className={
            "px-6 py-2 rounded-lg font-medium shadow-md transition " +
            (darkMode
              ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
              : "bg-gray-900 text-white hover:bg-gray-800")
          }
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
