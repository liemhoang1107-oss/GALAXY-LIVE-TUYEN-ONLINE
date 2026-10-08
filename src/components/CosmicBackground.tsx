import React from 'react';

export const CosmicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep cosmic base */}
      <div className="absolute inset-0 bg-[#070913]" />

      {/* Aurora Borealis Glow 1 (Cyan/Teal) */}
      <div 
        className="absolute -top-[20%] left-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-20 pointer-events-none animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 70%)'
        }}
      />

      {/* Aurora Glow 2 (Purple/Violet Nebula) */}
      <div 
        className="absolute top-[25%] -right-[15%] w-[55vw] h-[55vw] rounded-full blur-[150px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(217, 70, 239, 0.15) 50%, transparent 70%)'
        }}
      />

      {/* Warm Gold Stardust Glow */}
      <div 
        className="absolute top-[65%] left-[5%] w-[45vw] h-[45vw] rounded-full blur-[130px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(234, 88, 12, 0.1) 50%, transparent 70%)'
        }}
      />

      {/* Starfield grid simulation */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />
    </div>
  );
};
