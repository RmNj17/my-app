"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Input,
  message,
  Card,
  Typography,
  Divider,
  Spin,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  LeftOutlined,
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { bookGuide } from "../../api/bookings";
import { getGuides } from "../../api/guides";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const { Title, Text } = Typography;

interface Guide {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string | null;
  guideLicense: string | null;
}

const BookGuidePage: React.FC = () => {
  const { id } = useParams();
  const [date, setDate] = useState<string | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchGuideDetails();
  }, [id]);

  const fetchGuideDetails = async () => {
    try {
      setLoading(true);
      const guides = await getGuides();
      const selectedGuide = guides.find((g: Guide) => g.id === id);
      setGuide(selectedGuide || null);
    } catch (error) {
      message.error(
        t("pages.bookGuide.errorLoadingGuide", "Failed to load guide details")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (_: any, dateString: string | string[]) => {
    if (typeof dateString === "string") {
      setDate(dateString);
    } else {
      setDate(dateString[0] || null);
    }
  };

  const handleSubmitBooking = async () => {
    if (!date || !messageText.trim()) {
      message.error(
        t(
          "pages.bookGuide.dateAndMessageRequired",
          "Please select a date and enter a message"
        )
      );
      return;
    }

    try {
      setSubmitting(true);
      if (!id || !token) {
        message.error(
          t("pages.bookGuide.guideIdMissing", "Guide ID is missing")
        );
        return;
      }
      await bookGuide(token, id, { date, message: messageText });
      message.success(
        t(
          "pages.bookGuide.bookingSuccess",
          "Booking request sent successfully!"
        )
      );
      navigate("/dashboard/tourist");
    } catch (error) {
      message.error(
        t("pages.bookGuide.bookingError", "Failed to send booking request")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" />
          <Text className="block mt-4 text-gray-600">
            {t("pages.bookGuide.loadingGuide", "Loading guide details...")}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={() => navigate("/guides")}
            className="mb-4 text-blue-600 hover:text-blue-700"
          >
            {t("navigation.backToGuides", "Back to Guides")}
          </Button>
          <Title level={2} className="mb-2 text-gray-800">
            {t("pages.bookGuide.title", "Book Your Guide")}
          </Title>
          <Text className="text-gray-600">
            {t(
              "pages.bookGuide.subtitle",
              "Send a booking request with your preferred date and message"
            )}
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Guide Information */}
          <div>
            <Card className="shadow-md border-0 mb-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserOutlined className="text-blue-600 text-2xl" />
                </div>
                <Title level={3} className="mb-2 text-gray-800">
                  {guide?.name || "Guide"}
                </Title>
                {guide?.guideLicense && (
                  <div className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    <SafetyCertificateOutlined className="mr-1" />
                    {t("guides.certifiedGuide", "Certified Guide")}
                  </div>
                )}
              </div>

              <Divider />

              <div className="space-y-4">
                <div className="flex items-center">
                  <MailOutlined className="text-gray-400 mr-3 w-4" />
                  <Text className="text-gray-600">{guide?.email}</Text>
                </div>
                <div className="flex items-center">
                  <PhoneOutlined className="text-gray-400 mr-3 w-4" />
                  <Text className="text-gray-600">{guide?.phone}</Text>
                </div>
              </div>
            </Card>

            {/* Booking Tips */}
            <Card className="shadow-md border-0 bg-blue-50">
              <Title level={4} className="text-blue-800 mb-3">
                {t("pages.bookGuide.bookingTips", "Booking Tips")}
              </Title>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>
                  •{" "}
                  {t("pages.bookGuide.tip1", "Select your preferred tour date")}
                </li>
                <li>
                  •{" "}
                  {t(
                    "pages.bookGuide.tip2",
                    "Include details about your interests and experience level"
                  )}
                </li>
                <li>
                  •{" "}
                  {t(
                    "pages.bookGuide.tip3",
                    "Mention group size and any special requirements"
                  )}
                </li>
                <li>
                  •{" "}
                  {t(
                    "pages.bookGuide.tip4",
                    "The guide will respond within 24 hours"
                  )}
                </li>
              </ul>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card className="shadow-md border-0">
              <Title level={4} className="mb-6 text-gray-800">
                {t("pages.bookGuide.bookingDetails", "Booking Details")}
              </Title>

              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Text className="block mb-3 font-medium text-gray-700">
                    <CalendarOutlined className="mr-2 text-blue-600" />
                    {t("pages.bookGuide.preferredDate", "Preferred Tour Date")}
                  </Text>
                  <DatePicker
                    onChange={handleDateChange}
                    size="large"
                    className="w-full rounded-lg"
                    placeholder={t(
                      "pages.bookGuide.selectDate",
                      "Select your preferred date"
                    )}
                    disabledDate={(current) =>
                      current && current.valueOf() < Date.now() - 86400000
                    }
                  />
                </div>

                {/* Message */}
                <div>
                  <Text className="block mb-3 font-medium text-gray-700">
                    <MessageOutlined className="mr-2 text-blue-600" />
                    {t("pages.bookGuide.messageToGuide", "Message to Guide")}
                  </Text>
                  <TextArea
                    placeholder={t(
                      "pages.bookGuide.messagePlaceholder",
                      "Tell the guide about your tour preferences, group size, experience level, and any special requirements..."
                    )}
                    rows={6}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="rounded-lg"
                    showCount
                    maxLength={500}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleSubmitBooking}
                    loading={submitting}
                    className="bg-blue-600 hover:bg-blue-700 border-none font-medium rounded-lg h-12"
                    disabled={!date || !messageText.trim()}
                  >
                    {submitting
                      ? t("pages.bookGuide.sending", "Sending Request...")
                      : t(
                          "pages.bookGuide.sendRequest",
                          "Send Booking Request"
                        )}
                  </Button>
                  <Text className="block text-center mt-3 text-gray-500 text-sm">
                    {t(
                      "pages.bookGuide.requestInfo",
                      "Your request will be sent directly to the guide"
                    )}
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookGuidePage;
