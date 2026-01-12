import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, Layers } from 'lucide-react';
import { db } from '../services/db';
import { Project } from '../types';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const data = await db.getProjectById(id);
        setProject(data);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!project) return <div className="min-h-screen flex flex-col items-center justify-center gap-4"><h1>Project not found</h1><Link to="/projects" className="text-indigo-600">Back to Projects</Link></div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Image */}
      <div className="h-[40vh] md:h-[50vh] w-full relative bg-gray-900">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center px-4">{project.title}</h1>
        </div>
        {/* Adjusted top position for mobile to clear the fixed navbar */}
        <Link to="/projects" className="absolute top-24 md:top-28 left-6 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm transition-all z-10">
          <ArrowLeft className="h-5 w-5" /> Back
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-semibold mb-3">
                {project.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
            </div>
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                Visit Live Site <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="prose prose-lg text-gray-600 mb-12">
            <p className="whitespace-pre-line">{project.fullDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" /> Key Features
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full mt-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-500" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-12">
             <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {project.gallery.map((img, idx) => (
                 <img key={idx} src={img} alt={`Gallery ${idx}`} className="rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer" />
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
