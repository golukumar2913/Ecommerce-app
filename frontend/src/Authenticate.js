import jwt_decode from "jwt-decode";
import { handleLogout } from "./utils/logouthandler";

export const isLoggedIn = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      console.log("expire");
      handleLogout();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Invalid token", error);
    handleLogout();
    return false;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      handleLogout();
      localStorage.clear();
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    localStorage.clear();
    handleLogout();
    return null;
  }
};
