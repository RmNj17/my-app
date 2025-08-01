import api from "./axios";

export const getGuides = async () => {
  const response = await api.get("/guides", {});
  return response.data;
};
