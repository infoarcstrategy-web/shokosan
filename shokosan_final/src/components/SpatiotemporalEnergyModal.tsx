import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Zap, Compass, Coffee, Copy, Check, BarChart3, ShieldCheck } from 'lucide-react';
import { Card } from '../cardData';

export interface SpatiotemporalEnergyModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: Card[];
  userQuestion?: string;
}

export function getRankValue(rank: Card['rank']): number {
  switch (rank) {
    case 'A': return 1;
    case '2': return 2;
    case '3': return 3;
    case '4': return 4;
    case '5': return 5;
    case '6': return 6;
    case '7': return 7;
    case '8': return 8;
    case '9': return 9;
    case '10': return 10;
    case 'J': return 11;
    case 'Q': return 12;
    case 'K': return 13;
    default: return 1;
  }
}

export function analyzeSpatiotemporalEnergy(cards: Card[], question: string = '') {
  const activeCards = cards.filter(Boolean);
  const count = activeCards.length || 1;

  // 1. Total Card Points
  const totalPoints = activeCards.reduce((sum, c) => sum + getRankValue(c.rank), 0);

  // 2. Suit counts
  const spades = activeCards.filter((c) => c.suit === '黑桃').length;
  const hearts = activeCards.filter((c) => c.suit === '紅心').length;
  const diamonds = activeCards.filter((c) => c.suit === '方塊').length;
  const clubs = activeCards.filter((c) => c.suit === '梅花').length;

  // Percentages
  const spadePct = Math.round((spades / count) * 100);
  const heartPct = Math.round((hearts / count) * 100);
  const diamondPct = Math.round((diamonds / count) * 100);
  const clubPct = Math.round((clubs / count) * 100);

  // Energy Level classification
  let levelTitle = '穩健順和能級';
  let levelBadgeClass = 'bg-emerald-700 text-white border-emerald-500';
  let levelDesc = `整體牌點總和為 ${totalPoints} 分，磁場流動和諧平穩，適合循序漸進、穩紮穩打地將理想落實於現實生活中。`;

  if (totalPoints >= 72) {
    levelTitle = '高頻顯化能級';
    levelBadgeClass = 'bg-[#8C5C42] text-amber-100 border-amber-400';
    levelDesc = `整體牌點總和高達 ${totalPoints} 分，呈現極為強勁顯著的推動力與局勢顯化能級，極利於積極推進與把握關鍵契機！`;
  } else if (totalPoints < 48) {
    levelTitle = '內潛蓄力能級';
    levelBadgeClass = 'bg-indigo-800 text-indigo-100 border-indigo-400';
    levelDesc = `整體牌點總和為 ${totalPoints} 分，能量偏向內收沉澱，提醒當前宜先釐清思緒、深層醞釀，厚植實力後再大膽出擊。`;
  }

  // Dominant Suit Analysis
  const suitCounts = [
    { suit: '梅花', name: '火元素', label: '行動與熱情', count: clubs, icon: '♣', color: 'text-emerald-700' },
    { suit: '紅心', name: '水元素', label: '情感與直覺', count: hearts, icon: '♥', color: 'text-rose-600' },
    { suit: '黑桃', name: '風元素', label: '理智與思考', count: spades, icon: '♠', color: 'text-slate-800' },
    { suit: '方塊', name: '土元素', label: '現實與資源', count: diamonds, icon: '♦', color: 'text-amber-700' },
  ];

  // Sort to find max
  const sortedSuits = [...suitCounts].sort((a, b) => b.count - a.count);
  const maxCount = sortedSuits[0].count;

  let dominantElement = '四元素均衡和諧';
  let adviceText = '當前九宮格四元素分佈均勻和諧，心智、感情、現實與行動處於難得的整體平衡。當前適合順勢而為，維持安定步調，即可獲得圓滿演變。';
  let recommendedDrink = '經典晨曦特調拿鐵 (Classic Dawn Latte)';
  let recommendedDrinkDesc = '黃金比例調和的經典拿鐵，象徵萬物和諧共鳴，維護安定圓滿的運勢磁場。';

  if (maxCount >= 3) {
    const top = sortedSuits[0];
    if (top.suit === '梅花') {
      dominantElement = '火元素 (行動與熱情)';
      adviceText = `牌陣中【梅花/火元素】高達 ${clubs} 張，展現強烈的行動衝勁與突破欲望。建議把握此刻的意志力大膽推進，但需注意步調，避免過度急躁而忽略細節。`;
      recommendedDrink = '極致冷萃純濃拿鐵 (Cold Brew Espresso Latte)';
      recommendedDrinkDesc = '低溫慢萃的冷靜口感，能撫平衝動雜訊，讓強大行動力更加精準專注。';
    } else if (top.suit === '紅心') {
      dominantElement = '水元素 (情感與關係)';
      adviceText = `牌陣中【紅心/水元素】高達 ${hearts} 張，情感共鳴、直覺感知與人際連結是解決問題的核心。請多聆聽內心深處的感受，以溫柔包容的方式溝通，局面將順暢解開。`;
      recommendedDrink = '玫瑰香草焦香拿鐵 (Rose Vanilla Latte)';
      recommendedDrinkDesc = '溫柔的甜香與綿密奶泡，滋養內心敏感能量，帶來深層安心與支持感。';
    } else if (top.suit === '黑桃') {
      dominantElement = '風元素 (理性與決斷)';
      adviceText = `牌陣中【黑桃/风元素】高達 ${spades} 張，清晰的邏輯思考、客觀分析與果斷抉擇是你的最大利器。請摒除情緒干擾與猶豫不決，冷靜條列方案並大膽做決定。`;
      recommendedDrink = '燕麥拿鐵特調 (Oat Milk Latte)';
      recommendedDrinkDesc = '溫潤燕麥奶香緩和過度緊繃的思緒，讓理智分析更加圓融順暢。';
    } else if (top.suit === '方塊') {
      dominantElement = '土元素 (現實與資源)';
      adviceText = `牌陣中【方塊/土元素】高達 ${diamonds} 張，顯示重點在於實質資源盤點、現實架構建立與腳踏實地的累積。請專注於看得見的步驟，扎實執行必有豐碩收穫。`;
      recommendedDrink = '濃粹雙倍黑咖啡拿鐵 (Double Shot Latte)';
      recommendedDrinkDesc = '扎實濃郁的咖啡基底，提供穩固扎根的能量，幫助現實計畫落地實現。';
    }
  }

  return {
    totalPoints,
    levelTitle,
    levelBadgeClass,
    levelDesc,
    spades,
    hearts,
    diamonds,
    clubs,
    spadePct,
    heartPct,
    diamondPct,
    clubPct,
    dominantElement,
    adviceText,
    recommendedDrink,
    recommendedDrinkDesc,
  };
}

