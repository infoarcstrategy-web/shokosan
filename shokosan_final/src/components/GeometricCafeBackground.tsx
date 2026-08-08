import React from 'react';

export const GeometricCafeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Warm Ambient Radial Glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[#E4D5C7]/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl" />

      {/* Subtle Geometric Overlay Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#4A3E3D 1px, transparent 1px), linear-gradient(to right, #A87C66 1px, transparent 1px), linear-gradient(to bottom, #A87C66 1px, transparent 1px)`,
          backgroundSize: '32px 32px, 64px 64px, 64px 64px',
        }}
      />

      {/* Decorative Geometric Cafe Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A87C66" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8C5C42" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4A3E3D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="10%" cy="20%" r="280" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="8 8" />
        <circle cx="90%" cy="80%" r="350" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="12 12" />
        <path d="M-100,200 L600,-100 M-100,600 L1200,-100" stroke="url(#lineGrad)" strokeWidth="1" />
      </svg>
    </div>
  );
};
