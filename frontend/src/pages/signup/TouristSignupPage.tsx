"use client";

import type React from "react";
import { useState } from "react";
import { Button, Form, Input, Typography, message, Card, Progress } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LeftOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signupTourist } from "../../api/auth";

const { Title, Text } = Typography;

const TouristSignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await signupTourist({
        ...values,
        role: "tourist",
      });
      message.success(t("auth.signupSuccess"));
      navigate("/login");
    } catch (error: any) {
      message.error(error?.response?.data?.message || t("auth.signupError"));
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    const fields = form.getFieldsValue();
    let filledFields = 0;
    const totalFields = 4;

    if (fields.name) filledFields++;
    if (fields.email) filledFields++;
    if (fields.phone) filledFields++;
    if (fields.password) filledFields++;

    setCurrentStep(Math.round((filledFields / totalFields) * 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Login Button */}
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate("/login")}
          className="mb-6 text-gray-600 hover:text-blue-600 flex items-center font-medium"
        >
          {t("auth.backToLogin")}
        </Button>

        {/* Main Signup Card */}
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/95">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <CameraOutlined className="text-2xl text-white" />
              </div>
            </div>
            <Title
              level={2}
              className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {t("auth.joinAsTourist")}
            </Title>
            <Text className="text-gray-600 text-base">
              {t("auth.startYourAdventure")}
            </Text>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <Text className="text-sm text-gray-600">
                {t("auth.completeProfile")}
              </Text>
              <Text className="text-sm text-blue-600 font-medium">
                {currentStep}%
              </Text>
            </div>
            <Progress
              percent={currentStep}
              strokeColor={{
                "0%": "#3b82f6",
                "100%": "#8b5cf6",
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
                {t("auth.personalInfo")}
              </Text>

              <Form.Item
                name="name"
                label={
                  <span className="text-gray-700 font-medium">
                    {t("auth.fullName")}
                  </span>
                }
                rules={[{ required: true, message: t("auth.pleaseEnterName") }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder={t("auth.enterFullName")}
                  className="rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 h-12"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={
                  <span className="text-gray-700 font-medium">
                    {t("auth.emailAddress")}
                  </span>
                }
                rules={[
                  { required: true, message: t("auth.pleaseEnterEmail") },
                  { type: "email", message: t("auth.validEmail") },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="tourist@example.com"
                  className="rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 h-12"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={
                  <span className="text-gray-700 font-medium">
                    {t("auth.phoneNumber")}
                  </span>
                }
                rules={[
                  { required: true, message: t("auth.pleaseEnterPhone") },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="98XXXXXXXX"
                  className="rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 h-12"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="text-gray-700 font-medium">
                    {t("auth.password")}
                  </span>
                }
                rules={[
                  { required: true, message: t("auth.pleaseEnterPassword") },
                  { min: 6, message: t("auth.passwordMinLength") },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder={t("auth.createPassword")}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 h-12"
                />
              </Form.Item>
            </div>

            {/* Submit Button */}
            <Form.Item className="mb-6 mt-8">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading
                  ? t("auth.creatingAccount")
                  : t("auth.createTouristAccount")}
              </Button>
            </Form.Item>
          </Form>

          {/* Login Link */}
          <div className="text-center pt-6 border-t border-gray-100">
            <Text className="text-gray-600">
              {t("auth.alreadyAccount")}{" "}
              <Button
                type="link"
                className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold"
                onClick={() => navigate("/login")}
              >
                {t("auth.loginHere")}
              </Button>
            </Text>
          </div>

          {/* Role Switch Option */}
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <Text className="text-sm text-gray-600 block text-center mb-3">
              {t("auth.becomeGuideInstead")}
            </Text>
            <Button
              className="w-full border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-400 rounded-lg font-medium transition-all duration-200"
              onClick={() => navigate("/signup/guide")}
            >
              {t("auth.signupAsGuide")}
            </Button>
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

export default TouristSignupPage;
