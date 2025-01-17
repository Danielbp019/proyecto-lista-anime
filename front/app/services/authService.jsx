// services/authService.jsx
import apiClient from "./axiosConfig";

// Refrescar el token
export const refreshAccessToken = async () => {
  try {
    const response = await apiClient.post("/refresh");
    return response.data.access_token;
  } catch (error) {
    console.error("Error al refrescar el token:", error.response ? error.response.data : error.message);
    throw new Error("No se pudo refrescar el token.");
  }
};

// Iniciar sesión
export const login = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    if (response.data.error === "No existen usuarios registrados en el sistema") {
      throw new Error("No existen usuarios registrados en el sistema. Por favor, registra una cuenta primero.");
    }
    // Procedemos a guardar los datos que necesitamos.
    localStorage.setItem("access_token", response.data.token);
    localStorage.setItem("user_id", response.data.user.id);
    localStorage.setItem("user_name", response.data.user.name);

    // Guardar el token en una cookie SIN HttpOnly, ya que esto solo puede hacerse desde el servidor
    document.cookie = `auth_token=${response.data.token}; path=/; SameSite=Lax`;

    return response.data;
  } catch (error) {
    //console.error("Error iniciando sesión:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.error : "Error al iniciar sesión.");
  }
};

// Registrar usuario
export const register = async (data) => {
  try {
    const response = await apiClient.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registrando:", error.response ? error.response.data : error.message);
    throw new Error("Error al registrar.");
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    const response = await apiClient.post("/logout");

    // Eliminar toda la información del usuario del localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("theme"); // Eliminar el tema seleccionado, si está almacenado

    // Eliminar la cookie de autenticación
    document.cookie = "auth_token=; max-age=0; path=/;";

    return response.data;
  } catch (error) {
    console.error("Error cerrando sesión:", error.response ? error.response.data : error.message);
    throw new Error("Error al cerrar sesión.");
  }
};
