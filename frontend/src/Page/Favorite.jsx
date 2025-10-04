import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themecontext";
import { AiOutlineDelete } from "react-icons/ai";
import api from "../api";
import toast from "react-hot-toast";

function Favourite() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favourites
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user/favourites");

        setFavourites(res.data.favourites || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/user/removeFavourite/${id}`);
      toast.success("Remove product in Favourite ");
      setFavourites((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("failed");
    }
  };
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div
      className={`min-h-screen px-4 py-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favourites</h1>

      {favourites.length === 0 ? (
        <p className="text-center text-lg">No favourites yet.</p>
      ) : (
        <div className="mr-10 ml-10 mx-0 md:mx-20 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favourites.map((item) => (
            <div
              key={item._id}
              className={`rounded-xl shadow-md overflow-hidden hover:shadow-lg transition ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {item.productName}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Price:
                  <span className="text-green-500 mr-1.5">
                    ₹{item.sellingPrice}
                  </span>
                  <span className="line-through">{item.price}</span>
                </p>

                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className={`flex items-center justify-center gap-2 mt-3 w-60% px-4 py-2 rounded transition ${
                      darkMode
                        ? "bg-red-700 text-white hover:bg-red-800"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    <AiOutlineDelete size={20} />
                    Remove
                  </button>
                  <button
                    onClick={() => navigate(`/details/${item._id}`)}
                    className={`flex items-center justify-center gap-2 mt-3 w-60% px-4 py-2 rounded transition ${
                      darkMode
                        ? "bg-gray-500 text-white hover:bg-gray-600"
                        : "bg-gray-500 text-white hover:bg-gray-600"
                    }`}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourite;
