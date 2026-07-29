import React, { useState, useRef, useEffect } from 'react';
import { Send, Coffee, Compass, RotateCcw, User, MessageCircle } from 'lucide-react';
import { Card } from '../cardData';
import shokoAvatarImg from '../assets/images/shoko_whisper_mode_1785157154222.jpg';

interface ShokoCompanionChatProps {
  matrixCards: (Card | null)[];
  userQuestion: string;
  readingMode: string;
  structureBreakdown: any;
  onClose: () => void;
}

interface Message {
  sender: 'shoko' | 'user';
  text: string;
  timestamp: Date;
}

export const ShokoCompanionChat: React.FC<ShokoCompanionChatProps> = ({
  matrixCards,
  userQuestion,
  readingMode,
  structureBreakdown,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Generate initial personalized greeting based on user cards
  useEffect(() => {
    const cardsText = matrixCards
      .map((c, i) => c ? `位置 ${i + 1}: ${c.suit}${c.rank}` : null)
      .filter(Boolean)
      .join(', ');

    const greetingText = `您好！我是翔子 ☕ 看到您今天問的問題是「${userQuestion || '今日時空指引'}」，並且抽出了時空九宮格牌陣：\n\n【${cardsText}】\n\n在這個九宮格中，我注意到您的「現在意識」與「現在行動」之間存在著非常有趣的交織。有些平行思緒可能正在拉扯著您。您對這份牌陣有什麼特別感到好奇或想深入聊聊的地方嗎？隨時點杯拿鐵，我們慢慢聊 ✨`;

    setMessages([
      {
        sender: 'shoko',
        text: greetingText,
        timestamp: new Date()
      }
    ]);
  }, [userQuestion, matrixCards]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsgText = inputValue.trim();
    setInputValue('');

    const newUserMessage: Message = {
      sender: 'user',
      text: userMsgText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    // Build rich context prompt for Gemini
    const chatHistory = messages
      .map((m) => `${m.sender === 'shoko' ? '翔子' : '使用者'}: ${m.text}`)
      .join('\n');

    const cardsText = matrixCards
      .map((c, i) => c ? `位置 ${i + 1}: ${c.suit}${c.rank}` : null)
      .filter(Boolean)
      .join(', ');

    const fullPrompt = `【測算脈絡】
使用者提問：${userQuestion || '今日指引'}
牌陣花色點數：${cardsText}
對話歷史：
${chatHistory}
使用者最新提問：${userMsgText}

請在 150 字內，以溫柔、專業、療癒且具洞察力的語氣回答使用者。將占卜的意識、現實或行為構面與拿鐵咖啡的意象融合，給予可行的具體實操小步驟。`;

    const systemInstruction = `你是心靈拿鐵咖啡館的親切店員翔子，性格溫柔隨和且極具客觀洞察力。你擅長以溫暖客觀的語氣，將九宮格占卜的構面（意識、現實、行為）與落差分析，轉化為具體可行的行動建議與心靈陪伴。每次回答必須簡潔有條理（不超過 180 字），字裡行間透著咖啡香氣與對當下的專注。`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          systemInstruction
        })
      });

      if (!response.ok) {
        throw new Error('服務端響應錯誤');
      }

      const data = await response.json();
      const shokoResponse: Message = {
        sender: 'shoko',
        text: data.text || '哎呀，似乎暫時斷了線，讓翔子先幫您重新沖一杯拿鐵，您再試試看好嗎？',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, shokoResponse]);
    } catch (err) {
      console.error(err);
      const errorResponse: Message = {
        sender: 'shoko',
        text: '抱歉，咖啡機剛才蒸汽稍微大了一點（網路連接不順），您可以重試一次跟翔子說話嗎？',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white border-2 border-[#A87C66]/40 rounded-2xl shadow-md overflow-hidden flex flex-col h-[520px] max-w-4xl mx-auto">
      {/* Header bar */}
      <div className="bg-[#4A3E3D] px-4 py-3 flex items-center justify-between border-b border-[#A87C66]/20">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={shokoAvatarImg}
              alt="Shoko Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#E4D5C7]"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
          </div>
          <div className="text-left">
            <h3 className="font-extrabold text-sm text-[#FAF4F0] font-serif flex items-center gap-1">
              <span>翔子的悄悄話座席</span>
            </h3>
            <p className="text-[10px] text-[#E4D5C7]">溫柔隨和 ‧ 您的專屬咖啡與心靈對焦師</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-xs font-bold text-[#E4D5C7] hover:text-white bg-white/10 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>返回解讀結果</span>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#FAF4F0]/60 space-y-3.5 scrollbar-thin">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            {m.sender === 'shoko' ? (
              <img
                src={shokoAvatarImg}
                alt="Shoko"
                className="w-8 h-8 rounded-full object-cover border border-[#D2BCA6]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#A87C66] text-[#FAF4F0] flex items-center justify-center text-xs font-bold">
                <User className="w-4 h-4" />
              </div>
            )}

            {/* Bubble */}
            <div className="max-w-[75%] space-y-1">
              <div
                className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-3xs text-left ${
                  m.sender === 'user'
                    ? 'bg-[#A87C66] text-white rounded-tr-none'
                    : 'bg-white text-[#4A3E3D] border border-[#E4D5C7] rounded-tl-none font-serif'
                }`}
              >
                {m.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                    {line}
                  </p>
                ))}
              </div>
              <span className={`text-[9px] text-[#7A6A63] font-mono block ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {m.timestamp.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <img
              src={shokoAvatarImg}
              alt="Shoko"
              className="w-8 h-8 rounded-full object-cover border border-[#D2BCA6]"
              referrerPolicy="no-referrer"
            />
            <div className="bg-white border border-[#E4D5C7] p-3 rounded-2xl rounded-tl-none shadow-3xs flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-[#A87C66] rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-[#A87C66] rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-[#A87C66] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-white border-t border-[#E4D5C7] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="向翔子提問，例如：「該如何拉齊思緒與行動的落差？」"
          className="flex-1 bg-[#FAF4F0] border-2 border-[#D2BCA6] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#4A3E3D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A87C66]"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className={`p-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-white shadow-xs ${
            inputValue.trim() && !isTyping
              ? 'bg-[#A87C66] hover:bg-[#8C5C42]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
