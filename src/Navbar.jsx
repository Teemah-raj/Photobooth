import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Camera, GalleryHorizontal } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <Home />, label: 'Home' },
    { path: '/themes', icon: <Settings />, label: 'Themes' },
    { path: '/booth', icon: <Camera />, label: 'Booth' },
    { path: '/gallery', icon: <GalleryHorizontal />, label: 'Gallery' },
  ];

  return (
    <nav className="bottom-navbar">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          {item.icon}
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
