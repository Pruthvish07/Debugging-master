import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import AdminPage from './pages/Admin';
import { Code2 } from 'lucide-react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-[#e5e5e5] flex flex-col items-center py-6 sm:py-10 px-4 font-sans selection:bg-purple-500/30">
        <header className="mb-4 flex items-center space-x-3 w-full max-w-3xl border-b border-[#333333] pb-4">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-bold">Node_Terminal</span>
            <h1 className="text-3xl sm:text-4xl font-serif italic text-white flex items-center space-x-3">
              <Code2 className="w-8 h-8 text-purple-500" />
              <span>DebugMaster <span className="text-gray-600 font-sans not-italic text-2xl drop-shadow-sm">v2</span></span>
            </h1>
          </div>
        </header>

        <NavBar />

        <main className="w-full max-w-3xl flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
