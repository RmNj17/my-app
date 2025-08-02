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
  Avatar,
  Tag,
  Modal,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  HomeOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  MailOutlined,
  PhoneOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getPendingGuides, verifyGuide } from "../api/admin";

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Guide {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  verificationStatus: string;
  profilePicture?: string;
  guideLicense?: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [pendingGuides, setPendingGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      fetchPendingGuides(token);
    } else {
      message.error("No valid token found");
      navigate("/login");
    }
  }, [token]);

  const fetchPendingGuides = async (validToken: string) => {
    try {
      setLoading(true);
      const response = await getPendingGuides(validToken);
      setPendingGuides(response);
    } catch (error) {
      message.error("Failed to load pending guides");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyGuide = async (
    id: string,
    status: string,
    guideName: string
  ) => {
    if (!token) {
      message.error("No valid token found");
      return;
    }

    const actionText = status === "verified" ? "approve" : "reject";
    const actionColor = status === "verified" ? "green" : "red";

    confirm({
      title: `${
        actionText.charAt(0).toUpperCase() + actionText.slice(1)
      } Guide`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>
            Are you sure you want to {actionText} <strong>{guideName}</strong>?
          </p>
          {status === "rejected" && (
            <p className="text-red-600 text-sm mt-2">
              This action will permanently reject their guide application.
            </p>
          )}
        </div>
      ),
      okText: actionText.charAt(0).toUpperCase() + actionText.slice(1),
      okButtonProps: {
        style: {
          backgroundColor: actionColor === "green" ? "#10b981" : "#ef4444",
          borderColor: actionColor === "green" ? "#10b981" : "#ef4444",
        },
      },
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setLoading(true);
          await verifyGuide(id, status, token);
          await fetchPendingGuides(token);
          message.success(`Guide ${status} successfully!`);
        } catch (error) {
          message.error("Failed to update guide status");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const showGuideDetails = (guide: Guide) => {
    setSelectedGuide(guide);
    setIsModalVisible(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
        return "red";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Guide Information",
      key: "guide",
      render: (_: any, record: Guide) => (
        <div className="flex items-center">
          <Avatar
            size={48}
            src={record.profilePicture}
            className="mr-4 bg-blue-100 text-blue-600"
            icon={<UserOutlined />}
          />
          <div>
            <div className="font-semibold text-gray-800 text-base">
              {record.name}
            </div>
            <div className="text-sm text-gray-600">{record.email}</div>
            <div className="text-xs text-gray-500">{record.phone}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Application Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <div className="text-gray-700">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "verificationStatus",
      key: "status",
      render: (status: string) => (
        <Badge
          color={getStatusColor(status)}
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
    },
    {
      title: "License",
      key: "license",
      render: (_: any, record: Guide) => (
        <div className="text-center">
          {record.guideLicense ? (
            <Tag color="green" icon={<SafetyCertificateOutlined />}>
              Uploaded
            </Tag>
          ) : (
            <Tag color="red" icon={<CloseOutlined />}>
              Missing
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Guide) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showGuideDetails(record)}
            className="rounded-lg"
          >
            View
          </Button>
          {record.verificationStatus === "pending" && (
            <>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() =>
                  handleVerifyGuide(record.id, "verified", record.name)
                }
                className="bg-green-600 hover:bg-green-700 border-green-600 rounded-lg"
              >
                Approve
              </Button>
              <Button
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={() =>
                  handleVerifyGuide(record.id, "rejected", record.name)
                }
                className="rounded-lg"
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const stats = [
    {
      title: "Total Applications",
      value: pendingGuides.length,
      color: "blue",
    },
    {
      title: "Pending Review",
      value: pendingGuides.filter((g) => g.verificationStatus === "pending")
        .length,
      color: "orange",
    },
    {
      title: "Verified Guides",
      value: pendingGuides.filter((g) => g.verificationStatus === "verified")
        .length,
      color: "green",
    },
    {
      title: "Rejected",
      value: pendingGuides.filter((g) => g.verificationStatus === "rejected")
        .length,
      color: "red",
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
                Admin Dashboard
              </Title>
              <Text className="text-gray-600">
                Manage guide applications and verifications
              </Text>
            </div>
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Back to Home
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

        {/* Pending Applications Alert */}
        {pendingGuides.filter((g) => g.verificationStatus === "pending")
          .length > 0 && (
          <Card className="mb-8 border-l-4 border-l-orange-500 bg-orange-50 shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <ExclamationCircleOutlined className="text-orange-600 text-lg" />
              </div>
              <div>
                <Title level={5} className="mb-1 text-orange-800">
                  {
                    pendingGuides.filter(
                      (g) => g.verificationStatus === "pending"
                    ).length
                  }{" "}
                  guide application(s) awaiting review
                </Title>
                <Text className="text-orange-700">
                  Review and approve qualified guides to expand your network
                </Text>
              </div>
            </div>
          </Card>
        )}

        {/* Guides Table */}
        <Card className="shadow-md border-0">
          <div className="mb-6">
            <Title level={4} className="text-gray-800">
              Guide Applications
            </Title>
            <Text className="text-gray-600">
              Review and manage all guide verification requests
            </Text>
          </div>

          <Divider />

          <Table
            columns={columns}
            dataSource={pendingGuides}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} applications`,
            }}
            className="rounded-lg"
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* Empty State */}
        {pendingGuides.length === 0 && !loading && (
          <Card className="text-center shadow-md border-0 mt-8 p-8">
            <div className="text-gray-400 mb-4">
              <SafetyCertificateOutlined style={{ fontSize: "48px" }} />
            </div>
            <Title level={4} className="text-gray-600 mb-4">
              No guide applications found
            </Title>
            <Text className="text-gray-500 mb-6 block">
              When guides submit their applications, they will appear here for
              review
            </Text>
          </Card>
        )}
      </div>

      {/* Guide Details Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <Avatar
              size={40}
              src={selectedGuide?.profilePicture}
              className="mr-3 bg-blue-100 text-blue-600"
              icon={<UserOutlined />}
            />
            <div>
              <div className="font-semibold text-lg">{selectedGuide?.name}</div>
              <Badge
                color={getStatusColor(selectedGuide?.verificationStatus || "")}
                text={
                  (selectedGuide?.verificationStatus
                    ? selectedGuide.verificationStatus.charAt(0).toUpperCase() +
                      selectedGuide.verificationStatus.slice(1)
                    : "")
                }
              />
            </div>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          selectedGuide?.verificationStatus === "pending" ? (
            <div className="flex justify-end space-x-3">
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => {
                  if (selectedGuide) {
                    handleVerifyGuide(
                      selectedGuide.id,
                      "rejected",
                      selectedGuide.name
                    );
                    setIsModalVisible(false);
                  }
                }}
              >
                Reject
              </Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                className="bg-green-600 hover:bg-green-700 border-green-600"
                onClick={() => {
                  if (selectedGuide) {
                    handleVerifyGuide(
                      selectedGuide.id,
                      "verified",
                      selectedGuide.name
                    );
                    setIsModalVisible(false);
                  }
                }}
              >
                Approve
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsModalVisible(false)}>Close</Button>
          )
        }
        width={600}
      >
        {selectedGuide && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MailOutlined className="text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600 text-sm">
                      {selectedGuide.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneOutlined className="text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600 text-sm">
                      {selectedGuide.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SafetyCertificateOutlined className="text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Guide License</p>
                    <p className="text-gray-600 text-sm">
                      {selectedGuide.guideLicense
                        ? "Document uploaded"
                        : "No document"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileTextOutlined className="text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Application Date
                    </p>
                    <p className="text-gray-600 text-sm">
                      {new Date(selectedGuide.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {selectedGuide.guideLicense && (
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-900 mb-3">
                  Guide License Document
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileTextOutlined className="text-blue-600 mr-2" />
                      <span className="text-sm text-gray-700">
                        License Document
                      </span>
                    </div>
                    <Button
                      size="small"
                      type="link"
                      onClick={() =>
                        window.open(selectedGuide.guideLicense, "_blank")
                      }
                    >
                      View Document
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
