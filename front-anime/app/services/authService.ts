// services/authService.ts
import apiClient from './axiosConfig';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const login = async (data: LoginData) => {
  return await apiClient.post('/login', data);
};

export const register = async (data: RegisterData) => {
  return await apiClient.post('/register', data);
};

export const logout = async () => {
  return await apiClient.post('/logout');
};
