/**
 * Card Data & Interpretation Engine for 心靈拿鐵相談室 (Mindful Latte Counseling Room)
 */

export interface Card {
  suit: '黑桃' | '紅心' | '方塊' | '梅花';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
}

export interface GridPosition {
  id: number;
  name: string;
  role?: string;
  axis: 'consciousness' | 'reality' | 'action';
  timeframe: 'future' | 'present' | 'past';
  description: string;
  focusHint: string;
}

export const GRID_POSITIONS: GridPosition[] = [
  { id: 1, name: '未來行動', role: '未來行動契機', axis: 'action', timeframe: 'future', description: '未來的腳步與突破口', focusHint: '未來可能採取的行動與關鍵步調' },
  { id: 2, name: '現在意識', role: '當前核心念頭', axis: 'consciousness', timeframe: 'present', description: '當前的心態與內在關注', focusHint: '當下內心最核心的想法與焦點' },
  { id: 3, name: '過去想法', role: '過往思維定式', axis: 'consciousness', timeframe: 'past', description: '過往形成的思想框架與信念', focusHint: '過往思維模式對現狀的潛在影響' },
  { id: 4, name: '未來現實', role: '未來外部趨勢', axis: 'reality', timeframe: 'future', description: '未來環境演變與趨勢演化', focusHint: '外部環境與形勢發展走向' },
  { id: 5, name: '核心現實', role: '當前關鍵資源', axis: 'reality', timeframe: 'present', description: '當下最核心的現實考量與關鍵點', focusHint: '當前最實質、最關鍵的資源與限制' },
  { id: 6, name: '過去現實', role: '既成事實積累', axis: 'reality', timeframe: 'past', description: '過去造成的既成事實與累積', focusHint: '過往事件積累而成的底蘊與基礎' },
  { id: 7, name: '未來意識', role: '未來心境期盼', axis: 'consciousness', timeframe: 'future', description: '未來將會萌發的心理期待', focusHint: '未來可能轉變的心境與價值觀' },
  { id: 8, name: '現在行動', role: '當前實際作為', axis: 'action', timeframe: 'present', description: '當下正在採取的實際作為', focusHint: '眼前正在實踐的行動與努力' },
  { id: 9, name: '過去意識', role: '最初動機初衷', axis: 'consciousness', timeframe: 'past', description: '過去的初衷與出發點', focusHint: '當初出發時的心理念頭與動機' },
];

export const SUIT_TAROT_MAP = {
  '黑桃': { element: '風', tarot: '寶劍', keyword: '理智、思維、挑戰與決斷', color: '#3A2E2D', icon: '♠' },
  '紅心': { element: '水', tarot: '聖杯', keyword: '情感、直覺、關係與滋養', color: '#DC2626', icon: '♥' },
  '方塊': { element: '土', tarot: '錢幣', keyword: '物質、現實、資源與成果', color: '#D97706', icon: '♦' },
  '梅花': { element: '火', tarot: '權杖', keyword: '熱情、行動、創造與驅力', color: '#059669', icon: '♣' },
};

export const RANK_TAROT_MAP = {
  'A': '開端、純粹潛能與新的契機',
  '2': '選擇、平衡與對立的流動',
  '3': '合作、初步表達與擴展',
  '4': '穩定、鞏固與秩序建立',
  '5': '衝突、轉化與調整考驗',
  '6': '和諧、過渡與獲得支援',
  '7': '評估、探索與策略規劃',
  '8': '專注、重複與精進學習',
  '9': '豐盛、累積與接近完滿',
  '10': '圓滿、週期結束與新循環',
  'J': '訊息、探索者與學習階段',
  'Q': '成熟、包容與情感引導',
  'K': '掌控、權威與決策整合',
};

