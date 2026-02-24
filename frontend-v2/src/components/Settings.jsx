import React, { useState } from 'react';
import { Key, Shield, Bell, Save, AlertCircle, CheckCircle } from 'lucide-react';

const Settings = () => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('phishguard_api_key') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('phishguard_api_key', apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">System Settings</h1>
        <p className="text-textSecondary text-lg">Manage your threat detection infrastructure and security preferences.</p>
      </div>

      <div className="space-y-8">
        {/* API Configuration */}
        <section className="glass p-8 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="flex items-start gap-6 relative z-10">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Key className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Detection Engine API</h3>
              <p className="text-sm text-textSecondary mb-6">
                Required for authenticating requests to the PhishGuard real-time analysis engine. 
                Keep this key confidential.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-textSecondary group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="phishguard-secret-xxxxxxxxxxxx"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-textPrimary placeholder:text-textSecondary/30 focus:outline-none focus:border-primary/50 transition-all font-mono"
                  />
                </div>
                
                <button 
                  onClick={handleSave}
                  className="w-fit flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-soft active:scale-95"
                >
                  {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{saved ? 'Configuration Saved' : 'Save API Key'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Global Protection Policy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                 <Shield className="w-5 h-5 text-primary" />
                 <h4 className="font-bold">Aggressive Heuristics</h4>
              </div>
              <p className="text-xs text-textSecondary mb-6 leading-relaxed">
                 Enable advanced string similarity and favicon spoofing detection. 
                 Increases security but may flag more false positives.
              </p>
              <div className="flex items-center justify-between">
                 <span className="text-sm font-medium">Policy Active</span>
                 <div className="w-10 h-5 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                 </div>
              </div>
           </div>

           <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                 <Bell className="w-5 h-5 text-primary" />
                 <h4 className="font-bold">Instant Notifications</h4>
              </div>
              <p className="text-xs text-textSecondary mb-6 leading-relaxed">
                 Send real-time alerts to the security operations center when a high-risk 
                 threat is blocked.
              </p>
              <div className="flex items-center justify-between">
                 <span className="text-sm font-medium">E-mail Alerts</span>
                 <div className="w-10 h-5 bg-white/10 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white/40 rounded-full"></div>
                 </div>
              </div>
           </div>
        </section>

        {/* Danger Zone */}
        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-center gap-4">
           <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
           <p className="text-sm text-red-500/80">
              Emergency Override: Disabling the detection engine will leave your enterprise 
              Perimeter unprotected.
           </p>
           <button className="ml-auto text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all">
              Bypass Engine
           </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
