import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  layout?: 'horizontal' | 'vertical';
  theme?: 'default' | 'dark' | 'light';
  className?: string;
  showSubtitle?: boolean;
  showBadge?: boolean;
}

export const HawkSpectraLogo: React.FC<LogoProps> = ({
  size = 'md',
  layout = 'horizontal',
  theme = 'light',
  className = '',
  showSubtitle = true,
  showBadge = true
}) => {
  const isDark = theme === 'dark';
  const isCyber = theme === 'default';

  // Sizing dimensions - prominent and clear
  const iconDimensions = {
    sm: 'w-10 h-10',
    md: 'w-13 h-13 sm:w-14 sm:h-14',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    hero: 'w-28 h-28 sm:w-32 sm:h-32'
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    hero: 'text-4xl sm:text-5xl'
  }[size];

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col items-center text-center' : 'items-center gap-3.5'} ${className}`}>
      {/* Hawk Head with Spectral Camera Lens Eye & HS Monogram */}
      <div className={`relative ${iconDimensions} shrink-0 group`}>
        {/* Spectral Prismatic Ambient Aura */}
        <div 
          className={`absolute -inset-1.5 rounded-full blur-md opacity-65 group-hover:opacity-95 transition-opacity pointer-events-none ${
            isCyber
              ? 'bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-violet-500/40'
              : isDark
              ? 'bg-gradient-to-r from-sky-500/25 via-indigo-500/20 to-amber-500/25'
              : 'bg-gradient-to-r from-sky-400/25 via-teal-400/20 to-amber-400/25'
          }`} 
        />

        {/* High-Resolution SVG Hawk + Spectral Camera Eye Emblem */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for Feathers */}
            <linearGradient id="hs-feather-dark" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#091428" />
            </linearGradient>

            <linearGradient id="hs-feather-blue" x1="40" y1="30" x2="160" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="40%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="hs-feather-cyan" x1="40" y1="20" x2="140" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Gold Gradients for Beak & Wing Trim */}
            <linearGradient id="hs-gold-main" x1="90" y1="50" x2="180" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            <linearGradient id="hs-gold-feather" x1="30" y1="60" x2="110" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Camera Lens Bezel Gradient (Metallic Platinum) */}
            <linearGradient id="hs-lens-metallic-ring" x1="70" y1="50" x2="130" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="20%" stopColor="#94a3b8" />
              <stop offset="45%" stopColor="#334155" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="90%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="hs-lens-inner-ring" x1="80" y1="60" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Spectral Iris Chamber - Rainbow/Prismatic Dispersion */}
            <linearGradient id="hs-spectral-depth" x1="75" y1="75" x2="125" y2="125" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="35%" stopColor="#1e1b4b" />
              <stop offset="70%" stopColor="#3b0764" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* HS Chrome Gold Monogram */}
            <linearGradient id="hs-gold-monogram" x1="82" y1="72" x2="122" y2="116" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="80%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Lens Reflection Glass Arc */}
            <linearGradient id="hs-lens-reflection" x1="85" y1="70" x2="115" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </linearGradient>

            {/* Drop Shadows & Glow */}
            <filter id="hs-lens-shadow" x="50" y="40" width="100" height="100" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
            </filter>
            <filter id="hs-monogram-glow" x="70" y="60" width="65" height="65" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="#f59e0b" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* ================= HAWK PROFILE FEATHERS ================= */}
          
          {/* Back/Top Crest Feathers */}
          <g id="hs-crown-feathers">
            {/* Topmost Feather Spur 1 */}
            <path
              d="M 68 28 C 88 20 118 25 145 42 C 128 40 108 42 92 48 C 112 45 132 50 148 60 C 120 54 95 62 76 74 C 95 65 118 68 135 76 C 108 72 82 82 65 98 Z"
              fill="url(#hs-feather-dark)"
            />
            {/* Cyan/Blue Crest Accents */}
            <path
              d="M 72 32 C 90 25 115 30 138 44 C 122 43 105 45 92 50 C 110 48 126 53 140 62 C 115 57 92 65 76 75 C 92 68 112 70 128 78 C 105 75 80 84 66 98 Z"
              fill="url(#hs-feather-cyan)"
              opacity="0.85"
            />
            {/* Gold Highlights in Crown */}
            <path
              d="M 85 32 C 102 28 122 34 135 44 C 122 43 108 46 96 50 C 112 48 125 54 136 62 C 115 58 96 66 84 74 Z"
              fill="url(#hs-gold-feather)"
              opacity="0.9"
            />
          </g>

          {/* Rear Wing/Neck Tufts (Left Side) */}
          <g id="hs-rear-feathers">
            {/* Layer 1 - Deep Navy */}
            <path
              d="M 65 95 C 48 80 32 60 18 50 C 28 68 38 88 35 105 C 22 92 12 78 5 68 C 12 88 22 108 24 125 C 14 112 5 100 0 92 C 8 115 20 135 32 148 C 22 140 12 130 5 120 C 16 142 32 160 52 168 C 42 160 30 150 25 142 C 38 160 58 174 80 180 C 65 174 52 165 44 155 C 60 170 82 178 108 175 C 92 168 78 155 70 142 Z"
              fill="url(#hs-feather-dark)"
            />
            {/* Layer 2 - Mid Blue Sharp Tufts */}
            <path
              d="M 68 98 C 52 86 38 70 26 60 C 34 78 42 96 40 110 C 28 98 20 86 14 78 C 20 96 30 115 32 128 C 22 118 15 108 10 100 C 18 120 30 138 40 148 C 30 140 22 132 16 124 C 26 144 42 158 60 166 C 50 158 40 148 35 140 C 46 156 65 168 85 172 C 72 166 60 156 54 146 Z"
              fill="url(#hs-feather-blue)"
            />
            {/* Layer 3 - Electric Cyan Highlights */}
            <path
              d="M 70 102 C 58 92 46 80 36 72 C 42 86 48 100 46 112 C 36 102 30 92 24 85 C 30 102 38 118 40 128 C 32 120 26 112 20 105 C 28 122 38 138 48 146 C 40 140 32 132 28 125 C 38 142 52 154 68 160 Z"
              fill="url(#hs-feather-cyan)"
            />
            {/* Layer 4 - Gold Feather Inlays */}
            <path
              d="M 68 110 C 58 102 48 92 42 86 C 46 98 50 110 48 120 C 40 112 35 105 30 98 C 36 112 44 125 46 134 C 40 128 34 120 30 115 C 38 130 50 144 62 150 C 55 144 48 138 44 132 C 54 145 68 154 82 158 Z"
              fill="url(#hs-gold-feather)"
            />
          </g>

          {/* Hawk Face, Crown & Forehead */}
          <g id="hs-face-body">
            <path
              d="M 70 45 C 95 38 128 42 152 58 C 160 64 165 72 168 82 C 162 80 155 78 145 78 C 158 84 165 92 168 102 C 158 98 148 98 138 98 C 152 108 158 118 158 128 C 145 120 135 118 124 118 C 135 128 138 138 135 148 C 122 138 110 135 98 134 C 108 145 108 156 102 165 C 92 152 82 145 72 140 Z"
              fill="url(#hs-feather-dark)"
            />
            {/* Eyebrow Ridge in Blue & Cyan */}
            <path
              d="M 75 52 C 96 46 122 50 142 64 C 148 68 154 75 158 82 C 148 76 136 74 122 74 C 136 80 145 88 148 96 C 135 90 122 90 110 92 C 125 100 132 110 132 120 C 120 112 110 110 98 112 Z"
              fill="url(#hs-feather-blue)"
            />
            {/* Gold Eyebrow Accent */}
            <path
              d="M 90 56 C 108 52 130 58 144 70 C 140 68 132 66 120 66 C 132 72 140 78 144 85 C 132 80 120 80 110 82 Z"
              fill="url(#hs-gold-main)"
            />
          </g>

          {/* ================= HAWK HOOKED BEAK ================= */}
          <g id="hs-beak">
            {/* Upper Hooked Golden Beak */}
            <path
              d="M 148 78 C 160 82 172 90 182 104 C 190 116 195 130 192 145 C 188 154 180 152 176 142 C 172 132 165 125 155 122 C 145 120 138 122 132 124 C 138 116 145 108 150 98 C 142 98 134 98 126 100 C 134 92 142 85 148 78 Z"
              fill="url(#hs-gold-main)"
            />
            {/* Beak Chrome Highlight */}
            <path
              d="M 152 82 C 162 86 174 95 182 108 C 188 118 191 130 188 140 C 185 130 178 122 168 118 C 158 115 148 116 142 118 C 148 110 152 102 156 94 Z"
              fill="#fef08a"
              opacity="0.6"
            />
            {/* Nostril */}
            <path
              d="M 148 94 C 154 94 158 96 160 98 C 156 100 150 100 146 98 Z"
              fill="#78350f"
            />
            {/* Lower Beak */}
            <path
              d="M 148 122 C 158 124 166 130 170 138 C 164 142 155 140 146 134 C 138 130 132 126 128 124 Z"
              fill="#d97706"
            />
            {/* Throat Feather Crest */}
            <path
              d="M 132 126 C 140 135 142 146 138 158 C 130 148 122 142 114 140 C 120 150 120 162 114 172 C 106 160 98 152 88 148 Z"
              fill="url(#hs-feather-dark)"
            />
            {/* Gold Throat Accent */}
            <path
              d="M 126 132 C 132 140 134 148 130 156 C 124 148 118 144 112 142 C 116 150 116 158 112 166 C 105 156 98 150 92 146 Z"
              fill="url(#hs-gold-feather)"
            />
          </g>

          {/* ================= CAMERA LENS EYE ASSEMBLY ================= */}
          <g id="hs-camera-lens-eye" filter="url(#hs-lens-shadow)">
            {/* Outer Lens Housing Frame (Camera Aperture Mount) */}
            <circle cx="102" cy="98" r="42" fill="url(#hs-lens-metallic-ring)" />
            <circle cx="102" cy="98" r="38" fill="#0f172a" />

            {/* Aperture / Lens Step Ring */}
            <circle cx="102" cy="98" r="36" fill="url(#hs-lens-inner-ring)" />
            <circle cx="102" cy="98" r="32" stroke="url(#hs-lens-metallic-ring)" strokeWidth="2.5" />

            {/* Spectral Graticules / Wavelength Scales */}
            <circle cx="102" cy="98" r="28" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.7" />
            <circle cx="102" cy="98" r="25" stroke="#a855f7" strokeWidth="1" strokeDasharray="1.5 2" opacity="0.55" />

            {/* Deep Prismatic Glass Element (Spectra Depth) */}
            <circle cx="102" cy="98" r="23" fill="url(#hs-spectral-depth)" />

            {/* Lens Reflection Arc (Glint) */}
            <path
              d="M 83 88 C 88 78 98 75 110 77 C 104 80 94 84 90 92 Z"
              fill="url(#hs-lens-reflection)"
            />

            {/* ================= HS MONOGRAM (HawkSpectra) ================= */}
            <g id="hs-monogram" filter="url(#hs-monogram-glow)">
              {/* Bold 'H' - Left Vertical Stem */}
              <rect
                x="84"
                y="85"
                width="4.5"
                height="26"
                rx="1.5"
                fill="url(#hs-gold-monogram)"
              />
              {/* Bold 'H' - Crossbar */}
              <rect
                x="88"
                y="96"
                width="7"
                height="4"
                rx="1"
                fill="url(#hs-gold-monogram)"
              />
              {/* Bold 'H' - Right Vertical Stem */}
              <rect
                x="94.5"
                y="85"
                width="4.5"
                height="26"
                rx="1.5"
                fill="url(#hs-gold-monogram)"
              />

              {/* Perfectly Upright & Balanced Standard 'S' (Crisp Latin 'S' for Spectra) */}
              {/* S Outer Gold Stroke */}
              <path
                d="M 117 90.5 C 117 86.2 113.8 84.5 109.8 84.5 C 105.2 84.5 102.5 87.2 102.5 91 C 102.5 95.2 105.8 97.2 109.5 98.2 C 113.8 99.5 117.5 101.5 117.5 105.8 C 117.5 110.2 113.8 112.5 109.2 112.5 C 104.5 112.5 102 109.2 102 105"
                stroke="url(#hs-gold-monogram)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* S Inner Core Highlight */}
              <path
                d="M 116.5 90.5 C 116.5 87 113.5 85.5 109.8 85.5 C 106 85.5 103.5 87.8 103.5 91 C 103.5 94.8 106.2 96.8 109.5 98 C 113.5 99.2 116.5 101.2 116.5 105.5 C 116.5 109.2 113.5 111.5 109.2 111.5 C 105.2 111.5 103 108.8 103 105.2"
                stroke="#fef08a"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.8"
              />

              {/* Center Interlock Specular Glint */}
              <circle cx="101" cy="98" r="1.5" fill="#ffffff" />
            </g>

            {/* Camera Optical Flare Points */}
            <circle cx="124" cy="78" r="2" fill="#ffffff" />
            <line x1="120" y1="78" x2="128" y2="78" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <line x1="124" y1="74" x2="124" y2="82" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Typography: Name, Tagline & Badge */}
      <div className={layout === 'vertical' ? 'mt-3 flex flex-col items-center' : 'flex flex-col'}>
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight ${titleSizes} ${
            isCyber 
              ? 'text-white' 
              : isDark 
              ? 'text-neutral-100' 
              : 'text-slate-900'
          }`}>
            <span className={
              isCyber 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-sky-300' 
                : isDark
                ? 'text-white'
                : 'text-slate-900'
            }>
              HAWKSPECTRA
            </span>
          </span>

          {showBadge && (
            <span className={`text-[10px] uppercase font-mono font-black tracking-wider px-2 py-0.5 rounded-md border shadow-xs ${
              isCyber
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700/80 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                : isDark
                ? 'bg-neutral-800 text-sky-400 border-neutral-700'
                : 'bg-gradient-to-r from-sky-50 to-amber-50 text-slate-800 border-slate-300'
            }`}>
              v4.2 AI
            </span>
          )}
        </div>

        {showSubtitle && (
          <p className={`text-[11px] font-bold tracking-wider uppercase ${
            isCyber
              ? 'text-cyan-400/85'
              : isDark
              ? 'text-neutral-400'
              : 'text-slate-500'
          }`}>
            Neural Spectrum | Forensic Intelligence
          </p>
        )}
      </div>
    </div>
  );
};

// Backward-compatibility alias
export const HawkVisionLogo = HawkSpectraLogo;
