import React, { useState } from 'react';
import { FileImage } from 'lucide-react';

function PhotoCountSelector({ onSelect, selectedCount }) {
  const options = [1, 3, 4, 6];

  return (
    <div className="session-settings-container">
      <div className="setting-header">
        <FileImage size={20} className="icon" />
        <h3 className="setting-title">PHOTOS</h3>
      </div>
      <div className="selector-buttons">
        {options.map(count => (
          <button
            key={count}
            className={`selector-button ${selectedCount === count ? 'selected' : ''}`}
            onClick={() => onSelect(count)}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}


export default PhotoCountSelector;