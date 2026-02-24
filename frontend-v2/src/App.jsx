import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScanTabs from './components/ScanTabs';
import ScanInput from './components/ScanInput';
import ThreatResultCard from './components/ThreatResultCard';
import StatsPanel from './components/StatsPanel';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('url');
  const [isScanning, setIsScanning] = useState(false);
  const [isProtected, setIsProtected] = useState(true);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main>
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

        {/* Desktop floating threat card section - positioned via HeroSection children or absolute */}
        <div className="hidden lg:block fixed top-1/2 right-[10%] transform -translate-y-[40%] z-10 transition-all duration-500">
          <ThreatResultCard isProtected={isProtected} onToggleProtect={() => setIsProtected(!isProtected)} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
