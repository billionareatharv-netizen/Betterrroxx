import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Code2, User, LogOut, LayoutDashboard } from 'lucide-react';
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

  // Hide Navbar on dashboard pages for clean admin view
  if (location.pathname.startsWith('/admin')) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Logic to determine if we are on a page with a dark header (Home)
  const isHome = location.pathname === '/';
  
  // If we are on Home and haven't scrolled, text should be white to be visible on dark background
  // Otherwise (scrolled or on other pages), text should be dark
  const isTransparentOnDark = isHome && !scrolled;
  
  const textColorClass = isTransparentOnDark ? 'text-white' : 'text-slate-900';
  const mobileButtonClass = isTransparentOnDark ? 'text-white' : 'text-slate-700';
  const linkHoverClass = isTransparentOnDark ? 'hover:text-indigo-300' : 'hover:text-indigo-600';
  const activeLinkClass = isTransparentOnDark ? 'text-indigo-400' : 'text-indigo-600';
  const inactiveLinkClass = isTransparentOnDark ? 'text-slate-300' : 'text-slate-600';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-xl transition-all ${scrolled ? 'bg-indigo-600' : (isTransparentOnDark ? 'bg-white/10 backdrop-blur-sm' : 'bg-indigo-600')}`}>
              <Code2 className={`h-6 w-6 ${scrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${textColorClass}`}>
              DevPortfolio
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${linkHoverClass} ${
                    location.pathname === link.path ? activeLinkClass : inactiveLinkClass
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className={`flex items-center gap-4 pl-6 border-l ${isTransparentOnDark ? 'border-white/20' : 'border-slate-200'}`}>
              {user ? (
                <div className="flex items-center gap-4">
                  {isAdmin && (
                    <Link to="/admin/dashboard" className={`text-sm font-medium flex items-center gap-2 ${activeLinkClass}`}>
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  )}
                  <div className={`flex items-center gap-2 ${isTransparentOnDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className={`${isTransparentOnDark ? 'text-slate-300 hover:text-red-400' : 'text-slate-500 hover:text-red-600'} transition-colors`}
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className={`text-sm font-medium transition-colors ${inactiveLinkClass} ${linkHoverClass}`}>
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${mobileButtonClass}`}
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
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                location.pathname === link.path ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2 pt-2">
             {user ? (
               <div className="space-y-2">
                 {isAdmin && (
                    <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg text-indigo-600 font-medium bg-indigo-50">
                      Admin Dashboard
                    </Link>
                 )}
                 <div className="px-4 py-2 text-slate-500 text-sm">Signed in as {user.name}</div>
                 <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg">
                   Log Out
                 </button>
               </div>
             ) : (
               <div className="flex flex-col gap-2">
                 <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center px-4 py-3 rounded-lg text-slate-700 font-medium border border-gray-200">
                   Log in
                 </Link>
                 <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full text-center px-4 py-3 rounded-lg text-white font-medium bg-indigo-600">
                   Sign Up Free
                 </Link>
               </div>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};
