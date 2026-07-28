/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Card {
  suit: '黑桃' | '紅心' | '方塊' | '梅花';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
}

export interface GridPosition {
  id: number;
  name: string;
  role: 'consciousness' | 'reality' | 'action' | 'outcome';
  description: string;
}

export const GRID_POSITIONS: GridPosition[] = [
  { id: 1, name: '過去意識', role: 'consciousness', description: '這是你當初出發時的初衷與過去殘留的信念。' },
  { id: 2, name: '現在意識', role: 'consciousness', description: '你當前內心深處最真實的精神意圖與渴望。' },
  { id: 3, name: '未來意識', role: 'consciousness', description: '你靈魂即將前往或正在成型的精神境界。' },
  { id: 4, name: '隱蔽現實', role: 'reality', description: '存在於陰影中、你尚未察覺或不願面對的現狀。' },
  { id: 5, name: '核心現實', role: 'reality', description: '看位置 5 得知當前算牌結果，這是由位置 8「現在行動」所導致。' },
  { id: 6, name: '未來現實', role: 'reality', description: '最後導致的未來結果，是要採取位置 9「未來行動」所達成。' },
  { id: 7, name: '過去作為', role: 'action', description: '你過往習慣採取的行動路徑與舊有執行方式。' },
  { id: 8, name: '現在行動', role: 'action', description: '你目前採取的具體行動，這是導致位置 5 當前算牌結果的原因。' },
  { id: 9, name: '未來作為', role: 'outcome', description: '要達成位置 6 的未來結果，所必須採取的未來關鍵行動。' }
];

// Tarot equivalents
export const SUIT_TAROT_MAP = {
  '黑桃': { name: '寶劍', icon: '♠', element: '風', color: 'text-slate-600', desc: '思想、考驗、決策與心靈界線' },
  '紅心': { name: '聖杯', icon: '♥', element: '水', color: 'text-rose-500', desc: '情感、直覺、連結與內在療癒' },
  '方塊': { name: '星幣', icon: '♦', element: '土', color: 'text-amber-600', desc: '現實、物質、技能與穩固基石' },
  '梅花': { name: '權杖', icon: '♣', element: '火', color: 'text-emerald-700', desc: '熱情、行動、意志與生命動力' }
};

export const RANK_TAROT_MAP = {
  'A': '首牌 (Ace)',
  '2': '二號牌',
  '3': '三號牌',
  '4': '四號牌',
  '5': '五號牌',
  '6': '六號牌',
  '7': '七號牌',
  '8': '八號牌',
  '9': '九號牌',
  '10': '十號牌',
  'J': '侍從 (Page)',
  'Q': '女王 (Queen)',
  'K': '國王 (King)'
};

