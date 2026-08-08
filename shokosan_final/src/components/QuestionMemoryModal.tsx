import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Cloud, Sparkles, Trash2, X, Search, Clock, ArrowRight, MessageSquareQuote } from 'lucide-react';

export interface QuestionHistoryItem {
  id: string;
  question: string;
  mode: string; // 'divination' | 'decision' | 'luck'
  timestamp: number;
}

interface QuestionMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: QuestionHistoryItem[];
  onSelectQuestion: (question: string) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

// Built-in keyword topics dictionary for precise categorization
const COMMON_KEYWORDS = [
  '感情', '工作', '轉職', '離職', '跳槽', '復合', '複合', '婚姻', '戀愛', '單身', '告白',
  '面試', '創業', '加薪', '升遷', '買房', '投資', '股票', '健康', '學業', '考試', '考運',
  '出國', '人際', '關係', '發展', '選擇', '前途', '財運', '運勢', '提案', '項目', '合夥',
  '合作', '機會', '未來', '方向', '態度', '信任', '溝通', '突破', '心態', '事業', '收入'
];

export const QuestionMemoryModal: React.FC<QuestionMemoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectQuestion,
  onClearHistory,
  onDeleteHistoryItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // Extract and calculate Word Cloud frequencies
  const wordCloudData = useMemo(() => {
    const frequencyMap: Record<string, number> = {};

    history.forEach((item) => {
      const q = item.question;
      if (!q) return;

      // 1. Check known dictionary keywords
      COMMON_KEYWORDS.forEach((kw) => {
        if (q.includes(kw)) {
          frequencyMap[kw] = (frequencyMap[kw] || 0) + 1;
        }
      });

      // 2. Extract 2-character Chinese words
      const cleaned = q.replace(/[^\u4e00-\u9fa5]/g, '');
      for (let i = 0; i < cleaned.length - 1; i++) {
        const sub = cleaned.substring(i, i + 2);
        // Exclude stop phrases
        if (!['請問', '到底', '還是', '如何', '怎麼', '可以', '應該', '是否', '哪個', '比較', '現在', '未來', '幫我', '我想'].includes(sub)) {
          frequencyMap[sub] = (frequencyMap[sub] || 0) + 1;
        }
      }
    });

    // Convert map to array and sort by frequency
    const sorted = Object.entries(frequencyMap)
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 24);

    return sorted;
  }, [history]);

  // Top Insights (Top 3 Keywords)
  const topInsights = useMemo(() => {
    if (wordCloudData.length === 0) return null;
    return wordCloudData.slice(0, 3);
  }, [wordCloudData]);

  // Filtered Questions list
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch = searchQuery
        ? item.question.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesKeyword = selectedKeyword
        ? item.question.includes(selectedKeyword)
        : true;
      return matchesSearch && matchesKeyword;
    });
  }, [history, searchQuery, selectedKeyword]);

  // Styling helper for word cloud tags
  const getWordStyle = (count: number, maxCount: number) => {
    const ratio = count / Math.max(1, maxCount);
    if (ratio > 0.75) {
      return 'text-lg sm:text-xl font-black bg-[#4A3E3D] text-[#FAF4F0] border-[#3A2E2D] px-3.5 py-1.5 shadow-md scale-105';
    } else if (ratio > 0.4) {
      return 'text-sm sm:text-base font-extrabold bg-[#A87C66] text-white border-[#8C5C42] px-3 py-1 shadow-xs';
    } else {
      return 'text-xs sm:text-sm font-bold bg-[#FAF4F0] text-[#4A3E3D] border-[#D2BCA6] px-2.5 py-0.5 hover:bg-[#E4D5C7]';
    }
  };

  const maxCount = wordCloudData[0]?.count || 1;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-gradient-to-b from-[#FAF4F0] via-[#F5EBE6] to-[#E4D5C7]/80 border-2 border-[#A87C66]/60 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden text-left font-serif"
        >
          {/* MODAL HEADER */}
          <div className="bg-gradient-to-r from-[#4A3E3D] via-[#5C4D4B] to-[#3A2E2D] text-[#FAF4F0] px-4 sm:px-6 py-4 border-b border-[#A87C66]/50 flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-400/20 text-amber-200 border border-amber-300/30">
                <Brain className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold tracking-wide text-white flex items-center gap-1.5">
                  <span>問題記憶與心靈文字雲</span>
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                </h3>
                <p className="text-xs text-[#D2BCA6] font-sans">
                  累積提問經驗，凝練您當前最在乎的核心疑問
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#D2BCA6] hover:text-white transition-colors cursor-pointer"
              title="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MODAL BODY */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
            
            {/* WORD CLOUD SECTION */}
            <div className="bg-white/90 p-4 sm:p-5 rounded-2xl border border-[#D2BCA6]/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4D5C7] pb-2">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-[#A87C66]" />
                  <span className="text-xs sm:text-sm font-extrabold text-[#4A3E3D]">
                    心靈探索關鍵字文字雲
                  </span>
                </div>
                {selectedKeyword && (
                  <button
                    onClick={() => setSelectedKeyword(null)}
                    className="text-[11px] text-[#A87C66] hover:underline font-sans font-bold cursor-pointer"
                  >
                    重置關鍵字篩選 (顯示全部)
                  </button>
                )}
              </div>

              {wordCloudData.length === 0 ? (
                <div className="text-center py-6 text-xs sm:text-sm text-[#7A6A63] font-sans">
                  🌱 尚無提問記憶。在點餐檯輸入您的疑問並響鈴開牌後，此處將為您生成個人專屬的心靈文字雲！
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 py-2">
                  {wordCloudData.map((item) => {
                    const isSelected = selectedKeyword === item.text;
                    return (
                      <button
                        key={item.text}
                        onClick={() => {
                          setSelectedKeyword(isSelected ? null : item.text);
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-full border transition-all cursor-pointer font-serif ${getWordStyle(
                          item.count,
                          maxCount
                        )} ${
                          isSelected
                            ? 'ring-2 ring-amber-500 ring-offset-2 bg-amber-800 text-white border-amber-900 scale-110'
                            : ''
                        }`}
                      >
                        <span>{item.text}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/20 text-amber-100">
                          {item.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TOP INSIGHTS BANNER */}
              {topInsights && topInsights.length > 0 && (
                <div className="bg-[#FAF4F0] p-3 rounded-xl border border-[#A87C66]/30 text-xs text-[#4A3E3D] font-sans leading-relaxed">
                  <span className="font-bold font-serif text-[#8C5C42] block mb-0.5">
                    💡 心靈關注焦點摘要：
                  </span>
                  您最關心的核心領域為：
                  {topInsights.map((tp, idx) => (
                    <span key={tp.text} className="font-extrabold text-[#4A3E3D] mx-1">
                      【{tp.text}】({tp.count}次){idx < topInsights.length - 1 ? '、' : ''}
                    </span>
                  ))}
                  。點擊上方關鍵字可立即篩選歷史紀錄或帶入提問！
                </div>
              )}
            </div>

            {/* HISTORY LIST CONTROLS */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#4A3E3D] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#A87C66]" />
                  <span>提問歷史紀錄 ({filteredHistory.length})</span>
                  {selectedKeyword && (
                    <span className="bg-amber-100 text-amber-900 text-[11px] px-2 py-0.5 rounded-full border border-amber-300">
                      篩選：{selectedKeyword}
                    </span>
                  )}
                </span>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-48">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#7A6A63]" />
                    <input
                      type="text"
                      placeholder="搜尋過往提問..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D2BCA6] rounded-xl focus:outline-none focus:border-[#A87C66] text-[#4A3E3D] font-sans"
                    />
                  </div>

                  {history.length > 0 && (
                    <button
                      onClick={onClearHistory}
                      className="px-2.5 py-1.5 text-xs text-rose-700 hover:text-rose-900 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer font-sans shrink-0"
                      title="清除全部歷史"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>清除全部</span>
                    </button>
                  )}
                </div>
              </div>

              {/* QUESTIONS LIST */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {filteredHistory.length === 0 ? (
                  <div className="bg-white/60 p-6 rounded-xl border border-dashed border-[#D2BCA6] text-center text-xs text-[#7A6A63] font-sans">
                    無符合條件的過往問題紀錄。
                  </div>
                ) : (
                  filteredHistory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded-xl border border-[#E4D5C7] hover:border-[#A87C66] transition-all flex items-start justify-between gap-3 shadow-2xs group"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-[#FAF4F0] text-[#8C5C42] border border-[#D2BCA6]">
                            {item.mode === 'decision'
                              ? '🏆 獎落誰家'
                              : item.mode === 'luck'
                              ? '🍀 改運加持'
                              : '🔮 綜合占卜'}
                          </span>
                          <span className="text-[#7A6A63] font-mono text-[10px]">
                            {new Date(item.timestamp).toLocaleString('zh-TW', {
                              month: 'numeric',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-[#4A3E3D] flex items-center gap-1.5 break-words">
                          <MessageSquareQuote className="w-3.5 h-3.5 text-[#A87C66] shrink-0" />
                          <span>{item.question}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            onSelectQuestion(item.question);
                            onClose();
                          }}
                          className="px-2.5 py-1 text-xs bg-[#FAF4F0] hover:bg-[#A87C66] text-[#4A3E3D] hover:text-white rounded-lg border border-[#D2BCA6] hover:border-[#8C5C42] transition-colors flex items-center gap-1 font-sans cursor-pointer"
                          title="以此問題發牌提問"
                        >
                          <span>帶入提問</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDeleteHistoryItem(item.id)}
                          className="p-1 text-[#7A6A63] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="刪除這筆紀錄"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="bg-[#FAF4F0] px-4 sm:px-6 py-3 border-t border-[#E4D5C7] flex items-center justify-between text-xs font-sans shrink-0">
            <span className="text-[#7A6A63]">
              點擊關鍵字或「帶入提問」，隨時於相談室展開深度時空指引
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#4A3E3D] hover:bg-[#3A2E2D] text-white rounded-xl font-serif font-bold transition-colors cursor-pointer shadow-xs"
            >
              完成
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
