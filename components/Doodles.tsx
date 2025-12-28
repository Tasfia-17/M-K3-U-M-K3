
import React from 'react';

const SvgBase: React.FC<{ children: React.ReactNode; width?: number; height?: number; viewBox?: string; className?: string }> = ({ 
  children, width = 100, height = 100, viewBox = "0 0 100 100", className 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox={viewBox} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    stroke="currentColor" 
    className={`${className} drop-shadow-[0_0_8px_rgba(168,162,158,0.2)]`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const ArchivalStamp: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <SvgBase width={80} height={80} viewBox="0 0 100 100" className="text-accent/20 rotate-[-15deg]">
      <circle cx="50" cy="50" r="45" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="50" cy="50" r="38" strokeWidth="1" />
      <text x="50" y="45" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" className="font-mono uppercase tracking-widest">ARCHIVAL</text>
      <text x="50" y="60" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold" className="font-serif">UNMΔK3</text>
      <path d="M25 50 H 75" strokeWidth="0.5" strokeOpacity="0.5" />
    </SvgBase>
  </div>
);

export const Aperture: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes apertureRotate { from { transform: rotate(0deg); } to { transform: rotate(60deg); } }
      .blade { transform-origin: center; animation: apertureRotate 10s ease-in-out infinite alternate; }
    `}</style>
    <SvgBase width={60} height={60} viewBox="0 0 100 100" className="text-sepia/40">
      <circle cx="50" cy="50" r="48" strokeWidth="1" />
      <g className="blade">
        {[...Array(6)].map((_, i) => (
          <path key={i} d="M50 50 L 98 50 A 48 48 0 0 0 74 8.5 Z" transform={`rotate(${i * 60} 50 50)`} strokeWidth="0.5" fill="currentColor" fillOpacity="0.05" />
        ))}
      </g>
      <circle cx="50" cy="50" r="15" strokeWidth="1" strokeDasharray="2 2" />
    </SvgBase>
  </div>
);

export const HighQualityGear: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className}`}>
    <style>{`
      @keyframes gearRotateCC { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes gearRotateC { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      .g-1 { animation: gearRotateCC 12s linear infinite; transform-origin: 30px 30px; }
      .g-2 { animation: gearRotateC 6s linear infinite; transform-origin: 62px 55px; }
    `}</style>
    <SvgBase width={120} height={100} viewBox="0 0 120 100" className="text-sepia/80">
      <g className="g-1">
        <circle cx="30" cy="30" r="22" strokeWidth="1.5" strokeDasharray="1 3" />
        <circle cx="30" cy="30" r="15" strokeWidth="0.8" />
        {[...Array(12)].map((_, i) => (
          <path key={i} d="M30 4 V 10" transform={`rotate(${i * 30} 30 30)`} strokeWidth="2.5" />
        ))}
        <path d="M22 30 H 38 M30 22 V 38" strokeWidth="0.5" strokeOpacity="0.4" />
      </g>
      <g className="g-2">
        <circle cx="62" cy="55" r="14" strokeWidth="1.2" />
        <circle cx="62" cy="55" r="4" fill="currentColor" fillOpacity="0.1" />
        {[...Array(8)].map((_, i) => (
          <path key={i} d="M62 41 V 46" transform={`rotate(${i * 45 + 15} 62 55)`} strokeWidth="2" />
        ))}
      </g>
      <path d="M30 30 L 62 55" strokeWidth="0.5" strokeDasharray="2 2" strokeOpacity="0.3" />
    </SvgBase>
  </div>
);

export const KineticPiston: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes pistonDrive { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
      .piston-rod { animation: pistonDrive 2.5s ease-in-out infinite; }
    `}</style>
    <SvgBase width={60} height={120} viewBox="0 0 60 120" className="text-sepia/80">
      <rect x="10" y="5" width="40" height="60" rx="2" strokeWidth="1.5" />
      <path d="M10 20 H 50 M 10 35 H 50 M 10 50 H 50" strokeWidth="0.5" strokeOpacity="0.2" />
      <g className="piston-rod">
        <rect x="24" y="55" width="12" height="60" strokeWidth="1.5" />
        <rect x="15" y="110" width="30" height="6" strokeWidth="1" />
        <circle cx="30" cy="65" r="3" fill="currentColor" />
      </g>
    </SvgBase>
  </div>
);

export const PulseOscilloscope: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes waveScroll { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }
      .wave { stroke-dasharray: 200; animation: waveScroll 4s linear infinite; }
    `}</style>
    <SvgBase width={100} height={70} viewBox="0 0 100 70" className="text-sepia/70">
      <rect x="5" y="5" width="90" height="60" strokeWidth="1.5" />
      <path d="M5 20 H 95 M 5 35 H 95 M 5 50 H 95" strokeWidth="0.5" strokeOpacity="0.1" />
      <path d="M25 5 V 65 M 50 5 V 65 M 75 5 V 65" strokeWidth="0.5" strokeOpacity="0.1" />
      <path d="M5 35 Q 15 10, 25 35 T 45 35 T 65 35 T 95 35" className="wave text-accent" strokeWidth="2" />
      <circle cx="15" cy="55" r="2" fill="currentColor" />
      <circle cx="85" cy="55" r="2" fill="currentColor" />
    </SvgBase>
  </div>
);

