// src/components/TouristDashboard.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { getBookings, cancelBooking } from "../api/bookings";

const TouristDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      fetchBookings();
    } else {
      message.error("No valid token found");
    }
  }, [token]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      if (!token) {
        throw new Error("No valid token found");
      }
      const response = await getBookings(token);
      setBookings(response);
    } catch (error) {
      message.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (!token) {
      message.error("No valid token found");
      return;
    }
    try {
      setLoading(true);
      await cancelBooking(id, token);
      fetchBookings();
      message.success("Booking cancelled successfully!");
    } catch (error) {
      message.error("Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Guide Name",
      dataIndex: "guideName",
      key: "guideName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div>
          {record.status === "pending" && (
            <Button danger onClick={() => handleCancelBooking(record.id)}>
              Cancel Booking
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="tourist-dashboard">
      <h2>My Bookings</h2>
      <Table
        columns={columns}
        dataSource={bookings}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default TouristDashboard;
