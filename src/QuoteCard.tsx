import React from 'react';
import type { Quote } from './components/quote';

const QuoteCard: React.FC<{ 
  quote: Quote | null; 
  loading: boolean; 
  error: string | null 
}> = ({ quote, loading, error }) => {
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

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-red-700 font-medium">{error}</p>
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
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
      <div className="relative">
        <div className="text-6xl text-blue-100 absolute -top-8 left-0 opacity-50">❝</div>
        <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed italic pl-8">
          {quote.q}
        </blockquote>
        <div className="text-6xl text-blue-100 absolute -bottom-8 right-0 opacity-50">❞</div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-gray-100">
        {/* Author section with image */}
        <div className="flex items-center justify-end space-x-4">
          <p className="text-lg md:text-xl font-semibold text-gray-800">
            — {quote.a}
          </p>
          {quote.i && (
            <img 
              src={quote.i} 
              alt={quote.a}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;