export function getCardInterpretation(card: Card | null, positionIndex: number) {
  if (!card) {
    const pos = GRID_POSITIONS[positionIndex] || GRID_POSITIONS[0];
    return {
      title: '未發牌',
      suitInfo: '點擊點餐鈴發牌',
      element: '未定',
      meaning: '靜心感受當下時空脈動...',
      text: '靜心感受當下時空脈動...',
      advice: '放鬆呼吸，讓心沉澱。'
    };
  }

  const pos = GRID_POSITIONS[positionIndex] || GRID_POSITIONS[0];
  const suitMeta = SUIT_TAROT_MAP[card.suit];
  const rankMeta = RANK_TAROT_MAP[card.rank];

  let specificAdvice = '';
  if (card.suit === '紅心') {
    specificAdvice = `傾聽內心真實感受，在【${pos.name}】維度多一分溫柔與同理。`;
  } else if (card.suit === '黑桃') {
    specificAdvice = `保持清晰理智，在【${pos.name}】維度勇於切斷雜訊與猶豫。`;
  } else if (card.suit === '方塊') {
    specificAdvice = `關注實際資源與腳踏實地的步調，讓【${pos.name}】發揮穩定效益。`;
  } else {
    specificAdvice = `展現主動性與對熱情的執著，在【${pos.name}】維度大膽往前一步。`;
  }

  const meaningStr = `${card.suit}象徵${suitMeta.keyword}；數字${card.rank}代表「${rankMeta}」。置於【${pos.name}】維度，反映出${pos.focusHint}。`;

  return {
    title: `${card.suit} ${card.rank} (${pos.name})`,
    suitInfo: `${card.suit} (${suitMeta.element}元素 / 對應塔羅${suitMeta.tarot})`,
    element: suitMeta.element,
    meaning: meaningStr,
    text: meaningStr,
    advice: specificAdvice
  };
}

export function extractOptionsFromText(text: string): string[] {
  if (!text || !text.trim()) return ['選項 A', '選項 B'];

  let cleanText = text.trim();

  // Strip common lead-in questions and filler words
  cleanText = cleanText
    .replace(/^(請問|想問|到底要|到底該|應該要|應該選|建議選|我想知道|請幫我分析|請評估|幫我看看|我該|要|該)\s*/i, '')
    .replace(/[?？!！。]+$/g, '')
    .trim();

  // 1. Check explicit option connectors: 還是, 或是, 或者是, 更適合
  if (/還是|或是|或者是|更適合/i.test(cleanText)) {
    const parts = cleanText.split(/還是|或是|或者是|更適合/i)
      .map(s => s.replace(/^[?？!！,，、\s;；/]+|[?？!！,，、\s;；/]+$/g, '').trim())
      .filter(Boolean);
    if (parts.length >= 2) return normalizeOptions(parts);
  }

  // 2. Check VS / OR / Slashes
  if (/ vs | VS | Vs |\bvs\b|\bor\b|\bOR\b|\/|\\/i.test(cleanText)) {
    const parts = cleanText.split(/ vs |\bvs\b|\bor\b|\bOR\b|\/|\\/i)
      .map(s => s.replace(/^[?？!！,，、\s;；]+|[?？!！,，、\s;；]+$/g, '').trim())
      .filter(Boolean);
    if (parts.length >= 2) return normalizeOptions(parts);
  }

  // 3. Check Punctuations: 頓號(、), 逗號(， ,), 分號(； ;), 換行(\n)
  if (/[、，,;；\n]/.test(cleanText)) {
    const parts = cleanText.split(/[、，,;；\n]+/)
      .map(s => s.replace(/^[?？!！\s]+|[?？!！\s]+$/g, '').trim())
      .filter(Boolean);
    if (parts.length >= 2) return normalizeOptions(parts);
  }

  // 4. Check "與", "和", "跟" as comparison separators
  if (/[與和跟]/.test(cleanText)) {
    const parts = cleanText.split(/[與和跟]/)
      .map(s => s.replace(/^[?？!！,，、\s;；/]+|[?？!！,，、\s;；/]+$/g, '').trim())
      .filter(Boolean);
    if (parts.length >= 2) return normalizeOptions(parts);
  }

  // 5. Fallback space split if multiple words present
  const spaceParts = cleanText.split(/\s+/).filter(p => p.length > 0);
  if (spaceParts.length >= 2) {
    return normalizeOptions(spaceParts);
  }

  return normalizeOptions([cleanText, '其他備選方案']);
}

