"use client";

import type React from "react";
import { Card } from "antd";
import {
  SafetyCertificateOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const features = [
  {
    icon: <SafetyCertificateOutlined className="text-3xl text-blue-600" />,
    title: "Certified Expert Guides",
    description:
      "All guides are government-certified, experienced, and background-checked for your complete safety and peace of mind.",
  },
  {
    icon: <EnvironmentOutlined className="text-3xl text-green-600" />,
    title: "Local Insider Knowledge",
    description:
      "Native guides with deep cultural knowledge and access to hidden gems off the beaten path.",
  },
  {
    icon: <PhoneOutlined className="text-3xl text-purple-600" />,
    title: "24/7 Customer Support",
    description:
      "Round-the-clock assistance and emergency support throughout your entire Nepal journey.",
  },
  {
    icon: <HeartOutlined className="text-3xl text-red-600" />,
    title: "Personalized Experiences",
    description:
      "Customized itineraries tailored to your interests, fitness level, and travel preferences.",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ExploreNepal?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're committed to providing you with the most authentic, safe, and
            memorable Nepal experience possible.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              bodyStyle={{ padding: "2rem 1.5rem" }}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
