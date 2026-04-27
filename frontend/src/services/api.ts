import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // NestJS'te main.ts'de verdiğin port
});

export const authService = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (userData: any) => {
    return api.post('/auth/register', userData);
  }
};

export const adminService = {
  resetSystem: () => api.post('/admin/reset'),
  seedBulkData: () => api.post('/admin/seed-bulk'), // <-- Yeni satır
  getMonthlyReports: () => api.get('/orders/reports/monthly'),
};

export const bookService = {
  getAll: () => api.get('/books'),
  delete: (id: number) => api.delete(`/books/${id}`),
  create: (book: any) => api.post('/books', book), // <-- BU SATIRI EKLE
};

export const orderService = {
  placeOrder: (totalPrice: number) => api.post('/orders', { totalPrice }),
};

export default api;