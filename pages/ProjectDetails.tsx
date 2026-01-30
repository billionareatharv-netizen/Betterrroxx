import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, Layers, Calendar, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { db } from '../services/db';
import { Project } from '../types';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | undefined>();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

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

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (project?.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (project?.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Project not found</h1>
        <Link to="/projects" className="text-indigo-600 font-medium hover:underline">Back to Projects</Link>
      </div>
    );
  }

  const allImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.imageUrl];
  const currentImage = allImages[currentImageIndex];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24">
      
      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowLightbox(false)}>
          <button onClick={() => setShowLightbox(false)} className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full">
            <Layers className="h-8 w-8 rotate-45" /> {/* Close icon */}
          </button>
          
          <button onClick={prevImage} className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full">
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <img src={currentImage} alt="Full view" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          
          <button onClick={nextImage} className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors group"
          >
            <div className="p-2 bg-white rounded-lg border border-gray-200 group-hover:border-indigo-200 transition-colors shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Projects
          </Link>
          <span className="hidden sm:block text-slate-400 text-sm font-medium">
            Projects / {project.category} / <span className="text-slate-900">{project.title}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Slider / Gallery */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-hidden relative group">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src={currentImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                {/* Slider Controls */}
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* View Fullscreen Button */}
                <button 
                  onClick={() => setShowLightbox(true)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-indigo-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Project</h2>
              <div className="prose prose-lg text-slate-600 max-w-none leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </div>
            </div>
          </div>

          {/* Sidebar Column (Right) - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              
              {/* Info Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-indigo-100/50 border border-gray-100 p-6 sm:p-8">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                    {project.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{project.title}</h1>
                  <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Built in {new Date(project.createdAt).getFullYear()}
                  </p>
                </div>

                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-1 mb-8"
                  >
                    Visit Live Website <ExternalLink className="h-5 w-5" />
                  </a>
                )}

                {/* Features List */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                           <Check className="h-3 w-3" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact CTA Mini */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-center text-white shadow-xl">
                <h3 className="font-bold text-lg mb-2">Want a site like this?</h3>
                <p className="text-indigo-200 text-sm mb-4">I can build a similar solution for your business.</p>
                <Link to="/contact" className="inline-block bg-white text-indigo-900 px-6 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors w-full">
                  Get a Quote
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};