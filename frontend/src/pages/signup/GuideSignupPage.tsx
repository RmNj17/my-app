"use client";

import type React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Upload,
  message,
  Card,
  Progress,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LeftOutlined,
  CompassOutlined,
  CameraOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signupGuide } from "../../api/auth";

const { Title, Text } = Typography;

const GuideSignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("role", "guide");

      const guideLicenseFile = values.guideLicense?.[0]?.originFileObj;
      if (guideLicenseFile) {
        formData.append("guideLicense", guideLicenseFile);
      }

      const profilePictureFile = values.profilePicture?.[0]?.originFileObj;
      if (profilePictureFile) {
        formData.append("profilePicture", profilePictureFile);
      }

      await signupGuide(formData);
      message.success("Guide account created successfully! Please login.");
      navigate("/login");
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    const fields = form.getFieldsValue();
    let filledFields = 0;
    const totalFields = 6;

    if (fields.name) filledFields++;
    if (fields.email) filledFields++;
    if (fields.phone) filledFields++;
    if (fields.password) filledFields++;
    if (fields.guideLicense?.length > 0) filledFields++;
    if (fields.profilePicture?.length > 0) filledFields++;

    setCurrentStep(Math.round((filledFields / totalFields) * 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-50 to-blue-50 rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Back to Login Button */}
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate("/login")}
          className="mb-6 text-gray-600 hover:text-green-600 flex items-center font-medium"
        >
          Back to Login
        </Button>

        {/* Main Signup Card */}
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/95">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                <CompassOutlined className="text-2xl text-white" />
              </div>
            </div>
            <Title
              level={2}
              className="mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            >
              Become a Guide
            </Title>
            <Text className="text-gray-600 text-base">
              Join our community of expert Nepal guides
            </Text>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <Text className="text-sm text-gray-600">
                Complete your profile
              </Text>
              <Text className="text-sm text-green-600 font-medium">
                {currentStep}%
              </Text>
            </div>
            <Progress
              percent={currentStep}
              strokeColor={{
                "0%": "#10b981",
                "100%": "#3b82f6",
              }}
              showInfo={false}
              className="mb-4"
            />
          </div>

          {/* Signup Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onValuesChange={handleFormChange}
            size="large"
            className="space-y-4"
          >
            {/* Personal Information Section */}
            <div className="mb-6">
              <Text className="text-gray-700 font-semibold text-base block mb-4">
                Personal Information
              </Text>

              <Form.Item
                name="name"
                label={
                  <span className="text-gray-700 font-medium">Full Name</span>
                }
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter your full name"
                  className="rounded-lg border-gray-200 hover:border-green-400 focus:border-green-500 h-12"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={
                  <span className="text-gray-700 font-medium">
                    Email Address
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="email@example.com"
                  className="rounded-lg border-gray-200 hover:border-green-400 focus:border-green-500 h-12"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={
                  <span className="text-gray-700 font-medium">
                    Phone Number
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="98XXXXXXXX"
                  className="rounded-lg border-gray-200 hover:border-green-400 focus:border-green-500 h-12"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="text-gray-700 font-medium">Password</span>
                }
                rules={[
                  { required: true, message: "Please enter a password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Create a strong password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="rounded-lg border-gray-200 hover:border-green-400 focus:border-green-500 h-12"
                />
              </Form.Item>
            </div>

            {/* Documents Section */}
            <div className="mb-6">
              <Text className="text-gray-700 font-semibold text-base block mb-4">
                Required Documents
              </Text>

              <Form.Item
                name="guideLicense"
                label={
                  <span className="text-gray-700 font-medium">
                    Guide License *
                  </span>
                }
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  return Array.isArray(e) ? e : e?.fileList;
                }}
                rules={[
                  {
                    required: true,
                    message: "Please upload your guide license",
                  },
                ]}
              >
                <Upload.Dragger
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="rounded-lg border-2 border-dashed border-gray-200 hover:border-green-400 bg-gray-50 hover:bg-green-50 transition-all duration-200"
                >
                  <p className="ant-upload-drag-icon">
                    <FileTextOutlined className="text-3xl text-green-600" />
                  </p>
                  <p className="ant-upload-text text-gray-700 font-medium">
                    Upload Guide License
                  </p>
                  <p className="ant-upload-hint text-gray-500">
                    Click or drag your license document here (PDF, JPG, PNG)
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item
                name="profilePicture"
                label={
                  <span className="text-gray-700 font-medium">
                    Profile Picture (Optional)
                  </span>
                }
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  return Array.isArray(e) ? e : e?.fileList;
                }}
              >
                <Upload.Dragger
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".jpg,.jpeg,.png"
                  className="rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 transition-all duration-200"
                >
                  <p className="ant-upload-drag-icon">
                    <CameraOutlined className="text-3xl text-blue-600" />
                  </p>
                  <p className="ant-upload-text text-gray-700 font-medium">
                    Upload Profile Picture
                  </p>
                  <p className="ant-upload-hint text-gray-500">
                    Click or drag your photo here (JPG, PNG)
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </div>

            {/* Submit Button */}
            <Form.Item className="mb-6 mt-8">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 border-none rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Guide Account"}
              </Button>
            </Form.Item>
          </Form>

          {/* Login Link */}
          <div className="text-center pt-6 border-t border-gray-100">
            <Text className="text-gray-600">
              Already have an account?{" "}
              <Button
                type="link"
                className="text-green-600 hover:text-green-700 p-0 h-auto font-semibold"
                onClick={() => navigate("/login")}
              >
                Login here
              </Button>
            </Text>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <Text className="text-gray-500 text-sm">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </Text>
        </div>
      </div>
    </div>
  );
};

export default GuideSignupPage;
