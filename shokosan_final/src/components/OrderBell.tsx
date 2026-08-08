import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/audio';

interface OrderBellProps {
  onRingBell: () => void;
}

export const OrderBell: React.FC<OrderBellProps> = ({ onRingBell }) => {
  const [isRinging, setIsRinging] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  const handleClick = () => {
    if (isRinging) return;
    setIsRinging(true);
    setRippleKey(prev => prev + 1);
    
    // Play sweet brass bell audio chime
    soundEngine.playBellSound(1.0);
    
    // Wait 750ms so user sees the bell plunger press, dome vibration, and soundwaves radiate
    setTimeout(() => {
      onRingBell();
      setIsRinging(false);
    }, 750);
  };

  return (
    <div className="flex flex-col items-center justify-center my-4 select-none">
      {/* Big Brass Service Bell Structure */}
      <div className="relative flex flex-col items-center">
        {/* Sound Waves Animation on Ring */}
        <AnimatePresence>
          {isRinging && (
            <>
              <motion.div
                key={`wave1-${rippleKey}`}
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 2.3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-4 border-amber-400/80 pointer-events-none"
              />
              <motion.div
                key={`wave2-${rippleKey}`}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 2.9, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                className="absolute inset-0 rounded-full border-2 border-amber-300/60 pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>

        {/* Interactive Big Bell Button Container */}
        <motion.button
          type="button"
          onClick={handleClick}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.92, y: 4 }}
          className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
          title="按響咖啡館點餐鈴，靜心揭開九宮格時空陣法"
        >
          {/* Top Plunger / Clapper Button */}
          <motion.div 
            animate={isRinging ? { y: [0, 6, 0] } : {}}
            transition={{ duration: 0.25 }}
            className="w-9 h-4 bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 rounded-t-full border border-amber-200 shadow-md relative z-20 flex items-center justify-center"
          >
            <div className="w-3.5 h-1.5 bg-white/90 rounded-full opacity-90" />
          </motion.div>

          {/* Stem connecting plunger to dome */}
          <div className="w-3.5 h-2 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 shadow-inner z-10" />

          {/* Golden Pure Metallic Dome Bell (No text on metal surface) */}
          <motion.div 
            animate={isRinging ? { rotate: [0, -10, 10, -8, 8, -3, 0], scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 0.65 }}
            className="relative w-32 sm:w-40 h-20 sm:h-24 bg-gradient-to-b from-amber-100 via-amber-400 to-amber-700 rounded-t-full border-2 border-amber-200/90 shadow-2xl flex flex-col items-center justify-end overflow-hidden"
          >
            {/* Realistic 3D Metallic Highlights & Curved Sheen Reflections */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-1.5 left-5 w-14 h-7 bg-white/45 rounded-full blur-xs transform -rotate-15" />
            <div className="absolute top-3 right-6 w-8 h-4 bg-amber-200/40 rounded-full blur-2xs" />
            
            {/* Metallic Circumference Ring Line */}
            <div className="absolute bottom-3 inset-x-0 h-1 bg-amber-900/35 border-t border-amber-200/40" />
            <div className="absolute bottom-1 inset-x-0 h-0.5 bg-amber-950/40" />
          </motion.div>

          {/* Mahogany Wooden Base */}
          <div className="w-40 sm:w-48 h-6 sm:h-7 bg-gradient-to-r from-amber-950 via-[#4A2E10] to-amber-950 rounded-b-xl border-t-2 border-amber-400/60 shadow-2xl flex items-center justify-center relative">
            <div className="w-full h-1 bg-amber-300/30" />
            {/* Brass Plate Accent on Base */}
            <div className="w-16 h-1.5 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 rounded-sm opacity-80 shadow-2xs" />
          </div>
        </motion.button>
      </div>

      {/* Subtitle Hint Label Below Bell */}
      <p className="text-xs text-[#8C5C42] font-serif font-bold mt-3 flex items-center gap-1.5 animate-pulse">
        <span>🔔 點擊按響點餐鈴，靜心揭開九宮格時空陣法</span>
      </p>
    </div>
  );
};
