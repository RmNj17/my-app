import React, { useState } from "react";
import { Button, Form, Input, Typography, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signupGuide } from "../../api/auth";

const { Title } = Typography;

const GuideSignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      message.success("Guide account created. Please login.");
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
          Guide Sign Up
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>

          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input placeholder="98XXXXXXXX" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item
            name="guideLicense"
            label="Guide License"
            valuePropName="file"
            getValueFromEvent={(e) => {
              return Array.isArray(e) ? e : e?.fileList;
            }}
            rules={[
              { required: true, message: "Please upload your guide license" },
            ]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload License</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="profilePicture"
            label="Profile Picture"
            valuePropName="file"
            getValueFromEvent={(e) => {
              return Array.isArray(e) ? e : e?.fileList;
            }}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Picture</Button>
            </Upload>
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

export default GuideSignupPage;
