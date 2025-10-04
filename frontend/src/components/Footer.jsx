import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { useTheme } from "../Context/themecontext";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={
        (darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-300 text-gray-700") +
        " py-10 px-4"
      }
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2
            className={
              "text-xl font-bold mb-3 " +
              (darkMode ? "text-white" : "text-gray-900")
            }
          >
            ShopSmart
          </h2>
          <p
            className={
              darkMode ? "text-sm text-gray-400" : "text-sm text-gray-600"
            }
          >
            Best deals on the best products — delivered fast!
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3
            className={
              "text-lg font-semibold mb-2 " +
              (darkMode ? "text-white" : "text-gray-900")
            }
          >
            Quick Links
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                to="/"
                className={
                  "transition-colors duration-200 " +
                  (darkMode ? "hover:text-white" : "hover:text-blue-700")
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={
                  "transition-colors duration-200 " +
                  (darkMode ? "hover:text-white" : "hover:text-blue-700")
                }
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  "transition-colors duration-200 " +
                  (darkMode ? "hover:text-white" : "hover:text-blue-700")
                }
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={
                  "transition-colors duration-200 " +
                  (darkMode ? "hover:text-white" : "hover:text-blue-700")
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Help */}
        <div>
          <h3
            className={
              "text-lg font-semibold mb-2 " +
              (darkMode ? "text-white" : "text-gray-900")
            }
          >
            Help
          </h3>
          <ul className="space-y-1 text-sm">
            <li
              className={
                "cursor-pointer " +
                (darkMode ? "hover:text-white" : "hover:text-blue-700")
              }
            >
              FAQ
            </li>
            <li
              className={
                "cursor-pointer " +
                (darkMode ? "hover:text-white" : "hover:text-blue-700")
              }
            >
              Support
            </li>
            <li
              className={
                "cursor-pointer " +
                (darkMode ? "hover:text-white" : "hover:text-blue-700")
              }
            >
              Shipping
            </li>
            <li
              className={
                "cursor-pointer " +
                (darkMode ? "hover:text-white" : "hover:text-blue-700")
              }
            >
              Returns
            </li>
          </ul>
        </div>
        {/* Social */}
        <div>
          <h3
            className={
              "text-lg font-semibold mb-2 " +
              (darkMode ? "text-white" : "text-gray-900")
            }
          >
            Follow Us
          </h3>
          <div className="flex gap-4 mt-2 text-xl">
            <FaFacebookF
              className={
                "cursor-pointer " +
                (darkMode
                  ? "text-blue-400 hover:text-white"
                  : "text-blue-600 hover:text-blue-800")
              }
            />
            <FaTwitter
              className={
                "cursor-pointer " +
                (darkMode
                  ? "text-blue-300 hover:text-white"
                  : "text-blue-400 hover:text-blue-600")
              }
            />
            <FaInstagram
              className={
                "cursor-pointer " +
                (darkMode
                  ? "text-pink-400 hover:text-white"
                  : "text-pink-500 hover:text-pink-700")
              }
            />
            <FaLinkedinIn
              className={
                "cursor-pointer " +
                (darkMode
                  ? "text-blue-300 hover:text-white"
                  : "text-blue-600 hover:text-blue-800")
              }
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={
          "mt-10 text-center text-sm pt-4 border-t " +
          (darkMode
            ? "text-gray-500 border-gray-800"
            : "text-gray-500 border-gray-300")
        }
      >
        &copy; {new Date().getFullYear()} ShopSmart All rights reserved
      </div>

      <footer className="w-full bg-transparent mt-2">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className={
              "glass shadow-xl backdrop-blur-lg flex flex-col md:flex-row items-center justify-between py-4 px-4 rounded-2xl border " +
              (darkMode
                ? "bg-gray-800 border-white/10"
                : "bg-white/70 border-white/30")
            }
          >
            <div className="flex items-center mb-2 md:mb-0">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-tr from-pink-400 to-blue-400 shadow-lg mr-2">
                <HiOutlineUpload className="h-5 w-5 text-white" />
              </span>
              <span
                className={
                  "font-bold text-base tracking-wide " +
                  (darkMode ? "text-gray-200" : "text-gray-700")
                }
              >
                ShopSmart
              </span>
            </div>
            <div className="flex space-x-3 mb-2 md:mb-0">
              <a
                href="https://instagram.com/golu_singh_2913"
                className="hover:scale-110 transition-transform"
                title="Instagram"
              >
                <FaInstagram
                  className={
                    darkMode ? "w-5 h-5 text-pink-400" : "w-5 h-5 text-pink-500"
                  }
                />
              </a>
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                title="Twitter"
              >
                <FaTwitter
                  className={
                    darkMode ? "w-5 h-5 text-blue-300" : "w-5 h-5 text-blue-400"
                  }
                />
              </a>
              <a
                href="https://www.linkedin.com/in/golu-kumar-7aaa6822b/"
                className="hover:scale-110 transition-transform"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedinIn
                  className={
                    darkMode ? "w-5 h-5 text-blue-300" : "w-5 h-5 text-blue-600"
                  }
                />
              </a>
              <a
                href="https://github.com/golukumar2913"
                className="hover:scale-110 transition-transform"
                title="Facebook"
              >
                <FaGithub
                  className={
                    darkMode ? "w-5 h-5 text-blue-400" : "w-5 h-5 text-blue-600"
                  }
                />
              </a>
            </div>
            <div
              className={
                "text-xs text-center md:text-right " +
                (darkMode ? "text-gray-400" : "text-gray-500")
              }
            >
              &copy; {new Date().getFullYear()} ShopSmart Crafted with
              <span className="text-pink-400">&#10084;</span> by Golu Kumar
            </div>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
