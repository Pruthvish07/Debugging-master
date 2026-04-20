import { Link, useLocation } from 'react-router-dom';
import { Home, Terminal, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function NavBar() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/admin', label: 'Admin / Tips', icon: ShieldAlert },
  ];

  return (
    <nav className="w-full max-w-3xl border-b border-[#333333] mb-8 bg-[#111111]/30 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-purple-500" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-gray-400">Master.Sys</span>
        </div>
        
        <div className="flex items-center space-x-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-1.5 group"
              >
                <div className={`flex items-center space-x-2 text-xs uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : ''}`} />
                  <span className="font-medium">{link.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
