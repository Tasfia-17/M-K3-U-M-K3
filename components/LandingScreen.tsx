
import React, { useState } from 'react';
import { 
  TechCorner,
  HighQualityGear,
  NeuralArray,
  PrecisionCompass,
  AeroPropeller,
  TechnicalLenses,
  DetailedDrone,
  KineticPiston,
  PulseOscilloscope,
  ClockworkEscapement,
  PrecisionCaliper,
  CommsRelay,
  ScannerBeam,
  TargetAnchor,
  ScribbleUnderline
} from './Doodles';

interface LandingScreenProps {
  onLaunch: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onLaunch }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen bg-paper overflow-hidden font-body flex items-center justify-center">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 blueprint-grid opacity-[0.15]"></div>
      <div className="absolute inset-0 z-0 noise-bg opacity-20"></div>

      {/* ENHANCED DOODLE FIELD */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <HighQualityGear className="absolute top-[8%] left-[5%] scale-[1.1] opacity-70" />
        <PulseOscilloscope className="absolute top-[12%] right-[12%] scale-[1.2] opacity-60 rotate-[-5deg]" />
        <CommsRelay className="absolute top-[3%] left-[45%] opacity-30 scale-[0.8]" />
        
        <KineticPiston className="absolute top-[35%] left-[8%] opacity-50 scale-[1.3] rotate-[10deg]" />
        <DetailedDrone className="absolute top-[25%] right-[25%] scale-[1.1] opacity-40 rotate-[15deg]" />
        <PrecisionCaliper className="absolute top-[55%] right-[5%] opacity-40 scale-[1.4] rotate-[-12deg]" />
        <ClockworkEscapement className="absolute top-[45%] left-[35%] opacity-20 scale-[1.8]" />

        <NeuralArray className="absolute bottom-[8%] left-[10%] scale-[1.3] opacity-70" />
        <PrecisionCompass className="absolute bottom-[12%] right-[10%] scale-[1.2] opacity-60" />
        <TechnicalLenses className="absolute bottom-[5%] left-[45%] opacity-30 scale-[1.5]" />
        <AeroPropeller className="absolute bottom-[25%] right-[35%] opacity-20 scale-[2.2] rotate-[45deg]" />

        <TargetAnchor className="absolute top-[20%] left-[30%] opacity-15" />
        <TargetAnchor className="absolute bottom-[30%] right-[40%] opacity-15" />
        <TargetAnchor className="absolute top-[60%] left-[60%] opacity-10" />
      </div>

      <ScannerBeam className="absolute inset-0 z-10 opacity-30" />

      {/* HUD ELEMENTS */}
      <div className="absolute top-10 left-10 z-30 opacity-60"><TechCorner /></div>
      <div className="absolute top-10 right-10 z-30 opacity-60"><TechCorner flipX /></div>
      <div className="absolute bottom-10 left-10 z-30 opacity-60"><TechCorner flipY /></div>
      <div className="absolute bottom-10 right-10 z-30 opacity-60"><TechCorner flipX flipY /></div>

      {/* --- MAIN CONTENT --- */}
      <div className="z-20 flex flex-col items-center text-center px-6 max-w-4xl relative">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none animate-glow opacity-60"></div>
        
        <div className="relative group mb-14 animate-float">
          <style>{`
            @keyframes techFlicker {
              0%, 100% { opacity: 1; filter: drop-shadow(0 0 15px rgba(245,242,240,0.3)); }
              98% { opacity: 1; filter: drop-shadow(0 0 15px rgba(245,242,240,0.3)); }
              99% { opacity: 0.7; filter: contrast(150%) brightness(150%); }
            }
            .main-title { animation: techFlicker 4s infinite; }
          `}</style>
          
          <div className="main-title">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-accent tracking-tighter leading-none">
              MΔK3 <span className="text-sepia opacity-60 italic">UΝMΔK3</span>
            </h1>
            <ScribbleUnderline className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[110%] opacity-60" />
          </div>
        </div>
        
        <p className="font-body text-sepia/50 text-base md:text-lg mb-16 max-w-sm leading-relaxed mx-auto animate-slide-up stagger-1 font-light italic">
          High fidelity neural deconstruction of the everyday.
        </p>
        
        <div className="animate-slide-up stagger-2">
          <button 
            onClick={onLaunch}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-12 py-5 bg-accent text-paper font-title font-bold text-[11px] rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.05] active:scale-95 overflow-hidden border border-accent/30"
          >
            <span className="relative z-10 flex items-center gap-6 uppercase tracking-[0.5em]">
              Start Your Journey
              <span className={`transition-all duration-500 font-mono text-xl ${isHovered ? 'translate-x-2' : ''}`}>→</span>
            </span>
            <div className="absolute inset-0 bg-espresso/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-paper/20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-paper/20"></div>
          </button>
        </div>

        <div className="mt-24 font-mono text-[8px] tracking-[0.4em] text-accent/20 animate-pulse uppercase">
          Neural Link Stable Frame Rate 60fps Latency 12ms
        </div>
      </div>

      <div className="absolute left-8 bottom-32 hidden lg:block opacity-20 rotate-[-90deg] origin-left">
        <div className="font-mono text-[9px] uppercase tracking-[1em] text-accent">Experimental v9.0.2</div>
      </div>
    </div>
  );
};

export default LandingScreen;
