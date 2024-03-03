import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId;
    if (showTooltip) {
      timeoutId = setTimeout(() => {
        setShowTooltip(false);
      }, 800); 
    }
    return () => clearTimeout(timeoutId);
  }, [showTooltip]);

  const handleMouseEnter = (e) => {
    setShowTooltip(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY + 15 });
    document.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY + 15 });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  return (
    <header onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
      <Link to="/">
        <img src="/Header.svg" alt="Header" className="w-full h-auto" />
        <div
          className={`absolute p-1 bg-white text-black text-xs shadow-md transition-opacity ${
            showTooltip ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: tooltipPosition.y, left: tooltipPosition.x + 30, transform: 'translate(-50%, 0)', zIndex: 50 }}
        >
          Home {/* Tooltip text */}
        </div>
      </Link>
    </header>
  );
}

export default Header;