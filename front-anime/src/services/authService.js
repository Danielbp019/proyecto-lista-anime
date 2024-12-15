// src/services/authService.js
import Cookies from 'js-cookie'

const TOKEN_KEY = 'auth_token'

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = Cookies.get(TOKEN_KEY) // Obtiene el token desde las cookies
  return !!token // Devuelve true si existe, false si no
}

// Guarda el token en las cookies
export const setAuthToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1, secure: true, sameSite: 'strict' }) // Expira en 1 día
}

// Elimina el token de las cookies (logout)
export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY)
}
