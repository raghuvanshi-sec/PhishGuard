import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScanTabs from './components/ScanTabs';
import ScanInput from './components/ScanInput';
import ThreatResultCard from './components/ThreatResultCard';
import StatsPanel from './components/StatsPanel';
import Footer from './components/Footer';
import ThreatMap from './components/ThreatMap';
import Docs from './components/Docs';

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('url');
  const [isScanning, setIsScanning] = useState(false);
  const [isProtected, setIsProtected] = useState(true);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Threat Map':
        return (
          <div className="container mx-auto px-6 py-24">
            <div className="mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Global Threat Intelligence</h1>
              <p className="text-textSecondary text-lg">Real-time monitoring of malicious activities across the PhishGuard network.</p>
            </div>
            <ThreatMap />
          </div>
        );
      case 'Documentation':
        return (
          <div className="container mx-auto px-6 py-24">
            <Docs />
          </div>
        );
      case 'History':
      case 'Settings':
        return (
          <div className="container mx-auto px-6 py-48 text-center">
            <h2 className="text-2xl font-bold text-textSecondary mb-4">{activeSection} Module</h2>
            <p className="text-textSecondary/60 italic">This module is currently being optimized for enterprise scale.</p>
            <button 
              onClick={() => setActiveSection('Dashboard')}
              className="mt-8 text-primary hover:underline font-medium"
            >
              Return to Dashboard
            </button>
          </div>
        );
      default:
        return (
          <>
            <HeroSection>
              <div className="flex flex-col gap-8">
                <ScanTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <ScanInput activeTab={activeTab} onScan={handleScan} isScanning={isScanning} />
                
                <div className="lg:hidden mt-8">
                  <ThreatResultCard isProtected={isProtected} onToggleProtect={() => setIsProtected(!isProtected)} />
                </div>
                
                <div className="mt-4">
                  <StatsPanel />
                </div>
              </div>
            </HeroSection>

            {/* Desktop floating threat card section */}
            <div className="hidden lg:block fixed top-1/2 right-[10%] transform -translate-y-[40%] z-10 transition-all duration-500">
              <ThreatResultCard isProtected={isProtected} onToggleProtect={() => setIsProtected(!isProtected)} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">
      <Navbar onSectionChange={setActiveSection} activeSection={activeSection} />
      
      <main className="pt-16">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
