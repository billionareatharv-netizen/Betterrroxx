import React, { useEffect, useState } from 'react';
import { db } from '../services/db';
import { MobileApp } from '../types';
import { AppCard } from '../components/AppCard';
import { Smartphone } from 'lucide-react';

export const Apps: React.FC = () => {
  const [apps, setApps] = useState<MobileApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      const data = await db.getApps();
      setApps(data);
      setLoading(false);
    };
    fetchApps();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-white rounded-2xl shadow-sm mb-4">
             <Smartphone className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">App Store</h1>
          <p className="text-gray-500 mt-2">Browse our collection of specialized business applications.</p>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {apps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
