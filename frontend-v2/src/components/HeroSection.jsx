import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ children }) => {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-textPrimary leading-[1.1]">
              AI-Powered <br />
              <span className="text-primary">Phishing Detection</span> <br />
              for Enterprise.
            </h1>
            <p className="text-lg text-textSecondary max-w-[540px] leading-relaxed">
              Secure your organization with advanced URL scanning, image analysis, and email forensics driven by proprietary AI models.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-textSecondary/80">
              <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></span>
              Trusted by 10,000+ users • 99.8% detection accuracy
            </div>
            
            <div className="mt-8">
              {children}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* The ThreatResultCard will be passed as a child or placed here */}
            <div id="stats-placeholder"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
