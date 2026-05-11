import axios from "axios";

const API = axios.create({
  // Use the Vercel backend URL 
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add a request interceptor to include the token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;