/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { GeometricCafeBackground } from './components/GeometricCafeBackground';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Coffee, 
  Sparkles, 
  Clipboard, 
  Download, 
  RotateCcw, 
  Bookmark, 
  BookmarkCheck, 
  History, 
  Trash2, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Clock,
  BookOpen,
  Edit3,
  AlertCircle,
  RefreshCw,
  Shuffle,
  CheckCircle2,
  X,
  Grid,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  FileText,
  Compass,
  CheckSquare,
  ListFilter,
  Coins,
  Flame,
  Zap,
  Award,
  CreditCard,
  Check,
  Heart,
  Utensils,
  Gift,
  Bell,
  Sliders,
  ChevronDown,
  ZoomIn,
  Share2
} from 'lucide-react';
import { BaristaStaff } from './components/BaristaStaff';
import { OrderBell } from './components/OrderBell';
import { ShokoCompanionChat } from './components/ShokoCompanionChat';
import shokoWhisperImg from './assets/images/shoko_whisper_mode_1785157154222.jpg';
import shokoBaristaImg from './assets/images/shoko_greeting_open_mouth_1785157425669.jpg';
import shokoSmilingImg from './assets/images/shoko_smiling_nobubble_1785155207476.jpg';
import shokoServingMealImg from './assets/images/shoko_green_smiling_1785148927603.jpg';

import { 
  Card, 
  GRID_POSITIONS, 
  SUIT_TAROT_MAP, 
  RANK_TAROT_MAP,
  getCardInterpretation,
  getQuickAnswerData,
  generateReadingReport,
  extractOptionsFromText,
  getNineGridStructureBreakdown
} from './cardData';

interface SavedReading {
  id: string;
  timestamp: string;
  cards: Card[];
  notes: string;
  report: string;
  question?: string;
}

