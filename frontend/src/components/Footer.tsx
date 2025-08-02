"use client";

import type React from "react";
import { Button } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="text-2xl font-bold text-blue-400 mb-4">
              🏔️ ExploreNepal
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for authentic Nepal experiences. We connect
              travelers with certified local guides for safe, memorable, and
              culturally rich adventures across the beautiful landscapes of
              Nepal.
            </p>
            <div className="flex space-x-3">
              <Button
                type="text"
                shape="circle"
                icon={<FacebookOutlined />}
                className="text-gray-400 hover:text-white hover:bg-blue-600 border-gray-600"
              />
              <Button
                type="text"
                shape="circle"
                icon={<TwitterOutlined />}
                className="text-gray-400 hover:text-white hover:bg-blue-400 border-gray-600"
              />
              <Button
                type="text"
                shape="circle"
                icon={<InstagramOutlined />}
                className="text-gray-400 hover:text-white hover:bg-pink-600 border-gray-600"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/guides")}
                  className="hover:text-white transition-colors"
                >
                  Our Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("destinations")}
                  className="hover:text-white transition-colors"
                >
                  Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button
                  onClick={() => navigate("/help")}
                  className="hover:text-white transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/safety")}
                  className="hover:text-white transition-colors"
                >
                  Safety Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/terms")}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/privacy")}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} ExploreNepal. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
