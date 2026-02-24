import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navItems = ['Dashboard', 'Threat Map', 'History', 'Settings'];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group">
          <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold tracking-tight text-textPrimary">PhishGuard</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveItem(item)}
              className={`text-sm font-medium transition-colors relative ${
                activeItem === item ? 'text-textPrimary' : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              {item}
              {activeItem === item && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium text-textSecondary hover:text-textPrimary hover:bg-white/5 transition-all outline-none">
          <BookOpen className="w-4 h-4" />
          <span>Documentation</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
