import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  CompassOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
// import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../../components/Hero";
import Destinations from "../../components/Destinations";
import Features from "../../components/Features";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-6" data-aos="fade-up">
          {isAuthenticated ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                {user?.role === "guide"
                  ? "Check your dashboard for new booking requests and manage your tours."
                  : "Continue your Nepal adventure by booking amazing experiences with our certified guides."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="primary"
                  size="large"
                  className="bg-white text-blue-600 hover:bg-gray-100 border-white text-lg px-8 py-6 h-auto font-semibold"
                  onClick={() => navigate("/dashboard")}
                  icon={<UserOutlined />}
                >
                  {user?.role === "guide" ? "View My Dashboard" : "My Bookings"}
                </Button>
                <Button
                  size="large"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 h-auto font-semibold bg-transparent"
                  icon={<CompassOutlined />}
                  onClick={() =>
                    navigate(user?.role === "guide" ? "/" : "/guides")
                  }
                >
                  {user?.role === "guide"
                    ? "Explore Destinations"
                    : "Find New Guides"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Nepal Adventure?
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Join thousands of travelers who've discovered Nepal's wonders
                with our certified guides. Your journey of a lifetime is just
                one click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="primary"
                  size="large"
                  className="bg-white text-blue-600 hover:bg-gray-100 border-white text-lg px-8 py-6 h-auto font-semibold"
                  onClick={() => navigate("/guides")}
                  icon={<CompassOutlined />}
                >
                  Book Your Guide Today
                </Button>
                <Button
                  size="large"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 h-auto font-semibold bg-transparent"
                  icon={<EnvironmentOutlined />}
                  onClick={() => scrollToSection("destinations")}
                >
                  Browse Destinations
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
