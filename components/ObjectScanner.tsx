
import React, { useRef, useEffect, useState } from 'react';
import { 
  ScannerBeam, 
  TechCorner, 
  DataStream, 
  TargetAnchor, 
  PulseOscilloscope, 
  PrecisionCaliper, 
  ClockworkEscapement 
} from './Doodles';

interface ObjectScannerProps {
  uploadedImage?: string | null;
  onCapture: (imageData: string) => void;
  onBack: () => void;
}

const ObjectScanner: React.FC<ObjectScannerProps> = ({ uploadedImage, onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only setup camera if no uploaded image is provided
    if (!uploadedImage) {
      async function setupCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          setError("Optical sensor offline Please verify hardware permissions");
        }
      }
      setupCamera();

      return () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      };
    }
  }, [uploadedImage]);

  const handleScan = async () => {
    if (isScanning) return;
    setIsScanning(true);
    
    // Simulate Neural Link Analysis
    setTimeout(() => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      let imageData = uploadedImage || "";

      if (!uploadedImage && video && canvas) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        imageData = canvas.toDataURL('image/jpeg', 0.8);
      }
      
      onCapture(imageData);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-paper flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0 z-0 blueprint-grid opacity-[0.15]"></div>
      
      {/* SCANNER VIEWPORT */}
      <div className="relative w-full h-full max-w-[95vw] max-h-[85vh] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex items-center justify-center bg-black overflow-hidden">
        {uploadedImage ? (
          <img 
            src={uploadedImage} 
            className="w-full h-full object-contain filter brightness-[0.5] contrast-[1.3] grayscale"
            alt="Virtual Optic"
          />
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.2] grayscale saturate-[0.1]"
          />
        )}
        
        {/* HUD OVERLAY - TACTICAL DESIGN */}
        <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <TechCorner className="text-accent opacity-80" />
              <div className="ml-2 font-mono text-[9px] text-accent/60 uppercase tracking-[0.4em]">
                {uploadedImage ? 'Virtual Feed Deep Lens' : 'Live Feed Optic 01'}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-accent/10 border border-accent/20 px-3 py-1 rounded-sm flex items-center gap-2">
                <span className={`w-1.5 h-1.5 ${uploadedImage ? 'bg-blue-500' : 'bg-red-500'} rounded-full animate-pulse`}></span>
                <span className="font-mono text-[8px] text-accent uppercase tracking-widest">{uploadedImage ? 'DEEP SCAN' : 'REC NEURAL'}</span>
              </div>
              <PulseOscilloscope className="scale-75 opacity-40 translate-x-4" />
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <TargetAnchor className="scale-[2] opacity-40" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 flex flex-col items-center">
              <div className="w-[1px] h-12 bg-gradient-to-b from-accent/40 to-transparent"></div>
              <div className="text-[7px] font-mono text-accent/20 uppercase tracking-[1em] mt-2">Alignment Sync</div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <PrecisionCaliper className="opacity-30 scale-90 -translate-x-8" />
              <div className="font-mono text-[8px] text-accent/30 space-y-1">
                <div>X POS: 104.22</div>
                <div>Y POS: 002.94</div>
                <div>SOURCE: {uploadedImage ? 'VIRTUAL' : 'LOCAL'}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-4">
              <ClockworkEscapement className="scale-[0.6] opacity-20" />
              <div className="font-mono text-[8px] text-accent/30 uppercase tracking-[0.2em] text-right">
                System Status Optimal<br/>
                Buffer Link Established
              </div>
            </div>
          </div>

          <ScannerBeam className="absolute inset-0 opacity-40" />
          <div className="absolute inset-0 border-[40px] border-paper/40 pointer-events-none"></div>
        </div>

        {isScanning && (
          <div className="absolute inset-0 bg-paper/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-12">
            <div className="relative mb-12">
              <div className="w-20 h-20 border-[1px] border-accent/20 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="text-center space-y-4 max-w-xs">
              <h3 className="font-serif text-xl font-bold text-accent tracking-tighter">Deconstructing Reality...</h3>
              <p className="font-mono text-[9px] text-accent/40 uppercase tracking-[0.3em] animate-pulse">
                {uploadedImage ? 'Deep Frame Reconstruction' : 'Mapping Structural Nodes and Neural Pathways'}
              </p>
              <DataStream className="opacity-20 mt-8" />
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="fixed bottom-0 left-0 w-full p-12 flex justify-between items-center z-[60]">
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 font-mono text-[10px] text-accent/40 uppercase tracking-[0.5em] hover:text-accent transition-colors"
        >
          <span className="text-lg">←</span>
          [ ABORT LOG ]
        </button>

        <button 
          onClick={handleScan}
          disabled={isScanning}
          className="group relative w-24 h-24 flex items-center justify-center"
        >
          <div className="absolute inset-0 border border-accent/20 rounded-full group-hover:scale-110 group-hover:border-accent/40 transition-all duration-500"></div>
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(245,242,240,0.2)] group-active:scale-90 transition-transform">
            <div className="w-14 h-14 border border-paper/10 rounded-full"></div>
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[7px] text-accent/40 uppercase tracking-[0.5em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {uploadedImage ? 'Analyze Virtual Optic' : 'Capture Neural Stamp'}
          </div>
        </button>

        <div className="w-40 text-right space-y-1">
          <div className="font-mono text-[8px] text-accent/20 uppercase tracking-[0.3em]">
            Vect 02 Ready
          </div>
          <div className="font-mono text-[8px] text-accent/20 uppercase tracking-[0.3em]">
            ID Protocol Active
          </div>
        </div>
      </div>

      {error && (
        <div className="absolute top-12 bg-espresso border border-red-500/30 text-red-500/80 px-8 py-3 font-mono text-[10px] uppercase tracking-widest z-[70] animate-slide-up">
          {error}
        </div>
      )}
    </div>
  );
};

export default ObjectScanner;
