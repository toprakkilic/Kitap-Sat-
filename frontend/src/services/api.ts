import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // NestJS'te main.ts'de verdiğin port
});

export const authService = {
  login: (credentials: any) => api.post('/auth/login', credentials),
};

export const adminService = {
  resetSystem: () => api.post('/admin/reset'),
  getMonthlyReports: () => api.get('/orders/reports/monthly'),
};

export const bookService = {
  getAll: () => api.get('/books'),
  delete: (id: number) => api.delete(`/books/${id}`),
};

export const orderService = {
  placeOrder: (totalPrice: number) => api.post('/orders', { totalPrice }),
};

export default api;