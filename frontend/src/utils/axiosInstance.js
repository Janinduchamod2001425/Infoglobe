import axios from "axios";

// Create an axios instance with a custom configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default axiosInstance;
