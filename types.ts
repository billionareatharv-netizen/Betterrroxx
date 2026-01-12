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

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type Category = 'All' | 'Gym' | 'Retail' | 'Salon' | 'Education' | 'Other';
