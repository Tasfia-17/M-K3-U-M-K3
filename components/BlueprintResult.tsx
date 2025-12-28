import React, { useState } from 'react';
import { callMinimax } from '../utils/minimaxClient';
import {
  TechCorner,
  DataStream,
  RoughCircle,
  ClockworkEscapement,
  ScannerBeam
} from './Doodles';

interface Step {
  id: number;
  text: string;
  videoPrompt: string;
  diagramPrompt: string;
}

interface BlueprintData {
  title: string;
  mode: string;
  difficulty: string;
  time: string;
  materials: string[];
  tools: string[];
  steps: Step[];
  summary: string;
}

interface BlueprintResultProps {
  objectDescription: string;
  blueprint: BlueprintData;
  onClose: () => void;
}

const BlueprintResult: React.FC<BlueprintResultProps> = ({ objectDescription, blueprint, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  const currentStep = blueprint.steps[currentStepIndex];

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || isChatting) return;
    const userMsg = chatMessage;
    setChatMessage("");
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatting(true);

    try {
      const systemInstruction = `You are the Lead Archival Architect. You possess the full blueprint of the ${blueprint.title}.
The user is reverse engineering this object.
Respond with technical precision, engineering curiosity, and archival sophistication.
Current focus is Step ${currentStep.id}: ${currentStep.text}.
Context: ${blueprint.summary}`;

      const messages = [
        { role: 'system' as const, content: systemInstruction },
        ...chatHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text
        })),
        { role: 'user' as const, content: userMsg }
      ];

      const response = await callMinimax(messages);
      setChatHistory(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (err) {
      console.error("Chat link error", err);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        text: 'Neural link temporarily disrupted. Please try again.'
      }]);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-paper z-50 overflow-y-auto blueprint-grid-fine flex flex-col items-center">
      <header className="w-full px-12 py-10 flex justify-between items-start sticky top-0 bg-paper/95 backdrop-blur-lg z-50 border-b border-white/5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="p-2 border border-accent/20 bg-espresso">
               <TechCorner className="scale-75 text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tighter text-accent leading-none">Archival Entry 01</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-cyan-500/50 rounded-full animate-pulse"></span>
                <p className="text-[9px] font-mono text-accent/40 uppercase tracking-[0.4em]">Neural Deconstruction Active</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="group relative px-8 py-4 bg-transparent border border-accent/20 text-accent font-title font-bold text-[10px] uppercase tracking-[0.3em] hover:border-accent/40 transition-all"
        >
          Deactivate Sync <span className="opacity-50 ml-2">✕</span>
        </button>
      </header>

      <main className="w-full max-w-7xl px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-12">
          <div className="relative aspect-[1/1] bg-espresso/30 border border-accent/10 overflow-hidden shadow-2xl flex items-center justify-center p-8">
              <div className="relative z-10 text-center space-y-4">
                <h3 className="font-mono text-[9px] text-accent/40 uppercase tracking-[0.5em]">Object Description</h3>
                <p className="font-serif text-2xl text-accent/80 leading-relaxed italic">{objectDescription}</p>
              </div>
              <div className="absolute inset-0 blueprint-grid opacity-10"></div>
              <RoughCircle className="absolute top-[20%] left-[20%] scale-[2] opacity-20 text-accent rotate-12" />
          </div>
          <div className="glass-panel p-8">
            <h3 className="text-[11px] font-mono text-accent/60 uppercase tracking-[0.3em] mb-4">Neural Architecture Sync</h3>
            <p className="font-body text-[10px] leading-relaxed text-accent/40 italic">{blueprint.summary}</p>
            <div className="mt-8 space-y-4 font-mono text-[9px] text-accent/30 uppercase">
              <div className="flex justify-between border-b border-white/5 pb-1"><span>Material Count</span> <span>{blueprint.materials.length}</span></div>
              <div className="flex justify-between border-b border-white/5 pb-1"><span>Tool Requirement</span> <span>{blueprint.tools.length}</span></div>
              <div className="flex justify-between pb-1"><span>Archival State</span> <span>Immutable</span></div>
            </div>
            <DataStream className="opacity-40 mt-10" />
          </div>
        </div>

        <div className="lg:col-span-8 space-y-16">
          <div className="glass-panel p-10 md:p-16 relative bg-espresso/40 backdrop-blur-3xl overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <ClockworkEscapement className="scale-[2]" />
            </div>

            <div className="mb-12 border-b border-white/5 pb-10">
              <h1 className="font-serif text-4xl font-bold text-accent tracking-tighter uppercase mb-6">
                {blueprint.mode} Protocol {blueprint.title}
              </h1>
              <div className="flex flex-wrap gap-10 opacity-60 font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Difficulty: {blueprint.difficulty}</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Time Scale: {blueprint.time}</span>
              </div>
            </div>

            <div className="space-y-8 mb-20">
              <div className="flex items-center justify-between">
                <h3 className="text-cyan-400 font-mono font-bold uppercase text-[14px] tracking-[0.3em]">
                   Step {currentStep?.id} Physical Deconstruction
                </h3>
              </div>

              <div className="bg-paper/40 border border-white/5 p-8 md:p-12 relative overflow-hidden group/focus">
                <div className="grid grid-cols-1 gap-10">
                  <div className="space-y-8">
                    <p className="text-accent text-xl font-light leading-relaxed font-serif italic tracking-tight">
                      {currentStep?.text}
                    </p>

                    <div className="space-y-4">
                      <div className="p-6 bg-mocha/40 border border-white/5">
                        <h4 className="font-mono text-[9px] text-accent/60 uppercase tracking-widest mb-4">Required Materials</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {blueprint.materials.slice(0, 5).map((m, i) => (
                            <div key={i} className="flex items-center gap-2 text-accent/40 font-mono text-[8px] uppercase tracking-tighter">
                              <span className="w-1 h-1 bg-cyan-400/40 rounded-full"></span> {m}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-mocha/40 border border-white/5">
                        <h4 className="font-mono text-[9px] text-accent/60 uppercase tracking-widest mb-4">Required Tools</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {blueprint.tools.slice(0, 5).map((t, i) => (
                            <div key={i} className="flex items-center gap-2 text-accent/40 font-mono text-[8px] uppercase tracking-tighter">
                              <span className="w-1 h-1 bg-cyan-400/40 rounded-full"></span> {t}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-8">
                      <button
                        disabled={currentStepIndex === 0}
                        onClick={() => setCurrentStepIndex(prev => prev - 1)}
                        className="font-mono text-[10px] uppercase tracking-widest text-accent/20 hover:text-accent disabled:opacity-0 transition-colors"
                      >← Previous Plate</button>
                      <div className="h-10 w-[1px] bg-white/5"></div>
                      <button
                        disabled={currentStepIndex === blueprint.steps.length - 1}
                        onClick={() => setCurrentStepIndex(prev => prev + 1)}
                        className="font-mono text-[10px] uppercase tracking-widest text-accent/20 hover:text-accent disabled:opacity-0 transition-colors"
                      >Next Plate →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-cyan-400 font-mono font-bold uppercase text-[14px] tracking-[0.3em] flex items-center gap-3">
                 <span className="flex gap-1"><span className="w-1.5 h-1.5 bg-cyan-400 animate-ping"></span></span>
                 Archival Assembly Assistant
               </h3>
               <div className="bg-paper/20 border border-white/5 p-8 flex flex-col min-h-[350px]">
                  <div className="flex-1 space-y-6 overflow-y-auto max-h-72 mb-8 pr-4 scroll-smooth">
                    {chatHistory.length === 0 && (
                      <p className="font-body text-xs text-accent/30 italic">Registry connection stable. Query the Lead Architect regarding this {blueprint.title.toLowerCase()} archival guide.</p>
                    )}
                    {chatHistory.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-5 text-xs font-light leading-relaxed ${msg.role === 'user' ? 'bg-blue-600/10 border border-blue-500/20 text-white shadow-lg' : 'bg-espresso/80 border border-white/5 text-accent/70'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isChatting && <div className="text-accent/20 font-mono text-[8px] animate-pulse uppercase tracking-[0.3em]">Synthesizing neural response...</div>}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Inquire about deconstruction structural integrity..."
                      className="w-full bg-paper border border-white/10 p-5 font-mono text-xs text-accent placeholder:text-accent/20 focus:outline-none focus:border-cyan-400/30 pr-16 shadow-inner transition-colors"
                    />
                    <button onClick={handleSendMessage} disabled={isChatting} className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    </button>
                  </div>
               </div>
            </div>

            <footer className="mt-20 pt-10 border-t border-white/5 flex justify-between items-end opacity-20 font-mono text-[8px] uppercase tracking-widest">
              <div>Registry DE 9910 X<br/>Stable Link Verified<br/>Multimodal Pipeline: ACTIVE</div>
              <div className="text-right">Lead Archival Architect<br/>Signature: μ_unmake_v9<br/>Verified Neural Timestamp: {new Date().toLocaleDateString()}</div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlueprintResult;