export const SpatiotemporalEnergyModal: React.FC<SpatiotemporalEnergyModalProps> = ({
  isOpen,
  onClose,
  cards,
  userQuestion = '',
}) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  if (!isOpen || cards.length === 0) return null;

  const analysis = analyzeSpatiotemporalEnergy(cards, userQuestion);

  const handleCopyAdvice = () => {
    const text = `☕【心靈拿鐵 ‧ 時空能量建議報告】☕
❓ 諮詢議題：${userQuestion.trim() || '時空九宮格整體占卜'}
📊 牌點總和：${analysis.totalPoints} 分（${analysis.levelTitle}）
🌸 花色分佈：♠黑桃 ${analysis.spades}張 (${analysis.spadePct}%) | ♥紅心 ${analysis.hearts}張 (${analysis.heartPct}%) | ♦方塊 ${analysis.diamonds}張 (${analysis.diamondPct}%) | ♣梅花 ${analysis.clubs}張 (${analysis.clubPct}%)
🔮 主導氣場：${analysis.dominantElement}
💡 時空能量建議：${analysis.adviceText}
☕ 心靈特調推薦：${analysis.recommendedDrink} — ${analysis.recommendedDrinkDesc}
------------------------------------
✨ 心靈拿鐵 Cafe ‧ 時空九宮格占卜系統`;

    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2500);
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 25 }}
          className="bg-[#FAF5EE] border-2 border-[#A87C66] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative text-left my-auto max-h-[92vh] flex flex-col justify-between overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E4D5C7] pb-3.5 flex-shrink-0 pr-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#A87C66] to-[#4A3E3D] text-amber-100 flex items-center justify-center shadow-md shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#4A3E3D] font-serif flex items-center gap-2 leading-snug">
                  <span>時空能量建議</span>
                  <span className="text-[10px] bg-amber-200 text-amber-950 font-sans font-bold px-2 py-0.5 rounded-full border border-amber-300">
                    九宮格整體權重
                  </span>
                </h3>
                <p className="text-[11px] text-[#A87C66] font-sans mt-0.5 leading-tight">
                  根據花色四元素分佈與牌點總和綜合評估
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-[#7A6A63] hover:text-[#4A3E3D] p-1.5 rounded-full hover:bg-[#E4D5C7]/50 transition-colors cursor-pointer"
              title="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 my-3 pr-1 space-y-4">
            
            {/* Question Badge */}
            {userQuestion.trim() && (
              <div className="bg-[#FAF4F0] border border-[#E4D5C7] rounded-xl px-3 py-2 text-xs text-[#5C4D4B] font-serif flex items-center gap-2">
                <span className="text-[#A87C66] font-bold shrink-0">❓ 諮詢議題：</span>
                <span className="font-bold text-[#4A3E3D] truncate">「{userQuestion}」</span>
              </div>
            )}

            {/* Section 1: Overall Point Weight & Energy Level */}
            <div className="bg-gradient-to-br from-white via-amber-50/40 to-[#F5EBE6]/60 border-2 border-[#E4D5C7] rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4D5C7]/60 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#4A3E3D] font-serif">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>1. 牌陣總點數與能量能級</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${analysis.levelBadgeClass} shadow-2xs`}>
                  {analysis.levelTitle}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="space-y-1 flex-1">
                  <p className="text-xs text-[#5C4D4B] font-serif leading-relaxed">
                    {analysis.levelDesc}
                  </p>
                </div>

                <div className="bg-[#FAF4F0] border-2 border-[#A87C66]/40 rounded-2xl p-3 text-center shrink-0 min-w-[90px] shadow-inner">
                  <span className="text-[10px] text-[#A87C66] font-extrabold block font-sans">
                    總點數權重
                  </span>
                  <span className="text-2xl font-black text-[#4A3E3D] font-mono leading-none block my-0.5">
                    {analysis.totalPoints}
                  </span>
                  <span className="text-[9px] text-[#7A6A63] font-mono">/ 117 最高點</span>
                </div>
              </div>
            </div>

            {/* Section 2: Four Elements Suit Distribution */}
            <div className="bg-white border-2 border-[#E4D5C7] rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4D5C7]/60 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#4A3E3D] font-serif">
                  <BarChart3 className="w-4 h-4 text-[#A87C66]" />
                  <span>2. 花色四元素分佈結構</span>
                </div>
                <span className="text-[11px] font-bold text-[#A87C66] font-mono bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  主導：{analysis.dominantElement}
                </span>
              </div>

              {/* Suit Progress Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* Spades */}
                <div className="bg-[#FAF4F0] p-2.5 rounded-xl border border-[#E4D5C7] space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1">
                      <span>♠</span>
                      <span>黑桃 (風/理智)</span>
                    </span>
                    <span className="font-mono">{analysis.spades} 張 ({analysis.spadePct}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-slate-700 h-1.5 rounded-full" style={{ width: `${analysis.spadePct}%` }} />
                  </div>
                </div>

                {/* Hearts */}
                <div className="bg-[#FAF4F0] p-2.5 rounded-xl border border-[#E4D5C7] space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-rose-700">
                    <span className="flex items-center gap-1">
                      <span>♥</span>
                      <span>紅心 (水/情感)</span>
                    </span>
                    <span className="font-mono">{analysis.hearts} 張 ({analysis.heartPct}%)</span>
                  </div>
                  <div className="w-full bg-rose-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-rose-600 h-1.5 rounded-full" style={{ width: `${analysis.heartPct}%` }} />
                  </div>
                </div>

                {/* Diamonds */}
                <div className="bg-[#FAF4F0] p-2.5 rounded-xl border border-[#E4D5C7] space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-amber-800">
                    <span className="flex items-center gap-1">
                      <span>♦</span>
                      <span>方塊 (土/現實)</span>
                    </span>
                    <span className="font-mono">{analysis.diamonds} 張 ({analysis.diamondPct}%)</span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: `${analysis.diamondPct}%` }} />
                  </div>
                </div>

                {/* Clubs */}
                <div className="bg-[#FAF4F0] p-2.5 rounded-xl border border-[#E4D5C7] space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-800">
                    <span className="flex items-center gap-1">
                      <span>♣</span>
                      <span>梅花 (火/行動)</span>
                    </span>
                    <span className="font-mono">{analysis.clubs} 張 ({analysis.clubPct}%)</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${analysis.clubPct}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Shoko's Core Advice & Recommended Drink */}
            <div className="bg-amber-900 text-amber-50 rounded-2xl p-4 shadow-md space-y-2.5 font-serif border border-amber-700">
              <div className="flex items-center gap-2 border-b border-amber-700/80 pb-2">
                <Compass className="w-4 h-4 text-amber-300 shrink-0" />
                <h4 className="font-extrabold text-xs text-amber-200 font-sans">
                  翔子的時空能量指引與調飲特調
                </h4>
              </div>

              <p className="text-xs leading-relaxed text-amber-100 font-medium">
                {analysis.adviceText}
              </p>

              <div className="bg-amber-950/80 border border-amber-700/80 rounded-xl p-2.5 space-y-1 text-xs">
                <div className="font-extrabold text-amber-200 flex items-center gap-1 font-sans">
                  <Coffee className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>建議拿鐵特調：{analysis.recommendedDrink}</span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-normal">
                  {analysis.recommendedDrinkDesc}
                </p>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#E4D5C7] space-y-2 flex-shrink-0">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyAdvice}
                className="flex-1 py-3 bg-[#E4D5C7]/70 hover:bg-[#E4D5C7] text-[#4A3E3D] rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copyStatus === 'copied' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>已複製能量建議！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#A87C66]" />
                    <span>複製建議摘要</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-[#4A3E3D] hover:bg-[#3A2E2D] text-[#F5EBE6] rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-200" />
                <span>收下時空建議 ❤️</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
