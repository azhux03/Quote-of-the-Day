import QuoteCard from './QuoteCard';
import useQuote from './components/useQuote';

function App() {
  const { quote, loading, error } = useQuote();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Quote of the Day
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Todays quote
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </header>
        
        <main>
          <QuoteCard quote={quote} loading={loading} error={error} />
        </main>
        
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>Quote app</p>
        </footer>
      </div>
    </div>
  );
}

export default App;