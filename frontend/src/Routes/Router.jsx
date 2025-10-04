import { createBrowserRouter } from "react-router-dom";
import { CartProvider } from "../Context/AddCart";

import Layout from "../Layout/Layout";

import Home from "../Page/Home";
import Product from "../Page/Product";

import Profile from "../Page/Profile";
import Cart from "../Page/Cart";
import Favorite from "../Page/Favorite";
import Order from "../Page/Order";
import Admin from "../Page/Admin";

import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import ForgetPassword from "../Auth/forget";

import ProtectedRoute from "./protectedRoute";
import AddProduct from "../Page/AddProduct";
import ProductDetails from "../Page/ProductDetails";
import NotFound from "../Page/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: (
          <CartProvider>
            <Home />
          </CartProvider>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <CartProvider>
            <ProductDetails />
          </CartProvider>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile></Profile>
          </ProtectedRoute>
        ),
      },
      {
        path: "/favourite",
        element: (
          <ProtectedRoute>
            <Favorite></Favorite>
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Order></Order>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart></Cart>
          </ProtectedRoute>
        ),
      },

      {
        path: "/product",
        element: (
          <ProtectedRoute role="seller">
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addProduct",
        element: (
          <ProtectedRoute role="seller">
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editProduct/:id",
        element: (
          <ProtectedRoute role="seller">
            <AddProduct />
          </ProtectedRoute>
        ),
      },

      {
        path: "/admin",
        element: (
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  { path: "/forget", element: <ForgetPassword /> },
]);

export default router;
