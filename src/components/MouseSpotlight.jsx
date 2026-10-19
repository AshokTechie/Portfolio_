import React, { useEffect, useState } from 'react';

export const MouseSpotlight = () => {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
      style={{
        opacity,
        background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.08), rgba(139, 92, 246, 0.04), transparent 80%)`,
      }}
    />
  );
};