export const ClockworkEscapement: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes tickMove { 
        0%, 15% { transform: rotate(0deg); }
        20%, 35% { transform: rotate(30deg); }
        40%, 55% { transform: rotate(60deg); }
        60%, 75% { transform: rotate(90deg); }
        80%, 95% { transform: rotate(120deg); }
        100% { transform: rotate(150deg); }
      }
      .tick-wheel { animation: tickMove 5s steps(1) infinite; transform-origin: 50px 50px; }
    `}</style>
    <SvgBase width={100} height={100} viewBox="0 0 100 100" className="text-sepia/80">
      <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="2 4" />
      <g className="tick-wheel">
        <circle cx="50" cy="50" r="30" strokeWidth="2" />
        {[...Array(12)].map((_, i) => (
          <path key={i} d="M50 15 V 22" transform={`rotate(${i * 30} 50 50)`} strokeWidth="3" />
        ))}
        <path d="M50 35 V 65 M 35 50 H 65" strokeWidth="0.5" strokeOpacity="0.3" />
      </g>
      <path d="M50 10 L 45 0 L 55 0 Z" fill="currentColor" className="opacity-40" />
    </SvgBase>
  </div>
);

export const PrecisionCaliper: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes slideScale { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(40px); } }
      .caliper-slider { animation: slideScale 6s ease-in-out infinite; }
    `}</style>
    <SvgBase width={140} height={60} viewBox="0 0 140 60" className="text-sepia/60">
      <path d="M10 20 H 130" strokeWidth="3" />
      {[...Array(20)].map((_, i) => (
        <path key={i} d={`M${15 + i * 6} 20 V 15`} strokeWidth="0.5" />
      ))}
      <g className="caliper-slider">
        <rect x="10" y="10" width="20" height="40" strokeWidth="1.5" fill="black" fillOpacity="0.2" />
        <path d="M20 10 V 50" strokeWidth="1" />
        <path d="M15 25 H 25" strokeWidth="0.5" strokeOpacity="0.5" />
      </g>
      <path d="M10 20 V 50 M 130 20 V 30" strokeWidth="2" />
    </SvgBase>
  </div>
);

export const CommsRelay: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes relayOrbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes wingPulse { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.8); } }
      .satellite { animation: relayOrbit 20s linear infinite; transform-origin: 50px 50px; }
      .wings { animation: wingPulse 4s ease-in-out infinite; transform-origin: 50px 50px; }
    `}</style>
    <SvgBase width={120} height={120} viewBox="0 0 100 100" className="text-sepia/70">
      <g className="satellite">
        <circle cx="50" cy="50" r="10" strokeWidth="1.5" />
        <g className="wings">
          <rect x="10" y="45" width="25" height="10" strokeWidth="1" strokeDasharray="2 1" />
          <rect x="65" y="45" width="25" height="10" strokeWidth="1" strokeDasharray="2 1" />
        </g>
        <path d="M50 40 V 25 M 45 25 H 55" strokeWidth="1" />
        <circle cx="50" cy="50" r="4" fill="currentColor" fillOpacity="0.1" />
      </g>
      <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="5 10" strokeOpacity="0.2" />
    </SvgBase>
  </div>
);

export const NeuralArray: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes signalTravel { 
        0% { stroke-dashoffset: 100; opacity: 0; }
        50% { opacity: 1; }
        100% { stroke-dashoffset: -100; opacity: 0; }
      }
      .signal { stroke-dasharray: 20 80; animation: signalTravel 3s infinite linear; }
    `}</style>
    <SvgBase width={120} height={120} viewBox="0 0 100 100" className="text-sepia/70">
      <rect x="30" y="30" width="40" height="40" strokeWidth="2" />
      <path d="M30 40 H 10 M30 50 H 5 M30 60 H 10" strokeWidth="1" />
      <path d="M70 40 H 90 M70 50 H 95 M70 60 H 90" strokeWidth="1" />
      <path d="M40 30 V 10 M50 30 V 5 M60 30 V 10" strokeWidth="1" />
      <path d="M40 70 V 90 M50 70 V 95 M60 70 V 90" strokeWidth="1" />
      <path d="M5 50 H 30" className="signal text-accent" strokeWidth="1.5" />
      <path d="M95 50 H 70" className="signal text-accent" strokeWidth="1.5" style={{ animationDelay: '1.5s' }} />
      <path d="M35 35 L 45 45 M 55 55 L 65 65" strokeWidth="0.5" strokeOpacity="0.3" />
    </SvgBase>
  </div>
);

