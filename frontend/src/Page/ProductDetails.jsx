import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useTheme } from "../Context/themecontext";
import { useCart } from "../Context/AddCart";
import api from "../api";

function ProductDetails() {
  const { darkMode } = useTheme();
  const { handleAddToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detailsProduct = async () => {
      try {
        const res = await api.get(`/user/productDetails/${id}`);

        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          console.error(res.data.message || "Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    detailsProduct();
  }, [id]);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div
      className={
        (darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800") +
        " min-h-screen transition-colors duration-500 py-16 px-6"
      }
    >
      <div
        className={`max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8 rounded-xl shadow-md ${
          darkMode ? "bg-gray-950 text-white" : "bg-white text-black"
        }`}
      >
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.productImage?.[0] || "https://via.placeholder.com/400"}
            alt={product.productName}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.productName}</h1>

            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  darkMode ? "bg-green-700" : "bg-green-600 text-white"
                }`}
              >
                {product.rating || 4.2} ★
              </span>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {product.reviews || "12,345"} Ratings & Reviews
              </span>
            </div>
            <p
              className={`mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              <strong>Category:</strong> {product.category}
            </p>
            <p
              className={`mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              <strong>Brand:</strong> {product.brandName}
            </p>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {product.description}
            </p>

            <p className="text-2xl font-semibold text-green-600 mb-4">
              ₹{product.sellingPrice}
              <span
                className={`line-through text-lg ml-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                ₹{product.price}
              </span>
              {product.price && product.sellingPrice && (
                <span className="ml-3 text-lg text-orange-500 font-semibold">
                  {Math.round(
                    ((product.price - product.sellingPrice) / product.price) *
                      100
                  )}
                  % off
                </span>
              )}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleAddToCart(product._id)}
              className="flex-1 bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
