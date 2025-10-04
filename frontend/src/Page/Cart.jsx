import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Authenticate";
import { useTheme } from "../Context/themecontext";
import toast from "react-hot-toast";

function Cart() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [loading, setLoding] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!isLoggedIn()) return navigate("/login");
    setLoding(true);
    const fetchCart = async () => {
      try {
        const res = await api.get("/user/getCart");
        setCart(res.data.cart);
      } catch (err) {
        console.error(err);
      } finally {
        setLoding(false);
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = async (id, action) => {
    try {
      const res = await api.put("/user/updateQuantity", {
        productId: id,
        action,
      });
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await api.delete(`/user/removeCart/${id}`);
      const { success } = res.data;
      if (success) {
        setCart((prevCart) =>
          prevCart.filter((item) => item.product._id !== id)
        );
        toast.success("Product removed from cart");
      }
    } catch (err) {
      toast.error("Remove cart failed ");
      console.error(err);
    }
  };

  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.product.sellingPrice,
    0
  );

  const handleBuyNow = () => {
    alert("Proceeding to checkout...");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div
      className={
        "min-h-screen px-4 sm:px-6 lg:px-20 py-8 " +
        (darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900")
      }
    >
      <h1
        className={
          "text-3xl font-bold mb-4 text-center " +
          (darkMode ? "text-white" : "text-gray-800")
        }
      >
        My Cart
      </h1>

      {/* Total Items */}
      <p
        className={
          "text-center mb-6 font-medium " +
          (darkMode ? "text-gray-300" : "text-gray-700")
        }
      >
        Total Items: {cart.length}
      </p>

      {cart.length === 0 ? (
        <p
          className={
            darkMode
              ? "text-gray-400 text-center text-lg"
              : "text-gray-600 text-center text-lg"
          }
        >
          Your cart is empty
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className={
                "flex flex-col sm:flex-row items-center rounded-xl p-4 sm:p-6 transition hover:shadow-2xl " +
                (darkMode
                  ? "bg-gray-800 shadow-gray-700"
                  : "bg-white shadow-md")
              }
            >
              {/* Product Image */}
              <div
                className={
                  "flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center rounded-lg overflow-hidden " +
                  (darkMode ? "bg-gray-700" : "bg-gray-50")
                }
              >
                <img
                  src={item.product.productImage}
                  alt={item.product.productName}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 w-full">
                <h3
                  className={
                    darkMode
                      ? "text-white text-lg sm:text-xl font-semibold"
                      : "text-gray-900 text-lg sm:text-xl font-semibold"
                  }
                >
                  {item.product.productName}
                </h3>
                <p
                  className={
                    darkMode ? "text-gray-400 mt-1" : "text-gray-500 mt-1"
                  }
                >
                  Price: ₹{item.product.sellingPrice}
                </p>

                {/* Quantity Control */}
                <div className="flex items-center mt-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product._id, "decrement")
                    }
                    disabled={item.quantity <= 1}
                    className={
                      "px-3 py-1 rounded-l transition " +
                      (darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-900")
                    }
                  >
                    -
                  </button>
                  <span
                    className={
                      "px-4 py-1 " +
                      (darkMode
                        ? "bg-gray-600 text-gray-100"
                        : "bg-gray-100 text-gray-900")
                    }
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product._id, "increment")
                    }
                    className={
                      "px-3 py-1 rounded-r transition " +
                      (darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-900")
                    }
                  >
                    +
                  </button>
                </div>

                {/* Total for product */}
                <p
                  className={
                    darkMode
                      ? "mt-2 font-semibold text-gray-200"
                      : "mt-2 font-semibold text-gray-800"
                  }
                >
                  Total: ₹{item.quantity * item.product.sellingPrice}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.product._id)}
                className={
                  "mt-4 sm:mt-0 sm:ml-6 px-5 py-2 rounded-lg transition font-medium " +
                  (darkMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white")
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div
            className={
              "flex flex-col sm:flex-row justify-between items-center mt-6 p-4 rounded-lg " +
              (darkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-900")
            }
          >
            <div className="text-lg sm:text-xl font-bold">
              Grand Total: ₹{grandTotal}
            </div>
            <button
              onClick={handleBuyNow}
              className={
                "mt-3 sm:mt-0 px-6 py-2 rounded-lg font-semibold transition " +
                (darkMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white")
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
