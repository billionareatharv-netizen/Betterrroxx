import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, UploadCloud } from 'lucide-react';
import { db } from '../../services/db';
import { MobileApp } from '../../types';

export const AppForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<MobileApp>>({
    name: '',
    tagline: '',
    description: '',
    iconUrl: '',
    screenshots: [],
    rating: 4.5,
    downloads: '1k+',
    size: '15 MB',
    category: 'Business',
    downloadUrl: '#'
  });

  useEffect(() => {
    if (isEditing && id) {
      db.getAppById(id).then(data => { if(data) setFormData(data) });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setFormData({ ...formData, iconUrl: reader.result as string });
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && id) await db.updateApp(id, formData);
      else await db.addApp(formData as MobileApp);
      navigate('/admin/dashboard');
    } catch(e) { alert('Error'); } 
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/dashboard')} className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit App' : 'New App'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
        
        <div className="flex items-center gap-6">
           <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 border border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group">
              {formData.iconUrl ? <img src={formData.iconUrl} className="w-full h-full object-cover" /> : <UploadCloud className="text-gray-400" />}
              <input type="file" onChange={handleIconUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
           </div>
           <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">App Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Hotel Pro" />
           </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tagline</label>
            <input name="tagline" value={formData.tagline} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Short catchphrase" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <input name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Size</label>
                <input name="size" value={formData.size} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="20 MB" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Rating</label>
                <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Downloads</label>
                <input name="downloads" value={formData.downloads} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="10k+" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Description</label>
            <textarea name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" ></textarea>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">
           {loading ? 'Saving...' : 'Save App'}
        </button>

      </form>
    </div>
  );
};
