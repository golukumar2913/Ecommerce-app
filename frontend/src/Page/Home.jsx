import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSec";
import CotegoryHead from "../components/cotegoryHead";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themecontext";
import { useCart } from "../Context/AddCart";
import api from "../api";
import { isLoggedIn } from "../Authenticate";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../components/Button";
import toast from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { handleAddToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Fetch products cetegeory
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          selectedCategory
            ? `/user/products?category=${selectedCategory}`
            : "/user/home"
        );
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleAddFavourite = async (id) => {
    if (!isLoggedIn()) return navigate("/login");
    try {
      const res = await api.post(`/user/addFavourite/${id}`);
      if (res.data.success) {
        toast.success("Successfully Add favourite");
      }
    } catch (err) {
      console.error(err);
      toast.error("Add favourite failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-red-500 dark:text-red-400">
        {error}
      </p>
    );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Category Buttons */}
      <CotegoryHead
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Products */}
      <div className="min-h-screen px-4 py-8 md:px-20">
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {selectedCategory || "Featured"} Products
        </h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item._id}
              className={`rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col ${
                darkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            >
              <div className="relative">
                <img
                  src={
                    item.productImage?.[0] || "https://via.placeholder.com/150"
                  }
                  alt={item.productName}
                  className="w-full h-48 object-contain"
                />
                <button
                  onClick={() => handleAddFavourite(item._id)}
                  className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${
                    darkMode
                      ? "bg-gray-700 text-red-400 hover:bg-gray-600"
                      : "bg-white text-red-500 hover:bg-gray-100"
                  }`}
                >
                  <AiOutlineHeart size={22} />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg">{item.productName}</h3>
                <h3 className="text-sm font-medium">{item.category}</h3>
                <p
                  className={`mt-1 text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Price:{" "}
                  <span className="text-green-500 font-semibold">
                    ₹{item.sellingPrice}
                  </span>{" "}
                  <span className="line-through text-gray-500">
                    ₹{item.price}
                  </span>
                </p>

                <div className="flex  mt-auto justify-between">
                  <Button
                    variant="addCart"
                    children={"Add Cart"}
                    onClick={() => handleAddToCart(item._id)}
                  ></Button>
                  <Button
                    variant="details"
                    children={"Details"}
                    onClick={() => navigate(`/details/${item._id}`)}
                  ></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
