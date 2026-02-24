import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Users } from 'lucide-react';

const HeroSection = ({ children, rightContent }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="h-full w-full relative flex items-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-8"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1 max-w-3xl">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 transition-colors hover:bg-primary/15 cursor-default">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Enterprise Grade Protection</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl lg:text-[48px] font-bold tracking-tight leading-[1.1] text-textPrimary mb-4">
              Enterprise-Grade <br />
              <span className="text-primary">Phishing Protection.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-sm lg:text-[16px] text-textSecondary leading-relaxed mb-6 max-w-2xl">
              Advanced AI-powered threat intelligence designed for security operations. 
              Identify, neutralize, and audit malicious activities across your entire enterprise perimeter.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold tracking-tight">99.8% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold tracking-tight">10k+ Trust Base</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              {children}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            {rightContent}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
