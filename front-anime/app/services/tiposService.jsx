// services/tiposService.jsx
import apiClient from "./axiosConfig";

// Obtener lista de tipos
export const getTipos = async () => {
  try {
    const response = await apiClient.get(`/tipos`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo tipos (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener la lista de tipos.",
    };
  }
};

// Crear un nuevo tipo
export const createTipo = async (data) => {
  try {
    const response = await apiClient.post("/tipos", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creando tipo (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo crear el tipo.",
    };
  }
};

// Actualizar un tipo
export const updateTipo = async (id, data) => {
  try {
    const response = await apiClient.patch(`/tipos/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error actualizando tipo (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo actualizar el tipo.",
    };
  }
};

// Eliminar un tipo
export const deleteTipo = async (id) => {
  try {
    const response = await apiClient.delete(`/tipos/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error eliminando tipo (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo eliminar el tipo.",
    };
  }
};
