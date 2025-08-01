import React, { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getGuides } from "../../api/guides";

const AvailableGuidesPage: React.FC = () => {
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const response = await getGuides();
      setGuides(response);
    } catch (error) {
      message.error("Failed to load guides");
    } finally {
      setLoading(false);
    }
  };

  const handleBookGuide = (guideId: string) => {
    if (!token) {
      message.error("You must be logged in to book a guide");
      navigate("/login");
    }
    if (token) {
      navigate(`/book-guide/${guideId}`);
    }
  };

  return (
    <div className="guides-list">
      <h2>Available Guides</h2>
      <div className="guides-grid">
        {guides.map((guide) => (
          <Card
            key={guide.id}
            title={guide.name}
            cover={
              <img
                src={guide.profilePicture || "default-image.jpg"}
                alt="Profile"
              />
            }
          >
            <p>Email: {guide.email}</p>
            <p>Phone: {guide.phone}</p>
            <Button onClick={() => handleBookGuide(guide.id)}>
              Book this guide
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableGuidesPage;
