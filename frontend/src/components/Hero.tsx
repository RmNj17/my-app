import type React from "react";
import { Button } from "antd";
import { CompassOutlined, CameraOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative h-[85vh] overflow-hidden">
      <img
        src="/public/explore.jpg"
        alt="Beautiful Nepal landscape"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Discover the Magic of
          <span className="block text-blue-400 mt-2">Nepal</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed text-gray-100">
          From the towering Himalayas to ancient temples, embark on
          unforgettable adventures with certified local guides who know every
          hidden treasure.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-700 border-none text-lg px-8 py-6 h-auto font-semibold"
            onClick={() => navigate("/guides")}
            icon={<CompassOutlined />}
          >
            Find Your Perfect Guide
          </Button>
          <Button
            size="large"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-6 h-auto font-semibold bg-transparent"
            icon={<CameraOutlined />}
            onClick={() => scrollToSection("destinations")}
          >
            Explore Destinations
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
