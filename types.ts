export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  demoUrl?: string;
  createdAt: number;
}

export interface MobileApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconUrl: string;
  screenshots: string[];
  rating: number; // 1.0 to 5.0
  downloads: string; // e.g. "10k+"
  size: string; // e.g. "15 MB"
  category: string;
  downloadUrl: string;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export type Category = 'All' | 'Hotel' | 'Gym' | 'Restaurant' | 'E-commerce' | 'Corporate' | 'Retail' | 'Salon' | 'Education' | 'Other';