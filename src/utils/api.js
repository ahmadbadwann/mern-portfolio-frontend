import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.error || err.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const projectsApi = {
  getAll: (params) => api.get('/projects', { params }),
};

export const skillsApi = {
  getAll: () => api.get('/skills'),
};

export const contactApi = {
  submit: (data) => api.post('/contact', data),
};

export default api;
