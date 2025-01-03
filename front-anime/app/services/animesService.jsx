// services/animesService.jsx
import apiClient from "./axiosConfig";

// Obtener lista de animes por user_id
export const getAnimes = async (userId) => {
  try {
    const response = await apiClient.get(`/animes`, {
      params: { id: userId },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo animes (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener la lista de animes.",
    };
  }
};

// Crear un nuevo anime
export const createAnime = async (data) => {
  try {
    const response = await apiClient.post("/animes", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creando anime (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo crear el anime.",
    };
  }
};

// Actualizar un anime
export const updateAnime = async (id, data) => {
  try {
    const response = await apiClient.patch(`/animes/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error actualizando anime (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo actualizar el anime.",
    };
  }
};

// Eliminar un anime
export const deleteAnime = async (id) => {
  try {
    const response = await apiClient.delete(`/animes/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error eliminando anime (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo eliminar el anime.",
    };
  }
};