function normalizeOptions(parts: string[]): string[] {
  let cleaned = parts.map(p => {
    let s = p.trim();
    // Strip leading punctuation or lead-in verbs if repeated
    s = s.replace(/^[,，、;；?？!！\s]+/, '').replace(/[,，、;；?？!！\s]+$/, '');
    // Clean phrases like "選A" or "去A"
    s = s.replace(/^(選擇|選|去|做|買|換|考|留在)\s*/, '$1 ');
    return s.trim();
  }).filter(s => s.length > 0);

  // Deduplicate
  const unique = Array.from(new Set(cleaned));

  if (unique.length === 0) return ['選項 A', '選項 B'];
  if (unique.length === 1) return [unique[0], '其他方案'];

  return unique.slice(0, 4);
}

export function getQuickAnswerData(
  cards: (Card | null)[],
  question: string,
  mode: string,
  options?: string[]
) {
  const validCards = cards.filter(Boolean) as Card[];
  if (validCards.length < 9) {
    return {
      verdictTag: '等待靜心發牌',
      headlineVerdict: '按下點餐鈴，開始為您進行時空特調與解讀',
      directAnswerSummary: '請先進行洗牌發牌儀式，九宮格牌陣將顯化當前時空脈動。',
      keyTakeaway: '維持深呼吸，將焦點放置於當下心中最想探索的課題上。',
      bestOption: { name: '未設定', score: 0 },
      optionBreakdowns: [],
      verdictBadgeStyle: { bg: 'bg-[#A87C66]', text: 'text-white', border: 'border-[#8C5C42]' }
    };
  }

  const redCount = validCards.filter(c => c.suit === '紅心' || c.suit === '方塊').length;
  const blackCount = validCards.length - redCount;
  const coreCard = cards[4] || validCards[0];

  let verdictTag = '時空順流 ✦ 大吉特調';
  let headline = '形勢穩定且充滿能量，順應當前節奏即可獲得極佳契機';
  let badgeStyle = { bg: 'bg-amber-700', text: 'text-amber-50', border: 'border-amber-600' };

  if (redCount >= 6) {
    verdictTag = '情感與資源充沛 ‧ 上吉';
    headline = '周遭充滿善意與實質支持，信心與熱情正引領你走向正向循環';
    badgeStyle = { bg: 'bg-rose-700', text: 'text-rose-50', border: 'border-rose-600' };
  } else if (blackCount >= 6) {
    verdictTag = '審慎思考 ‧ 轉機特調';
    headline = '挑戰與需要釐清的細節較多，建議放慢步調、理智分析';
    badgeStyle = { bg: 'bg-[#4A3E3D]', text: 'text-[#FAF4F0]', border: 'border-[#3A2E2D]' };
  } else {
    verdictTag = '陰陽平衡 ‧ 平安順遂';
    headline = '理性與感性並重，當前為奠定基石與調整狀態的最佳時機';
    badgeStyle = { bg: 'bg-[#A87C66]', text: 'text-white', border: 'border-[#8C5C42]' };
  }

  let directSummary = '';
  let optionBreakdowns: { name: string; option: string; score: number; status: string; detail: string }[] = [];
  let bestOption = { name: '未指定', score: 0 };

  const qText = question.trim();

  if (mode === 'decision') {
    // 獎落誰家 (多選項評比) 模式：評比選項
    const opts = options && options.length > 0 ? options : extractOptionsFromText(question);
    const bestOptName = opts[0] || '首選方案';
    bestOption = { name: bestOptName, score: 92 };

    optionBreakdowns = opts.map((opt, i) => ({
      name: opt,
      option: opt,
      score: Math.max(50, 92 - i * 12 + (redCount > 5 ? 5 : 0)),
      status: i === 0 ? '最佳契合' : '次要潛力',
      detail: i === 0 
        ? `『${opt}』與當前核心現實【${coreCard.suit}${coreCard.rank}】高度契合，具備最高可行性。`
        : `『${opt}』需要更多時間籌備，適合作為備選或第二階段發展目標。`
    }));

    directSummary = opts.length >= 2
      ? `針對「${opts.join(' vs ')}」，九宮格核心【${coreCard.suit}${coreCard.rank}】顯示：『${bestOptName}』在短期內能帶來較強的實踐動能，契合度評分最高。`
      : `針對多選項評比，核心位置【${coreCard.suit}${coreCard.rank}】顯示目前選項方案具備正向顯化基礎。`;
  } else if (mode === 'luck') {
    // 改運加持特調
    directSummary = `本次轉運特調展現強大磁場修復力。透過核心【位置 5 核心現實：${coreCard.suit}${coreCard.rank}】的時空共鳴，能有效化解近期思緒雜訊與停滯感受。`;
  } else {
    // 「綜合占卜」模式：純粹根據使用者問題與九宮格牌陣進行深度解讀與解答，不進行選項比較
    const topicText = qText ? `針對您所探詢的「${qText}」` : '針對您當前關注的心靈課題';
    const corePosName = GRID_POSITIONS[4].name;
    const futurePosName = GRID_POSITIONS[0].name;
    const pastPosName = GRID_POSITIONS[8].name;
    const presentPosName = GRID_POSITIONS[1].name;

    directSummary = `${topicText}：九宮格牌陣由過去初衷【${cards[8]?.suit}${cards[8]?.rank} (${pastPosName})】演化至當前意識【${cards[1]?.suit}${cards[1]?.rank} (${presentPosName})】，貫穿核心【${coreCard.suit}${coreCard.rank} (${corePosName})】，並指向未來趨勢【${cards[0]?.suit}${cards[0]?.rank} (${futurePosName})】。` +
      ` 牌陣核心顯化提示：關鍵在於【${coreCard.suit}】所象徵的${SUIT_TAROT_MAP[coreCard.suit].keyword}。` +
      (redCount >= 5 
        ? `整體陣法充滿溫暖的正向流動力量（正向牌數 ${redCount}/9），表明時空契機正處於正向發展期，順應當前節奏並保持信心即可獲得良好突破。` 
        : `整體陣法提示當前環境存在細節或情緒上的考驗（審慎牌數 ${blackCount}/9），建議您先釐清客觀現實、穩住內心步調，以理性與細緻的態度處理眼前狀況。`);
  }

  return {
    verdictTag,
    headlineVerdict: headline,
    directAnswerSummary: directSummary,
    keyTakeaway: '翔子提示：不論牌陣如何演化，選擇的權柄永遠握在你自己手中。喝杯咖啡，勇敢邁出第一步吧！',
    bestOption,
    optionBreakdowns,
    verdictBadgeStyle: badgeStyle
  };
}

