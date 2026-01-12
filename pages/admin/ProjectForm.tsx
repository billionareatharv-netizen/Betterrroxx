import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, X } from 'lucide-react';
import { db } from '../../services/db';
import { Project, Category } from '../../types';

export const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'Gym',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
    gallery: [],
    technologies: [],
    features: [],
    demoUrl: ''
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      const loadProject = async () => {
        const data = await db.getProjectById(id);
        if (data) setFormData(data);
      };
      loadProject();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayAdd = (field: 'technologies' | 'features', value: string, setter: (val: string) => void) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()]
    }));
    setter('');
  };

  const handleArrayRemove = (field: 'technologies' | 'features', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  // Mock Image Upload logic for demonstration
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, upload to Firebase Storage here and get URL
      // For this demo, we create a local object URL
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, imageUrl: url });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        await db.updateProject(id, formData);
      } else {
        await db.addProject(formData as Project);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error saving project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/dashboard')} className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Gym">Gym</option>
                <option value="Retail">Retail</option>
                <option value="Salon">Salon</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
             <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
               {formData.imageUrl ? (
                 <div className="relative">
                   <img src={formData.imageUrl} alt="Preview" className="h-48 w-full object-cover rounded-md" />
                   <button 
                    type="button" 
                    onClick={() => setFormData({...formData, imageUrl: ''})}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                   >
                     <X className="h-4 w-4"/>
                   </button>
                 </div>
               ) : (
                 <div className="py-8">
                   <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                   />
                   <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 5MB</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            required
            maxLength={150}
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-xs text-gray-400 mt-1">Shown on the project card.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
          <textarea
            name="fullDescription"
            rows={5}
            required
            value={formData.fullDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('technologies', techInput, setTechInput))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. React"
              />
              <button 
                type="button"
                onClick={() => handleArrayAdd('technologies', techInput, setTechInput)}
                className="bg-gray-100 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies?.map((tech, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {tech}
                  <button type="button" onClick={() => handleArrayRemove('technologies', i)}><X className="h-3 w-3"/></button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('features', featureInput, setFeatureInput))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. SEO Optimized"
              />
              <button 
                type="button"
                onClick={() => handleArrayAdd('features', featureInput, setFeatureInput)}
                className="bg-gray-100 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features?.map((feat, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                  {feat}
                  <button type="button" onClick={() => handleArrayRemove('features', i)}><X className="h-3 w-3"/></button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-70"
          >
            <Save className="h-5 w-5" />
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>

      </form>
    </div>
  );
};