// Generates warm, therapeutic text based on card elements
export function getCardInterpretation(card: Card, aspect: 'consciousness' | 'reality' | 'action' | 'outcome') {
  const suit = card.suit;
  const rank = card.rank;
  
  const suitTheme = SUIT_TAROT_MAP[suit];
  
  const interpretations: Record<string, { keyword: string; consciousness: string; reality: string; action: string; outcome: string }> = {
    '黑桃_A': {
      keyword: '突破理智的開端',
      consciousness: '渴望突破舊有的認知迷霧，尋求絕對的真實與理智清明。',
      reality: '正面臨一個需要痛下決心、快刀斬亂麻的新挑戰或新真相。',
      action: '勇敢做出關鍵性的思想決斷，用清晰的邏輯直面問題的核心。',
      outcome: '迎來思想上的徹底解放，建立起不可動搖的個人原則。'
    },
    '黑桃_2': {
      keyword: '理智的防衛與權衡',
      consciousness: '處於思維的拉扯中，試圖在兩個衝突的想法間維持脆弱的平衡。',
      reality: '外部局勢正陷入僵持，雙方都在試探邊界，不願輕易表態。',
      action: '採取暫時觀望、不輕舉妄動的防禦姿態，在寂靜中沉澱。',
      outcome: '在僵局中爭取到寶貴的思考時間，但也需要小心避免陷入無止盡的逃避。'
    },
    '黑桃_3': {
      keyword: '心碎後的澄明',
      consciousness: '正在消化某種失落、背叛或期望落空的痛楚。',
      reality: '現實中經歷了言語的傷害、承諾的破滅或核心期望的受挫。',
      action: '直面悲傷，不壓抑痛苦，將痛楚轉化為看清局勢的智慧。',
      outcome: '傷口雖然深刻，但會清洗掉所有的盲目與不切實際的幻想。'
    },
    '黑桃_4': {
      keyword: '思想的庇護所',
      consciousness: '疲於應對外界的紛擾，強烈渴望退回安靜的角落重整思維。',
      reality: '現狀陷入短暫的停滯期，這是命運留給你的喘息與修復空間。',
      action: '主動宣告休息，切斷干擾源，在沉靜中滋養疲憊的靈魂。',
      outcome: '恢復敏銳的思想活力，在停頓中積蓄起重新出發的勇氣。'
    },
    '黑桃_5': {
      keyword: '衝突與妥協的邊界',
      consciousness: '內心充滿抗爭與不服輸的緊繃感，可能夾雜著自我質疑。',
      reality: '身處在意見不合、利益爭奪或觀點衝突的尷尬漩渦中。',
      action: '在爭論中堅守立場，但需注意是否正陷入「贏了面子輸了裡子」的虛無中。',
      outcome: '經歷了一場思想的洗禮，雖然有代價，但釐清了誰才是真正同路的人。'
    },
    '黑桃_6': {
      keyword: '心靈的平靜遷徙',
      consciousness: '準備放低姿態，帶上殘存的信念，航向更安穩的精神彼岸。',
      reality: '最艱難的風暴正在漸漸遠去，生活與心情正踏上緩慢復原的軌道。',
      action: '接受別人的協助，默默抽離混亂的環境，尋找合適的精神避難所。',
      outcome: '最終將抵達一片溫和的水域，焦慮消散，內心重獲久違的平靜。'
    },
    '黑桃_7': {
      keyword: '孤獨的思想試探',
      consciousness: '不願透露真實想法，默默在心中盤算著非常規的策略與備案。',
      reality: '現狀有些暗潮洶湧，需要依靠智慧與靈活的手段才能化險為夷。',
      action: '不張揚地推進計策，運用技巧避開正面衝突，靈活處理問題。',
      outcome: '成功避開了現實的阻礙，但也需要面對是否對重要的人有所保留的道德詰問。'
    },
    '黑桃_8': {
      keyword: '自我設限的幻影迷宮',
      consciousness: '被恐懼與焦慮矇蔽了雙眼，覺得自己無處可逃、無能為力。',
      reality: '看似陷入重重束縛、動彈不得，但實際上那些鎖鏈大都是自我催眠的幻覺。',
      action: '不盲目掙扎，先冷靜下來拆掉蒙眼布，認清真正的出口就在腳下。',
      outcome: '看穿恐懼的本質，解開自我設限的枷鎖，重獲思想自主權。'
    },
    '黑桃_9': {
      keyword: '深夜的靈魂詰問',
      consciousness: '被無端的焦慮、噩夢或悔恨淹沒，精神處於極度緊繃的臨界點。',
      reality: '現實的壓力被大腦過度放大，在夜深人靜時感到孤立無援。',
      action: '停止在黑暗中過度聯想，點亮一盞燈，尋求外界溫暖的擁抱與傾聽。',
      outcome: '意識到「黑暗最深處即是黎明」，走出心魔的陰影，迎來黎明曙光。'
    },
    '黑桃_10': {
      keyword: '極點的終結與焦土重生',
      consciousness: '體驗到徹底的無力，但深知一切已跌至谷底，無法更壞。',
      reality: '某個長期的困局迎來了無法逆轉的終結，所有折磨在此畫下句點。',
      action: '全然接受這個結局，不作無謂的抗爭，讓一切在焦土中歸零。',
      outcome: '徹底解脫，所有舊有的束縛煙消雲散，空出雙手等待全新的可能。'
    },
    '黑桃_J': {
      keyword: '敏銳的求知探索者',
      consciousness: '保持高度的警覺與好奇心，渴望學習、觀察並拆解生活中的謎題。',
      reality: '環境中充滿了零碎的消息、新鮮的想法或思維的火花。',
      action: '像個好奇的學徒般，用客觀、理性的態度收集資訊，敢於質疑。',
      outcome: '掌握了核心資訊，雖然略顯青澀，但展現出極具潛力的智慧萌芽。'
    },
    '黑桃_Q': {
      keyword: '清明冷冽的理智女王',
      consciousness: '保持絕不妥協的客觀冷靜，用透徹的眼光洞悉人性與局勢。',
      reality: '需要你秉公處理、排除情感干擾，建立起極具尊嚴的獨立空間。',
      action: '劃清情感邊界，理直氣壯地表達訴求，拒絕情緒勒索與過度依賴。',
      outcome: '確立了神聖不可侵犯的個人自主權，成為自己生活的主宰者。'
    },
    '黑桃_K': {
      keyword: '秩序與智慧的裁判官',
      consciousness: '展現出極致的自律與掌控力，追求公正、規則與架構的完美建立。',
      reality: '外部環境要求你扮演決策者，用強大的意志與邏輯整頓混亂。',
      action: '制定清晰的秩序與策略，嚴格依規矩辦事，用客觀事實服人。',
      outcome: '成功在混亂中建立起堅固的秩序堡壘，讓人感到信服與依靠。'
    },
    
    '紅心_A': {
      keyword: '愛與靈感的水源',
      consciousness: '渴望體驗最真誠、純淨的情感交流，靈感與愛意如泉水般湧現。',
      reality: '生命中出現了一份極具療癒力的新關係、情感契機或藝術靈感。',
      action: '敞開心扉，傾聽直覺，勇敢表達善意與關懷。',
      outcome: '注入了源源不絕的生命情感活力，體驗深層的心靈滿足。'
    },
    '紅心_2': {
      keyword: '靈魂交會的和諧連結',
      consciousness: '渴望平等的對話、深度的理解與彼此互信的親密關係。',
      reality: '眼前正有一份極具默契的合作夥伴、友誼或雙向奔赴的情感。',
      action: '展現誠意，主動釋放善意，建立起基於互信與尊重的橋樑。',
      outcome: '獲得了寶貴的心靈盟友，雙方攜手創造出1+1>2的和諧能量。'
    },
    '紅心_3': {
      keyword: '歡慶與共享的溫暖聚落',
      consciousness: '感到歡愉、放鬆，渴望與知己好友共享生命的豐盛與喜悅。',
      reality: '周遭充滿了慶祝、聚會、社交熱絡與互相支持的歡樂氛圍。',
      action: '融入群體，大方接受別人的祝福與友情，放聲歡笑。',
      outcome: '被溫暖的友情與支持圍繞，重獲對生活的熱情與歸屬感。'
    },
    '紅心_4': {
      keyword: '內省與情感的停滯期',
      consciousness: '內心感到某種麻木或倦怠，對外界提供的機會提不起興趣。',
      reality: '生活平淡無奇，雖然沒有大風大浪，但也缺乏讓你怦然心動的刺激。',
      action: '給自己一點時間靜默，不必急於接受新的邀請，專注傾聽內心真正的需求。',
      outcome: '釐清了自己對情感的真實底線，不再為了迎合他人而假裝熱情。'
    },
    '紅心_5': {
      keyword: '哀悼逝去的失落',
      consciousness: '沉溺於過去的遺憾與傷痛中，眼光死死鎖在失去的三個杯子上。',
      reality: '經歷了一次承諾的落空、關係的疏遠，或是一場令人惋惜的失望。',
      action: '允許自己悲傷，但請轉過身來，看見背後依然立著的兩杯溫暖。',
      outcome: '理解了遺憾也是生命的一部分，學會帶著不完美繼續往前走。'
    },
    '紅心_6': {
      keyword: '童年的溫暖餽贈',
      consciousness: '懷念過去美好的回憶、純真的無憂時光，渴望被溫柔以待。',
      reality: '生活中出現了舊友的問候、溫馨的善意饋贈，或是安全的避風港。',
      action: '用最純真、無條件的心態去回饋身邊的人，播撒善良的種子。',
      outcome: '重新與內在的小孩連結，找回對世界最純粹的信任與安全感。'
    },
    '紅心_7': {
      keyword: '夢境與幻影的挑選',
      consciousness: '腦海中充斥著無數浪漫、誘人的藍圖，但有些脫離現實。',
      reality: '眼前有多種看似美好的選擇，但也夾雜著誘惑、假象與虛榮。',
      action: '不急著做出輕率的承諾，拿掉濾鏡，理性評估哪一個才是真正能落地盛開的夢。',
      outcome: '學會看穿虛妄的泡沫，將虛無飄渺的靈感轉化為真實的生活實踐。'
    },
    '紅心_8': {
      keyword: '尋求靈魂的高遠追尋',
      consciousness: '雖然現實已經累積了一定的滿意，但內心總覺得缺少了真正的靈魂歸宿。',
      reality: '現狀安穩但靈魂感到枯竭，需要打破現有的舒適圈去尋求神聖的意義。',
      action: '毅然轉身，告別現有已成形的安逸，在夜色中踏上追尋精神核心的旅程。',
      outcome: '找到了更高維度的精神富足，不再被表面的物質或短暫的快樂所束縛。'
    },
    '紅心_9': {
      keyword: '自得其樂的美滿中庭',
      consciousness: '感到無比的自我滿足與情緒安全，享受當下所擁有的一切。',
      reality: '現狀富足且安詳，個人生活打理得井井有條，處於心想事成的舒適期。',
      action: '大方享受這一刻的成果，向內感恩，不必過度向外求索。',
      outcome: '成為一個內心圓滿、不假外求的靈魂，自然吸引美好的事物圍繞。'
    },
    '紅心_10': {
      keyword: '情感的終極歸宿',
      consciousness: '渴望與家庭、社群或至愛達成終極的和諧，活在被愛包圍的彩虹下。',
      reality: '家庭和睦、團隊氛圍極其融洽，情感關係進入最穩固、幸福的豐收期。',
      action: '積極營造並守護這份集體的溫暖，將小愛擴散為支持群體的大愛。',
      outcome: '獲得了生命底層最深厚的安全感，建立了堅不可摧的情感神殿。'
    },
    '紅心_J': {
      keyword: '靈動直覺的情感信差',
      consciousness: '抱持著溫柔、充滿詩意與藝術靈感的心態，敏感地體察世間的細微美好。',
      reality: '身邊有著真摯的關懷、突如其來的感性靈感，或是一封暖心的訊息。',
      action: '用寫詩或繪畫般的心態，直白而溫柔地傳遞自己的情感，相信直覺。',
      outcome: '啟動了內在的藝術靈性，為原本乾枯的生活注入一劑動人的甘霖。'
    },
    '紅心_Q': {
      keyword: '柔情如海的直覺聖母',
      consciousness: '心中湧現無限的同理心與療癒能量，像海洋般包容並接納一切創傷。',
      reality: '周遭需要你傾注溫和的關懷，或是你將遇見一位極具智慧與慈悲的女性導師。',
      action: '放下評判，用極致的傾聽與溫柔，為自己與他人提供最安全的避風港。',
      outcome: '成功療癒了深埋已久的創傷，成為散發著溫暖與光芒的情感滋養者。'
    },
    '紅心_K': {
      keyword: '情感洪流的掌控大師',
      consciousness: '具備極高的情商與智慧，既能深度同理，又能保持沉穩與冷靜。',
      reality: '環境要求你成為一個穩定、包容但有原則的心靈導師或支持力量。',
      action: '用沉著、包容的姿態化解衝突，給予身邊的人方向，同時保持界線。',
      outcome: '在情感與現實間找到完美的平衡，贏得所有人的敬重與依賴。'
    },

    '方塊_A': {
      keyword: '繁榮落地的第一步',
      consciousness: '強烈渴望將虛無的想法化為實際的成果，追求踏實的物質安全感。',
      reality: '眼前出現了一個極具潛力、回報穩固的具體工作、財富或創業契機。',
      action: '腳踏實地地制定計劃，大膽接受新的職責，著手打下物質的基石。',
      outcome: '成功播下了富足的種子，為長遠的豐盛生活奠定了無比堅實的起點。'
    },
    '方塊_2': {
      keyword: '動態平衡的太極舞蹈',
      consciousness: '正在努力適應多變的現實，試圖在工作、生活與財務間維持動態平衡。',
      reality: '生活節奏非常忙碌，有多個項目或責任需要同時操持、靈活周旋。',
      action: '像個雜耍大師一樣，保持身心靈活，順應局勢的波動，不抗拒變化。',
      outcome: '培養出極強的適應力，在多變的浪潮中依然能玩味生活、游刃有餘。'
    },
    '方塊_3': {
      keyword: '專業協作的匠心基石',
      consciousness: '重視專業技能的提升，渴望與優秀的團隊共同雕琢一件精美的作品。',
      reality: '現實中進入一個重視專業分工、合作無間，且能展現才華的舞台。',
      action: '展現職人精神，虛心與人商討方案，精益求精地做好手頭上的每一個細節。',
      outcome: '獲得業界或合作夥伴的高度認可，為長遠的職業聲譽打下關鍵基礎。'
    },
    '方塊_4': {
      keyword: '保守與安全的界限',
      consciousness: '追求絕對的安全感與控制感，害怕失去既有的資源或地位。',
      reality: '資源或物質現狀穩定，但氣氛過於保守僵化，缺乏創新與流動性。',
      action: '適度守住底線，但也需要學會適時鬆開雙手，讓資源與能量循環流動。',
      outcome: '在保護既有資產的同時，為未來的拓展保留了一份充裕的備用金。'
    },
    '方塊_5': {
      keyword: '匱乏雪地的溫暖考驗',
      consciousness: '感到焦慮與缺乏安全感，擔心經濟、資源或個人價值不受重視。',
      reality: '正面臨財務緊張、資源匱乏或缺乏實質支持的暫時性寒冬。',
      action: '放下傲骨與焦慮，抬頭尋求周圍溫暖的救援，專注於解決當下實質困難。',
      outcome: '體悟到逆境中的真情，成功度過最寒冷的季節，變得更加堅韌。'
    },
    '方塊_6': {
      keyword: '平衡贈予的善意循環',
      consciousness: '懷抱感恩與慷慨的心態，懂得資源與能量的雙向流動價值。',
      reality: '處於一個公平交易、資源獲得資助或得到物質援助的好時機。',
      action: '大方給予能力所及的協助，或安心接受他人的好意與實質支持。',
      outcome: '建立起和諧平衡的互利網絡，讓生活進入正向循環。'
    },
    '方塊_7': {
      keyword: '耕耘後的沉思與評估',
      consciousness: '看著辛苦耕耘的成果，內心正在冷靜評估：這份付出是否值得？是否該調整方向？',
      reality: '項目已進入中期的收穫與等待期，此時最需要耐性，不宜急躁。',
      action: '按兵不動，抽離出來進行客觀的損益評估，為下一階段的規劃蓄力。',
      outcome: '做出了明智的方向微調，確保未來的勞動能收穫最甜美的果實。'
    },
    '方塊_8': {
      keyword: '爐火純青的工匠修行',
      consciousness: '心無旁騖，將全部注意力注入手頭的創作，在重複的工作中尋求靈魂的進化。',
      reality: '需要你付出高度的耐心、日復一日地打磨技巧、累積專業實力。',
      action: '摒除雜念，沉浸在當下的每一步實踐中，相信時間會賦予作品靈魂。',
      outcome: '技能達到爐火純青的境界，成為該領域中不可取代的中流砥柱。'
    },
    '方塊_9': {
      keyword: '獨立芬芳的貴族花園',
      consciousness: '享受完全的經濟與精神獨立，散發著優雅、自律與品味的光彩。',
      reality: '生活富足、物質條件優渥，擁有一片完全屬於自己的神聖花園。',
      action: '大方犒賞自己，自信地展现生活品味，用心維護屬於你的一方天地。',
      outcome: '活成了所有人嚮往的、集富足與自由於一身的優雅典範。'
    },
    '方塊_10': {
      keyword: '世家大族的基業豐收',
      consciousness: '渴望傳承，追求長遠、世俗與精神價值的永續發展。',
      reality: '事業、家庭或家族資產達到巔峰，擁有深厚、穩固的傳統與保障。',
      action: '遵循前人留下的智慧與規範，穩健地進行長遠規劃，重視傳承與責任。',
      outcome: '建立起福澤子孫的深厚根基，享受最穩固、安詳的黃金時代。'
    },
    '方塊_J': {
      keyword: '踏實專注的學徒起點',
      consciousness: '抱持著無比認真、踏實的心態，願意從最基礎、最瑣碎的事物學起。',
      reality: '環境中傳來了某個與實際技能、合約、學業或投資相關的踏實好消息。',
      action: '制定詳細的執行時間表，認真執行每一個細節，一步一腳印地推進。',
      outcome: '為自己的長遠人生建立起無比堅實的第一塊敲門磚。'
    },
    '方塊_Q': {
      keyword: '溫厚大地的富足母親',
      consciousness: '內心感到無比的踏實與包容，熱愛自然、美食與實用的生活智慧。',
      reality: '需要你展現出溫厚、實際、能精打細算的智慧，或者你正受到大地母性的庇護。',
      action: '打理好日常生活細節，精準管理資源，用溫暖、實際的方式滋養身邊的人。',
      outcome: '將生活過得井井有條、溫馨富庶，成為大家最安心的物質與情感後盾。'
    },
    '方塊_K': {
      keyword: '富甲一方的基業大師',
      consciousness: '具備極高的商業智慧與務實手腕，追求世俗層面的極致成功與穩固。',
      reality: '事業、財務已步入成熟期，你擁有支配與管理龐大資源的能力與責任。',
      action: '採取穩健、宏觀的守成策略，注重實際效益，用看得見的成果說話。',
      outcome: '成為一方領域的實業領袖，建立起難以撼動的豐功偉業。'
    },

    '梅花_A': {
      keyword: '熱情之火的驚艷初綻',
      consciousness: '內心湧現強烈的生命自發力，迫不及待想迎接未知的冒險與挑戰。',
      reality: '命運遞來了一個充滿可能性的全新起點、事業突破或激發熱情的靈感。',
      action: '毫無保留地跨出第一步，燃燒意志力，大膽執行全新的行動。',
      outcome: '成功破開僵局，為生命注入一劑充滿活力的強大原動力。'
    },
    '梅花_2': {
      keyword: '放眼世界的宏圖規劃',
      consciousness: '手握初步的成果，眼神卻早已望向更遙遠的海岸，渴望開疆闢土。',
      reality: '現狀相對安全，但你正站在前哨站，需要為即將到來的遠征做戰略部署。',
      action: '站在高處統攬全局，制定宏觀的擴張計劃，勇敢向著更寬廣的世界看齊。',
      outcome: '跳出了局限的小天地，將自己的影響力延伸至更廣闊的戰場。'
    },
    '梅花_3': {
      keyword: '遠航船隻的信賴豐收',
      consciousness: '內心充滿前瞻性的自信，相信自己的遠見，並能耐心等待種子發芽。',
      reality: '你之前播下的種子已經生根，正看著遠航的船隻滿載而歸。',
      action: '保持專注與耐心，與團隊夥伴通力合作，迎接階段性的成果落地。',
      outcome: '你的遠見與努力得到了現實最誠摯的回報，事業與版圖穩健擴張。'
    },
    '梅花_4': {
      keyword: '安居樂業的慶功城堡',
      consciousness: '在穩固與自由間找到了平衡，心中充滿了慶祝、感恩與豐碩的喜悅。',
      reality: '生活與事業達到了一個令人滿意的里程碑，家庭與社交圈一片歡欣。',
      action: '大方與身邊的人分享快樂，舉辦慶功會，穩固並感謝現有的豐盛生活。',
      outcome: '建立起充滿和諧、穩健且受到祝福的幸福家園或事業港灣。'
    },
    '梅花_5': {
      keyword: '百家爭鳴的創意碰撞',
      consciousness: '內心躍躍欲試，渴望在與同儕的較量、辯論與競爭中證明自己的實力。',
      reality: '身處一個競爭激烈、火藥味略濃但能激發無限潛力的動態環境中。',
      action: '不畏懼挑戰，將競爭視為打磨實力的修煉場，積極表達，百折不撓。',
      outcome: '成功在一片嘈雜中脫穎而出，個人能力與心理素質得到了飛躍式的提升。'
    },
    '梅花_6': {
      keyword: '凱旋歸來的英雄桂冠',
      consciousness: '體驗到極大的自信與尊榮，享受突破重圍後獲得集體認可的榮耀。',
      reality: '你正站在聚光燈下，迎來了期待已久的公開表揚、勝利或項目的圓滿成功。',
      action: '昂首挺胸接受大家的掌聲，大方帶領團隊共享成果，激勵士氣。',
      outcome: '確立了在群體中的領袖威望，成為大家競相追隨的榜樣。'
    },
    '梅花_7': {
      keyword: '孤軍奮戰的信仰防衛',
      consciousness: '內心湧現堅不可摧的信念，即使面對千軍萬馬，也絕不退後半步。',
      reality: '你正身處「一夫當關、萬夫莫敵」的高處，面臨四面八方的質疑或挑戰。',
      action: '牢牢踩穩自己的底線，發揮頑強的意志力，用實力捍衛自己的立場與勞動成果。',
      outcome: '成功守住了神聖的陣地，讓所有的反對者望而生畏，證明了自己的強大。'
    },
    '梅花_8': {
      keyword: '箭在弦上的神速推進',
      consciousness: '思維運轉極快，容不得半點遲疑，渴望以雷霆萬鈞之勢解決一切。',
      reality: '現狀正以極快的速度向前飛馳，消息頻傳、阻礙全消，形勢一片大好。',
      action: '順應當下的狂風與迅捷動能，果斷出手，把握轉瞬即逝的良機。',
      outcome: '事務以驚人的速度順利落實，迅速抵達目標彼岸。'
    }
  };

  const key = `${suit}_${rank}`;
  const data = interpretations[key] || {
    keyword: `${suit} ${rank}`,
    consciousness: '內心湧現出清晰的企圖心與精神方向。',
    reality: '現狀展現客觀的動態與環境趨勢。',
    action: '因應當下局勢，展現果斷的行動力。',
    outcome: '引導出具體的結果與長期影響。'
  };

  return {
    keyword: data.keyword,
    text: data[aspect] || data.reality
  };
}