export function getNineGridStructureBreakdown(cards: (Card | null)[]) {
  if (cards.length < 9 || cards.some(c => c === null)) return null;

  const validCards = cards as Card[];

  const getAxisScore = (cardIndices: number[]) => {
    let score = 50;
    cardIndices.forEach(idx => {
      const c = validCards[idx];
      if (c.suit === '紅心') score += 12;
      if (c.suit === '方塊') score += 10;
      if (c.suit === '梅花') score += 8;
      if (c.suit === '黑桃') score += 4;
      if (['A', 'K', 'Q', '10'].includes(c.rank)) score += 6;
    });
    return Math.min(99, score);
  };

  const cAnalysis = `由【${validCards[8].suit}${validCards[8].rank} (過去意識)】演化至【${validCards[1].suit}${validCards[1].rank} (現在意識)】，最終導向【${validCards[2].suit}${validCards[2].rank} (過去想法)】的心靈脈絡。`;
  const rAnalysis = `包含【${validCards[5].suit}${validCards[5].rank} (過去現實)】、【${validCards[4].suit}${validCards[4].rank} (核心現實)】與【${validCards[3].suit}${validCards[3].rank} (未來現實)】。`;
  const aAnalysis = `跨越【${validCards[6].suit}${validCards[6].rank} (未來意識)】與【${validCards[7].suit}${validCards[7].rank} (現在行動)】，直指【${validCards[0].suit}${validCards[0].rank} (未來行動)】。`;
  const coreAnalysis = `由【現在意識 (${validCards[1].suit}${validCards[1].rank})】下沈至【核心現實 (${validCards[4].suit}${validCards[4].rank})】，並落實於【現在行動 (${validCards[7].suit}${validCards[7].rank})】。`;

  return {
    consciousnessAxis: {
      name: '意識構面',
      title: '🧠 意識構面 (想法與信念)',
      subtitle: '內在心理脈絡與思維演化',
      summary: cAnalysis,
      evidence: `對應 P2 (${validCards[1].suit}${validCards[1].rank}) / P3 (${validCards[2].suit}${validCards[2].rank}) / P9 (${validCards[8].suit}${validCards[8].rank})`,
      cards: [validCards[1], validCards[2], validCards[8]],
      analysis: cAnalysis,
      score: getAxisScore([1, 2, 8])
    },
    realityAxis: {
      name: '現實構面',
      title: '🌍 現實構面 (客觀與資源)',
      subtitle: '外部環境與形勢變遷',
      summary: rAnalysis,
      evidence: `對應 P4 (${validCards[3].suit}${validCards[3].rank}) / P5 (${validCards[4].suit}${validCards[4].rank}) / P6 (${validCards[5].suit}${validCards[5].rank})`,
      cards: [validCards[3], validCards[4], validCards[5]],
      analysis: rAnalysis,
      score: getAxisScore([3, 4, 5])
    },
    actionAxis: {
      name: '行為構面',
      title: '⚡️ 行為構面 (實踐與執行)',
      subtitle: '實際腳步與突破動能',
      summary: aAnalysis,
      evidence: `對應 P1 (${validCards[0].suit}${validCards[0].rank}) / P8 (${validCards[7].suit}${validCards[7].rank}) / P7 (${validCards[6].suit}${validCards[6].rank})`,
      cards: [validCards[0], validCards[7], validCards[6]],
      analysis: aAnalysis,
      score: getAxisScore([0, 7, 6])
    },
    coreColumn: {
      name: '時空核心柱',
      title: '🏛️ 時空核心柱 (貫穿古今中軸)',
      subtitle: '貫穿意識、現實與行動的中軸骨幹',
      summary: coreAnalysis,
      evidence: `對應 P2 (${validCards[1].suit}${validCards[1].rank}) / P5 (${validCards[4].suit}${validCards[4].rank}) / P8 (${validCards[7].suit}${validCards[7].rank})`,
      cards: [validCards[1], validCards[4], validCards[7]],
      analysis: coreAnalysis,
      score: getAxisScore([1, 4, 7])
    },
    gaps: {
      knowDoGap: {
        title: '知行落差',
        description: `當前想法【${validCards[1].suit}${validCards[1].rank}】與行動【${validCards[7].suit}${validCards[7].rank}】步調稍有分歧。`,
        advice: '試著簡化每日行動目標，減少內耗與猶豫。',
        actionPush: '先完成一件微小的具體步驟，喚醒行動慣性。',
        levelTag: '微幅磨合',
        evidence: `P2: ${validCards[1].suit}${validCards[1].rank} vs P8: ${validCards[7].suit}${validCards[7].rank}`,
        badgeStyle: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' }
      },
      beliefRealityGap: {
        title: '理想與現實落差',
        description: `心理預期與核心資源【${validCards[4].suit}${validCards[4].rank}】之間需要調和。`,
        advice: '調整期望值，善用眼前已握有的資源。',
        actionPush: '聚焦於當下可支配的實際籌碼。',
        levelTag: '穩定調和',
        evidence: `P2: ${validCards[1].suit}${validCards[1].rank} vs P5: ${validCards[4].suit}${validCards[4].rank}`,
        badgeStyle: { bg: 'bg-[#E4D5C7]', text: 'text-[#4A3E3D]', border: 'border-[#A87C66]' }
      },
      actionEnvGap: {
        title: '行動與環境調和',
        description: `實踐腳步【${validCards[0].suit}${validCards[0].rank}】需配合外部趨勢【${validCards[3].suit}${validCards[3].rank}】。`,
        advice: '順勢而為，在關鍵轉折點精準發力。',
        actionPush: '順應大趨勢脈動調整資源配比。',
        levelTag: '順流向前',
        evidence: `P1: ${validCards[0].suit}${validCards[0].rank} vs P4: ${validCards[3].suit}${validCards[3].rank}`,
        badgeStyle: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' }
      }
    }
  };
}

