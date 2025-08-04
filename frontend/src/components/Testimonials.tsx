"use client";

import type React from "react";
import { Card, Rate, Badge, Avatar } from "antd";
import { useTranslation } from "react-i18next";

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t("testimonials.testimonial1.name"),
      country: t("testimonials.testimonial1.country"),
      rating: 5,
      text: t("testimonials.testimonial1.text"),
      avatar: "/placeholder.svg?height=60&width=60",
      trip: t("testimonials.testimonial1.trip"),
    },
    {
      name: t("testimonials.testimonial2.name"),
      country: t("testimonials.testimonial2.country"),
      rating: 5,
      text: t("testimonials.testimonial2.text"),
      avatar: "/placeholder.svg?height=60&width=60",
      trip: t("testimonials.testimonial2.trip"),
    },
    {
      name: t("testimonials.testimonial3.name"),
      country: t("testimonials.testimonial3.country"),
      rating: 5,
      text: t("testimonials.testimonial3.text"),
      avatar: "/placeholder.svg?height=60&width=60",
      trip: t("testimonials.testimonial3.trip"),
    },
  ];
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-gray-600">{t("testimonials.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              bodyStyle={{ padding: "2rem" }}
            >
              <div className="mb-4">
                <Rate
                  disabled
                  defaultValue={testimonial.rating}
                  className="text-sm"
                />
                <Badge
                  count={testimonial.trip}
                  style={{
                    backgroundColor: "#e0f2fe",
                    color: "#0277bd",
                    marginLeft: "8px",
                    fontSize: "11px",
                  }}
                />
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <Avatar src={testimonial.avatar} size={40} className="mr-3" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.country}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
