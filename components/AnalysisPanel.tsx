
import React, { useState } from 'react';
import { TechCorner, ScannerBeam } from './Doodles';

interface DetectedObject {
  name: string;
  box_2d: [number, number, number, number];
}

interface AnalysisPanelProps {
  imageData: string;
  isProcessing: boolean;
  progressLabel: string;
  detectedObjects: DetectedObject[];
  selectedObject: DetectedObject | null;
  onSelectObject: (obj: DetectedObject) => void;
  onGenerate: (mode: 'assembly' | 'disassembly') => void;
  onCancel: () => void;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ 
  imageData, 
  isProcessing, 
  progressLabel, 
  detectedObjects, 
  selectedObject,
  onSelectObject,
  onGenerate, 
  onCancel 
}) => {
  const [mode, setMode] = useState<'assembly' | 'disassembly'>('disassembly');

  return (
    <div className="fixed inset-0 z-[100] bg-paper/40 backdrop-blur-3xl flex items-center justify-center p-6">
      <div className="absolute inset-0 blueprint-grid opacity-10"></div>
      
      <div className="relative w-full max-w-5xl bg-mocha border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-slide-up">
        {isProcessing && (
          <div className="absolute inset-0 z-[110] bg-paper/90 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 mb-8 relative">
               <div className="absolute inset-0 border-2 border-accent/10 rounded-full"></div>
               <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin"></div>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent/60 animate-pulse">{progressLabel}</p>
          </div>
        )}

        <div className="bg-amber-500/10 border-b border-amber-500/20 px-8 py-3">
          <p className="text-amber-500/80 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            {detectedObjects.length > 0 
              ? `Multiple neural nodes detected: ${detectedObjects.length} identified objects.`
              : "Scanning for structural nodes..."}
          </p>
        </div>

        <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-start">
          {/* INTERACTIVE SELECTION PANEL */}
          <div className="relative w-full lg:w-[500px] aspect-square bg-black border border-white/5 overflow-hidden flex-shrink-0 group">
            <img 
              src={imageData} 
              alt="Subject" 
              className="w-full h-full object-cover opacity-60 grayscale brightness-75 transition-all"
            />
            
            {/* DYNAMIC BOUNDING BOXES */}
            {detectedObjects.map((obj, i) => {
              const [ymin, xmin, ymax, xmax] = obj.box_2d;
              const isSelected = selectedObject?.name === obj.name;
              return (
                <button
                  key={i}
                  onClick={() => onSelectObject(obj)}
                  className={`absolute border-2 transition-all cursor-pointer group/box ${
                    isSelected 
                      ? 'border-cyan-400 bg-cyan-400/10' 
                      : 'border-white/20 hover:border-cyan-400/40 hover:bg-white/5'
                  }`}
                  style={{
                    top: `${ymin / 10}%`,
                    left: `${xmin / 10}%`,
                    width: `${(xmax - xmin) / 10}%`,
                    height: `${(ymax - ymin) / 10}%`,
                  }}
                >
                  <div className={`absolute top-0 left-0 -translate-y-full font-mono text-[7px] px-2 py-1 uppercase whitespace-nowrap ${
                    isSelected ? 'bg-cyan-400 text-paper' : 'bg-white/10 text-accent/40 group-hover/box:text-cyan-400'
                  }`}>
                    {obj.name}
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400"></div>
                    </div>
                  )}
                </button>
              );
            })}

            <ScannerBeam className="opacity-10" />
            <div className="absolute top-2 left-2"><TechCorner className="scale-[0.4] opacity-30" /></div>
            <div className="absolute bottom-2 right-2"><TechCorner flipX flipY className="scale-[0.4] opacity-30" /></div>
          </div>

          {/* CONFIGURATION PANEL */}
          <div className="flex-1 space-y-10 w-full py-4">
            <div>
              <p className="font-mono text-[9px] text-accent/30 uppercase tracking-[0.4em] mb-1">Archival Registry Select</p>
              <h3 className="font-serif text-3xl font-bold text-accent/90 tracking-tighter">
                {selectedObject ? selectedObject.name : "Select an Identified Entity"}
              </h3>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${mode === 'assembly' ? 'text-accent' : 'text-accent/20'}`}>Assembly</span>
                <button 
                  onClick={() => setMode(mode === 'assembly' ? 'disassembly' : 'assembly')}
                  className="relative w-16 h-7 bg-espresso rounded-full border border-white/10 p-1 flex items-center transition-all"
                >
                  <div 
                    className={`w-5 h-5 bg-accent shadow-[0_0_15px_rgba(245,242,240,0.3)] rounded-full transition-all duration-300 transform ${mode === 'disassembly' ? 'translate-x-9' : 'translate-x-0'}`}
                  />
                </button>
                <span className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${mode === 'disassembly' ? 'text-accent' : 'text-accent/20'}`}>Disassembly</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                onClick={() => selectedObject && onGenerate(mode)}
                disabled={isProcessing || !selectedObject}
                className={`flex-1 font-mono font-bold text-[11px] py-5 px-10 uppercase tracking-[0.3em] transition-all shadow-xl flex items-center justify-center gap-3 ${
                  selectedObject 
                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                  : 'bg-white/5 text-accent/20 cursor-not-allowed'
                }`}
              >
                <span className="text-sm">✦</span>
                {selectedObject ? `Deconstruct ${selectedObject.name}` : "Awaiting Selection"}
              </button>
              
              <button 
                onClick={onCancel}
                disabled={isProcessing}
                className="bg-espresso/50 border border-white/5 text-accent/40 font-mono font-bold text-[11px] py-5 px-10 uppercase tracking-[0.3em] hover:border-accent/20 hover:text-accent/60 transition-all flex items-center justify-center gap-3"
              >
                <span className="text-sm">↺</span>
                Upload New
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {detectedObjects.map((obj, i) => (
                <button
                  key={i}
                  onClick={() => onSelectObject(obj)}
                  className={`p-4 border text-left font-mono text-[9px] uppercase tracking-widest transition-all ${
                    selectedObject?.name === obj.name ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/5 bg-white/5 hover:border-white/10'
                  }`}
                >
                  {obj.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-paper/50 border-t border-white/5 px-8 py-4 flex justify-between items-center">
          <div className="flex gap-6">
             <div className="font-mono text-[8px] text-accent/40 uppercase tracking-widest">Neural Link Enabled</div>
          </div>
          <p className="font-mono text-[8px] text-accent/10 uppercase tracking-[1em]">READY FOR SELECTION</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
