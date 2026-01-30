import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith('/admin')) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Services', path: '/#services' },
    { name: 'Apps Store', path: '/apps' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-xl transition-all ${scrolled ? 'bg-indigo-600' : 'bg-indigo-600'}`}>
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              Betterr Roxx
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              {user ? (
                <div className="flex items-center gap-4">
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="text-sm font-medium flex items-center gap-2 text-indigo-600">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  )}
                  <div className="flex items-center gap-2 text-slate-700">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-slate-500 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-slate-600 font-medium text-sm hover:text-indigo-600 px-3 py-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-gray-50"
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-4">
            {user ? (
               <div className="space-y-3">
                 {isAdmin && (
                    <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg text-indigo-600 font-medium bg-indigo-50">
                      Admin Dashboard
                    </Link>
                 )}
                 <div className="px-4 text-sm text-slate-500">Signed in as {user.name}</div>
                 <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600">Log Out</button>
               </div>
            ) : (
               <div className="flex flex-col gap-2 px-2">
                 <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 rounded-lg border border-slate-200 font-medium text-slate-700">
                   Log in
                 </Link>
                 <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full text-center py-3 rounded-lg bg-indigo-600 text-white font-medium">
                   Sign Up
                 </Link>
               </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};