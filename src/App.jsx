import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import ThemesScreen from './ThemesScreen';
import CameraScreen from './CameraScreen';
import GalleryScreen from './GalleryScreen';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/themes" element={<ThemesScreen />} />
            <Route path="/booth" element={<CameraScreen />} />
            <Route path="/gallery" element={<GalleryScreen />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;