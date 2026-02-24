import React from 'react';

const ScanTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'url', label: 'URL Scan' },
    { id: 'image', label: 'Image Analysis' },
    { id: 'email', label: 'Email Analysis' },
  ];

  return (
    <div className="flex p-1 bg-white/5 border border-white/5 rounded-xl w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-primary text-white shadow-soft'
              : 'text-textSecondary hover:text-textPrimary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ScanTabs;
