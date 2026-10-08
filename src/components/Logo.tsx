import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-10 h-10', size = 40 }) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-sm shrink-0 border border-amber-400/40 bg-gradient-to-br from-[#081528] via-[#0F2444] to-[#071322] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label="MAYA Universiti Malaya Crest"
    >
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        className="w-full h-full p-0.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldMonogram" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <linearGradient id="crestGlow" cx="50%" cy="30%" r="65%" fx="50%" fy="30%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#081528" stopOpacity="0" />
          </linearGradient>
          <filter id="monogramGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Ambient background glow */}
        <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#crestGlow)" />

        {/* Subtle geometric hairline inner frame */}
        <rect
          x="6"
          y="6"
          width="52"
          height="52"
          rx="9"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="0.7"
          strokeOpacity="0.35"
          strokeDasharray="2.5 1"
        />

        {/* Top Heraldic Star / Diamond Crest */}
        <g filter="url(#monogramGlow)">
          <path
            d="M 32 11 L 33.8 14.8 L 37.6 16.6 L 33.8 18.4 L 32 22.2 L 30.2 18.4 L 26.4 16.6 L 30.2 14.8 Z"
            fill="url(#goldHighlight)"
          />
          <circle cx="23" cy="16.6" r="1.2" fill="#FDE68A" opacity="0.9" />
          <circle cx="41" cy="16.6" r="1.2" fill="#FDE68A" opacity="0.9" />
        </g>

        {/* Sophisticated Academic Monogram "M" (MAYA / Malaya) */}
        <g filter="url(#monogramGlow)">
          {/* Left Serif Column */}
          <path
            d="M 16.5 25.5 H 22.5 V 27.5 H 20.5 V 41 H 22.5 V 43 H 16.5 V 41 H 18.5 V 27.5 H 16.5 Z"
            fill="url(#goldMonogram)"
          />

          {/* Right Serif Column */}
          <path
            d="M 41.5 25.5 H 47.5 V 27.5 H 45.5 V 41 H 47.5 V 43 H 41.5 V 41 H 43.5 V 27.5 H 41.5 Z"
            fill="url(#goldMonogram)"
          />

          {/* Diagonal Chevron Apex */}
          <path
            d="M 19.5 27.5 L 32 39.5 L 44.5 27.5 H 42.5 L 32 36.8 L 21.5 27.5 Z"
            fill="url(#goldHighlight)"
          />

          {/* Center Vertical Drop */}
          <path
            d="M 32 36.8 V 43 H 30.5 V 38 Z"
            fill="url(#goldMonogram)"
            opacity="0.85"
          />

          {/* Open Academic Book Foundation Base Arc */}
          <path
            d="M 20 47.5 Q 26 44.8 32 46.5 Q 38 44.8 44 47.5 Q 38 45.8 32 47.5 Q 26 45.8 20 47.5 Z"
            fill="url(#goldHighlight)"
          />
        </g>
      </svg>
    </div>
  );
};
