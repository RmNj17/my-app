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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
                {t("pages.dashboard.welcomeBack")}, {user?.name?.split(" ")[0]}!
                👋
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                {user?.role === "guide"
                  ? t("pages.dashboard.checkDashboard")
                  : t("pages.dashboard.continueAdventure")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="primary"
                  size="large"
                  className="bg-white text-blue-600 hover:bg-gray-100 border-white text-lg px-8 py-6 h-auto font-semibold"
                  onClick={() => navigate("/dashboard")}
                  icon={<UserOutlined />}
                >
                  {user?.role === "guide"
                    ? t("pages.dashboard.viewDashboard")
                    : t("pages.dashboard.myBookings")}
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
                    ? t("pages.dashboard.exploreDest", "Explore Destinations")
                    : t("pages.dashboard.findNewGuides")}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t("homepage.cta.readyToStart")}
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                {t("homepage.cta.joinThousands")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="primary"
                  size="large"
                  className="bg-white text-blue-600 hover:bg-gray-100 border-white text-lg px-8 py-6 h-auto font-semibold"
                  onClick={() => navigate("/guides")}
                  icon={<CompassOutlined />}
                >
                  {t("homepage.cta.bookGuideToday")}
                </Button>
                <Button
                  size="large"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 h-auto font-semibold bg-transparent"
                  icon={<EnvironmentOutlined />}
                  onClick={() => scrollToSection("destinations")}
                >
                  {t("homepage.cta.browseDestinations")}
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
