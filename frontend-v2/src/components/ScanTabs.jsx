import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Image as ImageIcon, Mail } from 'lucide-react';

const ScanTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'url', label: 'URL Scanning', icon: <Link2 className="w-4 h-4" /> },
    { id: 'image', label: 'Image Analysis', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'email', label: 'Email Forensics', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="flex bg-black/40 p-1.5 rounded-[14px] border border-white/5 w-fit relative">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 z-10
            ${activeTab === tab.id ? 'text-white' : 'text-textSecondary hover:text-textPrimary'}
          `}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary/15 ring-1 ring-primary/20 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
              transition={{ type: "spring", bounce: 0, duration: 0.25 }}
            />
          )}
          <span className="relative z-20 flex items-center gap-2.5">
            {tab.icon}
            <span>{tab.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default ScanTabs;
