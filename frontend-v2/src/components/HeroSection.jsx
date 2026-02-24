import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Users } from 'lucide-react';

const HeroSection = ({ children }) => {
  return (
    <section className="pt-32 pb-20 overflow-hidden relative">
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <div className="flex-1 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-colors hover:bg-primary/15 cursor-default">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Enterprise Grade Protection</span>
              </div>
              <h1 className="text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.1] text-textPrimary mb-6">
                Enterprise-Grade <br />
                <span className="text-primary">Phishing Protection.</span>
              </h1>
              <p className="text-lg lg:text-[18px] text-textSecondary leading-relaxed mb-8 max-w-2xl">
                Advanced AI-powered threat intelligence designed for security operations. 
                Identify, neutralize, and audit malicious activities across your entire enterprise perimeter.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold tracking-tight">99.8% Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold tracking-tight">10k+ Trust Base</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2 px-4 bg-white/[0.03] border border-white/[0.05] rounded-lg w-fit">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-textSecondary">Integrations</span>
                  <div className="w-px h-3 bg-white/10 mx-1"></div>
                  <span className="text-xs font-medium text-textSecondary/80 italic">SIEM, Slack, and Microsoft Defender ready</span>
                </div>
              </div>

              <div className="mt-12">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
