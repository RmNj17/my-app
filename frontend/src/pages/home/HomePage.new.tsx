import type React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../../components/Hero";
import Destinations from "../../components/Destinations";
import Features from "../../components/Features";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

const HomePage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="font-lato">
      <Navigation />
      <Hero />
      <Destinations />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
