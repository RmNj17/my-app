import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../features/auth/authSlice";
import { login } from "../../api/auth";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

      message.success("Login successful!");

      // Redirect based on role
      if (user.role === "guide") {
        navigate("/dashboard/guide");
      } else {
        navigate("/dashboard/tourist");
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
        <Title level={3} className="text-center mb-6">
          Login
        </Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup/tourist")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
