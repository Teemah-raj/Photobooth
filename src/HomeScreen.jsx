import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionSettings from './SessionSettings';
import { Camera } from 'lucide-react';

function HomeScreen() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    photos: 4,
    timer: 3,
    format: 'Portrait'
  });

  const handleStartSession = () => {
    navigate('/booth', { state: { settings } });
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
