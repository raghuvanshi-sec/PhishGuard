import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen } from 'lucide-react';

const Navbar = ({ onSectionChange, activeSection }) => {
  const [activeItem, setActiveItem] = useState(activeSection || 'Dashboard');
  const navItems = ['Dashboard', 'Threat Map', 'History', 'Settings'];

  const handleNavClick = (item) => {
    setActiveItem(item);
    onSectionChange(item);
  };

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
              onClick={() => handleNavClick(item)}
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

        <button 
          onClick={() => handleNavClick('Documentation')}
          className={`flex items-center gap-2.5 py-2 px-4.5 rounded-xl text-sm font-bold transition-all outline-none border ${
            activeItem === 'Documentation' 
              ? 'bg-primary text-white border-primary shadow-[0_2px_10px_rgba(37,99,235,0.2)]' 
              : 'text-textSecondary hover:text-textPrimary hover:bg-white/5 border-transparent'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Documentation</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
