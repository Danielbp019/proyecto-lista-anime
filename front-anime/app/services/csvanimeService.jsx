// services/csvanimeService.jsx
import apiClient from "./axiosConfig";

// Descargar el archivo CSV
export const getExcelcsv = async () => {
  try {
    const userId = localStorage.getItem("user_id"); // Obtener el user_id del localStorage
    const response = await apiClient.get(`/excelcsv/${userId}`, {
      responseType: "blob",
    });

    // Crear un enlace de descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    // Obtener la fecha actual en formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];

    // Configurar el nombre del archivo descargable
    link.href = url;
    link.setAttribute("download", `Lista-anime_${currentDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Limpiar el DOM después de la descarga

    return { success: true };
  } catch (error) {
    console.error("Error obteniendo archivo CSV (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo obtener el archivo CSV.",
    };
  }
};

// Subir el archivo CSV
export const createExcelcsv = async (file) => {
  try {
    const formData = new FormData();
    const userId = localStorage.getItem("user_id"); // Obtener el user_id del localStorage
    formData.append("csv-file", file); // Nombre del campo debe coincidir con el backend
    formData.append("user_id", userId); // Agregar el user_id al FormData

    const response = await apiClient.post("/excelcsv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error subiendo archivo CSV (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo subir el archivo CSV.",
    };
  }
};

// Eliminar datos de la tabla
export const deleteExcelcsv = async (id) => {
  try {
    await apiClient.delete(`/excelcsv/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error eliminando datos (Service):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Service - No se pudo eliminar los datos.",
    };
  }
};
