import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, Coffee, Dumbbell, Hotel, TrendingUp, CheckCircle, ArrowRight, Instagram } from 'lucide-react';
import { db } from '../services/db';
import { MobileApp, Project } from '../types';
import { AppCard } from '../components/AppCard';

export const Home: React.FC = () => {
  const [featuredApps, setFeaturedApps] = useState<MobileApp[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const apps = await db.getApps();
      const projects = await db.getProjects();
      setFeaturedApps(apps.slice(0, 4));
      setFeaturedProjects(projects.slice(0, 3));
    };
    loadData();
  }, []);

  const industries = [
    { icon: <Hotel className="h-8 w-8" />, title: 'Hotels & Resorts', desc: 'Direct booking engines, room service apps, and virtual tours.' },
    { icon: <Dumbbell className="h-8 w-8" />, title: 'Gyms & Fitness', desc: 'Membership portals, QR code entry systems, and workout apps.' },
    { icon: <Coffee className="h-8 w-8" />, title: 'Cafés & Restaurants', desc: 'QR menus, table reservations, and online ordering systems.' },
    { icon: <TrendingUp className="h-8 w-8" />, title: 'Local Business', desc: 'SEO-optimized websites that rank high on Google Maps.' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
            We Build Websites That <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Bring More Customers
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Specialized digital solutions for <strong>Hotels, Gyms, and Cafés</strong>. 
            Get more direct bookings, membership signups, and client inquiries.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://www.instagram.com/betterr_roxx/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all shadow-lg">
              <Instagram className="h-5 w-5" /> Message on Instagram
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRIES */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
            <p className="text-slate-500">Tailored technology for your specific business needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((ind, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {ind.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{ind.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. APP SHOWCASE (PLAY STORE STYLE) */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
             <div>
               <h2 className="text-3xl font-bold text-slate-900">Mobile Apps</h2>
               <p className="text-slate-500 mt-2">Custom Android & iOS apps for your business.</p>
             </div>
             <Link to="/apps" className="hidden md:flex items-center text-indigo-600 font-bold hover:underline">
               View All Apps <ArrowRight className="h-4 w-4 ml-1"/>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/apps" className="text-indigo-600 font-bold">View All Apps</Link>
          </div>
        </div>
      </section>

      {/* 4. WEB PROJECTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Success Stories</h2>
            <p className="text-slate-500 mt-2">See how we transformed these businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <div key={project.id} className="group rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                   <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                   <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-indigo-600">{project.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{project.shortDescription}</p>
                  <Link to={`/projects/${project.id}`} className="text-indigo-600 font-bold text-sm hover:underline">Read Case Study</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">No hidden fees. Just results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-2">Starter Website</h3>
              <p className="text-3xl font-bold mb-6">₹14,999</p>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-400"/> 5 Page Website</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-400"/> Mobile Responsive</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-400"/> Instagram Integration</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-400"/> Contact Form</li>
              </ul>
              <a href="https://www.instagram.com/betterr_roxx/" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white/10 hover:bg-white/20 py-3 rounded-lg font-bold transition-colors">
                Choose Starter
              </a>
            </div>

            {/* Business (Featured) */}
            <div className="bg-indigo-600 p-8 rounded-2xl border border-indigo-500 transform scale-105 shadow-2xl relative">
              <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">BEST VALUE</span>
              <h3 className="text-xl font-bold mb-2">Business Growth</h3>
              <p className="text-3xl font-bold mb-6">₹29,999</p>
              <ul className="space-y-4 mb-8 text-sm text-indigo-100">
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-white"/> Everything in Starter</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-white"/> SEO Optimization</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-white"/> Admin Panel</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-white"/> Booking / Ordering System</li>
              </ul>
              <a href="https://www.instagram.com/betterr_roxx/" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white text-indigo-600 py-3 rounded-lg font-bold transition-colors">
                Choose Business
              </a>
            </div>

            {/* Premium */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-2">App + Web</h3>
              <p className="text-3xl font-bold mb-6">₹79,999</p>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-400"/> Complete Website</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-400"/> Android App</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-400"/> iOS App (Optional)</li>
                <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-400"/> Play Store Upload</li>
              </ul>
              <a href="https://www.instagram.com/betterr_roxx/" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white/10 hover:bg-white/20 py-3 rounded-lg font-bold transition-colors">
                Choose Premium
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};