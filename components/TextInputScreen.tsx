import React, { useState } from 'react';
import {
  TechCorner,
  DataStream,
  TargetAnchor,
  PulseOscilloscope,
  ClockworkEscapement
} from './Doodles';

interface TextInputScreenProps {
  onGenerate: (description: string, mode: 'assembly' | 'disassembly') => Promise<void>;
}

const TextInputScreen: React.FC<TextInputScreenProps> = ({ onGenerate }) => {
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState<'assembly' | 'disassembly'>('disassembly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      await onGenerate(description, mode);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-paper overflow-y-auto px-6 py-12 md:px-16 md:py-20 flex flex-col items-center">
      <div className="absolute inset-0 z-0 blueprint-grid opacity-[0.1]"></div>

      {isProcessing && (
        <div className="absolute inset-0 z-[110] bg-paper/90 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 mb-8 relative">
            <div className="absolute inset-0 border-2 border-accent/10 rounded-full"></div>
            <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin"></div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent/60 animate-pulse">
            Initiating Deep Archival Deconstruction
          </p>
          <DataStream className="opacity-20 mt-8" />
        </div>
      )}

      <header className="w-full max-w-4xl flex justify-between items-end mb-16 relative z-10 animate-slide-up">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tighter text-accent leading-none">
            Neural Input Station
          </h2>
          <p className="font-mono text-[9px] text-accent/30 uppercase tracking-[0.5em] mt-2">
            Describe Object for Deconstruction
          </p>
        </div>
        <TechCorner className="opacity-40" />
      </header>

      <main className="w-full max-w-4xl relative z-10 animate-slide-up stagger-1">
        <div className="glass-panel p-10 md:p-16 relative bg-espresso/40 backdrop-blur-3xl overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ClockworkEscapement className="scale-[2]" />
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-2 h-2 bg-accent/40 rounded-full"></span>
              <h3 className="font-mono text-[10px] text-accent/60 uppercase tracking-[0.4em]">
                Object Description
              </h3>
            </div>

            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the object you want to deconstruct... e.g., 'a ceiling fan with four blades' or 'a mechanical wall clock'"
                className="w-full bg-paper border border-white/10 p-6 font-mono text-sm text-accent placeholder:text-accent/20 focus:outline-none focus:border-accent/30 min-h-[200px] shadow-inner transition-colors resize-none"
                disabled={isProcessing}
              />
              <div className="absolute bottom-4 right-4 opacity-20">
                <TargetAnchor className="scale-50" />
              </div>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${mode === 'assembly' ? 'text-accent' : 'text-accent/20'}`}>
                  Assembly
                </span>
                <button
                  onClick={() => setMode(mode === 'assembly' ? 'disassembly' : 'assembly')}
                  disabled={isProcessing}
                  className="relative w-16 h-7 bg-espresso rounded-full border border-white/10 p-1 flex items-center transition-all disabled:opacity-50"
                >
                  <div
                    className={`w-5 h-5 bg-accent shadow-[0_0_15px_rgba(245,242,240,0.3)] rounded-full transition-all duration-300 transform ${mode === 'disassembly' ? 'translate-x-9' : 'translate-x-0'}`}
                  />
                </button>
                <span className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${mode === 'disassembly' ? 'text-accent' : 'text-accent/20'}`}>
                  Disassembly
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!description.trim() || isProcessing}
              className="w-full font-mono font-bold text-[11px] py-5 px-10 uppercase tracking-[0.3em] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-500 disabled:hover:bg-blue-600"
            >
              <span className="text-sm">✦</span>
              {isProcessing ? 'Processing Neural Data...' : 'Generate Archival Blueprint'}
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
          <div className="p-6 bg-mocha/20 border border-white/5">
            <PulseOscilloscope className="scale-75 mb-4 opacity-40" />
            <h4 className="font-mono text-[9px] text-accent/60 uppercase tracking-widest mb-2">
              Neural Processing
            </h4>
            <p className="font-body text-[10px] text-accent/40 leading-relaxed">
              The system analyzes your description and generates a plausible archival blueprint
            </p>
          </div>

          <div className="p-6 bg-mocha/20 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-1 bg-cyan-400/40 rounded-full"></div>
              <div className="w-1 h-1 bg-cyan-400/40 rounded-full"></div>
              <div className="w-1 h-1 bg-cyan-400/40 rounded-full"></div>
            </div>
            <h4 className="font-mono text-[9px] text-accent/60 uppercase tracking-widest mb-2">
              Examples
            </h4>
            <p className="font-body text-[10px] text-accent/40 leading-relaxed">
              Ceiling fan, wall clock, desk lamp, coffee maker, mechanical keyboard
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-24 font-mono text-[8px] tracking-[0.4em] text-accent/10 uppercase">
        System State Ready Neural Link Active
      </footer>
    </div>
  );
};

export default TextInputScreen;
