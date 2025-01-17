// services/obrasService.jsx
import apiClient from "./axiosConfig";

// Obtener lista de obras por user_id
export const getObras = async (userId) => {
  try {
    const response = await apiClient.get(`/obras`, {
      params: { id: userId },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo obras (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener la lista de obras.",
    };
  }
};

// Crear un nuevo obra
export const createObra = async (data) => {
  try {
    const response = await apiClient.post("/obras", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creando obra (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo crear el obra.",
    };
  }
};

// Actualizar un obra
export const updateObra = async (id, data) => {
  try {
    const response = await apiClient.patch(`/obras/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error actualizando obra (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo actualizar el obra.",
    };
  }
};

// Eliminar un obra
export const deleteObra = async (id) => {
  try {
    const response = await apiClient.delete(`/obras/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error eliminando obra (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo eliminar el obra.",
    };
  }
};
