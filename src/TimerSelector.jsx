import React from 'react';
import { Timer } from 'lucide-react';

function TimerSelector({ onSelect, selectedTimer }) {
  const options = [3, 5, 10];

  return (
    <div className="session-settings-container">
      <div className="setting-header">
        <Timer size={20} className="icon" />
        <h3 className="setting-title">TIMER</h3>
      </div>
      <div className="selector-buttons">
        {options.map(timer => (
          <button
            key={timer}
            className={`selector-button ${selectedTimer === timer ? 'selected' : ''}`}
            onClick={() => onSelect(timer)}
          >
            {timer}s
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimerSelector;
