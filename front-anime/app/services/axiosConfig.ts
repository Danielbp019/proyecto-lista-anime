// services/axiosConfig.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Necesario para cookies
});

export default apiClient;
