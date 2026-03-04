import { useState } from 'react';
import PhotoCountSelector from './components/PhotoCountSelector';
import ThemeSelector from './components/ThemeSelector';
import CameraView from './components/CameraView';
import PhotoPreview from './components/PhotoPreview';
import './App.css';

function App() {
  const [step, setStep] = useState('count'); // count -> theme -> camera -> preview
  const [photoCount, setPhotoCount] = useState(4);
  const [theme, setTheme] = useState('classic');
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  const handleCountSelect = (count) => {
    setPhotoCount(count);
    setStep('theme');
  };

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setStep('camera');
  };

  const handlePhotosCaptured = (photos) => {
    setCapturedPhotos(photos);
    setStep('preview');
  };

  const handleRetake = () => {
    setCapturedPhotos([]);
    setStep('camera');
  };

  const handleStartOver = () => {
    setCapturedPhotos([]);
    setPhotoCount(4);
    setTheme('classic');
    setStep('count');
  };

  return (
    <div className="app">
      {step === 'count' && (
        <PhotoCountSelector onSelect={handleCountSelect} />
      )}
      
      {step === 'theme' && (
        <ThemeSelector 
          onSelect={handleThemeSelect}
          onBack={() => setStep('count')}
        />
      )}
      
      {step === 'camera' && (
        <CameraView 
          photoCount={photoCount}
          theme={theme}
          onComplete={handlePhotosCaptured}
          onBack={() => setStep('theme')}
        />
      )}
      
      {step === 'preview' && (
        <PhotoPreview 
          photos={capturedPhotos}
          theme={theme}
          onRetake={handleRetake}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;