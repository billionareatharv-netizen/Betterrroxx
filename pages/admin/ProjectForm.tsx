import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, X, UploadCloud } from 'lucide-react';
import { db } from '../../services/db';
import { Project } from '../../types';

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

  // UPDATED: Convert file to Base64 string for localStorage persistence
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to ~800KB for localStorage safety)
      if (file.size > 800 * 1024) {
        alert("File is too large! Please upload an image under 800KB for this demo.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // UPDATED: Handle Gallery Uploads
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Cast Array.from result to File[] to avoid 'unknown' type inference on file variable
      (Array.from(files) as File[]).forEach(file => {
         if (file.size > 800 * 1024) return; // Skip large files
         const reader = new FileReader();
         reader.onloadend = () => {
           if (reader.result) {
             setFormData(prev => ({
               ...prev,
               gallery: [...(prev.gallery || []), reader.result as string]
             }));
           }
         };
         reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index)
    }));
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
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/dashboard')} className="text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
        
        {/* Main Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g. Modern Gym Website"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white"
                >
                  <option value="Gym">Gym</option>
                  <option value="Retail">Retail</option>
                  <option value="Salon">Salon</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
               <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Live Demo URL</label>
                <input
                  type="url"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
              <textarea
                name="shortDescription"
                required
                rows={3}
                maxLength={150}
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                placeholder="Brief summary for the card view..."
              />
            </div>
          </div>

          <div className="space-y-4">
             <label className="block text-sm font-semibold text-gray-700">Cover Image</label>
             <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-all relative group h-64 flex flex-col items-center justify-center">
               {formData.imageUrl ? (
                 <>
                   <img src={formData.imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <button 
                        type="button" 
                        onClick={() => setFormData({...formData, imageUrl: ''})}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-red-600 transition-colors"
                      >
                        Remove Image
                      </button>
                   </div>
                 </>
               ) : (
                 <div className="pointer-events-none">
                   <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600">
                     <UploadCloud className="h-8 w-8"/>
                   </div>
                   <p className="text-sm font-medium text-gray-600">Click to upload cover</p>
                   <p className="text-xs text-gray-400 mt-1">Max size 800KB</p>
                 </div>
               )}
               <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${formData.imageUrl ? 'hidden' : ''}`}
               />
             </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Description</label>
          <textarea
            name="fullDescription"
            rows={6}
            required
            value={formData.fullDescription}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Detailed case study of the project..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Technologies Used</label>
            <div className="flex gap-2 mb-4">
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
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies?.map((tech, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm shadow-sm">
                  {tech}
                  <button type="button" onClick={() => handleArrayRemove('technologies', i)} className="text-gray-400 hover:text-red-500"><X className="h-3 w-3"/></button>
                </span>
              ))}
              {formData.technologies?.length === 0 && <p className="text-xs text-gray-400 italic">No technologies added.</p>}
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Key Features</label>
            <div className="flex gap-2 mb-4">
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
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features?.map((feat, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm shadow-sm">
                  {feat}
                  <button type="button" onClick={() => handleArrayRemove('features', i)} className="text-gray-400 hover:text-red-500"><X className="h-3 w-3"/></button>
                </span>
              ))}
               {formData.features?.length === 0 && <p className="text-xs text-gray-400 italic">No features added.</p>}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-semibold text-gray-700">Project Gallery</label>
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryUpload} />
              + Add Images
            </label>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.gallery?.map((img, idx) => (
              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {(!formData.gallery || formData.gallery.length === 0) && (
              <div className="col-span-full py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-400 text-sm">
                No gallery images yet.
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 transform hover:-translate-y-0.5"
          >
            <Save className="h-5 w-5" />
            {loading ? 'Saving Project...' : 'Save Project'}
          </button>
        </div>

      </form>
    </div>
  );
};