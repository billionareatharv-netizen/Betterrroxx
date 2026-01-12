import React from 'react';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Me</h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            I'm a full-stack developer with a passion for helping small businesses establish a professional online presence.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
             <img 
               src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
               alt="Developer Profile" 
               className="rounded-2xl shadow-xl w-full"
             />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Story</h2>
            <p className="text-gray-600 leading-relaxed">
              I started coding 5 years ago, and I realized that many local businesses—gyms, salons, shops—were struggling to compete because they didn't have good websites. 
            </p>
            <p className="text-gray-600 leading-relaxed">
              My mission is simple: <strong>Build websites that actually get customers.</strong> I don't just write code; I design systems that integrate with WhatsApp, Google Maps, and Social Media to drive real revenue for your business.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">My Technical Toolkit</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
            <Code className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Frontend</h3>
            <p className="text-sm text-gray-500 mt-1">React, HTML5, Tailwind CSS</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
            <Database className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Backend</h3>
            <p className="text-sm text-gray-500 mt-1">Node.js, Firebase</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
            <Smartphone className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Mobile</h3>
            <p className="text-sm text-gray-500 mt-1">Responsive Design, PWA</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
            <Globe className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">SEO</h3>
            <p className="text-sm text-gray-500 mt-1">Google Ranking, Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};
