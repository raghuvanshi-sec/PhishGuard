import { Search, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const ScanInput = ({ activeTab, onScan, isScanning }) => {
  const getPlaceholder = () => {
    switch (activeTab) {
      case 'url': return 'Enter enterprise domain or URL for rapid analysis...';
      case 'image': return 'Attach security screenshot or paste resource URL...';
      case 'email': return 'Paste raw email headers or body content...';
      default: return 'Enter data to analyze...';
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-textSecondary group-focus-within:text-primary transition-colors duration-200" />
        </div>
        <input
          type="text"
          disabled={isScanning}
          className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-xl pl-14 pr-44 text-textPrimary placeholder:text-textSecondary/30 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-200 text-base disabled:opacity-50"
          placeholder={isScanning ? 'Analyzing enterprise threat vectors...' : getPlaceholder()}
        />
        <div className="absolute inset-y-2 right-2">
          <button 
            onClick={onScan}
            disabled={isScanning}
            className="h-full bg-primary hover:bg-primary/90 text-white px-8 rounded-lg font-bold flex items-center gap-2 transition-all duration-200 shadow-soft active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px] justify-center"
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
                <ArrowRight className="h-4 w-4 text-white/80" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanInput;
