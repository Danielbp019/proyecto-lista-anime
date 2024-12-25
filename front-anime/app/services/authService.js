// services/authService.js
import apiClient from "./axiosConfig";

export const login = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await apiClient.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registrando:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Error terminando sesión:", error);
    throw error;
  }
};
