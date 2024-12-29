// services/animesService.jsx
import apiClient from "./axiosConfig";

// Obtener lista de animes
export const getAnimes = async () => {
  try {
    const response = await apiClient.get("/animes");
    return { success: true, data: response.data };
  } catch (error) {
    //console.error("Error obteniendo animes:", error.message);
    return { success: false, error: "Service - No se pudo obtener la lista de animes." };
  }
};

// Crear un nuevo anime
export const createAnime = async (data) => {
  try {
    const response = await apiClient.post("/animes", data);
    return { success: true, data: response.data };
  } catch (error) {
    //console.error("Error creando anime:", error.message);
    return { success: false, error: "Service - No se pudo crear el anime." };
  }
};

// Actualizar un anime existente
export const updateAnime = async (id, data) => {
  try {
    const response = await apiClient.put(`/animes/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    //console.error("Error actualizando anime:", error.message);
    return { success: false, error: "Service - No se pudo actualizar el anime." };
  }
};

// Eliminar un anime por ID
export const deleteAnime = async (id) => {
  try {
    await apiClient.delete(`/animes/${id}`);
    return { success: true };
  } catch (error) {
    //console.error("Error borrando anime:", error.message);
    return { success: false, error: "Service - No se pudo eliminar el anime." };
  }
};
