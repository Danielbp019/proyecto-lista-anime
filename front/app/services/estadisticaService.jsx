// services/estadisticaService.jsx
import apiClient from "./axiosConfig";

// Obtener total de registros
export const getTotalRegistros = async (userId) => {
  try {
    const response = await apiClient.get(`/total-registros`, {
      params: { id: userId },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo total de registros (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener el total de registros.",
    };
  }
};

// Obtener cantidad de registros de tipo 1 - Sin definir
export const getTipo1 = async (userId) => {
  try {
    const response = await apiClient.get(`/tipo-1`, {
      params: { id: userId },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo registros de tipo 1 (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener los registros de tipo 1.",
    };
  }
};

// Obtener cantidad de registros de tipo 2 - Anime
export const getTipo2 = async (userId) => {
  try {
    const response = await apiClient.get(`/tipo-2`, {
      params: { id: userId },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo registros de tipo 2 (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener los registros de tipo 2.",
    };
  }
};

// Obtener cantidad de registros de tipo 3 - Dorama
export const getTipo3 = async (userId) => {
  try {
    const response = await apiClient.get(`/tipo-3`, {
      params: { id: userId },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo registros de tipo 3 (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener los registros de tipo 3.",
    };
  }
};

// Obtener cantidad de registros de tipo 4 - Serie
export const getTipo4 = async (userId) => {
  try {
    const response = await apiClient.get(`/tipo-4`, {
      params: { id: userId },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo registros de tipo 4 (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener los registros de tipo 4.",
    };
  }
};

// Obtener cantidad de registros que no sean de tipo 1 a 4
export const getOtrosTipos = async (userId) => {
  try {
    const response = await apiClient.get(`/otros-tipos`, {
      params: { id: userId },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error obteniendo registros de otros tipos (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener los registros de otros tipos.",
    };
  }
};
