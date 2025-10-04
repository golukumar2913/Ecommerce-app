import { createContext, useContext } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Authenticate";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();

  const handleAddToCart = async (id) => {
    if (!isLoggedIn()) {
      return navigate("/login");
    }
    try {
      const res = await api.post(`/user/addCart/${id}`, { quantity: 1 });
      if (res.data.success) {
        console.log("Cart Updated:", res.data.cart);
        toast.success("successfully product added in cart");
      }
    } catch (err) {
      console.error(err);

      toast.error("Product Added failed");
    }
  };

  return (
    <CartContext.Provider value={{ handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
