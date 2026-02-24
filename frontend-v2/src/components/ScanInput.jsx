import React from 'react';
import { Search, ArrowRight, Activity } from 'lucide-react';

const ScanInput = ({ activeTab, onScan, isScanning }) => {
  const getPlaceholder = () => {
    switch (activeTab) {
      case 'url': return 'Enter URL to scan for phishing...';
      case 'image': return 'Upload or paste image URL...';
      case 'email': return 'Paste email headers or content...';
      default: return 'Enter data to analyze...';
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-textSecondary group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          disabled={isScanning}
          className="w-full bg-card border border-white/10 rounded-xl py-4 pl-12 pr-32 text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-base disabled:opacity-50"
          placeholder={isScanning ? 'Analyzing threats...' : getPlaceholder()}
        />
        <div className="absolute inset-y-1.5 right-1.5">
          <button 
            onClick={onScan}
            disabled={isScanning}
            className="h-full bg-primary hover:bg-primary/90 text-white px-6 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-soft active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
          >
            {isScanning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Activity className="h-4 w-4" />
              </motion.div>
            ) : (
              <>
                <span>Scan Now</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanInput;
