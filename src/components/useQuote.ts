import { useState, useEffect } from 'react';
import type { Quote } from './quote';

const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        // Check localStorage first
        const cachedQuote = localStorage.getItem('dailyQuote');
        const cacheTimestamp = localStorage.getItem('quoteTimestamp');
        // Use cached quote if it's from today

        if (cachedQuote && cacheTimestamp) {
          const now = new Date();

          // Today’s reset time at 00:00 UTC
          const todayResetUTC = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate()
          );
          const cacheTime = parseInt(cacheTimestamp);
          if (cacheTime >= todayResetUTC) {
            setQuote(JSON.parse(cachedQuote));
            setLoading(false);
            return;
          }
        }
        
        // Fetch new quote if no cache or cache is old
        const response = await fetch('https://corsproxy.io/?https://zenquotes.io/api/today');
        const data = await response.json();
        
        if (response.ok) {
          const quoteData = {
            q: data[0].q,
            a: data[0].a,
            i: `https://zenquotes.io/img/${data[0].a.toLowerCase().replace(/\s+/g, "-")}.jpg`
          }
          localStorage.setItem('dailyQuote', JSON.stringify(quoteData));
          localStorage.setItem('quoteTimestamp', Date.now().toString());
          setQuote(quoteData);
        } else {
          // Fallback quote
          const fallbackQuote = {
            q: "Try again later, too many requests",
            a: "",
            i: ""
          };
          setQuote(fallbackQuote);
          setError("Using backup quote");
        }
      } catch (err) {
        setError('Failed to fetch quote');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return { quote, loading, error };
};

export default useQuote;