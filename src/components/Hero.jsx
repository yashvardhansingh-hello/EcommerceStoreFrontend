import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = ({ productsData }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const data = productsData?.products || [];

  const carouselImages = data.map((product) => ({
    src: product?.image?.url,
    caption: product?.title,
    _id: product?._id,
  }));

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const nextSlide = () => {
    resetTimeout();
    setCurrent((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    resetTimeout();
    setCurrent((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (carouselImages.length > 1) {
      timeoutRef.current = setTimeout(nextSlide, 4000);
      return () => resetTimeout();
    }
  }, [current, carouselImages.length]);

  const currentSlide = carouselImages[current];

  return (
    <div className="relative w-full lg:h-[36rem] md:h-[24rem] h-[13rem] overflow-hidden rounded-xl shadow-xl">
      {currentSlide && (
        <div
          onClick={() => navigate(`/products/${currentSlide._id}`)}
          className="w-full h-full cursor-pointer"
        >
          <img
            src={currentSlide.src}
            alt={currentSlide.caption}
            className="w-full h-full object-cover aspect-video"
          />
          {/* Caption */}
          <div className="absolute bottom-3 shadow-md hidden md:block lg:block z-10 bg-primary bg-opacity-50 font-extralight  hove:bg-opacity-70 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-md  text-white px-4 py-2 rounded-full text-[0.7rem]  md:text-sm lg:text-sm ">
            {currentSlide.caption}
          </div>
        </div>
      )}

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md z-10"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default Hero;
