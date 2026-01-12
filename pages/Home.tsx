import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, ShoppingBag, TrendingUp, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { db } from '../services/db';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';

export const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const allProjects = await db.getProjects();
      setFeaturedProjects(allProjects.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3));
      setLoading(false);
    };
    loadData();
  }, []);

  const services = [
    { icon: <Monitor className="h-6 w-6" />, title: 'Gym Websites', desc: 'Membership forms, trainer profiles, and class schedules.' },
    { icon: <ShoppingBag className="h-6 w-6" />, title: 'E-Commerce', desc: 'Online stores for mobile shops, boutiques, and retail.' },
    { icon: <TrendingUp className="h-6 w-6" />, title: 'Coaching Centers', desc: 'Course listings, student enrollment, and result showcases.' },
    { icon: <Smartphone className="h-6 w-6" />, title: 'Mobile Friendly', desc: '100% responsive designs that look great on any phone.' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* Modern Hero Section */}
      <section className="relative bg-slate-900 pt-32 pb-40 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse"></div>
           <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-indigo-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Accepting New Projects
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
            Build a Website That <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Grows Your Business
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            I specialize in crafting high-performance websites for local businesses. 
            Get more calls, more WhatsApp messages, and more customers.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/projects" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/30 transform hover:-translate-y-1">
              View My Portfolio
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all">
              Start a Project
            </Link>
          </div>

          {/* Social Proof Mini */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-400 text-sm font-medium">
             <div className="flex items-center gap-2">
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900"></div>)}
               </div>
               <span>Trusted by 50+ Local Businesses</span>
             </div>
             <div className="flex items-center gap-1 text-yellow-400">
               <Star className="w-4 h-4 fill-current"/>
               <Star className="w-4 h-4 fill-current"/>
               <Star className="w-4 h-4 fill-current"/>
               <Star className="w-4 h-4 fill-current"/>
               <Star className="w-4 h-4 fill-current"/>
               <span className="text-slate-400 ml-2">5.0 Star Rating</span>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Tailored Solutions</h2>
            <p className="text-lg text-slate-500">I don't just build websites; I build digital assets for your niche.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-slate-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me - Modern Layout */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1553877616-15280ed5613b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Working" 
                className="relative rounded-3xl shadow-2xl z-10"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Why top local businesses <br/>trust me with their brand?</h2>
              <div className="space-y-8">
                {[
                  { title: "Lightning Fast Delivery", desc: "Get your fully functional website up and running in days, not months." },
                  { title: "SEO That Works", desc: "Optimized structure to help you rank higher on Google Maps and Search." },
                  { title: "Direct WhatsApp Sales", desc: "Integrated chat buttons so customers can message you instantly." },
                  { title: "Self-Manageable", desc: "Easy admin panel so you can update prices and photos yourself." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/about" className="text-indigo-600 font-bold hover:text-indigo-700 inline-flex items-center gap-2 group">
                  Learn more about my process <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900">Featured Projects</h2>
              <p className="mt-3 text-slate-500 text-lg">Check out what I've built recently.</p>
            </div>
            <Link to="/projects" className="hidden md:flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
              View All <ArrowRight className="h-5 w-5"/>
            </Link>
          </div>
          
          {loading ? (
             <div className="text-center py-20 text-slate-400">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProjects.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/projects" className="inline-block px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to scale your business?</h2>
          <p className="text-indigo-200 text-xl mb-10 max-w-2xl mx-auto">Don't let potential customers slip away. Let's build a website that converts visitors into loyal clients.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/contact" className="inline-block bg-white text-indigo-900 px-10 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-xl">
              Start Your Project Now
            </Link>
            <Link to="/signup" className="inline-block bg-transparent border-2 border-indigo-400 text-indigo-100 px-10 py-4 rounded-xl font-bold hover:bg-indigo-800 transition-colors">
              Create User Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
