import React, { useState } from 'react';
import PhotoCountSelector from './PhotoCountSelector';
import TimerSelector from './TimerSelector';
import FormatSelector from './FormatSelector';
import { Settings } from 'lucide-react';

function SessionSettings({ settings, onUpdate }) {
  return (
    <div className="session-settings-card">
      <div className="session-settings-header">
        <Settings size={24} className="icon" />
        <h2>Session Settings</h2>
      </div>
      <div className="session-settings-body">
        <PhotoCountSelector 
          onSelect={(count) => onUpdate({ ...settings, photos: count })} 
          selectedCount={settings.photos} 
        />
        <TimerSelector 
          onSelect={(timer) => onUpdate({ ...settings, timer: timer })} 
          selectedTimer={settings.timer} 
        />
        <FormatSelector 
          onSelect={(format) => onUpdate({ ...settings, format: format })} 
          selectedFormat={settings.format} 
        />
      </div>
    </div>
  );
}

export default SessionSettings;
