import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    // Check if response is from our API and has the common wrapper
    if (response.data && response.data.hasOwnProperty('success') && response.data.hasOwnProperty('data')) {
      // Unwrapping the server's { success: true, data: ... }
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export const authApi = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const customerApi = {
  getCustomers: (params?: any) => api.get('/customers', { params }),
  getCustomer: (id: string) => api.get(`/customers/${id}`),
  createCustomer: (data: any) => api.post('/customers', data),
  updateCustomer: (id: string, data: any) => api.patch(`/customers/${id}`, data),
  deleteCustomer: (id: string) => api.delete(`/customers/${id}`),
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/customer-avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const znsApi = {
  getTemplates: () => api.get('/zns/templates'),
  sendTestZns: (data: any) => api.post('/zns/send', data),
};

export const reportApi = {
  getStats: () => api.get('/reports/stats'),
  exportCustomers: () => api.get('/reports/export/customers', { responseType: 'blob' }),
};

export { api };
export default api;
