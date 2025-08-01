import axios from "axios";
import { store } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    config.headers?.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default api;
