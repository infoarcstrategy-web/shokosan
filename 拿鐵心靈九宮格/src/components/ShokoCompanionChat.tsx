import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, Coffee, Compass, Bot, User, Loader2, Lightbulb, ChevronRight, X } from 'lucide-react';
import { Card, NineGridStructureBreakdown } from '../cardData';
import shokoWhisperImg from '../assets/images/shoko_whisper_mode_1785157154222.jpg';

interface Message {
  id: string;
  sender: 'user' | 'shoko';
  text: string;
  timestamp: string;
}

interface ShokoCompanionChatProps {
  matrixCards: Card[];
  userQuestion: string;
  readingMode: 'divination' | 'decision';
  structureBreakdown: NineGridStructureBreakdown | null;
  onClose?: () => void;
}

export const ShokoCompanionChat: React.FC<ShokoCompanionChatProps> = ({
  matrixCards,
  userQuestion,
  readingMode,
  structureBreakdown,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'shoko',
      text: `我是牧之原翔子～「牧之原」休息站的「牧之原」、「天空飛翔之子」的「翔子」☕️看見了未來的自己，你心裡有想多聊聊，或者想知道「明天第一步具體可以做什麼」呢？\n\n在這邊你可以隨意發問，我會像陪伴庭安一樣，一直在這裡陪伴你～`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick prompt presets
  const quickPrompts = [
    '💡 翔子，我明天第一步具體可以做什麼？',
    '🧭 如果我選擇執行備案，環境軸的阻力會變小嗎？',
    '📋 幫我把這份九宮格報告，整理成 3 個明確行動清單',
    '☕️ 我現在心裡感覺有點焦慮，牌陣建議我如何安定情緒？'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || inputQuery).trim();
    if (!queryText || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    // Build context prompt
    const cardSummaryStr = matrixCards
      .map((c, idx) => `位置${idx + 1}:${c.suit}${c.rank}`)
      .join(', ');

    const gapSummary = structureBreakdown
      ? `知行落差:${structureBreakdown.gaps.knowDoGap.statusText}; 信念落差:${structureBreakdown.gaps.beliefRealityGap.statusText}; 行境落差:${structureBreakdown.gaps.actionEnvGap.statusText}`
      : '暫無落差分析';

    const shokoReplyIndex = messages.filter(m => m.sender === 'shoko' && m.id !== 'welcome-1').length + 1;

    let itemPromptAction = '為對方端上「溫拿鐵 ☕️」（例如：「為你端上這杯特調拿鐵囉 ☕️」）';
    let fallbackIntro = `你的特調拿鐵好囉 ☕️ 聽完你的想法，我非常理解你此刻的心情～\n\n`;

    if (shokoReplyIndex === 2) {
      itemPromptAction = '為對方加入「砂糖 🍬」（例如：「為你加入一包溫暖的砂糖 🍬，希望甜甜的味道能撫平焦慮」）';
      fallbackIntro = `為你加入一包溫暖的砂糖 🍬，希望甜甜的味道能為你加油打氣～\n\n`;
    } else if (shokoReplyIndex === 3) {
      itemPromptAction = '為對方遞上「攪拌匙 🥄」（例如：「遞給你一支精緻的攪拌匙 🥄，讓你好好攪拌香氣、梳理心中的想法」）';
      fallbackIntro = `遞給你一支精緻的攪拌匙 🥄，讓你邊攪拌咖啡香氣，邊好好梳理心中的想法～\n\n`;
    } else if (shokoReplyIndex === 4) {
      itemPromptAction = '為對方附上「手作餅乾 🍪」（例如：「為你送上一塊手作香醇餅乾 🍪，邊吃邊充充電」）';
      fallbackIntro = `為你送上一塊手作香醇餅乾 🍪，邊吃邊充充電，心情會更好喔～\n\n`;
    } else if (shokoReplyIndex >= 5) {
      itemPromptAction = `為對方端上「熱騰騰的茶泡飯 🍵」（例如：「聊了這麼多，特別為你端上一碗溫暖的茶泡飯 🍵，補充體力」）`;
      fallbackIntro = `聊了這麼多辛苦你囉！特別為你端上一碗熱騰騰的茶泡飯 🍵，補充滿滿體力與溫暖～\n\n`;
    }

    const fullPrompt = `使用者諮詢議題：${userQuestion || '無特別標註'}\n模式：${readingMode === 'decision' ? '獎落誰家模式' : '綜合占卜模式'}\n九宮格牌陣：[${cardSummaryStr}]\n結構落差：[${gapSummary}]\n\n使用者最新追問問題：${queryText}`;

    const systemInstruction = `你是「心靈拿鐵咖啡館」的大學生「牧之原翔子」（語氣風格為《青春豬頭少年》系列的大學生版翔子小姐：溫柔、睿智、帶有一絲成熟小俏皮，像真心陪伴庭安那樣同理對方）。
你需要針對使用者提出的問題，結合其九宮格牌陣（意識、現實、行為三大構面與落差）給出【具體、客觀、低壓力且溫柔俏皮】的回答。
請嚴格遵守以下規範：
1. 【切勿重複自我介紹】：這是第 ${shokoReplyIndex} 次對話，絕不要說「嗨，我是翔子」或做自我介紹！請直接在開頭 ${itemPromptAction}。
2. 先給予一句溫柔俏皮、深具同理的情緒關懷。
3. 結合其九宮格中的【算牌結果(位置5)、現在行動(位置8)或未來結果與行動(位置6/9)】給出最客觀的解讀與收斂。
4. 給出 1~3 點「明天即可立即開始」的具體微小行動推力。
5. 語氣保持溫柔、隨和、成熟帶點小俏皮，絕不使用死板的行銷術語或罐頭文字。`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullPrompt,
          systemInstruction
        })
      });

      if (!response.ok) {
        throw new Error(`API response status ${response.status}`);
      }

      const data = await response.json();
      if (data.error || !data.text) {
        throw new Error(data.error || 'No text returned');
      }

      const shokoMsg: Message = {
        id: `shoko-${Date.now()}`,
        sender: 'shoko',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, shokoMsg]);
    } catch (err) {
      console.warn('Gemini server call failed or API key missing, using smart local companion response:', err);

      // Local companion smart fallback - directly serve items without re-introduction
      let fallbackText = fallbackIntro;
      if (queryText.includes('知行落差') || queryText.includes('第一步')) {
        fallbackText += `從你的九宮格牌陣來看，你當前核心念頭【位置2】與【位置8 現在行動】之間的關鍵在於「降低啟動門檻」。\n\n🌱 翔子的具體行動建議：\n1. **明天第一步**：花 10 分鐘，把最困擾你的一個選項寫在紙上，只做「條列清單」，先不作決定。\n2. **行為聚焦**：把心力從「擔心結果」收回到「今天能控管的小事」上。\n3. **給自己空間**：喝一口拿鐵，先讚許自己願意面對問題的勇氣！`;
      } else if (queryText.includes('抉擇') || queryText.includes('備案') || queryText.includes('方向')) {
        fallbackText += `關於方向的選擇，九宮格告訴我們：【位置8 現在行動】導致了【位置5 當前結果】，只要你的行動保持踏實，阻力都會被逐漸消化。\n\n🧭 翔子的收斂建議：\n不妨選擇那個「能讓你晚上睡得最安心、價值觀最不拉扯」的方案，勇敢踏出第一步！`;
      } else if (queryText.includes('焦慮') || queryText.includes('情緒')) {
        fallbackText += `焦慮通常來自於我們想一口氣解決未來的全部問題。但看著眼前的九宮格，命運其實是在提醒你：「看位置5知當前結果，做好位置8現在行動即可」。\n\n☕️ 翔子的安頓魔法：\n深深吸一口氣，吐氣。你不需要今天就理清所有未來的細節，只要做好眼前這一步，剩下的時間會自然給出最好的答案喔～`;
      } else {
        fallbackText += `針對你提到的「${queryText}」，結合剛才的時空九宮格因果鏈（位置5算牌結果 ⇦ 位置8現在行動；位置6未來結果 ⇦ 位置9未來行動）：\n\n💡 核心收斂重點：\n最關鍵的是保護好你的內在能量，並且讓行為保持微小但持續的進展。就像我常說的，一步一步慢慢來就可以了～`;
      }

      const shokoMsg: Message = {
        id: `shoko-${Date.now()}`,
        sender: 'shoko',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, shokoMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-amber-50/40 to-[#F5EBE6]/60 border-2 border-[#A87C66]/40 rounded-2xl p-5 sm:p-7 shadow-md space-y-5 text-left relative overflow-hidden">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#E4D5C7] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#A87C66] overflow-hidden bg-[#4A3E3D] shadow-xs flex-shrink-0">
            <img
              src={shokoWhisperImg}
              alt="翔子的悄悄話"
              className="w-full h-full object-cover object-[center_15%] scale-135 origin-top"
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#4A3E3D] font-serif flex items-center gap-2">
              <span>翔子的悄悄話</span>
            </h3>
            <p className="text-xs text-[#7A6A63] font-serif mt-0.5">
              別鬧彆扭了，讓大姊姊聽聽吧～
            </p>
          </div>
        </div>
      </div>

      {/* Preset Quick Prompts Chips */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[#A87C66] flex items-center gap-1 font-sans">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>點擊快速點選常見追問，即刻收斂行動：</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(promptText)}
              disabled={isLoading}
              className="text-xs text-[#4A3E3D] bg-white hover:bg-amber-100/80 border border-[#E4D5C7] hover:border-amber-400 rounded-xl px-3.5 py-2 font-serif transition-all text-left shadow-2xs hover:shadow-xs flex items-center gap-1.5 active:scale-98 disabled:opacity-50"
            >
              <span>{promptText}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#A87C66] flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Window */}
      <div className="bg-white/90 border border-[#E4D5C7] rounded-xl p-4 sm:p-5 max-h-[380px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'shoko' && (
              <div className="w-8 h-8 rounded-full border border-[#A87C66] overflow-hidden bg-[#4A3E3D] shadow-2xs flex-shrink-0 mt-0.5">
                <img
                  src={shokoWhisperImg}
                  alt="翔子"
                  className="w-full h-full object-cover object-[center_15%] scale-135 origin-top"
                />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm font-serif leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#A87C66] text-white rounded-br-none shadow-2xs'
                  : 'bg-[#F5EBE6] text-[#4A3E3D] border border-[#E4D5C7] rounded-bl-none shadow-2xs whitespace-pre-line'
              }`}
            >
              <div className="font-bold mb-1 text-[10px] opacity-75 font-sans flex items-center justify-between gap-4">
                <span>{msg.sender === 'user' ? '您的提問' : '翔子的隨和回復'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-2xs mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#A87C66] italic font-serif py-2 pl-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#A87C66]" />
            <span>翔子正在細細研讀您的九宮格構面，醞釀答覆中...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="向翔子提出您的情境疑問，例如：明日第一步、方案選擇或情緒安頓..."
          disabled={isLoading}
          className="flex-1 bg-white border border-[#E4D5C7] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#4A3E3D] focus:outline-none focus:ring-2 focus:ring-[#A87C66] font-serif shadow-2xs"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="px-5 py-3 bg-[#A87C66] hover:bg-[#966b56] text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50 active:scale-95"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span>發送諮詢</span>
        </button>
      </form>

    </div>
  );
};
