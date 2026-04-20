import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Github, User, Briefcase, Info, AlertTriangle, Cpu, Globe, Share2, Wrench, Linkedin } from 'lucide-react';
import { errorDatabase, ErrorTopic } from '../data/errorDatabase';

export default function AdminPage() {
  const [search, setSearch] = useState('');

  const filteredErrors = errorDatabase.filter(err => 
    err.code.toLowerCase().includes(search.toLowerCase()) ||
    err.title.toLowerCase().includes(search.toLowerCase()) ||
    err.description.toLowerCase().includes(search.toLowerCase()) ||
    err.category.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Hardware': return 'border-amber-500 text-amber-500 bg-amber-500/10';
      case 'Network': return 'border-rose-500 text-rose-500 bg-rose-500/10';
      case 'Deployment': return 'border-blue-500 text-blue-500 bg-blue-500/10';
      case 'Logic': return 'border-emerald-500 text-emerald-500 bg-emerald-500/10';
      default: return 'border-gray-500 text-gray-500 bg-gray-500/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hardware': return <Cpu className="w-4 h-4" />;
      case 'Network': return <Globe className="w-4 h-4" />;
      case 'Deployment': return <Share2 className="w-4 h-4" />;
      case 'Logic': return <Wrench className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pb-20">
      {/* Hero / Intro */}
      <section className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-serif italic text-white flex items-center space-x-4">
          <AlertTriangle className="w-10 h-10 text-rose-500" />
          <span>Debugging <span className="text-gray-600 font-sans not-italic">Compendium</span></span>
        </h1>
        <p className="text-gray-400 text-sm max-w-xl leading-relaxed font-mono">
          SYSTEM_ADMIN_LOG: v2.4.0 active. Searching the central repository for common hardware malfunctions, logic gates, and networking protocols.
        </p>
      </section>

      {/* Search Header */}
      <div className="sticky top-16 z-40 bg-[#050505] py-4 border-b border-[#333333]">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-purple-500 transition-colors" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search error code, keyword (MPU6050, I2C, CORS)..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#111111] border border-[#333333] focus:border-purple-500 outline-none transition-all font-mono text-sm placeholder:text-gray-700"
          />
        </div>
      </div>

      {/* The Pile - Error Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredErrors.length > 0 ? (
            filteredErrors.map((err) => (
              <motion.div
                key={err.code}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#111111] border border-[#333333] rounded-2xl overflow-hidden hover:border-white/20 transition-colors group"
              >
                <div className="p-5 border-b border-[#333333] flex justify-between items-center bg-black/20">
                  <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">{err.code}</span>
                  <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border flex items-center space-x-1.5 ${getCategoryColor(err.category)}`}>
                    {getCategoryIcon(err.category)}
                    <span>{err.category}</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-serif italic text-white group-hover:text-purple-400 transition-colors">{err.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{err.description}</p>
                  
                  <div className="pt-4 border-t border-[#333333]/50">
                    <div className="flex items-center space-x-2 mb-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                       <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Solution</span>
                    </div>
                    <p className="text-gray-200 text-sm font-mono bg-black/40 p-3 rounded border border-white/5">
                      {err.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <Search className="w-12 h-12 text-gray-800 mx-auto" />
              <p className="text-gray-600 font-mono text-sm leading-relaxed">
                NO_MATCH_FOUND. Logic gates closed. <br />
                Try searching for 'MPU6050' or 'Logic'.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Admin Info Section (Pruthvish) */}
      <section className="bg-[#111111] border border-[#333333] rounded-3xl p-8 sm:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Cpu className="w-32 h-32 text-white" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-2">
            <User className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Administrative Module</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif italic text-white tracking-tight">Pruthvish b Shetty</h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-mono">19-Year-Old Engineering Student</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-mono">Debugging Master Founder</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm max-w-lg leading-relaxed font-sans">
                A 19-year-old first-year Engineering student focused on building the 'Debugging Master' community. 
                Passionate about software debugging, hardware projects, and creating tools that simplify complex engineering concepts.
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-2">
               <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 flex items-center justify-center bg-purple-500/5 antialiased">
                 <User className="w-6 h-6 text-purple-400" />
               </div>
               <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Active Core</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Connectivity Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-12 border-t border-[#333333] space-y-10"
      >
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-serif italic text-white">Connect with the Developer</h3>
          <p className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.4em]">External Communication Modules</p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a 
            href="https://github.com/Pruthvish07" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center space-x-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-gray-800/40 hover:border-white/30 transition-all duration-300"
          >
            <Github className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-gray-300 text-xs font-mono font-bold tracking-widest group-hover:text-white uppercase transition-colors">GitHub</span>
              <span className="text-[9px] text-gray-600 group-hover:text-gray-400 font-mono transition-colors">Follow Work</span>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/pruthvish-b-shetty-eng/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center space-x-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-300"
          >
            <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-gray-300 text-xs font-mono font-bold tracking-widest group-hover:text-blue-400 uppercase transition-colors">LinkedIn</span>
              <span className="text-[9px] text-gray-600 group-hover:text-blue-300 font-mono transition-colors">Network</span>
            </div>
          </a>
        </div>
      </motion.section>

      {/* Footer Branding */}
      <footer className="text-center pt-8 border-t border-[#333333]">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.4em]">
          &copy; 2026 Admin_Panel // Built by Pruthvish b Shetty
        </p>
      </footer>
    </div>
  );
}

// Helper icon import fixing
function Code2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
