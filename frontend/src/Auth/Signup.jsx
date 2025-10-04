import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../Context/themecontext";
import api from "../api";
import toast from "react-hot-toast";

export default function Signup() {
  const { darkMode } = useTheme();

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    password: "",
    userType: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!registerData.name.trim()) newErrors.name = "Full name is required.";
    if (!registerData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!registerData.dob) newErrors.dob = "Date of birth is required.";
    if (!registerData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(registerData.phone)) {
      newErrors.phone = "Phone must be 10 digits.";
    }
    if (!registerData.password) {
      newErrors.password = "Password is required.";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!registerData.userType) newErrors.userType = "Please select user type.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await api.post("/auth/register", registerData);
      const { success, message } = response.data;
      if (success) {
        console.log("Registration successful:", message);
        toast.success("Registered Sucessfully");

        navigate("/login");
      } else {
        console.log("Registration failed:", message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
    }
  };

  return (
    <div
      className={
        "min-h-screen flex items-center justify-center px-3 " +
        (darkMode ? "bg-gray-950" : "bg-gray-100")
      }
    >
      <div
        className={
          "w-full max-w-sm rounded-xl shadow-lg p-6 sm:p-7 " +
          (darkMode
            ? "bg-gray-900 border border-gray-800"
            : "bg-white border border-gray-200")
        }
      >
        <h2
          className={
            "text-xl font-bold text-center mb-1 " +
            (darkMode ? "text-white" : "text-gray-800")
          }
        >
          Create Account
        </h2>
        <p
          className={
            "text-center text-xs mb-5 " +
            (darkMode ? "text-gray-400" : "text-gray-600")
          }
        >
          Join ShopSmart and start shopping smarter!
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="name"
              className={
                "block text-xs font-medium mb-1 " +
                (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleRegister}
              placeholder="Enter Name"
              className={
                "w-full px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-800 border border-gray-700 text-gray-100 focus:ring-blue-500 placeholder-gray-400"
                  : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-400")
              }
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className={
                "block text-xs font-medium mb-1 " +
                (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegister}
              placeholder="Enter Email"
              className={
                "w-full px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-800 border border-gray-700 text-gray-100 focus:ring-blue-500 placeholder-gray-400"
                  : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-400")
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="dob"
                className={
                  "block text-xs font-medium mb-1 " +
                  (darkMode ? "text-gray-300" : "text-gray-700")
                }
              >
                DOB
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={registerData.dob}
                onChange={handleRegister}
                className={
                  "w-full px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 " +
                  (darkMode
                    ? "bg-gray-800 border border-gray-700 text-gray-100 focus:ring-blue-500"
                    : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-400")
                }
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className={
                  "block text-xs font-medium mb-1 " +
                  (darkMode ? "text-gray-300" : "text-gray-700")
                }
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={registerData.phone}
                onChange={handleRegister}
                placeholder="9876543210"
                className={
                  "w-full px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 " +
                  (darkMode
                    ? "bg-gray-800 border border-gray-700 text-gray-100 focus:ring-blue-500 placeholder-gray-400"
                    : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-400")
                }
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className={
                "block text-xs font-medium mb-1 " +
                (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegister}
              placeholder="••••••••"
              className={
                "w-full px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-800 border border-gray-700 text-gray-100 focus:ring-blue-500 placeholder-gray-400"
                  : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-400")
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={
                "block text-xs font-medium mb-1 " +
                (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              Confirm Password
            </label>
            <input
              id="confirmpassword"
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegister}
              placeholder="••••••••"
              className={
                "w-full px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 " +
                (darkMode
                  ? "bg-gray-800 border border-gray-700 text-gray-100 focus:ring-blue-500 placeholder-gray-400"
                  : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-400 placeholder-gray-400")
              }
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label
              className={
                "block text-xs font-medium mb-1 " +
                (darkMode ? "text-gray-300" : "text-gray-700")
              }
            >
              User Type
            </label>
            <div className="flex gap-5">
              {["customer", "seller"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={registerData.userType === type}
                    onChange={handleRegister}
                    className="accent-blue-600"
                  />
                  <span
                    className={darkMode ? "text-gray-200" : "text-gray-700"}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            {errors.userType && (
              <p className="text-red-500 text-xs mt-1">{errors.userType}</p>
            )}
          </div>

          <button
            type="submit"
            className={
              "w-full py-2 rounded-lg font-semibold text-sm shadow-md transition duration-300 " +
              (darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600")
            }
          >
            Sign Up
          </button>
        </form>

        <p
          className={
            "text-xs text-center mt-5 " +
            (darkMode ? "text-gray-400" : "text-gray-600")
          }
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={
              darkMode
                ? "text-blue-400 hover:underline"
                : "text-blue-600 hover:underline"
            }
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
