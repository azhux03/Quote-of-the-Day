import React from 'react';
import type { Quote } from './components/quote';

const QuoteCard: React.FC<{ 
  quote: Quote | null; 
  loading: boolean; 
  errorDaily: string | null 
}> = ({ quote, loading, errorDaily }) => {
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
        <div className="space-y-6">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 ml-auto mt-8"></div>
        </div>
      </div>
    );
  }

  if (errorDaily) {
    return (
      <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <p className="text-red-700 font-medium">{errorDaily}</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-12 text-center">
        <p className="text-gray-500">No quote available</p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-10 md:p-16 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
      <div className="relative">
        <div className="text-7xl text-blue-100 absolute -top-10 left-0 opacity-50 select-none">❝</div>
        
        <blockquote className="text-2xl md:text-3xl text-gray-700 leading-relaxed italic pl-10 transition-colors duration-300 hover:text-gray-900">
          {quote.q}
        </blockquote>
        
        <div className="text-7xl text-blue-100 absolute -bottom-10 right-0 opacity-50 select-none">❞</div>
      </div>

      <div className="mt-14 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-end space-x-4">
          <p className="text-xl md:text-2xl font-semibold text-gray-800 transition-colors duration-300 hover:text-gray-900">
            — {quote.a}
          </p>
          {quote.i && (
            <img 
              src={quote.i} 
              alt={quote.a}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onError={(e) => {
                e.currentTarget.src = "https://zenquotes.io/img/unknown.jpg";
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

};

export default QuoteCard;