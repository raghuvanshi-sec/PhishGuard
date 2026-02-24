import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, BarChart3, Fingerprint, ShieldCheck, Activity } from 'lucide-react';

const AnalysisModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  // Mock data if none provided (for UI development)
  const analysisData = data || {
    ml_score: 0.942,
    rule_score: 0.82,
    features: [
      { name: 'URL Entropy', value: 'High (4.82)', status: 'flag' },
      { name: 'Domain Age', value: '14 Days', status: 'critical' },
      { name: 'SSL Certificate', value: 'Let\'s Encrypt', status: 'warning' },
      { name: 'String Similarity', value: '92% to Chase.com', status: 'flag' },
      { name: 'Top-Level Domain', value: '.bank (Suspicious)', status: 'warning' },
    ]
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-2xl bg-card border border-white/10 rounded-3xl shadow-[0_32px_128px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">AI Forensics Report</h2>
                <p className="text-xs text-textSecondary uppercase tracking-widest font-bold mt-0.5">ML Analysis ID: PG-8821-X</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-textSecondary hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* ML Engine Score */}
              <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -mr-12 -mt-12 transition-all group-hover:bg-primary/10" />
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-textSecondary">ML Confidence</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white tracking-tight">
                    {(analysisData.ml_score * 100).toFixed(1)}%
                  </span>
                  <span className="text-sm font-bold text-primary mb-1.5 uppercase">AI Match</span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisData.ml_score * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              {/* Heuristic Score */}
              <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-3xl -mr-12 -mt-12 transition-all group-hover:bg-amber-500/10" />
                <div className="flex items-center gap-3 mb-4">
                  <Fingerprint className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-textSecondary">Rule Match</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white tracking-tight">
                    {(analysisData.rule_score * 100).toFixed(1)}%
                  </span>
                  <span className="text-sm font-bold text-amber-500 mb-1.5 uppercase">Heuristic</span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisData.rule_score * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Feature Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-textPrimary">Attribute Analysis</h3>
              </div>
              
              <div className="grid gap-3">
                {analysisData.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-textSecondary/60 uppercase tracking-tighter mb-0.5">{feature.name}</span>
                      <span className="text-sm font-semibold text-textPrimary">{feature.value}</span>
                    </div>
                    <div className={`
                      px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest
                      ${feature.status === 'critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                        feature.status === 'flag' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-500 border border-blue-500/20'}
                    `}>
                      {feature.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Verified by Detection Core v4.2
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all active:scale-95"
            >
              Close Analysis
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AnalysisModal;