export interface QuickAnswerResult {
  headlineVerdict: string;
  verdictTag: string;
  feasibilityScore: string;
  verdictBadgeStyle: { bg: string; text: string; border: string; accent: string };
  directAnswerSummary: string;
  resultReasoning: string;
  actionGuidance: string;
  keyTakeaway: string;
  optionsEvaluated?: OptionEvaluation[];
  bestOptionName?: string;
}

export interface OptionEvaluation {
  optionName: string;
  rank: number; // 1 = best
  score: number; // e.g. 92
  matchedPos: number; // 1..9
  matchedPosName: string; // e.g. 位置 9 (最終結果)
  matchedCardName: string; // e.g. 方塊 K
  suitAffinity: string; // e.g. 方塊 K
  recommendationTag: string; // e.g. 首選推薦
  reasoning: string;
}

// Extract options from user question text (e.g., "午餐飲料要喝得正、龍角還是五桐號？")
export function extractOptionsFromText(text?: string): string[] {
  if (!text || !text.trim()) return [];

  let cleanText = text.trim();
  cleanText = cleanText.replace(/[?？!！。]+$/g, '');

  // Split regex for separators: 還是 | 、 | 或 | ， | , | / | 與
  const parts = cleanText.split(/還是|、|或|，|,|\/|與/g);

  const cleanedParts = parts
    .map(p => p.replace(/^(午餐|飲料|工作|今天|明天|要喝|要選|該選|選擇|到底要|到底|想問|請問|要吃)+/g, ''))
    .map(p => p.replace(/(比較好|哪個好|哪一個|還是什麼|呢)+$/g, ''))
    .map(p => p.trim())
    .filter(p => p.length > 0);

  const uniqueParts = Array.from(new Set(cleanedParts));
  return uniqueParts.length >= 2 ? uniqueParts : [];
}

