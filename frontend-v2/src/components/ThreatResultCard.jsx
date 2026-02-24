import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

const ThreatResultCard = ({ isProtected, onToggleProtect }) => {
  const issues = [
    'Suspicious domain TLD detected',
    'AI detected logo spoofing pattern',
    'Invalid SSL certificate chain',
  ];

  return (
    <div className="w-full max-w-[400px] bg-card border border-white/10 p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] relative overflow-hidden">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-textSecondary">Threat Assessment</h3>
        <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold rounded-full border border-red-500/20 uppercase tracking-widest">
          High Risk
        </span>
      </div>

      <div className="flex flex-col items-center mb-10 relative z-10">
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="72"
              cy="72"
              r="64"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray="402"
              initial={{ strokeDashoffset: 402 }}
              animate={{ strokeDashoffset: 402 * (1 - 0.82) }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className="text-red-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold tracking-tight text-white leading-none">82%</span>
            <span className="text-[9px] font-bold text-textSecondary uppercase tracking-[0.2em] mt-2">Threat Score</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mb-4">Anomalies Detected</div>
        {issues.map((issue, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl group hover:bg-white/[0.05] transition-colors duration-200">
            <AlertCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
            <span className="text-sm text-textSecondary leading-tight group-hover:text-textPrimary transition-colors">{issue}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-white/5 relative z-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={onToggleProtect}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
          >
            <div className={`p-1.5 rounded-lg transition-colors ${isProtected ? 'bg-primary/10 text-primary' : 'bg-white/5 text-textSecondary'}`}>
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-textPrimary group-hover:text-white transition-colors">Automatic Protection</span>
          </button>
          
          <button 
            onClick={onToggleProtect}
            className={`w-12 h-6 rounded-full relative transition-all duration-300 ease-in-out ${isProtected ? 'bg-primary shadow-[0_0_12px_rgba(37,99,235,0.3)]' : 'bg-white/10 ring-1 ring-white/5'}`}
          >
            <motion.div 
              animate={{ x: isProtected ? 26 : 4 }}
              initial={false}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreatResultCard;
