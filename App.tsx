import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import Dashboard from './components/Dashboard';
import ObjectScanner from './components/ObjectScanner';
import AnalysisPanel from './components/AnalysisPanel';
import BlueprintResult from './components/BlueprintResult';

type ScreenState = 'LANDING' | 'DASHBOARD' | 'SCANNER' | 'ANALYSIS' | 'RESULT';

interface DetectedObject {
  name: string;
  box_2d: [number, number, number, number];
}

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

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('LANDING');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<DetectedObject | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressLabel, setProgressLabel] = useState('');
  const [blueprintData, setBlueprintData] = useState<BlueprintData | null>(null);

  const handleLaunch = () => setCurrentScreen('DASHBOARD');

  const handleUploadImage = (imageData: string) => {
    setUploadedImage(imageData);
    setCurrentScreen('SCANNER');
  };

  const handleCaptureImage = async (imageData: string) => {
    setIsProcessing(true);
    setProgressLabel('Analyzing neural pathways...');
    setCurrentScreen('ANALYSIS');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/minimax-vision`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: imageData,
          apiKey: import.meta.env.VITE_MINIMAX_API_KEY,
        }),
      });

      if (!response.ok) {
        throw new Error('Vision API failed');
      }

      const data = await response.json();
      setDetectedObjects(data.objects || []);
      setUploadedImage(imageData);
    } catch (err) {
      console.error('Object detection error:', err);
      alert('Neural sync error during object detection. Please try again.');
      setCurrentScreen('DASHBOARD');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateBlueprint = async (mode: 'assembly' | 'disassembly') => {
    if (!selectedObject || !uploadedImage) return;

    setIsProcessing(true);
    setProgressLabel(`Generating ${mode} blueprint...`);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/minimax-blueprint`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: uploadedImage,
          objectName: selectedObject.name,
          mode: mode,
          apiKey: import.meta.env.VITE_MINIMAX_API_KEY,
        }),
      });

      if (!response.ok) {
        throw new Error('Blueprint API failed');
      }

      const data = await response.json();
      setBlueprintData(data.blueprint);
      setCurrentScreen('RESULT');
    } catch (err) {
      console.error('Blueprint generation error:', err);
      alert('Failed to generate blueprint. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('DASHBOARD');
    setUploadedImage(null);
    setDetectedObjects([]);
    setSelectedObject(null);
    setBlueprintData(null);
  };

  const handleCancelAnalysis = () => {
    setCurrentScreen('DASHBOARD');
    setDetectedObjects([]);
    setSelectedObject(null);
  };

  return (
    <main className="min-h-screen w-full bg-paper text-accent font-body relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sepia/5 rounded-full blur-[140px] animate-glow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-sepia/5 rounded-full blur-[140px] animate-glow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 w-full h-full">
        {currentScreen === 'LANDING' && <LandingScreen onLaunch={handleLaunch} />}
        {currentScreen === 'DASHBOARD' && <Dashboard onUpload={handleUploadImage} />}
        {currentScreen === 'SCANNER' && (
          <ObjectScanner
            uploadedImage={uploadedImage}
            onCapture={handleCaptureImage}
            onBack={handleBackToDashboard}
          />
        )}
        {currentScreen === 'ANALYSIS' && (
          <AnalysisPanel
            imageData={uploadedImage || ''}
            isProcessing={isProcessing}
            progressLabel={progressLabel}
            detectedObjects={detectedObjects}
            selectedObject={selectedObject}
            onSelectObject={setSelectedObject}
            onGenerate={handleGenerateBlueprint}
            onCancel={handleCancelAnalysis}
          />
        )}
        {currentScreen === 'RESULT' && blueprintData && (
          <BlueprintResult
            objectDescription={selectedObject?.name || 'Unknown Object'}
            blueprint={blueprintData}
            onClose={handleBackToDashboard}
          />
        )}
      </div>
    </main>
  );
};

export default App;
