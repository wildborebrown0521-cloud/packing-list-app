import { useEffect } from 'react';
import PackingListManager from './components/PackingListManager';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('SW registered'))
        .catch(error => console.log('SW registration failed:', error));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PackingListManager />
    </div>
  );
}

export default App;
