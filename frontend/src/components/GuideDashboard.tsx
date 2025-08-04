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
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getBookings, updateBookingStatus } from "../api/bookings";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface Booking {
  id: string;
  touristName: string;
  date: string;
  message: string;
  status: string;
}

const GuideDashboard: React.FC = () => {
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
    if (!token) {
      message.error(t("dashboard.common.noValidToken"));
      return;
    }
    try {
      setLoading(true);
      const response = await getBookings(token);
      setBookings(response);
    } catch (error) {
      message.error(t("dashboard.failedToLoadBookings"));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    if (!token) {
      message.error(t("dashboard.noValidToken"));
      return;
    }
    try {
      setLoading(true);
      await updateBookingStatus(id, status, token);
      await fetchBookings();
      message.success(t("dashboard.bookingStatusUpdated", { status }));
    } catch (error) {
      message.error(t("dashboard.failedToUpdateStatus"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
      case "confirmed":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
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
      title: t("dashboard.tourist"),
      dataIndex: "touristName",
      key: "touristName",
      render: (name: string) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <UserOutlined className="text-green-600" />
          </div>
          <Text strong className="text-gray-800">
            {name}
          </Text>
        </div>
      ),
    },
    {
      title: t("dashboard.tourDate"),
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
      title: t("dashboard.message"),
      dataIndex: "message",
      key: "message",
      render: (message: string) => (
        <div className="flex items-start">
          <MessageOutlined className="text-gray-400 mr-2 mt-1" />
          <Text className="text-gray-700" style={{ maxWidth: "250px" }}>
            {message.length > 60 ? `${message.substring(0, 60)}...` : message}
          </Text>
        </div>
      ),
    },
    {
      title: t("dashboard.status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge color={getStatusColor(status)} text={getStatusText(status)} />
      ),
    },
    {
      title: t("dashboard.actions"),
      key: "action",
      render: (_: any, record: Booking) => (
        <Space>
          {record.status === "pending" && (
            <>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleStatusChange(record.id, "accepted")}
                className="bg-green-600 hover:bg-green-700 border-green-600 rounded-lg"
              >
                {t("dashboard.accept")}
              </Button>
              <Button
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={() => handleStatusChange(record.id, "rejected")}
                className="rounded-lg"
              >
                {t("dashboard.reject")}
              </Button>
            </>
          )}
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => message.info(t("dashboard.viewDetailsComingSoon"))}
            className="rounded-lg"
          >
            {t("dashboard.view")}
          </Button>
        </Space>
      ),
    },
  ];

  const stats = [
    {
      title: t("dashboard.totalRequests"),
      value: bookings.length,
      color: "blue",
    },
    {
      title: t("dashboard.pending"),
      value: bookings.filter((b) => b.status === "pending").length,
      color: "orange",
    },
    {
      title: t("dashboard.accepted"),
      value: bookings.filter((b) => b.status === "accepted").length,
      color: "green",
    },
    {
      title: t("dashboard.completed"),
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
                {t("dashboard.guideDashboard")}
              </Title>
              <Text className="text-gray-600">
                {t("dashboard.manageTourRequests")}
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

        {/* Pending Requests Alert */}
        {bookings.filter((b) => b.status === "pending").length > 0 && (
          <Card className="mb-8 border-l-4 border-l-orange-500 bg-orange-50 shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <CalendarOutlined className="text-orange-600 text-lg" />
              </div>
              <div>
                <Title level={5} className="mb-1 text-orange-800">
                  {t("dashboard.pendingRequestAlert", {
                    count: bookings.filter((b) => b.status === "pending")
                      .length,
                  })}
                </Title>
                <Text className="text-orange-700">
                  {t("dashboard.reviewRespond")}
                </Text>
              </div>
            </div>
          </Card>
        )}

        {/* Bookings Table */}
        <Card className="shadow-md border-0">
          <div className="mb-6">
            <Title level={4} className="text-gray-800">
              {t("dashboard.bookingRequests")}
            </Title>
            <Text className="text-gray-600">
              {t("dashboard.viewManageRequests")}
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
                `${range[0]}-${range[1]} ${t("dashboard.of")} ${total} ${t(
                  "dashboard.requests"
                )}`,
            }}
            className="rounded-lg"
            scroll={{ x: 900 }}
          />
        </Card>

        {/* Empty State */}
        {bookings.length === 0 && !loading && (
          <Card className="text-center shadow-md border-0 mt-8 p-8">
            <div className="text-gray-400 mb-4">
              <CalendarOutlined style={{ fontSize: "48px" }} />
            </div>
            <Title level={4} className="text-gray-600 mb-4">
              {t("dashboard.noRequestsYet")}
            </Title>
            <Text className="text-gray-500 mb-6 block">
              {t("dashboard.whenTouristsBook")}
            </Text>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {t("navigation.backToHome")}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GuideDashboard;