// REALISTIC PLAYING CARD FACE COMPONENT
export const StandardPokerCardFace: React.FC<{ card: Card; isLarge?: boolean }> = ({ card, isLarge = false }) => {
  const isRed = card.suit === '紅心' || card.suit === '方塊';
  const suitSymbol = card.suit === '黑桃' ? '♠' : card.suit === '紅心' ? '♥' : card.suit === '方塊' ? '♦' : '♣';
  const textColor = isRed ? 'text-red-600' : 'text-slate-900';

  if (!isLarge) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-white via-[#FFFDF9] to-[#F8F3ED] border-2 border-[#D2BCA6] rounded-xl flex flex-col items-center justify-center p-2 shadow-xs relative overflow-hidden select-none">
        <span className={`text-3xl sm:text-4xl font-black font-sans ${textColor} leading-none drop-shadow-2xs`}>
          {suitSymbol}
        </span>
        <span className={`text-lg sm:text-2xl font-black font-mono tracking-wider ${textColor} mt-1`}>
          {card.rank}
        </span>
        <span className="text-[10px] sm:text-xs font-extrabold text-[#A87C66] mt-0.5 font-serif">
          {card.suit}
        </span>
      </div>
    );
  }

  const renderPips = () => {
    const num = parseInt(card.rank, 10);

    if (card.rank === 'A') {
      return (
        <div className="flex-1 flex items-center justify-center">
          <span className={`${isLarge ? 'text-7xl sm:text-8xl' : 'text-3xl sm:text-5xl'} ${textColor} font-sans select-none leading-none drop-shadow-2xs`}>
            {suitSymbol}
          </span>
        </div>
      );
    }

    if (card.rank === 'K') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center relative p-1 my-auto">
          <div className="w-full h-full border border-[#D2BCA6] rounded-lg bg-gradient-to-b from-amber-50/90 via-white to-amber-100/70 flex flex-col items-center justify-center text-center p-1 sm:p-2 relative overflow-hidden shadow-2xs">
            <div className="text-[#8C5C42] text-[8px] sm:text-[10px] font-serif font-black tracking-widest border-b border-[#D2BCA6]/60 px-1.5 pb-0.5 mb-0.5">
              KING ♔
            </div>
            <div className="relative my-0.5 flex items-center justify-center">
              <span className={`text-2xl sm:text-4xl font-black ${textColor}`}>
                ♔
              </span>
              <span className={`absolute -bottom-1 -right-1 text-xs sm:text-base ${textColor}`}>
                {suitSymbol}
              </span>
            </div>
            <div className={`text-[9px] sm:text-xs font-black ${textColor} font-serif truncate max-w-full`}>
              {card.suit}國王
            </div>
          </div>
        </div>
      );
    }

    if (card.rank === 'Q') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center relative p-1 my-auto">
          <div className="w-full h-full border border-[#D2BCA6] rounded-lg bg-gradient-to-b from-amber-50/90 via-white to-amber-100/70 flex flex-col items-center justify-center text-center p-1 sm:p-2 relative overflow-hidden shadow-2xs">
            <div className="text-[#8C5C42] text-[8px] sm:text-[10px] font-serif font-black tracking-widest border-b border-[#D2BCA6]/60 px-1.5 pb-0.5 mb-0.5">
              QUEEN 👑
            </div>
            <div className="relative my-0.5 flex items-center justify-center">
              <span className={`text-2xl sm:text-4xl font-black ${textColor}`}>
                👑
              </span>
              <span className={`absolute -bottom-1 -right-1 text-xs sm:text-base ${textColor}`}>
                {suitSymbol}
              </span>
            </div>
            <div className={`text-[9px] sm:text-xs font-black ${textColor} font-serif truncate max-w-full`}>
              {card.suit}王后
            </div>
          </div>
        </div>
      );
    }

    if (card.rank === 'J') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center relative p-1 my-auto">
          <div className="w-full h-full border border-[#D2BCA6] rounded-lg bg-gradient-to-b from-amber-50/90 via-white to-amber-100/70 flex flex-col items-center justify-center text-center p-1 sm:p-2 relative overflow-hidden shadow-2xs">
            <div className="text-[#8C5C42] text-[8px] sm:text-[10px] font-serif font-black tracking-widest border-b border-[#D2BCA6]/60 px-1.5 pb-0.5 mb-0.5">
              JACK 🛡️
            </div>
            <div className="relative my-0.5 flex items-center justify-center">
              <span className={`text-2xl sm:text-4xl font-black ${textColor}`}>
                ⚔️
              </span>
              <span className={`absolute -bottom-1 -right-1 text-xs sm:text-base ${textColor}`}>
                {suitSymbol}
              </span>
            </div>
            <div className={`text-[9px] sm:text-xs font-black ${textColor} font-serif truncate max-w-full`}>
              {card.suit}騎士
            </div>
          </div>
        </div>
      );
    }

    // Number cards (2 through 10): Pip layout matching exact pip count!
    const pipCount = !isNaN(num) ? num : 1;
    const pipArray = Array.from({ length: pipCount });

    return (
      <div className="flex-1 flex items-center justify-center p-1 overflow-hidden my-auto">
        <div className={`w-full h-full grid ${
          pipCount <= 3 ? 'grid-cols-1 gap-1 my-auto' :
          pipCount <= 6 ? 'grid-cols-2 gap-1 items-center' :
          pipCount <= 8 ? 'grid-cols-2 sm:grid-cols-3 gap-0.5 items-center' :
          'grid-cols-3 gap-0.5 items-center'
        } justify-items-center content-center max-w-[90%]`}>
          {pipArray.map((_, i) => (
            <span
              key={i}
              className={`${textColor} font-sans select-none leading-none ${
                isLarge ? 'text-2xl sm:text-3xl' : pipCount > 6 ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'
              }`}
            >
              {suitSymbol}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full h-full bg-gradient-to-b from-white via-[#FFFDF9] to-[#F8F3ED] border-2 border-[#D2BCA6] rounded-xl flex flex-col justify-between p-1.5 sm:p-2.5 shadow-xs relative overflow-hidden select-none`}>
      {/* Top Left Corner Index */}
      <div className="flex items-center gap-0.5 leading-none">
        <span className={`font-black font-sans tracking-tighter ${textColor} ${isLarge ? 'text-2xl' : 'text-xs sm:text-sm'}`}>
          {card.rank}
        </span>
        <span className={`font-sans ${textColor} ${isLarge ? 'text-xl' : 'text-xs sm:text-sm'}`}>
          {suitSymbol}
        </span>
      </div>

      {/* Center Pips / Court Portrait */}
      {renderPips()}

      {/* Bottom Right Corner Index (Inverted) */}
      <div className="flex items-center gap-0.5 leading-none self-end rotate-180">
        <span className={`font-black font-sans tracking-tighter ${textColor} ${isLarge ? 'text-2xl' : 'text-xs sm:text-sm'}`}>
          {card.rank}
        </span>
        <span className={`font-sans ${textColor} ${isLarge ? 'text-xl' : 'text-xs sm:text-sm'}`}>
          {suitSymbol}
        </span>
      </div>
    </div>
  );
};

export default function App() {
  // --- State Managers ---
  const [deck, setDeck] = useState<Card[]>([]);
  const [matrixCards, setMatrixCards] = useState<Card[]>([]);
  const [revealedCards, setRevealedCards] = useState<boolean[]>(Array(9).fill(false));
  const [isDealing, setIsDealing] = useState(false);
  const [shufflingStage, setShufflingStage] = useState<'idle' | 'breathing' | 'shuffling' | 'done'>('idle');
  
  // User Question & Mode State ('divination' | 'decision' | 'luck')
  const [userQuestion, setUserQuestion] = useState('');
  const [readingMode, setReadingMode] = useState<'divination' | 'decision' | 'luck'>('divination');
  const [hasHandedMenu, setHasHandedMenu] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showDealChoiceModal, setShowDealChoiceModal] = useState(false);

  // Handler for clicking Shoko / Menu to select a random mode or cancel selection if already selected
  const handleRandomSelectMode = () => {
    if (hasHandedMenu) {
      setHasHandedMenu(false);
      setGreetingIndex(prev => prev + 1);
    } else {
      const modes: Array<'divination' | 'decision' | 'luck'> = ['divination', 'decision', 'luck'];
      const randomMode = modes[Math.floor(Math.random() * modes.length)];
      setReadingMode(randomMode);
      setHasHandedMenu(true);
    }
  };

  // Luck Tuning / Fortune Transformation State
  const [showLuckModal, setShowLuckModal] = useState(false);
  const [selectedLuckPrices, setSelectedLuckPrices] = useState<number[]>([200]);
  const [isProcessingLuck, setIsProcessingLuck] = useState(false);
  const [luckModalStep, setLuckModalStep] = useState<'select' | 'served'>('select');
  const [unlockedLuckBlessing, setUnlockedLuckBlessing] = useState<{
    price: number;
    name: string;
    description: string;
    blessingMantra: string;
    energyBoost: number;
    unlockedAt: string;
  } | null>(null);

  const toggleLuckPriceOption = (price: number) => {
    setSelectedLuckPrices(prev =>
      prev.includes(price)
        ? prev.filter(p => p !== price)
        : [...prev, price].sort((a, b) => a - b)
    );
  };

  const handleExecuteLuckPayment = () => {
    if (selectedLuckPrices.length === 0) return;
    setIsProcessingLuck(true);
    setTimeout(() => {
      setIsProcessingLuck(false);
      setLuckModalStep('served');
      const nowStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });

      const totalPrice = selectedLuckPrices.reduce((sum, p) => sum + p, 0);
      const names: string[] = [];
      const descs: string[] = [];
      const mantras: string[] = [];
      let totalBoost = 0;

      if (selectedLuckPrices.includes(100)) {
        names.push('☕ 經典晨曦拿鐵特調');
        descs.push('經典晨曦拿鐵：撫平思緒雜訊，奠定安定踏實能量。');
        mantras.push('純粹拿鐵香氣撫平急躁思緒，安定當前磁場。');
        totalBoost += 15;
      }
      if (selectedLuckPrices.includes(200)) {
        names.push('🍯 絲絨太妃拿鐵 ‧ 提拉米蘇');
        descs.push('絲絨太妃拿鐵與提拉米蘇：喚醒貴人緣分，補充行動自信力。');
        mantras.push('焦香太妃糖與提拉米蘇交織，吸引貴人際遇與環境善意。');
        totalBoost += 25;
      }
      if (selectedLuckPrices.includes(500)) {
        names.push('🍷 極致冷萃 ‧ 法式紅酒漢堡排');
        descs.push('極致冷萃與紅酒漢堡排：帶來深層扎根力量，實現時空極致逆轉。');
        mantras.push('冷萃極致定心與紅酒燉漢堡排扎實能量，化解卡關阻礙！');
        totalBoost += 38;
      }

      setUnlockedLuckBlessing({
        price: totalPrice,
        name: names.join(' ✦ '),
        description: descs.join(' '),
        blessingMantra: mantras.join(' '),
        energyBoost: totalBoost,
        unlockedAt: nowStr
      });
    }, 1800);
  };

  // Extract options automatically when in decision mode
  const extractedOptions = useMemo(() => {
    return extractOptionsFromText(userQuestion);
  }, [userQuestion]);

  // Sub-tab view: Result (結果) vs Report (報告) vs Whisper (翔子的悄悄話)
  const [readingSubTab, setReadingSubTab] = useState<'result' | 'report' | 'whisper'>('result');

  // Mobile layout optimization states for Result screen
  const [mobileAnswerExpanded, setMobileAnswerExpanded] = useState<boolean>(false);
  const [mobileStructureAxis, setMobileStructureAxis] = useState<'consciousness' | 'reality' | 'action' | 'core' | 'all'>('consciousness');
  const [structureExpanded, setStructureExpanded] = useState<boolean>(false);

  // Zoomed card lightbox modal state
  const [activeZoomCardIndex, setActiveZoomCardIndex] = useState<number | null>(null);

  // Share fortune card modal states
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shareCopyStatus, setShareCopyStatus] = useState<'idle' | 'copied'>('idle');

  // Mindfulness / Breathing states
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);

  // History states
  const [history, setHistory] = useState<SavedReading[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<SavedReading | null>(null);
  const [readingNotes, setReadingNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  
  // UI states
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [tab, setTab] = useState<'grid' | 'history'>('grid');

  // Manual Input states
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualCards, setManualCards] = useState<(Card | null)[]>(Array(9).fill(null));
  const [activeManualHoverSlot, setActiveManualHoverSlot] = useState<number | null>(null);

  // Suits & Ranks constants
  const ALL_SUITS: Card['suit'][] = ['黑桃', '紅心', '方塊', '梅花'];
  const ALL_RANKS: Card['rank'][] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  // Load high probability preset
  const loadHighProbabilityPreset = () => {
    const preset: Card[] = [
      { suit: '方塊', rank: 'A' },  // 1
      { suit: '紅心', rank: 'K' },  // 2
      { suit: '方塊', rank: 'Q' },  // 3
      { suit: '紅心', rank: 'J' },  // 4
      { suit: '方塊', rank: '10' }, // 5
      { suit: '方塊', rank: '9' },  // 6
      { suit: '紅心', rank: '8' },  // 7
      { suit: '方塊', rank: 'K' },  // 8
      { suit: '紅心', rank: 'A' }   // 9
    ];
    setManualCards(preset);
  };

  // Open manual card selection modal
  const openManualModal = (slotIndexToFocus?: number) => {
    if (matrixCards.length === 9) {
      setManualCards([...matrixCards]);
    } else {
      const initial = Array(9).fill(null).map((_, i) => matrixCards[i] || null);
      setManualCards(initial);
    }
    setShowManualModal(true);
  };

  // Update single slot card via dropdown
  const updateManualSlotCard = (slotIndex: number, suit: Card['suit'], rank: Card['rank']) => {
    setManualCards(prev => {
      const next = [...prev];
      next[slotIndex] = { suit, rank };
      return next;
    });
  };

  // Check duplicates
  const getDuplicates = () => {
    const cardMap: Record<string, number[]> = {};
    manualCards.forEach((c, idx) => {
      if (c) {
        const key = `${c.suit}_${c.rank}`;
        if (!cardMap[key]) cardMap[key] = [];
        cardMap[key].push(idx);
      }
    });

    const duplicates: { cardName: string; slots: number[] }[] = [];
    for (const [key, slots] of Object.entries(cardMap)) {
      if (slots.length > 1) {
        const [suit, rank] = key.split('_');
        duplicates.push({ cardName: `${suit} ${rank}`, slots });
      }
    }
    return duplicates;
  };

  // Auto fix duplicates
  const autoFixDuplicates = () => {
    const usedKeys = new Set<string>();
    const filtered = manualCards.map(c => {
      if (!c) return null;
      const key = `${c.suit}_${c.rank}`;
      if (usedKeys.has(key)) return null;
      usedKeys.add(key);
      return c;
    });

    const remainingPool: Card[] = [];
    for (const suit of ALL_SUITS) {
      for (const rank of ALL_RANKS) {
        if (!usedKeys.has(`${suit}_${rank}`)) {
          remainingPool.push({ suit, rank });
        }
      }
    }

    const shuffledPool = shuffleDeck(remainingPool);
    let poolIdx = 0;

    setManualCards(filtered.map(c => c ? c : shuffledPool[poolIdx++]));
  };

  // Auto fill empty manual slots
  const autoFillEmptyManualSlots = () => {
    const usedKeys = new Set<string>();
    manualCards.forEach(c => {
      if (c) usedKeys.add(`${c.suit}_${c.rank}`);
    });

    const remainingPool: Card[] = [];
    for (const suit of ALL_SUITS) {
      for (const rank of ALL_RANKS) {
        if (!usedKeys.has(`${suit}_${rank}`)) {
          remainingPool.push({ suit, rank });
        }
      }
    }

    const shuffledPool = shuffleDeck(remainingPool);
    let poolIdx = 0;

    setManualCards(prev => {
      return prev.map(c => {
        if (!c && poolIdx < shuffledPool.length) {
          return shuffledPool[poolIdx++];
        }
        return c;
      });
    });
  };

  // Clear all manual slots
  const clearManualCards = () => {
    setManualCards(Array(9).fill(null));
  };

  // Load sample classic preset
  const loadPresetCards = () => {
    const preset: Card[] = [
      { suit: '黑桃', rank: 'A' },  // 1
      { suit: '紅心', rank: 'A' },  // 2
      { suit: '方塊', rank: 'K' },  // 3
      { suit: '梅花', rank: '7' },  // 4
      { suit: '黑桃', rank: '10' }, // 5
      { suit: '紅心', rank: '6' },  // 6
      { suit: '方塊', rank: '3' },  // 7
      { suit: '梅花', rank: 'A' },  // 8
      { suit: '紅心', rank: '10' }  // 9
    ];
    setManualCards(preset);
  };

  // Apply manual matrix to current active reading
  const applyManualCards = () => {
    // Fill nulls if any
    const hasNulls = manualCards.some(c => c === null);
    let current = [...manualCards];
    if (hasNulls) {
      const usedKeys = new Set<string>();
      current.forEach(c => { if (c) usedKeys.add(`${c.suit}_${c.rank}`); });
      const pool: Card[] = [];
      for (const suit of ALL_SUITS) {
        for (const rank of ALL_RANKS) {
          if (!usedKeys.has(`${suit}_${rank}`)) pool.push({ suit, rank });
        }
      }
      const shuffled = shuffleDeck(pool);
      let idx = 0;
      current = current.map(c => c ? c : shuffled[idx++]);
    }

    // Fix duplicates if any
    const cardMap: Record<string, number[]> = {};
    current.forEach((c, i) => {
      if (c) {
        const k = `${c.suit}_${c.rank}`;
        if (!cardMap[k]) cardMap[k] = [];
        cardMap[k].push(i);
      }
    });

    let hasDup = false;
    for (const slots of Object.values(cardMap)) {
      if (slots.length > 1) { hasDup = true; break; }
    }

    if (hasDup) {
      const usedKeys = new Set<string>();
      const filtered = current.map(c => {
        if (!c) return null;
        const k = `${c.suit}_${c.rank}`;
        if (usedKeys.has(k)) return null;
        usedKeys.add(k);
        return c;
      });
      const pool: Card[] = [];
      for (const suit of ALL_SUITS) {
        for (const rank of ALL_RANKS) {
          if (!usedKeys.has(`${suit}_${rank}`)) pool.push({ suit, rank });
        }
      }
      const shuffled = shuffleDeck(pool);
      let idx = 0;
      current = filtered.map(c => c ? c : shuffled[idx++]);
    }

    const completeCards = current as Card[];
    setMatrixCards(completeCards);
    setRevealedCards(Array(9).fill(false));
    setShufflingStage('done');
    setReadingSubTab('result'); // Always show Result first!
    setSelectedHistoryItem(null);
    setIsSaved(false);
    setReadingNotes('');
    setShowManualModal(false);
  };

  // --- Initializers ---
  useEffect(() => {
    initDeck();
    const saved = localStorage.getItem('latte_mind_ninegrid_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history', e);
      }
    }
  }, []);

  // Breathing Guide Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (shufflingStage === 'breathing') {
      interval = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev <= 1) {
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return 4;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return 4;
            } else {
              setBreathPhase('inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [shufflingStage, breathPhase]);

  const initDeck = () => {
    const suits: Card['suit'][] = ['黑桃', '紅心', '方塊', '梅花'];
    const ranks: Card['rank'][] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push({ suit, rank });
      }
    }
    setDeck(newDeck);
  };

  // Fisher-Yates Shuffling
  const shuffleDeck = (array: Card[]): Card[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Start the Zen Dealing process
  const triggerZenDeal = () => {
    setSelectedHistoryItem(null);
    setMatrixCards([]);
    setRevealedCards(Array(9).fill(false));
    setIsSaved(false);
    setReadingNotes('');
    setReadingSubTab('result'); // Always default to Result first
    
    // Step 1: Mindful Breathing
    setShufflingStage('breathing');
    setBreathPhase('inhale');
    setBreathSeconds(4);
  };

  // Skip breathing and shuffle immediately
  const skipToShuffle = () => {
    setShufflingStage('shuffling');
    
    setTimeout(() => {
      const freshShuffled = shuffleDeck(deck.length > 0 ? deck : shuffleDeck(deck));
      const chosen = freshShuffled.slice(0, 9);
      setMatrixCards(chosen);
      setShufflingStage('done');
      setIsDealing(true);
      setReadingSubTab('result'); // Ensure Result is presented first

      chosen.forEach((_, index) => {
        setTimeout(() => {
          setRevealedCards((prev) => {
            const next = [...prev];
            next[index] = false;
            return next;
          });
          if (index === 8) {
            setIsDealing(false);
          }
        }, (index + 1) * 120);
      });
    }, 500);
  };

  // Turn over a single card
  const toggleCardReveal = (index: number) => {
    if (isDealing) return;
    setRevealedCards((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  // Turn all cards face up
  const revealAllCards = () => {
    setRevealedCards(Array(9).fill(true));
  };

  // Turn all cards face down
  const hideAllCards = () => {
    setRevealedCards(Array(9).fill(false));
  };

  // --- Export & Utility Actions ---
  const copyToClipboard = () => {
    const report = selectedHistoryItem 
      ? selectedHistoryItem.report 
      : generateReadingReport(matrixCards, userQuestion, readingMode);
    
    navigator.clipboard.writeText(report).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2500);
    });
  };

  const copyFortuneSummary = () => {
    const quickAnswer = getQuickAnswerData(matrixCards, userQuestion, readingMode);
    const blessingName = unlockedLuckBlessing ? unlockedLuckBlessing.name : '晨曦拿鐵大吉簽';
    const blessingDesc = unlockedLuckBlessing ? unlockedLuckBlessing.description : '願這份特調為您帶來滿滿運勢與智慧！';

    const dateStr = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const text = `☕【心靈拿鐵 ‧ 時空轉運大吉簽】☕
📅 占卜日期：${dateStr}
❓ 測算提問：${userQuestion.trim() || '今日時空指引'}
⛩️ 大吉靈籤：【${blessingName}】
💬 籤語寄語：${blessingDesc}

✨ 運勢總評：【${quickAnswer?.verdictTag || '時空共鳴'}】${quickAnswer?.headlineVerdict || ''}
💡 直擊解答：${quickAnswer?.directAnswerSummary || ''}
🧭 翔子隨身建議：${quickAnswer?.keyTakeaway || ''}

------------------------------------
☕ 心靈拿鐵 Cafe ‧ 時空九宮格占卜系統
探索你的時空波幅與人生解答 ✨`;

    navigator.clipboard.writeText(text).then(() => {
      setShareCopyStatus('copied');
      setTimeout(() => setShareCopyStatus('idle'), 2500);
    });
  };

  const downloadTxtReport = () => {
    const report = selectedHistoryItem 
      ? selectedHistoryItem.report 
      : generateReadingReport(matrixCards, userQuestion, readingMode);
    
    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    const dateStr = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    element.download = `拿鐵心靈九宮格_解讀報告_${dateStr}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // --- Save Reading ---
  const saveReadingToHistory = () => {
    if (matrixCards.length < 9 || isSaved) return;

    const report = generateReadingReport(matrixCards, userQuestion, readingMode);
    const now = new Date();
    const timestamp = now.toLocaleString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newReading: SavedReading = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      timestamp,
      cards: [...matrixCards],
      notes: readingNotes,
      report,
      question: userQuestion.trim()
    };

    const updatedHistory = [newReading, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('latte_mind_ninegrid_history', JSON.stringify(updatedHistory));
    setIsSaved(true);
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('latte_mind_ninegrid_history', JSON.stringify(updated));
    if (selectedHistoryItem?.id === id) {
      setSelectedHistoryItem(null);
    }
  };

  // Check if grid is currently active with cards
  const isGridActive = matrixCards.length === 9;

  return (
    <div className="min-h-screen bg-[#F5EBE6] text-[#4A3E3D] font-serif transition-colors duration-500 selection:bg-[#E4D5C7] selection:text-[#4A3E3D] pb-16 relative overflow-hidden">
      
      {/* GEOMETRIC CAFE COUNTER BACKGROUND */}
      <GeometricCafeBackground />
      
      {/* MAIN CONTENT WRAPPER WITH HIGHER Z-INDEX */}
      <div className="relative z-10">
        {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto px-3 sm:px-4 pt-5 sm:pt-10 pb-4 sm:pb-8 text-center border-b border-[#E4D5C7] mb-4 sm:mb-8">
        <div className="inline-flex items-center justify-center space-x-1.5 sm:space-x-2 bg-[#E4D5C7] text-[#A87C66] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider mb-2.5 sm:mb-4 hover:scale-105 transition-transform max-w-[95%]">
          <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
          <span className="truncate">靜心靈性吧台 • 溫厚暖心特調</span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4A3E3D] font-serif mb-1.5 sm:mb-3">
          心靈拿鐵咖啡館
        </h1>
        <p className="text-[#A87C66] font-medium text-xs sm:text-base md:text-lg tracking-wide sm:tracking-widest mb-2 sm:mb-4">
          【 靜心特調 • 空間與時間的心靈命運解答 】
        </p>
        
        <div className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-[#7A6A63] leading-relaxed mb-4 sm:mb-6 font-serif px-2 sm:px-4">
          歡迎來到心靈拿鐵咖啡館。在這裡，咖啡師翔子為您的心靈注入一杯溫暖厚實的特調拿鐵。
          讓意識在時空流向中沉澱，為您指引當前困惑的清晰解答與未來方向。
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-4">
          <button
            onClick={() => { setTab('grid'); setSelectedHistoryItem(null); }}
            className={`flex items-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              tab === 'grid' && !selectedHistoryItem
                ? 'bg-[#4A3E3D] text-[#F5EBE6] shadow-md shadow-[#4A3E3D]/10'
                : 'bg-[#E4D5C7]/50 text-[#4A3E3D] hover:bg-[#E4D5C7]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>開始解讀</span>
          </button>
          
          <button
            onClick={() => setTab('history')}
            className={`flex items-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
              tab === 'history' || selectedHistoryItem
                ? 'bg-[#4A3E3D] text-[#F5EBE6] shadow-md shadow-[#4A3E3D]/10'
                : 'bg-[#E4D5C7]/50 text-[#4A3E3D] hover:bg-[#E4D5C7]'
            }`}
          >
            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>歷史報告</span>
            {history.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#A87C66] text-[#F5EBE6] text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-sans font-bold shadow-sm">
                {history.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowInfoModal(true)}
            className="flex items-center justify-center p-2 sm:p-2.5 rounded-lg bg-[#E4D5C7]/50 text-[#4A3E3D] hover:bg-[#E4D5C7] transition-all"
            title="系統規範與操作指南"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-2.5 sm:px-4">
        
        {/* TAB 1: CARD GRID & INTERPRETATION */}
        {tab === 'grid' && !selectedHistoryItem && (
          <div className="space-y-8 sm:space-y-12">
            
            {/* INITIAL / RESET STATE: Warm Cafe Bar Counter Concept */}
            {shufflingStage === 'idle' && !isGridActive && (
              <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#FAF4F0] via-[#F5EBE6] to-[#E4D5C7]/60 border-2 border-[#A87C66]/50 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden text-left relative">
                
                {/* Cafe Storefront Top Signboard */}
                <div className="bg-gradient-to-r from-[#4A3E3D] via-[#5C4D4B] to-[#3A2E2D] text-[#F5EBE6] px-3.5 sm:px-6 py-3.5 sm:py-5 border-b-2 border-[#A87C66]/60 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 shadow-md">
                  {/* Subtle Background Glow */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#A87C66]/20 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2.5 sm:gap-3.5 z-10 min-w-0">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#A87C66] to-[#8C5C42] border border-[#E4D5C7]/40 flex items-center justify-center text-amber-100 shadow-inner flex-shrink-0">
                      <Coffee className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h2 className="text-base sm:text-xl font-extrabold font-serif text-[#FAF4F0] tracking-wide">
                          ☕ 心靈拿鐵咖啡館 • 點餐檯
                        </h2>
                        <span className="text-[9px] sm:text-[10px] font-mono bg-amber-400/20 text-amber-200 border border-amber-300/30 px-2 py-0.5 rounded-full font-bold">
                          OPEN
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#D2BCA6] font-sans mt-0.5 leading-snug">
                        「在時空沒有攪拌的平行世界裡，看見每個時間線上的你。」
                      </p>
                    </div>
                  </div>

                  {/* Cafe Info Badge */}
                  <div className="z-10 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#E4D5C7] bg-[#3A2E2D]/80 border border-[#A87C66]/40 px-2.5 py-1 rounded-full self-start sm:self-auto shrink-0">
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                    <span>時空矩陣 9 宮格吧台</span>
                  </div>
                </div>

                {/* Cafe Main Counter Body */}
                <div className="p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                  
                  {/* BARISTA STAFF STANDING IN THE CENTER */}
                  <BaristaStaff
                    isHandingMenu={hasHandedMenu}
                    greetingIndex={greetingIndex}
                    selectedModeName={
                      readingMode === 'divination'
                        ? '🔮 綜合占卜'
                        : readingMode === 'decision'
                        ? '🏆 獎落誰家'
                        : '🍀 改運加持'
                    }
                    onClickStaff={handleRandomSelectMode}
                  />

                  {/* STEP 1: SERVICE MODE SELECTION (VERTICALLY ARRANGED & RESPONSIVE) */}
                  <div className="space-y-2.5 sm:space-y-3 bg-white/90 p-3.5 sm:p-5 rounded-2xl border border-[#D2BCA6]/70 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#E4D5C7] pb-2">
                      <label className="text-xs sm:text-sm font-extrabold text-[#4A3E3D] font-serif flex items-center gap-2 tracking-wide">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#A87C66]" />
                        <span>Step 1. 選擇你的心靈特調</span>
                      </label>
                    </div>

                    {/* 3 Modes arranged Vertically */}
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                      {/* Mode 1: Divination */}
                      <button
                        type="button"
                        onClick={() => {
                          setReadingMode('divination');
                          setHasHandedMenu(true);
                        }}
                        className={`p-3 sm:p-4 rounded-xl text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 relative overflow-hidden cursor-pointer border-2 ${
                          readingMode === 'divination' && hasHandedMenu
                            ? 'bg-gradient-to-r from-[#A87C66] to-[#8C5C42] text-white border-[#8C5C42] shadow-md'
                            : 'bg-[#FAF4F0] text-[#4A3E3D] border-[#E4D5C7] hover:border-[#A87C66]/60 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg shrink-0 ${
                            readingMode === 'divination' && hasHandedMenu ? 'bg-amber-100 text-amber-900' : 'bg-[#E4D5C7] text-[#4A3E3D]'
                          }`}>
                            🔮
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-extrabold font-serif flex flex-wrap items-center gap-1.5">
                              <span>綜合占卜</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans ${
                                readingMode === 'divination' && hasHandedMenu ? 'bg-amber-300/30 text-amber-100' : 'bg-[#A87C66]/10 text-[#A87C66]'
                              }`}>
                                經典全視角解構
                              </span>
                            </div>
                            <p className={`text-[11px] sm:text-xs mt-0.5 leading-snug ${readingMode === 'divination' && hasHandedMenu ? 'text-amber-100/90' : 'text-[#7A6A63]'}`}>
                              全面解構過去、現在與未來時空流向
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end font-bold text-xs shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-[#E4D5C7]/60 sm:border-transparent w-full sm:w-auto">
                          {readingMode === 'divination' && hasHandedMenu ? (
                            <span className="flex items-center gap-1 bg-amber-300 text-amber-950 px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs">
                              <Check className="w-3.5 h-3.5" /> 已選取
                            </span>
                          ) : (
                            <span className="text-[#A87C66] text-xs font-extrabold flex items-center gap-1">
                              選擇特調 &rarr;
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Mode 2: Decision */}
                      <button
                        type="button"
                        onClick={() => {
                          setReadingMode('decision');
                          setHasHandedMenu(true);
                        }}
                        className={`p-3 sm:p-4 rounded-xl text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 relative overflow-hidden cursor-pointer border-2 ${
                          readingMode === 'decision' && hasHandedMenu
                            ? 'bg-gradient-to-r from-[#4A3E3D] to-[#3A2E2D] text-[#F5EBE6] border-[#3A2E2D] shadow-md'
                            : 'bg-[#FAF4F0] text-[#4A3E3D] border-[#E4D5C7] hover:border-[#4A3E3D]/60 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg shrink-0 ${
                            readingMode === 'decision' && hasHandedMenu ? 'bg-amber-100 text-amber-950' : 'bg-[#E4D5C7] text-[#4A3E3D]'
                          }`}>
                            🏆
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-extrabold font-serif flex flex-wrap items-center gap-1.5">
                              <span>獎落誰家</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans ${
                                readingMode === 'decision' && hasHandedMenu ? 'bg-amber-300/30 text-amber-200' : 'bg-[#A87C66]/10 text-[#A87C66]'
                              }`}>
                                多選項契合評比
                              </span>
                            </div>
                            <p className={`text-[11px] sm:text-xs mt-0.5 leading-snug ${readingMode === 'decision' && hasHandedMenu ? 'text-amber-100/90' : 'text-[#7A6A63]'}`}>
                              多個選項 (如：A/B/C) 全陣契合度評比
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end font-bold text-xs shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-[#E4D5C7]/60 sm:border-transparent w-full sm:w-auto">
                          {readingMode === 'decision' && hasHandedMenu ? (
                            <span className="flex items-center gap-1 bg-amber-300 text-amber-950 px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs">
                              <Check className="w-3.5 h-3.5" /> 已選取
                            </span>
                          ) : (
                            <span className="text-[#A87C66] text-xs font-extrabold flex items-center gap-1">
                              選擇特調 &rarr;
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Mode 3: Luck */}
                      <button
                        type="button"
                        onClick={() => {
                          setReadingMode('luck');
                          setHasHandedMenu(true);
                          setShowLuckModal(true);
                        }}
                        className={`p-3 sm:p-4 rounded-xl text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 relative overflow-hidden cursor-pointer border-2 ${
                          readingMode === 'luck' && hasHandedMenu
                            ? 'bg-gradient-to-r from-amber-700 to-[#A87C66] text-white border-amber-800 shadow-md'
                            : 'bg-amber-50/70 text-amber-950 border-amber-300/80 hover:border-amber-500 hover:bg-amber-100/80'
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg shrink-0 ${
                            readingMode === 'luck' && hasHandedMenu ? 'bg-amber-100 text-amber-950' : 'bg-amber-200 text-amber-900'
                          }`}>
                            🍀
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-extrabold font-serif flex flex-wrap items-center gap-1.5">
                              <span>改運加持</span>
                              <span className="text-[10px] bg-amber-800 text-amber-100 px-2 py-0.5 rounded-full font-bold">
                                HOT 轉運套餐
                              </span>
                            </div>
                            <p className={`text-[11px] sm:text-xs mt-0.5 leading-snug ${readingMode === 'luck' && hasHandedMenu ? 'text-amber-100/90' : 'text-amber-800/80'}`}>
                              選擇套餐加持正向轉運磁場與祝禱
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end font-bold text-xs shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-amber-300/60 sm:border-transparent w-full sm:w-auto">
                          {readingMode === 'luck' && hasHandedMenu ? (
                            <span className="flex items-center gap-1 bg-amber-300 text-amber-950 px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs">
                              <Check className="w-3.5 h-3.5" /> 已選取
                            </span>
                          ) : (
                            <span className="text-amber-800 text-xs font-extrabold flex items-center gap-1">
                              選擇特調 &rarr;
                            </span>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* STEP 2: ANIMATED CLIPBOARD HANDED OUT BY BARISTA STAFF */}
                  <AnimatePresence>
                    {hasHandedMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.4, type: 'spring', stiffness: 220 }}
                        className="bg-white border-2 border-[#A87C66] rounded-2xl p-3.5 sm:p-6 shadow-xl space-y-3.5 sm:space-y-5 relative overflow-hidden"
                      >
                        {/* Clipboard Top Clip Decoration */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-[#5C4D4B] rounded-b-lg flex items-center justify-center shadow-xs">
                          <div className="w-10 sm:w-12 h-1 sm:h-1.5 bg-[#E4D5C7] rounded-full" />
                        </div>

                        <div className="pt-2 flex items-start sm:items-center justify-between border-b border-[#E4D5C7] pb-2.5 gap-2">
                          <div className="flex items-start sm:items-center gap-2 min-w-0">
                            <Clipboard className="w-4 h-4 sm:w-5 sm:h-5 text-[#A87C66] shrink-0 mt-0.5 sm:mt-0" />
                            <div className="min-w-0">
                              <h3 className="text-xs sm:text-base font-extrabold text-[#4A3E3D] font-serif truncate">
                                翔子的私房菜單 • 「
                                {readingMode === 'divination'
                                  ? '🔮 綜合占卜'
                                  : readingMode === 'decision'
                                  ? '🏆 獎落誰家'
                                  : '🍀 改運加持'}
                                」
                              </h3>
                              <p className="text-[10px] sm:text-[11px] text-[#A87C66] font-sans leading-tight mt-0.5">
                                請填寫您想探詢的問題，或點擊點餐鈴送單開牌！
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* QUERY / CUSTOMER NOTE FIELD */}
                        <div className="space-y-2.5 sm:space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <label className="font-extrabold text-[#4A3E3D] flex items-center gap-1.5 font-serif leading-tight">
                              <MessageSquare className="w-3.5 h-3.5 text-[#A87C66] shrink-0" />
                              <span>
                                Step 2. {readingMode === 'decision'
                                  ? '請填寫欲抉擇的議題與選項'
                                  : '顧客心靈備註 / 您想詢問的問題 (選填)'}
                              </span>
                            </label>
                            <span className="text-[10px] text-[#A87C66] font-mono font-bold shrink-0 ml-1">
                              {userQuestion.length} / 50 字
                            </span>
                          </div>

                          <input
                            type="text"
                            maxLength={50}
                            value={userQuestion}
                            onChange={(e) => setUserQuestion(e.target.value)}
                            placeholder={
                              readingMode === 'decision'
                                ? "例如：午餐飲料要喝得正、龍角還是五桐號？"
                                : "例如：下半年的事業轉換方向、與特定夥伴的溝通對策..."
                            }
                            className="w-full text-xs sm:text-sm bg-[#FAF4F0] border-2 border-[#E4D5C7] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-[#4A3E3D] focus:outline-none focus:ring-2 focus:ring-[#A87C66] focus:bg-white transition-all font-sans placeholder:text-[#A87C66]/50 shadow-inner"
                          />

                          {readingMode === 'decision' && (
                            <div className="pt-2 border-t border-[#E4D5C7]/60 space-y-1.5">
                              <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-[#A87C66] font-bold">
                                <span>🎯 自動識別項目：</span>
                                {extractedOptions.length >= 2 ? (
                                  <span className="text-emerald-800 font-bold bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-300 text-[10px]">
                                    已擷取 {extractedOptions.length} 個選項
                                  </span>
                                ) : (
                                  <span className="text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300 text-[10px]">
                                    請輸入如「得正、龍角還是五桐號」
                                  </span>
                                )}
                              </div>

                              {extractedOptions.length >= 2 ? (
                                <div className="flex flex-wrap gap-1.5">
                                  {extractedOptions.map((opt, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 bg-[#A87C66]/10 text-[#4A3E3D] border border-[#A87C66]/30 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                                    >
                                      <span className="w-3.5 h-3.5 rounded-full bg-[#A87C66] text-white text-[9px] font-mono flex items-center justify-center">
                                        {i + 1}
                                      </span>
                                      {opt}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-[10px] sm:text-[11px] text-[#7A6A63] leading-normal font-sans">
                                  💡 輸入帶有「、」或「還是」的句子，系統自動提取選項並在解讀報告中做全方位評比！
                                </p>
                              )}
                            </div>
                          )}

                          {readingMode === 'luck' && (
                            <div className="pt-2 border-t border-amber-200 bg-amber-50/60 p-2.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Gift className="w-4 h-4 text-amber-700 shrink-0" />
                                <span className="text-xs font-bold text-amber-950">
                                  {unlockedLuckBlessing ? `已選擇：${unlockedLuckBlessing.name}` : '未選擇改運套餐（預設：經典拿鐵）'}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowLuckModal(true)}
                                className="px-3 py-1 bg-amber-700 text-white rounded-lg text-xs font-bold hover:bg-amber-800 self-end sm:self-auto"
                              >
                                {unlockedLuckBlessing ? '變更套餐' : '選擇套餐'}
                              </button>
                            </div>
                          )}
                        </div>

                        {/* CALL BELL SECTION (點餐鈴按響開牌) */}
                        <div className="pt-2 sm:pt-3 border-t-2 border-dashed border-[#E4D5C7] text-center">
                          <OrderBell
                            onRingBell={() => setShowDealChoiceModal(true)}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>
            )}

            {/* STAGE 1: MINDFUL LATTE RITUAL */}
            {shufflingStage === 'breathing' && (
              <div className="max-w-2xl mx-auto bg-[#E4D5C7]/20 border border-[#E4D5C7] rounded-2xl p-8 md:p-12 text-center flex flex-col items-center shadow-xs">
                <p className="text-xs text-[#A87C66] mb-3 tracking-widest font-sans font-bold bg-[#E4D5C7]/60 px-4 py-1 rounded-full border border-[#D2BCA6]/50 shadow-2xs">
                  【 拿鐵靜心儀式 】
                </p>

                <h3 className="text-lg md:text-2xl font-bold text-[#4A3E3D] mb-6 font-serif leading-relaxed max-w-lg">
                  有如沙漏，讓身邊的能量以拿鐵的形式，溫暖地進入心中。
                </h3>

                {/* Top-Down Bird's-Eye View Ceramic Mug with Latte Art & Dripping Ripples */}
                <div className="relative my-4 flex items-center justify-center">
                  
                  {/* Mug Outer Body & Handle (Top-down view) */}
                  <div className="relative w-60 h-60 sm:w-68 sm:h-68 flex items-center justify-center">
                    
                    {/* Mug Handle (Projecting on the right side) */}
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-24 rounded-r-3xl bg-gradient-to-r from-[#D8C7B8] to-[#EFE6DB] border-4 border-[#C2AF9E] shadow-md z-0" />

                    {/* Ceramic Mug Outer Rim Ring */}
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#FAF5EE] via-[#EFE6DB] to-[#D8C7B8] p-4 sm:p-5 shadow-2xl border-4 border-[#C2AF9E] z-10 flex items-center justify-center">
                      
                      {/* Inner Ceramic Wall Depth Shadow */}
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#3B2213] via-[#5C3822] to-[#301B0E] p-3 shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)] overflow-hidden flex items-center justify-center">
                        
                        {/* Espresso Liquid Crema Base */}
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B5A3C] via-[#583520] to-[#2E1A0F] opacity-95" />

                        {/* Creamy Milk Foam Swirls & Rosette Latte Art (Gentle Rotation + Heart Diffusion/Reassembling Effect) */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-2 pointer-events-none opacity-90"
                        >
                          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                            <defs>
                              <linearGradient id="foamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFF9F2" stopOpacity="0.95" />
                                <stop offset="60%" stopColor="#F3E5D8" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#D2B49C" stopOpacity="0.4" />
                              </linearGradient>
                            </defs>
                            
                            {/* Animated Latte Art Heart - Diffusion (暈開) and Reassembling (重組) Cycle */}
                            <motion.g
                              animate={{
                                scale: [1, 1.28, 1.55, 0.82, 1],
                                opacity: [0.95, 0.55, 0.15, 0.75, 0.95],
                                filter: [
                                  "blur(0px)",
                                  "blur(4px)",
                                  "blur(9px)",
                                  "blur(2px)",
                                  "blur(0px)"
                                ]
                              }}
                              transition={{
                                duration: 5.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              style={{ transformOrigin: "100px 90px" }}
                              fill="url(#foamGrad)"
                              stroke="#FFEAD8"
                              strokeWidth="1"
                              strokeOpacity="0.6"
                            >
                              {/* Main Heart Shapes */}
                              <path d="M100 45 C115 25, 145 35, 100 85 C55 35, 85 25, 100 45 Z" />
                              <path d="M100 70 C120 50, 155 65, 100 120 C45 65, 80 50, 100 70 Z" opacity="0.85" />
                              <path d="M100 100 C125 80, 165 95, 100 155 C35 95, 75 80, 100 100 Z" opacity="0.7" />
                              
                              {/* Swirling milk foam ribbons */}
                              <circle cx="100" cy="100" r="82" fill="none" stroke="url(#foamGrad)" strokeWidth="3" strokeDasharray="12 8" opacity="0.4" />
                              <circle cx="100" cy="100" r="68" fill="none" stroke="url(#foamGrad)" strokeWidth="2" strokeDasharray="20 12" opacity="0.3" />
                            </motion.g>

                            {/* Micro Milk Foam Particles expanding outward during diffusion and condensing back during reassembly */}
                            <motion.g
                              animate={{
                                scale: [0.8, 1.4, 0.6, 0.8],
                                opacity: [0.2, 0.8, 0.1, 0.2]
                              }}
                              transition={{
                                duration: 5.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              style={{ transformOrigin: "100px 100px" }}
                            >
                              <circle cx="65" cy="65" r="4" fill="#FFF9F2" opacity="0.6" />
                              <circle cx="135" cy="65" r="4" fill="#FFF9F2" opacity="0.6" />
                              <circle cx="100" cy="140" r="5" fill="#F3E5D8" opacity="0.7" />
                              <circle cx="50" cy="110" r="3" fill="#FFF9F2" opacity="0.5" />
                              <circle cx="150" cy="110" r="3" fill="#FFF9F2" opacity="0.5" />
                            </motion.g>
                          </svg>
                        </motion.div>

                        {/* Concentric Expanding Ripples on Mug Surface */}
                        {[0, 1].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [0.1, 2.8],
                              opacity: [0.9, 0],
                            }}
                            transition={{
                              duration: 2.0,
                              repeat: Infinity,
                              delay: 0.6 + i * 0.4,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="absolute w-24 h-24 rounded-full border-2 border-[#FFF0E0]/80 bg-[#FFF0E0]/15 pointer-events-none z-20"
                          />
                        ))}

                        {/* Falling Smooth Cold Brew Coffee Droplet (Dropping down into center - smaller & cold brew drop style) */}
                        <motion.div
                          animate={{
                            y: [-85, 0, 0],
                            scaleY: [1.1, 0.8, 0.3],
                            scaleX: [0.9, 1.1, 1.2],
                            opacity: [0, 1, 0, 0],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            times: [0, 0.4, 0.41, 1],
                            ease: "easeIn",
                          }}
                          className="absolute z-30 w-3.5 h-5 sm:w-4 sm:h-6 pointer-events-none"
                        >
                          <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-md overflow-visible">
                            <defs>
                              <linearGradient id="coldBrewDropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFF2E5" stopOpacity="0.95" />
                                <stop offset="35%" stopColor="#C8936A" />
                                <stop offset="70%" stopColor="#7C4B2E" />
                                <stop offset="100%" stopColor="#2B160B" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M12 1 C12 1 2 15 2 21 C2 26.5 6.5 31 12 31 C17.5 31 22 26.5 22 21 C22 15 12 1 12 1 Z"
                              fill="url(#coldBrewDropGrad)"
                            />
                            <path
                              d="M9 10 C7.5 14 6.5 17 6.5 21"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              opacity="0.75"
                            />
                          </svg>
                        </motion.div>

                        {/* Splash Ring at Impact Moment */}
                        <motion.div
                          animate={{
                            scale: [0.2, 1.3, 0.4],
                            opacity: [0, 0.9, 0],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            times: [0.38, 0.52, 0.65],
                            ease: "easeOut",
                          }}
                          className="absolute z-20 w-8 h-8 rounded-full border-2 border-[#FFF8F0] bg-[#FFF0E0]/30"
                        />

                        {/* Center Liquid Pool subtle pulsing light */}
                        <motion.div
                          animate={{
                            scale: [0.9, 1.2, 0.9],
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FFF5EC]/40 to-[#D8B08C]/30 blur-xs z-10"
                        />

                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[#7A6A63] text-xs sm:text-sm leading-relaxed my-5 max-w-md font-serif">
                  平心靜氣，感受精緻的冷萃拿鐵水滴緩緩落入杯中、於心靈湖面擴散出平靜波紋。<br className="hidden sm:inline" />
                  當內心達到和諧與沉靜時，請點擊下方按鈕開始發牌。
                </p>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full justify-center">
                  <button
                    onClick={skipToShuffle}
                    className="px-6 py-3 bg-[#4A3E3D] text-[#F5EBE6] rounded-xl text-sm font-semibold tracking-wider hover:bg-[#3d3332] active:scale-95 transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#E4D5C7]" />
                    <span>完成靜心，開始發牌</span>
                  </button>
                  <button
                    onClick={() => setShufflingStage('idle')}
                    className="px-4 py-2 text-xs text-[#7A6A63] hover:text-[#4A3E3D] underline transition-colors"
                  >
                    返回
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2: CARDS SHUFFLING ANIMATION (POURING LATTE INTO 9 ARRANGED MUGS) */}
            {shufflingStage === 'shuffling' && (
              <div className="max-w-xl mx-auto py-12 px-6 bg-[#E4D5C7]/20 border border-[#E4D5C7] rounded-2xl text-center space-y-6 shadow-xs">
                {/* 9 Arranged Mugs Grid receiving latte stream */}
                <div className="relative max-w-xs mx-auto">
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="relative bg-[#FAF5EE] border-2 border-[#C2AF9E] rounded-xl p-2.5 flex flex-col items-center justify-center shadow-xs overflow-hidden h-16 sm:h-20"
                      >
                        {/* Mug Handle */}
                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-6 border-2 border-[#C2AF9E] rounded-r-md bg-[#FAF5EE]" />
                        
                        {/* Mug Top Foam filling */}
                        <motion.div
                          animate={{
                            height: ['10%', '85%', '10%'],
                            backgroundColor: ['#E2C4A8', '#FFF8F0', '#E2C4A8']
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            delay: i * 0.12,
                            ease: "easeInOut"
                          }}
                          className="absolute bottom-0 inset-x-0 bg-[#FFF8F0] border-t border-[#D2BCA6] flex items-center justify-center overflow-hidden"
                        >
                          <span className="text-[9px] text-[#A87C66] font-bold opacity-80">☕️ {i + 1}</span>
                        </motion.div>

                        {/* Steam rising */}
                        <motion.div
                          animate={{ y: [-2, -8, -2], opacity: [0.2, 0.8, 0.2] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                          className="absolute -top-1 text-[10px] pointer-events-none"
                        >
                          ♨️
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Silky Latte Pouring Stream Animation */}
                  <motion.div
                    animate={{ x: [-90, 90, -90] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -mt-8 flex flex-col items-center pointer-events-none z-20"
                  >
                    <div className="text-xs">🥛</div>
                    <div className="w-1.5 h-12 bg-gradient-to-b from-[#FFFDF9] via-[#F3E5D8] to-[#A87C66] rounded-full shadow-xs opacity-90" />
                  </motion.div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-extrabold text-[#4A3E3D] font-serif flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#A87C66] animate-spin" />
                    <span>正在將滑順拿鐵注入 9 座時空馬克杯中...</span>
                  </h4>
                  <p className="text-xs text-[#7A6A63] font-serif">
                    費雪-葉茲隨機演算法 (Fisher-Yates) 嚴格分配花色點數中
                  </p>
                </div>
              </div>
            )}

            {/* STAGE 3: ACTIVE DEALT MATRIX WITH RESULT -> REPORT FLOW */}
            {isGridActive && (
              <div className="space-y-8">
                
                {/* Result vs Report vs Whisper Toggle Bar */}
                <div className="max-w-4xl mx-auto flex flex-col items-center border-b border-[#E4D5C7] pb-3 space-y-2">
                  <div className="bg-[#E4D5C7]/60 p-1 rounded-xl flex flex-wrap justify-center gap-1 border border-[#D2BCA6]">
                    <button
                      onClick={() => setReadingSubTab('result')}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                        readingSubTab === 'result'
                          ? 'bg-[#4A3E3D] text-[#F5EBE6] shadow-sm'
                          : 'text-[#7A6A63] hover:text-[#4A3E3D]'
                      }`}
                    >
                      <Grid className="w-4 h-4 text-[#E4D5C7]" />
                      <span>1. 九宮格結果</span>
                    </button>

                    <button
                      onClick={() => setReadingSubTab('report')}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                        readingSubTab === 'report'
                          ? 'bg-[#4A3E3D] text-[#F5EBE6] shadow-sm'
                          : 'text-[#7A6A63] hover:text-[#4A3E3D]'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-[#E4D5C7]" />
                      <span>2. 深度純文字解讀報告</span>
                    </button>

                    <button
                      onClick={() => setReadingSubTab('whisper')}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                        readingSubTab === 'whisper'
                          ? 'bg-[#4A3E3D] text-[#F5EBE6] shadow-sm'
                          : 'text-[#7A6A63] hover:text-[#4A3E3D]'
                      }`}
                    >
                      <Coffee className="w-4 h-4 text-[#E4D5C7]" />
                      <span>3. 翔子的悄悄話</span>
                    </button>
                  </div>

                  {/* Mobile Quick Jump Navigation Pills */}
                  {readingSubTab === 'result' && (
                    <div className="flex sm:hidden items-center justify-center gap-1.5 pt-1 overflow-x-auto w-full px-2 text-[11px] font-bold">
                      <span className="text-[#A87C66] whitespace-nowrap text-[10px]">📱 手機速跳：</span>
                      <button
                        onClick={() => document.getElementById('nine-grid-cards')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-2 py-0.5 bg-white border border-[#D2BCA6] rounded-full text-[#4A3E3D] hover:bg-[#F5EBE6] whitespace-nowrap shadow-2xs"
                      >
                        🃏 9宮牌陣
                      </button>
                      <button
                        onClick={() => document.getElementById('structure-breakdown-card')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-2 py-0.5 bg-white border border-[#D2BCA6] rounded-full text-[#4A3E3D] hover:bg-[#F5EBE6] whitespace-nowrap shadow-2xs"
                      >
                        📐 結構落差
                      </button>
                      <button
                        onClick={() => document.getElementById('shoko-chat-card')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-2 py-0.5 bg-[#4A3E3D] text-[#F5EBE6] rounded-full whitespace-nowrap shadow-2xs"
                      >
                        💬 翔子陪伴
                      </button>
                    </div>
                  )}
                </div>

                {/* SUB-VIEW 1: RESULT SCREEN (九宮格結果 - 直觀完整排列) */}
                {readingSubTab === 'result' && (
                  <div className="space-y-8">
                    
                    {/* 1. 3x3 Nine-Grid Cards */}
                    <div id="nine-grid-cards" className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
                      {/* Grid header action bar */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-1 sm:px-2">
                        <span className="text-xs text-[#7A6A63] tracking-widest flex items-center gap-1 font-sans font-bold">
                          <Clock className="w-3.5 h-3.5 text-[#A87C66]" /> 
                          時空共鳴矩陣 (九宮格結果)
                        </span>
                        
                        <div className="flex space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs">
                          <button 
                            onClick={() => openManualModal()}
                            className="bg-[#A87C66] text-[#F5EBE6] px-2.5 py-1 rounded-lg hover:bg-[#966b56] transition-all flex items-center gap-1 shadow-xs"
                          >
                            <Edit3 className="w-3 h-3" /> 微調牌陣
                          </button>
                          <button 
                            onClick={revealAllCards}
                            className="bg-[#E4D5C7]/50 text-[#4A3E3D] px-2.5 py-1 rounded-lg hover:bg-[#E4D5C7] transition-all flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" /> 翻開全部
                          </button>
                          <button 
                            onClick={hideAllCards}
                            className="bg-[#E4D5C7]/50 text-[#4A3E3D] px-2.5 py-1 rounded-lg hover:bg-[#E4D5C7] transition-all flex items-center gap-1"
                          >
                            <EyeOff className="w-3 h-3" /> 隱藏全部
                          </button>
                        </div>
                      </div>

                      {/* 3x3 Layout - Standard Playing Card Grid */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-5">
                        {GRID_POSITIONS.map((pos, index) => {
                          const card = matrixCards[index];
                          const isInspected = revealedCards[index];

                          return (
                            <motion.div
                              key={pos.id}
                              initial={{ opacity: 0, scale: 0.9, y: 15 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.08 }}
                              className="flex flex-col h-full bg-[#E4D5C7]/10 rounded-xl border border-[#E4D5C7] overflow-hidden group shadow-2xs hover:shadow-md transition-all cursor-pointer"
                              onClick={() => {
                                setRevealedCards(prev => {
                                  const next = [...prev];
                                  next[index] = true;
                                  return next;
                                });
                                setActiveZoomCardIndex(index);
                              }}
                            >
                              {/* Position Label Bar */}
                              <div className="bg-[#E4D5C7] px-1.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-[#4A3E3D] border-b border-[#D2BCA6] flex justify-between items-center">
                                <span className="truncate max-w-[60px] sm:max-w-none">
                                  {pos.name}
                                </span>
                                <span className="font-sans text-[8px] sm:text-[10px] bg-[#F5EBE6] px-1 sm:px-1.5 py-0.5 rounded text-[#A87C66] flex-shrink-0 flex items-center gap-1">
                                  {isInspected && <span className="text-amber-800 font-bold">已閱</span>}
                                  P{pos.id}
                                </span>
                              </div>

                              {/* Card Face View */}
                              <div className="flex-1 p-1.5 sm:p-3 flex flex-col items-center justify-between min-h-[110px] sm:min-h-[165px] relative">
                                {card ? (
                                  <StandardPokerCardFace card={card} />
                                ) : (
                                  <div className="w-full h-full bg-amber-50 border border-dashed border-amber-300 rounded-xl flex items-center justify-center text-xs text-amber-800">
                                    未選牌
                                  </div>
                                )}

                                <div className="w-full pt-1 mt-1 border-t border-[#E4D5C7]/60 flex items-center justify-between text-[8px] sm:text-[10px] text-[#A87C66] font-bold">
                                  <span className="truncate">點擊放大看牌義</span>
                                  <ZoomIn className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A87C66] flex-shrink-0 group-hover:scale-125 transition-transform" />
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* MAGNIFIED CARD LIGHTBOX MODAL */}
                      <AnimatePresence>
                        {activeZoomCardIndex !== null && matrixCards[activeZoomCardIndex] && (
                          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.85, y: 20 }}
                              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                              className="w-full max-w-xl bg-[#FAF4F0] border-2 border-[#A87C66] rounded-3xl p-4 sm:p-7 shadow-2xl space-y-4 text-left relative overflow-hidden max-h-[90vh] flex flex-col justify-between"
                            >
                              {/* Top Header */}
                              <div className="flex justify-between items-center border-b border-[#E4D5C7] pb-3 flex-shrink-0">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-1 bg-[#4A3E3D] text-[#F5EBE6] rounded-lg text-xs font-extrabold font-mono">
                                    P{GRID_POSITIONS[activeZoomCardIndex].id}
                                  </span>
                                  <div>
                                    <h3 className="font-extrabold text-base sm:text-lg text-[#4A3E3D] font-serif">
                                      {GRID_POSITIONS[activeZoomCardIndex].name}
                                    </h3>
                                    <p className="text-[11px] text-[#A87C66] font-serif">
                                      角色意義：{GRID_POSITIONS[activeZoomCardIndex].role}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setActiveZoomCardIndex(null)}
                                  className="p-1.5 text-[#7A6A63] hover:text-[#4A3E3D] hover:bg-[#E4D5C7]/50 rounded-xl transition-colors cursor-pointer"
                                  title="關閉"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>

                              {/* Card & Detailed Interpretation Body */}
                              <div className="overflow-y-auto flex-1 space-y-4 pr-1">
                                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                                  {/* Magnified Card Face */}
                                  <div className="w-36 h-52 sm:w-44 sm:h-64 flex-shrink-0 shadow-lg rounded-xl overflow-hidden border-2 border-[#A87C66]">
                                    <StandardPokerCardFace card={matrixCards[activeZoomCardIndex]} isLarge={true} />
                                  </div>

                                  {/* Detailed Interpretation */}
                                  <div className="flex-1 space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-1 border-b border-[#E4D5C7] pb-2">
                                      <span className="text-sm font-extrabold text-[#4A3E3D] font-serif">
                                        {matrixCards[activeZoomCardIndex].suit} {matrixCards[activeZoomCardIndex].rank}
                                      </span>
                                      <span className="px-2.5 py-0.5 bg-[#A87C66] text-white text-xs font-bold rounded-full shadow-2xs">
                                        {getCardInterpretation(matrixCards[activeZoomCardIndex], GRID_POSITIONS[activeZoomCardIndex].role).keyword}
                                      </span>
                                    </div>

                                    <div className="bg-white border border-[#E4D5C7] rounded-xl p-3.5 space-y-2 shadow-2xs">
                                      <div className="text-xs font-bold text-[#A87C66] flex items-center gap-1.5 font-sans">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                        <span>單牌與時空角色綜合解讀：</span>
                                      </div>
                                      <p className="text-xs sm:text-sm text-[#4A3E3D] font-serif leading-relaxed">
                                        {getCardInterpretation(matrixCards[activeZoomCardIndex], GRID_POSITIONS[activeZoomCardIndex].role).text}
                                      </p>
                                    </div>

                                    {/* Shoko's Advice */}
                                    <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-3 space-y-1 text-xs text-[#4A3E3D] font-serif">
                                      <span className="font-extrabold text-amber-900 block text-[11px] font-sans">
                                        ☕ 翔子的位置調劑建言：
                                      </span>
                                      <p className="leading-relaxed text-[11px] text-[#5C4D4B]">
                                        在【{GRID_POSITIONS[activeZoomCardIndex].name}】出現 {matrixCards[activeZoomCardIndex].suit}{matrixCards[activeZoomCardIndex].rank}，提醒您留意此處的時空波幅，善用其專屬關鍵能量來優化局勢。
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Modal Footer Navigator */}
                              <div className="flex items-center justify-between pt-3 border-t border-[#E4D5C7] text-xs font-bold flex-shrink-0">
                                <button
                                  onClick={() => setActiveZoomCardIndex((activeZoomCardIndex + 8) % 9)}
                                  className="px-3 py-1.5 bg-[#E4D5C7]/60 text-[#4A3E3D] rounded-xl hover:bg-[#E4D5C7] transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  ← 上一張 (P{((activeZoomCardIndex + 8) % 9) + 1})
                                </button>

                                <button
                                  onClick={() => setActiveZoomCardIndex(null)}
                                  className="px-4 py-1.5 bg-[#4A3E3D] text-[#F5EBE6] rounded-xl hover:bg-[#3A2E2D] transition-all shadow-xs cursor-pointer"
                                >
                                  關閉視窗 ✕
                                </button>

                                <button
                                  onClick={() => setActiveZoomCardIndex((activeZoomCardIndex + 1) % 9)}
                                  className="px-3 py-1.5 bg-[#E4D5C7]/60 text-[#4A3E3D] rounded-xl hover:bg-[#E4D5C7] transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  下一張 (P{((activeZoomCardIndex + 1) % 9) + 1}) →
                                </button>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 3. THREE MAIN AXES & CORE COLUMN STRUCTURE */}
                    {(() => {
                      const structureBreakdown = getNineGridStructureBreakdown(matrixCards);
                      if (!structureBreakdown) return null;

                      return (
                        <div id="structure-breakdown-card" className="max-w-4xl mx-auto space-y-6">
                          <div className="bg-white border-2 border-[#A87C66]/40 rounded-2xl p-6 sm:p-8 shadow-md space-y-6 text-left">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E4D5C7] pb-4">
                              <div>
                                <h3 className="text-xl font-extrabold text-[#4A3E3D] font-serif flex items-center gap-2">
                                  <Grid className="w-5 h-5 text-[#A87C66]" />
                                  <span>時空拆解</span>
                                </h3>
                                <p className="text-xs text-[#7A6A63] font-serif mt-1">
                                  收束每個可能的平行世界，衡量立足的奇異點。
                                </p>
                              </div>
                              <span className="text-xs bg-[#E4D5C7] text-[#4A3E3D] px-3 py-1 rounded-full font-bold">
                                結構化決策輔助
                              </span>
                            </div>

                            {/* Toggle Button for Structure Breakdown */}
                            <button
                              type="button"
                              onClick={() => setStructureExpanded(!structureExpanded)}
                              className="w-full py-2.5 px-3.5 bg-[#E4D5C7]/60 border border-[#D2BCA6] rounded-xl text-xs font-extrabold text-[#4A3E3D] flex items-center justify-between hover:bg-[#E4D5C7] transition-all shadow-2xs cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5 font-sans">
                                <Sliders className="w-4 h-4 text-[#A87C66]" />
                                {structureExpanded ? '收合四大構面細部內容' : '📱 展開完整構面拆解與細節分析 (點擊展開查閱)'}
                              </span>
                              <ChevronDown className={`w-4 h-4 text-[#A87C66] transition-transform duration-300 ${structureExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`${structureExpanded ? 'block' : 'hidden md:block'} space-y-6`}>
                              {/* Mobile Axis Selector Pills */}
                            <div className="sm:hidden flex items-center gap-1.5 overflow-x-auto pb-2 text-xs font-bold no-scrollbar">
                              <span className="text-[10px] text-[#A87C66] whitespace-nowrap flex-shrink-0 font-sans">手機構面切換：</span>
                              <button
                                type="button"
                                onClick={() => setMobileStructureAxis('consciousness')}
                                className={`px-2.5 py-1 rounded-full border text-[11px] whitespace-nowrap transition-all ${
                                  mobileStructureAxis === 'consciousness'
                                    ? 'bg-[#A87C66] text-white border-[#8C5C42] shadow-2xs font-extrabold'
                                    : 'bg-[#F5EBE6] text-[#4A3E3D] border-[#E4D5C7]'
                                }`}
                              >
                                🧠 意識層 (P1-3)
                              </button>
                              <button
                                type="button"
                                onClick={() => setMobileStructureAxis('reality')}
                                className={`px-2.5 py-1 rounded-full border text-[11px] whitespace-nowrap transition-all ${
                                  mobileStructureAxis === 'reality'
                                    ? 'bg-[#A87C66] text-white border-[#8C5C42] shadow-2xs font-extrabold'
                                    : 'bg-[#F5EBE6] text-[#4A3E3D] border-[#E4D5C7]'
                                }`}
                              >
                                🌍 現實層 (P4-6)
                              </button>
                              <button
                                type="button"
                                onClick={() => setMobileStructureAxis('action')}
                                className={`px-2.5 py-1 rounded-full border text-[11px] whitespace-nowrap transition-all ${
                                  mobileStructureAxis === 'action'
                                    ? 'bg-[#A87C66] text-white border-[#8C5C42] shadow-2xs font-extrabold'
                                    : 'bg-[#F5EBE6] text-[#4A3E3D] border-[#E4D5C7]'
                                }`}
                              >
                                ⚡️ 行為層 (P7-9)
                              </button>
                              <button
                                type="button"
                                onClick={() => setMobileStructureAxis('core')}
                                className={`px-2.5 py-1 rounded-full border text-[11px] whitespace-nowrap transition-all ${
                                  mobileStructureAxis === 'core'
                                    ? 'bg-[#A87C66] text-white border-[#8C5C42] shadow-2xs font-extrabold'
                                    : 'bg-[#F5EBE6] text-[#4A3E3D] border-[#E4D5C7]'
                                }`}
                              >
                                🏛️ 核心柱 (P2,5,8)
                              </button>
                              <button
                                type="button"
                                onClick={() => setMobileStructureAxis('all')}
                                className={`px-2.5 py-1 rounded-full border text-[11px] whitespace-nowrap transition-all ${
                                  mobileStructureAxis === 'all'
                                    ? 'bg-[#4A3E3D] text-[#F5EBE6] border-[#3A2E2D] shadow-2xs font-extrabold'
                                    : 'bg-[#F5EBE6] text-[#4A3E3D] border-[#E4D5C7]'
                                }`}
                              >
                                📋 顯示全部
                              </button>
                            </div>

                            {/* 4 Cards Grid for Axes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Consciousness Axis */}
                              <div className={`${mobileStructureAxis === 'consciousness' || mobileStructureAxis === 'all' ? 'block' : 'hidden'} md:block bg-[#F5EBE6]/60 border border-[#E4D5C7] rounded-xl p-4 space-y-2`}>
                                <div className="flex justify-between items-center">
                                  <h4 className="font-extrabold text-sm text-[#4A3E3D] font-serif flex items-center gap-1.5">
                                    <span>🧠 {structureBreakdown.consciousnessAxis.name}</span>
                                  </h4>
                                  <span className="text-[10px] text-[#A87C66] font-bold">位置 1, 2, 3</span>
                                </div>
                                <p className="text-xs text-[#7A6A63] font-serif leading-relaxed">
                                  {structureBreakdown.consciousnessAxis.subtitle}
                                </p>
                                <div className="bg-white/90 p-2.5 rounded-lg border border-[#E4D5C7] text-xs text-[#4A3E3D] font-serif leading-relaxed">
                                  {structureBreakdown.consciousnessAxis.summary}
                                </div>
                                <div className="text-[10px] text-[#A87C66] font-mono font-semibold">
                                  📌 {structureBreakdown.consciousnessAxis.evidence}
                                </div>
                              </div>

                              {/* Reality Axis */}
                              <div className={`${mobileStructureAxis === 'reality' || mobileStructureAxis === 'all' ? 'block' : 'hidden'} md:block bg-[#F5EBE6]/60 border border-[#E4D5C7] rounded-xl p-4 space-y-2`}>
                                <div className="flex justify-between items-center">
                                  <h4 className="font-extrabold text-sm text-[#4A3E3D] font-serif flex items-center gap-1.5">
                                    <span>🌍 {structureBreakdown.realityAxis.name}</span>
                                  </h4>
                                  <span className="text-[10px] text-[#A87C66] font-bold">位置 4, 5, 6</span>
                                </div>
                                <p className="text-xs text-[#7A6A63] font-serif leading-relaxed">
                                  {structureBreakdown.realityAxis.subtitle}
                                </p>
                                <div className="bg-white/90 p-2.5 rounded-lg border border-[#E4D5C7] text-xs text-[#4A3E3D] font-serif leading-relaxed">
                                  {structureBreakdown.realityAxis.summary}
                                </div>
                                <div className="text-[10px] text-[#A87C66] font-mono font-semibold">
                                  📌 {structureBreakdown.realityAxis.evidence}
                                </div>
                              </div>

                              {/* Action Axis */}
                              <div className={`${mobileStructureAxis === 'action' || mobileStructureAxis === 'all' ? 'block' : 'hidden'} md:block bg-[#F5EBE6]/60 border border-[#E4D5C7] rounded-xl p-4 space-y-2`}>
                                <div className="flex justify-between items-center">
                                  <h4 className="font-extrabold text-sm text-[#4A3E3D] font-serif flex items-center gap-1.5">
                                    <span>⚡️ {structureBreakdown.actionAxis.name}</span>
                                  </h4>
                                  <span className="text-[10px] text-[#A87C66] font-bold">位置 7, 8, 9</span>
                                </div>
                                <p className="text-xs text-[#7A6A63] font-serif leading-relaxed">
                                  {structureBreakdown.actionAxis.subtitle}
                                </p>
                                <div className="bg-white/90 p-2.5 rounded-lg border border-[#E4D5C7] text-xs text-[#4A3E3D] font-serif leading-relaxed">
                                  {structureBreakdown.actionAxis.summary}
                                </div>
                                <div className="text-[10px] text-[#A87C66] font-mono font-semibold">
                                  📌 {structureBreakdown.actionAxis.evidence}
                                </div>
                              </div>

                              {/* Core Column */}
                              <div className={`${mobileStructureAxis === 'core' || mobileStructureAxis === 'all' ? 'block' : 'hidden'} md:block bg-[#F5EBE6]/60 border border-[#E4D5C7] rounded-xl p-4 space-y-2`}>
                                <div className="flex justify-between items-center">
                                  <h4 className="font-extrabold text-sm text-[#4A3E3D] font-serif flex items-center gap-1.5">
                                    <span>🏛️ {structureBreakdown.coreColumn.name}</span>
                                  </h4>
                                  <span className="text-[10px] text-[#A87C66] font-bold">位置 2, 5, 8</span>
                                </div>
                                <p className="text-xs text-[#7A6A63] font-serif leading-relaxed">
                                  {structureBreakdown.coreColumn.subtitle}
                                </p>
                                <div className="bg-white/90 p-2.5 rounded-lg border border-[#E4D5C7] text-xs text-[#4A3E3D] font-serif leading-relaxed">
                                  {structureBreakdown.coreColumn.summary}
                                </div>
                                <div className="text-[10px] text-[#A87C66] font-mono font-semibold">
                                  📌 {structureBreakdown.coreColumn.evidence}
                                </div>
                              </div>
                            </div>
                            </div>

                            {/* 4. OBJECTIVE GAP ANALYSIS MATRIX */}
                            <div className="space-y-4 pt-2 border-t border-[#E4D5C7]">
                              <div className="flex items-center justify-between">
                                <h4 className="font-extrabold text-base text-[#4A3E3D] font-serif flex items-center gap-2">
                                  <Compass className="w-4 h-4 text-[#A87C66]" />
                                  <span>三大構面交叉落差指標（明確標示解讀依據）</span>
                                </h4>
                                <span className="text-[10px] bg-[#A87C66] text-white px-2.5 py-0.5 rounded font-bold">
                                  交叉落差矩陣
                                </span>
                              </div>

                              <div className="grid grid-cols-1 gap-3.5">
                                {[
                                  structureBreakdown.gaps.knowDoGap,
                                  structureBreakdown.gaps.beliefRealityGap,
                                  structureBreakdown.gaps.actionEnvGap
                                ].map((gap) => (
                                  <div
                                    key={gap.type}
                                    className="bg-gradient-to-r from-white via-amber-50/20 to-[#F5EBE6]/40 border border-[#E4D5C7] rounded-xl p-4 space-y-2 shadow-2xs"
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <span className="font-extrabold text-xs sm:text-sm text-[#4A3E3D] font-sans">
                                        {gap.title}
                                      </span>
                                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${gap.badgeStyle.bg} ${gap.badgeStyle.text} ${gap.badgeStyle.border}`}>
                                        {gap.levelTag}
                                      </span>
                                    </div>

                                    <p className="text-xs text-[#4A3E3D] font-serif leading-relaxed">
                                      {gap.description}
                                    </p>

                                    <div className="bg-amber-50/90 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-950 font-serif leading-relaxed flex items-start gap-2">
                                      <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <strong className="text-amber-900 font-sans block mb-0.5">具體行動推力（非泛泛之論）：</strong>
                                        {gap.actionPush}
                                      </div>
                                    </div>

                                    <div className="text-[10px] text-[#A87C66] font-mono font-medium pt-0.5">
                                      🔍 {gap.evidence}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* 5. SHOKO WHISPER ENTRY BANNER */}
                          <div id="shoko-whisper-banner" className="bg-gradient-to-r from-amber-950 via-[#4A3E3D] to-amber-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border-2 border-amber-500/30 overflow-hidden relative text-left">
                            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-amber-300/80 overflow-hidden shadow-md flex-shrink-0 bg-amber-950">
                                <img
                                  src={shokoWhisperImg}
                                  alt="翔子的悄悄話"
                                  className="w-full h-full object-cover object-[center_15%] scale-135 origin-top"
                                />
                              </div>

                              <div className="space-y-2 text-center sm:text-left flex-1">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                  <h3 className="text-xl sm:text-2xl font-extrabold text-amber-100 font-serif">
                                    翔子的悄悄話
                                  </h3>
                                </div>
                                <p className="text-xs sm:text-sm text-amber-100/90 font-serif leading-relaxed">
                                  「看見了未來的自己...還想聽聽看，我看見了什麼嗎～」
                                </p>

                                <div className="pt-2">
                                  <button
                                    type="button"
                                    onClick={() => setReadingSubTab('whisper')}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center sm:justify-start gap-2 mx-auto sm:mx-0 cursor-pointer"
                                  >
                                    <span>只有你和我，告訴我吧❤️</span>
                                    <ArrowRight className="w-4 h-4 text-amber-950" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                  </div>
                )}

                {/* SUB-VIEW 2: REPORT SCREEN (深度解讀報告) */}
                {readingSubTab === 'report' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-4xl mx-auto space-y-6"
                  >
                    {/* Back to Result button */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setReadingSubTab('result')}
                        className="px-4 py-2 bg-[#E4D5C7]/70 text-[#4A3E3D] rounded-lg text-xs font-bold hover:bg-[#E4D5C7] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>返回九宮格結果</span>
                      </button>

                      <span className="text-xs text-[#A87C66] font-medium font-serif">
                        心靈拿鐵純文字導出報告
                      </span>
                    </div>

                    <div className="bg-white border border-[#E4D5C7] rounded-2xl shadow-sm overflow-hidden">
                      
                      {/* Header bar */}
                      <div className="bg-[#4A3E3D] text-[#F5EBE6] px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h2 className="text-xl font-bold tracking-wider font-serif flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#E4D5C7]" />
                            您的心靈拿鐵解讀報告
                          </h2>
                          <p className="text-xs text-[#E4D5C7]/70 mt-1">
                            融合九宮格空間與時間屬性生成的純文字深度解析
                          </p>
                        </div>

                        {/* Export action bar */}
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => setShowShareModal(true)}
                            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            <Share2 className="w-3.5 h-3.5 text-amber-100" />
                            <span>✨ 分享運勢圖卡</span>
                          </button>

                          <button
                            onClick={copyToClipboard}
                            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                          >
                            <Clipboard className="w-3.5 h-3.5" />
                            <span>{copyStatus === 'copied' ? '已複製！' : '複製純文字'}</span>
                          </button>
                          
                          <button
                            onClick={downloadTxtReport}
                            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>下載 TXT</span>
                          </button>
                        </div>
                      </div>

                      {/* Report Text View Container */}
                      <div className="p-6 md:p-8 bg-[#F5EBE6]/30 overflow-x-auto max-h-[600px] overflow-y-auto border-b border-[#E4D5C7]">
                        <pre className="font-mono text-xs md:text-sm text-[#4A3E3D] whitespace-pre-wrap leading-relaxed max-w-full">
                          {generateReadingReport(matrixCards, userQuestion, readingMode)}
                        </pre>
                      </div>

                      {/* Footer / Save to history input */}
                      <div className="p-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1 w-full">
                          <label className="block text-xs font-bold text-[#A87C66] mb-1.5">
                            ✍️ 留下一點心靈感悟與筆記 (選填)
                          </label>
                          <input
                            type="text"
                            value={readingNotes}
                            onChange={(e) => setReadingNotes(e.target.value)}
                            placeholder="例如：關於這次議題，這份報告給了我很明確的方向..."
                            disabled={isSaved}
                            className="w-full text-sm border border-[#E4D5C7] rounded-lg px-4 py-2.5 text-[#4A3E3D] focus:outline-none focus:ring-1 focus:ring-[#A87C66] focus:border-[#A87C66] bg-[#F5EBE6]/20 disabled:bg-[#F5EBE6]/10 disabled:text-gray-400"
                          />
                        </div>
                        
                        <div className="w-full md:w-auto flex justify-end">
                          <button
                            onClick={saveReadingToHistory}
                            disabled={isSaved}
                            className={`w-full md:w-auto px-6 py-3 rounded-xl text-sm font-semibold tracking-wider transition-all flex items-center justify-center space-x-2 ${
                              isSaved
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-[#A87C66] text-[#F5EBE6] hover:bg-[#966b56] shadow-sm active:scale-95'
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                                <span>已儲存至歷史報告</span>
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-4 h-4" />
                                <span>儲存此解讀紀錄</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* SUB-VIEW 3: WHISPER SCREEN (翔子的悄悄話) */}
                {readingSubTab === 'whisper' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-4xl mx-auto space-y-6"
                  >
                    {/* Back to Result button */}
                    <div className="flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap pb-1">
                      <button
                        onClick={() => setReadingSubTab('result')}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-[#E4D5C7]/70 text-[#4A3E3D] rounded-lg text-[11px] sm:text-xs font-bold hover:bg-[#E4D5C7] transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>返回九宮格結果</span>
                      </button>

                      <span className="text-[11px] sm:text-xs font-bold text-[#A87C66] bg-amber-100/80 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-full font-mono whitespace-nowrap shrink-0">
                        ☕️ 打烊前的最後加點
                      </span>
                    </div>

                    {/* Dedicated Whisper Header Visual */}
                    <div className="bg-gradient-to-r from-[#4A3E3D] via-[#5C4D4A] to-[#3D3130] text-[#F5EBE6] rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-[#A87C66]/50 flex flex-col sm:flex-row items-center gap-6 text-left relative overflow-hidden">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-amber-300/80 overflow-hidden shadow-lg flex-shrink-0 bg-[#2A2120]">
                        <img
                          src={shokoWhisperImg}
                          alt="翔子的悄悄話"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-2 flex-1">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-serif">
                          翔子的悄悄話
                        </h2>
                        <p className="text-xs sm:text-sm text-[#E4D5C7] font-serif leading-relaxed">
                          在這間略嫌壅擠的雙人座裡，翔子將細心為您對照九宮格的意識、現實與行為落差，陪伴您找回當下的安定感，踏出未來的具體第一步。
                        </p>
                      </div>
                    </div>

                    {/* Shoko Companion Chat */}
                    {(() => {
                      const structureBreakdown = getNineGridStructureBreakdown(matrixCards);
                      return (
                        <ShokoCompanionChat
                          matrixCards={matrixCards}
                          userQuestion={userQuestion}
                          readingMode={readingMode}
                          structureBreakdown={structureBreakdown}
                          onClose={() => setReadingSubTab('result')}
                        />
                      );
                    })()}
                  </motion.div>
                )}

              </div>
            )}

          </div>
        )}

        {/* TAB 2: HISTORY LOGS */}
        {(tab === 'history' || selectedHistoryItem) && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#E4D5C7] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#4A3E3D] font-serif flex items-center gap-2">
                  <History className="w-6 h-6 text-[#A87C66]" />
                  歷史解讀紀錄庫
                </h2>
                <p className="text-xs text-[#7A6A63] mt-1">
                  您在此瀏覽過往儲存的心靈拿鐵對話與時空九宮格檔案
                </p>
              </div>

              {selectedHistoryItem && (
                <button
                  onClick={() => setSelectedHistoryItem(null)}
                  className="px-4 py-2 bg-[#E4D5C7] text-[#4A3E3D] rounded-lg text-xs font-semibold hover:bg-[#d8c3b0] transition-colors"
                >
                  ← 返回紀錄列表
                </button>
              )}
            </div>

            {/* DETAIL VIEW OF SELECTED HISTORY ITEM */}
            {selectedHistoryItem ? (
              <div className="bg-white border border-[#E4D5C7] rounded-2xl overflow-hidden shadow-sm space-y-6 p-6 sm:p-8">
                <div className="border-b border-[#E4D5C7] pb-4 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-[#A87C66] block mb-1">
                      {selectedHistoryItem.timestamp}
                    </span>
                    <h3 className="text-lg font-bold text-[#4A3E3D]">
                      九宮格時空對話檔案
                    </h3>
                    {selectedHistoryItem.question && (
                      <div className="mt-2 text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-md font-serif italic">
                        <strong>諮詢議題：</strong>「{selectedHistoryItem.question}」
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => deleteHistoryItem(selectedHistoryItem.id, e)}
                    className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="刪除此紀錄"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Cards Summary */}
                <div>
                  <h4 className="text-xs font-bold text-[#A87C66] mb-3">當次 9 宮格牌面對應</h4>
                  <div className="grid grid-cols-3 gap-2 bg-[#F5EBE6]/50 p-3 rounded-xl border border-[#E4D5C7]">
                    {selectedHistoryItem.cards.map((c, i) => (
                      <div key={i} className="bg-white p-2 rounded border border-[#E4D5C7] text-center">
                        <div className="text-[10px] text-[#A87C66]">位置 {i + 1} ({GRID_POSITIONS[i].name})</div>
                        <div className="text-xs font-bold text-[#4A3E3D]">
                          {c.suit} {c.rank}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes if any */}
                {selectedHistoryItem.notes && (
                  <div className="bg-[#F5EBE6]/60 p-4 rounded-xl border border-[#E4D5C7]">
                    <span className="text-xs font-bold text-[#A87C66] block mb-1">✍️ 您的筆記與感悟：</span>
                    <p className="text-xs text-[#4A3E3D] italic">{selectedHistoryItem.notes}</p>
                  </div>
                )}

                {/* Report Text */}
                <div className="bg-[#F5EBE6]/30 p-6 rounded-xl border border-[#E4D5C7] max-h-[500px] overflow-y-auto">
                  <pre className="font-mono text-xs text-[#4A3E3D] whitespace-pre-wrap leading-relaxed">
                    {selectedHistoryItem.report}
                  </pre>
                </div>
              </div>
            ) : (
              /* HISTORY LIST */
              <div>
                {history.length === 0 ? (
                  <div className="bg-white border border-[#E4D5C7] rounded-2xl p-12 text-center text-[#7A6A63]">
                    <Coffee className="w-12 h-12 mx-auto mb-3 text-[#A87C66]/50 stroke-[1]" />
                    <p className="text-base font-bold text-[#4A3E3D] mb-1">尚無儲存的歷史對話</p>
                    <p className="text-xs">發牌並完成解讀後，點擊「儲存此解讀紀錄」即可在歸檔於此。</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedHistoryItem(item)}
                        className="bg-white border border-[#E4D5C7] hover:border-[#A87C66] p-5 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-[#A87C66]">
                              {item.timestamp}
                            </span>
                            <button
                              onClick={(e) => deleteHistoryItem(item.id, e)}
                              className="p-1 text-gray-300 hover:text-rose-600 transition-colors"
                              title="刪除"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {item.question ? (
                            <div className="text-xs font-bold text-[#4A3E3D] line-clamp-1 mb-2">
                              議題：{item.question}
                            </div>
                          ) : (
                            <div className="text-xs font-bold text-[#4A3E3D] mb-2">
                              心靈九宮格解讀對話
                            </div>
                          )}

                          <div className="text-[11px] text-[#7A6A63] line-clamp-2 italic mb-3">
                            {item.notes ? `筆記：${item.notes}` : '（未設置筆記）'}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#F5EBE6] flex justify-between items-center text-[10px] text-[#A87C66] font-sans font-semibold">
                          <span>包含 9 張卡牌對應解析</span>
                          <span className="flex items-center text-[#4A3E3D]">檢視報告 ➔</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>

      {/* SYSTEM INFO & GUIDELINES MODAL */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#F5EBE6] border border-[#E4D5C7] max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl my-auto"
          >
            <div className="bg-[#4A3E3D] text-[#F5EBE6] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2 font-serif">
                <Coffee className="w-5 h-5 text-[#E4D5C7]" />
                心靈拿鐵咖啡館 ── 系統規範
              </h3>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-[#E4D5C7] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs md:text-sm text-[#4A3E3D] leading-relaxed max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-[#A87C66] text-base mb-1">☕ 設計核心理念</h4>
                <p>
                  「心靈拿鐵咖啡館」並非盲目算命，而是一套融合心理投射、塔羅四大元素（寶劍、聖杯、星幣、權杖）與時空幾何學的心靈整理工具。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#A87C66] text-base mb-1">✍️ 手動指定/微調 9 宮格牌面</h4>
                <p>
                  除了隨機洗牌發牌外，本系統亦支援「手動指定牌面 (不用抽)」。您可以將實體抽出的牌陣或特定的牌組組合，對應輸入至 1 到 9 號位置，系統會即時進行連線解析與純文字深度報告導出。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#A87C66] text-base mb-1">🎲 嚴格的 Fisher-Yates 洗牌演算法</h4>
                <p>
                  隨機洗牌時採用費雪-葉茲洗牌演算法 (Fisher-Yates Shuffle)，確保 52 張撲克牌隨機排列，且單次發牌絕不出現重複卡牌。
                </p>
              </div>

              <div className="bg-[#E4D5C7]/40 p-4 rounded-xl border border-[#D2BCA6]">
                <h5 className="font-bold text-[#4A3E3D] mb-1">四大花色與塔羅元素對應：</h5>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>黑桃 (♠)</strong> &rarr; 寶劍 (Swords)：思想、心智、決策、考驗。</li>
                  <li><strong>紅心 (♥)</strong> &rarr; 聖杯 (Cups)：情感、和諧、直覺、療癒。</li>
                  <li><strong>方塊 (♦)</strong> &rarr; 星幣 (Coins)：物質、技能、穩固、落地。</li>
                  <li><strong>梅花 (♣)</strong> &rarr; 權杖 (Wands)：火熱行動、意志力、開拓。</li>
                </ul>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-[#A87C66]/40 space-y-3">
                <h5 className="font-bold text-[#4A3E3D] text-sm flex items-center gap-1.5">
                  <span>📊 12 階單圖示常態分佈評估表（以【位置 5 核心現實】牌面為錨定對照）</span>
                </h5>
                
                {/* 綠色區 */}
                <div className="space-y-1.5 text-xs border-l-2 border-emerald-500 pl-2.5">
                  <div className="font-bold text-emerald-800">🟢 高勝算區：大吉／極佳（勝算 66% ~ 98%）</div>
                  <div>🚀 <strong>1階</strong>：極佳 / 大吉豐收｜慶典綠（勝算 90% ~ 98%） <span className="text-[#A87C66]">（♦️ 方塊 ＋ 10,J,Q,K,A）</span></div>
                  <div>🎊 <strong>2階</strong>：圓滿 / 上吉和諧｜璀璨綠（勝算 82% ~ 90%） <span className="text-[#A87C66]">（♥️ 紅心 ＋ 10,J,Q,K,A）</span></div>
                  <div>📈 <strong>3階</strong>：穩健 / 中吉獲益｜綠燈行（勝算 74% ~ 82%） <span className="text-[#A87C66]">（♦️ 方塊 ＋ 6,7,8,9）</span></div>
                  <div>🌱 <strong>4階</strong>：平順 / 順吉溫情｜平順綠（勝算 66% ~ 74%） <span className="text-[#A87C66]">（♥️ 紅心 ＋ 6,7,8,9）</span></div>
                </div>

                {/* 黃色區 */}
                <div className="space-y-1.5 text-xs border-l-2 border-amber-500 pl-2.5">
                  <div className="font-bold text-amber-800">🟡 中立轉折區：五五波／平吉（勝算 34% ~ 66%）</div>
                  <div>🎰 <strong>5階</strong>：突破 / 積極可成｜突破黃（勝算 58% ~ 66%） <span className="text-[#A87C66]">（♣️ 梅花 ＋ 10,J,Q,K,A）</span></div>
                  <div>🎈 <strong>6階</strong>：微吉 / 小幅進益｜黃燈減速（勝算 50% ~ 58%） <span className="text-[#A87C66]">（♦️ 方塊 ＋ 2,3,4,5）</span></div>
                  <div>🎲 <strong>7階</strong>：平穩 / 隨緣順意｜琥珀黃（勝算 42% ~ 50%） <span className="text-[#A87C66]">（♥️ 紅心 ＋ 2,3,4,5）</span></div>
                  <div>💦 <strong>8階</strong>：微艱 / 辛苦耕耘｜橙燈提醒（勝算 34% ~ 42%） <span className="text-[#A87C66]">（♣️ 梅花 ＋ 6,7,8,9）</span></div>
                </div>

                {/* 紅色區 */}
                <div className="space-y-1.5 text-xs border-l-2 border-red-500 pl-2.5">
                  <div className="font-bold text-red-800">🔴 低勝算區：審慎／撤退（勝算 2% ~ 34%）</div>
                  <div>🚦 <strong>9階</strong>：阻滯 / 低效磨練｜阻滯橙（勝算 26% ~ 34%） <span className="text-[#A87C66]">（♣️ 梅花 ＋ 2,3,4,5）</span></div>
                  <div>🚨 <strong>10階</strong>：變局 / 破後立新｜警報紅（勝算 18% ~ 26%） <span className="text-[#A87C66]">（♠️ 黑桃 ＋ 10,J,Q,K,A）</span></div>
                  <div>🚧 <strong>11階</strong>：險局 / 高壓審慎｜紅燈停（勝算 10% ~ 18%） <span className="text-[#A87C66]">（♠️ 黑桃 ＋ 6,7,8,9）</span></div>
                  <div>💣 <strong>12階</strong>：嚴峻 / 建議全撤｜炸彈引爆（勝算 2% ~ 10%） <span className="text-[#A87C66]">（♠️ 黑桃 ＋ 2,3,4,5）</span></div>
                </div>
              </div>
            </div>

            <div className="bg-[#E4D5C7]/40 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2 bg-[#4A3E3D] text-[#F5EBE6] rounded-xl text-xs font-semibold hover:bg-[#3d3332] transition-colors"
              >
                我理解了
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* OPTIMIZED MANUAL CARD SELECTION MODAL WITH SHOKO COMMENTARY */}
      {showManualModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#F5EBE6] border-2 border-[#A87C66]/50 max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl my-auto text-left flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#4A3E3D] via-[#3d3332] to-[#4A3E3D] text-[#F5EBE6] px-6 py-4 flex justify-between items-center border-b border-[#A87C66]/40 flex-shrink-0">
              <div>
                <h3 className="font-bold text-base sm:text-xl flex items-center gap-2 font-serif">
                  <Edit3 className="w-5 h-5 text-amber-300" />
                  手動指定 / 微調九宮格時空牌陣
                </h3>
                <p className="text-xs text-[#E4D5C7]/90 font-sans mt-0.5">
                  自訂 1~9 時空位置的花色點數，即時獲得結構化九宮格解答報告
                </p>
              </div>
              <button 
                onClick={() => setShowManualModal(false)}
                className="p-1.5 text-[#E4D5C7] hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                title="關閉"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* DYNAMIC SHOKO COMMENTARY BANNER IN MODAL */}
            <div className="bg-gradient-to-r from-amber-950 via-[#4A3E3D] to-amber-900 text-white p-4 sm:p-5 border-b border-amber-500/30 flex items-start gap-4 flex-shrink-0 relative overflow-hidden">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-300/80 overflow-hidden shadow-md flex-shrink-0 bg-amber-950">
                <img
                  src={shokoSmilingImg}
                  alt="翔子"
                  className="w-full h-full object-cover object-[center_15%] scale-135 origin-top"
                />
              </div>

              <div className="space-y-1.5 text-xs sm:text-sm flex-1">
                <div className="font-extrabold text-amber-200 font-serif flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-300" />
                  <span>
                    {activeManualHoverSlot !== null
                      ? `翔子解說 • 位置 ${activeManualHoverSlot + 1}【${GRID_POSITIONS[activeManualHoverSlot]?.name}】`
                      : '翔子的牌面設定與調劑解說：'}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {activeManualHoverSlot !== null ? (
                    <motion.p
                      key={`slot-${activeManualHoverSlot}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-amber-100 font-serif leading-relaxed text-xs sm:text-sm bg-black/20 p-2.5 rounded-xl border border-amber-400/20"
                    >
                      {activeManualHoverSlot === 0 && "「位置 1【過去意識】：代表您過去在心智層面累積的思考習慣與信念起點。花色點數為問題的意識定錨。」"}
                      {activeManualHoverSlot === 1 && "「位置 2【現在意識】：【中軸重點】您此刻的核心思考與理智焦點！與位置 8（現在行動）對照可計算『知行落差』喔！」"}
                      {activeManualHoverSlot === 2 && "「位置 3【未來意識】：指向您潛意識對未來的期待、理想藍圖與願景遠景。」"}
                      {activeManualHoverSlot === 3 && "「位置 4【隱蔽現實】：過往外部給予的條件限制、舊有資源或既有框架條件。」"}
                      {activeManualHoverSlot === 4 && "「位置 5【核心現實】：【算牌結果】看位置 5 得知當前算牌結果，這是由位置 8『現在行動』所導致的現狀！」"}
                      {activeManualHoverSlot === 5 && "「位置 6【未來現實】：【未來結果】最後導致的未來局勢結果，需要採取位置 9『未來行動』來達成。」"}
                      {activeManualHoverSlot === 6 && "「位置 7【過去作為】：您過去習慣採取的行動路徑與舊有執行方式。」"}
                      {activeManualHoverSlot === 7 && "「位置 8【現在行動】：【核心因果】您當前採取的具體行動！正是導致位置 5 當前算牌結果的根本原因。」"}
                      {activeManualHoverSlot === 8 && "「位置 9【未來作為】：【未來行動】要達成位置 6 的未來結果，您所需要採取的未來關鍵行動。」"}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="default-shoko-msg"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-amber-100/90 font-serif leading-relaxed text-[11px] sm:text-xs"
                    >
                      「歡迎來到牌面設定吧台！如果您手邊有了實體牌陣、或想測試特定時空幾何（如全吉高勝算或高落差），可以在這裡自由指定 9 個位置的牌卡。將游標移到位置上，我會為您說明該位置的核心意義喔！」
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Action Toolbar & Presets */}
            <div className="bg-[#E4D5C7]/60 px-6 py-3 border-b border-[#D2BCA6] flex flex-wrap gap-2 justify-between items-center text-xs flex-shrink-0">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[11px] font-bold text-[#4A3E3D] font-serif hidden sm:inline">一鍵預設：</span>
                <button
                  type="button"
                  onClick={loadPresetCards}
                  className="px-3 py-1.5 bg-[#4A3E3D] text-[#F5EBE6] rounded-xl font-bold hover:bg-[#3d3332] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>經典平衡特調</span>
                </button>

                <button
                  type="button"
                  onClick={loadHighProbabilityPreset}
                  className="px-3 py-1.5 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900 transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-200" />
                  <span>全吉高勝算局</span>
                </button>

                <button
                  type="button"
                  onClick={autoFillEmptyManualSlots}
                  className="px-3 py-1.5 bg-[#A87C66] text-white rounded-xl font-bold hover:bg-[#966b56] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>隨機補滿未選</span>
                </button>

                <button
                  type="button"
                  onClick={clearManualCards}
                  className="px-3 py-1.5 bg-white text-[#7A6A63] border border-[#D2BCA6] rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>清空</span>
                </button>
              </div>

              <div className="text-xs text-[#8C5C42] font-mono font-bold bg-white/80 px-2.5 py-1 rounded-lg border border-[#D2BCA6]">
                已指定 {manualCards.filter(Boolean).length} / 9 位置
              </div>
            </div>

            {/* Duplicate Warning */}
            {getDuplicates().length > 0 && (
              <div className="bg-amber-100/90 border-b border-amber-300 px-6 py-2.5 flex items-center justify-between text-xs text-amber-950 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>
                    <strong>牌面提示：</strong> 檢測到重複卡牌 (
                    {getDuplicates().map(d => d.cardName).join(', ')}
                    )，建議修正為不重複撲克牌組。
                  </span>
                </div>
                <button
                  type="button"
                  onClick={autoFixDuplicates}
                  className="px-3 py-1 bg-amber-700 text-white rounded-lg font-bold hover:bg-amber-800 transition-colors flex items-center gap-1 flex-shrink-0 ml-2 shadow-2xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> 翔子一鍵智能修復
                </button>
              </div>
            )}

            {/* Modal Body: Tactile 3x3 Card Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {GRID_POSITIONS.map((pos, index) => {
                  const currentCard = manualCards[index];
                  const suitInfo = currentCard ? SUIT_TAROT_MAP[currentCard.suit] : null;

                  return (
                    <div
                      key={pos.id}
                      onClick={() => setActiveManualHoverSlot(index)}
                      onMouseEnter={() => setActiveManualHoverSlot(index)}
                      onMouseLeave={() => setActiveManualHoverSlot(null)}
                      className={`bg-white border-2 rounded-2xl p-3.5 shadow-xs transition-all flex flex-col justify-between relative group cursor-pointer ${
                        activeManualHoverSlot === index
                          ? 'border-[#A87C66] ring-2 ring-[#A87C66]/30 bg-amber-50/30'
                          : 'border-[#D2BCA6] hover:border-[#A87C66]'
                      }`}
                    >
                      {/* Slot Position Title */}
                      <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#F5EBE6]">
                        <span className="font-extrabold text-xs text-[#4A3E3D] font-serif flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#E4D5C7] text-[#4A3E3D] flex items-center justify-center text-[10px] font-mono font-black">
                            {pos.id}
                          </span>
                          <span>{pos.name}</span>
                        </span>
                        {currentCard ? (
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            currentCard.suit === '紅心' ? 'bg-rose-100 text-rose-700' :
                            currentCard.suit === '方塊' ? 'bg-amber-100 text-amber-800' :
                            currentCard.suit === '梅花' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-slate-200 text-slate-800'
                          } border border-current/20`}>
                            {suitInfo?.icon} {currentCard.suit} {currentCard.rank}
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-400 italic font-sans bg-gray-100 px-2 py-0.5 rounded">未選擇</span>
                        )}
                      </div>

                      {/* Playing Card Visual Preview Canvas */}
                      <div className="my-2 p-2 bg-gradient-to-b from-[#FAF4F0] to-[#E4D5C7]/30 rounded-xl border border-[#D2BCA6]/50 flex items-center justify-center min-h-[90px] relative">
                        {currentCard && suitInfo ? (
                          <div className="w-full bg-white rounded-lg border border-[#D2BCA6] p-2 shadow-2xs flex items-center justify-between">
                            <div className="text-left">
                              <div className={`text-lg font-black font-sans leading-none ${suitInfo.color}`}>
                                {currentCard.rank}
                              </div>
                              <div className={`text-base font-sans leading-none ${suitInfo.color}`}>
                                {suitInfo.icon}
                              </div>
                            </div>

                            <div className="text-center px-2">
                              <div className="text-2xl font-sans">{suitInfo.icon}</div>
                              <div className="text-[10px] font-bold text-[#4A3E3D] mt-0.5">
                                {currentCard.suit} {currentCard.rank}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className={`text-base font-sans leading-none ${suitInfo.color}`}>
                                {suitInfo.icon}
                              </div>
                              <div className={`text-lg font-black font-sans leading-none ${suitInfo.color}`}>
                                {currentCard.rank}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-2 text-gray-400">
                            <Coffee className="w-6 h-6 mx-auto mb-1 stroke-1 text-amber-700/40" />
                            <span className="text-[10px] font-bold">點擊選擇花色與點數</span>
                          </div>
                        )}
                      </div>

                      {/* Quick Interactive Suit Pills (Optimized for Touch) */}
                      <div className="space-y-1.5 my-1">
                        <div className="text-[10px] font-extrabold text-[#A87C66] font-serif flex justify-between items-center">
                          <span>選擇花色 (四元素)：</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(['黑桃', '紅心', '方塊', '梅花'] as Card['suit'][]).map((s) => {
                            const isSelected = currentCard?.suit === s;
                            const sInfo = SUIT_TAROT_MAP[s];
                            return (
                              <button
                                key={s}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateManualSlotCard(index, s, currentCard?.rank || 'A');
                                }}
                                className={`py-2 sm:py-1 px-1 rounded-xl text-xs sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border active:scale-95 ${
                                  isSelected
                                    ? s === '紅心' ? 'bg-rose-100 text-rose-700 border-rose-400 shadow-2xs ring-1 ring-rose-400/40' :
                                      s === '方塊' ? 'bg-amber-100 text-amber-800 border-amber-400 shadow-2xs ring-1 ring-amber-400/40' :
                                      s === '梅花' ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-2xs ring-1 ring-emerald-400/40' :
                                      'bg-slate-200 text-slate-800 border-slate-400 shadow-2xs ring-1 ring-slate-400/40'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-amber-50'
                                }`}
                              >
                                <span className="text-sm sm:text-xs">{sInfo.icon}</span>
                                <span className="text-[10px] font-bold">{s[0]}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Rank Dropdown Selector (Optimized for Mobile Tapping) */}
                      <div className="mt-2">
                        <label className="block text-[10px] font-extrabold text-[#A87C66] mb-1 font-serif">選擇卡牌點數 (A~K)：</label>
                        <select
                          value={currentCard?.rank || 'A'}
                          onChange={(e) => updateManualSlotCard(index, currentCard?.suit || '黑桃', e.target.value as Card['rank'])}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full bg-[#FAF4F0] border-2 border-[#D2BCA6] rounded-xl px-3 py-2 text-xs sm:text-sm font-extrabold text-[#4A3E3D] focus:outline-none focus:ring-2 focus:ring-[#A87C66] cursor-pointer"
                        >
                          {ALL_RANKS.map(r => (
                            <option key={r} value={r}>
                              點數 {r} ({RANK_TAROT_MAP[r]})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tarot Mapped Hint */}
                      {currentCard && (
                        <div className="mt-2 pt-1.5 border-t border-[#F5EBE6] text-[10px] text-[#7A6A63] flex justify-between items-center font-sans font-semibold">
                          <span className="truncate">對應塔羅：{suitInfo?.name} • {RANK_TAROT_MAP[currentCard.rank]}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#E4D5C7]/60 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#D2BCA6] flex-shrink-0">
              <div className="text-xs text-[#7A6A63] font-serif">
                已指定 {manualCards.filter(Boolean).length} / 9 時空位置。確認後將即時計算時空重力與知行落差報告。
              </div>

              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-white text-[#4A3E3D] border border-[#D2BCA6] rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={applyManualCards}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-[#4A3E3D] to-[#3d3332] text-[#F5EBE6] rounded-xl text-xs font-bold hover:brightness-110 active:scale-98 transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>✨ 確認並生成解讀報告</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}

      {/* LUCK TRANSFORMATION / FORTUNE TUNING MODAL */}
      <AnimatePresence>
        {showLuckModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#FAF5EE] border-2 border-[#A87C66] rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl relative overflow-hidden text-left my-auto max-h-[92vh] flex flex-col justify-between"
            >
              {/* Header close button */}
              <button
                type="button"
                onClick={() => setShowLuckModal(false)}
                className="absolute top-4 right-4 z-20 text-[#A87C66] hover:text-[#4A3E3D] p-2 rounded-full hover:bg-[#E4D5C7]/50 transition-colors cursor-pointer"
                title="關閉"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Modal Header (Hidden when in 'served' state to satisfy: 「翔子端餐」上方的文案全部刪除) */}
              {luckModalStep !== 'served' && (
                <div className="flex items-center gap-3.5 mb-5 border-b border-[#E4D5C7] pb-4 pr-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A87C66] to-[#4A3E3D] text-white flex items-center justify-center shadow-md flex-shrink-0">
                    <Coffee className="w-6 h-6 text-amber-200" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-[#4A3E3D] font-serif flex flex-wrap items-center gap-2">
                      <span>☕ 拿鐵套餐 • 時空改運儀式</span>
                      <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-sans font-bold shadow-2xs">
                        能量加持
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A6A63] font-sans mt-0.5 leading-snug">
                      依據時空九宮格磁場，選擇對應拿鐵美食套餐，注入正向轉運能量。
                    </p>
                  </div>
                </div>
              )}

              {/* MODAL BODY */}
              <div className="overflow-y-auto flex-1 pr-1">
                {isProcessingLuck ? (
                  <div className="py-14 text-center space-y-5">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-[#A87C66] border-t-amber-300 rounded-full mx-auto flex items-center justify-center text-[#A87C66] shadow-inner"
                    >
                      <Coffee className="w-8 h-8 text-[#A87C66]" />
                    </motion.div>
                    <div className="space-y-1.5">
                      <h4 className="font-extrabold text-base sm:text-lg text-[#4A3E3D] font-serif">
                        正在由翔子為您沖煮與準備餐點中...
                      </h4>
                      <p className="text-xs sm:text-sm text-[#A87C66] font-sans">
                        提煉轉運氣場，準備大吉紙籤與餐點，請稍候片刻 ☕️
                      </p>
                    </div>
                  </div>
                ) : luckModalStep === 'served' && unlockedLuckBlessing ? (
                  /* SHOKO SERVING MEAL PAGE (翔子端餐頁面) */
                  <div className="py-2 space-y-6 text-center">
                    
                    {/* Shoko Serving Avatar in Daytime Cafe Setting */}
                    <div className="relative flex flex-col items-center">
                      {/* Daytime Cafe Background Glow */}
                      <div className="absolute w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

                      {/* Photo Frame with Shoko Holding Meal Tray with both hands in Daytime Cafe */}
                      <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-3xl p-2 bg-gradient-to-b from-[#FFFDF9] via-[#F5EBE6] to-[#C2AF9E] shadow-2xl border-4 border-[#8C5C42] overflow-hidden group">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-amber-100 to-amber-200/50">
                          <img
                            src={shokoSmilingImg}
                            alt="翔子將餐盤抱在胸前，瞇著眼睛開心地笑著"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                          <div className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 bg-black/75 backdrop-blur-md text-amber-100 border border-amber-300/60 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold font-serif flex items-center gap-1.5 shadow-md whitespace-nowrap">
                            <Coffee className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                            <span>咖啡師 • 翔子 (親自端餐✨)</span>
                          </div>
                        </div>
                      </div>

                      {/* Updated Shoko Copy Below Image as requested */}
                      <div className="mt-4 bg-gradient-to-r from-amber-50 via-white to-amber-50 text-[#4A3E3D] px-5 py-4 rounded-2xl border-2 border-amber-300/90 shadow-md text-sm sm:text-base font-serif max-w-lg mx-auto relative text-center space-y-1.5">
                        <div className="font-extrabold text-amber-950 text-base sm:text-lg leading-snug">
                          翔子：「久等囉！為您端上『{unlockedLuckBlessing.name}』」
                        </div>
                        <div className="text-[#5C4D4B] font-medium text-xs sm:text-sm">
                          還有附上了轉運御神紙籤喔 💓，請慢用～
                        </div>
                      </div>
                    </div>

                    {/* Omikuji Fortune Slip (時空轉運大吉紙籤) */}
                    <div className="bg-gradient-to-br from-amber-50/95 to-amber-100/70 border-2 border-red-700/60 rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden text-left max-w-lg mx-auto space-y-3.5">
                      {/* Header with Large Red "大吉" Stamp */}
                      <div className="flex justify-between items-start border-b border-red-200/80 pb-3 gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-red-700 text-white font-extrabold px-2.5 py-0.5 rounded-md shadow-2xs">
                              御神籤
                            </span>
                            <span className="text-xs text-amber-900 font-bold font-serif">
                              翔子特別祝禱 ‧ 時空轉運
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-extrabold text-[#4A3E3D] font-serif mt-1">
                            {unlockedLuckBlessing.name}
                          </h4>
                        </div>

                        {/* Red Stamp */}
                        <div className="border-4 border-red-700 text-red-700 rounded-xl px-3 py-1 text-center font-serif font-black tracking-widest shadow-xs bg-red-50/90 transform rotate-[-3deg] flex-shrink-0">
                          <span className="text-xl sm:text-2xl block leading-none">大吉</span>
                          <span className="text-[9px] block font-bold mt-0.5">時空轉運</span>
                        </div>
                      </div>

                      {/* Slip Details */}
                      <div className="space-y-2.5 text-xs sm:text-sm text-[#4A3E3D] font-serif leading-relaxed">
                        <div className="bg-white/90 p-3 rounded-xl border border-amber-200/80">
                          <strong className="text-amber-900 block mb-0.5 font-sans">🍱 美食饗宴特質：</strong>
                          {unlockedLuckBlessing.description}
                        </div>

                        <div className="bg-white/90 p-3 rounded-xl border border-amber-200/80">
                          <strong className="text-amber-900 block mb-0.5 font-sans">📜 轉運祝禱詞：</strong>
                          {unlockedLuckBlessing.blessingMantra}
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-emerald-700 font-bold font-mono text-sm">
                            ⚡ 能量指數升級 +{unlockedLuckBlessing.energyBoost}%
                          </span>
                          <span className="text-amber-800 text-xs font-medium">
                            加持時間：{unlockedLuckBlessing.unlockedAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Confirm Action Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowLuckModal(false)}
                        className="w-full max-w-lg py-4 bg-gradient-to-r from-amber-700 via-amber-800 to-[#4A3E3D] text-white rounded-2xl text-sm sm:text-base font-extrabold hover:brightness-110 active:scale-98 transition-all shadow-lg mx-auto flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>收下翔子端的餐點與「大吉」紙籤 ❤️</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* PACKAGE OPTIONS SELECTION VIEW (全面優化UI: 可複選與取消) */
                  <div className="space-y-5">
                    <div className="text-xs font-bold text-[#A87C66] bg-amber-100/60 px-3 py-1.5 rounded-lg border border-amber-200/80 inline-block">
                      💡 提示：可同時點擊複選多個套餐儀式，再次點擊可取消選擇。
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      
                      {/* Option 1: $100 NTD */}
                      <div
                        onClick={() => toggleLuckPriceOption(100)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          selectedLuckPrices.includes(100)
                            ? 'bg-gradient-to-r from-amber-50 via-white to-amber-50/60 border-[#A87C66] shadow-md ring-2 ring-[#A87C66]/40'
                            : 'bg-white border-[#E4D5C7] hover:border-[#A87C66]/60 hover:bg-[#FAF5EE]/50'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5 ${
                            selectedLuckPrices.includes(100) ? 'bg-[#A87C66] text-white' : 'bg-[#E4D5C7]/60 text-[#4A3E3D]'
                          }`}>
                            ☕
                          </div>

                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-base sm:text-lg font-extrabold text-[#4A3E3D] font-serif leading-snug">
                                ☕ 經典晨曦拿鐵特調
                              </h4>
                              <span className="text-[10px] bg-[#E4D5C7] text-[#4A3E3D] font-bold px-2 py-0.5 rounded-md shrink-0">
                                基礎靜心淨化
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-[#7A6A63] font-serif leading-relaxed">
                              以低溫烘焙濃縮與濃純鮮乳為基礎，撫平平時思緒雜訊，奠定安定踏實的能量基底。
                            </p>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-[#A87C66]">
                              <span className="bg-amber-100/70 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-300/60">
                                ⚡ 能量指數 +15%
                              </span>
                              <span className="bg-amber-100/70 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-300/60">
                                📜 經典【大吉】紙籤
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price Tag & Check mark */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E4D5C7]/60 shrink-0">
                          <div className="text-right">
                            <span className="text-xl sm:text-2xl font-black text-[#A87C66] font-mono">
                              $100
                            </span>
                            <span className="text-xs font-bold text-[#7A6A63] font-mono ml-1">NTD</span>
                          </div>

                          {selectedLuckPrices.includes(100) ? (
                            <span className="text-xs bg-[#A87C66] text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs mt-1">
                              <Check className="w-3.5 h-3.5" /> 已選擇
                            </span>
                          ) : (
                            <span className="text-xs text-[#A87C66] font-bold mt-1">
                              點擊勾選 +
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Option 2: $200 NTD (Hot) */}
                      <div
                        onClick={() => toggleLuckPriceOption(200)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          selectedLuckPrices.includes(200)
                            ? 'bg-gradient-to-r from-amber-100/90 via-orange-50 to-amber-50 border-amber-600 shadow-md ring-2 ring-amber-400'
                            : 'bg-white border-[#E4D5C7] hover:border-amber-400 hover:bg-amber-50/30'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5 ${
                            selectedLuckPrices.includes(200) ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' : 'bg-amber-100 text-amber-900'
                          }`}>
                            🍯
                          </div>

                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-base sm:text-lg font-extrabold text-[#4A3E3D] font-serif leading-snug">
                                🍯 絲絨太妃拿鐵 ‧ 手作提拉米蘇甜點套餐
                              </h4>
                              <span className="text-[10px] bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold px-2.5 py-0.5 rounded-full shadow-2xs shrink-0">
                                🔥 熱門首選
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-[#7A6A63] font-serif leading-relaxed">
                              在 $100 經典拿鐵的定心基底上，揉合焦香太妃糖特調與綿密義式提拉米蘇，甜美層次喚醒貴人緣分與好感好運，補充突破現實的充沛自信。
                            </p>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-amber-950">
                              <span className="bg-amber-200/80 text-amber-950 px-2.5 py-0.5 rounded-lg border border-amber-300">
                                ⚡ 能量指數 +25% 顯著躍升
                              </span>
                              <span className="bg-amber-200/80 text-amber-950 px-2.5 py-0.5 rounded-lg border border-amber-300">
                                📜 貴人相助【大吉】紙籤
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price Tag & Check mark */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-200/60 shrink-0">
                          <div className="text-right">
                            <span className="text-xl sm:text-2xl font-black text-amber-800 font-mono">
                              $200
                            </span>
                            <span className="text-xs font-bold text-amber-900 font-mono ml-1">NTD</span>
                          </div>

                          {selectedLuckPrices.includes(200) ? (
                            <span className="text-xs bg-amber-600 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs mt-1">
                              <Check className="w-3.5 h-3.5" /> 已選擇
                            </span>
                          ) : (
                            <span className="text-xs text-amber-800 font-bold mt-1">
                              點擊勾選 +
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Option 3: $500 NTD (Ultimate) */}
                      <div
                        onClick={() => toggleLuckPriceOption(500)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          selectedLuckPrices.includes(500)
                            ? 'bg-gradient-to-r from-amber-100 via-orange-100/70 to-amber-50 border-amber-700 shadow-lg ring-2 ring-amber-500'
                            : 'bg-white border-[#E4D5C7] hover:border-amber-500 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5 ${
                            selectedLuckPrices.includes(500) ? 'bg-gradient-to-r from-amber-800 to-red-800 text-white' : 'bg-amber-200 text-amber-950'
                          }`}>
                            🍷
                          </div>

                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-base sm:text-lg font-extrabold text-[#4A3E3D] font-serif leading-snug">
                                🍷 極致冷萃 ‧ 法式紅酒漢堡排奢華饗宴
                              </h4>
                              <span className="text-[10px] bg-gradient-to-r from-amber-700 to-red-800 text-white font-bold px-2.5 py-0.5 rounded-full shadow-2xs shrink-0">
                                ✨ 頂級大逆轉
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-[#7A6A63] font-serif leading-relaxed">
                              超越前兩款飲品與甜點的基礎，以長時間低萃慢釀的定心冷萃，搭配主廚特製醇厚紅酒燉漢堡排；扎實優質餐點帶來深層扎根力量，實現時空幾何的極致逆轉！
                            </p>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-amber-950">
                              <span className="bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-lg border border-amber-400">
                                ⚡ 能量指數 +38% 爆發躍升
                              </span>
                              <span className="bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-lg border border-amber-400">
                                📜 時空極致【大吉】紙籤
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price Tag & Check mark */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-300/60 shrink-0">
                          <div className="text-right">
                            <span className="text-xl sm:text-2xl font-black text-amber-900 font-mono">
                              $500
                            </span>
                            <span className="text-xs font-bold text-amber-950 font-mono ml-1">NTD</span>
                          </div>

                          {selectedLuckPrices.includes(500) ? (
                            <span className="text-xs bg-amber-800 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs mt-1">
                              <Check className="w-3.5 h-3.5" /> 已選擇
                            </span>
                          ) : (
                            <span className="text-xs text-amber-900 font-bold mt-1">
                              點擊勾選 +
                            </span>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Action Button */}
                    <div className="pt-3">
                      <button
                        type="button"
                        disabled={selectedLuckPrices.length === 0}
                        onClick={handleExecuteLuckPayment}
                        className={`w-full py-4 rounded-2xl text-sm sm:text-base font-extrabold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                          selectedLuckPrices.length > 0
                            ? 'bg-gradient-to-r from-[#A87C66] via-amber-800 to-[#4A3E3D] text-white hover:brightness-110 active:scale-98'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        <span>
                          {selectedLuckPrices.length > 0
                            ? `確認選擇 (${selectedLuckPrices.length} 項)，進行 $${selectedLuckPrices.reduce((a, b) => a + b, 0)} NTD 改運加持儀式`
                            : '請點擊上方至少選擇一項餐點套餐'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DEAL CHOICE MODAL (Triggered when Call Bell / 點餐鈴 rings) */}
      <AnimatePresence>
        {showDealChoiceModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#FAF4F0] border-2 border-[#A87C66] rounded-3xl max-w-md w-full p-6 text-center space-y-5 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setShowDealChoiceModal(false)}
                className="absolute top-4 right-4 text-[#7A6A63] hover:text-[#4A3E3D] p-1.5 rounded-full hover:bg-[#E4D5C7]/50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A87C66] to-[#8C5C42] text-amber-100 flex items-center justify-center mx-auto shadow-md">
                <Bell className="w-8 h-8 animate-bounce" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#4A3E3D] font-serif mb-1.5">
                  🔔 訂單已經送出！
                </h3>
                <p className="text-xs text-[#7A6A63] font-serif leading-relaxed">
                  翔子已經聽到您的心聲，請選擇拿鐵調製的方式：
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowDealChoiceModal(false);
                    triggerZenDeal();
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#A87C66] to-[#8C5C42] text-[#F5EBE6] rounded-2xl text-sm font-extrabold tracking-wider hover:brightness-105 active:scale-98 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>靜心隨緣開牌</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowDealChoiceModal(false);
                    openManualModal();
                  }}
                  className="w-full py-4 bg-[#4A3E3D] text-[#F5EBE6] rounded-2xl text-sm font-extrabold tracking-wider hover:bg-[#3d3332] active:scale-98 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Edit3 className="w-5 h-5 text-[#E4D5C7]" />
                  <span>手動輸入牌陣</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION BUTTON: SHARE FORTUNE (畫面右側浮動按鈕) */}
      <AnimatePresence>
        {isGridActive && matrixCards.length === 9 && !showShareModal && (
          <motion.button
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            type="button"
            onClick={() => setShowShareModal(true)}
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 px-3.5 py-3 sm:px-4 sm:py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-2xl border-2 border-amber-200/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer group backdrop-blur-xs"
            title="點擊分享我的時空運勢圖卡"
          >
            <Share2 className="w-4 h-4 text-amber-100 group-hover:rotate-12 transition-transform" />
            <span className="font-serif tracking-wide shadow-2xs">✨ 分享我的運勢</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* FORTUNE SHARE PREVIEW & COPY MODAL */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              className="bg-[#FAF4F0] border-2 border-[#A87C66] rounded-3xl max-w-xl w-full p-4 sm:p-7 space-y-4 shadow-2xl relative text-left my-auto max-h-[92vh] flex flex-col justify-between overflow-hidden"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-[#E4D5C7] pb-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-xs">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#4A3E3D] font-serif">
                      翔子的時空運勢分享簽
                    </h3>
                    <p className="text-[11px] text-[#A87C66] font-serif">
                      預覽運勢卡片並一鍵複製摘要內容
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="p-1.5 text-[#7A6A63] hover:text-[#4A3E3D] hover:bg-[#E4D5C7]/50 rounded-xl transition-colors cursor-pointer"
                  title="關閉"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CARD PREVIEW CONTAINER */}
              <div className="overflow-y-auto flex-1 pr-1 space-y-3">
                {(() => {
                  const quickAnswer = getQuickAnswerData(matrixCards, userQuestion, readingMode);
                  const blessingName = unlockedLuckBlessing ? unlockedLuckBlessing.name : '晨曦拿鐵大吉簽';
                  const blessingDesc = unlockedLuckBlessing ? unlockedLuckBlessing.description : '願這份特調為您帶來滿滿運勢與智慧！';

                  return (
                    <div id="share-fortune-card" className="bg-gradient-to-br from-[#FFFDF9] via-[#FDF8F3] to-[#F5EBE6] border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden space-y-4">
                      {/* Decorative Background Stamp */}
                      <div className="absolute -right-6 -bottom-6 text-amber-900/5 font-serif text-8xl font-black select-none pointer-events-none">
                        吉
                      </div>

                      {/* Card Brand Bar */}
                      <div className="flex items-center justify-between border-b border-amber-200/80 pb-2.5 text-xs">
                        <span className="font-extrabold text-[#4A3E3D] font-serif flex items-center gap-1.5">
                          <Coffee className="w-4 h-4 text-amber-700" />
                          <span>心靈拿鐵 Cafe ‧ 時空九宮格</span>
                        </span>
                        <span className="text-[11px] font-mono text-[#A87C66] font-semibold bg-amber-100/60 px-2 py-0.5 rounded-full">
                          {new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </span>
                      </div>

                      {/* Main Illustration & Omikuji Block */}
                      <div className="flex flex-col sm:flex-row gap-3.5 items-center sm:items-start">
                        {/* Shoko Avatar Frame */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-amber-400 overflow-hidden shadow-md shrink-0 bg-amber-950 relative">
                          <img
                            src={shokoSmilingImg}
                            alt="翔子特調"
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-amber-950/80 text-amber-200 text-[9px] font-bold text-center py-0.5">
                            翔子店長親簽
                          </div>
                        </div>

                        {/* Omikuji Blessing & Question */}
                        <div className="flex-1 space-y-2 text-center sm:text-left">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white rounded-lg text-xs font-black shadow-xs">
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                            <span>時空靈籤：【{blessingName}】</span>
                          </div>

                          <div className="bg-white/80 border border-amber-200 rounded-xl p-2.5 text-xs text-[#5C4D4B] font-serif leading-relaxed">
                            「{blessingDesc}」
                          </div>

                          <p className="text-xs font-bold text-[#4A3E3D] font-serif line-clamp-1">
                            提問：{userQuestion.trim() || '今日時空指引'}
                          </p>
                        </div>
                      </div>

                      {/* Verdict Badge & Headline */}
                      {quickAnswer && (
                        <div className="bg-gradient-to-r from-amber-100/80 via-white to-amber-50/80 border border-amber-300/70 rounded-xl p-3 space-y-1.5 shadow-2xs">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 text-[11px] font-extrabold rounded-full border ${quickAnswer.verdictBadgeStyle.bg} ${quickAnswer.verdictBadgeStyle.text} ${quickAnswer.verdictBadgeStyle.border}`}>
                              {quickAnswer.verdictTag}
                            </span>
                            <span className="text-xs font-bold text-[#4A3E3D] font-serif">
                              {quickAnswer.headlineVerdict}
                            </span>
                          </div>

                          <p className="text-xs text-[#3a2d2c] font-serif leading-relaxed font-semibold pl-0.5">
                            {quickAnswer.directAnswerSummary}
                          </p>
                        </div>
                      )}

                      {/* Shoko One-liner Takeaway */}
                      {quickAnswer && (
                        <div className="bg-[#4A3E3D] text-[#F5EBE6] p-2.5 rounded-xl text-xs font-serif leading-relaxed flex items-center gap-2 shadow-2xs">
                          <Compass className="w-4 h-4 text-amber-300 shrink-0" />
                          <span>{quickAnswer.keyTakeaway}</span>
                        </div>
                      )}

                      {/* Drawn Cards Mini Strip */}
                      <div className="pt-1">
                        <div className="text-[10px] font-bold text-[#A87C66] mb-1 font-sans flex items-center gap-1">
                          <Grid className="w-3 h-3 text-[#A87C66]" />
                          <span>九宮格核心代表牌：</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {matrixCards.slice(0, 3).map((c, i) => (
                            <div key={i} className="bg-white border border-[#D2BCA6] rounded-lg px-2 py-1 text-[10px] font-extrabold text-center text-[#4A3E3D]">
                              {c ? `${c.suit} ${c.rank}` : '未抽牌'}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Stamp Footer */}
                      <div className="text-center text-[10px] text-[#A87C66] font-serif font-bold pt-1 border-t border-amber-200/60">
                        — 心靈拿鐵 ‧ 時空九宮格 翔子親手調製 ☕✨ —
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#E4D5C7] space-y-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={copyFortuneSummary}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-white rounded-2xl text-xs sm:text-sm font-extrabold tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Clipboard className="w-4 h-4 text-amber-100" />
                  <span>
                    {shareCopyStatus === 'copied' ? '✅ 已成功複製運勢摘要至剪貼簿！' : '📋 一鍵複製運勢摘要至剪貼簿'}
                  </span>
                </button>

                <p className="text-[11px] text-[#7A6A63] text-center font-serif">
                  複製後即可貼至 Line、FB、IG 或通訊軟體與朋友分享你的運勢！
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
