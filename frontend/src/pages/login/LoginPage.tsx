"use client";

import type React from "react";
import { useState } from "react";
import { Button, Form, Input, Typography, message, Card } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LeftOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import { loginSuccess } from "../../features/auth/authSlice";
import { login } from "../../api/auth";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../components/LanguageSelector";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await login(values);
      const { access_token, user } = res.data;

      // Store in localStorage
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch to Redux
      dispatch(loginSuccess({ token: access_token, user }));

      message.success(t("auth.loginSuccess"));

      // Redirect based on role
      if (user.role === "guide") {
        navigate("/dashboard/guide");
      }
      if (user.role === "tourist") {
        navigate("/dashboard/tourist");
      }
      if (user.role === "admin") {
        navigate("/dashboard/admin");
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || t("auth.loginError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full opacity-30"></div>
      </div>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Button */}
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate("/")}
          className="mb-6 text-gray-600 hover:text-blue-600 flex items-center font-medium"
        >
          {t("navigation.backToHome")}
        </Button>

        {/* Main Login Card */}
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/95">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <span className="text-2xl">🚩</span>
              </div>
            </div>
            <Title
              level={2}
              className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {t("auth.login")}
            </Title>
            <Text className="text-gray-600 text-base">
              {t("auth.signInContinue")}
            </Text>
          </div>

          {/* Login Form */}
          <Form
            layout="vertical"
            onFinish={handleLogin}
            size="large"
            className="space-y-4"
          >
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  {t("auth.email")}
                </span>
              }
              name="email"
              rules={[
                { required: true, message: t("auth.emailRequired") },
                { type: "email", message: t("auth.emailInvalid") },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder={t("auth.emailPlaceholder")}
                className="rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 h-12"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  {t("auth.password")}
                </span>
              }
              name="password"
              rules={[{ required: true, message: t("auth.passwordRequired") }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={t("auth.passwordPlaceholder")}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 h-12"
              />
            </Form.Item>

            {/* Login Button */}
            <Form.Item className="mb-6 mt-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? t("auth.signingIn") : t("auth.login")}
              </Button>
            </Form.Item>
          </Form>

          {/* Create Account Section */}
          <div className="pt-6 border-t border-gray-100">
            <div className="text-center mb-4">
              <Text className="text-gray-600">{t("auth.noAccount")}</Text>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-11 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                icon={<UserOutlined />}
                onClick={() => navigate("/signup/tourist")}
              >
                {t("auth.asTourist")}
              </Button>
              <Button
                className="h-11 border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-400 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                icon={<CompassOutlined />}
                onClick={() => navigate("/signup/guide")}
              >
                {t("auth.asGuide")}
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <Text className="text-gray-500 text-sm">{t("auth.agreeTerms")}</Text>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
