import { useState, useEffect } from "react";
import banner1 from "../assets/banner/banner-5.jpg";
import banner2 from "../assets/banner/banner-6.jpg";
import banner3 from "../assets/banner/image1.jpeg";
import banner4 from "../assets/banner/image2.jpg";
import banner5 from "../assets/banner/image3.jpg";
import banner6 from "../assets/banner/image4.webp";
import banner7 from "../assets/banner/image5.jpeg";
import banner8 from "../assets/banner/image6.jpeg";

export default function HeroSection() {
  const images = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
    banner7,
    banner8,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Hero Slide"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
