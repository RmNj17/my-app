"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  Badge,
  Modal,
  Carousel,
  Tabs,
  Tag,
  Divider,
  Button,
  Rate,
} from "antd";
import {
  StarFilled,
  EyeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FireOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  GiftOutlined,
  CompassOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { TabPane } = Tabs;

interface Destination {
  name: string;
  image: string;
  description: string;
  rating: 4.6 | 4.7 | 4.8 | 4.9;
  tours: number;
  highlights: string[];
  detailedDescription: string;
  bestTimeToVisit: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme";
  priceRange: string;
  activities: string[];
  included: string[];
  excluded: string[];
  requirements: string[];
  gallery: string[];
  facts: { label: string; value: string }[];
}

const destinations: Destination[] = [
  {
    name: "Pokhara",
    image: "/public/pokhara.jpg",
    description:
      "Gateway to the Annapurnas with pristine lakes and stunning mountain views",
    rating: 4.8,
    tours: 156,
    highlights: ["Phewa Lake", "Annapurna Range", "Adventure Sports"],
    detailedDescription:
      "Pokhara, Nepal's adventure capital, sits majestically beside the tranquil Phewa Lake with the dramatic Annapurna range forming a stunning backdrop. This enchanting city offers the perfect blend of natural beauty, adventure activities, and cultural experiences. From paragliding over the valley to exploring ancient temples and caves, Pokhara provides unforgettable memories for every type of traveler.",
    bestTimeToVisit: "October to December, March to May",
    duration: "3-7 days",
    difficulty: "Easy",
    priceRange: "$50-150 per day",
    activities: [
      "Paragliding",
      "Boating on Phewa Lake",
      "Sarangkot Sunrise",
      "World Peace Pagoda",
      "Devi's Fall",
      "Gupteshwor Cave",
      "Mountain Biking",
      "Zip-lining",
    ],
    included: [
      "Professional guide",
      "Transportation",
      "Entrance fees",
      "Safety equipment",
    ],
    excluded: [
      "Meals",
      "Accommodation",
      "Personal expenses",
      "Travel insurance",
    ],
    requirements: [
      "Comfortable walking shoes",
      "Sun protection",
      "Camera",
      "Light jacket",
    ],
    gallery: [
      "/public/pokhara.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facts: [
      { label: "Altitude", value: "822m" },
      { label: "Population", value: "518,000" },
      { label: "Lake Area", value: "5.23 km²" },
      { label: "Founded", value: "1786" },
    ],
  },
  {
    name: "Kathmandu",
    image: "/public/kathmandu.jpeg",
    description: "Ancient temples, vibrant markets, and rich cultural heritage",
    rating: 4.7,
    tours: 203,
    highlights: ["Durbar Square", "Swayambhunath", "Thamel District"],
    detailedDescription:
      "Kathmandu, the vibrant capital of Nepal, is a living museum where ancient traditions seamlessly blend with modern life. The city is home to seven UNESCO World Heritage Sites, bustling markets, and some of the most sacred Hindu and Buddhist temples in the world. Every corner tells a story of centuries-old craftsmanship, spiritual devotion, and cultural richness that continues to thrive today.",
    bestTimeToVisit: "October to December, February to April",
    duration: "2-5 days",
    difficulty: "Easy",
    priceRange: "$40-120 per day",
    activities: [
      "Durbar Square Tour",
      "Swayambhunath Temple",
      "Boudhanath Stupa",
      "Pashupatinath Temple",
      "Thamel Shopping",
      "Cooking Classes",
      "Cultural Shows",
      "Art Galleries",
    ],
    included: [
      "Expert cultural guide",
      "Temple entrance fees",
      "Traditional lunch",
      "Cultural performance",
    ],
    excluded: ["Hotel pickup", "Personal shopping", "Tips", "Additional meals"],
    requirements: [
      "Respectful clothing",
      "Comfortable shoes",
      "Scarf for temples",
      "Small backpack",
    ],
    gallery: [
      "/public/kathmandu.jpeg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facts: [
      { label: "Altitude", value: "1,400m" },
      { label: "Population", value: "1.4 million" },
      { label: "UNESCO Sites", value: "7" },
      { label: "Founded", value: "723 AD" },
    ],
  },
  {
    name: "Mount Everest",
    image: "/public/mteverest.jpeg",
    description: "World's highest peak and the ultimate trekking adventure",
    rating: 4.9,
    tours: 89,
    highlights: ["Base Camp Trek", "Sherpa Culture", "Himalayan Views"],
    detailedDescription:
      "Mount Everest, standing at 8,848.86 meters, represents the ultimate adventure for trekkers worldwide. The journey to Everest Base Camp is not just about reaching a destination; it's about experiencing the incredible Sherpa culture, witnessing breathtaking Himalayan vistas, and pushing your personal limits. This life-changing trek takes you through diverse landscapes, from lush forests to glacial moraines, while offering unparalleled mountain views.",
    bestTimeToVisit: "March to May, September to November",
    duration: "12-16 days",
    difficulty: "Challenging",
    priceRange: "$1,200-2,500 total",
    activities: [
      "Base Camp Trekking",
      "Sherpa Village Visits",
      "Monastery Tours",
      "Acclimatization Hikes",
      "Photography Tours",
      "Cultural Immersion",
      "Mountain Views",
      "Glacier Exploration",
    ],
    included: [
      "Experienced Sherpa guide",
      "Porter service",
      "All permits",
      "Accommodation in teahouses",
      "All meals during trek",
      "First aid kit",
    ],
    excluded: [
      "International flights",
      "Kathmandu hotels",
      "Personal gear",
      "Emergency evacuation insurance",
    ],
    requirements: [
      "Good physical fitness",
      "Trekking experience",
      "Proper gear",
      "Travel insurance",
      "Medical clearance",
    ],
    gallery: [
      "/public/mteverest.jpeg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facts: [
      { label: "Height", value: "8,848.86m" },
      { label: "Base Camp Alt.", value: "5,364m" },
      { label: "First Ascent", value: "1953" },
      { label: "Success Rate", value: "60%" },
    ],
  },
  {
    name: "Lumbini",
    image: "/public/lumbini.jpeg",
    description: "Sacred birthplace of Buddha and spiritual pilgrimage site",
    rating: 4.6,
    tours: 124,
    highlights: ["Maya Devi Temple", "Peace Pagoda", "Monasteries"],
    detailedDescription:
      "Lumbini, the birthplace of Lord Buddha, is one of the most sacred pilgrimage sites for Buddhists worldwide. This UNESCO World Heritage Site offers a profound spiritual experience with its peaceful gardens, ancient ruins, and modern monasteries built by Buddhist communities from around the world. The site provides a unique opportunity to explore Buddhist philosophy, meditation practices, and the life of Siddhartha Gautama.",
    bestTimeToVisit: "October to March",
    duration: "1-3 days",
    difficulty: "Easy",
    priceRange: "$30-80 per day",
    activities: [
      "Maya Devi Temple Visit",
      "Meditation Sessions",
      "Monastery Tours",
      "Peace Pagoda",
      "Archaeological Sites",
      "Buddhist Philosophy Classes",
      "Spiritual Walks",
      "Cultural Programs",
    ],
    included: [
      "Spiritual guide",
      "Temple access",
      "Meditation session",
      "Cultural presentation",
    ],
    excluded: [
      "Accommodation",
      "Meals",
      "Transportation",
      "Personal donations",
    ],
    requirements: [
      "Respectful attire",
      "Quiet demeanor",
      "Open mind",
      "Comfortable shoes",
    ],
    gallery: [
      "/public/lumbini.jpeg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facts: [
      { label: "Founded", value: "563 BC" },
      { label: "Area", value: "1.55 km²" },
      { label: "Monasteries", value: "25+" },
      { label: "Pilgrims/Year", value: "1 million+" },
    ],
  },
  {
    name: "Chitwan",
    image: "/public/chitwan.jpeg",
    description: "Wildlife safari adventures in Nepal's premier national park",
    rating: 4.7,
    tours: 167,
    highlights: ["Jungle Safari", "Rhino Spotting", "Elephant Rides"],
    detailedDescription:
      "Chitwan National Park, Nepal's first national park and a UNESCO World Heritage Site, offers incredible wildlife experiences in the heart of the Terai lowlands. Home to the endangered one-horned rhinoceros, Bengal tigers, and over 500 bird species, Chitwan provides thrilling safari adventures through diverse ecosystems including grasslands, forests, and riverine areas.",
    bestTimeToVisit: "October to March",
    duration: "2-4 days",
    difficulty: "Easy",
    priceRange: "$80-200 per day",
    activities: [
      "Jeep Safari",
      "Elephant Safari",
      "Canoe Rides",
      "Bird Watching",
      "Nature Walks",
      "Tharu Cultural Show",
      "Crocodile Spotting",
      "Photography Tours",
    ],
    included: [
      "Safari guide",
      "Park permits",
      "All activities",
      "Cultural show",
      "Meals",
    ],
    excluded: [
      "Accommodation upgrades",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips",
    ],
    requirements: [
      "Neutral colored clothing",
      "Binoculars",
      "Camera",
      "Insect repellent",
      "Sun hat",
    ],
    gallery: [
      "/public/chitwan.jpeg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facts: [
      { label: "Established", value: "1973" },
      { label: "Area", value: "952.63 km²" },
      { label: "Rhino Population", value: "645" },
      { label: "Bird Species", value: "500+" },
    ],
  },
  {
    name: "Bhaktapur",
    image: "/public/bhaktapur.jpeg",
    description: "Medieval architecture and traditional Newari craftsmanship",
    rating: 4.8,
    tours: 142,
    highlights: ["Pottery Square", "55-Window Palace", "Traditional Arts"],
    detailedDescription:
      "Bhaktapur, also known as the 'City of Devotees,' is a living medieval city that has preserved its ancient charm and traditional way of life. This UNESCO World Heritage Site showcases the finest examples of Newari architecture, wood carving, and pottery making. Walking through its narrow alleys feels like stepping back in time, with every corner revealing intricate temples, courtyards, and artisan workshops.",
    bestTimeToVisit: "October to April",
    duration: "1-2 days",
    difficulty: "Easy",
    priceRange: "$40-100 per day",
    activities: [
      "Durbar Square Tour",
      "Pottery Making",
      "Wood Carving Workshops",
      "Traditional Architecture",
      "Local Cuisine Tasting",
      "Artisan Visits",
      "Cultural Photography",
      "Temple Exploration",
    ],
    included: [
      "Heritage guide",
      "Entrance fees",
      "Pottery session",
      "Traditional lunch",
    ],
    excluded: [
      "Shopping expenses",
      "Additional workshops",
      "Transportation",
      "Personal purchases",
    ],
    requirements: [
      "Comfortable walking shoes",
      "Camera",
      "Respectful clothing",
      "Small daypack",
    ],
    gallery: [
      "/public/bhaktapur.jpeg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    facts: [
      { label: "Founded", value: "12th century" },
      { label: "Population", value: "81,748" },
      { label: "Temples", value: "172" },
      { label: "Courtyards", value: "77" },
    ],
  },
];

const Destinations: React.FC = () => {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const openDestinationModal = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsModalVisible(true);
  };

  const closeDestinationModal = () => {
    setIsModalVisible(false);
    setSelectedDestination(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "green";
      case "Moderate":
        return "blue";
      case "Challenging":
        return "orange";
      case "Extreme":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Destinations in Nepal
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore Nepal's most breathtaking locations with our expert local
            guides. Click on any destination to learn more.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((place, index) => (
            <Card
              key={place.name}
              hoverable
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => openDestinationModal(place)}
              cover={
                <div className="relative overflow-hidden h-56">
                  <img
                    src={place.image || "/placeholder.svg"}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      count={
                        <span className="flex items-center text-xs">
                          <StarFilled className="text-yellow-400 mr-1" />
                          {place.rating}
                        </span>
                      }
                      style={{
                        backgroundColor: "rgba(255,255,255,0.95)",
                        color: "#333",
                        fontWeight: "bold",
                      }}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge
                      count={`${place.tours} tours available`}
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.9)",
                        color: "white",
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <EyeOutlined className="text-3xl mb-2" />
                      <p className="text-sm font-medium">Click to explore</p>
                    </div>
                  </div>
                </div>
              }
            >
              <Meta
                title={
                  <span className="text-xl font-bold text-gray-900">
                    {place.name}
                  </span>
                }
                description={
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {place.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {place.highlights.map((highlight, idx) => (
                        <Tag key={idx} color="blue" className="text-xs">
                          {highlight}
                        </Tag>
                      ))}
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      <Modal
        title={null}
        open={isModalVisible}
        onCancel={closeDestinationModal}
        footer={null}
        width={900}
        className="destination-modal"
      >
        {selectedDestination && (
          <div className="max-h-[80vh] overflow-y-auto">
            {/* Modal Header with Image */}
            <div className="relative h-64 overflow-hidden">
              <Carousel autoplay>
                {selectedDestination.gallery.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image || "/placeholder.svg"}
                      alt={selectedDestination.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </Carousel>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {selectedDestination.name}
                </h2>
                <div className="flex items-center space-x-4">
                  <Rate
                    disabled
                    defaultValue={selectedDestination.rating}
                    className="text-sm"
                  />
                  <span className="text-sm">
                    ({selectedDestination.tours} tours available)
                  </span>
                </div>
              </div>
            </div>
            {/* Modal Content */}
            <div className="p-6">
              <Tabs defaultActiveKey="overview" className="destination-tabs">
                <TabPane tab="Overview" key="overview">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {selectedDestination.detailedDescription}
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <CalendarOutlined className="text-blue-600" />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Best Time to Visit
                            </p>
                            <p className="text-gray-600 text-sm">
                              {selectedDestination.bestTimeToVisit}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <ClockCircleOutlined className="text-green-600" />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Duration
                            </p>
                            <p className="text-gray-600 text-sm">
                              {selectedDestination.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <FireOutlined className="text-orange-600" />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Difficulty Level
                            </p>
                            <Tag
                              color={getDifficultyColor(
                                selectedDestination.difficulty
                              )}
                            >
                              {selectedDestination.difficulty}
                            </Tag>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <DollarOutlined className="text-purple-600" />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Price Range
                            </p>
                            <p className="text-gray-600 text-sm">
                              {selectedDestination.priceRange}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <GiftOutlined className="mr-2 text-blue-600" />
                        Key Facts
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedDestination.facts.map((fact, index) => (
                          <div
                            key={index}
                            className="text-center p-3 bg-gray-50 rounded-lg"
                          >
                            <p className="text-sm text-gray-600">
                              {fact.label}
                            </p>
                            <p className="font-bold text-gray-900">
                              {fact.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Activities" key="activities">
                  <div className="space-y-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      What You Can Do
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedDestination.activities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                        >
                          <CheckCircleOutlined className="text-blue-600" />
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="What's Included" key="included">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-green-600">
                        <CheckCircleOutlined className="mr-2" />
                        Included in Your Tour
                      </h4>
                      <div className="space-y-2">
                        {selectedDestination.included.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircleOutlined className="text-green-600 text-sm" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Divider />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-red-600">
                        <CloseOutlined className="mr-2" />
                        Not Included
                      </h4>
                      <div className="space-y-2">
                        {selectedDestination.excluded.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <CloseOutlined className="text-red-600 text-sm" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Divider />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-blue-600">
                        <InfoCircleOutlined className="mr-2" />
                        What to Bring
                      </h4>
                      <div className="space-y-2">
                        {selectedDestination.requirements.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <InfoCircleOutlined className="text-blue-600 text-sm" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <Button
                  type="primary"
                  size="large"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 font-semibold"
                  icon={<CompassOutlined />}
                  onClick={() => {
                    closeDestinationModal();
                    navigate("/guides");
                  }}
                >
                  Find Guides for This Destination
                </Button>
                <Button
                  size="large"
                  className="flex-1 h-12 font-semibold"
                  icon={<PhoneOutlined />}
                  onClick={() => navigate("/contact")}
                >
                  Contact for Custom Tour
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Destinations;
