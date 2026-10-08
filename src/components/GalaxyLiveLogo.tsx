import React from 'react';
import { FOUNDER_INFO } from '../data/mockData';

interface GalaxyLiveLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const GalaxyLiveLogo: React.FC<GalaxyLiveLogoProps> = ({ 
  size = 'md',
  showSubtitle = true 
}) => {
  return (
    <div className="flex items-center gap-3 select-none group whitespace-nowrap flex-shrink-0">
      {/* Cosmic Emblem Icon */}
      <div className="relative flex-shrink-0">
        {/* Soft Ambient Aqua Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Emblem Frame */}
        <div className="relative w-11 h-11 rounded-[14px] p-[1.5px] bg-gradient-to-br from-cyan-300 via-teal-400 to-purple-600 shadow-xl shadow-cyan-950/50">
          <div className="w-full h-full rounded-[12.5px] bg-gradient-to-b from-[#0a1128] via-[#070b1c] to-[#040714] flex items-center justify-center overflow-hidden relative">
            
            {/* Subtle nebula light in background */}
            <div className="absolute inset-0 bg-radial-gradient from-cyan-500/20 via-transparent to-transparent pointer-events-none" />

            {/* Galactic Star SVG Vector */}
            <svg 
              className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central Galactic 4-Point Star */}
              <path 
                d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" 
                fill="url(#galaxyStarGrad)"
              />
              {/* Secondary Micro Star (Top Right) */}
              <path 
                d="M19 4C19 5.5 17.5 7 16 7C17.5 7 19 8.5 19 10C19 8.5 20.5 7 22 7C20.5 7 19 5.5 19 4Z" 
                fill="#67e8f9"
                opacity="0.9"
              />
              {/* Satellite Pulse Orbit Dot (Bottom Left) */}
              <circle cx="5" cy="18" r="1.5" fill="#38bdf8" />
              
              <defs>
                <linearGradient id="galaxyStarGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" />
                  <stop offset="0.45" stopColor="#67e8f9" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Broadcast Live Pulse Dot */}
            <span className="absolute bottom-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            </span>
          </div>
        </div>
      </div>

      {/* Brand Typography & Verification */}
      <div className="flex flex-col justify-center">
        {/* Brand Name Row */}
        <div className="flex items-center gap-2">
          <div className="flex items-center text-lg sm:text-xl font-black tracking-tight leading-none font-['Cabinet_Grotesk']">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
              GALAXY
            </span>
            <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
              LIVE
            </span>
          </div>

          {/* Luxury Glassmorphism AGENCY Badge */}
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-cyan-200 bg-cyan-950/60 border border-cyan-400/40 shadow-sm backdrop-blur-md flex items-center gap-1 group-hover:border-cyan-300 transition-colors">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            <span>AGENCY</span>
          </span>
        </div>

        {/* Subtitle with Official Verified Badge */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-300 font-medium">
            <span className="text-slate-400">By</span>
            <span className="font-bold text-white tracking-wide">CEO {FOUNDER_INFO.name}</span>
            
            {/* Official Blue Tick Verified Icon */}
            <span 
              className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-black shadow-sm"
              title="Doanh nghiệp & Giám đốc đã xác minh chính thức"
            >
              <svg className="w-2.5 h-2.5 text-[#040714] stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
