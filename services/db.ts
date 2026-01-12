import { Project, User } from '../types';
import { isFirebaseConfigured } from './firebaseConfig';

// MOCK DATA INITIALIZATION
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'House of Gains Gym',
    category: 'Gym',
    shortDescription: 'Modern fitness center website designed to drive membership signups.',
    fullDescription: 'A comprehensive website for House of Gains Gym. Features include a detailed gallery, membership pricing tables, and direct WhatsApp integration for potential member inquiries. Fully responsive and optimized for local SEO.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80'],
    technologies: ['React', 'Tailwind CSS', 'Vercel'],
    features: ['Responsive Design', 'Membership Plans', 'Contact Form'],
    demoUrl: 'https://house-of-gains-gym-website.vercel.app/',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'J7 Fitness',
    category: 'Gym',
    shortDescription: 'High-energy gym landing page with class schedules and trainer profiles.',
    fullDescription: 'J7 Fitness needed a digital presence that matched their high-energy atmosphere. This site showcases their facilities, introduces their trainers, and allows users to easily find location and contact details.',
    imageUrl: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1000&q=80'],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: ['Class Schedule', 'Trainer Portfolio', 'Mobile Optimized'],
    demoUrl: 'https://j7-fitness.vercel.app/',
    createdAt: Date.now() - 100000
  },
  {
    id: '3',
    title: 'Mobile Shop Gold',
    category: 'Retail',
    shortDescription: 'E-commerce showcase for a mobile phone and accessories store.',
    fullDescription: 'A clean and professional product catalog for a local mobile shop. Customers can browse available phones, view specifications, and contact the store directly via WhatsApp to purchase.',
    imageUrl: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=1000&q=80'],
    technologies: ['React', 'E-commerce UI', 'Responsive'],
    features: ['Product Catalog', 'WhatsApp Checkout', 'Search Functionality'],
    demoUrl: 'https://mobile-shop-gold.vercel.app/',
    createdAt: Date.now() - 200000
  },
  {
    id: '4',
    title: 'Rox Chatting App',
    category: 'Other',
    shortDescription: 'Real-time messaging application with a modern interface.',
    fullDescription: 'A fully functional real-time chatting application. Supports user authentication, real-time message delivery, and a sleek dark/light mode interface. Demonstrates capability in building complex web applications.',
    imageUrl: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=1000&q=80'],
    technologies: ['React', 'Firebase', 'Real-time DB'],
    features: ['Real-time Messaging', 'User Auth', 'Modern UI'],
    demoUrl: 'https://rox-chatting-app.vercel.app/',
    createdAt: Date.now() - 300000
  }
];

// DATA SERVICE CLASS
class DataService {
  private useMock: boolean;

  constructor() {
    this.useMock = !isFirebaseConfigured();
    
    // Initialize Mock Data if needed
    if (this.useMock) {
      const stored = localStorage.getItem('portfolio_projects_v2');
      if (!stored) {
        localStorage.setItem('portfolio_projects_v2', JSON.stringify(MOCK_PROJECTS));
      }
    }
  }

  // --- PROJECTS ---

  async getProjects(): Promise<Project[]> {
    if (this.useMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return JSON.parse(localStorage.getItem('portfolio_projects_v2') || '[]');
    }
    return []; 
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find(p => p.id === id);
  }

  async addProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<void> {
    if (this.useMock) {
      const projects = await this.getProjects();
      const newProject: Project = {
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now()
      };
      localStorage.setItem('portfolio_projects_v2', JSON.stringify([newProject, ...projects]));
      return;
    }
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<void> {
    if (this.useMock) {
      const projects = await this.getProjects();
      const index = projects.findIndex(p => p.id === id);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...updates };
        localStorage.setItem('portfolio_projects_v2', JSON.stringify(projects));
      }
      return;
    }
  }

  async deleteProject(id: string): Promise<void> {
    if (this.useMock) {
      const projects = await this.getProjects();
      const filtered = projects.filter(p => p.id !== id);
      localStorage.setItem('portfolio_projects_v2', JSON.stringify(filtered));
      return;
    }
  }

  // --- AUTH ---

  async login(email: string, pass: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // 1. Check for Admin Credentials (Securely Hardcoded for this context)
    if (email === 'betterrroxx@gmail.com' && pass === 'atharv9090') {
      return {
        success: true,
        user: {
          id: 'admin-001',
          name: 'Admin',
          email: email,
          role: 'ADMIN'
        }
      };
    }

    // 2. Check for Regular Users (Mock Storage)
    if (this.useMock) {
      const usersRaw = localStorage.getItem('portfolio_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const user = users.find((u: any) => u.email === email && u.password === pass);

      if (user) {
        return {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: 'USER'
          }
        };
      }
    }

    return { success: false, error: 'Invalid email or password.' };
  }

  async signup(name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> {
    if (this.useMock) {
      const usersRaw = localStorage.getItem('portfolio_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.find((u: any) => u.email === email)) {
        return { success: false, error: 'Email already exists.' };
      }

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        password: pass, // In production, never store passwords as plain text!
        role: 'USER'
      };

      users.push(newUser);
      localStorage.setItem('portfolio_users', JSON.stringify(users));
      return { success: true };
    }
    return { success: false, error: 'Signup not implemented for backend yet.' };
  }
}

export const db = new DataService();