export const PrecisionCompass: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes compassSway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
      @keyframes arcDraw { 0% { stroke-dashoffset: 150; } 100% { stroke-dashoffset: 0; } }
      .compass-body { animation: compassSway 4s ease-in-out infinite; transform-origin: 50px 10px; }
      .arc-path { stroke-dasharray: 150; animation: arcDraw 8s linear infinite; }
    `}</style>
    <SvgBase width={100} height={100} viewBox="0 0 100 100" className="text-sepia/80">
      <path d="M20 80 A 40 40 0 0 1 80 80" className="arc-path" strokeWidth="0.8" strokeDasharray="4 2" />
      <g className="compass-body">
        <path d="M50 10 L 35 85 M 50 10 L 65 85" strokeWidth="1.5" />
        <circle cx="50" cy="10" r="3" fill="currentColor" />
        <path d="M42 50 H 58" strokeWidth="0.5" />
        <path d="M35 85 L 34 90 M 65 85 L 66 90" strokeWidth="0.5" strokeOpacity="0.5" />
      </g>
    </SvgBase>
  </div>
);

export const AeroPropeller: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes propBlur { 
        0% { transform: rotate(0deg); opacity: 0.8; }
        50% { transform: rotate(180deg); opacity: 1; }
        100% { transform: rotate(360deg); opacity: 0.8; }
      }
      .blur-prop { animation: propBlur 0.4s linear infinite; transform-origin: 50px 50px; }
    `}</style>
    <SvgBase width={80} height={80} viewBox="0 0 100 100" className="text-sepia/90">
      <circle cx="50" cy="50" r="6" strokeWidth="1.5" />
      <g className="blur-prop">
        <path d="M50 50 L 50 10 Q 60 10 50 50" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
        <path d="M50 50 L 50 90 Q 40 90 50 50" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
        <path d="M50 50 L 10 50 Q 10 40 50 50" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
        <path d="M50 50 L 90 50 Q 90 60 50 50" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
      </g>
      <circle cx="50" cy="50" r="1.5" fill="currentColor" />
    </SvgBase>
  </div>
);

