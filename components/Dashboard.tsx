
import React, { useRef } from 'react';
import { 
  TechCorner, 
  ArchivalStamp, 
  Aperture, 
  TargetAnchor,
  ScannerBeam
} from './Doodles';

interface DashboardProps {
  onUpload: (imageData: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const mockSavedBlueprints = [
    { id: 'DE 8299', type: 'Mech Alpha', date: '12.04.2024', density: 'High' },
    { id: 'DE 4412', type: 'Optic Lense', date: '08.03.2024', density: 'Med' },
    { id: 'DE 0019', type: 'Core Reactor', date: '01.01.2024', density: 'Ultra' },
  ];

  return (
    <div className="relative w-full min-h-screen bg-paper overflow-y-auto px-6 py-12 md:px-16 md:py-20 flex flex-col items-center">
      <div className="absolute inset-0 z-0 blueprint-grid opacity-[0.1]"></div>
      
      {/* HEADER SECTION */}
      <header className="w-full max-w-7xl flex justify-between items-end mb-16 relative z-10 animate-slide-up">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tighter text-accent leading-none">Archival Dashboard</h2>
          <p className="font-mono text-[9px] text-accent/30 uppercase tracking-[0.5em] mt-2">Experimental v9.0.2 Registry Sync Active</p>
        </div>
        <ArchivalStamp className="opacity-40" />
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* SECTION 1: PRIMARY INPUT STATION */}
        <section className="lg:col-span-7 animate-slide-up stagger-1">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-2 bg-accent/40 rounded-full"></span>
            <h3 className="font-mono text-[10px] text-accent/60 uppercase tracking-[0.4em]">Primary Input Station</h3>
          </div>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative aspect-video w-full bg-espresso/30 border border-white/5 cursor-pointer overflow-hidden flex flex-col items-center justify-center transition-all hover:bg-espresso/50 hover:border-accent/20"
          >
            <ScannerBeam className="absolute inset-0 opacity-10" />
            <div className="absolute top-4 left-4"><TechCorner className="scale-75 opacity-20 group-hover:opacity-60" /></div>
            <div className="absolute bottom-4 right-4"><TechCorner flipX flipY className="scale-75 opacity-20 group-hover:opacity-60" /></div>
            
            <div className="relative flex flex-col items-center gap-6">
              <Aperture className="scale-[1.5] group-hover:scale-[1.7] transition-transform duration-1000" />
              <div className="text-center space-y-2">
                <p className="font-serif text-xl text-accent/80 group-hover:text-accent transition-colors">Archival Dropzone</p>
                <p className="font-mono text-[8px] text-accent/30 uppercase tracking-[0.2em]">Click to import local optical data JPG or PNG</p>
              </div>
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="mt-8 flex justify-between items-center px-4">
             <div className="font-mono text-[7px] text-accent/20 uppercase tracking-widest leading-loose">
               Auth Protocol RSA 4096<br/>
               Encryption AES 256
             </div>
             <TargetAnchor className="scale-75 opacity-10" />
          </div>
        </section>

        {/* SECTION 2: DECONSTRUCTION REGISTRY */}
        <section className="lg:col-span-5 animate-slide-up stagger-2">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-2 bg-accent/40 rounded-full"></span>
            <h3 className="font-mono text-[10px] text-accent/60 uppercase tracking-[0.4em]">Deconstruction Registry</h3>
          </div>

          <div className="space-y-4">
            {mockSavedBlueprints.map((item, idx) => (
              <div 
                key={item.id} 
                className="group p-6 bg-mocha/20 border border-white/5 hover:border-accent/10 transition-all flex items-center justify-between cursor-default"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                     <div className="w-1 h-1 bg-accent/40 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-accent/80 leading-none">{item.id}</h4>
                    <p className="font-mono text-[8px] text-accent/30 uppercase tracking-widest mt-1">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="font-mono text-[8px] text-accent/40 uppercase tracking-widest">{item.date}</p>
                   <p className="font-mono text-[7px] text-accent/20 uppercase tracking-widest mt-1">Density: {item.density}</p>
                </div>
              </div>
            ))}
            
            <div className="p-8 border border-dashed border-white/5 flex flex-col items-center justify-center gap-4 opacity-40 grayscale">
               <div className="font-mono text-[8px] uppercase tracking-widest">End Of Ledger</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-24 font-mono text-[8px] tracking-[0.4em] text-accent/10 uppercase">
        System State Idle Database Links 3 Active
      </footer>
    </div>
  );
};

export default Dashboard;
