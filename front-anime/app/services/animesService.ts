// services/animesService.ts
import apiClient from './axiosConfig';

export interface AnimeData {
  id: number;
  nombre: string;
  numero_capitulos: number;
  visto: number; // 0 por defecto, 1 si está visto
  comentarios: string;
  fecha_actualizacion: string; // Formato: 'YYYY-MM-DD'
}

export const getAnimes = async (): Promise<AnimeData[]> => {
  const response = await apiClient.get('/animes');
  return response.data; // Devuelve directamente los datos
};

export const createAnime = async (data: AnimeData) => {
  return await apiClient.post('/animes', data);
};

export const updateAnime = async (id: number, data: AnimeData) => {
  return await apiClient.put(`/animes/${id}/`, data);
};

export const deleteAnime = async (id: number) => {
  return await apiClient.delete(`/animes/${id}`);
};
