// services/animesService.js
import apiClient from "./axiosConfig";

export const getAnimes = async () => {
  try {
    const response = await apiClient.get("/animes");
    return response.data; // Devuelve directamente los datos
  } catch (error) {
    console.error("Error obteniendo animes:", error);
    return []; // Devuelve un array vacío o maneja el error de otra manera adecuada
  }
};

export const createAnime = async (data) => {
  try {
    const response = await apiClient.post("/animes", data);
    return response.data;
  } catch (error) {
    console.error("Error creando anime:", error);
    throw error;
  }
};

export const updateAnime = async (id, data) => {
  try {
    const response = await apiClient.put(`/animes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error actualizando anime:", error);
    throw error;
  }
};

export const deleteAnime = async (id) => {
  try {
    await apiClient.delete(`/animes/${id}`);
  } catch (error) {
    console.error("Error borrando anime:", error);
    throw error;
  }
};
