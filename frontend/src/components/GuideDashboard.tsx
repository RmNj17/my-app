import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { getBookings, updateBookingStatus } from "../api/bookings";

const GuideDashboard: React.FC = () => {
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
    if (!token) {
      message.error("No valid token found");
      return;
    }
    try {
      setLoading(true);
      const response = await getBookings(token);
      setBookings(response);
    } catch (error) {
      message.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    if (!token) {
      message.error("No valid token found");
      return;
    }
    try {
      setLoading(true);
      await updateBookingStatus(id, status, token);
      fetchBookings();
      message.success(`Booking ${status} successfully!`);
    } catch (error) {
      message.error("Failed to update booking status");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Tourist Name",
      dataIndex: "touristName",
      key: "touristName",
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
            <>
              <Button
                type="primary"
                onClick={() => handleStatusChange(record.id, "accepted")}
                style={{ marginRight: 8 }}
              >
                Accept
              </Button>
              <Button
                danger
                onClick={() => handleStatusChange(record.id, "rejected")}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="guide-dashboard">
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

export default GuideDashboard;
