import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Star, Share2, ShieldCheck, Smartphone, ArrowRight } from 'lucide-react';
import { db } from '../services/db';
import { MobileApp } from '../types';

export const AppDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [app, setApp] = useState<MobileApp | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      db.getAppById(id).then(data => {
        setApp(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !app) return <div className="min-h-screen pt-24 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/apps" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <img src={app.iconUrl} alt="icon" className="w-10 h-10 rounded-lg" />
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-none">{app.name}</h1>
            <p className="text-xs text-green-600 font-medium uppercase mt-1">{app.category}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Main Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img src={app.iconUrl} alt="icon" className="w-24 h-24 rounded-2xl shadow-sm border border-gray-100" />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{app.name}</h2>
            <p className="text-indigo-600 font-medium mb-4">{app.tagline}</p>
            
            <div className="flex items-center gap-6 text-center">
               <div>
                  <div className="flex items-center gap-1 font-bold text-gray-900">
                    {app.rating.toFixed(1)} <Star className="h-4 w-4 text-gray-900 fill-current" />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Rating</p>
               </div>
               <div className="w-px h-8 bg-gray-200"></div>
               <div>
                  <div className="font-bold text-gray-900">{app.size}</div>
                  <p className="text-xs text-gray-500 mt-0.5">Size</p>
               </div>
               <div className="w-px h-8 bg-gray-200"></div>
               <div>
                  <div className="font-bold text-gray-900">{app.downloads}</div>
                  <p className="text-xs text-gray-500 mt-0.5">Downloads</p>
               </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-full mb-8 flex items-center justify-center gap-2 shadow-lg shadow-green-200 active:scale-95 transition-all">
          <Download className="h-5 w-5" /> Download / Install
        </button>

        {/* Screenshots */}
        <div className="mb-8 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4">
            {app.screenshots.map((shot, idx) => (
              <img key={idx} src={shot} alt="screenshot" className="h-64 w-auto rounded-xl border border-gray-100 shadow-sm" />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
           <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
             About this app <ArrowRight className="h-5 w-5" />
           </h3>
           <p className="text-gray-600 leading-relaxed whitespace-pre-line">
             {app.description}
           </p>
        </div>

        {/* Tags / Chips */}
        <div className="flex flex-wrap gap-2 mb-12">
           <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">#Business</span>
           <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">#Productivity</span>
           <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">#Tools</span>
        </div>

        {/* Tech Specs */}
        <div className="bg-gray-50 rounded-xl p-6">
           <h4 className="font-bold text-gray-900 mb-4">App Info</h4>
           <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="text-gray-500">Version</div>
              <div className="text-gray-900">2.1.0</div>
              <div className="text-gray-500">Updated on</div>
              <div className="text-gray-900">{new Date(app.createdAt).toLocaleDateString()}</div>
              <div className="text-gray-500">OS Required</div>
              <div className="text-gray-900">Android 8.0+</div>
           </div>
        </div>

      </div>
    </div>
  );
};