import axios from 'axios';
import type { LoginCredentials, RegisterCredentials, ChangePasswordCredentials } from '../types/auth';

// Create an Axios instance with base configuration
export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Auth API functions
export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/users/login/', credentials);
  return response.data;
};

export const register = async (credentials: RegisterCredentials) => {
  const response = await api.post('/users/register/', {
    username: credentials.username,
    email: credentials.email,
    password: credentials.password,
    confirm_password: credentials.confirmPassword,
  });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post('/users/forgot-password/', { email });
  return response.data;
};

export const changePassword = async (credentials: ChangePasswordCredentials) => {
  const response = await api.put('/users/change-password/', {
    old_password: credentials.oldPassword,
    new_password: credentials.newPassword,
    confirm_new_password: credentials.confirmPassword,
  });
  return response.data;
};