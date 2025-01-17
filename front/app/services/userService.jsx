// services/userService.jsx
import apiClient from "./axiosConfig";

// Obtener información del usuario
export const getUser = async (id) => {
  try {
    const response = await apiClient.get(`/showUser/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo usuario (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener la información del usuario.",
    };
  }
};

// Actualizar nombre del usuario
export const updateUser = async (id, data) => {
  try {
    const response = await apiClient.patch(`/updateUser/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error actualizando usuario (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo actualizar la información del usuario.",
    };
  }
};
