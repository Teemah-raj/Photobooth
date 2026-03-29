import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import ThemesScreen from './ThemesScreen';
import CameraScreen from './CameraScreen';
import GalleryScreen from './GalleryScreen';
import Navbar from './Navbar';
import './App.css';

function App() {
  const [settings, setSettings] = useState({
    photos: 4,
    timer: 3,
    format: 'Portrait',
    theme: 'Vintage'
  });

  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeScreen settings={settings} setSettings={setSettings} />} />
            <Route path="/themes" element={<ThemesScreen settings={settings} setSettings={setSettings} />} />
            <Route path="/booth" element={<CameraScreen settings={settings} />} />
            <Route path="/gallery" element={<GalleryScreen />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;