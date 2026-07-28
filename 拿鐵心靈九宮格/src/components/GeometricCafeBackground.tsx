import React from 'react';

export const GeometricCafeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 select-none">
      <svg
        className="w-full h-full text-[#A87C66]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
      >
        <defs>
          {/* Subtle gradient lines */}
          <linearGradient id="geoLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A87C66" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#8C5C42" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4A3E3D" stopOpacity="0.1" />
          </linearGradient>

          {/* Light cone gradient for pendant lamps */}
          <linearGradient id="lampConeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A87C66" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#A87C66" stopOpacity="0" />
          </linearGradient>

          {/* Diagonal Line Pattern for Bar Wood Grid */}
          <pattern id="woodGridPattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="#A87C66" strokeWidth="0.8" strokeOpacity="0.15" />
          </pattern>

          {/* Hexagonal / Diamond Backsplash Tile Pattern */}
          <pattern id="tileBacksplashPattern" width="60" height="34.64" patternUnits="userSpaceOnUse">
            <path
              d="M 30 0 L 60 17.32 L 60 34.64 L 30 17.32 Z M 0 17.32 L 30 0 L 30 17.32 L 0 34.64 Z"
              stroke="#A87C66"
              strokeWidth="0.5"
              strokeOpacity="0.12"
              fill="none"
            />
          </pattern>
        </defs>

        {/* --- GEOMETRIC BACKGROUND TILE BACKSPLASH --- */}
        <rect x="0" y="0" width="1440" height="620" fill="url(#tileBacksplashPattern)" />

        {/* --- 0. GEOMETRIC ARCH WINDOWS (LEFT & RIGHT) --- */}
        <g strokeWidth="1.2" strokeOpacity="0.25">
          {/* Left Arch Window */}
          <path d="M 60 480 L 60 220 A 80 80 0 0 1 220 220 L 220 480 Z" />
          <line x1="140" y1="140" x2="140" y2="480" />
          <line x1="60" y1="280" x2="220" y2="280" />
          <line x1="60" y1="380" x2="220" y2="380" />
          {/* Distant Geometric Sun/Hills in Left Window */}
          <circle cx="140" cy="240" r="28" strokeDasharray="3 3" />
          <path d="M 60 420 L 110 370 L 160 420 L 220 360" strokeOpacity="0.2" />

          {/* Right Arch Window */}
          <path d="M 1220 480 L 1220 220 A 80 80 0 0 1 1380 220 L 1380 480 Z" />
          <line x1="1300" y1="140" x2="1300" y2="480" />
          <line x1="1220" y1="280" x2="1380" y2="280" />
          <line x1="1220" y1="380" x2="1380" y2="380" />
          {/* Distant Geometric Mountain Rays in Right Window */}
          <path d="M 1220 400 L 1270 340 L 1320 400 L 1380 330" strokeOpacity="0.2" />
        </g>

        {/* --- 1. CENTER GEOMETRIC MENU BOARD & WALL CLOCK --- */}
        <g strokeWidth="1.4" strokeOpacity="0.45">
          {/* Main Wooden Menu Frame */}
          <rect x="520" y="40" width="400" height="150" rx="6" />
          <rect x="530" y="50" width="380" height="130" rx="4" strokeDasharray="4 2" />
          
          {/* Menu Title / Lines */}
          <text x="720" y="75" textAnchor="middle" stroke="none" fill="#A87C66" fillOpacity="0.7" fontSize="13" fontWeight="bold" fontFamily="serif" letterSpacing="2">
            SPECIALTY LATTE & MATRIX COFFEE
          </text>
          <line x1="560" y1="85" x2="880" y2="85" strokeWidth="1" strokeOpacity="0.3" />

          {/* Menu Items Columns */}
          <line x1="560" y1="105" x2="680" y2="105" strokeWidth="1.2" />
          <line x1="740" y1="105" x2="880" y2="105" strokeDasharray="3 3" strokeWidth="1" />
          <circle cx="870" cy="105" r="2" fill="#A87C66" fillOpacity="0.5" />

          <line x1="560" y1="125" x2="700" y2="125" strokeWidth="1.2" />
          <line x1="750" y1="125" x2="880" y2="125" strokeDasharray="3 3" strokeWidth="1" />
          <circle cx="870" cy="125" r="2" fill="#A87C66" fillOpacity="0.5" />

          <line x1="560" y1="145" x2="660" y2="145" strokeWidth="1.2" />
          <line x1="720" y1="145" x2="880" y2="145" strokeDasharray="3 3" strokeWidth="1" />
          <circle cx="870" cy="145" r="2" fill="#A87C66" fillOpacity="0.5" />

          {/* Geometric Wall Clock (Left of Menu) */}
          <circle cx="440" cy="100" r="32" strokeWidth="1.8" />
          <circle cx="440" cy="100" r="28" strokeDasharray="2 4" strokeWidth="0.8" />
          <circle cx="440" cy="100" r="3" fill="#A87C66" fillOpacity="0.7" />
          {/* Clock Hands pointing to 9 o'clock */}
          <line x1="440" y1="100" x2="420" y2="100" strokeWidth="2" strokeLinecap="round" />
          <line x1="440" y1="100" x2="440" y2="82" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* --- 2. TOP SHELVES & CAFE DISPLAY RACKS --- */}
        <g strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="6 4">
          {/* Top Hanging Rack Line */}
          <line x1="0" y1="180" x2="1440" y2="180" />
          <line x1="0" y1="240" x2="1440" y2="240" />
          
          {/* Vertical Shelves dividers */}
          <line x1="260" y1="0" x2="260" y2="240" />
          <line x1="480" y1="0" x2="480" y2="240" />
          <line x1="960" y1="0" x2="960" y2="240" />
          <line x1="1180" y1="0" x2="1180" y2="240" />
        </g>

        {/* Shelf Items (Geometric Jars, Beans, V60 Drippers, Plants) */}
        <g strokeWidth="1.5" strokeOpacity="0.45">
          {/* Left Shelf Jars & Syrup Bottles */}
          <rect x="280" y="188" width="30" height="48" rx="4" />
          <line x1="280" y1="198" x2="310" y2="198" />
          <rect x="320" y="182" width="36" height="54" rx="6" />
          <circle cx="338" cy="208" r="8" />

          {/* Geometric Plant Pot (Left Shelf) */}
          <polygon points="375,236 415,236 410,200 380,200" />
          <path d="M 385 200 C 370 170, 390 160, 395 190 C 405 160, 425 170, 410 200" strokeWidth="1.2" />

          {/* Right Shelf V60 Drippers & Specialty Coffee Bags */}
          <polygon points="980,195 1020,195 1008,230 992,230" />
          <line x1="992" y1="230" x2="1008" y2="230" strokeWidth="2" />
          <rect x="1035" y="188" width="38" height="48" rx="3" />
          <line x1="1035" y1="205" x2="1073" y2="205" strokeDasharray="3 3" />
          {/* Bean Symbol on Bag */}
          <ellipse cx="1054" cy="220" rx="6" ry="8" transform="rotate(20 1054 220)" />

          <polygon points="1090,195 1130,195 1118,230 1102,230" />
        </g>

        {/* --- 3. PENDANT LAMPS & GEOMETRIC LIGHT CONES --- */}
        {/* Glowing Light Cones */}
        <polygon points="320,285 220,620 420,620" fill="url(#lampConeGrad)" stroke="none" />
        <polygon points="720,266 600,620 840,620" fill="url(#lampConeGrad)" stroke="none" />
        <polygon points="1120,285 1020,620 1220,620" fill="url(#lampConeGrad)" stroke="none" />

        {/* Lamp Fixtures */}
        <g strokeWidth="1.6" strokeOpacity="0.55">
          {/* Lamp 1 Left */}
          <line x1="320" y1="0" x2="320" y2="240" />
          <polygon points="290,280 350,280 330,240 310,240" />
          <circle cx="320" cy="285" r="7" strokeOpacity="0.7" />

          {/* Lamp 2 Center */}
          <line x1="720" y1="0" x2="720" y2="210" />
          <polygon points="680,260 760,260 740,210 700,210" />
          <circle cx="720" cy="266" r="8" strokeOpacity="0.7" />

          {/* Lamp 3 Right */}
          <line x1="1120" y1="0" x2="1120" y2="240" />
          <polygon points="1090,280 1150,280 1130,240 1110,240" />
          <circle cx="1120" cy="285" r="7" strokeOpacity="0.7" />
        </g>

        {/* --- 4. MAIN CAFE COUNTER STRUCTURE --- */}
        {/* Main Counter Surface Top Line */}
        <line x1="0" y1="620" x2="1440" y2="620" strokeWidth="2.8" strokeOpacity="0.6" />
        {/* Counter Edge Lower Line */}
        <line x1="0" y1="645" x2="1440" y2="645" strokeWidth="2" strokeOpacity="0.4" />
        {/* Counter Front Panel Texture Grid */}
        <rect x="0" y="645" width="1440" height="255" fill="url(#woodGridPattern)" />

        {/* Counter Front Vertical Slat Lines */}
        <g strokeWidth="1" strokeOpacity="0.25">
          {Array.from({ length: 25 }).map((_, i) => (
            <line key={i} x1={i * 60} y1="645" x2={i * 60} y2="900" />
          ))}
        </g>

        {/* Footrest Rail on Counter Base */}
        <line x1="0" y1="840" x2="1440" y2="840" strokeWidth="2.5" strokeOpacity="0.3" strokeDasharray="12 6" />

        {/* --- 5. ESPRESSO MACHINE ON COUNTER (RIGHT SIDE) --- */}
        <g strokeWidth="1.8" strokeOpacity="0.55">
          {/* Main Espresso Body */}
          <rect x="920" y="440" width="280" height="180" rx="10" />
          {/* Top Cup Warmer Rail */}
          <line x1="930" y1="430" x2="1190" y2="430" strokeWidth="2" />
          <line x1="930" y1="430" x2="930" y2="440" />
          <line x1="1190" y1="430" x2="1190" y2="440" />
          {/* Cups on top of machine */}
          <path d="M 950 430 L 952 418 L 968 418 L 970 430 Z" />
          <path d="M 980 430 L 982 418 L 998 418 L 1000 430 Z" />
          <path d="M 1010 430 L 1012 418 L 1028 418 L 1030 430 Z" />

          {/* Group Heads & Portafilters */}
          <rect x="970" y="480" width="40" height="25" rx="3" />
          <path d="M 990 505 L 990 530 L 1020 535" strokeWidth="2" strokeLinecap="round" />
          
          <rect x="1110" y="480" width="40" height="25" rx="3" />
          <path d="M 1130 505 L 1130 530 L 1160 535" strokeWidth="2" strokeLinecap="round" />

          {/* Pressure Gauges (Geometric Circles) */}
          <circle cx="1060" cy="485" r="14" />
          <line x1="1060" y1="485" x2="1068" y2="479" />
          <circle cx="1060" cy="520" r="10" />

          {/* Steam Wand */}
          <path d="M 935 490 L 910 550 L 900 560" strokeWidth="2" strokeLinecap="round" />
          <path d="M 1185 490 L 1210 550 L 1220 560" strokeWidth="2" strokeLinecap="round" />

          {/* Drip Tray */}
          <rect x="930" y="590" width="260" height="30" rx="3" strokeDasharray="4 2" />
        </g>

        {/* --- 6. COFFEE GRINDER & JUTE BEAN BAG (RIGHT OF ESPRESSO MACHINE) --- */}
        <g strokeWidth="1.6" strokeOpacity="0.5">
          {/* Hopper (Geometric Cone) */}
          <polygon points="1245,400 1295,400 1280,470 1260,470" />
          <ellipse cx="1270" cy="400" rx="25" ry="6" />
          {/* Grinder Body */}
          <rect x="1252" y="470" width="36" height="110" rx="4" />
          {/* Dosing Chamber / Spout */}
          <rect x="1242" y="520" width="22" height="40" rx="3" />
          <line x1="1242" y1="580" x2="1298" y2="580" strokeWidth="2" />

          {/* Coffee Bean Jute Bag next to grinder */}
          <path d="M 1320 620 L 1315 540 Q 1350 525 1385 540 L 1380 620 Z" />
          <ellipse cx="1350" cy="540" rx="35" ry="10" strokeDasharray="3 3" />
          <path d="M 1335 565 Q 1350 580 1365 565" strokeWidth="1" />
        </g>

        {/* --- 7. GEOMETRIC PASTRY DISPLAY CASE (LEFT CENTER COUNTER) --- */}
        <g strokeWidth="1.6" strokeOpacity="0.5">
          {/* Glass Display Box */}
          <polygon points="480,500 640,500 650,620 470,620" />
          <line x1="480" y1="500" x2="470" y2="620" strokeWidth="2" />
          <line x1="640" y1="500" x2="650" y2="620" strokeWidth="2" />
          {/* Shelf Inside Case */}
          <line x1="475" y1="560" x2="645" y2="560" strokeDasharray="4 2" />
          
          {/* Croissant / Muffin / Burger Outlines inside case */}
          {/* Upper shelf pastry */}
          <ellipse cx="520" cy="552" rx="15" ry="7" />
          <ellipse cx="560" cy="552" rx="12" ry="7" />
          <ellipse cx="600" cy="552" rx="14" ry="7" />

          {/* Lower shelf pastry */}
          <rect x="500" y="600" width="25" height="18" rx="3" />
          <rect x="550" y="598" width="30" height="20" rx="4" />
          <rect x="600" y="600" width="25" height="18" rx="3" />

          {/* Glass Reflection Highlight Lines */}
          <line x1="500" y1="510" x2="485" y2="600" strokeWidth="0.8" strokeOpacity="0.25" />
          <line x1="510" y1="510" x2="495" y2="600" strokeWidth="0.8" strokeOpacity="0.25" />
        </g>

        {/* --- 8. GOOSENECK KETTLE, CHEMEX & POUR-OVER ON COUNTER (LEFT SIDE) --- */}
        <g strokeWidth="1.6" strokeOpacity="0.55">
          {/* Gooseneck Pour-Over Kettle */}
          <path d="M 80 560 L 120 560 L 125 618 L 75 618 Z" />
          {/* Kettle Handle */}
          <path d="M 75 570 C 55 570, 55 605, 75 605" strokeWidth="2" />
          {/* Gooseneck Curved Spout */}
          <path d="M 120 600 C 145 600, 150 540, 130 535" strokeWidth="2" strokeLinecap="round" />

          {/* Chemex / Hourglass Glass Dripper */}
          <path d="M 170 520 L 210 520 L 180 570 L 215 615 L 165 615 L 200 570 Z" />
          {/* Wooden Collar */}
          <rect x="180" y="562" width="20" height="16" rx="2" />
          <line x1="190" y1="562" x2="190" y2="578" />

          {/* Coffee Cup & Saucer 1 */}
          <ellipse cx="270" cy="615" rx="32" ry="7" />
          <path d="M 248 610 C 248 580, 292 580, 292 610 Z" />
          <path d="M 292 590 C 304 590, 304 604, 292 604" />

          {/* Steam Lines Rising from Cup (Geometric Waves) */}
          <path d="M 262 570 Q 267 555 262 540" strokeDasharray="3 3" strokeWidth="1.2" strokeOpacity="0.3" />
          <path d="M 270 565 Q 275 550 270 535" strokeDasharray="3 3" strokeWidth="1.2" strokeOpacity="0.3" />
          <path d="M 278 570 Q 283 555 278 540" strokeDasharray="3 3" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Takeaway Cup with Lid */}
          <polygon points="330,550 365,550 358,615 337,615" />
          <rect x="326" y="542" width="43" height="9" rx="2" />
          <line x1="334" y1="575" x2="361" y2="575" strokeDasharray="2 2" />

          {/* Menu Stand / Display Frame */}
          <rect x="400" y="510" width="60" height="100" rx="4" transform="rotate(-4, 400, 510)" />
          <line x1="410" y1="530" x2="450" y2="527" transform="rotate(-4, 400, 510)" strokeWidth="1.2" />
          <line x1="410" y1="545" x2="445" y2="542" transform="rotate(-4, 400, 510)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="410" y1="560" x2="440" y2="557" transform="rotate(-4, 400, 510)" strokeWidth="1" strokeDasharray="3 2" />
        </g>

        {/* --- 9. SACRED GEOMETRY 9-MATRIX SUN CONSTELLATION (FLOATING AURA) --- */}
        <g strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="6 4">
          <circle cx="720" cy="260" r="140" />
          <circle cx="720" cy="260" r="280" />
          <circle cx="720" cy="260" r="420" />
          {/* 3x3 Grid Dots Constellation */}
          {[-80, 0, 80].map((dx) =>
            [-80, 0, 80].map((dy) => (
              <circle key={`${dx}-${dy}`} cx={720 + dx} cy={260 + dy} r="3" fill="#A87C66" fillOpacity="0.4" />
            ))
          )}
        </g>
      </svg>
    </div>
  );
};

