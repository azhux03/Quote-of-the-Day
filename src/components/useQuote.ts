import { useState, useEffect } from 'react';
import type { Quote } from './quote';

const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [randomQuotes, setRandomQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [randomLoading, setRandomLoading] = useState(false);
  const [errorDaily, setErrorDaily] = useState<string | null>(null);
  const [errorRandom, setErrorRandom] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyQuote = async () => {
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
        
        if (response.ok && data && data[0]) {
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
        }
      } catch (err) {
        setErrorDaily('Failed to fetch quote');
      } finally {
        setLoading(false);
      }
    };

    fetchDailyQuote();
  }, []);

  // Fetch random quotes
  const fetchRandomQuotes = async () => {
    try {
      setRandomLoading(true);
      
      // Fetch 3 random quotes
      const promises = Array(3).fill(null).map(() => 
        fetch('https://corsproxy.io/?https://zenquotes.io/api/random').then(async res => {
          if (res.ok) {
            const data = await res.json();
            // Check if data is valid
            if (data && data[0]) {
              return data;
            }
          }
          throw new Error('Failed to fetch');
        })
      );
      
      const results = await Promise.all(promises);
      if (results){
        const randomQuotesData: Quote[] = results.map(data => ({
          q: data[0].q,
          a: data[0].a,
          i: `https://zenquotes.io/img/${data[0].a.toLowerCase().replace(/\s+/g, "-")}.jpg`
        }));
        setRandomQuotes(randomQuotesData);
      }
      else{
        // Set fallback quotes
        setRandomQuotes([
        { q: "Try again later, too many requests",
            a: "",
            i: "" },
        { q: "Try again later, too many requests",
            a: "",
            i: "" },
        { q: "Try again later, too many requests",
            a: "",
            i: "" }
      ]);
      }
    } catch (err) {
      setErrorRandom('Failed to fetch random quotes');
    } finally {
      setRandomLoading(false);
    }
  };

  // Fetch random quotes on component mount
  useEffect(() => {
    fetchRandomQuotes();
  }, []);

  return { quote, randomQuotes, loading, randomLoading, errorDaily, errorRandom, fetchRandomQuotes };
};


export default useQuote;