import QuoteCard from './QuoteCard';
import useQuote from './components/useQuote';
import RandomQuotesCard from './RandomQuotesCard';

function App() {
  const { quote, randomQuotes, loading, randomLoading, errorDaily, errorRandom, fetchRandomQuotes } = useQuote();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-4">
            Quote of the Day
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Quote Resets at 00:00 UTC
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-6 rounded-full"></div>
        </header>
        
        <main>
          <QuoteCard quote={quote} loading={loading} errorDaily={errorDaily} />
          <RandomQuotesCard 
            quotes={randomQuotes} 
            loading={randomLoading}
            errorRandom={errorRandom}
            onRefresh={fetchRandomQuotes} 
          />
        </main>
        
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>Quote app</p>
        </footer>
      </div>
    </div>
  );
}

export default App;