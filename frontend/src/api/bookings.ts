import api from "./axios";

export const getBookings = async (token: string) => {
  const response = await api.get("/bookings", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateBookingStatus = async (
  id: string,
  status: string,
  token: string
) => {
  const response = await api.patch(
    `/bookings/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const cancelBooking = async (id: string, token: string) => {
  const response = await api.post(
    `/bookings/${id}`,
    { status: "cancelled" },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const bookGuide = async (
  token: string,
  guideId: string,
  data: { date: string; message: string }
) => {
  const response = await api.post(
    "/bookings",
    {
      guideId,
      ...data,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
