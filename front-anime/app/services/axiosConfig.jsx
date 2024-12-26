// services/axiosConfig.jsx
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // Necesario para cookies
  timeout: 5000, // 5 segundos de tiempo de espera, evita que las solicitudes queden en espera indefinidamente.
});

export default apiClient;
