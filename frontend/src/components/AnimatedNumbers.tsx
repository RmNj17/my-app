"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { Card } from "antd";
import {
  UserOutlined,
  StarFilled,
  CompassOutlined,
  TrophyOutlined,
  HeartFilled,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

interface StatItem {
  icon: React.ReactNode;
  number: number;
  suffix?: string;
  label: string;
  color: string;
  bgColor: string;
}

const stats: StatItem[] = [
  {
    icon: <UserOutlined className="text-2xl" />,
    number: 2500,
    suffix: "+",
    label: "Happy Travelers",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: <StarFilled className="text-2xl" />,
    number: 4.9,
    label: "Average Rating",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    icon: <CompassOutlined className="text-2xl" />,
    number: 150,
    suffix: "+",
    label: "Expert Guides",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: <TrophyOutlined className="text-2xl" />,
    number: 5,
    suffix: "+",
    label: "Years Experience",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: <HeartFilled className="text-2xl" />,
    number: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: <SafetyCertificateOutlined className="text-2xl" />,
    number: 100,
    suffix: "%",
    label: "Safety Record",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="font-bold text-3xl md:text-4xl">
      {count}
      {suffix}
    </div>
  );
};

const AnimatedNumbers: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Journey in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These numbers represent our commitment to providing exceptional
            Nepal experiences and building lasting relationships with travelers
            from around the world.
          </p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
              bodyStyle={{ padding: "2rem 1rem" }}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div
                className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className={`${stat.color} mb-2`}>
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-gray-600 text-sm font-medium leading-tight">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Achievement Section */}
        <div
          className="mt-16 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why These Numbers Matter
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserOutlined className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Trusted by Thousands
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Over 2,500 travelers have chosen us for their Nepal
                    adventure, creating memories that last a lifetime.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CompassOutlined className="text-green-600 text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Expert Local Guides
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Our network of 150+ certified guides brings deep local
                    knowledge and ensures authentic experiences.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <StarFilled className="text-yellow-600 text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Exceptional Quality
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Our 4.9-star rating reflects our commitment to excellence
                    and customer satisfaction in every tour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedNumbers;
