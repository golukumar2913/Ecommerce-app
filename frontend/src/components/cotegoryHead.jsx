import { useTheme } from "../Context/themecontext";
import Mobile from "../assets/category/mobile1.jpg";
import two from "../assets/category/mouse.jpg";
import three from "../assets/category/airbuds.jpeg";
import four from "../assets/category/camera.jpeg";
import five from "../assets/category/earphone.jpeg";
import Laptop from "../assets/category/laptop.jpg";
import electronics from "../assets/category/electronics.jpg";

import faishan from "../assets/category/faishan.jpeg";
import trimer from "../assets/category/trimer.jpg";
import watch from "../assets/category/watch.jpg";
import tv from "../assets/category/tv.jpg";
import book from "../assets/category/book.jpg";
import beauty from "../assets/category/beauty.jpg";

function CotegoryHead({ selectedCategory, setSelectedCategory }) {
  const { darkMode } = useTheme();

  const category = [
    { img: Mobile, name: "Mobile" },
    { img: two, name: "Mouse" },
    { img: three, name: "Bluetooth" },
    { img: four, name: "Camera" },
    { img: five, name: "Earphone" },
    { img: Laptop, name: "Laptop" },
    { img: electronics, name: "Electronics" },
    { img: tv, name: "TV" },
    { img: book, name: "Book" },
    { img: faishan, name: "Faishan" },
    { img: beauty, name: "Beauty" },
    { img: trimer, name: "Trimer" },
    { img: watch, name: "Watch" },
  ];

  return (
    <div className="w-full h-[110px] flex flex-row justify-around items-center gap-4 overflow-x-auto px-2">
      {category.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelectedCategory(item.name)}
          className="flex flex-col items-center cursor-pointer transition-transform hover:scale-90"
        >
          <div
            className={`w-[70px] h-[70px] rounded-full shadow-lg overflow-hidden flex items-center justify-center ${
              selectedCategory === item.name
                ? "ring-2 ring-blue-500"
                : "bg-red-200"
            }`}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-contain rounded-full transition-transform hover:scale-120"
            />
          </div>
          <p
            className={
              (darkMode ? "text-amber-50" : "text-black") +
              " text-sm mt-1 font-medium"
            }
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CotegoryHead;
