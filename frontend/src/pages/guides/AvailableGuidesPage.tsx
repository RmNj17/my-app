"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  message,
  Input,
  Row,
  Col,
  Typography,
  Spin,
  Empty,
  Badge,
  Divider,
} from "antd";
import {
  SearchOutlined,
  LeftOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getGuides } from "../../api/guides";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface Guide {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string | null;
  guideLicense: string | null;
}

const AvailableGuidesPage: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.role;

  // Add this useEffect for role-based access control
  useEffect(() => {
    if (!token) {
      message.error("You must be logged in to view this page");
      navigate("/login");
      return;
    }

    if (userRole === "guide") {
      message.error("Guides cannot access this page");
      navigate("/");
      return;
    }
  }, [token, userRole, navigate]);

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    filterGuides();
  }, [guides, searchTerm]);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const response = await getGuides();
      setGuides(response);
    } catch (error) {
      message.error("Failed to load guides");
    } finally {
      setLoading(false);
    }
  };

  const filterGuides = () => {
    let filtered = [...guides];
    if (searchTerm) {
      filtered = filtered.filter((guide) =>
        guide.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredGuides(filtered);
  };

  const handleGuideAction = (guideId: string) => {
    if (userRole === "admin") {
      // Admin should view guide details or manage them
      message.info("Admin guide management coming soon!");
      return;
    }

    // For tourists, proceed with booking
    navigate(`/book-guide/${guideId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with better styling */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={() => navigate("/")}
            className="mb-4 text-blue-600 hover:text-blue-700"
          >
            Back to Home
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <Title level={2} className="mb-2 text-gray-800">
                {userRole === "admin" ? "Manage Guides" : "Available Guides"}
              </Title>
              <Text className="text-gray-600 text-base">
                {userRole === "admin"
                  ? "View and manage all registered guides"
                  : "Find and book your perfect Nepal guide"}
              </Text>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {filteredGuides.length}
              </div>
              <div className="text-sm text-gray-500">guides available</div>
            </div>
          </div>
        </div>

        {/* Enhanced Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-md">
            <Text className="block mb-3 font-medium text-gray-700">
              Search Guides
            </Text>
            <Input
              placeholder="Search by guide name..."
              prefix={<SearchOutlined className="text-blue-500" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="large"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Enhanced Guides Grid */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Spin size="large" />
            <Text className="block mt-4 text-gray-600">Loading guides...</Text>
          </div>
        ) : filteredGuides.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Empty description="No guides found" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {filteredGuides.map((guide) => (
              <Col xs={24} sm={12} lg={8} key={guide.id}>
                <Card
                  className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border-0"
                  bodyStyle={{ padding: "24px" }}
                >
                  {/* Guide Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <UserOutlined className="text-blue-600 text-lg" />
                      </div>
                      <div>
                        <Title level={4} className="mb-1 text-gray-800">
                          {guide.name}
                        </Title>
                        {guide.guideLicense && (
                          <Badge
                            count="Certified"
                            style={{
                              backgroundColor: "#f0f9ff",
                              color: "#0369a1",
                              border: "1px solid #bae6fd",
                              fontSize: "11px",
                            }}
                          />
                        )}
                      </div>
                    </div>
                    {guide.guideLicense && (
                      <SafetyCertificateOutlined className="text-green-500 text-xl" />
                    )}
                  </div>

                  <Divider className="my-4" />

                  {/* Contact Information */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <MailOutlined className="text-gray-400 mr-3 w-4" />
                      <Text className="text-gray-600 text-sm">
                        {guide.email}
                      </Text>
                    </div>
                    <div className="flex items-center">
                      <PhoneOutlined className="text-gray-400 mr-3 w-4" />
                      <Text className="text-gray-600 text-sm">
                        {guide.phone}
                      </Text>
                    </div>
                  </div>

                  {/* Book/Manage Button */}
                  <Button
                    type="primary"
                    block
                    size="large"
                    onClick={() => handleGuideAction(guide.id)}
                    className={`${
                      userRole === "admin"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } border-none font-medium rounded-lg`}
                  >
                    {userRole === "admin" ? "Manage Guide" : "Book This Guide"}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default AvailableGuidesPage;
