import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-white">DevPortfolio</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering local businesses with high-converting, mobile-first web solutions. 
              Let's turn your visitors into customers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 bg-slate-800 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 text-slate-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 bg-slate-800 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 text-slate-400">
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/betterr_roxx/?utm_source=ig_web_button_share_sheet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800 rounded-lg hover:bg-pink-600 hover:text-white transition-all duration-300 text-slate-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Navigation</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Home</Link></li>
              <li><Link to="/projects" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Projects</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> About Me</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Get in Touch</h4>
            <div className="space-y-4 text-sm text-slate-400">
              {/* Phone Removed */}
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-slate-800 rounded-md group-hover:bg-indigo-600 transition-colors">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                   <span className="block text-slate-300 font-medium">Email</span>
                  <span>betterrroxx@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
