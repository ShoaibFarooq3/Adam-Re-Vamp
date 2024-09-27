import axios from "axios";
const base_url = import.meta.env.VITE_REACT_APP_SERVER_URL;
const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;
