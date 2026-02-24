import React from 'react';

const StatsPanel = () => {
  const stats = [
    { label: 'Detection Accuracy', value: '99.8%', trend: '+0.2%' },
    { label: 'Trust Base', value: '10k+', trend: 'Global' },
    { label: 'Scans Per Day', value: '2.4M', trend: 'Live' },
    { label: 'Secure Regions', value: '142', trend: 'Active' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-card border border-white/10 p-5 rounded-2xl group hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 cursor-default"
        >
          <div className="text-[32px] font-bold text-white mb-1 tracking-tight group-hover:text-primary transition-colors">
            {stat.value}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-textSecondary/60">{stat.label}</span>
            <span className="text-[10px] font-bold text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
