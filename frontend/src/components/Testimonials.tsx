"use client";

import type React from "react";
import { Card, Rate, Badge, Avatar } from "antd";

const testimonials = [
  {
    name: "Rajesh Shrestha",
    country: "Nepal",
    rating: 5,
    text: "Our Everest Base Camp trek was absolutely incredible! Our guide Pemba was knowledgeable, friendly, and made sure we were safe every step of the way. The views were breathtaking and the cultural insights were invaluable.",
    avatar: "/placeholder.svg?height=60&width=60",
    trip: "Everest Base Camp Trek",
  },
  {
    name: "Sita Gurung",
    country: "Nepal",
    rating: 5,
    text: "The cultural tour of Kathmandu Valley exceeded all expectations. Our guide showed us hidden temples and local markets that we never would have found on our own. Truly authentic experience!",
    avatar: "/placeholder.svg?height=60&width=60",
    trip: "Kathmandu Cultural Tour",
  },
  {
    name: "Binod Tamang",
    country: "Nepal",
    rating: 5,
    text: "Perfect organization from start to finish. The Annapurna Circuit trek was challenging but our guide made it enjoyable and safe. The hospitality of the Nepalese people is unmatched!",
    avatar: "/placeholder.svg?height=60&width=60",
    trip: "Annapurna Circuit Trek",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from real adventures in Nepal
          </p>
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
