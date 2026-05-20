/**
 * Authentication Service - WCAG 2.1 AA Compliant
 */

import apiClient from './api';

export interface LoginFormData {
  username: string;
  password: string;
}

export async function login(formData: LoginFormData) {
  try {
    const response = await apiClient.post('/token', {
      username: formData.username,
      password: formData.password
    });
    
    // Store token and user info
    localStorage.setItem('access_token', response.data.access_token);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.detail || 'Invalid credentials'
    };
  }
}

export async function logout() {
  localStorage.removeItem('access_token');
}

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('access_token');
};

export const getCurrentUser = (): string | null => {
  return localStorage.getItem('current_user') || null;
};

export const getUserRole = (): 'admin' | 'participant' | null => {
  const user = getCurrentUser();
  if (!user) return null;
  
  // Simple role check based on username prefix
  if (user.toLowerCase().includes('admin')) return 'admin';
  return 'participant';
};
