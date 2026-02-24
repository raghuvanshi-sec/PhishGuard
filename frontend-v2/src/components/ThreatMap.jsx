import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

const ThreatMap = () => {
  const mountRef = useRef(null);
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // --- Globe ---
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const threatGroup = new THREE.Group();
    globe.add(threatGroup);

    // --- Simulated Data ---
    const mockThreats = [
      { lat: 40.7128, lng: -74.0060, type: 'PHISHING', city: 'New York' },
      { lat: 51.5074, lng: -0.1278, type: 'MALWARE', city: 'London' },
      { lat: 35.6762, lng: 139.6503, type: 'PHISHING', city: 'Tokyo' },
      { lat: -33.8688, lng: 151.2093, type: 'BOTNET', city: 'Sydney' },
      { lat: 28.6139, lng: 77.2090, type: 'PHISHING', city: 'New Delhi' },
    ];

    mockThreats.forEach((loc, index) => {
      const phi = (90 - loc.lat) * (Math.PI / 180);
      const theta = (loc.lng + 180) * (Math.PI / 180);
      const r = 5.1;
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const dotGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: loc.type === 'PHISHING' ? 0xef4444 : 0x0ea5e9,
        transparent: true,
        opacity: 0.8
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      threatGroup.add(dot);
      
      // Update state for list with delay
      setTimeout(() => {
        setThreats(prev => [{ ...loc, id: Date.now() + index }, ...prev].slice(0, 5));
      }, 500 * index);
    });

    // --- Animation Loop ---
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    const currentMount = mountRef.current;
    return () => {
      cancelAnimationFrame(frameId);
      if (currentMount) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full h-[600px]">
      <div ref={mountRef} className="flex-1 min-h-[400px] relative group border border-white/5 rounded-2xl bg-black/20 overflow-hidden">
        <div className="absolute top-6 left-6 z-10">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Live Surveillance Feed</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-textSecondary px-2">Recent Incidents</h3>
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-4 group hover:bg-white/[0.08] transition-colors"
                style={{ opacity: 1 }}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${threat.type === 'PHISHING' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-primary shadow-[0_0_8px_rgba(37,99,235,0.4)]'}`}></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-textPrimary tracking-tight">{threat.type}</span>
                  <span className="text-xs text-textSecondary">{threat.city}, Global Node</span>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Activity className="w-3 h-3 text-textSecondary" />
                </div>
              </div>
            ))}
          </AnimatePresence>
          {threats.length === 0 && (
            <div className="text-center py-12 text-textSecondary/40 italic text-sm">
              Connecting to secure satellites...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;
