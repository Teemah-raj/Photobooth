import React from 'react';
import { RectangleHorizontal, RectangleVertical } from 'lucide-react';

function FormatSelector({ onSelect, selectedFormat }) {
  const options = ['Portrait', 'Landscape'];

  return (
    <div className="session-settings-container">
      <div className="setting-header">
        {selectedFormat === 'Portrait' ? (
          <RectangleVertical size={20} className="icon" />
        ) : (
          <RectangleHorizontal size={20} className="icon" />
        )}
        <h3 className="setting-title">FORMAT</h3>
      </div>
      <div className="selector-buttons">
        {options.map(format => (
          <button
            key={format}
            className={`selector-button ${selectedFormat === format ? 'selected' : ''}`}
            onClick={() => onSelect(format)}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FormatSelector;
