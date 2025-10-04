import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themecontext";
import api from "../api";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await api.patch("/auth/forgetPassword", formData);
      if (response.data.success) {
        toast.success("Password updated successfully!");
        navigate("/login");
      } else {
        alert(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error resetting password.");
    }
  };

  return (
    <div
      className={
        "min-h-screen flex items-center justify-center px-4 " +
        (darkMode ? "bg-gray-900" : "bg-gray-100")
      }
    >
      <div
        className={
          "max-w-md w-full rounded-xl shadow-md p-8 space-y-6 " +
          (darkMode ? "bg-gray-800" : "bg-white")
        }
      >
        <h2
          className={
            "text-2xl font-bold text-center " +
            (darkMode ? "text-gray-100" : "text-gray-800")
          }
        >
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className={
                "block mb-2 " + (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-900 border-gray-700 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
                  : "border-gray-300 focus:ring-blue-400")
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={
                "block mb-2 " + (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className={
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-900 border-gray-700 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
                  : "border-gray-300 focus:ring-blue-400")
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className={
                "block mb-2 " + (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className={
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-900 border-gray-700 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
                  : "border-gray-300 focus:ring-blue-400")
              }
              required
            />
          </div>

          <button
            type="submit"
            className={
              "w-full py-2 rounded-lg transition duration-300 " +
              (darkMode
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-blue-500 text-white hover:bg-blue-600")
            }
          >
            Reset Password
          </button>
        </form>

        <p
          className={
            "text-sm text-center  gap-1 " +
            (darkMode ? "text-gray-400" : "text-gray-600")
          }
        >
          Back to<span> </span>
          <Link
            to="/login"
            className={
              darkMode
                ? "text-blue-400 hover:underline"
                : "text-blue-500 hover:underline"
            }
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
