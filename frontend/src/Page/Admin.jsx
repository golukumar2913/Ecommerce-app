import React, { useEffect, useState } from "react";
import { useTheme } from "../Context/themecontext";
import Button from "../components/Button";
import api from "../api";
import toast from "react-hot-toast";

function Admin() {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      try {
        await api.delete(`/admin/usersDelete/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  const handleUpdate = async (id, newType) => {
    try {
      await api.patch(`/admin/usersUpdate/${id}`, { userType: newType });
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, userType: newType } : user
        )
      );
      toast.success("User updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <div className="text-center py-4">{error}</div>;

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      } min-h-screen transition-colors duration-500 py-16 px-4 sm:px-6`}
    >
      <div className="max-w-7xl mx-auto text-center mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Admin Page
        </h1>
      </div>

      <div className="max-w-5xl mx-auto overflow-x-auto shadow-lg rounded-lg">
        <table
          className={`w-full border border-gray-400 min-w-[700px] sm:min-w-full ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <thead
            className={
              darkMode ? "bg-gray-900 text-white" : "bg-gray-700 text-white"
            }
          >
            <tr>
              <th className="py-2 px-2 sm:px-3 border border-gray-300 text-center text-sm sm:text-base">
                Sr.
              </th>
              <th className="py-2 px-2 sm:px-3 border border-gray-500 text-center text-sm sm:text-base">
                Created
              </th>
              <th className="py-2 px-2 sm:px-3 border border-gray-500 text-center text-sm sm:text-base">
                Name
              </th>
              <th className="py-2 px-2 sm:px-3 border border-gray-500 text-center text-sm sm:text-base">
                Email
              </th>
              <th className="py-2 px-2 sm:px-3 border border-gray-500 text-center text-sm sm:text-base">
                Phone
              </th>
              <th className="py-2 px-2 sm:px-3 border border-gray-500 text-center text-sm sm:text-base">
                Role
              </th>
              <th className="py-2 px-2 sm:px-3 border border-gray-500 text-center text-sm sm:text-base">
                Update
              </th>
              <th className="py-2 px-2 sm:px-3 border border-gray-500 text-center text-sm sm:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={
                  darkMode
                    ? "hover:bg-gray-700 transition"
                    : "hover:bg-gray-100 transition"
                }
              >
                <td className="py-1 px-1 sm:py-2 sm:px-3 border border-gray-300 text-center text-sm sm:text-base">
                  {index + 1}
                </td>
                <td className="py-1 px-1 sm:py-2 sm:px-3 border border-gray-300 text-center text-sm sm:text-base">
                  {new Date(user.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="py-1 px-1 sm:py-2 sm:px-3 border border-gray-300 text-center text-sm sm:text-base">
                  {user.name}
                </td>
                <td className="py-1 px-1 sm:py-2 sm:px-3 border border-gray-300 text-center text-sm sm:text-base">
                  {user.email}
                </td>
                <td className="py-1 px-1 sm:py-2 sm:px-3 border border-gray-300 text-center text-sm sm:text-base">
                  {user.phone}
                </td>
                <td className="py-1 px-1 sm:py-2 sm:px-3 border border-gray-300 text-center text-sm sm:text-base">
                  {user.userType}
                </td>
                <td className="py-1 px-1 sm:py-2 sm:px-3 border border-gray-300 text-center text-sm sm:text-base">
                  <select
                    value={user.userType}
                    onChange={(e) => handleUpdate(user._id, e.target.value)}
                    className={`rounded px-2 py-1 text-sm sm:text-base ${
                      darkMode
                        ? "bg-gray-900 text-white border border-gray-500"
                        : "bg-white text-black border border-gray-300"
                    }`}
                  >
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-1 px-1 sm:py-2 sm:px-3 border border-gray-300 text-center">
                  <Button
                    variant="delete"
                    onClick={() => handleDelete(user._id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
