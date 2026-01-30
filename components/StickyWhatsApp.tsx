import React from 'react';
import { MessageCircle } from 'lucide-react';

export const StickyWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/15550000000" // Replace with actual number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 group animate-bounce-slow"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
        Chat with Us
      </span>
    </a>
  );
};
