import React, { useState } from "react";
import { Button, DatePicker, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { bookGuide } from "../../api/bookings";

const { TextArea } = Input;

const BookGuidePage: React.FC = () => {
  const { id } = useParams();
  const [date, setDate] = useState<string | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleDateChange = (_: any, dateString: string | string[]) => {
    if (typeof dateString === "string") {
      setDate(dateString);
    } else {
      setDate(dateString[0] || null);
    }
  };

  const handleSubmitBooking = async () => {
    if (!date || !messageText) {
      message.error("Please select a date and enter a message");
      return;
    }

    try {
      if (!id || !token) {
        message.error("Guide ID is missing");
        return;
      }
      await bookGuide(token, id, { date, message: messageText });
      message.success("Booking request sent to the guide");
      navigate("/dashboard/tourist");
    } catch (error) {
      message.error("Failed to book guide");
    }
  };

  return (
    <div className="book-guide-page">
      <h2>Book Guide</h2>
      <DatePicker onChange={handleDateChange} />
      <TextArea
        placeholder="Write a message to the guide"
        rows={4}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button type="primary" onClick={handleSubmitBooking}>
        Submit Booking
      </Button>
    </div>
  );
};

export default BookGuidePage;
