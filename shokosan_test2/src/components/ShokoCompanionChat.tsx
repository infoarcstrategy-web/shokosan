import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { Card } from '../cardData';
import shokoAvatarImg from '../assets/images/shoko_whisper_mode_1785157154222.jpg';

interface ShokoCompanionChatProps {
  matrixCards: (Card | null)[];
  userQuestion: string;
  readingMode: string;
  structureBreakdown: any;
  onClose?: () => void;
}

interface Message {
  sender: 'shoko' | 'user';
  text: string;
  timestamp: Date;
}

export const ShokoCompanionChat: React.FC<ShokoCompanionChatProps> = ({
  matrixCards,
  userQuestion,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 3 Preset questions for Shoko Companion Chat
  const presetQuestions = [
    '我第一步能怎麼做？',
    '如何加深身心契合？',
    '怎麼減少外在阻力？'
  ];

  const gifts = [
    '☕【翔子為你遞上一杯特調拿鐵】',
    '🍬【翔子為你遞上砂糖】',
    '🥄【翔子為你遞上攪拌棒】',
    '🍪【翔子為你遞上手作餅乾】',
    '🍲【翔子為你端上暖心茶泡飯】'
  ];

  // Initial greeting
  useEffect(() => {
    const greetingText = `我是牧之原翔子，「牧之原」休息站的牧之原、「天空飛翔之子」的翔子😇別彆扭了，說出來讓大姐姐聽聽吧～我會一直溫柔陪伴你喔！`;
    setMessages([
      {
        sender: 'shoko',
        text: greetingText,
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Fallback response for offline or API load state
  const generateFallbackResponse = (userMsg: string, gift: string, isMatrix: boolean): string => {
    const card2 = matrixCards[1]; // 現在意識
    const card5 = matrixCards[4]; // 核心現實
    const card8 = matrixCards[7]; // 現在行動
    const coreCard = card5 || card2 || card8 || matrixCards.find(Boolean);

    let advice = '';

    if (!isMatrix) {
      if (userMsg.includes('天氣') || userMsg.includes('雨') || userMsg.includes('晴') || userMsg.includes('冷') || userMsg.includes('熱') || userMsg.includes('氣溫')) {
        advice = `無論今天外面的天氣是晴朗還是微雨，在大姐姐的心靈相談室裡，隨時都為你備好了最溫暖的熱拿鐵與好心情哦！出門要多留意天氣變化、照顧好自己呢❤️`;
      } else if (userMsg.includes('你好') || userMsg.includes('嗨') || userMsg.includes('早安') || userMsg.includes('午安') || userMsg.includes('晚安') || userMsg.includes('哈囉')) {
        advice = `哼哼，你好呀～歡迎來到大姐姐的心靈相談室！今天過得好嗎？坐下來喝杯熱咖啡，有什麼想聊的都可以跟大姐姐說哦❤️`;
      } else if (userMsg.includes('吃') || userMsg.includes('飯') || userMsg.includes('喝') || userMsg.includes('咖啡') || userMsg.includes('點心')) {
        advice = `哼哼～在大姐姐這裡，最推薦的就是招牌熱拿鐵配上手作起司蛋糕了！用心享用美食，也是好好照顧自己的第一步哦❤️`;
      } else if (userMsg.includes('累') || userMsg.includes('辛苦') || userMsg.includes('壓力') || userMsg.includes('難過') || userMsg.includes('開心')) {
        advice = `辛苦你囉～不論今天遇到什麼開心或疲憊的事，大姐姐這裡隨時都是你的港灣。放鬆肩膀、喝口熱飲，大姐姐一直在這裡聽你說哦！`;
      } else {
        advice = `哼哼，大姐姐聽你說呢～無論是想聊聊近況，還是隨意交流日常生活，在大姐姐這裡都可以放鬆下來，把這裡當成你隨時能歇腳的地方哦❤️`;
      }
    } else {
      if (userMsg.includes('阻力') || userMsg.includes('外在') || userMsg.includes('減少')) {
        if (card5) {
          advice = `別擔心～外在阻力有時只是提醒我們該換個角度思考呢！看看【位置 5 核心現實】的【${card5.suit}${card5.rank}】，把眼前的絆腳石當作跳板，大姐姐會在背後為你加油的～`;
        } else {
          advice = `減少外在阻力的第一步，是先分清「自己能控制的」與「無法控制的」。專注於自身能改變的部分，外在的迷霧自然會慢慢散開。`;
        }
      } else if (userMsg.includes('契合') || userMsg.includes('身心')) {
        if (card2 && card8) {
          advice = `嗯～想讓身心更契合呀？觀察【位置 2 意識】與【位置 8 行動】的連結，當你的想法和腳步步調一致時，心靈就像完美打發的奶泡一樣綿密安定。別給自己太大壓力，順其自然吧～`;
        } else {
          advice = `身心契合的秘訣在於「誠實面對感受」。當想法與行動方向一致時，心靈自然會感到無比輕盈與安定。`;
        }
      } else if (userMsg.includes('第一步') || userMsg.includes('怎麼做') || userMsg.includes('如何做')) {
        if (card8) {
          advice = `哼哼～關於第一步嘛！對照九宮格【位置 8 現在行動】出現的【${card8.suit}${card8.rank}】，別把目標設得太宏大哦。先喝口熱拿鐵，專注於當下 10 分鐘內能完成的一小步，大姐姐看好你哦！`;
        } else {
          advice = `第一步最重要的是先回歸當下的呼吸。先把紛亂的念頭放下一小會兒，為自己泡一杯溫熱的飲品，然後試著將心中的想法寫在紙上，釐清優先順序。`;
        }
      } else if (userMsg.includes('隱喻') || userMsg.includes('這張牌')) {
        if (coreCard) {
          advice = `哼哼，這張牌就像咖啡豆的烘焙度一樣豐富呢！【${coreCard.suit}${coreCard.rank}】象徵著你內在蘊藏的沉澱與可能性。仔細品嚐它的後韻，你會發現解答一直都在你心中哦～`;
        } else {
          advice = `每一張牌都像是一面鏡子，映照出你當下的心境。試著感受這份意象帶給你的溫柔直覺吧！`;
        }
      } else if (userMsg.includes('迷茫') || userMsg.includes('方向')) {
        advice = `感到迷茫的時候，就先別急著趕路嘛。在大姐姐的相談室裡，點一杯拿鐵、把心定下來。九宮格牌陣會為你指明最適合當下的方向～`;
      } else if (userMsg.includes('拿捏') || userMsg.includes('意識與現實')) {
        advice = `意識是天馬行空的糖霜，現實則是沉穩濃郁的濃縮咖啡。拿捏兩者的關鍵在於平衡——用微小但堅定的行動（位置 8），把美好的想法落所在日常中！`;
      } else {
        advice = `哼哼～關於九宮格的疑惑，翔子大姐姐都會細心陪你看清意識、現實與行動的脈絡哦！讓我們慢慢釐清當下的想法與方向吧❤️`;
      }
    }

    advice = advice.replace(/(☕|🍬|🥄|🍪|🍲)?\s*【翔子為你[^】]+】\s*/g, '').trim();
    return gift ? `${gift}\n\n${advice}` : advice;
  };

  const sendUserMessage = async (msgText: string) => {
    if (!msgText.trim() || isTyping) return;

    setInputValue('');

    const newUserMessage: Message = {
      sender: 'user',
      text: msgText.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    // Follow the configured gifts list by turn count (1st: latte, 2nd: sugar, 3rd: spoon, 4th: cookie, 5th: chazuke)
    const currentGift = gifts[turnCount % gifts.length];
    const giftPromptSection = currentGift
      ? `\n\n【翔子此時的心意動作（由系統自動標示於回答最頂端，請勿在你的回答內文中重複寫出『【翔子為你...】』等字樣，亦勿提供非設定以外的食物）：】\n${currentGift}`
      : '';

    // Build rich context prompt for Gemini
    const chatHistory = messages
      .slice(-6)
      .map((m) => `${m.sender === 'shoko' ? '翔子' : '使用者'}: ${m.text}`)
      .join('\n');

    const cardsText = matrixCards
      .map((c, i) => c ? `位置 ${i + 1} (${['未來行動','現在意識','過去想法','未來現實','核心現實','過去現實','未來意識','現在行動','過去意識'][i]}): ${c.suit}${c.rank}` : null)
      .filter(Boolean)
      .join(', ');

    // Check if the message is related to 9-grid matrix or tarot reading
    const matrixKeywords = ['牌', '九宮格', '意識', '現實', '行動', '占卜', '位置', '阻力', '第一步', '契合', '隱喻', '核心', '方向', '牌陣', '對焦點', '結構', '構面', '特調'];
    const isMatrixRelated = matrixKeywords.some(keyword => msgText.includes(keyword)) || presetQuestions.includes(msgText);

    let fullPrompt = '';
    let systemInstruction = '';

    if (isMatrixRelated) {
      fullPrompt = `【使用者提問】
${msgText}

【問題類型】
與「九宮格牌陣占卜 / 諮詢指引」有關。

【諮詢脈絡】
使用者原問題：${userQuestion || '今日指引'}
當前九宮格牌陣：${cardsText || '尚未指定'}
近對話記錄：
${chatHistory}${giftPromptSection}

請以「牧之原翔子（翔子大姐姐）」的身份回答使用者。
風格要求：語氣溫柔、貼心且帶點小俏皮（可適度使用「哼哼～」、「別害羞」、「大姐姐聽你說」、「來喝杯熱拿鐵吧」等口吻）。
請結合牌陣的「意識、現實、行為」構面與心靈咖啡意象，給予具體溫暖的建議。字數控制在 120-180 字之間。
⚠️【飲食規範】嚴禁在內文中主動提及或提供非系統設定以外的食物/飲料。請勿重複寫出【翔子為你...】標籤。`;

      systemInstruction = `你是「心靈拿鐵相談室」的靈魂咖啡師牧之原翔子（翔子大姐姐）。你的性格溫柔、貼心又帶點小俏皮。說話語氣親切自然、喜歡用親密的姊姊口吻（例如：哼哼、別害羞囉、大姐姐為你倒杯熱咖啡）。使用者詢問關於九宮格牌陣的問題，請結合九宮格構面（意識、現實、行為）與咖啡意象給予解析與關懷。請勿在內文重複輸出【翔子為你...】標籤，亦勿提供非設定清單以外的食物。`;
    } else {
      fullPrompt = `【使用者提問】
${msgText}

【問題類型】
日常生活閒聊 / 天氣問候 / 心情傾訴 / 一般生活對話（⚠️ 絕對與九宮格牌陣無關！）。

【對話指示】
⚠️【最高原則】這是一個日常生活話題（例如天氣、近況、閒聊、心情）。
嚴禁提及九宮格、牌陣、卡牌、占卜、意識現實或任何塔羅解牌內容！
請直接回答使用者的問題（例如回答天氣狀況、問候生活近況、安慰心情），以「牧之原翔子（翔子大姐姐）」的身份與使用者自然親切地對話。

近對話記錄：
${chatHistory}${giftPromptSection}

請以翔子大姐姐溫柔、親切又帶點小俏皮的口吻，直接回答使用者的問題。字數控制在 80-150 字之間。
⚠️【飲食規範】嚴禁在內文中主動提及或提供非系統設定以外的食物/飲料。請勿重複寫出【翔子為你...】標籤。`;

      systemInstruction = `你是「心靈拿鐵相談室」的牧之原翔子（翔子大姐姐）。你的性格溫柔、貼心又帶點小俏皮。說話語氣親切自然、喜歡用親密的姊姊口吻（例如：哼哼、別害羞囉、大姐姐聽你說）。現在使用者跟你進行日常對話或詢問天氣/生活，請直接解答與回應，嚴禁提及任何九宮格、牌陣、卡牌或占卜術語！請勿在內文重複輸出【翔子為你...】標籤，亦勿提供非設定清單以外的食物。`;
    }

    const cleanAiText = (rawText: string): string => {
      // Clean up any duplicate gift tags generated by AI
      return rawText.replace(/(☕|🍬|🥄|🍪|🍲)?\s*【翔子為你[^】]+】\s*/g, '').trim();
    };

    let shokoText = '';

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

      if (response.ok) {
        const data = await response.json();
        if (data && data.text && data.text.trim()) {
          const cleanedText = cleanAiText(data.text);
          shokoText = currentGift ? `${currentGift}\n\n${cleanedText}` : cleanedText;
        } else {
          shokoText = generateFallbackResponse(msgText, currentGift, isMatrixRelated);
        }
      } else {
        shokoText = generateFallbackResponse(msgText, currentGift, isMatrixRelated);
      }
    } catch (err) {
      console.error('Chat API error:', err);
      shokoText = generateFallbackResponse(msgText, currentGift, isMatrixRelated);
    } finally {
      const shokoResponse: Message = {
        sender: 'shoko',
        text: shokoText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, shokoResponse]);
      setTurnCount((prev) => prev + 1);
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendUserMessage(inputValue);
  };

  return (
    <div className="bg-white border-2 border-[#A87C66]/40 rounded-2xl shadow-md overflow-hidden flex flex-col h-[540px] max-w-4xl mx-auto">
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
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
          </div>
          <div className="text-left">
            <h3 className="font-extrabold text-sm text-[#FAF4F0] font-serif flex items-center gap-1">
              <span>牧之原翔子</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Green light status indicator */}
          <div className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-400/40 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>上線中</span>
          </div>
        </div>
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
              <div className="w-8 h-8 rounded-full bg-[#A87C66] text-[#FAF4F0] flex items-center justify-center text-xs font-bold shrink-0">
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

      {/* Preset Question Chips Bar */}
      <div className="px-3 py-2 bg-[#FAF4F0] border-t border-[#E4D5C7]/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-[#A87C66] shrink-0 font-serif flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          預設提問：
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {presetQuestions.map((qText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendUserMessage(qText)}
              disabled={isTyping}
              className="text-xs bg-white text-[#4A3E3D] hover:bg-[#A87C66] hover:text-white border border-[#D2BCA6] px-2.5 py-1 rounded-full whitespace-nowrap transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50 font-medium"
            >
              {qText}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-white border-t border-[#E4D5C7] flex flex-col gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="我第一步能怎麼做？"
          className="w-full bg-[#FAF4F0] border-2 border-[#D2BCA6] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#4A3E3D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A87C66]"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className={`w-full py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-white text-xs sm:text-sm font-bold shadow-xs ${
            inputValue.trim() && !isTyping
              ? 'bg-[#A87C66] hover:bg-[#8C5C42]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>送出訊息</span>
        </button>
      </form>
    </div>
  );
};