// Evaluate choices dynamically against all 9 drawn cards in the spread
export function evaluateOptionsWithCards(options: string[], cards: Card[]): OptionEvaluation[] {
  if (!options || options.length === 0 || cards.length < 9) return [];

  const rankValues: Record<string, number> = {
    'A': 10, 'K': 9, 'Q': 8, 'J': 7, '10': 6, '9': 5, '8': 4, '7': 3, '6': 2, '5': 1, '4': 0, '3': -1, '2': -2
  };

  const suitBonus: Record<string, number> = {
    '方塊': 92, // Material / tangible quality
    '紅心': 88, // Emotional satisfaction & taste
    '梅花': 82, // Action energy
    '黑桃': 72  // Caution / critical review
  };

  const positionWeights: number[] = [
    1.00, // Pos 1 過去意識
    1.12, // Pos 2 現在意識
    1.08, // Pos 3 未來意識
    1.00, // Pos 4 隱蔽現實
    1.18, // Pos 5 核心現實
    1.02, // Pos 6 外在環境
    1.05, // Pos 7 潛在作為
    1.22, // Pos 8 核心作為
    1.32  // Pos 9 最終結果
  ];

  // For each option, calculate resonance with all 9 cards in the spread
  const optionEvaluations = options.map((opt, optIdx) => {
    let charHash = 0;
    for (let c = 0; c < opt.length; c++) {
      charHash = (charHash * 31 + opt.charCodeAt(c)) % 1000;
    }

    const cardScores = cards.map((card, cardIdx) => {
      const pos = GRID_POSITIONS[cardIdx];
      const sBonus = suitBonus[card.suit] || 80;
      const rVal = rankValues[card.rank] || 3;
      const pWeight = positionWeights[cardIdx];
      
      const hashResonance = ((charHash + (optIdx + 1) * 17 + (cardIdx + 1) * 11) % 19) - 9;
      const rawScore = Math.round((sBonus + rVal * 1.5) * pWeight + hashResonance);

      return {
        cardIdx,
        card,
        pos,
        rawScore
      };
    });

    cardScores.sort((a, b) => b.rawScore - a.rawScore);

    return {
      optionName: opt,
      optIdx,
      allMatches: cardScores
    };
  });

  // Assign distinct matched cards where possible to highlight unique position resonance
  const usedCardIndices = new Set<number>();
  const finalAssignments = optionEvaluations.map((item) => {
    let bestMatch = item.allMatches.find(m => !usedCardIndices.has(m.cardIdx));
    if (!bestMatch) {
      bestMatch = item.allMatches[0];
    }
    usedCardIndices.add(bestMatch.cardIdx);

    const score = Math.min(98, Math.max(56, Math.round(bestMatch.rawScore * 0.72)));
    return {
      optionName: item.optionName,
      optIdx: item.optIdx,
      bestCardMatch: bestMatch,
      score
    };
  });

  // Sort options by score descending
  finalAssignments.sort((a, b) => b.score - a.score);

  return finalAssignments.map((item, sortedIdx) => {
    const rank = sortedIdx + 1;
    const posObj = item.bestCardMatch.pos;
    const cardObj = item.bestCardMatch.card;
    const posNumber = posObj.id; // 1..9
    const interp = getCardInterpretation(cardObj, posObj.role);

    let recommendationTag = '🥇 最佳首選';
    if (rank === 2) recommendationTag = '🥈 次佳選擇';
    else if (rank === 3) recommendationTag = '🥉 備選方案 (3)';
    else if (rank > 3) recommendationTag = `備選方案 (${rank})`;

    let reasoning = '';
    if (rank === 1) {
      reasoning = `最契合【位置 ${posNumber} • ${posObj.name}】之【${cardObj.suit} ${cardObj.rank}】能量（${interp.keyword}）。牌面顯示『${item.optionName}』最能對接整體矩陣的最佳趨向，帶來理想順遂的回報與體驗。`;
    } else if (rank === 2) {
      reasoning = `契合【位置 ${posNumber} • ${posObj.name}】之【${cardObj.suit} ${cardObj.rank}】能量（${interp.keyword}）。屬於穩定可靠的替代方案，能順利提供實質的支撐。`;
    } else {
      reasoning = `對應【位置 ${posNumber} • ${posObj.name}】之【${cardObj.suit} ${cardObj.rank}】能量（${interp.keyword}）。考量整體環境重力與潛在變數，此選項發展需耗費較多調和心力。`;
    }

    return {
      optionName: item.optionName,
      rank,
      score: item.score,
      matchedPos: posNumber,
      matchedPosName: `位置 ${posNumber}（${posObj.name}）`,
      matchedCardName: `${cardObj.suit} ${cardObj.rank}`,
      suitAffinity: `${cardObj.suit} ${cardObj.rank}`,
      recommendationTag,
      reasoning
    };
  });
}

