import React from 'react';
import { Instagram } from 'lucide-react';

export const StickyInstagram: React.FC = () => {
  return (
    <a
      href="https://www.instagram.com/betterr_roxx/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center justify-center bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white"
      title="Chat on Instagram"
    >
      <Instagram className="h-7 w-7" />
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        DM Me on Instagram
      </span>
    </a>
  );
};