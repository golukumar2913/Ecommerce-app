import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../Context/themecontext";
import Button from "../components/Button";
import api from "../api";
import toast from "react-hot-toast";

function SellerProducts() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/seller/Product");
        const { success, message } = res.data;
        if (success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await api.delete(`/seller/deleteProduct/${id}`);
      if (res.data.success) {
        toast.success("Product deleted successfully");
        setProducts(products.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      toast.error("Failed product delete");
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
      className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        } p-4 rounded-xl mb-6 shadow-md`}
      >
        <h1 className="text-2xl font-bold mb-3 sm:mb-0">My Products</h1>
        <Link to="/addProduct">
          <Button variant="addProduct">Add Product</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p
          className={`text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          You have not added any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ml-10 mr-10">
          {products.map((product) => (
            <div
              key={product._id}
              className={`rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                darkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            >
              {product.productImage.length > 0 ? (
                <div className="w-full h-60 overflow-hidden rounded-t-xl">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div
                  className={`w-full h-60 flex items-center justify-center ${
                    darkMode
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-200 text-gray-500"
                  } rounded-t-xl`}
                >
                  No Image
                </div>
              )}

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{product.productName}</h2>
                <p>{product.brandName}</p>
                <p>
                  Price:
                  <span className="font-semibold text-green-600 ml-1">
                    ₹{product.sellingPrice}
                  </span>{" "}
                  <span className="line-through text-sm text-gray-500">
                    ₹{product.price}
                  </span>
                </p>
                <p className="text-sm">Category: {product.category}</p>
                <p className="text-xs text-gray-400">
                  Created by: {product.createdBy?.name || "N/A"} (
                  {product.createdBy?.email || "N/A"})
                </p>
              </div>

              <div className="flex justify-between items-center p-4 border-t border-gray-300 dark:border-gray-700">
                <Button
                  variant="edit"
                  onClick={() => navigate(`/editProduct/${product._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerProducts;
