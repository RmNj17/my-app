import React, { useState } from "react";
import { Button, Menu, Dropdown, Avatar, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../features/auth/authSlice";
import LanguageSelector from "./LanguageSelector";
import {
  MenuOutlined,
  CompassOutlined,
  UserOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
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
        onClick={() => navigate("/dashboard")}
        className="hover:bg-blue-50"
      >
        <UserOutlined className="mr-3 text-blue-600" />
        <span className="font-medium">{t("navigation.dashboard")}</span>
      </Menu.Item>
      {user?.role !== "guide" && (
        <Menu.Item
          key="guides"
          onClick={() => navigate("/guides")}
          className="hover:bg-blue-50"
        >
          <CompassOutlined className="mr-3 text-green-600" />
          <span className="font-medium">{t("navigation.guides")}</span>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item
        key="logout"
        onClick={handleLogout}
        className="text-red-600 hover:bg-red-50"
      >
        <CloseOutlined className="mr-3" />
        <span className="font-medium">{t("navigation.logout")}</span>
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
        <span className="font-medium">{t("auth.guide")}</span>
      </Menu.Item>
      <Menu.Item
        key="tourist"
        onClick={() => navigate("/signup/tourist")}
        className="hover:bg-blue-50"
      >
        <UserOutlined className="mr-3 text-blue-600" />
        <span className="font-medium">{t("auth.tourist")}</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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
                {t("hero.brandName")}
              </span>
              <div className="text-xs text-gray-500 font-medium">
                {t("navigation.tagline")}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Links for Homepage */}
            {location.pathname === "/" && (
              <nav className="flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection("destinations")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group !cursor-pointer"
                >
                  {t("navigation.destinations")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group !cursor-pointer"
                >
                  {t("navigation.whyChooseUs")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group !cursor-pointer"
                >
                  {t("navigation.reviews")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
              </nav>
            )}

            {/* Other page navigation */}
            {location.pathname !== "/" && (
              <nav className="flex items-center space-x-8">
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group !cursor-pointer"
                >
                  {t("navigation.home")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => navigate("/guides")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group !cursor-pointer"
                >
                  {t("navigation.guides")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
              </nav>
            )}

            <Space>
              <LanguageSelector size="small" />

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {user?.role !== "guide" && (
                    <Button
                      type="text"
                      onClick={() => navigate("/guides")}
                      className="font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      <CompassOutlined className="mr-2" />
                      {t("navigation.guides")}
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
                    <span className="relative z-10">
                      {t("navigation.login")}
                    </span>
                  </Button>
                  <Dropdown
                    overlay={signupMenu}
                    placement="bottomRight"
                    trigger={["hover"]}
                  >
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-none text-white font-semibold px-6 py-2 h-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                      {t("navigation.signup")}{" "}
                      <DownOutlined className="ml-2 text-xs" />
                    </Button>
                  </Dropdown>
                </div>
              )}
            </Space>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSelector size="small" />
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              className="border-none shadow-md hover:shadow-lg transition-all duration-200 w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Mobile Navigation Links */}
            <nav className="space-y-1 mb-6">
              {location.pathname === "/" ? (
                <>
                  <button
                    onClick={() => scrollToSection("destinations")}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  >
                    {t("navigation.destinations")}
                  </button>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  >
                    {t("navigation.whyChooseUs")}
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  >
                    {t("navigation.reviews")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/")}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  >
                    {t("navigation.home")}
                  </button>
                  <button
                    onClick={() => navigate("/guides")}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  >
                    {t("navigation.guides")}
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Auth Section */}
            {isAuthenticated ? (
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
                  onClick={() => navigate("/dashboard")}
                >
                  <UserOutlined className="mr-3 text-blue-600" />
                  {t("navigation.dashboard")}
                </Button>

                {user?.role !== "guide" && (
                  <Button
                    type="text"
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg font-medium"
                    onClick={() => navigate("/guides")}
                  >
                    <CompassOutlined className="mr-3 text-green-600" />
                    {t("navigation.guides")}
                  </Button>
                )}

                <Button
                  type="text"
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                  onClick={handleLogout}
                >
                  <CloseOutlined className="mr-3" />
                  {t("navigation.logout")}
                </Button>
              </div>
            ) : (
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 h-auto rounded-lg transition-all duration-200"
                >
                  {t("navigation.login")}
                </Button>
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate("/signup/tourist")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-auto rounded-lg transition-all duration-200"
                  >
                    {t("auth.tourist")} {t("navigation.signup")}
                  </Button>
                  <Button
                    onClick={() => navigate("/signup/guide")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 h-auto rounded-lg transition-all duration-200"
                  >
                    {t("auth.guide")} {t("navigation.signup")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
