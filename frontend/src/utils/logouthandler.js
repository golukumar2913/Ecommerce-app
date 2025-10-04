import api from "../api";

export const handleLogout = async () => {
  try {
    const res = await api.post("/auth/logout");
    if (res.data.success) {
      localStorage.clear();
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};
