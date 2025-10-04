import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../Context/themecontext";
import api from "../api";
import Button from "../components/Button";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    description: "",
    price: "",
    sellingPrice: "",
    productImage: "",
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const { data } = await api.get(`/seller/product/${id}`);
          setProduct(data.product || data);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const res = await api.put(`/seller/updateProduct/${id}`, product);
        if (res.data.success) {
          toast.success(" Product updated successfully!");
          navigate("/product");
        } else {
          console.log(res.data.message);
          toast.error("Failed Updations");
        }
      } else {
        const res = await api.post("/seller/addProduct", product);
        if (res.data.success) {
          toast.success(" Product added successfully!");
          setProduct({
            productName: "",
            brandName: "",
            category: "",
            description: "",
            price: "",
            sellingPrice: "",
            productImage: "",
          });
          navigate("/product");
        } else {
          console.log(res.data.message);
          toast.error("Failed");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(" Error submitting product");
    }
  };

  if (loading)
    return (
      <div
        className={`flex justify-center items-center min-h-screen text-gray-700 dark:text-gray-200`}
      >
        Loading product data...
      </div>
    );

  return (
    <div
      className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Container */}
      <div
        className={`max-w-4xl mx-auto rounded-xl shadow-lg p-6 sm:p-8 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
          {id ? "Edit Product" : "Add New Product"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={product.productName}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />

          <input
            type="text"
            name="brandName"
            placeholder="Brand Name"
            value={product.brandName}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />

          <input
            type="text"
            name="productImage"
            placeholder="Product Image URL"
            value={product.productImage}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            required
            className={`col-span-1 sm:col-span-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />

          <input
            type="number"
            name="sellingPrice"
            placeholder="Selling Price"
            value={product.sellingPrice}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            }`}
          />

          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <Button variant="addProduct" type="submit">
              {id ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
