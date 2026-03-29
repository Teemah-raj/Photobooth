import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionSettings from './SessionSettings';
import { Camera } from 'lucide-react';

function HomeScreen({ settings, setSettings }) {
  const navigate = useNavigate();

  const handleStartSession = () => {
    navigate('/booth');
  };

  return (
    <div className="home-screen">
      <div className="main-title-container">
        <Camera size={48} className="icon" />
        <h1 className="main-title">Vintage Booth</h1>
        <p className="subtitle">Capture moments in timeless style.</p>
      </div>
      <SessionSettings settings={settings} onUpdate={setSettings} />
      <button className="start-session-button" onClick={handleStartSession}>
        START SESSION
      </button>
    </div>
  );
}

export default HomeScreen;
