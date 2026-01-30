import { Project, User, MobileApp } from '../types';
import { isFirebaseConfigured } from './firebaseConfig';

// MOCK WEBSITES
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Grand Palace Hotel',
    category: 'Hotel',
    shortDescription: 'Luxury hotel booking engine with room availability and payment gateway.',
    fullDescription: 'A complete digital solution for Grand Palace Hotel. We increased their direct bookings by 40% using a custom booking engine, integrated WhatsApp concierge, and a virtual tour gallery.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'],
    technologies: ['React', 'Booking Engine', 'WhatsApp API'],
    features: ['Real-time Booking', 'Room Gallery', 'Virtual Tour'],
    demoUrl: '#',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Iron Lifters Gym',
    category: 'Gym',
    shortDescription: 'Membership management portal with QR code check-in.',
    fullDescription: 'Iron Lifters needed to automate their desk. We built a site where members can sign up, pay monthly fees, and generate a QR code for gym entry.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80'],
    technologies: ['React', 'Stripe', 'QR Code'],
    features: ['Member Login', 'Auto-Billing', 'Class Schedule'],
    demoUrl: '#',
    createdAt: Date.now() - 100000
  },
  {
    id: '3',
    title: 'Urban Brew Café',
    category: 'Restaurant',
    shortDescription: 'Digital QR Menu and table reservation system.',
    fullDescription: 'Replaced paper menus with a dynamic QR code system. Customers scan to order. The system handles table reservations and integrates with the kitchen display system.',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80'],
    technologies: ['Next.js', 'Firebase', 'PWA'],
    features: ['QR Menu', 'Table Booking', 'Order Tracking'],
    demoUrl: '#',
    createdAt: Date.now() - 200000
  }
];

// MOCK APPS
const MOCK_APPS: MobileApp[] = [
  {
    id: 'a1',
    name: 'Hotel Concierge Pro',
    tagline: 'Manage guest requests instantly.',
    description: 'The ultimate app for hotel staff to manage housekeeping, room service, and guest complaints in real-time.',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
    screenshots: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80'],
    rating: 4.8,
    downloads: '5k+',
    size: '12 MB',
    category: 'Business',
    downloadUrl: '#',
    createdAt: Date.now()
  },
  {
    id: 'a2',
    name: 'Gym Tracker Elite',
    tagline: 'Workout logs for members.',
    description: 'Allow your gym members to track sets, reps, and progress. Fully branded for your gym.',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png',
    screenshots: ['https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80'],
    rating: 4.5,
    downloads: '10k+',
    size: '24 MB',
    category: 'Health',
    downloadUrl: '#',
    createdAt: Date.now() - 50000
  }
];

class DataService {
  private useMock: boolean;

  constructor() {
    this.useMock = !isFirebaseConfigured();
    
    if (this.useMock) {
      if (!localStorage.getItem('agency_projects')) {
        localStorage.setItem('agency_projects', JSON.stringify(MOCK_PROJECTS));
      }
      if (!localStorage.getItem('agency_apps')) {
        localStorage.setItem('agency_apps', JSON.stringify(MOCK_APPS));
      }
    }
  }

  // --- PROJECTS (WEBSITES) ---
  async getProjects(): Promise<Project[]> {
    if (this.useMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return JSON.parse(localStorage.getItem('agency_projects') || '[]');
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
      const newProject: Project = { ...project, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
      localStorage.setItem('agency_projects', JSON.stringify([newProject, ...projects]));
    }
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<void> {
    if (this.useMock) {
      const projects = await this.getProjects();
      const index = projects.findIndex(p => p.id === id);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...updates };
        localStorage.setItem('agency_projects', JSON.stringify(projects));
      }
    }
  }

  async deleteProject(id: string): Promise<void> {
    if (this.useMock) {
      const projects = await this.getProjects();
      const filtered = projects.filter(p => p.id !== id);
      localStorage.setItem('agency_projects', JSON.stringify(filtered));
    }
  }

  // --- APPS (MOBILE) ---
  async getApps(): Promise<MobileApp[]> {
    if (this.useMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return JSON.parse(localStorage.getItem('agency_apps') || '[]');
    }
    return [];
  }

  async getAppById(id: string): Promise<MobileApp | undefined> {
    const apps = await this.getApps();
    return apps.find(a => a.id === id);
  }

  async addApp(app: Omit<MobileApp, 'id' | 'createdAt'>): Promise<void> {
    if (this.useMock) {
      const apps = await this.getApps();
      const newApp: MobileApp = { ...app, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
      localStorage.setItem('agency_apps', JSON.stringify([newApp, ...apps]));
    }
  }

  async updateApp(id: string, updates: Partial<MobileApp>): Promise<void> {
    if (this.useMock) {
      const apps = await this.getApps();
      const index = apps.findIndex(a => a.id === id);
      if (index !== -1) {
        apps[index] = { ...apps[index], ...updates };
        localStorage.setItem('agency_apps', JSON.stringify(apps));
      }
    }
  }

  async deleteApp(id: string): Promise<void> {
    if (this.useMock) {
      const apps = await this.getApps();
      const filtered = apps.filter(a => a.id !== id);
      localStorage.setItem('agency_apps', JSON.stringify(filtered));
    }
  }

  // --- AUTH ---
  async login(email: string, pass: string): Promise<{ success: boolean; user?: User; error?: string }> {
    if (email === 'betterrroxx@gmail.com' && pass === 'atharv9090') {
      return { success: true, user: { id: 'admin-001', name: 'Agency Admin', email: email, role: 'ADMIN' } };
    }
    return { success: false, error: 'Invalid credentials.' };
  }

  async signup(name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> {
    return { success: false, error: 'Registration is closed for this agency.' };
  }
}

export const db = new DataService();
