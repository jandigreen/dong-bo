import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