// Generate immediate direct answer summary for Quick View / Result
export function getQuickAnswerData(cards: Card[], userQuestion?: string, readingMode: 'divination' | 'decision' = 'divination'): QuickAnswerResult | null {
  if (cards.length < 9) return null;

  const card1 = cards[0]; // 過去意識
  const card2 = cards[1]; // 現在意識
  const card3 = cards[2]; // 未來意識
  const card4 = cards[3]; // 隱蔽現實
  const card5 = cards[4]; // 核心現實
  const card6 = cards[5]; // 外在環境
  const card7 = cards[6]; // 潛在作為
  const card8 = cards[7]; // 核心作為
  const card9 = cards[8]; // 最終結果

  const p2Interp = getCardInterpretation(card2, 'consciousness');
  const p5Interp = getCardInterpretation(card5, 'reality');
  const p6Interp = getCardInterpretation(card6, 'reality');
  const p8Interp = getCardInterpretation(card8, 'action');
  const p9Interp = getCardInterpretation(card9, 'outcome');

  // Check if decision mode is active
  const extractedOptions = extractOptionsFromText(userQuestion);

  if (readingMode === 'decision' && extractedOptions.length >= 2) {
    const evaluations = evaluateOptionsWithCards(extractedOptions, cards);
    const bestOption = evaluations[0];

    const headlineVerdict = `【最佳選擇】首選為『${bestOption.optionName}』！`;
    const verdictTag = `🎯 抉擇比定：最推薦『${bestOption.optionName}』`;
    const feasibilityScore = `首選契合度：${bestOption.score}% (最佳解答)`;
    const verdictBadgeStyle = {
      bg: 'bg-emerald-100',
      text: 'text-emerald-900',
      border: 'border-emerald-300',
      accent: 'emerald-600'
    };

    const directAnswerSummary = `針對「${userQuestion?.trim()}」中的所有選項，系統為抽牌後的9張牌面進行全矩陣契合度比對，【最推薦的首選是：『${bestOption.optionName}』】（最契合 ${bestOption.matchedPosName} 的【${bestOption.matchedCardName}】）。此選擇最能帶來滿意且順遂的發展。`;

    const resultReasoning = `【各選項契合度評估】\n` + evaluations.map(e => `${e.recommendationTag} 『${e.optionName}』 (契合度 ${e.score}%)：${e.reasoning}`).join('\n\n');

    const actionGuidance = `【執行建議】既然決定選擇『${bestOption.optionName}』，核心作為（位置8【${card8.suit} ${card8.rank}】）提示您：「${p8Interp.text}」，展現明快利落的行動力！`;

    const keyTakeaway = `💡 拿鐵抉擇定案：無須糾結！直接選擇『${bestOption.optionName}』，這將為您帶來最圓滿滿意的結果！`;

    return {
      headlineVerdict,
      verdictTag,
      feasibilityScore,
      verdictBadgeStyle,
      directAnswerSummary,
      resultReasoning,
      actionGuidance,
      keyTakeaway,
      optionsEvaluated: evaluations,
      bestOptionName: bestOption.optionName
    };
  }

  // Standard Divination Mode (12-tier normal distribution evaluation matrix, anchored on Position 5 Core Reality)
  const suit5 = card5.suit;
  const rank5 = card5.rank;

  const isUpperRank = ['10', 'J', 'Q', 'K', 'A'].includes(rank5); // 上層 (10, J, Q, K, A)
  const isMidRank = ['6', '7', '8', '9'].includes(rank5);          // 中層 (6, 7, 8, 9)
  const isLowerRank = ['2', '3', '4', '5'].includes(rank5);        // 下層 (2, 3, 4, 5)

  let verdictTag = '🚀 極佳 / 大吉豐收｜慶典綠（勝算 90% ~ 98%）';
  let headlineVerdict = '【最終結果】高度可行！將獲得豐盛的實質回報與成果';
  let binaryAnswer = '是 / 建議積極前往與投入';
  let winRate = '90% ~ 98%';
  let verdictBadgeStyle = {
    bg: 'bg-emerald-100',
    text: 'text-emerald-900',
    border: 'border-emerald-300',
    accent: 'emerald-600'
  };

  // 12-tier exact matching anchored on Position 5 (Core Reality)
  if (suit5 === '方塊') {
    if (isUpperRank) {
      // 1階｜慶典綠 ♦️ 方塊 ＋ 上層 (10, J, Q, K, A)
      verdictTag = '🚀 極佳 / 大吉豐收｜慶典綠（勝算 90% ~ 98%）';
      headlineVerdict = '【最終結果】高度可行！將獲得豐盛的實質回報與成果';
      binaryAnswer = '是 / 建議積極前往與投入';
      winRate = '90% ~ 98%';
      verdictBadgeStyle = { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300', accent: 'emerald-600' };
    } else if (isMidRank) {
      // 3階｜綠燈行 ♦️ 方塊 ＋ 中層 (6, 7, 8, 9)
      verdictTag = '📈 穩健 / 中吉獲益｜綠燈行（勝算 74% ~ 82%）';
      headlineVerdict = '【最終結果】方向正確！穩紮穩打即可收穫穩定價值';
      binaryAnswer = '是 / 值得採取行動與推進';
      winRate = '74% ~ 82%';
      verdictBadgeStyle = { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', accent: 'emerald-500' };
    } else {
      // 6階｜黃燈減速 ♦️ 方塊 ＋ 下層 (2, 3, 4, 5)
      verdictTag = '🎈 微吉 / 小幅進益｜黃燈減速（勝算 50% ~ 58%）';
      headlineVerdict = '【最終結果】積少成多！步調雖慢但能獲得微小實質累積';
      binaryAnswer = '可 / 步調放慢按部就班即可';
      winRate = '50% ~ 58%';
      verdictBadgeStyle = { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300', accent: 'amber-600' };
    }
  } else if (suit5 === '紅心') {
    if (isUpperRank) {
      // 2階｜璀璨綠 ♥️ 紅心 ＋ 上層 (10, J, Q, K, A)
      verdictTag = '🎊 圓滿 / 上吉和諧｜璀璨綠（勝算 82% ~ 90%）';
      headlineVerdict = '【最終結果】積極正面！將迎來和諧圓滿的關係與心願達成';
      binaryAnswer = '是 / 圓滿順利且值得推進';
      winRate = '82% ~ 90%';
      verdictBadgeStyle = { bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300', accent: 'rose-600' };
    } else if (isMidRank) {
      // 4階｜平順綠 ♥️ 紅心 ＋ 中層 (6, 7, 8, 9)
      verdictTag = '🌱 平順 / 順吉溫情｜平順綠（勝算 66% ~ 74%）';
      headlineVerdict = '【最終結果】順應自然！隨心所向將獲得溫暖平穩的結果';
      binaryAnswer = '是 / 順其自然發展即可';
      winRate = '66% ~ 74%';
      verdictBadgeStyle = { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', accent: 'emerald-500' };
    } else {
      // 7階｜琥珀黃 ♥️ 紅心 ＋ 下層 (2, 3, 4, 5)
      verdictTag = '🎲 平穩 / 隨緣順意｜琥珀黃（勝算 42% ~ 50%）';
      headlineVerdict = '【最終結果】平淡安穩！保持平常心，結果平順無大波瀾';
      binaryAnswer = '半可 / 隨緣平穩，保持平常心';
      winRate = '42% ~ 50%';
      verdictBadgeStyle = { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', accent: 'amber-500' };
    }
  } else if (suit5 === '梅花') {
    if (isUpperRank) {
      // 5階｜突破黃 ♣️ 梅花 ＋ 上層 (10, J, Q, K, A)
      verdictTag = '🎰 突破 / 積極可成｜突破黃（勝算 58% ~ 66%）';
      headlineVerdict = '【最終結果】大膽行動！當前正值主動突破開新局的最佳時機';
      binaryAnswer = '是 / 主動突破可順利開局';
      winRate = '58% ~ 66%';
      verdictBadgeStyle = { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300', accent: 'amber-600' };
    } else if (isMidRank) {
      // 8階｜橙燈提醒 ♣️ 梅花 ＋ 中層 (6, 7, 8, 9)
      verdictTag = '💦 微艱 / 辛苦耕耘｜橙燈提醒（勝算 34% ~ 42%）';
      headlineVerdict = '【最終結果】考驗耐力！過程多磨練，需付出相當汗水方能過關';
      binaryAnswer = '否 / 過程辛苦，建議多加評估';
      winRate = '34% ~ 42%';
      verdictBadgeStyle = { bg: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-300', accent: 'orange-600' };
    } else {
      // 9階｜阻滯橙 ♣️ 梅花 ＋ 下層 (2, 3, 4, 5)
      verdictTag = '🚦 阻滯 / 低效磨練｜阻滯橙（勝算 26% ~ 34%）';
      headlineVerdict = '【最終結果】事倍功半！投入多而產出少，需防範體能與資源耗損';
      binaryAnswer = '否 / 阻力較大，不建議強行';
      winRate = '26% ~ 34%';
      verdictBadgeStyle = { bg: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-300', accent: 'orange-600' };
    }
  } else if (suit5 === '黑桃') {
    if (isUpperRank) {
      // 10階｜警報紅 ♠️ 黑桃 ＋ 上層 (10, J, Q, K, A)
      verdictTag = '🚨 變局 / 破後立新｜警報紅（勝算 18% ~ 26%）';
      headlineVerdict = '【最終結果】重大決斷！舊模式已死，必須打破框架果斷轉折';
      binaryAnswer = '否 / 需徹底改變原定想法';
      winRate = '18% ~ 26%';
      verdictBadgeStyle = { bg: 'bg-stone-200', text: 'text-stone-900', border: 'border-stone-400', accent: 'stone-700' };
    } else if (isMidRank) {
      // 11階｜紅燈停 ♠️ 黑桃 ＋ 中層 (6, 7, 8, 9)
      verdictTag = '🚧 險局 / 高壓審慎｜紅燈停（勝算 10% ~ 18%）';
      headlineVerdict = '【最終結果】高壓阻礙！前方存在明確瓶頸，宜暫緩行動避開鋒芒';
      binaryAnswer = '否 / 前方瓶頸高，建議暫緩';
      winRate = '10% ~ 18%';
      verdictBadgeStyle = { bg: 'bg-red-100', text: 'text-red-900', border: 'border-red-300', accent: 'red-600' };
    } else {
      // 12階｜炸彈引爆 ♠️ 黑桃 ＋ 下層 (2, 3, 4, 5)
      verdictTag = '💣 嚴峻 / 建議全撤｜炸彈引爆（勝算 2% ~ 10%）';
      headlineVerdict = '【最終結果】嚴峻警告！隱藏風險極高且易觸礁，建議全線撤退';
      binaryAnswer = '否 / 風險極高，建議全面撤退';
      winRate = '2% ~ 10%';
      verdictBadgeStyle = { bg: 'bg-red-900', text: 'text-red-50', border: 'border-red-700', accent: 'red-800' };
    }
  }

  const topicName = userQuestion && userQuestion.trim() ? `「${userQuestion.trim()}」` : '當前關注議題';

  let directAnswerSummary = `針對${topicName}，九宮格因果解讀脈絡如下：\n\n` +
    `1. 📍【當前算牌結果 (位置 5)】：${card5.suit} ${card5.rank}（${p5Interp.keyword}）\n` +
    `   ➔ 看「位置 5」得知當前算牌結果（「${p5Interp.text}」），這是因為「位置 8」現在的行動所導致。\n\n` +
    `2. ⚡️【現在的行動 (位置 8 - 現在行動)】：${card8.suit} ${card8.rank}（${p8Interp.keyword}）\n` +
    `   ➔ 現在行動為「${p8Interp.text}」，是導致位置 5 當前算牌結果的根本原因。\n\n` +
    `3. 🔮【未來結果 (位置 6)】：${card6.suit} ${card6.rank}（${p6Interp.keyword}）\n` +
    `   ➔ 最後導致的未來結果為「${p6Interp.text}」。\n\n` +
    `4. 🚀【未來的行動 (位置 9)】：${card9.suit} ${card9.rank}（${p9Interp.keyword}）\n` +
    `   ➔ 未來結果（位置 6）是要採取「位置 9」未來的行動（「${p9Interp.text}」）所達成。\n\n` +
    `🎯【直擊結論答覆】：【${binaryAnswer}】（估計勝算率 ${winRate}）。【${headlineVerdict.replace('【最終結果】', '')}】。`;

  if (readingMode === 'decision' && extractedOptions.length < 2) {
    directAnswerSummary += `\n\n(💡 提示：您開啟了「獎落誰家」模式，但在輸入框中未檢測到多個選項。若要進行多選項比較，請在輸入框中填入選項，例如：『午餐要喝得正、龍角還是五桐號？』)`;
  }

  const resultReasoning = `【當前結果與因果】看位置 5（${card5.suit} ${card5.rank}・${p5Interp.keyword}）得知當前算牌結果，這是因為位置 8「現在行動」（${card8.suit} ${card8.rank}・${p8Interp.keyword}）所導致。`;

  const actionGuidance = `【未來結果與行動】最後導致未來結果位置 6（${card6.suit} ${card6.rank}・${p6Interp.keyword}），是要採取位置 9「未來行動」（${card9.suit} ${card9.rank}・${p9Interp.keyword}）所達成。`;

  const keyTakeaway = `💡 拿鐵定調：看位置 5 知當前結果（源於位置 8 現在行動）；未來結果位置 6 則由位置 9 未來行動達成！`;

  return {
    headlineVerdict,
    verdictTag,
    feasibilityScore: verdictTag, // Consolidate to merged tag
    verdictBadgeStyle,
    directAnswerSummary,
    resultReasoning,
    actionGuidance,
    keyTakeaway
  };
}

// Generate the fully assembled text report
export function generateReadingReport(cards: Card[], userQuestion?: string, readingMode: 'divination' | 'decision' = 'divination'): string {
  if (cards.length < 9) return '發牌尚未完成，請先點擊發牌。';

  const getCardInfo = (index: number) => {
    const card = cards[index - 1];
    const pos = GRID_POSITIONS[index - 1];
    const interp = getCardInterpretation(card, pos.role);
    const tarot = SUIT_TAROT_MAP[card.suit];
    return {
      name: `${card.suit} ${card.rank}`,
      tarotName: `${tarot.name} ${RANK_TAROT_MAP[card.rank]}`,
      keyword: interp.keyword,
      text: interp.text,
      description: pos.description
    };
  };

  // Extract core central axis cards for Section 1
  const p2 = getCardInfo(2); // 現在意識
  const p5 = getCardInfo(5); // 核心現實
  const p8 = getCardInfo(8); // 核心作為

  const p1 = getCardInfo(1); // 過去意識
  const p3 = getCardInfo(3); // 未來意識

  const p4 = getCardInfo(4); // 隱蔽現實
  const p6 = getCardInfo(6); // 外在環境

  const p7 = getCardInfo(7); // 潛在作為
  const p9 = getCardInfo(9); // 最終結果

  // Check decision options
  let decisionSection = '';
  if (readingMode === 'decision') {
    const options = extractOptionsFromText(userQuestion);
    if (options.length >= 2) {
      const evaluations = evaluateOptionsWithCards(options, cards);
      const best = evaluations[0];
      decisionSection = `【 抉擇模式：最適合選項比定 】
-----------------------------------------------------
🎯 首選推薦：『${best.optionName}』 (契合度 ${best.score}%)
理由：全陣全方位比對下，最契合【${best.matchedPosName}】之【${best.matchedCardName}】能量，最為符合『${best.optionName}』所能帶來的發展優勢與滿足度。

[ 所有選項綜合排行榜 ]：
` + evaluations.map(e => `  • ${e.recommendationTag}：『${e.optionName}』 (契合度 ${e.score}%) — ${e.reasoning}`).join('\n') + `\n-----------------------------------------------------\n\n`;
    }
  }

  // Custom cohesive analysis for central column
  let coreAnalysis = '';
  if (cards[4].suit === '黑桃' && cards[1].suit === '紅心' && cards[7].suit === '梅花') {
    coreAnalysis = `你目前正處於一個非常勇敢的「破局」狀態。你的內心渴望美好的情感（${p2.name}），你的雙手正努力執行全新的行動（${p8.name}），你們的知行高度合一。雖然客觀環境（${p5.name}）此時看起來很不樂觀，但你正在用自己堅定的信念，強行在命運的焦土上，踩出一條屬於自己的新路。請對自己的直覺保持信心。`;
  } else {
    const suit2 = cards[1].suit; // p2
    const suit5 = cards[4].suit; // p5
    const suit8 = cards[7].suit; // p8

    const theme2 = SUIT_TAROT_MAP[suit2].name;
    const theme5 = SUIT_TAROT_MAP[suit5].name;
    const theme8 = SUIT_TAROT_MAP[suit8].name;

    coreAnalysis = `你目前展現出極具張力的「生命調和」狀態。你以【${theme2}】的深層心態（${p2.name}）去感知這個世界，但在外在世界中卻必須迎擊【${theme5}】所帶來的現實考驗（${p5.name}）。在面對這份落差時，你決定以【${theme8}】的堅定姿態去行動（${p8.name}）。這代表你並非被動挨打的旁觀者，而是以高度自覺的態度在整合內心想法與外界重力。雖然眼前的道路可能略帶泥濘，但這種「知行合一」的頑強能量，正是陪伴你走向光明的最強大火炬。`;
  }

  const modeText = readingMode === 'decision' ? '【 抉擇模式 】' : '【 占卜模式 】';
  const qBlock = userQuestion && userQuestion.trim()
    ? `\n【 您的諮詢議題 (${modeText}) 】：${userQuestion.trim()}\n-----------------------------------------------------\n`
    : '';

  return `=====================================================
               【 您的心靈拿鐵解讀報告 】
=====================================================
${qBlock}${decisionSection}親愛的朋友，給自己三秒鐘的時間，深呼吸一口氣。
看著眼前的九宮格空間矩陣，這是當下這份時空裡，命運與你內心的對話。

【 第一章：時空的核心與因果鏈 】

九宮格的核心解讀邏輯：
看「位置 5」得知算牌結果，因為「位置 8」現在的行動導致；
最後導致未來結果「位置 6」，是要採取「位置 9」未來的行動所達成。

• 算牌結果（位置 5）：${p5.name}（${p5.tarotName}）—「${p5.keyword}」
看位置 5 得知當前算牌結果：${p5.text}

• 現在行動（位置 8）：${p8.name}（${p8.tarotName}）—「${p8.keyword}」
你採取的具體現在行動是：${p8.text}（這是導致位置 5 算牌結果的原因）

• 未來結果（位置 6）：${p6.name}（${p6.tarotName}）—「${p6.keyword}」
最後導致的未來結果是：${p6.text}

• 未來行動（位置 9）：${p9.name}（${p9.tarotName}）—「${p9.keyword}」
要達成位置 6 的未來結果，需要採取的未來行動是：${p9.text}

【 深度剖析 ── 知行合一，對抗現實 】
${coreAnalysis}

-----------------------------------------------------

【 第二章：意識的流動（精神軸） 】
這是一條橫向的時間之河，記錄著你思維方式的演變與靈魂的遷徙路徑：

• 過去意識（位置 1）：${p1.name} —「${p1.keyword}」
${p1.description}：${p1.text}

• 現在意識（位置 2）：${p2.name} —「${p2.keyword}」
${p2.description}：${p2.text}

• 未來意識（位置 3）：${p3.name} —「${p3.keyword}」
${p3.description}：${p3.text}

【 精神軸之啟示 】
從「${p1.keyword}」的昔日印記，經過當前「${p2.keyword}」的洗禮，你的思維維度正在悄然蛻變，最終將在「${p3.keyword}」中找到更加澄明、寬廣的精神安頓。這是一場思想與靈性的長途跋涉。

-----------------------------------------------------

【 第三章：行為的推進（實踐軸） 】
這是一條象徵雙手實踐的根基線，揭示了你如何將策略轉化為果實：

• 過去作為（位置 7）：${p7.name} —「${p7.keyword}」
${p7.description}：${p7.text}

• 現在行動（位置 8）：${p8.name} —「${p8.keyword}」
${p8.description}：${p8.text}（導致位置 5 當前算牌結果）

• 未來作為（位置 9）：${p9.name} —「${p9.keyword}」
${p9.description}：${p9.text}（達成位置 6 未來結果）

【 實踐軸之啟示 】
你在「${p7.keyword}」過去作為中的經驗，銜接你此刻在「${p8.keyword}」現在行動中付出的汗水與決心。這一切努力都將推動你走向「${p9.keyword}」未來的行動，最終成功收穫「位置 6」所揭示的未來結果。

-----------------------------------------------------

【 第四章：現實之環繞（環境軸） 】
這是一條透視你周遭重力場的水平線，解構你所身處的局勢與支援網絡：

• 隱蔽現實（位置 4）：${p4.name} —「${p4.keyword}」
${p4.description}：${p4.text}

• 核心現實（位置 5）：${p5.name} —「${p5.keyword}」
${p5.description}：${p5.text}

• 外在環境（位置 6）：${p6.name} —「${p6.keyword}」
${p6.description}：${p6.text}

【 環境軸之啟示 】
「${p4.keyword}」是那些潛藏在盲區中的悄然變化，它與此時的「${p5.keyword}」互相呼應。而「${p6.keyword}」代表的外界眼光與能量，正為你塑造著這場考驗的外部氛圍。認清隱蔽的根源，才能更從容地面對外在的浪潮。

=====================================================
願這杯心靈拿鐵的溫度，能陪伴你走過眼前的風暴，溫暖你前行的每一步。
=====================================================`;
}

export interface CardDetail {
  pos: number;
  posName: string;
  role: 'consciousness' | 'reality' | 'action' | 'outcome';
  cardName: string;
  suit: string;
  rank: string;
  element: string;
  keyword: string;
  text: string;
}

export interface AxisBreakdown {
  name: string;
  subtitle: string;
  cards: CardDetail[];
  summary: string;
  evidence: string;
}

export interface GapAnalysisItem {
  type: 'knowDo' | 'beliefReality' | 'actionEnv';
  title: string;
  levelTag: string;
  badgeStyle: { bg: string; text: string; border: string };
  statusText: string;
  description: string;
  actionPush: string;
  evidence: string;
}

export interface NineGridStructureBreakdown {
  consciousnessAxis: AxisBreakdown;
  realityAxis: AxisBreakdown;
  actionAxis: AxisBreakdown;
  coreColumn: AxisBreakdown;
  gaps: {
    knowDoGap: GapAnalysisItem;
    beliefRealityGap: GapAnalysisItem;
    actionEnvGap: GapAnalysisItem;
  };
}

export function getNineGridStructureBreakdown(cards: Card[]): NineGridStructureBreakdown | null {
  if (!cards || cards.length < 9) return null;

  const getDetail = (posIndex: number): CardDetail => {
    const card = cards[posIndex - 1];
    const pos = GRID_POSITIONS[posIndex - 1];
    const interp = getCardInterpretation(card, pos.role);
    const suitInfo = SUIT_TAROT_MAP[card.suit];
    return {
      pos: posIndex,
      posName: pos.name,
      role: pos.role,
      cardName: `${card.suit} ${card.rank}`,
      suit: card.suit,
      rank: card.rank,
      element: suitInfo.element,
      keyword: interp.keyword,
      text: interp.text
    };
  };

  const p1 = getDetail(1);
  const p2 = getDetail(2);
  const p3 = getDetail(3);
  const p4 = getDetail(4);
  const p5 = getDetail(5);
  const p6 = getDetail(6);
  const p7 = getDetail(7);
  const p8 = getDetail(8);
  const p9 = getDetail(9);

  // 1. 意識構面（精神軸 1, 2, 3）
  const consciousnessAxis: AxisBreakdown = {
    name: '意識構面 (精神軸)',
    subtitle: '橫向思維流動線：拆解個人內在信念、期待與認知演變',
    cards: [p1, p2, p3],
    summary: `從過去意識【${p1.cardName} (${p1.keyword})】的初衷，演進至當前核心念頭【${p2.cardName} (${p2.keyword})】，未來將朝向【${p3.cardName} (${p3.keyword})】轉化。`,
    evidence: `解讀依據：位置 1 (${p1.cardName}) ➔ 位置 2 (${p2.cardName}) ➔ 位置 3 (${p3.cardName})`
  };

  // 2. 現實構面（環境軸 4, 5, 6）
  const realityAxis: AxisBreakdown = {
    name: '現實構面 (環境軸)',
    subtitle: '解讀方向：從位置 4 (暗藏現狀) 往右穿越位置 5 (核心現實) 到位置 6 (未來現實)',
    cards: [p4, p5, p6],
    summary: `從暗藏現狀【${p4.cardName} (${p4.keyword})】出發，往右穿越核心現實【${p5.cardName} (${p5.keyword})】，抵達未來現實【${p6.cardName} (${p6.keyword})】。`,
    evidence: `解讀依據：位置 4 (${p4.cardName}) ➔ 位置 5 (${p5.cardName}) ➔ 位置 6 (${p6.cardName})`
  };

  // 3. 行為構面（實踐軸 7, 8, 9）
  const actionAxis: AxisBreakdown = {
    name: '行為構面 (實踐軸)',
    subtitle: '要採取的動作：從位置 7 (過去作為) 往右穿越，經過位置 8 (現在行動) 到位置 9 (未來作為)',
    cards: [p7, p8, p9],
    summary: `要採取的動作是從過去作為【${p7.cardName} (${p7.keyword})】往右穿越，經過現在行動【${p8.cardName} (${p8.keyword})】（導致位置 5 當前結果），推進到達未來作為【${p9.cardName} (${p9.keyword})】（達成位置 6 未來結果）。`,
    evidence: `解讀依據：位置 7 (${p7.cardName}) ➔ 位置 8 (${p8.cardName}) ➔ 位置 9 (${p9.cardName})`
  };

  // 4. 核心柱（貫穿中軸 2, 5, 8）
  const coreColumn: AxisBreakdown = {
    name: '時空核心柱 (貫穿與因果鏈)',
    subtitle: '核心因果：看位置 5 得知結果（源於位置 8 現在行動）；未來結果位置 6 由位置 9 未來行動達成',
    cards: [p2, p5, p8],
    summary: `看位置 5【${p5.keyword}】得知算牌結果，這是因為位置 8【${p8.keyword}】現在行動所導致；而最後導致未來結果位置 6【${p6.keyword}】，則是要採取位置 9【${p9.keyword}】未來的行動所達成。`,
    evidence: `解讀依據：1.位置 5 (算牌結果) ⇦ 位置 8 (現在行動) | 2.未來結果位置 6 ⇦ 位置 9 (未來行動)`
  };

  // 5. 三大構面落差客觀分析 (Gap Analysis)
  // (A) 知行落差：現在意識 p2 vs 核心作為 p8
  let knowDoTag = '⚖️ 知行合一 / 高度同步';
  let knowDoBadge = { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300' };
  let knowDoDesc = `您的內心想法【${p2.keyword}】與實際採取的行動【${p8.keyword}】保持在高度同頻的狀態，代表計畫能夠順暢執行。`;
  let knowDoPush = `繼續保持當前節奏，將想法小步、持續地化為每日具體行動。`;

  if (p2.suit === '黑桃' && p8.suit !== '黑桃') {
    knowDoTag = '⚠️ 知行滯後 / 思慮過度';
    knowDoBadge = { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' };
    knowDoDesc = `意識面（位置2: ${p2.cardName}）充滿理智規劃與考量，但行為面（位置8: ${p8.cardName}）落實腳步較為保守或猶豫，形成了「想得多、做有限」的落差。`;
    knowDoPush = `將複雜的大計畫拆解為明天 15 分鐘即可完成的小任務，先出腳再校正思維。`;
  } else if ((p2.suit === '紅心' || p2.suit === '梅花') && p8.suit === '黑桃') {
    knowDoTag = '🛡️ 防衛退縮 / 行為阻滯';
    knowDoBadge = { bg: 'bg-rose-50', text: 'text-rose-900', border: 'border-rose-300' };
    knowDoDesc = `內心渴望衝刺或感情連結（位置2: ${p2.cardName}），但行為上卻採取了戒備或停頓立場（位置8: ${p8.cardName}），顯示內心期待與雙手作為有所拉扯。`;
    knowDoPush = `檢視內心防衛的究竟是真風險還是心理恐懼，嘗試給予自己更溫柔的放鬆許諾。`;
  }

  // (B) 信念與現實落差：現在意識 p2 vs 核心現實 p5
  let beliefRealTag = '🌱 理想對齊 / 適應良好';
  let beliefRealBadge = { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300' };
  let beliefRealDesc = `您內心的精神期待與當前客觀環境【${p5.keyword}】基本相符，沒有太強烈的認知失調感。`;
  let beliefRealPush = `順應客觀規律，將內在期待逐步融入現有體制或環境中。`;

  if (p5.suit === '黑桃') {
    beliefRealTag = '⚡️ 考驗摩擦 / 高壓落差';
    beliefRealBadge = { bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-300' };
    beliefRealDesc = `客觀現實（位置5: ${p5.cardName}）帶來較高的限制或挑戰，與您內心深處期待的完美狀態（位置2: ${p2.cardName}）產生一定摩擦。`;
    beliefRealPush = `接納現實中的客觀侷限，將注意力從「為什麼這麼難」轉轉移為「在當前條件下我能調整什麼」。`;
  }

  // (C) 行為與環境落差：核心作為 p8 vs 外在環境 p6
  let actionEnvTag = '🌊 順勢推動 / 環境相助';
  let actionEnvBadge = { bg: 'bg-sky-50', text: 'text-sky-900', border: 'border-sky-300' };
  let actionEnvDesc = `您的具體行動【${p8.keyword}】得到了外在環境【${p6.keyword}】的相應回應或良好氛圍，事半功倍。`;
  let actionEnvPush = `善用周遭人際與環境資源，主動尋求跨界合作與助力。`;

  if (p6.suit === '黑桃' || p6.suit === '梅花') {
    actionEnvTag = '🧱 逆風開拓 / 阻力較高';
    actionEnvBadge = { bg: 'bg-[#F5EBE6]', text: 'text-[#4A3E3D]', border: 'border-[#A87C66]' };
    actionEnvDesc = `您的核心行動（位置8: ${p8.cardName}）在推動時，外在環境（位置6: ${p6.cardName}）帶來一定程度的觀望或考驗，需要耐力。`;
    actionEnvPush = `不急於尋求外界即刻的認同，先在可控範圍內穩紮穩打累積成果。`;
  }

  return {
    consciousnessAxis,
    realityAxis,
    actionAxis,
    coreColumn,
    gaps: {
      knowDoGap: {
        type: 'knowDo',
        title: '知行落差分析（意識構面 ↔ 行為構面）',
        levelTag: knowDoTag,
        badgeStyle: knowDoBadge,
        statusText: knowDoTag,
        description: knowDoDesc,
        actionPush: knowDoPush,
        evidence: `比較依據：位置 2 (現在意識: ${p2.cardName}) 與 位置 8 (現在行動: ${p8.cardName})`
      },
      beliefRealityGap: {
        type: 'beliefReality',
        title: '信念落差分析（意識構面 ↔ 現實構面）',
        levelTag: beliefRealTag,
        badgeStyle: beliefRealBadge,
        statusText: beliefRealTag,
        description: beliefRealDesc,
        actionPush: beliefRealPush,
        evidence: `比較依據：位置 2 (現在意識: ${p2.cardName}) 與 位置 5 (核心現實: ${p5.cardName})`
      },
      actionEnvGap: {
        type: 'actionEnv',
        title: '行境落差分析（行為構面 ↔ 未來現實）',
        levelTag: actionEnvTag,
        badgeStyle: actionEnvBadge,
        statusText: actionEnvTag,
        description: actionEnvDesc,
        actionPush: actionEnvPush,
        evidence: `比較依據：位置 8 (現在行動: ${p8.cardName}) 與 位置 6 (未來現實: ${p6.cardName})`
      }
    }
  };
}
