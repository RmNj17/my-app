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
import { useTranslation } from "react-i18next";

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

const Destinations: React.FC = () => {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Get translated destinations data
  const getTranslatedDestinations = (): Destination[] => {
    return [
      {
        name: t("destinations.pokhara.name"),
        image: "/pokhara.jpg",
        description: t("destinations.pokhara.description"),
        rating: 4.8,
        tours: 156,
        highlights: [
          t("destinations.pokhara.highlights.0"),
          t("destinations.pokhara.highlights.1"),
          t("destinations.pokhara.highlights.2"),
        ],
        detailedDescription: t("destinations.pokhara.detailedDescription"),
        bestTimeToVisit: t("destinations.pokhara.bestTimeToVisit"),
        duration: t("destinations.pokhara.duration"),
        difficulty: t("destinations.pokhara.difficulty") as
          | "Easy"
          | "Moderate"
          | "Challenging"
          | "Extreme",
        priceRange: t("destinations.pokhara.priceRange"),
        activities: [
          t("destinations.pokhara.activities.0"),
          t("destinations.pokhara.activities.1"),
          t("destinations.pokhara.activities.2"),
          t("destinations.pokhara.activities.3"),
          t("destinations.pokhara.activities.4"),
          t("destinations.pokhara.activities.5"),
          t("destinations.pokhara.activities.6"),
          t("destinations.pokhara.activities.7"),
        ],
        included: [
          t("destinations.pokhara.included.0"),
          t("destinations.pokhara.included.1"),
          t("destinations.pokhara.included.2"),
          t("destinations.pokhara.included.3"),
        ],
        excluded: [
          t("destinations.pokhara.excluded.0"),
          t("destinations.pokhara.excluded.1"),
          t("destinations.pokhara.excluded.2"),
          t("destinations.pokhara.excluded.3"),
        ],
        requirements: [
          t("destinations.pokhara.requirements.0"),
          t("destinations.pokhara.requirements.1"),
          t("destinations.pokhara.requirements.2"),
          t("destinations.pokhara.requirements.3"),
        ],
        gallery: [
          "/pokhara.jpg",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        facts: [
          {
            label: t("destinations.pokhara.facts.altitude.label"),
            value: t("destinations.pokhara.facts.altitude.value"),
          },
          {
            label: t("destinations.pokhara.facts.population.label"),
            value: t("destinations.pokhara.facts.population.value"),
          },
          {
            label: t("destinations.pokhara.facts.lakeArea.label"),
            value: t("destinations.pokhara.facts.lakeArea.value"),
          },
          {
            label: t("destinations.pokhara.facts.founded.label"),
            value: t("destinations.pokhara.facts.founded.value"),
          },
        ],
      },
      {
        name: t("destinations.kathmandu.name"),
        image: "/kathmandu.jpeg",
        description: t("destinations.kathmandu.description"),
        rating: 4.7,
        tours: 203,
        highlights: [
          t("destinations.kathmandu.highlights.0"),
          t("destinations.kathmandu.highlights.1"),
          t("destinations.kathmandu.highlights.2"),
        ],
        detailedDescription: t("destinations.kathmandu.detailedDescription"),
        bestTimeToVisit: t("destinations.kathmandu.bestTimeToVisit"),
        duration: t("destinations.kathmandu.duration"),
        difficulty: t("destinations.kathmandu.difficulty") as
          | "Easy"
          | "Moderate"
          | "Challenging"
          | "Extreme",
        priceRange: t("destinations.kathmandu.priceRange"),
        activities: [
          t("destinations.kathmandu.activities.0"),
          t("destinations.kathmandu.activities.1"),
          t("destinations.kathmandu.activities.2"),
          t("destinations.kathmandu.activities.3"),
          t("destinations.kathmandu.activities.4"),
          t("destinations.kathmandu.activities.5"),
          t("destinations.kathmandu.activities.6"),
          t("destinations.kathmandu.activities.7"),
        ],
        included: [
          t("destinations.kathmandu.included.0"),
          t("destinations.kathmandu.included.1"),
          t("destinations.kathmandu.included.2"),
          t("destinations.kathmandu.included.3"),
        ],
        excluded: [
          t("destinations.kathmandu.excluded.0"),
          t("destinations.kathmandu.excluded.1"),
          t("destinations.kathmandu.excluded.2"),
          t("destinations.kathmandu.excluded.3"),
        ],
        requirements: [
          t("destinations.kathmandu.requirements.0"),
          t("destinations.kathmandu.requirements.1"),
          t("destinations.kathmandu.requirements.2"),
          t("destinations.kathmandu.requirements.3"),
        ],
        gallery: [
          "/kathmandu.jpeg",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        facts: [
          {
            label: t("destinations.kathmandu.facts.altitude.label"),
            value: t("destinations.kathmandu.facts.altitude.value"),
          },
          {
            label: t("destinations.kathmandu.facts.population.label"),
            value: t("destinations.kathmandu.facts.population.value"),
          },
          {
            label: t("destinations.kathmandu.facts.unescoSites.label"),
            value: t("destinations.kathmandu.facts.unescoSites.value"),
          },
          {
            label: t("destinations.kathmandu.facts.founded.label"),
            value: t("destinations.kathmandu.facts.founded.value"),
          },
        ],
      },
      {
        name: t("destinations.everest.name"),
        image: "/mteverest.jpeg",
        description: t("destinations.everest.description"),
        rating: 4.9,
        tours: 89,
        highlights: [
          t("destinations.everest.highlights.0"),
          t("destinations.everest.highlights.1"),
          t("destinations.everest.highlights.2"),
        ],
        detailedDescription: t("destinations.everest.detailedDescription"),
        bestTimeToVisit: t("destinations.everest.bestTimeToVisit"),
        duration: t("destinations.everest.duration"),
        difficulty: t("destinations.everest.difficulty") as
          | "Easy"
          | "Moderate"
          | "Challenging"
          | "Extreme",
        priceRange: t("destinations.everest.priceRange"),
        activities: [
          t("destinations.everest.activities.0"),
          t("destinations.everest.activities.1"),
          t("destinations.everest.activities.2"),
          t("destinations.everest.activities.3"),
          t("destinations.everest.activities.4"),
          t("destinations.everest.activities.5"),
          t("destinations.everest.activities.6"),
          t("destinations.everest.activities.7"),
        ],
        included: [
          t("destinations.everest.included.0"),
          t("destinations.everest.included.1"),
          t("destinations.everest.included.2"),
          t("destinations.everest.included.3"),
        ],
        excluded: [
          t("destinations.everest.excluded.0"),
          t("destinations.everest.excluded.1"),
          t("destinations.everest.excluded.2"),
          t("destinations.everest.excluded.3"),
        ],
        requirements: [
          t("destinations.everest.requirements.0"),
          t("destinations.everest.requirements.1"),
          t("destinations.everest.requirements.2"),
          t("destinations.everest.requirements.3"),
        ],
        gallery: [
          "/mteverest.jpeg",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        facts: [
          {
            label: t("destinations.everest.facts.height.label"),
            value: t("destinations.everest.facts.height.value"),
          },
          {
            label: t("destinations.everest.facts.baseCampAlt.label"),
            value: t("destinations.everest.facts.baseCampAlt.value"),
          },
          {
            label: t("destinations.everest.facts.firstAscent.label"),
            value: t("destinations.everest.facts.firstAscent.value"),
          },
          {
            label: t("destinations.everest.facts.successRate.label"),
            value: t("destinations.everest.facts.successRate.value"),
          },
        ],
      },
      {
        name: t("destinations.lumbini.name"),
        image: "/lumbini.jpeg",
        description: t("destinations.lumbini.description"),
        rating: 4.6,
        tours: 124,
        highlights: [
          t("destinations.lumbini.highlights.0"),
          t("destinations.lumbini.highlights.1"),
          t("destinations.lumbini.highlights.2"),
        ],
        detailedDescription: t("destinations.lumbini.detailedDescription"),
        bestTimeToVisit: t("destinations.lumbini.bestTimeToVisit"),
        duration: t("destinations.lumbini.duration"),
        difficulty: t("destinations.lumbini.difficulty") as
          | "Easy"
          | "Moderate"
          | "Challenging"
          | "Extreme",
        priceRange: t("destinations.lumbini.priceRange"),
        activities: [
          t("destinations.lumbini.activities.0"),
          t("destinations.lumbini.activities.1"),
          t("destinations.lumbini.activities.2"),
          t("destinations.lumbini.activities.3"),
          t("destinations.lumbini.activities.4"),
          t("destinations.lumbini.activities.5"),
          t("destinations.lumbini.activities.6"),
          t("destinations.lumbini.activities.7"),
        ],
        included: [
          t("destinations.lumbini.included.0"),
          t("destinations.lumbini.included.1"),
          t("destinations.lumbini.included.2"),
          t("destinations.lumbini.included.3"),
        ],
        excluded: [
          t("destinations.lumbini.excluded.0"),
          t("destinations.lumbini.excluded.1"),
          t("destinations.lumbini.excluded.2"),
          t("destinations.lumbini.excluded.3"),
        ],
        requirements: [
          t("destinations.lumbini.requirements.0"),
          t("destinations.lumbini.requirements.1"),
          t("destinations.lumbini.requirements.2"),
          t("destinations.lumbini.requirements.3"),
        ],
        gallery: [
          "/lumbini.jpeg",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        facts: [
          {
            label: t("destinations.lumbini.facts.founded.label"),
            value: t("destinations.lumbini.facts.founded.value"),
          },
          {
            label: t("destinations.lumbini.facts.area.label"),
            value: t("destinations.lumbini.facts.area.value"),
          },
          {
            label: t("destinations.lumbini.facts.monasteries.label"),
            value: t("destinations.lumbini.facts.monasteries.value"),
          },
          {
            label: t("destinations.lumbini.facts.pilgrims.label"),
            value: t("destinations.lumbini.facts.pilgrims.value"),
          },
        ],
      },
      {
        name: t("destinations.chitwan.name"),
        image: "/chitwan.jpeg",
        description: t("destinations.chitwan.description"),
        rating: 4.7,
        tours: 167,
        highlights: [
          t("destinations.chitwan.highlights.0"),
          t("destinations.chitwan.highlights.1"),
          t("destinations.chitwan.highlights.2"),
        ],
        detailedDescription: t("destinations.chitwan.detailedDescription"),
        bestTimeToVisit: t("destinations.chitwan.bestTimeToVisit"),
        duration: t("destinations.chitwan.duration"),
        difficulty: t("destinations.chitwan.difficulty") as
          | "Easy"
          | "Moderate"
          | "Challenging"
          | "Extreme",
        priceRange: t("destinations.chitwan.priceRange"),
        activities: [
          t("destinations.chitwan.activities.0"),
          t("destinations.chitwan.activities.1"),
          t("destinations.chitwan.activities.2"),
          t("destinations.chitwan.activities.3"),
          t("destinations.chitwan.activities.4"),
          t("destinations.chitwan.activities.5"),
          t("destinations.chitwan.activities.6"),
          t("destinations.chitwan.activities.7"),
        ],
        included: [
          t("destinations.chitwan.included.0"),
          t("destinations.chitwan.included.1"),
          t("destinations.chitwan.included.2"),
          t("destinations.chitwan.included.3"),
        ],
        excluded: [
          t("destinations.chitwan.excluded.0"),
          t("destinations.chitwan.excluded.1"),
          t("destinations.chitwan.excluded.2"),
          t("destinations.chitwan.excluded.3"),
        ],
        requirements: [
          t("destinations.chitwan.requirements.0"),
          t("destinations.chitwan.requirements.1"),
          t("destinations.chitwan.requirements.2"),
          t("destinations.chitwan.requirements.3"),
        ],
        gallery: [
          "/chitwan.jpeg",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        facts: [
          {
            label: t("destinations.chitwan.facts.established.label"),
            value: t("destinations.chitwan.facts.established.value"),
          },
          {
            label: t("destinations.chitwan.facts.area.label"),
            value: t("destinations.chitwan.facts.area.value"),
          },
          {
            label: t("destinations.chitwan.facts.rhinoPopulation.label"),
            value: t("destinations.chitwan.facts.rhinoPopulation.value"),
          },
          {
            label: t("destinations.chitwan.facts.birdSpecies.label"),
            value: t("destinations.chitwan.facts.birdSpecies.value"),
          },
        ],
      },
      {
        name: t("destinations.bhaktapur.name"),
        image: "/bhaktapur.jpeg",
        description: t("destinations.bhaktapur.description"),
        rating: 4.8,
        tours: 142,
        highlights: [
          t("destinations.bhaktapur.highlights.0"),
          t("destinations.bhaktapur.highlights.1"),
          t("destinations.bhaktapur.highlights.2"),
        ],
        detailedDescription: t("destinations.bhaktapur.detailedDescription"),
        bestTimeToVisit: t("destinations.bhaktapur.bestTimeToVisit"),
        duration: t("destinations.bhaktapur.duration"),
        difficulty: t("destinations.bhaktapur.difficulty") as
          | "Easy"
          | "Moderate"
          | "Challenging"
          | "Extreme",
        priceRange: t("destinations.bhaktapur.priceRange"),
        activities: [
          t("destinations.bhaktapur.activities.0"),
          t("destinations.bhaktapur.activities.1"),
          t("destinations.bhaktapur.activities.2"),
          t("destinations.bhaktapur.activities.3"),
          t("destinations.bhaktapur.activities.4"),
          t("destinations.bhaktapur.activities.5"),
          t("destinations.bhaktapur.activities.6"),
          t("destinations.bhaktapur.activities.7"),
        ],
        included: [
          t("destinations.bhaktapur.included.0"),
          t("destinations.bhaktapur.included.1"),
          t("destinations.bhaktapur.included.2"),
          t("destinations.bhaktapur.included.3"),
        ],
        excluded: [
          t("destinations.bhaktapur.excluded.0"),
          t("destinations.bhaktapur.excluded.1"),
          t("destinations.bhaktapur.excluded.2"),
          t("destinations.bhaktapur.excluded.3"),
        ],
        requirements: [
          t("destinations.bhaktapur.requirements.0"),
          t("destinations.bhaktapur.requirements.1"),
          t("destinations.bhaktapur.requirements.2"),
          t("destinations.bhaktapur.requirements.3"),
        ],
        gallery: [
          "/bhaktapur.jpeg",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        facts: [
          {
            label: t("destinations.bhaktapur.facts.founded.label"),
            value: t("destinations.bhaktapur.facts.founded.value"),
          },
          {
            label: t("destinations.bhaktapur.facts.population.label"),
            value: t("destinations.bhaktapur.facts.population.value"),
          },
          {
            label: t("destinations.bhaktapur.facts.temples.label"),
            value: t("destinations.bhaktapur.facts.temples.value"),
          },
          {
            label: t("destinations.bhaktapur.facts.courtyards.label"),
            value: t("destinations.bhaktapur.facts.courtyards.value"),
          },
        ],
      },
    ];
  };

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
            {t("destinations.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("destinations.subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getTranslatedDestinations().map((place, index) => (
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
                      count={`${place.tours} ${t(
                        "destinations.toursAvailable"
                      )}`}
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.9)",
                        color: "white",
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <EyeOutlined className="text-3xl mb-2" />
                      <p className="text-sm font-medium">
                        {t("destinations.clickToExplore")}
                      </p>
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
                <TabPane tab={t("destinations.modal.overview")} key="overview">
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
                              {t("destinations.modal.bestTimeToVisit")}
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
                              {t("destinations.modal.duration")}
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
                              {t("destinations.modal.difficultyLevel")}
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
                              {t("destinations.modal.priceRange")}
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
                        {t("destinations.modal.keyFacts")}
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
                <TabPane
                  tab={t("destinations.modal.activities")}
                  key="activities"
                >
                  <div className="space-y-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {t("destinations.modal.whatCanDo")}
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
                <TabPane
                  tab={t("destinations.modal.whatsIncluded")}
                  key="included"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center text-green-600">
                        <CheckCircleOutlined className="mr-2" />
                        {t("destinations.modal.includedInTour")}
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
                      <h4 className="font-semibold mb-4 flex items-center text-red-600">
                        <CloseOutlined className="mr-2" />
                        {t("destinations.modal.notIncluded")}
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
                      <h4 className="font-semibold mb-4 flex items-center text-blue-600">
                        <InfoCircleOutlined className="mr-2" />
                        {t("destinations.modal.whatToBring")}
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
                  {t("destinations.modal.findGuides")}
                </Button>
                <Button
                  size="large"
                  className="flex-1 h-12 font-semibold"
                  icon={<PhoneOutlined />}
                  onClick={() => navigate("/contact")}
                >
                  {t("destinations.modal.contactCustomTour")}
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
