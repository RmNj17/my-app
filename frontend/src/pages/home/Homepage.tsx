import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, Dropdown, Avatar, message } from "antd";
import {
  MenuOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  UserOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../../components/Hero";
import Destinations from "../../components/Destinations";
import Features from "../../components/Features";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  type User = {
    name: string;
    role: string;
  };

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    message.success("Logged out successfully!");
    navigate("/");
  };

  const getUserMenu = () => (
    <Menu className="min-w-[200px] rounded-lg shadow-lg border-0">
      <Menu.Item key="profile" disabled className="cursor-default">
        <div className="px-3 py-2">
          <div className="font-semibold text-gray-800 text-base">
            {user?.name}
          </div>
          <div className="text-sm text-blue-600 capitalize font-medium">
            {user?.role}
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="dashboard"
        onClick={() =>
          navigate(
            user?.role === "guide"
              ? "/dashboard/guide"
              : user?.role === "admin"
              ? "/dashboard/admin"
              : "/dashboard/tourist"
          )
        }
        className="hover:bg-blue-50"
      >
        <UserOutlined className="mr-3 text-blue-600" />
        <span className="font-medium">My Dashboard</span>
      </Menu.Item>
      {user?.role !== "guide" && (
        <Menu.Item
          key="guides"
          onClick={() => navigate("/guides")}
          className="hover:bg-blue-50"
        >
          <CompassOutlined className="mr-3 text-green-600" />
          <span className="font-medium">Browse Guides</span>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item
        key="logout"
        onClick={handleLogout}
        className="text-red-600 hover:bg-red-50"
      >
        <CloseOutlined className="mr-3" />
        <span className="font-medium">Logout</span>
      </Menu.Item>
    </Menu>
  );

  const signupMenu = (
    <Menu className="min-w-[180px] rounded-lg shadow-lg border-0">
      <Menu.Item
        key="guide"
        onClick={() => navigate("/signup/guide")}
        className="hover:bg-green-50"
      >
        <CompassOutlined className="mr-3 text-green-600" />
        <span className="font-medium">Join as Guide</span>
      </Menu.Item>
      <Menu.Item
        key="tourist"
        onClick={() => navigate("/signup/tourist")}
        className="hover:bg-blue-50"
      >
        <UserOutlined className="mr-3 text-blue-600" />
        <span className="font-medium">Join as Tourist</span>
      </Menu.Item>
    </Menu>
  );

  const destinationsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    let ref;
    switch (section) {
      case "destinations":
        ref = destinationsRef;
        break;
      case "features":
        ref = featuresRef;
        break;
      case "testimonials":
        ref = testimonialsRef;
        break;
      default:
        return;
    }

    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="font-lato">
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
                  <span className="text-white text-xl font-bold">🚩</span>
                </div>
              </div>
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Ghumante Nepal
                </span>
                <div className="text-xs text-gray-500 font-medium">
                  Explore • Adventure • Culture
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection("destinations")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group !cursor-pointer"
                >
                  Destinations
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group !cursor-pointer"
                >
                  Why Choose Us
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group !cursor-pointer"
                >
                  Reviews
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
              </nav>

              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  {user?.role !== "guide" && (
                    <Button
                      type="text"
                      onClick={() => navigate("/guides")}
                      className="font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      <CompassOutlined className="mr-2" />
                      Browse Guides
                    </Button>
                  )}
                  <Dropdown
                    overlay={getUserMenu()}
                    placement="bottomRight"
                    trigger={["hover"]}
                  >
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-none text-white font-medium px-6 py-2 h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center">
                      <Avatar
                        size={28}
                        className="mr-3 bg-white text-blue-600 font-bold"
                      >
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <span className="mr-2">{user?.name?.split(" ")[0]}</span>
                      <DownOutlined className="text-xs" />
                    </Button>
                  </Dropdown>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => navigate("/login")}
                    className="relative overflow-hidden bg-white text-blue-600 border-2 border-blue-600 hover:text-white font-semibold px-8 py-2 h-11 rounded-full transition-all duration-300 group hover:shadow-lg"
                  >
                    <span className="relative z-10">Login</span>
                  </Button>
                  <Dropdown
                    overlay={signupMenu}
                    placement="bottomRight"
                    trigger={["hover"]}
                  >
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-none text-white font-semibold px-6 py-2 h-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                      Sign Up <DownOutlined className="ml-2 text-xs" />
                    </Button>
                  </Dropdown>
                </div>
              )}
            </div>

            <div className="lg:hidden">
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                className="border-none shadow-md hover:shadow-lg transition-all duration-200 w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <nav className="space-y-1 mb-6">
                <button
                  onClick={() => scrollToSection("destinations")}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                >
                  Destinations
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                >
                  Why Choose Us
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                >
                  Reviews
                </button>
              </nav>

              {isLoggedIn ? (
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                    <div className="font-semibold text-gray-800 text-base">
                      {user?.name}
                    </div>
                    <div className="text-sm text-blue-600 capitalize font-medium">
                      {user?.role}
                    </div>
                  </div>
                  <Button
                    type="text"
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg font-medium"
                    onClick={() =>
                      navigate(
                        user?.role === "guide"
                          ? "/dashboard/guide"
                          : user?.role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard/tourist"
                      )
                    }
                  >
                    <UserOutlined className="mr-3 text-blue-600" />
                    My Dashboard
                  </Button>
                  {user?.role !== "guide" && (
                    <Button
                      type="text"
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg font-medium"
                      onClick={() => navigate("/guides")}
                    >
                      <CompassOutlined className="mr-3 text-green-600" />
                      Browse Guides
                    </Button>
                  )}
                  <Button
                    type="text"
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                    onClick={handleLogout}
                  >
                    <CloseOutlined className="mr-3" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <Button
                    className="w-full relative overflow-hidden bg-white border-2 border-blue-600 text-blue-600 hover:text-white font-semibold py-4 h-14 rounded-xl transition-all duration-300 group"
                    onClick={() => navigate("/login")}
                  >
                    <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    <span className="relative z-10 flex items-center justify-center">
                      <UserOutlined className="mr-2" />
                      Login to Your Account
                    </span>
                  </Button>
                  <div className="text-center">
                    <div className="text-gray-600 text-sm font-medium mb-3">
                      New to Ghumante Nepal?
                    </div>
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none rounded-xl font-semibold py-4 h-14 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        onClick={() => navigate("/signup/tourist")}
                      >
                        <UserOutlined className="mr-2" />
                        Start Your Adventure
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-none rounded-xl font-semibold py-4 h-14 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        onClick={() => navigate("/signup/guide")}
                      >
                        <CompassOutlined className="mr-2" />
                        Become a Guide
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <Hero />

      <div ref={destinationsRef}>
        <Destinations />
      </div>

      <div ref={featuresRef}>
        <Features />
      </div>

      <div ref={testimonialsRef}>
        <Testimonials />
      </div>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-6" data-aos="fade-up">
          {isLoggedIn ? (
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
                  onClick={() =>
                    navigate(
                      user?.role === "guide"
                        ? "/dashboard/guide"
                        : "/dashboard/tourist"
                    )
                  }
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
