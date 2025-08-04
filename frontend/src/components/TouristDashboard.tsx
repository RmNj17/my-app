"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Card,
  Typography,
  Badge,
  Space,
  Divider,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  MessageOutlined,
  DeleteOutlined,
  EyeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getBookings, cancelBooking } from "../api/bookings";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface Booking {
  id: string;
  guideName: string;
  date: string;
  message: string;
  status: string;
}

const TouristDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      fetchBookings();
    } else {
      message.error(t("dashboard.common.noValidToken"));
      navigate("/login");
    }
  }, [token]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      if (!token) {
        throw new Error("No valid token found");
      }
      const response = await getBookings(token);
      setBookings(response);
    } catch (error) {
      message.error(t("dashboard.common.failedToLoadBookings"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (!token) {
      message.error(t("dashboard.common.noValidToken"));
      return;
    }
    try {
      setLoading(true);
      await cancelBooking(id, token);
      await fetchBookings();
      message.success(t("dashboard.common.bookingCancelledSuccess"));
    } catch (error) {
      message.error(t("dashboard.common.failedToCancelBooking"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "green";
      case "pending":
        return "orange";
      case "cancelled":
        return "red";
      case "completed":
        return "blue";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const columns = [
    {
      title: t("guides.guide"),
      dataIndex: "guideName",
      key: "guideName",
      render: (name: string) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <UserOutlined className="text-blue-600" />
          </div>
          <Text strong className="text-gray-800">
            {name}
          </Text>
        </div>
      ),
    },
    {
      title: t("dashboard.common.tourDate"),
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <div className="flex items-center">
          <CalendarOutlined className="text-gray-400 mr-2" />
          <Text className="text-gray-700">
            {new Date(date).toLocaleDateString()}
          </Text>
        </div>
      ),
    },
    {
      title: t("dashboard.common.message"),
      dataIndex: "message",
      key: "message",
      render: (message: string) => (
        <div className="flex items-start">
          <MessageOutlined className="text-gray-400 mr-2 mt-1" />
          <Text className="text-gray-700" style={{ maxWidth: "200px" }}>
            {message.length > 50 ? `${message.substring(0, 50)}...` : message}
          </Text>
        </div>
      ),
    },
    {
      title: t("dashboard.common.status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge color={getStatusColor(status)} text={getStatusText(status)} />
      ),
    },
    {
      title: t("dashboard.common.actions"),
      key: "action",
      render: (_: any, record: Booking) => (
        <Space>
          {record.status === "pending" && (
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleCancelBooking(record.id)}
              className="rounded-lg"
            >
              {t("dashboard.common.cancel")}
            </Button>
          )}
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() =>
              message.info(t("dashboard.common.viewDetailsComingSoon"))
            }
            className="rounded-lg"
          >
            {t("dashboard.common.view")}
          </Button>
        </Space>
      ),
    },
  ];

  const stats = [
    {
      title: t("dashboard.common.totalBookings"),
      value: bookings.length,
      color: "blue",
    },
    {
      title: t("dashboard.common.pending"),
      value: bookings.filter((b) => b.status === "pending").length,
      color: "orange",
    },
    {
      title: t("dashboard.common.confirmed"),
      value: bookings.filter((b) => b.status === "confirmed").length,
      color: "green",
    },
    {
      title: t("dashboard.common.completed"),
      value: bookings.filter((b) => b.status === "completed").length,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Title level={2} className="mb-2 text-gray-800">
                {t("dashboard.common.myBookings")}
              </Title>
              <Text className="text-gray-600">
                {t("dashboard.common.manageNepalBookings")}
              </Text>
            </div>
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {t("navigation.backToHome")}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-md border-0">
              <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                {stat.value}
              </div>
              <Text className="text-gray-600 text-sm">{stat.title}</Text>
            </Card>
          ))}
        </div>

        {/* Bookings Table */}
        <Card className="shadow-md border-0">
          <div className="mb-6">
            <Title level={4} className="text-gray-800">
              {t("dashboard.common.bookingHistory")}
            </Title>
            <Text className="text-gray-600">
              {t("dashboard.common.viewManageBookings")}
            </Text>
          </div>

          <Divider />

          <Table
            columns={columns}
            dataSource={bookings}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} ${t(
                  "dashboard.common.of"
                )} ${total} ${t("dashboard.common.bookings")}`,
            }}
            className="rounded-lg"
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Quick Actions */}
        {bookings.length === 0 && !loading && (
          <Card className="text-center shadow-md border-0 mt-8 p-8">
            <div className="text-gray-400 mb-4">
              <CalendarOutlined style={{ fontSize: "48px" }} />
            </div>
            <Title level={4} className="text-gray-600 mb-4">
              {t("dashboard.common.noBookingsYet")}
            </Title>
            <Text className="text-gray-500 mb-6 block">
              {t("dashboard.common.startNepalAdventure")}
            </Text>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/guides")}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {t("dashboard.common.browseGuides")}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TouristDashboard;
