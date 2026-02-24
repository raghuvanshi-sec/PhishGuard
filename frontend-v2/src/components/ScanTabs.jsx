import React from 'react';
import { Link2, Image, Mail } from 'lucide-react'; // Assuming these icons are imported from lucide-react or similar

const ScanTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'url', label: 'URL Scanning', icon: <Link2 className="w-4 h-4" /> },
    { id: 'image', label: 'Image Analysis', icon: <Image className="w-4 h-4" /> },
    { id: 'email', label: 'Email Forensics', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="flex bg-black/40 p-1.5 rounded-[14px] border border-white/5 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${activeTab === tab.id
              ? 'bg-primary/15 text-white shadow-[0_2px_12px_rgba(0,0,0,0.3)] ring-1 ring-primary/20'
              : 'text-textSecondary hover:text-textPrimary hover:bg-white/5'}
          `}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ScanTabs;
