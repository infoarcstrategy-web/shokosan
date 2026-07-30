import React from 'react';
import shokoSmilingImg from '../assets/images/shoko_smiling_nobubble_1785155207476.jpg';
import shokoNavyImg from '../assets/images/shoko_navy_hair_1785147098274.jpg';
import animeFemaleBaristaImg from '../assets/images/anime_female_barista_1785145313897.jpg';
import femaleBaristaImg from '../assets/images/female_barista_1785145187076.jpg';
import shokoBraidImg from '../assets/images/shoko_smiling_braid_1785154858998.jpg';

interface CharacterAvatarProps {
  id: string;
  name: string;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ id, name, className = "w-16 h-16 sm:w-20 sm:h-20" }) => {
  switch (id) {
    case 'shoko':
      // 牧之原翔子 (Makinohara Shoko)
      return (
        <img
          src={shokoSmilingImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-amber-400/90 shadow-md hover:scale-105 transition-transform duration-300`}
        />
      );

    case 'mai':
      // 櫻島麻衣 (Mai Sakurajima)
      return (
        <img
          src={shokoNavyImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-slate-300/90 shadow-md hover:scale-105 transition-transform duration-300`}
        />
      );

    case 'koga':
      // 古賀朋繪 (Tomoe Koga): Sweet anime heroine with short wavy brown bob hair, warm hazel-brown eyes, Minegahara school uniform with red bow tie
      return (
        <svg className={`${className} rounded-2xl border-2 border-amber-300/90 shadow-lg bg-gradient-to-b from-[#2E2824] via-[#1E1916] to-[#120E0C]`} viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="kogaHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9C7862" />
              <stop offset="50%" stopColor="#6E503E" />
              <stop offset="100%" stopColor="#422D20" />
            </linearGradient>
            <linearGradient id="kogaSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF5EE" />
              <stop offset="100%" stopColor="#F9D7C5" />
            </linearGradient>
            <linearGradient id="kogaEyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8A5A38" />
              <stop offset="60%" stopColor="#5E381E" />
              <stop offset="100%" stopColor="#301A0B" />
            </linearGradient>
            <linearGradient id="kogaBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D64545" />
              <stop offset="100%" stopColor="#8B2222" />
            </linearGradient>
          </defs>

          {/* Background Classroom Aura & Soft Bokeh */}
          <rect x="0" y="0" width="100" height="100" fill="#2B2320" />
          <path d="M0 0 L40 0 L25 100 L0 100 Z" fill="#3D4A3E" opacity="0.35" />
          <circle cx="80" cy="25" r="28" fill="#D98A5B" opacity="0.15" />
          <path d="M12 12 L 14 15 L 17 17 L 14 19 L 12 22 L 10 19 L 7 17 L 10 15 Z" fill="#FFE8D6" opacity="0.8" />
          <path d="M86 18 L 87 20 L 89 21 L 87 22 L 86 24 L 85 22 L 83 21 L 85 20 Z" fill="#FFE0CC" opacity="0.7" />

          {/* Back Outer Wavy Bob Hair Volume */}
          <path d="M14 30 C 8 50, 12 75, 25 88 C 30 78, 28 50, 28 32 Z" fill="url(#kogaHairGrad)" />
          <path d="M86 30 C 92 50, 88 75, 75 88 C 70 78, 72 50, 72 32 Z" fill="url(#kogaHairGrad)" />

          {/* Minegahara School Shirt & Red Bowtie */}
          <path d="M16 95 C 16 68, 30 62, 50 62 C 70 62, 84 68, 84 95 Z" fill="#FFFFFF" />
          <path d="M38 62 L 50 78 L 62 62 Z" fill="#F4EAE2" />
          <path d="M42 62 C 45 58, 55 58, 58 62 L 50 66 Z" fill="#3D3028" />

          {/* Red Ribbon Bow Tie */}
          <path d="M50 73 C 44 68, 32 66, 35 76 C 38 82, 48 76, 50 73 Z" fill="url(#kogaBowGrad)" />
          <path d="M50 73 C 56 68, 68 66, 65 76 C 62 82, 52 76, 50 73 Z" fill="url(#kogaBowGrad)" />
          <rect x="47" y="70" width="6" height="6" fill="#A82B2B" rx="1.5" />
          <path d="M46 76 L 42 92 L 48 88 Z" fill="url(#kogaBowGrad)" />
          <path d="M54 76 L 58 92 L 52 88 Z" fill="url(#kogaBowGrad)" />

          {/* Neck */}
          <rect x="44" y="50" width="12" height="15" fill="url(#kogaSkinGrad)" rx="2" />

          {/* Soft Female Face Contour */}
          <path d="M30 30 C 30 18, 70 18, 70 30 C 70 47, 59 58, 50 58 C 41 58, 30 47, 30 30 Z" fill="url(#kogaSkinGrad)" />

          {/* Large Warm Hazel-Brown Anime Eyes */}
          <g>
            <path d="M34 31 C 38 28, 45 29, 47 32" stroke="#2B180C" strokeWidth="2.3" strokeLinecap="round" fill="none" />
            <path d="M53 32 C 55 29, 62 28, 66 31" stroke="#2B180C" strokeWidth="2.3" strokeLinecap="round" fill="none" />

            <ellipse cx="41" cy="38" rx="4.5" ry="5.8" fill="url(#kogaEyeGrad)" />
            <ellipse cx="59" cy="38" rx="4.5" ry="5.8" fill="url(#kogaEyeGrad)" />

            <ellipse cx="41" cy="40" rx="2.8" ry="3.6" fill="#C98453" />
            <ellipse cx="59" cy="40" rx="2.8" ry="3.6" fill="#C98453" />

            <circle cx="41" cy="38" r="1.6" fill="#1A0A02" />
            <circle cx="59" cy="38" r="1.6" fill="#1A0A02" />

            <circle cx="39" cy="35" r="1.7" fill="#FFFFFF" />
            <circle cx="57" cy="35" r="1.7" fill="#FFFFFF" />
            <circle cx="42.5" cy="41" r="0.9" fill="#FFFFFF" opacity="0.85" />
            <circle cx="60.5" cy="41" r="0.9" fill="#FFFFFF" opacity="0.85" />
          </g>

          {/* Soft Pink Blush on Cheeks */}
          <ellipse cx="35" cy="44" rx="4" ry="2" fill="#F08A75" opacity="0.5" />
          <ellipse cx="65" cy="44" rx="4" ry="2" fill="#F08A75" opacity="0.5" />

          {/* Cute Smile */}
          <path d="M44 48 Q 50 52 56 48" stroke="#A8573B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Short Wavy Hair Bangs & Front Strands */}
          <path d="M25 28 C 30 12, 70 12, 75 28 C 66 22, 58 28, 50 20 C 42 28, 34 22, 25 28 Z" fill="url(#kogaHairGrad)" />
          <path d="M35 20 L 42 33 L 47 22 L 53 34 L 62 21" fill="url(#kogaHairGrad)" />
          <path d="M23 28 C 21 38, 25 52, 31 58 C 32 46, 28 35, 27 28 Z" fill="url(#kogaHairGrad)" />
          <path d="M77 28 C 79 38, 75 52, 69 58 C 68 46, 72 35, 73 28 Z" fill="url(#kogaHairGrad)" />

          {/* Hair Light Ring */}
          <path d="M30 18 Q 50 12 70 18" stroke="#CBB19F" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
        </svg>
      );

    case 'sakuta':
      // 梓川咲太 (Sakuta Azusagawa): Handsome anime male protagonist with natural layered brown hair, sincere hazel eyes, school uniform
      return (
        <svg className={`${className} rounded-2xl border-2 border-amber-600/80 shadow-lg bg-gradient-to-b from-[#281D26] via-[#1B121C] to-[#0D080E]`} viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="sakutaHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6E513F" />
              <stop offset="50%" stopColor="#4A3427" />
              <stop offset="100%" stopColor="#291A11" />
            </linearGradient>
            <linearGradient id="sakutaSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF4EC" />
              <stop offset="100%" stopColor="#EBC3AC" />
            </linearGradient>
            <linearGradient id="sakutaEyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8C5C38" />
              <stop offset="60%" stopColor="#52321B" />
              <stop offset="100%" stopColor="#291508" />
            </linearGradient>
          </defs>

          {/* Background Subtle Sparkle Aura */}
          <circle cx="50" cy="50" r="42" fill="#523847" opacity="0.2" />
          <path d="M16 18 L 18 21 L 21 23 L 18 25 L 16 28 L 14 25 L 11 23 L 14 21 Z" fill="#F0E2CA" opacity="0.8" />
          <path d="M84 26 L 85 28 L 87 29 L 85 30 L 84 32 L 83 30 L 81 29 L 83 28 Z" fill="#E6D3C1" opacity="0.7" />

          {/* Back Hair Volume */}
          <path d="M18 36 C 14 55, 18 80, 26 95 L 74 95 C 82 80, 86 55, 82 36 Z" fill="url(#sakutaHairGrad)" />

          {/* Minegahara School Uniform / Blazer & Tie */}
          <path d="M16 95 C 16 68, 30 61, 50 61 C 70 61, 84 68, 84 95 Z" fill="#2E3340" />
          <path d="M36 61 L 50 82 L 64 61 Z" fill="#FFFFFF" />
          <path d="M46 63 L 50 86 L 54 63 Z" fill="#A83E38" />

          {/* Neck */}
          <rect x="43" y="50" width="14" height="15" fill="url(#sakutaSkinGrad)" rx="2" />

          {/* Male Anime Face Contour */}
          <path d="M30 30 C 30 17, 70 17, 70 30 C 70 47, 60 59, 50 59 C 40 59, 30 47, 30 30 Z" fill="url(#sakutaSkinGrad)" />

          {/* Calm, Intelligent Male Anime Eyes */}
          <g>
            {/* Upper Lash */}
            <path d="M34 32 C 38 30, 45 31, 47 34" stroke="#21130A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M53 34 C 55 31, 62 30, 66 32" stroke="#21130A" strokeWidth="2.4" strokeLinecap="round" fill="none" />

            {/* Iris */}
            <ellipse cx="41" cy="39" rx="4.2" ry="5" fill="url(#sakutaEyeGrad)" />
            <ellipse cx="59" cy="39" rx="4.2" ry="5" fill="url(#sakutaEyeGrad)" />

            <ellipse cx="41" cy="41" rx="2.4" ry="3.2" fill="#BA8259" opacity="0.9" />
            <ellipse cx="59" cy="41" rx="2.4" ry="3.2" fill="#BA8259" opacity="0.9" />

            {/* Pupils */}
            <circle cx="41" cy="39" r="1.6" fill="#1A0D05" />
            <circle cx="59" cy="39" r="1.6" fill="#1A0D05" />

            {/* Highlights */}
            <circle cx="39" cy="36" r="1.5" fill="#FFFFFF" />
            <circle cx="57" cy="36" r="1.5" fill="#FFFFFF" />
            <circle cx="42.5" cy="42" r="0.8" fill="#FFFFFF" opacity="0.8" />
            <circle cx="60.5" cy="42" r="0.8" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* Male Eyebrows */}
          <path d="M34 29 L 45 31" stroke="#3D291D" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M55 31 L 66 29" stroke="#3D291D" strokeWidth="2.2" strokeLinecap="round" />

          {/* Sincere, Subtle Smirk */}
          <path d="M44 48 Q 50 51 56 48" stroke="#8C5B44" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Layered Tousled Hair Bangs & Front Strands */}
          <path d="M25 28 C 31 10, 69 10, 75 28 C 66 20, 58 26, 50 18 C 42 26, 34 20, 25 28 Z" fill="url(#sakutaHairGrad)" />
          <path d="M37 18 L 44 34 L 49 22 L 55 36 L 63 20" fill="url(#sakutaHairGrad)" />
          <path d="M28 30 L 30 48 L 34 38" fill="url(#sakutaHairGrad)" />
          <path d="M72 30 L 70 48 L 66 38" fill="url(#sakutaHairGrad)" />

          {/* Hair Gloss Highlight Ring */}
          <path d="M32 18 Q 50 13 68 18" stroke="#9C7761" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'nene':
      // 岩見澤寧寧 (Nene Iwamizawa): Cute anime heroine with pink-plum hair, twin braids, sparkling rose eyes
      return (
        <svg className={`${className} rounded-2xl border-2 border-pink-300/90 shadow-lg bg-gradient-to-b from-[#331C2A] via-[#200F1B] to-[#10060E]`} viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="neneHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B35B83" />
              <stop offset="60%" stopColor="#7D3658" />
              <stop offset="100%" stopColor="#40172C" />
            </linearGradient>
            <linearGradient id="neneSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF4F0" />
              <stop offset="100%" stopColor="#FAD3C7" />
            </linearGradient>
            <linearGradient id="neneEyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E04D86" />
              <stop offset="60%" stopColor="#962053" />
              <stop offset="100%" stopColor="#450823" />
            </linearGradient>
          </defs>

          {/* Background Aura Sparkles */}
          <circle cx="50" cy="50" r="42" fill="#7A3B5C" opacity="0.25" />
          <path d="M15 15 L 17 18 L 20 20 L 17 22 L 15 25 L 13 22 L 10 20 L 13 18 Z" fill="#FADCE6" opacity="0.9" />
          <path d="M82 23 L 83 25 L 85 26 L 83 27 L 82 29 L 81 27 L 79 26 L 81 25 Z" fill="#FCE8F0" opacity="0.8" />

          {/* Twin Braids / Side Tails Flowing Down */}
          <path d="M15 32 C 3 44, 6 75, 17 86 C 20 75, 22 50, 26 36 Z" fill="url(#neneHairGrad)" />
          <path d="M85 32 C 97 44, 94 75, 83 86 C 80 75, 78 50, 74 36 Z" fill="url(#neneHairGrad)" />

          {/* Cute Uniform Outfit */}
          <path d="M18 95 C 18 70, 32 64, 50 64 C 68 64, 82 70, 82 95 Z" fill="#7A3D5D" />
          <path d="M38 64 L 50 78 L 62 64 Z" fill="#FFF0F5" />
          <path d="M44 65 C 48 71, 52 71, 56 65 Z" fill="#FF7AA2" />

          {/* Neck */}
          <rect x="44" y="52" width="12" height="15" fill="url(#neneSkinGrad)" rx="2" />

          {/* Cute Face Contour */}
          <path d="M31 32 C 31 19, 69 19, 69 32 C 69 49, 58 60, 50 60 C 42 60, 31 49, 31 32 Z" fill="url(#neneSkinGrad)" />

          {/* Vibrant Rose Pink Anime Eyes */}
          <g>
            <path d="M35 33 C 39 30, 45 31, 47 34" stroke="#3D1226" strokeWidth="2.3" strokeLinecap="round" fill="none" />
            <path d="M53 34 C 55 31, 61 30, 65 33" stroke="#3D1226" strokeWidth="2.3" strokeLinecap="round" fill="none" />

            <ellipse cx="41" cy="39" rx="4.2" ry="5.8" fill="url(#neneEyeGrad)" />
            <ellipse cx="59" cy="39" rx="4.2" ry="5.8" fill="url(#neneEyeGrad)" />

            <ellipse cx="41" cy="41" rx="2.6" ry="3.6" fill="#FF7DA7" />
            <ellipse cx="59" cy="41" rx="2.6" ry="3.6" fill="#FF7DA7" />

            <circle cx="39" cy="36" r="1.7" fill="#FFFFFF" />
            <circle cx="57" cy="36" r="1.7" fill="#FFFFFF" />
            <circle cx="42.5" cy="42" r="0.8" fill="#FFFFFF" opacity="0.9" />
            <circle cx="60.5" cy="42" r="0.8" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* Cheeks Blushing */}
          <ellipse cx="36" cy="46" rx="4" ry="2" fill="#FF7DA7" opacity="0.6" />
          <ellipse cx="64" cy="46" rx="4" ry="2" fill="#FF7DA7" opacity="0.6" />

          {/* Sweet Cheerful Smile */}
          <path d="M44 49 Q 50 53.5 56 49" stroke="#C23069" strokeWidth="1.7" strokeLinecap="round" fill="none" />

          {/* Bangs & Front Locks */}
          <path d="M26 31 C 32 16, 68 16, 74 31 C 65 25, 57 30, 50 23 C 43 30, 35 25, 26 31 Z" fill="url(#neneHairGrad)" />

          {/* Cute Twin-tail Hair Ribbons */}
          <circle cx="20" cy="33" r="4" fill="#FF7DA7" />
          <circle cx="80" cy="33" r="4" fill="#FF7DA7" />
          <circle cx="20" cy="33" r="1.8" fill="#FFFFFF" />
          <circle cx="80" cy="33" r="1.8" fill="#FFFFFF" />

          {/* Hair Light Ring */}
          <path d="M29 20 Q 50 14 71 20" stroke="#E294B8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    default:
      return (
        <div className={`${className} rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl`}>
          🔮
        </div>
      );
  }
};


