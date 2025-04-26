import React from "react";
import mobileImage from "../assets/intro mobile 2.svg";
import desktopImage from "../assets/intro 3.svg";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();

  // Function to handle the "Get Started" button click
  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col md:block">
      {/* Mobile Image */}
      <img
        src={mobileImage}
        alt="Mobile Cover"
        className="block md:hidden w-full object-cover"
      />

      {/* Desktop Image */}
      <img
        src={desktopImage}
        alt="Desktop Cover"
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end sm:mb-0 mb-12 md:justify-center sm:ml-[560px] sm:mt-[390px]">
        <button
          onClick={handleGetStarted}
          className="font-mono sm:px-10 sm:py-3 px-7 py-2 bg-green-950 hover:bg-green-800 text-white font-medium rounded-full transition duration-800 ease-in text-lg shadow-lg"
        >
          Get Started
        </button>
        <p className="text-sm text-gray-400 mt-5 sm:mt-54 max-w-xs text-center sm:text-center sm:max-w-sm sm:text-gray-400 font-comfort">
          Discover a smarter way to explore the world. Infrable helps you learn
          about countries, cultures, and communities empowering global
          curiosity, one click at a time.
        </p>
      </div>
    </div>
  );
};

export default IntroPage;
