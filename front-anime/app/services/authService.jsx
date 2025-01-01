// services/authService.jsx
import apiClient from "./axiosConfig";

// Refrescar el token
export const refreshAccessToken = async () => {
  try {
    const response = await apiClient.post("/refresh");
    return response.data.access_token;
  } catch (error) {
    console.error("Error al refrescar el token:", error.response ? error.response.data : error.message);
    throw new Error("No se pudo refrescar el token.");
  }
};

// Iniciar sesión
export const login = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    localStorage.setItem("access_token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error iniciando sesión:", error.response ? error.response.data : error.message);
    throw new Error("Error al iniciar sesión.");
  }
};

// Registrar usuario
export const register = async (data) => {
  try {
    const response = await apiClient.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registrando:", error.response ? error.response.data : error.message);
    throw new Error("Error al registrar.");
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    const response = await apiClient.post("/logout");
    localStorage.removeItem("access_token");
    return response.data;
  } catch (error) {
    console.error("Error cerrando sesión:", error.response ? error.response.data : error.message);
    throw new Error("Error al cerrar sesión.");
  }
};