export const TechnicalLenses: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes lensShift { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      .glass { animation: lensShift 5s ease-in-out infinite; }
    `}</style>
    <SvgBase width={100} height={60} viewBox="0 0 100 60" className="text-sepia/60">
      <rect x="5" y="10" width="90" height="40" rx="2" strokeWidth="1.2" />
      <g className="glass">
        <circle cx="30" cy="30" r="15" strokeWidth="1" />
        <circle cx="30" cy="30" r="12" strokeWidth="0.5" strokeDasharray="2 2" />
        <path d="M25 25 L 35 35" strokeWidth="0.5" strokeOpacity="0.4" />
      </g>
      <g className="glass" style={{ animationDelay: '1s' }}>
        <circle cx="70" cy="30" r="15" strokeWidth="1" />
        <circle cx="70" cy="30" r="12" strokeWidth="0.5" strokeDasharray="2 2" />
        <path d="M65 25 L 75 35" strokeWidth="0.5" strokeOpacity="0.4" />
      </g>
      <path d="M45 30 H 55" strokeWidth="1.5" />
    </SvgBase>
  </div>
);

export const DetailedDrone: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <style>{`
      @keyframes hoverDrone { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(2deg); } }
      @keyframes fastRotor { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .drone-body { animation: hoverDrone 4s ease-in-out infinite; }
      .rotor-fast { animation: fastRotor 0.2s linear infinite; transform-origin: center; }
    `}</style>
    <SvgBase width={120} height={100} viewBox="0 0 120 100" className="text-sepia/80">
      <g className="drone-body">
        <rect x="40" y="40" width="40" height="15" rx="2" strokeWidth="1.5" />
        <path d="M40 47.5 L 20 25 M 80 47.5 L 100 25 M 40 47.5 L 20 70 M 80 47.5 L 100 70" strokeWidth="1.2" />
        <g style={{ transformBox: 'fill-box', transformOrigin: '20px 25px' }} className="rotor-fast">
          <circle cx="20" cy="25" r="12" strokeWidth="0.5" strokeOpacity="0.3" />
          <path d="M12 25 H 28" strokeWidth="1.5" />
        </g>
        <g style={{ transformBox: 'fill-box', transformOrigin: '100px 25px' }} className="rotor-fast">
          <circle cx="100" cy="25" r="12" strokeWidth="0.5" strokeOpacity="0.3" />
          <path d="M92 25 H 108" strokeWidth="1.5" />
        </g>
        <circle cx="60" cy="55" r="4" strokeWidth="1" />
      </g>
    </SvgBase>
  </div>
);

export const TechCorner: React.FC<{ className?: string; flipX?: boolean; flipY?: boolean }> = ({ className, flipX, flipY }) => (
  <div className={`${className} ${flipX ? 'scale-x-[-1]' : ''} ${flipY ? 'scale-y-[-1]' : ''}`}>
    <SvgBase width={40} height={40} viewBox="0 0 40 40" className="text-accent">
      <path d="M2 20 V 2 H 20" strokeWidth="2.5" />
      <path d="M6 14 V 6 H 14" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    </SvgBase>
  </div>
);

export const TargetAnchor: React.FC<{ className?: string; label?: string }> = ({ className, label }) => (
  <div className={`relative ${className}`}>
    <style>{`
      @keyframes crosshair { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } }
    `}</style>
    <SvgBase width={30} height={30} viewBox="0 0 40 40" className="text-accent animate-pulse">
      <circle cx="20" cy="20" r="18" strokeWidth="0.5" strokeDasharray="2 4" />
      <path d="M20 5 V 15 M 20 25 V 35 M 5 20 H 15 M 25 20 H 35" strokeWidth="1.5" />
      <rect x="18" y="18" width="4" height="4" fill="currentColor" className="animate-ping" />
    </SvgBase>
    {label && <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[7px] text-accent uppercase whitespace-nowrap">{label}</div>}
  </div>
);

export const ScannerBeam: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className} overflow-hidden pointer-events-none`}>
    <div className="absolute top-0 left-0 w-full h-[3px] bg-accent shadow-[0_0_25px_rgba(245,242,240,0.8)] animate-scan z-10"></div>
    <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-accent/10 to-transparent animate-scan"></div>
  </div>
);

export const DataStream: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`font-mono text-[9px] text-accent/30 overflow-hidden h-48 leading-tight ${className}`}>
    <div className="animate-data-stream whitespace-pre uppercase">
      {`SYS LINK ESTABLISHED
PKT LOSS: 0.002%
BUFFER LOAD: 82%
NEURAL MAP: READY
X COORD: 102.44
Y COORD: 455.19
Z COORD: 0.003

SCANNING

ELEMENT DETECTED
VERIFYING STRUCT...
BLUEPRINT GEN 01`}
    </div>
  </div>
);

export const ScribbleUnderline: React.FC<{ className?: string }> = ({ className }) => (
  <SvgBase width={150} height={25} viewBox="0 0 150 25" className={`text-sepia/60 ${className}`}>
    <path 
      d="M5 15 C 25 12, 45 18, 65 15 C 85 12, 105 18, 125 15 C 145 12, 150 15, 150 15" 
      strokeWidth="2.5"
      className="sketch-line"
    />
  </SvgBase>
);

export const RoughCircle: React.FC<{ className?: string }> = ({ className }) => (
  <SvgBase width={100} height={100} viewBox="0 0 100 100" className={className}>
    <path 
      d="M50 10 C 70 10, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 30 10, 48 12" 
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="3 3"
    />
  </SvgBase>
);

export const HandDrawnArrow: React.FC<{ className?: string }> = ({ className }) => (
  <SvgBase width={100} height={100} viewBox="0 0 100 100" className={className}>
    <path 
      d="M10 90 L 80 20 M 60 20 L 80 20 L 80 40" 
      strokeWidth="2" 
      fill="none" 
    />
  </SvgBase>
);

export const SketchGearGroup: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <HighQualityGear className="scale-75 opacity-60" />
  </div>
);
