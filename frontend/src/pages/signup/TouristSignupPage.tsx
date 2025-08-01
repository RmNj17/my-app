import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { signupTourist } from "../../api/auth";

const { Title } = Typography;

const TouristSignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await signupTourist({
        ...values,
        role: "tourist",
      });

      message.success("Account created! Please login.");
      navigate("/login");
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Title level={3} className="text-center mb-6">
          Tourist Sign Up
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="tourist@example.com" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input placeholder="98XXXXXXXX" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
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
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center text-sm mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TouristSignupPage;
