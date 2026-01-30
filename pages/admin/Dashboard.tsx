import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Smartphone, Monitor } from 'lucide-react';
import { db } from '../../services/db';
import { Project, MobileApp } from '../../types';

export const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [apps, setApps] = useState<MobileApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'websites' | 'apps'>('websites');

  const loadData = async () => {
    setLoading(true);
    const pData = await db.getProjects();
    const aData = await db.getApps();
    setProjects(pData.sort((a, b) => b.createdAt - a.createdAt));
    setApps(aData.sort((a, b) => b.createdAt - a.createdAt));
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      await db.deleteProject(id);
      loadData();
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (window.confirm('Delete this app?')) {
      await db.deleteApp(id);
      loadData();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-2">
           {activeTab === 'websites' ? (
              <Link to="/admin/projects/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-700">
                <Plus className="h-4 w-4" /> New Website
              </Link>
           ) : (
              <Link to="/admin/apps/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700">
                <Plus className="h-4 w-4" /> New App
              </Link>
           )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('websites')}
          className={`pb-3 px-2 flex items-center gap-2 font-medium border-b-2 transition-colors ${activeTab === 'websites' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
        >
          <Monitor className="h-4 w-4" /> Websites ({projects.length})
        </button>
        <button 
          onClick={() => setActiveTab('apps')}
          className={`pb-3 px-2 flex items-center gap-2 font-medium border-b-2 transition-colors ${activeTab === 'apps' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
        >
          <Smartphone className="h-4 w-4" /> Mobile Apps ({apps.length})
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading data...</div>
        ) : activeTab === 'websites' ? (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3"><img src={p.imageUrl} className="w-10 h-10 rounded object-cover" alt="" /></td>
                  <td className="px-6 py-3 font-medium text-gray-900">{p.title}</td>
                  <td className="px-6 py-3">{p.category}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/projects/edit/${p.id}`} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 className="h-4 w-4" /></Link>
                      <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Icon</th>
                <th className="px-6 py-3">App Name</th>
                <th className="px-6 py-3">Downloads</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {apps.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3"><img src={a.iconUrl} className="w-10 h-10 rounded-lg object-cover" alt="" /></td>
                  <td className="px-6 py-3 font-medium text-gray-900">{a.name}</td>
                  <td className="px-6 py-3">{a.downloads}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/apps/edit/${a.id}`} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 className="h-4 w-4" /></Link>
                      <button onClick={() => handleDeleteApp(a.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
