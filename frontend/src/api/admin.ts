import api from "./axios";

export const getPendingGuides = async (token: string) => {
  const response = await api.get("/admin/guides/pending", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Verify Guide (approve/reject)
export const verifyGuide = async (
  guideId: string,
  status: string,
  token: string
) => {
  const response = await api.patch(
    `/admin/guides/${guideId}/verify`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
