export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage?: string;
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
}

export interface RevenueData {
  month: string;
  revenue: number;
}