export function generateReadingReport(
  cards: (Card | null)[],
  question: string,
  mode: string,
  options?: string[]
): string {
  const dateStr = new Date().toLocaleString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const validCards = cards.filter(Boolean) as Card[];
  if (validCards.length < 9) {
    return `☕【心靈拿鐵相談室 ‧ 靈性諮商報告】
📅 產生時間：${dateStr}
❓ 探詢課題：${question || '未填寫'}
------------------------------------
⚠️ 目前九宮格牌陣尚未完全開牌，請點擊點餐鈴完成開牌儀式以產生完整報告。`;
  }

  const quick = getQuickAnswerData(cards, question, mode, options);
  const breakdown = getNineGridStructureBreakdown(cards);

  let cardListStr = '';
  cards.forEach((c, i) => {
    if (c) {
      const pos = GRID_POSITIONS[i];
      cardListStr += `  • 位置 ${i + 1}【${pos.name}】：${c.suit} ${c.rank} (${SUIT_TAROT_MAP[c.suit].element}元素 / ${SUIT_TAROT_MAP[c.suit].tarot})\n`;
    }
  });

  return `☕【心靈拿鐵相談室 ‧ 時空九宮格占卜解讀報告】
📅 諮商時間：${dateStr}
❓ 探詢課題：${question.trim() || '今日時空全景指引'}
🎯 諮商模式：${mode === 'divination' ? '綜合全視角占卜' : mode === 'decision' ? '多選項契合評比' : '改運加持特調'}
------------------------------------

✨ 【時空總評與總結】
【評語標籤】：${quick.verdictTag}
【總體氣場】：${quick.headlineVerdict}
【直擊解答】：${quick.directAnswerSummary}

------------------------------------

🎴 【九宮格時空陣法】
${cardListStr}
------------------------------------

🏛️ 【四大構面縱深解析】
${breakdown ? `1. ${breakdown.consciousnessAxis.title}
   - 解析：${breakdown.consciousnessAxis.analysis}

2. ${breakdown.realityAxis.title}
   - 解析：${breakdown.realityAxis.analysis}

3. ${breakdown.actionAxis.title}
   - 解析：${breakdown.actionAxis.analysis}

4. ${breakdown.coreColumn.title}
   - 解析：${breakdown.coreColumn.analysis}` : ''}

------------------------------------

☕ 【咖啡師 翔子的溫馨悄悄話】
${quick.keyTakeaway}

～心靈拿鐵 Cafe ‧ 感謝您的光臨，願您心靈永遠獲得溫柔滋養～`;
}

export function getCardMagicMagic(card: Card, positionIndex?: number) {
  const suitMeta = SUIT_TAROT_MAP[card.suit];
  return {
    magicName: `${card.suit} ${card.rank} ‧ 時空魔法`,
    element: suitMeta.element,
    description: `凝聚${suitMeta.keyword}的時空微粒，為當前心態帶來極致安定與提振感。`
  };
}

export function getShokoMagicDialogue(cards: (Card | null)[], question: string) {
  const coreCard = cards[4] || cards[0];
  if (!coreCard) {
    return 'ふふ～大姐姐準備好了哦！點擊點餐鈴，讓翔子為你倒上一杯熱騰騰的拿鐵特調吧❤️';
  }

  return `哼哼～看到【${coreCard.suit}${coreCard.rank}】出現在核心位置了嗎？這說明你內心其實早已有答案了呢！別對自己太嚴苛，翔子大姐姐隨時都在這裡為你加油哦❤️`;
}
