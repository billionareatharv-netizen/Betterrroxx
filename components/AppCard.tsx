import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download } from 'lucide-react';
import { MobileApp } from '../types';

interface AppCardProps {
  app: MobileApp;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <Link 
      to={`/apps/${app.id}`} 
      className="block group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 hover:border-indigo-100"
    >
      <div className="flex gap-4 items-start">
        <img 
          src={app.iconUrl} 
          alt={app.name} 
          className="w-20 h-20 rounded-2xl object-cover shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 font-bold text-lg leading-tight truncate group-hover:text-indigo-600 transition-colors">{app.name}</h3>
          <p className="text-green-600 text-xs font-medium mt-1 uppercase">{app.category}</p>
          <p className="text-gray-500 text-sm line-clamp-2 mt-1">{app.tagline}</p>
          
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center text-xs font-bold text-gray-700">
              <span>{app.rating.toFixed(1)}</span>
              <Star className="h-3 w-3 text-yellow-400 fill-current ml-0.5" />
            </div>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-xs text-gray-500">{app.size}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-xs text-gray-500">{app.downloads}</span>
          </div>
        </div>
        
        <div className="self-center p-2 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Download className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
};