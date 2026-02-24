import React from 'react';
import { motion } from 'framer-motion';

const StatsPanel = () => {
  const stats = [
    { label: 'Detection Accuracy', value: '99.8%', trend: '+0.2%' },
    { label: 'Trust Base', value: '10k+', trend: 'Global' },
    { label: 'Scans Per Day', value: '2.4M', trend: 'Live' },
    { label: 'Secure Regions', value: '142', trend: 'Active' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
          className="bg-card border border-white/10 p-5 rounded-2xl group hover:-translate-y-[3px] hover:border-primary/30 hover:shadow-lg transition-all duration-200 ease-in-out cursor-default"
        >
          <div className="text-[32px] font-bold text-white mb-1 tracking-tight group-hover:text-primary transition-colors duration-200">
            {stat.value}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-textSecondary/60">{stat.label}</span>
            <span className="text-[10px] font-bold text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">{stat.trend}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsPanel;
