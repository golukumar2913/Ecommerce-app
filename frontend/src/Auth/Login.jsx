import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themecontext";
import api from "../api";
import toast from "react-hot-toast";

export default function Login() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error while typing
  };

  const validateForm = () => {
    let newErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required.";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await api.post("/auth/login", loginData);
      const { success } = response.data;
      if (success && response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("accessToken", response.data.accessToken);
        toast.success("Login user");
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Login failed");

      console.error("Login failed:", error);
    }
    setLoginData({ email: "", password: "" });
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
          Login
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
              value={loginData.email}
              onChange={handleLogin}
              placeholder="Enter Email"
              className={
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-900 border-gray-700 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
                  : "border-gray-300 focus:ring-blue-400 placeholder-gray-400")
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className={
                "block mb-2 " + (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLogin}
              placeholder="Enter Password"
              className={
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-900 border-gray-700 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
                  : "border-gray-300 focus:ring-blue-400 placeholder-gray-400")
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
            Login
          </button>
        </form>

        <div className="flex justify-end">
          <Link
            to="/forget"
            className={
              darkMode
                ? "text-blue-400 hover:underline text-sm"
                : "text-blue-500 hover:underline text-sm"
            }
          >
            Forget Password
          </Link>
        </div>
        <p
          className={
            "text-sm text-center " +
            (darkMode ? "text-gray-400" : "text-gray-600")
          }
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className={
              darkMode
                ? "text-blue-400 hover:underline"
                : "text-blue-500 hover:underline"
            }
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
