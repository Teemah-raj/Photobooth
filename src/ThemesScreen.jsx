import React from 'react';
import { Check } from 'lucide-react';

function ThemesScreen({ settings, setSettings }) {
  const themes = [
    { name: 'Vintage', description: 'Classic warm tones and slight grain.', filter: 'sepia(0.3) contrast(1.1) brightness(0.9)' },
    { name: 'Black & White', description: 'Timeless monochrome with deep contrast.', filter: 'grayscale(1) contrast(1.2)' },
    { name: 'Sepia', description: 'A nostalgic brownish tint from the past.', filter: 'sepia(1) contrast(0.9)' },
    { name: 'Modern', description: 'Clean, vibrant, and high clarity.', filter: 'saturate(1.2) contrast(1.05)' },
    { name: 'Cyberpunk', description: 'Cool blues and neon pinks.', filter: 'hue-rotate(280deg) saturate(1.5)' },
  ];

  const handleThemeSelect = (themeName) => {
    setSettings({ ...settings, theme: themeName });
  };

  return (
    <div className="themes-screen-container">
      <h1 className="themes-title">Choose a Theme</h1>
      <p className="themes-subtitle">Select the look and feel for your photo session.</p>
      
      <div className="themes-grid">
        {themes.map((theme) => (
          <div 
            key={theme.name} 
            className={`theme-card ${settings.theme === theme.name ? 'selected' : ''}`}
            onClick={() => handleThemeSelect(theme.name)}
          >
            <div className="theme-preview" style={{ filter: theme.filter }}>
              <div className="preview-image"></div>
              {settings.theme === theme.name && (
                <div className="selected-badge">
                  <Check size={20} />
                </div>
              )}
            </div>
            <div className="theme-info">
              <h3 className="theme-name">{theme.name}</h3>
              <p className="theme-description">{theme.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemesScreen;