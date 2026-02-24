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
    <div className="w-full max-w-[400px] glass p-6 rounded-2xl shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Threat Assessment</h3>
        <span className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-full border border-red-500/20 uppercase tracking-wider">
          High Risk
        </span>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="364.4"
              initial={{ strokeDashoffset: 364.4 }}
              animate={{ strokeDashoffset: 364.4 * (1 - 0.82) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-red-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold">82%</span>
            <span className="text-[10px] text-textSecondary font-bold uppercase tracking-tight">Threat Score</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs font-semibold text-textSecondary uppercase tracking-widest mb-2">Detected Anomalies</div>
        {issues.map((issue, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <span className="text-sm text-textSecondary leading-tight">{issue}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className={`w-4 h-4 transition-colors ${isProtected ? 'text-primary' : 'text-textSecondary'}`} />
            <span className="text-sm font-medium">Automatic Protection</span>
          </div>
          <button 
            onClick={onToggleProtect}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isProtected ? 'bg-primary' : 'bg-white/10'}`}
          >
            <motion.div 
              animate={{ x: isProtected ? 24 : 4 }}
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
