import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScanTabs from './components/ScanTabs';
import ScanInput from './components/ScanInput';
import ThreatResultCard from './components/ThreatResultCard';
import StatsPanel from './components/StatsPanel';
import Footer from './components/Footer';
import ThreatMap from './components/ThreatMap';
import Docs from './components/Docs';
import History from './components/History';
import Settings from './components/Settings';
import AnalysisModal from './components/AnalysisModal';

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('url');
  const [isScanning, setIsScanning] = useState(false);
  const [isProtected, setIsProtected] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setHasScanned(false);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 2000);
  };

  const openAnalysis = () => setIsModalOpen(true);

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
        return (
          <div className="container mx-auto px-6 py-24">
            <History />
          </div>
        );
      case 'Settings':
        return (
          <div className="container mx-auto px-6 py-24">
            <Settings />
          </div>
        );
      default:
        return (
          <>
            <HeroSection
              rightContent={
                <div className="hidden lg:block w-full max-w-[400px]">
                  {hasScanned ? (
                    <ThreatResultCard
                      isProtected={isProtected}
                      onToggleProtect={() => setIsProtected(!isProtected)}
                      onViewAnalysis={openAnalysis}
                    />
                  ) : (
                    <div className="h-[450px] border border-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center text-textSecondary/40 bg-white/[0.01]">
                      <div className="p-4 bg-white/[0.02] rounded-full mb-4">
                        <Activity className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="text-sm font-medium">Awaiting security scan input...</p>
                      <p className="text-[10px] uppercase tracking-widest mt-2 grayscale opacity-50">System Standby</p>
                    </div>
                  )}
                </div>
              }
            >
              <div className="flex flex-col gap-8">
                <ScanTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <ScanInput activeTab={activeTab} onScan={handleScan} isScanning={isScanning} />

                <div className="lg:hidden mt-8">
                  {hasScanned ? (
                    <ThreatResultCard
                      isProtected={isProtected}
                      onToggleProtect={() => setIsProtected(!isProtected)}
                      onViewAnalysis={openAnalysis}
                    />
                  ) : (
                    <div className="h-[450px] border border-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center text-textSecondary/40 bg-white/[0.01]">
                      <div className="p-4 bg-white/[0.02] rounded-full mb-4">
                        <Activity className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="text-sm font-medium">Awaiting security scan input...</p>
                      <p className="text-[10px] uppercase tracking-widest mt-2 grayscale opacity-50">System Standby</p>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <StatsPanel />
                </div>
              </div>
            </HeroSection>

            <AnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background selection:bg-primary/30 selection:text-white overflow-hidden">
      <Navbar onSectionChange={setActiveSection} activeSection={activeSection} />
      
      <main className="flex-1 pt-16 overflow-hidden">
        <div className="h-full w-full overflow-y-auto lg:overflow-hidden">
          {renderContent()}
        </div>
      </main>

      <Footer className="shrink-0" />
    </div>
  );
}

export default App;
