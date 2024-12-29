// services/csvanimeService.jsx
import apiClient from "./axiosConfig";

// Descargar el archivo CSV
export const getExcelcsv = async (id) => {
  try {
    const response = await apiClient.get(`/excelcsv/${id}`, {
      responseType: "blob",
    });
    // Crear un enlace de descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    // Obtener la fecha actual en el formato deseado
    const currentDate = new Date().toISOString().split("T")[0];

    // Cambiar el nombre del archivo descargable
    link.href = url;
    link.setAttribute("download", `Lista-anime_${currentDate}.csv`);
    document.body.appendChild(link);
    link.click();
    return { success: true };
  } catch (error) {
    console.error("Error obteniendo excel csv:", error.message);
    return { success: false, error: "No se pudo obtener el archivo csv." };
  }
};

// Subir el archivo CSV a la tabla
export const createExcelcsv = async (data) => {
  try {
    const formData = new FormData();
    formData.append("csv-file", data); // Asegurarse de que el nombre del campo coincide con el backend

    const response = await apiClient.post("/excelcsv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al subir la lista csv a la tabla:", error.message);
    return { success: false, error: "No se pudo subir la lista csv a la tabla." };
  }
};

// Truncar la tabla anime
export const deleteExcelcsv = async (id) => {
  try {
    await apiClient.delete(`/excelcsv/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al truncar la tabla anime:", error.message);
    return { success: false, error: "No se pudo truncar la tabla anime." };
  }
};
