import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <span className="text-sm font-medium">© 2026 PhishGuard AI Systems. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs font-medium text-textSecondary hover:text-textPrimary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-medium text-textSecondary hover:text-textPrimary transition-colors">Terms of Service</a>
            <a href="#" className="text-xs font-medium text-textSecondary hover:text-textPrimary transition-colors">Security Certifications</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
