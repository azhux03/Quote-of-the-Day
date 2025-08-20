import React from 'react';
import type { Quote } from './components/quote';

interface RandomQuotesCard {
  quotes: Quote[];
  loading: boolean;
  errorRandom: string | null;
  onRefresh: () => void;
}

const RandomQuotes: React.FC<RandomQuotesCard> = ({ quotes, loading, errorRandom, onRefresh }) => {

  // --- Loading State ---
  if (loading) {
    return (
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">More Quotes</h2>
          <button
            disabled
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg opacity-50 flex items-center space-x-2"
          >
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Refreshing...</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(3).fill(null).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="flex items-center mt-6 space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (errorRandom) {
    return (
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">More Quotes</h2>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Refresh Quotes</span>
          </button>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-red-700 font-medium">{errorRandom}</p>
        </div>
      </div>
    );
  }
  
  else if (!quotes || quotes.length === 0) {
    return (
      <div className="mt-16 text-center text-gray-500">
        <p>No quotes available</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">More Quotes</h2>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>Refresh Quotes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
          >
            <blockquote className="text-gray-700 italic mb-4 line-clamp-6 flex-grow">
              "{quote.q}"
            </blockquote>

            {/* Author pinned to bottom */}
            <div className="flex items-center justify-end space-x-3 mt-auto">
              <p className="font-medium text-gray-800 text-sm">— {quote.a}</p>
              {quote.i && (
                <img
                  src={quote.i}
                  alt={quote.a}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://zenquotes.io/img/unknown.jpg";
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default RandomQuotes;
