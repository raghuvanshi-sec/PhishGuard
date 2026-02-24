import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Activity, Globe } from 'lucide-react';

const StatsPanel = () => {
  const stats = [
    { icon: <ShieldCheck className="w-5 h-5 text-primary" />, label: 'Accuracy', value: '99.8%' },
    { icon: <Users className="w-5 h-5 text-accent" />, label: 'Trust Base', value: '10k+' },
    { icon: <Activity className="w-5 h-5 text-primary" />, label: 'Scans/Day', value: '2.4M' },
    { icon: <Globe className="w-5 h-5 text-accent" />, label: 'Regions', value: '140+' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * index }}
          className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all group"
        >
          <div className="mb-3">{stat.icon}</div>
          <div className="text-xl font-bold text-textPrimary mb-1">{stat.value}</div>
          <div className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsPanel;
