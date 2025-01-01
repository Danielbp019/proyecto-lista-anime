// services/axiosConfig.jsx
import axios from "axios";
import { refreshAccessToken } from "./authService";

// Crear instancia de Axios
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 20000, // 20 segundos de tiempo de espera
});

// Interceptor para añadir el token a las solicitudes
apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores y refrescar el token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verificar si el error es por token expirado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Evitar bucles infinitos

      try {
        const newToken = await refreshAccessToken();
        localStorage.setItem("access_token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Reintentar la solicitud
      } catch (refreshError) {
        console.error("No se pudo refrescar el token:", refreshError);
        localStorage.removeItem("access_token");
        window.location.href = "/auth/login"; // Redirigir al login si no se puede refrescar
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
