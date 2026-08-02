import {
  VOCABULARY,
  WORD_LEVELS,
  VOCABULARY_GROUPS,
  VOCABULARY_SETS,
} from "./vocabulary.js?v=20260801-scenarios";
import { KANJI, KANJI_LEVELS } from "./kanji.js?v=20260723-manga";
import { KANJI_VOCABULARY, KANJI_WORD_LEVELS } from "./kanji-vocabulary.js?v=20260801-v1";
import {
  CONVERSATIONS,
  CONVERSATION_LEVELS,
  CONVERSATION_TOPICS,
} from "./conversations.js?v=20260802-speaking-v2";
import { getKanaMnemonic } from "./mnemonics.js?v=20260723-v2";

const GROUPS = [
  {
    id: "vowels",
    category: "basic",
    label: "Vokale",
    sublabel: "a · i · u · e · o",
    kana: [
      ["あ", "ア", "a"],
      ["い", "イ", "i"],
      ["う", "ウ", "u"],
      ["え", "エ", "e"],
      ["お", "オ", "o"],
    ],
  },
  {
    id: "k",
    category: "basic",
    label: "K-Reihe",
    sublabel: "ka · ki · ku · ke · ko",
    kana: [
      ["か", "カ", "ka"],
      ["き", "キ", "ki"],
      ["く", "ク", "ku"],
      ["け", "ケ", "ke"],
      ["こ", "コ", "ko"],
    ],
  },
  {
    id: "s",
    category: "basic",
    label: "S-Reihe",
    sublabel: "sa · shi · su · se · so",
    kana: [
      ["さ", "サ", "sa"],
      ["し", "シ", "shi", "si"],
      ["す", "ス", "su"],
      ["せ", "セ", "se"],
      ["そ", "ソ", "so"],
    ],
  },
  {
    id: "t",
    category: "basic",
    label: "T-Reihe",
    sublabel: "ta · chi · tsu · te · to",
    kana: [
      ["た", "タ", "ta"],
      ["ち", "チ", "chi", "ti"],
      ["つ", "ツ", "tsu", "tu"],
      ["て", "テ", "te"],
      ["と", "ト", "to"],
    ],
  },
  {
    id: "n",
    category: "basic",
    label: "N-Reihe",
    sublabel: "na · ni · nu · ne · no",
    kana: [
      ["な", "ナ", "na"],
      ["に", "ニ", "ni"],
      ["ぬ", "ヌ", "nu"],
      ["ね", "ネ", "ne"],
      ["の", "ノ", "no"],
    ],
  },
  {
    id: "h",
    category: "basic",
    label: "H-Reihe",
    sublabel: "ha · hi · fu · he · ho",
    kana: [
      ["は", "ハ", "ha"],
      ["ひ", "ヒ", "hi"],
      ["ふ", "フ", "fu", "hu"],
      ["へ", "ヘ", "he"],
      ["ほ", "ホ", "ho"],
    ],
  },
  {
    id: "m",
    category: "basic",
    label: "M-Reihe",
    sublabel: "ma · mi · mu · me · mo",
    kana: [
      ["ま", "マ", "ma"],
      ["み", "ミ", "mi"],
      ["む", "ム", "mu"],
      ["め", "メ", "me"],
      ["も", "モ", "mo"],
    ],
  },
  {
    id: "y",
    category: "basic",
    label: "Y-Reihe",
    sublabel: "ya · yu · yo",
    kana: [
      ["や", "ヤ", "ya"],
      ["ゆ", "ユ", "yu"],
      ["よ", "ヨ", "yo"],
    ],
  },
  {
    id: "r",
    category: "basic",
    label: "R-Reihe",
    sublabel: "ra · ri · ru · re · ro",
    kana: [
      ["ら", "ラ", "ra"],
      ["り", "リ", "ri"],
      ["る", "ル", "ru"],
      ["れ", "レ", "re"],
      ["ろ", "ロ", "ro"],
    ],
  },
  {
    id: "w",
    category: "basic",
    label: "W-Reihe & N",
    sublabel: "wa · wo · n",
    kana: [
      ["わ", "ワ", "wa"],
      ["を", "ヲ", "wo", "o"],
      ["ん", "ン", "n", "n'", "nn"],
    ],
  },
  {
    id: "g",
    category: "voiced",
    label: "G-Reihe",
    sublabel: "ga · gi · gu · ge · go",
    kana: [
      ["が", "ガ", "ga"],
      ["ぎ", "ギ", "gi"],
      ["ぐ", "グ", "gu"],
      ["げ", "ゲ", "ge"],
      ["ご", "ゴ", "go"],
    ],
  },
  {
    id: "z",
    category: "voiced",
    label: "Z-Reihe",
    sublabel: "za · ji · zu · ze · zo",
    kana: [
      ["ざ", "ザ", "za"],
      ["じ", "ジ", "ji", "zi"],
      ["ず", "ズ", "zu"],
      ["ぜ", "ゼ", "ze"],
      ["ぞ", "ゾ", "zo"],
    ],
  },
  {
    id: "d",
    category: "voiced",
    label: "D-Reihe",
    sublabel: "da · ji · zu · de · do",
    kana: [
      ["だ", "ダ", "da"],
      ["ぢ", "ヂ", "ji", "di", "dji"],
      ["づ", "ヅ", "zu", "du", "dzu"],
      ["で", "デ", "de"],
      ["ど", "ド", "do"],
    ],
  },
  {
    id: "b",
    category: "voiced",
    label: "B-Reihe",
    sublabel: "ba · bi · bu · be · bo",
    kana: [
      ["ば", "バ", "ba"],
      ["び", "ビ", "bi"],
      ["ぶ", "ブ", "bu"],
      ["べ", "ベ", "be"],
      ["ぼ", "ボ", "bo"],
    ],
  },
  {
    id: "p",
    category: "voiced",
    label: "P-Reihe",
    sublabel: "pa · pi · pu · pe · po",
    kana: [
      ["ぱ", "パ", "pa"],
      ["ぴ", "ピ", "pi"],
      ["ぷ", "プ", "pu"],
      ["ぺ", "ペ", "pe"],
      ["ぽ", "ポ", "po"],
    ],
  },
  {
    id: "ky",
    category: "combo",
    label: "KY-Kombinationen",
    sublabel: "kya · kyu · kyo",
    kana: [
      ["きゃ", "キャ", "kya"],
      ["きゅ", "キュ", "kyu"],
      ["きょ", "キョ", "kyo"],
    ],
  },
  {
    id: "sh",
    category: "combo",
    label: "SH-Kombinationen",
    sublabel: "sha · shu · sho",
    kana: [
      ["しゃ", "シャ", "sha", "sya"],
      ["しゅ", "シュ", "shu", "syu"],
      ["しょ", "ショ", "sho", "syo"],
    ],
  },
  {
    id: "ch",
    category: "combo",
    label: "CH-Kombinationen",
    sublabel: "cha · chu · cho",
    kana: [
      ["ちゃ", "チャ", "cha", "tya", "cya"],
      ["ちゅ", "チュ", "chu", "tyu", "cyu"],
      ["ちょ", "チョ", "cho", "tyo", "cyo"],
    ],
  },
  {
    id: "ny",
    category: "combo",
    label: "NY-Kombinationen",
    sublabel: "nya · nyu · nyo",
    kana: [
      ["にゃ", "ニャ", "nya"],
      ["にゅ", "ニュ", "nyu"],
      ["にょ", "ニョ", "nyo"],
    ],
  },
  {
    id: "hy",
    category: "combo",
    label: "HY-Kombinationen",
    sublabel: "hya · hyu · hyo",
    kana: [
      ["ひゃ", "ヒャ", "hya"],
      ["ひゅ", "ヒュ", "hyu"],
      ["ひょ", "ヒョ", "hyo"],
    ],
  },
  {
    id: "my",
    category: "combo",
    label: "MY-Kombinationen",
    sublabel: "mya · myu · myo",
    kana: [
      ["みゃ", "ミャ", "mya"],
      ["みゅ", "ミュ", "myu"],
      ["みょ", "ミョ", "myo"],
    ],
  },
  {
    id: "ry",
    category: "combo",
    label: "RY-Kombinationen",
    sublabel: "rya · ryu · ryo",
    kana: [
      ["りゃ", "リャ", "rya"],
      ["りゅ", "リュ", "ryu"],
      ["りょ", "リョ", "ryo"],
    ],
  },
  {
    id: "gy",
    category: "combo",
    label: "GY-Kombinationen",
    sublabel: "gya · gyu · gyo",
    kana: [
      ["ぎゃ", "ギャ", "gya"],
      ["ぎゅ", "ギュ", "gyu"],
      ["ぎょ", "ギョ", "gyo"],
    ],
  },
  {
    id: "j",
    category: "combo",
    label: "J-Kombinationen",
    sublabel: "ja · ju · jo",
    kana: [
      ["じゃ", "ジャ", "ja", "jya", "zya"],
      ["じゅ", "ジュ", "ju", "jyu", "zyu"],
      ["じょ", "ジョ", "jo", "jyo", "zyo"],
    ],
  },
  {
    id: "by",
    category: "combo",
    label: "BY-Kombinationen",
    sublabel: "bya · byu · byo",
    kana: [
      ["びゃ", "ビャ", "bya"],
      ["びゅ", "ビュ", "byu"],
      ["びょ", "ビョ", "byo"],
    ],
  },
  {
    id: "py",
    category: "combo",
    label: "PY-Kombinationen",
    sublabel: "pya · pyu · pyo",
    kana: [
      ["ぴゃ", "ピャ", "pya"],
      ["ぴゅ", "ピュ", "pyu"],
      ["ぴょ", "ピョ", "pyo"],
    ],
  },
];

const CATEGORIES = [
  {
    id: "basic",
    title: "Grundzeichen",
    description: "Die 46 Zeichen des Basisalphabets",
  },
  {
    id: "voiced",
    title: "Dakuten & Handakuten",
    description: "Stimmhafte und halbstimmhafte Reihen",
  },
  {
    id: "combo",
    title: "Kombinationen",
    description: "Laute mit kleinem ゃ, ゅ und ょ",
  },
];

const STORAGE_KEY = "kana-garten-progress-v1";
const DEFAULT_DATA = {
  version: 1,
  kana: {},
  words: {},
  kanji: {},
  kanjiWords: {},
  conversations: {},
  sessions: [],
  wordSessions: [],
  kanjiSessions: [],
  kanjiWordSessions: [],
  conversationSessions: [],
  wordPromptCount: 0,
  kanjiPromptCount: 0,
  kanjiWordPromptCount: 0,
  conversationPromptCount: 0,
  settings: {
    learningMode: "kana",
    mode: "hiragana",
    kanaSentenceMode: false,
    selectedRows: ["vowels"],
    maxWordLevel: "N5",
    selectedWordSets: ["first-contact"],
    includedWordIds: [],
    excludedWordIds: [],
    wordScenarioGroup: "essentials",
    maxKanjiLevel: "N5",
    kanjiSentenceMode: false,
    maxKanjiWordLevel: "N5",
    maxConversationLevel: "N5",
    selectedConversationTopics: ["all"],
    includedConversationIds: [],
    excludedConversationIds: [],
    conversationPracticeMode: "roleplay",
  },
};

const ALL_KANA = GROUPS.flatMap((group) =>
  group.kana.flatMap((entry, index) => {
    const [hiragana, katakana, primary, ...aliases] = entry;
    return [
      {
        id: `hiragana:${group.id}:${index}`,
        script: "hiragana",
        glyph: hiragana,
        primary,
        answers: [primary, ...aliases],
        groupId: group.id,
      },
      {
        id: `katakana:${group.id}:${index}`,
        script: "katakana",
        glyph: katakana,
        primary,
        answers: [primary, ...aliases],
        groupId: group.id,
      },
    ];
  }),
);

const KANA_BY_ID = new Map(ALL_KANA.map((kana) => [kana.id, kana]));
const WORD_BY_ID = new Map(VOCABULARY.map((word) => [word.id, word]));
const KANJI_BY_ID = new Map(KANJI.map((kanji) => [kanji.id, kanji]));
const KANJI_WORD_BY_ID = new Map(
  KANJI_VOCABULARY.map((word) => [word.id, word]),
);
const CONVERSATION_BY_ID = new Map(
  CONVERSATIONS.map((conversation) => [conversation.id, conversation]),
);
const ROMAJI_BY_KANA = new Map(
  ALL_KANA.map((kana) => [kana.glyph, kana.primary]),
);
[
  ["ヴ", "vu"], ["ゔ", "vu"], ["ファ", "fa"], ["フィ", "fi"],
  ["フェ", "fe"], ["フォ", "fo"], ["ティ", "ti"], ["ディ", "di"],
  ["ウィ", "wi"], ["ウェ", "we"], ["ウォ", "wo"], ["シェ", "she"],
  ["ジェ", "je"], ["チェ", "che"], ["ツァ", "tsa"], ["ツィ", "tsi"],
  ["ツェ", "tse"], ["ツォ", "tso"],
].forEach(([glyph, reading]) => ROMAJI_BY_KANA.set(glyph, reading));
const app = document.querySelector("#app");
const guideDialog = document.querySelector("#guide-dialog");
const confirmDialog = document.querySelector("#confirm-dialog");
const THEME_STORAGE_KEY = "kana-garten-theme";
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

let data = loadData();
let state = {
  view: "home",
  learningMode: data.settings.learningMode || "kana",
  mode: data.settings.mode || "hiragana",
  kanaSentenceMode: Boolean(data.settings.kanaSentenceMode),
  maxWordLevel: data.settings.maxWordLevel || "N5",
  selectedWordSets: new Set(data.settings.selectedWordSets || ["first-contact"]),
  includedWordIds: new Set(data.settings.includedWordIds || []),
  excludedWordIds: new Set(data.settings.excludedWordIds || []),
  wordScenarioGroup: data.settings.wordScenarioGroup || "essentials",
  maxKanjiLevel: data.settings.maxKanjiLevel || "N5",
  kanjiSentenceMode: Boolean(data.settings.kanjiSentenceMode),
  maxKanjiWordLevel: data.settings.maxKanjiWordLevel || "N5",
  maxConversationLevel: data.settings.maxConversationLevel || "N5",
  selectedConversationTopics: new Set(
    data.settings.selectedConversationTopics?.length
      ? data.settings.selectedConversationTopics
      : ["all"],
  ),
  includedConversationIds: new Set(
    data.settings.includedConversationIds || [],
  ),
  excludedConversationIds: new Set(
    data.settings.excludedConversationIds || [],
  ),
  conversationPracticeMode:
    data.settings.conversationPracticeMode || "roleplay",
  selectedRows: new Set(data.settings.selectedRows?.length ? data.settings.selectedRows : ["vowels"]),
  session: null,
  lastResult: null,
  timer: null,
};
let pendingConfirmation = null;
let activeMediaRecorder = null;
let activeMediaStream = null;
let recordedAudioUrl = null;
let recordingTimer = null;
let recordingStartedAt = 0;

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function applyTheme(theme, persist = false) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    nextTheme === "dark" ? "#111714" : "#f5f0e8",
  );

  document.querySelectorAll('[data-action="toggle-theme"]').forEach((button) => {
    const isDark = nextTheme === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute(
      "aria-label",
      isDark ? "Hellen Modus aktivieren" : "Dunkelmodus aktivieren",
    );
    button.title = isDark ? "Hellen Modus aktivieren" : "Dunkelmodus aktivieren";
    const icon = button.querySelector(".theme-toggle-icon");
    const label = button.querySelector(".theme-toggle-label");
    if (icon) icon.textContent = isDark ? "☀" : "☾";
    if (label) label.textContent = isDark ? "Hell" : "Dunkel";
  });

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Die Darstellung funktioniert auch, wenn der Browser Speicher blockiert.
    }
  }
  window.Android?.setDarkMode?.(
    nextTheme === "dark",
    persist || Boolean(getSavedTheme()),
  );
}

applyTheme(document.documentElement.dataset.theme || "light");
darkModeQuery.addEventListener("change", (event) => {
  if (!getSavedTheme()) applyTheme(event.matches ? "dark" : "light");
});

function loadData() {
  try {
    let savedProgress = localStorage.getItem(STORAGE_KEY);
    if (!savedProgress && window.Android?.restoreProgress) {
      savedProgress = window.Android.restoreProgress();
      if (savedProgress) localStorage.setItem(STORAGE_KEY, savedProgress);
    }
    const parsed = JSON.parse(savedProgress);
    if (!parsed || parsed.version !== 1) return structuredClone(DEFAULT_DATA);
    const restored = {
      ...structuredClone(DEFAULT_DATA),
      ...parsed,
      kana: parsed.kana || {},
      words: parsed.words || {},
      kanji: parsed.kanji || {},
      kanjiWords: parsed.kanjiWords || {},
      conversations: parsed.conversations || {},
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      wordSessions: Array.isArray(parsed.wordSessions) ? parsed.wordSessions : [],
      kanjiSessions: Array.isArray(parsed.kanjiSessions) ? parsed.kanjiSessions : [],
      kanjiWordSessions: Array.isArray(parsed.kanjiWordSessions)
        ? parsed.kanjiWordSessions
        : [],
      conversationSessions: Array.isArray(parsed.conversationSessions)
        ? parsed.conversationSessions
        : [],
      settings: {
        ...DEFAULT_DATA.settings,
        ...(parsed.settings || {}),
      },
    };
    migrateReviewSchedule(restored);
    return restored;
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

function migrateReviewSchedule(progress) {
  const now = Date.now();
  const groups = [
    ["kana", 1],
    ["words", 3],
    ["kanji", 3],
    ["kanjiWords", 3],
    ["conversations", 3],
  ];
  groups.forEach(([group, minimumStrength]) => {
    Object.values(progress[group] || {}).forEach((stat) => {
      const peak = Math.max(
        Number(stat.peakStrength || 0),
        Number(stat.strength || 0),
      );
      if (peak >= minimumStrength && !Number(stat.nextReviewAt || 0)) {
        stat.nextReviewAt = now;
      }
    });
  });
}

function saveData() {
  data.settings.learningMode = state.learningMode;
  data.settings.mode = state.mode;
  data.settings.kanaSentenceMode = state.kanaSentenceMode;
  data.settings.selectedRows = [...state.selectedRows];
  data.settings.maxWordLevel = state.maxWordLevel;
  data.settings.selectedWordSets = [...state.selectedWordSets];
  data.settings.includedWordIds = [...state.includedWordIds];
  data.settings.excludedWordIds = [...state.excludedWordIds];
  data.settings.wordScenarioGroup = state.wordScenarioGroup;
  data.settings.maxKanjiLevel = state.maxKanjiLevel;
  data.settings.kanjiSentenceMode = state.kanjiSentenceMode;
  data.settings.maxKanjiWordLevel = state.maxKanjiWordLevel;
  data.settings.maxConversationLevel = state.maxConversationLevel;
  data.settings.selectedConversationTopics = [
    ...state.selectedConversationTopics,
  ];
  data.settings.includedConversationIds = [
    ...state.includedConversationIds,
  ];
  data.settings.excludedConversationIds = [
    ...state.excludedConversationIds,
  ];
  data.settings.conversationPracticeMode = state.conversationPracticeMode;
  const serialized = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, serialized);
  window.Android?.backupProgress?.(serialized);
  window.Android?.backupJlptProgress?.(JSON.stringify(getJlptProgress()));
}

function notifyAndroidSession(kind, durationSeconds, itemCount) {
  window.Android?.recordSession?.(kind, durationSeconds, itemCount);
}

function notifyAndroidLearningState() {
  window.Android?.setLearningActive?.(
    document.body.classList.contains("is-quizzing"),
  );
}

new MutationObserver(notifyAndroidLearningState).observe(document.body, {
  attributes: true,
  attributeFilter: ["class"],
});
notifyAndroidLearningState();

function normalizeRomaji(value) {
  return value.trim().toLowerCase().replaceAll("’", "'").replace(/\s+/g, "");
}

function normalizeGerman(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[.,!?;:()[\]"“”„']/g, "")
    .replace(/\s+/g, " ")
    .replace(/^(der|die|das|ein|eine)\s+/, "");
}

function stableTextHash(value) {
  return [...value].reduce(
    (hash, character) => (hash * 31 + character.codePointAt(0)) >>> 0,
    7,
  );
}

function highlightTarget(value, target) {
  return value
    .split(target)
    .join(`<mark class="sentence-target" aria-label="Zielzeichen ${target}">${target}</mark>`);
}

function romanizeKana(value) {
  const characters = [...value];
  let result = "";
  let doubleNextConsonant = false;
  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index];
    if (character === "っ" || character === "ッ") {
      doubleNextConsonant = true;
      continue;
    }
    if (character === "ー") {
      const vowel = result.match(/[aeiou](?=[^aeiou]*$)/)?.[0];
      if (vowel) result += vowel;
      continue;
    }
    const pair = characters.slice(index, index + 2).join("");
    let reading = ROMAJI_BY_KANA.get(pair);
    if (reading) index += 1;
    else reading = ROMAJI_BY_KANA.get(character);
    if (!reading) {
      result += character;
      doubleNextConsonant = false;
      continue;
    }
    if (doubleNextConsonant) {
      const consonant = reading.match(/^(ch|sh|ts|[bcdfghjklmpqrstvwxyz])/i)?.[0];
      if (consonant) result += consonant === "ch" ? "t" : consonant[0];
      doubleNextConsonant = false;
    }
    result += reading;
  }
  return result;
}

function getKanaSentenceContext(kana) {
  const seen = Number(data.kana[kana.id]?.seen || 0);
  const candidates = VOCABULARY.filter((word) => word.kana.includes(kana.glyph))
    .sort((a, b) => a.frequency - b.frequency);
  if (!candidates.length) {
    return {
      japanese: `「${highlightTarget(kana.glyph, kana.glyph)}」のおとをれんしゅうします。`,
      reading: `„${kana.primary}“ no oto o renshuu shimasu.`,
      german: `Ich übe den Laut „${kana.primary}“ im Satz.`,
    };
  }

  const word = candidates[(stableTextHash(kana.id) + seen) % candidates.length];
  const markedWord = highlightTarget(word.kana, kana.glyph);
  const reading = romanizeKana(word.kana);
  const templates = [
    {
      japanese: `これは「${markedWord}」です。`,
      reading: `Kore wa „${reading}“ desu.`,
      german: `Das ist „${word.primary}“.`,
    },
    {
      japanese: `「${markedWord}」をおぼえます。`,
      reading: `„${reading}“ o oboemasu.`,
      german: `Ich lerne „${word.primary}“.`,
    },
    {
      japanese: `マンガで「${markedWord}」をみました。`,
      reading: `Manga de „${reading}“ o mimashita.`,
      german: `Ich habe „${word.primary}“ im Manga gesehen.`,
    },
    {
      japanese: `「${markedWord}」といいます。`,
      reading: `„${reading}“ to iimasu.`,
      german: `Man sagt „${word.primary}“.`,
    },
  ];
  return templates[(stableTextHash(word.id) + seen) % templates.length];
}

function getKanjiSentenceContext(kanji) {
  const seen = Number(data.kanji[kanji.id]?.seen || 0);
  const candidates = KANJI_VOCABULARY.filter((word) =>
    word.spelling.includes(kanji.character),
  ).sort((a, b) => a.frequency - b.frequency);
  const candidate = candidates[(stableTextHash(kanji.id) + seen) % Math.max(1, candidates.length)];
  const exampleMatch = kanji.example.match(/^([^（]+)（([^）]+)）/);
  const spelling = candidate?.spelling || exampleMatch?.[1] || kanji.character;
  const reading = candidate?.reading || exampleMatch?.[2] || kanji.readings.split("・")[0];
  const meaning = candidate?.primary || kanji.primary;
  const markedWord = highlightTarget(spelling, kanji.character);
  const templates = [
    {
      japanese: `マンガで「${markedWord}」という言葉を見ました。`,
      reading: `マンガで「${reading}」ということばをみました。`,
      german: `Ich habe das Wort „${meaning}“ in einem Manga gesehen.`,
    },
    {
      japanese: `今日は「${markedWord}」を覚えます。`,
      reading: `きょうは「${reading}」をおぼえます。`,
      german: `Heute lerne ich „${meaning}“.`,
    },
    {
      japanese: `「${markedWord}」の意味が分かりますか。`,
      reading: `「${reading}」のいみがわかりますか。`,
      german: `Verstehst du die Bedeutung von „${meaning}“?`,
    },
    {
      japanese: `先生が「${markedWord}」と書きました。`,
      reading: `せんせいが「${reading}」とかきました。`,
      german: `Die Lehrperson hat „${meaning}“ geschrieben.`,
    },
  ];
  return templates[(stableTextHash(spelling) + seen) % templates.length];
}

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getItemsForSelection() {
  const scripts =
    state.mode === "mixed" ? ["hiragana", "katakana"] : [state.mode];
  return ALL_KANA.filter(
    (kana) => scripts.includes(kana.script) && state.selectedRows.has(kana.groupId),
  );
}

function getLevelEligibleWords() {
  const maxIndex = WORD_LEVELS.findIndex((level) => level.id === state.maxWordLevel);
  return VOCABULARY.filter((word) => word.levelIndex <= maxIndex).sort(
    (a, b) => a.frequency - b.frequency,
  );
}

function getWordsForSet(setId, respectLevel = true) {
  const set = VOCABULARY_SETS.find((entry) => entry.id === setId);
  if (!set) return [];
  const maxIndex = WORD_LEVELS.findIndex((level) => level.id === state.maxWordLevel);
  return set.wordIds
    .map((id) => WORD_BY_ID.get(id))
    .filter((word) => word && (!respectLevel || word.levelIndex <= maxIndex));
}

function getSelectedWordIdSet() {
  const selected = new Set(state.includedWordIds);
  state.selectedWordSets.forEach((setId) => {
    getWordsForSet(setId).forEach((word) => selected.add(word.id));
  });
  state.excludedWordIds.forEach((id) => selected.delete(id));
  return selected;
}

function wordSelectionPriority(word) {
  const selectedRanks = [...state.selectedWordSets]
    .map((setId) => word.setRanks?.[setId])
    .filter(Number.isFinite);
  const scenarioRank = selectedRanks.length ? Math.min(...selectedRanks) : 999;
  return word.levelIndex * 10_000 + scenarioRank * 100 + word.frequency;
}

function getEligibleWords() {
  const selectedIds = getSelectedWordIdSet();
  return getLevelEligibleWords()
    .filter((word) => selectedIds.has(word.id))
    .sort((a, b) => wordSelectionPriority(a) - wordSelectionPriority(b));
}

function getGlobalReviewWords(dueOnly = true) {
  return VOCABULARY
    .filter((word) => {
      const stat = data.words[word.id];
      if (!stat || Number(stat.peakStrength || 0) < 3) return false;
      return !dueOnly || isWordReviewDue(word);
    })
    .sort((a, b) => {
      const aStat = data.words[a.id] || {};
      const bStat = data.words[b.id] || {};
      const dueDifference =
        Number(aStat.nextReviewAt || aStat.lastPracticed || 0) -
        Number(bStat.nextReviewAt || bStat.lastPracticed || 0);
      if (dueDifference) return dueDifference;
      return wordDifficultyScore(b.id) - wordDifficultyScore(a.id);
    });
}

function getWordStrength(wordId) {
  return Number(data.words[wordId]?.strength || 0);
}

function getWordStats() {
  const eligible = getEligibleWords();
  const stats = eligible.map((word) => data.words[word.id]).filter(Boolean);
  const learned = eligible.filter((word) => getWordStrength(word.id) >= 3).length;
  const seen = stats.reduce((sum, stat) => sum + (stat.seen || 0), 0);
  const correct = stats.reduce((sum, stat) => sum + (stat.correct || 0), 0);
  const reviewDue = getGlobalReviewWords().length;
  return {
    total: eligible.length,
    learned,
    seen,
    correct,
    accuracy: formatPercent(correct, seen),
    reviewDue,
  };
}

function getWordLevelStats(levelId) {
  const words = VOCABULARY.filter((word) => word.level === levelId);
  const learned = words.filter((word) => getWordStrength(word.id) >= 3).length;
  const seen = words.filter((word) => Number(data.words[word.id]?.seen || 0) > 0).length;
  return { total: words.length, learned, seen };
}

function wordDifficultyScore(wordId) {
  const stat = data.words[wordId];
  if (!stat || Number(stat.wrong || 0) === 0) return 0;
  const seen = Math.max(1, Number(stat.seen || 0));
  const errorRate = Number(stat.wrong || 0) / seen;
  const strengthGap = Math.max(0, 3 - Number(stat.strength || 0));
  return errorRate * 2 + Math.min(1.2, Number(stat.wrong || 0) * 0.18) + strengthGap * 0.22;
}

function getHardWords(limit = 20) {
  return VOCABULARY
    .filter((word) => wordDifficultyScore(word.id) >= 0.75)
    .sort((a, b) => {
      const scoreDifference = wordDifficultyScore(b.id) - wordDifficultyScore(a.id);
      if (scoreDifference) return scoreDifference;
      return Number(data.words[b.id]?.wrong || 0) - Number(data.words[a.id]?.wrong || 0);
    })
    .slice(0, limit);
}

function getEligibleKanjiWords() {
  const maxIndex = KANJI_WORD_LEVELS.findIndex(
    (level) => level.id === state.maxKanjiWordLevel,
  );
  return KANJI_VOCABULARY.filter((word) => word.levelIndex <= maxIndex).sort(
    (a, b) => a.frequency - b.frequency,
  );
}

function getKanjiWordStrength(wordId) {
  return Number(data.kanjiWords[wordId]?.strength || 0);
}

function getKanjiWordLevelStats(levelId) {
  const words = KANJI_VOCABULARY.filter((word) => word.level === levelId);
  const learned = words.filter(
    (word) => getKanjiWordStrength(word.id) >= 3,
  ).length;
  const seen = words.filter(
    (word) => Number(data.kanjiWords[word.id]?.seen || 0) > 0,
  ).length;
  return { total: words.length, learned, seen };
}

function isKanjiWordReviewDue(word) {
  const stat = data.kanjiWords[word.id];
  if (!stat || Number(stat.peakStrength || 0) < 3) return false;
  if (stat.nextReviewAt) return Date.now() >= Number(stat.nextReviewAt);
  return (
    Number(data.kanjiWordPromptCount || 0) - Number(stat.lastPrompt || 0) >=
    reviewInterval(stat.strength)
  );
}

function getGlobalKanjiWordReviews(dueOnly = true) {
  return KANJI_VOCABULARY.filter((word) => {
    const stat = data.kanjiWords[word.id];
    if (!stat || Number(stat.peakStrength || 0) < 3) return false;
    return !dueOnly || isKanjiWordReviewDue(word);
  }).sort(
    (a, b) =>
      Number(data.kanjiWords[a.id]?.nextReviewAt || 0) -
      Number(data.kanjiWords[b.id]?.nextReviewAt || 0),
  );
}

function getKanjiWordStats() {
  const eligible = getEligibleKanjiWords();
  const stats = eligible
    .map((word) => data.kanjiWords[word.id])
    .filter(Boolean);
  const learned = eligible.filter(
    (word) => getKanjiWordStrength(word.id) >= 3,
  ).length;
  const seen = stats.reduce((sum, stat) => sum + (stat.seen || 0), 0);
  const correct = stats.reduce((sum, stat) => sum + (stat.correct || 0), 0);
  const reviewDue = getGlobalKanjiWordReviews().length;
  return {
    total: eligible.length,
    learned,
    seen,
    correct,
    accuracy: formatPercent(correct, seen),
    reviewDue,
  };
}

function recordKanjiWordAttempt(word, wasCorrect) {
  data.kanjiWordPromptCount = Number(data.kanjiWordPromptCount || 0) + 1;
  const stat = data.kanjiWords[word.id] || {
    seen: 0,
    correct: 0,
    wrong: 0,
    strength: 0,
    peakStrength: 0,
  };
  stat.seen += 1;
  stat.lastPracticed = Date.now();
  stat.lastPrompt = data.kanjiWordPromptCount;
  if (wasCorrect) {
    stat.correct += 1;
    stat.strength = Math.min(10, Number(stat.strength || 0) + 1);
    stat.peakStrength = Math.max(stat.peakStrength || 0, stat.strength);
  } else {
    stat.wrong += 1;
    stat.strength = Math.max(0, Number(stat.strength || 0) - 1);
  }
  updateNextReview(stat, wasCorrect);
  data.kanjiWords[word.id] = stat;
  saveData();
  return stat.strength;
}

function kanjiWordDifficultyScore(wordId) {
  const stat = data.kanjiWords[wordId];
  if (!stat || Number(stat.wrong || 0) === 0) return 0;
  const seen = Math.max(1, Number(stat.seen || 0));
  const errorRate = Number(stat.wrong || 0) / seen;
  const strengthGap = Math.max(0, 3 - Number(stat.strength || 0));
  return (
    errorRate * 2 +
    Math.min(1.2, Number(stat.wrong || 0) * 0.18) +
    strengthGap * 0.22
  );
}

function getHardKanjiWords(limit = 20) {
  return getEligibleKanjiWords()
    .filter((word) => kanjiWordDifficultyScore(word.id) >= 0.75)
    .sort((a, b) => {
      const scoreDifference =
        kanjiWordDifficultyScore(b.id) - kanjiWordDifficultyScore(a.id);
      if (scoreDifference) return scoreDifference;
      return (
        Number(data.kanjiWords[b.id]?.wrong || 0) -
        Number(data.kanjiWords[a.id]?.wrong || 0)
      );
    })
    .slice(0, limit);
}

function getLevelEligibleConversations() {
  const maxIndex = CONVERSATION_LEVELS.findIndex(
    (level) => level.id === state.maxConversationLevel,
  );
  return CONVERSATIONS.filter(
    (conversation) => conversation.levelIndex <= Math.max(0, maxIndex),
  ).sort((a, b) => a.frequency - b.frequency);
}

function getSelectedConversationIdSet() {
  const levelEligible = getLevelEligibleConversations();
  const selected = new Set(state.includedConversationIds);
  if (state.selectedConversationTopics.has("all")) {
    levelEligible.forEach((conversation) => selected.add(conversation.id));
  } else {
    levelEligible
      .filter((conversation) =>
        state.selectedConversationTopics.has(conversation.topic),
      )
      .forEach((conversation) => selected.add(conversation.id));
  }
  state.excludedConversationIds.forEach((id) => selected.delete(id));
  return selected;
}

function getEligibleConversations() {
  const selectedIds = getSelectedConversationIdSet();
  return getLevelEligibleConversations().filter((conversation) =>
    selectedIds.has(conversation.id),
  );
}

function getConversationStrength(conversationId) {
  return Number(data.conversations[conversationId]?.strength || 0);
}

function getConversationLevelStats(levelId) {
  const conversations = CONVERSATIONS.filter(
    (conversation) => conversation.level === levelId,
  );
  return {
    total: conversations.length,
    learned: conversations.filter(
      (conversation) => getConversationStrength(conversation.id) >= 3,
    ).length,
    seen: conversations.filter(
      (conversation) =>
        Number(data.conversations[conversation.id]?.seen || 0) > 0,
    ).length,
  };
}

function isConversationReviewDue(conversation) {
  const stat = data.conversations[conversation.id];
  if (!stat || Number(stat.peakStrength || 0) < 3) return false;
  if (stat.nextReviewAt) return Date.now() >= Number(stat.nextReviewAt);
  return (
    Number(data.conversationPromptCount || 0) -
      Number(stat.lastPrompt || 0) >=
    reviewInterval(stat.strength)
  );
}

function getGlobalConversationReviews(dueOnly = true) {
  return CONVERSATIONS.filter((conversation) => {
    const stat = data.conversations[conversation.id];
    if (!stat || Number(stat.peakStrength || 0) < 3) return false;
    return !dueOnly || isConversationReviewDue(conversation);
  }).sort((a, b) => {
    const aStat = data.conversations[a.id] || {};
    const bStat = data.conversations[b.id] || {};
    const dueDifference =
      Number(aStat.nextReviewAt || aStat.lastPracticed || 0) -
      Number(bStat.nextReviewAt || bStat.lastPracticed || 0);
    if (dueDifference) return dueDifference;
    return conversationDifficultyScore(b.id) - conversationDifficultyScore(a.id);
  });
}

function getConversationStats() {
  const eligible = getEligibleConversations();
  const stats = eligible
    .map((conversation) => data.conversations[conversation.id])
    .filter(Boolean);
  const learned = eligible.filter(
    (conversation) => getConversationStrength(conversation.id) >= 3,
  ).length;
  const seen = stats.reduce((sum, stat) => sum + Number(stat.seen || 0), 0);
  const correct = stats.reduce(
    (sum, stat) => sum + Number(stat.correct || 0),
    0,
  );
  return {
    total: eligible.length,
    learned,
    seen,
    correct,
    accuracy: formatPercent(correct, seen),
    reviewDue: getGlobalConversationReviews().length,
  };
}

function recordConversationAttempt(conversation, rating) {
  const wasConfident = rating >= 3;
  data.conversationPromptCount =
    Number(data.conversationPromptCount || 0) + 1;
  const stat = data.conversations[conversation.id] || {
    seen: 0,
    correct: 0,
    wrong: 0,
    strength: 0,
    peakStrength: 0,
    partial: 0,
    scoreSum: 0,
  };
  stat.seen += 1;
  stat.scoreSum = Number(stat.scoreSum || 0) + rating;
  stat.lastPracticed = Date.now();
  stat.lastPrompt = data.conversationPromptCount;
  if (wasConfident) {
    stat.correct += 1;
    stat.strength = Math.min(10, Number(stat.strength || 0) + 1);
    stat.peakStrength = Math.max(
      Number(stat.peakStrength || 0),
      stat.strength,
    );
  } else if (rating === 2) {
    stat.partial = Number(stat.partial || 0) + 1;
  } else {
    stat.wrong += 1;
    stat.strength = Math.max(0, Number(stat.strength || 0) - 1);
  }
  updateNextReview(stat, wasConfident);
  data.conversations[conversation.id] = stat;
  saveData();
  return stat.strength;
}

function conversationDifficultyScore(conversationId) {
  const stat = data.conversations[conversationId];
  if (!stat || Number(stat.wrong || 0) === 0) return 0;
  const seen = Math.max(1, Number(stat.seen || 0));
  const errorRate = Number(stat.wrong || 0) / seen;
  const strengthGap = Math.max(0, 3 - Number(stat.strength || 0));
  return (
    errorRate * 2 +
    Math.min(1.2, Number(stat.wrong || 0) * 0.18) +
    strengthGap * 0.22
  );
}

function getHardConversations(limit = 20) {
  return getEligibleConversations()
    .filter(
      (conversation) => conversationDifficultyScore(conversation.id) >= 0.75,
    )
    .sort((a, b) => {
      const scoreDifference =
        conversationDifficultyScore(b.id) -
        conversationDifficultyScore(a.id);
      if (scoreDifference) return scoreDifference;
      return (
        Number(data.conversations[b.id]?.wrong || 0) -
        Number(data.conversations[a.id]?.wrong || 0)
      );
    })
    .slice(0, limit);
}

function reviewInterval(strength) {
  if (strength >= 5) return 30;
  if (strength >= 4) return 18;
  return 8;
}

function spacedReviewDelay(strength) {
  const day = 24 * 60 * 60 * 1000;
  if (strength >= 10) return 120 * day;
  if (strength >= 9) return 60 * day;
  if (strength >= 8) return 30 * day;
  if (strength >= 7) return 14 * day;
  if (strength >= 6) return 7 * day;
  if (strength >= 5) return 3 * day;
  if (strength >= 4) return day;
  return 4 * 60 * 60 * 1000;
}

function kanaReviewDelay(strength) {
  if (strength <= 1) return 10 * 60 * 1000;
  if (strength === 2) return 60 * 60 * 1000;
  return spacedReviewDelay(strength);
}

function updateNextReview(stat, wasCorrect) {
  if (wasCorrect && Number(stat.strength || 0) >= 3) {
    stat.nextReviewAt = Date.now() + spacedReviewDelay(stat.strength);
  } else if (!wasCorrect && Number(stat.peakStrength || 0) >= 3) {
    stat.nextReviewAt = Date.now() + 10 * 60 * 1000;
  }
}

function updateKanaNextReview(stat, wasCorrect) {
  if (wasCorrect && Number(stat.strength || 0) >= 1) {
    stat.nextReviewAt = Date.now() + kanaReviewDelay(stat.strength);
  } else if (!wasCorrect && Number(stat.peakStrength || 0) >= 1) {
    stat.nextReviewAt = Date.now() + 10 * 60 * 1000;
  }
}

function isWordReviewDue(word) {
  const stat = data.words[word.id];
  if (!stat || Number(stat.peakStrength || 0) < 3) return false;
  if (stat.nextReviewAt) return Date.now() >= Number(stat.nextReviewAt);
  return Number(data.wordPromptCount || 0) - Number(stat.lastPrompt || 0) >= reviewInterval(stat.strength);
}

function recordWordAttempt(word, wasCorrect) {
  data.wordPromptCount = Number(data.wordPromptCount || 0) + 1;
  const stat = data.words[word.id] || {
    seen: 0,
    correct: 0,
    wrong: 0,
    strength: 0,
    peakStrength: 0,
  };
  stat.seen += 1;
  stat.lastPracticed = Date.now();
  stat.lastPrompt = data.wordPromptCount;
  if (wasCorrect) {
    stat.correct += 1;
    stat.strength = Math.min(10, Number(stat.strength || 0) + 1);
    stat.peakStrength = Math.max(stat.peakStrength || 0, stat.strength);
  } else {
    stat.wrong += 1;
    stat.strength = Math.max(0, Number(stat.strength || 0) - 1);
  }
  updateNextReview(stat, wasCorrect);
  data.words[word.id] = stat;
  saveData();
  return stat.strength;
}

function getEligibleKanji() {
  const maxIndex = KANJI_LEVELS.findIndex(
    (level) => level.id === state.maxKanjiLevel,
  );
  return KANJI.filter((kanji) => kanji.levelIndex <= maxIndex).sort(
    (a, b) => a.frequency - b.frequency,
  );
}

function getKanjiStrength(kanjiId) {
  return Number(data.kanji[kanjiId]?.strength || 0);
}

function isKanjiReviewDue(kanji) {
  const stat = data.kanji[kanji.id];
  if (!stat || Number(stat.peakStrength || 0) < 3) return false;
  if (stat.nextReviewAt) return Date.now() >= Number(stat.nextReviewAt);
  return (
    Number(data.kanjiPromptCount || 0) - Number(stat.lastPrompt || 0) >=
    reviewInterval(stat.strength)
  );
}

function getGlobalKanjiReviews(dueOnly = true) {
  return KANJI.filter((kanji) => {
    const stat = data.kanji[kanji.id];
    if (!stat || Number(stat.peakStrength || 0) < 3) return false;
    return !dueOnly || isKanjiReviewDue(kanji);
  }).sort(
    (a, b) =>
      Number(data.kanji[a.id]?.nextReviewAt || 0) -
      Number(data.kanji[b.id]?.nextReviewAt || 0),
  );
}

function getKanjiStats() {
  const eligible = getEligibleKanji();
  const stats = eligible.map((kanji) => data.kanji[kanji.id]).filter(Boolean);
  const learned = eligible.filter(
    (kanji) => getKanjiStrength(kanji.id) >= 3,
  ).length;
  const seen = stats.reduce((sum, stat) => sum + (stat.seen || 0), 0);
  const correct = stats.reduce((sum, stat) => sum + (stat.correct || 0), 0);
  const reviewDue = getGlobalKanjiReviews().length;
  return {
    total: eligible.length,
    learned,
    seen,
    correct,
    accuracy: formatPercent(correct, seen),
    reviewDue,
  };
}

function recordKanjiAttempt(kanji, wasCorrect) {
  data.kanjiPromptCount = Number(data.kanjiPromptCount || 0) + 1;
  const stat = data.kanji[kanji.id] || {
    seen: 0,
    correct: 0,
    wrong: 0,
    strength: 0,
    peakStrength: 0,
  };
  stat.seen += 1;
  stat.lastPracticed = Date.now();
  stat.lastPrompt = data.kanjiPromptCount;
  if (wasCorrect) {
    stat.correct += 1;
    stat.strength = Math.min(10, Number(stat.strength || 0) + 1);
    stat.peakStrength = Math.max(stat.peakStrength || 0, stat.strength);
  } else {
    stat.wrong += 1;
    stat.strength = Math.max(0, Number(stat.strength || 0) - 1);
  }
  updateNextReview(stat, wasCorrect);
  data.kanji[kanji.id] = stat;
  saveData();
  return stat.strength;
}

function difficultyScore(kanaId) {
  const stat = data.kana[kanaId];
  if (!stat) return 0;
  return Number(stat.difficulty || 0);
}

function getHardItems(limit = 20) {
  return ALL_KANA.filter((kana) => difficultyScore(kana.id) >= 0.7)
    .sort((a, b) => {
      const scoreDifference = difficultyScore(b.id) - difficultyScore(a.id);
      if (scoreDifference) return scoreDifference;
      return (data.kana[b.id]?.wrong || 0) - (data.kana[a.id]?.wrong || 0);
    })
    .slice(0, limit);
}

function isKanaReviewDue(kana) {
  const stat = data.kana[kana.id];
  return Boolean(
    stat &&
      Number(stat.peakStrength || 0) >= 1 &&
      Number(stat.nextReviewAt || 0) <= Date.now(),
  );
}

function getGlobalKanaReviews(dueOnly = true) {
  return ALL_KANA.filter((kana) => {
    const stat = data.kana[kana.id];
    if (!stat || Number(stat.peakStrength || 0) < 1) return false;
    return !dueOnly || isKanaReviewDue(kana);
  }).sort((a, b) => {
    const dueDifference =
      Number(data.kana[a.id]?.nextReviewAt || 0) -
      Number(data.kana[b.id]?.nextReviewAt || 0);
    if (dueDifference) return dueDifference;
    return difficultyScore(b.id) - difficultyScore(a.id);
  });
}

function recordAttempt(kana, wasCorrect) {
  const previous = data.kana[kana.id] || {
    seen: 0,
    correct: 0,
    wrong: 0,
    difficulty: 0,
    peakDifficulty: 0,
    strength: 0,
    peakStrength: 0,
    recent: [],
  };
  previous.seen += 1;
  previous.lastPracticed = Date.now();
  previous.recent = [...(previous.recent || []), wasCorrect].slice(-8);

  if (wasCorrect) {
    previous.correct += 1;
    previous.difficulty = Math.max(0, Number(previous.difficulty || 0) - 0.45);
    previous.strength = Math.min(10, Number(previous.strength || 0) + 1);
    previous.peakStrength = Math.max(
      Number(previous.peakStrength || 0),
      previous.strength,
    );
  } else {
    previous.wrong += 1;
    previous.difficulty = Number(previous.difficulty || 0) + 2;
    previous.peakDifficulty = Math.max(previous.peakDifficulty || 0, previous.difficulty);
    previous.strength = Math.max(0, Number(previous.strength || 0) - 1);
  }

  updateKanaNextReview(previous, wasCorrect);

  data.kana[kana.id] = previous;
  saveData();
}

function formatPercent(numerator, denominator) {
  if (!denominator) return "—";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function getStreak() {
  const practiceDays = new Set(
    [
      ...data.sessions,
      ...data.wordSessions,
      ...data.kanjiSessions,
      ...data.kanjiWordSessions,
      ...data.conversationSessions,
    ].map(
      (session) => session.date,
    ),
  );
  if (!practiceDays.size) return 0;
  const today = new Date();
  let cursor = practiceDays.has(localDateKey(today)) ? today : addDays(today, -1);
  let streak = 0;
  while (practiceDays.has(localDateKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function getGlobalStats() {
  const stats = Object.values(data.kana);
  const learned = stats.filter((stat) => stat.correct > 0).length;
  const correct = stats.reduce((sum, stat) => sum + (stat.correct || 0), 0);
  const seen = stats.reduce((sum, stat) => sum + (stat.seen || 0), 0);
  return {
    learned,
    correct,
    seen,
    accuracy: formatPercent(correct, seen),
    streak: getStreak(),
    reviewDue: getGlobalKanaReviews().length,
  };
}

function getReviewOverview() {
  const areas = [
    { id: "kana", label: "Kana", glyph: "あ", count: getGlobalKanaReviews().length },
    { id: "words", label: "Kana-Wörter", glyph: "こと", count: getGlobalReviewWords().length },
    { id: "kanji", label: "Kanji", glyph: "漢", count: getGlobalKanjiReviews().length },
    { id: "kanji-words", label: "Kanji-Wörter", glyph: "熟語", count: getGlobalKanjiWordReviews().length },
    { id: "conversation", label: "Gespräche", glyph: "会話", count: getGlobalConversationReviews().length },
  ];
  return {
    areas,
    total: areas.reduce((sum, area) => sum + area.count, 0),
  };
}

function getJlptProgress() {
  const levels = ["N5", "N4", "N3", "N2", "N1"];
  const domains = [
    { items: VOCABULARY, stats: data.words },
    { items: KANJI_VOCABULARY, stats: data.kanjiWords },
    { items: KANJI, stats: data.kanji },
    { items: CONVERSATIONS, stats: data.conversations },
  ];
  const calculate = (targetIndex) => {
    const domainResults = domains.map(({ items, stats }) => {
      const eligible = items.filter((item) => item.levelIndex <= targetIndex);
      const learned = eligible.filter(
        (item) => Number(stats[item.id]?.strength || 0) >= 3,
      ).length;
      return {
        learned,
        total: eligible.length,
        ratio: eligible.length ? learned / eligible.length : 0,
      };
    });
    const average =
      domainResults.reduce((sum, domain) => sum + domain.ratio, 0) /
      domainResults.length;
    return {
      target: levels[targetIndex],
      percent: Math.round(average * 100),
      learned: domainResults.reduce((sum, domain) => sum + domain.learned, 0),
      total: domainResults.reduce((sum, domain) => sum + domain.total, 0),
      mastered: domainResults.every(
        (domain) => domain.total > 0 && domain.learned === domain.total,
      ),
      complete: false,
    };
  };

  for (let targetIndex = 0; targetIndex < levels.length; targetIndex += 1) {
    const result = calculate(targetIndex);
    if (!result.mastered) return result;
  }
  return { ...calculate(levels.length - 1), complete: true };
}

function getAndroidDashboardPreferences() {
  if (!window.Android?.getDashboardPreferences) return null;
  try {
    return JSON.parse(window.Android.getDashboardPreferences());
  } catch {
    return null;
  }
}

function renderOptionalGoalDashboard() {
  const preferences = getAndroidDashboardPreferences();
  const jlpt = getJlptProgress();
  window.Android?.backupJlptProgress?.(JSON.stringify(jlpt));
  if (!preferences) return "";

  const cards = [];
  if (preferences.dailyGoalEnabled && preferences.showDailyGoal) {
    const goalMinutes = Math.max(5, Number(preferences.dailyGoalMinutes || 20));
    const learnedSeconds = Math.max(0, Number(preferences.todaySeconds || 0));
    const learnedMinutes = Math.round(learnedSeconds / 60);
    const targetSeconds = goalMinutes * 60;
    const percentage = Math.min(100, Math.round((learnedSeconds / targetSeconds) * 100));
    const remaining = Math.max(0, Math.ceil((targetSeconds - learnedSeconds) / 60));
    const extra = Math.max(0, Math.floor((learnedSeconds - targetSeconds) / 60));
    const status = learnedSeconds >= targetSeconds
      ? extra
        ? `Ziel erreicht · ${extra} Min darüber`
        : "Tagesziel erreicht"
      : `${remaining} ${remaining === 1 ? "Minute fehlt" : "Minuten fehlen"}`;
    cards.push(`
      <article class="optional-goal-card daily-goal-card">
        <div class="optional-goal-heading"><span>Tagesziel</span><strong>${learnedMinutes} / ${goalMinutes} Min</strong></div>
        <div class="optional-progress" role="progressbar" aria-label="Tägliches Lernzeitziel" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}"><i style="--goal-progress: ${percentage}%"></i></div>
        <small>${status}. Du kannst unbegrenzt weiterlernen.</small>
      </article>
    `);
  }
  if (preferences.showJlptProgress) {
    cards.push(`
      <article class="optional-goal-card jlpt-goal-card">
        <div class="optional-goal-heading"><span>${jlpt.complete ? "JLPT-App-Pfad" : `Nächstes Ziel · JLPT ${jlpt.target}`}</span><strong>${jlpt.percent}%</strong></div>
        <div class="optional-progress" role="progressbar" aria-label="Fortschritt zum JLPT ${jlpt.target}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${jlpt.percent}"><i style="--goal-progress: ${jlpt.percent}%"></i></div>
        <small>${jlpt.learned} von ${jlpt.total} Inhalten sicher · App-Lernstand, keine offizielle Prüfungsprognose.</small>
      </article>
    `);
  }
  return cards.length
    ? `<section class="optional-goal-dashboard" aria-label="Persönliche Lernziele">${cards.join("")}</section>`
    : "";
}

function renderReviewOverview() {
  const reviews = getReviewOverview();
  return `
    <section class="review-overview${reviews.total ? " has-due" : ""}" aria-label="Fällige Langzeit-Wiederholungen">
      <div class="review-overview-copy">
        <span aria-hidden="true">↻</span>
        <div><strong>${reviews.total ? `${reviews.total} Wiederholungen sind fällig` : "Dein Gedächtnis ist frisch"}</strong><small>${reviews.total ? "Wähle einen Bereich für eine kurze Wiederholungsrunde." : "Neue Termine erscheinen automatisch mit wachsenden Abständen."}</small></div>
      </div>
      <div class="review-overview-actions">
        ${reviews.areas
          .map(
            (area) => `
              <button type="button" data-action="start-area-review" data-review-area="${area.id}" ${area.count ? "" : "disabled"}>
                <span lang="ja">${area.glyph}</span><strong>${area.count}</strong><small>${area.label}</small>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function checkIcon() {
  return `
    <svg viewBox="0 0 16 13" aria-hidden="true">
      <path d="m2 6.5 3.4 3.4L14 2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function renderMnemonicVisual(kana, mnemonic) {
  const visual = mnemonic.visual;
  if (visual.type === "combination") {
    return `
      <div class="mnemonic-visual mnemonic-equation" aria-label="${visual.baseGlyph} plus kleines ${visual.smallGlyph} ergibt ${visual.resultGlyph}">
        <div class="equation-line">
          <span lang="ja">${visual.baseGlyph}</span>
          <i>+</i>
          <span class="small-kana" lang="ja">${visual.smallGlyph}</span>
        </div>
        <i class="equation-arrow">↓</i>
        <span class="result-kana" lang="ja">${visual.resultGlyph}</span>
        <small>${visual.label}</small>
      </div>
    `;
  }

  return `
    <div class="mnemonic-visual">
      <div class="mnemonic-shape-stage">
        <span class="visual-kana" lang="ja">${kana.glyph}</span>
        <span class="visual-emoji" aria-hidden="true">${visual.emoji}</span>
        ${visual.type === "modifier" ? `<span class="visual-modifier" lang="ja">${visual.modifier}</span>` : ""}
      </div>
      <strong>${visual.label}</strong>
      <small>${visual.shape}</small>
    </div>
  `;
}

function renderHome() {
  state.view = "home";
  releaseConversationMedia();
  document.body.classList.remove("is-quizzing");
  const isKanaWords = state.learningMode === "words";
  const isKanji = state.learningMode === "kanji";
  const isKanjiWords = state.learningMode === "kanji-words";
  const isConversation = state.learningMode === "conversation";
  const isMemoryMode =
    isKanaWords || isKanji || isKanjiWords || isConversation;
  const global = getGlobalStats();
  const hardItems = getHardItems();
  const topHard = hardItems.slice(0, 4).map((item) => item.glyph).join(" · ");
  const hardWords = getHardWords();
  const topHardWords = hardWords.slice(0, 4).map((word) => word.kana).join(" · ");
  const hardKanjiWords = getHardKanjiWords();
  const topHardKanjiWords = hardKanjiWords
    .slice(0, 4)
    .map((word) => word.spelling)
    .join(" · ");
  const hardConversations = getHardConversations();
  const topHardConversations = hardConversations
    .slice(0, 3)
    .map((conversation) => conversation.situation)
    .join(" · ");
  const wordStats = getWordStats();
  const kanjiStats = getKanjiStats();
  const kanjiWordStats = getKanjiWordStats();
  const conversationStats = getConversationStats();
  const memoryStats = isConversation
    ? conversationStats
    : isKanji
    ? kanjiStats
    : isKanjiWords
      ? kanjiWordStats
      : wordStats;

  const heroEyebrow = isConversation
    ? "Hören & Sprechen · Alltag bis Fortgeschritten"
    : isKanjiWords
    ? "Kanji-Wortschatz · JLPT N5 bis N1"
    : isKanji
      ? "Kanji für Manga lesen"
      : isKanaWords
        ? "65 Alltagsszenarien · JLPT N5 bis N1"
        : "Kana für Manga lesen";
  const heroTitle = isConversation
    ? "Japanisch, das <em>natürlich klingt.</em>"
    : isKanjiWords
    ? "Kanji-Wörter, die <em>Sinn ergeben.</em>"
    : isKanji
      ? "Kanji, die Geschichten <em>öffnen.</em>"
      : isKanaWords
        ? "Wörter, die wirklich <em>bleiben.</em>"
        : "Kana, die endlich <em>sitzen.</em>";
  const heroCopy = isConversation
    ? "Trainiere 50 echte Gesprächssituationen als Rollenspiel, geführt oder mit Shadowing. Nimm dich auf, übe einzelne Sinnabschnitte und vergleiche Inhalt, Verständlichkeit und Rhythmus – vom ersten Kennenlernen bis zur differenzierten Diskussion."
    : isKanjiWords
    ? "Erkenne ganze Wörter mit Kanji, schreibe die deutsche Bedeutung und verknüpfe danach die Kana-Lesung. Von grundlegenden N5-Wörtern bis zu abstraktem N1-Wortschatz."
    : isKanji
      ? "Erkenne Kanji einzeln oder optional direkt im Satz, tippe ihre deutsche Bedeutung und entdecke danach Lesung, Übersetzung und Manga-Beispiel. Von einfachen Zeichen bis zu komplexen Story-Begriffen."
      : isKanaWords
        ? "Wähle genau die Situationen und Wörter, die du brauchst – vom Restaurant und Bahnhof bis zu Arbeit, Arzt und Behörden. Alles Gelernte bleibt im globalen Wiederholungstopf."
        : "Trainiere Hiragana und Katakana für Sprechblasen, Namen und Soundeffekte – als einzelne Zeichen oder optional markiert in kurzen Sätzen. Wähle deine Reihen oder starte direkt mit einem Manga-Pfad.";
  const hardTitle = isConversation
    ? "Deine schwierigen Gespräche"
    : isKanjiWords
    ? "Deine schwierigen Kanji-Wörter"
    : isKanji
      ? "Intelligent wiederholen"
      : isKanaWords
        ? "Deine schwierigen Wörter"
        : "Deine schwierigen Kana";
  const hardDescription = isConversation
    ? hardConversations.length
      ? `${topHardConversations}<br>${hardConversations.length} ${hardConversations.length === 1 ? "Situation braucht" : "Situationen brauchen"} noch Sprechpraxis.`
      : "Noch keine schwierigen Situationen. Unsichere Gespräche werden hier automatisch gesammelt."
    : isKanjiWords
    ? hardKanjiWords.length
      ? `${topHardKanjiWords}<br>${hardKanjiWords.length} ${hardKanjiWords.length === 1 ? "Wort braucht" : "Wörter brauchen"} noch Extraübung.`
      : "Noch keine schwierigen Kanji-Wörter. Fehler werden hier automatisch gesammelt."
    : isKanaWords
      ? hardWords.length
        ? `${topHardWords}<br>${hardWords.length} ${hardWords.length === 1 ? "Wort braucht" : "Wörter brauchen"} noch Extraübung.`
        : "Noch keine Problemwörter. Fehler werden hier automatisch gesammelt."
      : isKanji
        ? memoryStats.learned
          ? `${memoryStats.reviewDue} Kanji sind gerade fällig.<br>Gelerntes kehrt in größeren Abständen zurück.`
          : "Drei sichere Treffer lernen ein Kanji. Danach kehrt es in größeren Abständen zurück."
        : hardItems.length
          ? `${topHard}<br>${hardItems.length} Zeichen warten auf eine Wiederholung.`
          : "Noch keine Problemfälle – das ändert sich beim Üben automatisch.";
  const hardAction = isConversation
    ? "practice-hard-conversations"
    : isKanjiWords
    ? "practice-hard-kanji-words"
    : isKanji
      ? "start-kanji-session"
      : isKanaWords
        ? "practice-hard-words"
        : "practice-hard";
  const hardDisabled = isConversation
    ? hardConversations.length === 0
    : isKanjiWords
    ? hardKanjiWords.length === 0
    : isKanaWords
      ? hardWords.length === 0
      : !isMemoryMode && hardItems.length === 0;
  const hardLabel = isConversation
    ? "Schwierige Gespräche üben"
    : isKanjiWords
    ? "Schwierige Kanji-Wörter üben"
    : isKanji
      ? "Kanji trainieren"
      : isKanaWords
        ? "Schwierige Wörter üben"
        : "Schwierige Kana üben";
  const totalUnit = isConversation
    ? " Gesprächen"
    : isKanji
      ? " Kanji"
      : isKanjiWords
        ? " Kanji-Wörtern"
        : " Wörtern";

  app.innerHTML = `
    <div class="home-view${isConversation ? " conversation-home" : ""}">
      <nav class="learning-mode-switcher" aria-label="Lernmodus">
        <button class="${isMemoryMode ? "" : "active"}" type="button" data-action="set-learning-mode" data-learning-mode="kana" aria-pressed="${!isMemoryMode}">
          <span aria-hidden="true">あ</span>
          <span><strong>Kana lesen</strong><small>Zeichen → Romaji</small></span>
        </button>
        <button class="${isKanaWords ? "active" : ""}" type="button" data-action="set-learning-mode" data-learning-mode="words" aria-pressed="${isKanaWords}">
          <span aria-hidden="true">ことば</span>
          <span><strong>Kana-Wörter</strong><small>JLPT N5–N1 · Kana → Deutsch</small></span>
        </button>
        <button class="${isKanji ? "active" : ""}" type="button" data-action="set-learning-mode" data-learning-mode="kanji" aria-pressed="${isKanji}">
          <span aria-hidden="true">漢</span>
          <span><strong>Kanji lernen</strong><small>Kanji → Bedeutung</small></span>
        </button>
        <button class="${isKanjiWords ? "active" : ""}" type="button" data-action="set-learning-mode" data-learning-mode="kanji-words" aria-pressed="${isKanjiWords}">
          <span aria-hidden="true">熟語</span>
          <span><strong>Kanji-Wörter</strong><small>JLPT N5–N1 · Wort → Deutsch</small></span>
        </button>
        <button class="${isConversation ? "active" : ""}" type="button" data-action="set-learning-mode" data-learning-mode="conversation" aria-pressed="${isConversation}">
          <span aria-hidden="true">会話</span>
          <span><strong>Gespräche</strong><small>Hören · Sprechen · Tonhöhe</small></span>
        </button>
      </nav>

      ${renderReviewOverview()}

      ${renderOptionalGoalDashboard()}

      <section class="hero" aria-labelledby="page-title">
        <div>
          <span class="eyebrow">${heroEyebrow}</span>
          <h1 id="page-title">${heroTitle}</h1>
          <p class="hero-copy">${heroCopy}</p>
        </div>
        <div class="hero-aside" aria-hidden="true">
          <div class="kana-orbit">
            <div class="brush-circle"></div>
            <div class="kana-card${isKanaWords || isKanjiWords || isConversation ? " word-card" : ""}${isKanji ? " kanji-card" : ""}${isKanjiWords ? " kanji-word-card" : ""}">${isConversation ? "会話" : isKanjiWords ? "日本" : isKanji ? "力" : isKanaWords ? "みず" : "あ"}</div>
            <div class="kana-card${isKanaWords || isKanjiWords || isConversation ? " word-card" : ""}${isKanji ? " kanji-card" : ""}${isKanjiWords ? " kanji-word-card" : ""}">${isConversation ? "発音" : isKanjiWords ? "運命" : isKanji ? "夢" : isKanaWords ? "ねこ" : "カ"}</div>
            <div class="kana-card">?</div>
          </div>
        </div>
      </section>

      <section class="dashboard" aria-label="Dein Lernfortschritt">
        <article class="stat-card">
          <span class="stat-label">${isMemoryMode ? "Sicher gelernt" : "Schon erkannt"}</span>
          <div class="stat-value">${isMemoryMode ? memoryStats.learned : global.learned}<small>von ${isMemoryMode ? memoryStats.total + totalUnit : ALL_KANA.length + " Kana"}</small></div>
        </article>
        <article class="stat-card">
          <span class="stat-label">Trefferquote</span>
          <div class="stat-value">${isMemoryMode ? memoryStats.accuracy : global.accuracy}<small>${isMemoryMode ? `${memoryStats.reviewDue} Wiederholungen bereit` : global.reviewDue ? `${global.reviewDue} Kana-Wiederholungen bereit` : global.streak ? `${global.streak} Tag${global.streak === 1 ? "" : "e"} in Folge` : "Starte heute"}</small></div>
        </article>
        <article class="hard-card">
          <div>
            <strong>${hardTitle}</strong>
            <p>${hardDescription}</p>
          </div>
          <button class="hard-button" type="button" data-action="${hardAction}" ${hardDisabled ? "disabled" : ""} aria-label="${hardLabel}">→</button>
        </article>
      </section>

      ${isConversation ? renderConversationSetup() : isKanjiWords ? renderKanjiWordSetup() : isKanji ? renderKanjiSetup() : isKanaWords ? renderWordSetup() : renderKanaSetup()}
    </div>
  `;

  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderSentenceModeChoice(kind, sentenceMode) {
  const isKana = kind === "kana";
  return `
    <div class="sentence-mode-choice" aria-label="${isKana ? "Kana" : "Kanji"}-Übungsformat">
      <div class="sentence-mode-copy">
        <span aria-hidden="true">文</span>
        <div>
          <strong>Optional im Satz lernen</strong>
          <small>${isKana ? "Lies das markierte Kana in einem kurzen Satz. Nach der Antwort erscheinen Romaji und Deutsch." : "Erkenne das markierte Kanji in einem echten Wort. Danach siehst du Satzlesung und Übersetzung."}</small>
        </div>
      </div>
      <div class="sentence-mode-buttons" role="radiogroup" aria-label="Übungsformat wählen">
        <button type="button" role="radio" aria-checked="${!sentenceMode}" class="${sentenceMode ? "" : "active"}" data-action="set-${kind}-sentence-mode" data-sentence-mode="false"><span>${isKana ? "あ" : "漢"}</span><strong>Einzeln</strong></button>
        <button type="button" role="radio" aria-checked="${sentenceMode}" class="${sentenceMode ? "active" : ""}" data-action="set-${kind}-sentence-mode" data-sentence-mode="true"><span>…${isKana ? "あ" : "漢"}…</span><strong>Im Satz</strong></button>
      </div>
    </div>
  `;
}

function renderKanaSetup() {
  const dueKana = getGlobalKanaReviews();
  const learnedKana = getGlobalKanaReviews(false);
  return `
    <section class="setup" id="setup" aria-labelledby="setup-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Deine Lerneinheit</span>
          <h2 id="setup-title">Was möchtest du üben?</h2>
        </div>
        <p>Du kannst beliebig viele Reihen kombinieren. Im Mix-Modus lernst du beide Schriftsysteme gleichzeitig.</p>
      </div>

      <div class="srs-pot-card kana-srs-card">
        <div class="srs-pot-icon" aria-hidden="true">↻</div>
        <div>
          <span class="eyebrow">Kana-Langzeitgedächtnis</span>
          <strong>${dueKana.length ? `${dueKana.length} Zeichen sind jetzt fällig.` : "Alle Zeichen sind frisch."}</strong>
          <p>${learnedKana.length} erkannte Kana im Wiederholungsplan. Erst nach 10 Minuten, dann nach 1 Stunde und später in immer größeren Abständen.</p>
        </div>
        <button class="secondary-button" type="button" data-action="start-kana-review" ${dueKana.length ? "" : "disabled"}>${dueKana.length ? "Kana wiederholen" : "Nichts fällig"}</button>
      </div>

      ${renderSentenceModeChoice("kana", state.kanaSentenceMode)}

      <div class="manga-presets" aria-label="Manga-Schnellwahl">
        <div class="preset-heading">
          <strong>Manga-Schnellwahl</strong>
          <span>Empfohlene Reihen für deinen nächsten Leseschritt</span>
        </div>
        <div class="preset-grid">
          <button type="button" data-action="manga-preset" data-preset="dialogue">
            <span aria-hidden="true">あ</span><strong>Sprechblasen</strong><small>Hiragana · Grundreihen</small>
          </button>
          <button type="button" data-action="manga-preset" data-preset="sounds">
            <span aria-hidden="true">ドン</span><strong>Soundeffekte</strong><small>Katakana · alle Reihen</small>
          </button>
          <button type="button" data-action="manga-preset" data-preset="complete">
            <span aria-hidden="true">漫</span><strong>Ganze Seite</strong><small>Beide Schriften · komplett</small>
          </button>
        </div>
      </div>

      <div class="script-switcher" role="group" aria-label="Schriftsystem wählen">
        ${scriptButton("hiragana", "あ", "Hiragana")}
        ${scriptButton("katakana", "ア", "Katakana")}
        ${scriptButton("mixed", "あ/ア", "Beide mischen")}
      </div>

      <div id="row-sections">
        ${CATEGORIES.map(renderCategory).join("")}
      </div>

      <div class="start-bar">
        <div class="selection-count">${renderSelectionCount()}</div>
        <button class="primary-button" type="button" data-action="start-session" ${getItemsForSelection().length ? "" : "disabled"}>
          Lerneinheit starten <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  `;
}

function renderWordSetup() {
  const words = getEligibleWords();
  const selectedIds = getSelectedWordIdSet();
  const dueWords = getGlobalReviewWords();
  const learnedWords = getGlobalReviewWords(false);
  const activeGroup = VOCABULARY_GROUPS.find(
    (group) => group.id === state.wordScenarioGroup,
  );
  const visibleSets = activeGroup
    ? VOCABULARY_SETS.filter((set) => set.groupId === activeGroup.id)
    : VOCABULARY_SETS;
  const pickerWords = activeGroup
    ? [...new Set(visibleSets.flatMap((set) => getWordsForSet(set.id).map((word) => word.id)))]
        .map((id) => WORD_BY_ID.get(id))
        .filter(Boolean)
    : getLevelEligibleWords();
  return `
    <section class="setup word-setup" id="setup" aria-labelledby="setup-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Dein persönlicher Wortschatz</span>
          <h2 id="setup-title">Wähle Situationen oder einzelne Wörter.</h2>
        </div>
        <p>Du bestimmst, was du brauchst. Innerhalb jeder Auswahl kommen einfache, häufige Wörter zuerst und schwierigere später.</p>
      </div>

      <div class="word-mode-note" aria-label="Lernmodus">
        <span aria-hidden="true">語</span>
        <div><strong>Wie beim Kana-Lernen – ein Wort nach dem anderen</strong><small>Japanisches Wort sehen · deutsche Bedeutung eingeben · Fehler kommen später erneut · drei sichere Treffer festigen das Wort</small></div>
      </div>

      <div class="word-level-toolbar">
        <div><strong>Maximales Sprachlevel</strong><small>Einfachere Wörter sind immer enthalten.</small></div>
        <div class="word-level-pills" role="radiogroup" aria-label="Maximales JLPT-Level für Kana-Wörter">
          ${WORD_LEVELS.map((level) => {
          const active = state.maxWordLevel === level.id;
          return `
            <button class="word-level-pill${active ? " active" : ""}" type="button" role="radio" aria-checked="${active}" data-action="set-word-level" data-level="${level.id}">
              <strong>${level.label}</strong><small>${level.title}</small>
            </button>
          `;
        }).join("")}
        </div>
      </div>

      <div class="srs-pot-card">
        <div class="srs-pot-icon" aria-hidden="true">壺</div>
        <div>
          <span class="eyebrow">Globaler Spaced-Repetition-Topf</span>
          <strong>${dueWords.length ? `${dueWords.length} Wörter sind jetzt fällig.` : "Gerade ist alles frisch."}</strong>
          <p>${learnedWords.length} dauerhaft gespeicherte Wörter. Sie bleiben im Topf, auch wenn du später ganz andere Sets auswählst.</p>
        </div>
        <button class="secondary-button" type="button" data-action="start-word-review" ${dueWords.length ? "" : "disabled"}>${dueWords.length ? "Fällige wiederholen" : "Nichts fällig"}</button>
      </div>

      <div class="scenario-heading">
        <div>
          <span class="eyebrow">${VOCABULARY_SETS.length} Situationen · ${VOCABULARY.length} Wörter</span>
          <h3>Was möchtest du als Nächstes können?</h3>
        </div>
        <div class="scenario-selection-actions">
          <button type="button" data-action="select-word-group">Alle in diesem Bereich</button>
          <button type="button" data-action="clear-word-selection">Auswahl leeren</button>
        </div>
      </div>

      <div class="scenario-group-tabs" role="tablist" aria-label="Szenariobereiche">
        ${VOCABULARY_GROUPS.map((group) => `
          <button class="${group.id === state.wordScenarioGroup ? "active" : ""}" type="button" role="tab" aria-selected="${group.id === state.wordScenarioGroup}" data-action="set-word-group" data-group="${group.id}">
            <span aria-hidden="true">${group.icon}</span><strong>${group.title}</strong><small>${group.description}</small>
          </button>
        `).join("")}
        <button class="${state.wordScenarioGroup === "all" ? "active" : ""}" type="button" role="tab" aria-selected="${state.wordScenarioGroup === "all"}" data-action="set-word-group" data-group="all">
          <span aria-hidden="true">全</span><strong>Alle Wörter</strong><small>Einzelne Wörter frei suchen</small>
        </button>
      </div>

      ${activeGroup ? `
        <div class="scenario-section-intro">
          <span aria-hidden="true">${activeGroup.icon}</span>
          <div><strong>${activeGroup.title}</strong><small>${activeGroup.description} · ${visibleSets.length} Szenarien</small></div>
        </div>
        <div class="scenario-set-grid">
          ${visibleSets.map((set) => {
            const setWords = getWordsForSet(set.id);
            const allSetWords = getWordsForSet(set.id, false);
            const selected = state.selectedWordSets.has(set.id);
            const learned = setWords.filter((word) => getWordStrength(word.id) >= 3).length;
            const preview = setWords.slice(0, 4).map((word) => word.kana).join(" · ");
            return `
              <button class="scenario-set-card${selected ? " selected" : ""}" type="button" data-action="toggle-word-set" data-set="${set.id}" ${setWords.length ? "" : "disabled"} aria-pressed="${selected}">
                <span class="scenario-set-check" aria-hidden="true">${selected ? "✓" : "+"}</span>
                <span class="scenario-set-icon" aria-hidden="true">${WORD_BY_ID.get(set.wordIds[0])?.kana.slice(0, 1) || "語"}</span>
                <span class="scenario-set-copy"><strong>${set.title}</strong><small>${set.description}</small><em lang="ja">${preview || "Höheres Level wählen"}</em></span>
                <span class="scenario-set-meta"><b>${learned}/${setWords.length}</b> sicher · ${allSetWords.length} gesamt · ${set.level}</span>
              </button>
            `;
          }).join("")}
        </div>
      ` : ""}

      <details class="individual-word-picker" ${state.wordScenarioGroup === "all" ? "open" : ""}>
        <summary><span><strong>Einzelne Wörter auswählen</strong><small>${pickerWords.length} Wörter in diesem Bereich · unabhängig von ganzen Sets wählbar</small></span><b>Öffnen</b></summary>
        <div class="word-picker-tools">
          <label for="word-search">Wort suchen</label>
          <input id="word-search" type="search" placeholder="Japanisch oder Deutsch …" autocomplete="off">
        </div>
        <div class="individual-word-grid" id="individual-word-grid">
          ${pickerWords.map((word) => `
            <button class="individual-word${selectedIds.has(word.id) ? " selected" : ""}" type="button" data-action="toggle-word" data-word="${word.id}" data-search="${`${word.kana} ${word.primary} ${word.answers.join(" ")}`.toLowerCase()}">
              <span aria-hidden="true">${selectedIds.has(word.id) ? "✓" : "+"}</span><b lang="ja">${word.kana}</b><small>${word.primary}</small><em>${word.level}</em>
            </button>
          `).join("")}
        </div>
        <p class="word-search-empty" id="word-search-empty" hidden>Kein passendes Wort in diesem Bereich gefunden.</p>
      </details>

      <div class="cycle-explainer scenario-cycle-explainer">
        <div class="cycle-visual" aria-hidden="true"><span>みず</span><span>ねこ</span><span>いえ</span><span>ほん</span></div>
        <div>
          <strong>Immer nur 3–5 aktive Wörter.</strong>
          <p>Die App arbeitet deine gesamte Auswahl in kleinen Gruppen ab. Fehler kehren innerhalb der Runde zurück; fällige Wörter aus dem globalen Topf mischen sich dosiert dazwischen.</p>
        </div>
      </div>

      <div class="start-bar">
        <div class="selection-count"><strong>${words.length}</strong> <span>Wörter ausgewählt · bis ${state.maxWordLevel}</span></div>
        <button class="primary-button" type="button" data-action="start-word-session" ${words.length ? "" : "disabled"}>
          Auswahl lernen <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  `;
}

function renderKanjiWordSetup() {
  const words = getEligibleKanjiWords();
  const dueWords = getGlobalKanjiWordReviews();
  const learnedWords = getGlobalKanjiWordReviews(false);
  const maxLevelIndex = KANJI_WORD_LEVELS.findIndex(
    (level) => level.id === state.maxKanjiWordLevel,
  );
  return `
    <section class="setup word-setup kanji-word-setup" id="setup" aria-labelledby="setup-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Dein JLPT-Kanji-Wortpfad</span>
          <h2 id="setup-title">Ganze Wörter lesen. Von N5 bis N1.</h2>
        </div>
        <p>Wähle dein Ziellevel. Einfachere Stufen sind automatisch enthalten und die häufigsten Kanji-Wörter kommen zuerst.</p>
      </div>

      <div class="srs-pot-card kanji-word-srs-card">
        <div class="srs-pot-icon" aria-hidden="true">熟</div>
        <div>
          <span class="eyebrow">Globaler Wiederholungstopf</span>
          <strong>${dueWords.length ? `${dueWords.length} Kanji-Wörter sind fällig.` : "Gerade ist alles frisch."}</strong>
          <p>${learnedWords.length} sicher gelernte Wörter bleiben unabhängig vom gewählten JLPT-Level im Langzeitplan.</p>
        </div>
        <button class="secondary-button" type="button" data-action="start-kanji-word-review" ${dueWords.length ? "" : "disabled"}>${dueWords.length ? "Fällige wiederholen" : "Nichts fällig"}</button>
      </div>

      <div class="word-mode-note kanji-word-mode-note" aria-label="Lernmodus">
        <span aria-hidden="true">熟</span>
        <div>
          <strong>Kanji-Wort → deutsche Bedeutung</strong>
          <small>Nach jeder Antwort erscheint die Kana-Lesung. Die Einteilung ist JLPT-orientiert, da der JLPT keine verbindliche Vokabelliste veröffentlicht.</small>
        </div>
      </div>

      <div class="jlpt-word-path" role="radiogroup" aria-label="Maximales JLPT-Level für Kanji-Wörter">
        ${KANJI_WORD_LEVELS.map((level, levelIndex) => {
          const active = state.maxKanjiWordLevel === level.id;
          const included = levelIndex <= maxLevelIndex;
          const levelWords = KANJI_VOCABULARY.filter(
            (word) => word.level === level.id,
          );
          const levelStats = getKanjiWordLevelStats(level.id);
          const preview = levelWords
            .slice(0, 5)
            .map((word) => word.spelling)
            .join(" · ");
          const progress = levelStats.total
            ? Math.round((levelStats.learned / levelStats.total) * 100)
            : 0;
          return `
            <button class="word-level-row kanji-word-level-row${included ? " included" : ""}${active ? " active" : ""}" type="button" role="radio" aria-checked="${active}" data-action="set-kanji-word-level" data-level="${level.id}">
              <span class="word-level-step"><b>${level.label}</b><small>${levelIndex === 0 ? "Start" : levelIndex === KANJI_WORD_LEVELS.length - 1 ? "Ziel" : `Stufe ${levelIndex + 1}`}</small></span>
              <span class="word-level-copy">
                <strong>${level.title}</strong>
                <small>${level.description}</small>
                <em lang="ja">${preview}</em>
              </span>
              <span class="word-level-progress">
                <span><b>${levelStats.learned}</b> / ${levelStats.total} sicher</span>
                <i><u style="width:${progress}%"></u></i>
              </span>
              <span class="word-level-state">${active ? "Dein Ziel" : included ? "Enthalten" : "Als Ziel wählen"}</span>
            </button>
          `;
        }).join("")}
      </div>

      <div class="cycle-explainer kanji-word-cycle-explainer">
        <div class="cycle-visual kanji-word-cycle-visual" aria-hidden="true">
          <span>日本</span><span>学校</span><span>時間</span><span>友達</span>
        </div>
        <div>
          <strong>Vier Kanji-Wörter. Bedeutung und Lesung verknüpfen.</strong>
          <p>Drei sichere Treffer festigen ein Wort. Bei einem Fehler bleibt Bedeutung und Kana-Lesung stehen, bis du mit Enter weitergehst.</p>
        </div>
      </div>

      <div class="start-bar">
        <div class="selection-count"><strong>${words.length}</strong> <span>Kanji-Wörter · ${state.maxKanjiWordLevel === "N5" ? "JLPT N5" : `JLPT N5 bis ${state.maxKanjiWordLevel}`}</span></div>
        <button class="primary-button" type="button" data-action="start-kanji-word-session">
          Kanji-Wörter starten <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  `;
}

function renderKanjiSetup() {
  const kanji = getEligibleKanji();
  const dueKanji = getGlobalKanjiReviews();
  const learnedKanji = getGlobalKanjiReviews(false);
  return `
    <section class="setup word-setup kanji-setup" id="setup" aria-labelledby="setup-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Dein Manga-Kanji-Pfad</span>
          <h2 id="setup-title">Wie komplex darf die Story werden?</h2>
        </div>
        <p>Wähle das höchste Level. Auch bei N1 beginnt dein Weg mit einfachen, häufigen Kanji aus Alltag und Dialogen.</p>
      </div>

      <div class="srs-pot-card kanji-srs-card">
        <div class="srs-pot-icon" aria-hidden="true">漢</div>
        <div>
          <span class="eyebrow">Globaler Wiederholungstopf</span>
          <strong>${dueKanji.length ? `${dueKanji.length} Kanji sind jetzt fällig.` : "Gerade ist alles frisch."}</strong>
          <p>${learnedKanji.length} sichere Kanji kehren automatisch zurück. Mit jedem richtigen Abruf wird der Abstand länger.</p>
        </div>
        <button class="secondary-button" type="button" data-action="start-kanji-review" ${dueKanji.length ? "" : "disabled"}>${dueKanji.length ? "Fällige wiederholen" : "Nichts fällig"}</button>
      </div>

      ${renderSentenceModeChoice("kanji", state.kanjiSentenceMode)}

      <div class="level-grid" role="radiogroup" aria-label="Maximales Kanji-Level">
        ${KANJI_LEVELS.map((level) => {
          const active = state.maxKanjiLevel === level.id;
          const levelCount = KANJI.filter((kanjiItem) => kanjiItem.level === level.id).length;
          return `
            <button class="level-option kanji-level${active ? " active" : ""}" type="button" role="radio" aria-checked="${active}" data-action="set-kanji-level" data-level="${level.id}">
              <span class="level-code">${level.id}</span>
              <span><strong>${level.title}</strong><small>${level.description}</small></span>
              <span class="level-count">${levelCount}</span>
            </button>
          `;
        }).join("")}
      </div>

      <div class="cycle-explainer kanji-cycle-explainer">
        <div class="cycle-visual kanji-cycle-visual" aria-hidden="true">
          <span>人</span><span>力</span><span>心</span><span>夢</span>
        </div>
        <div>
          <strong>Vier Kanji. Bedeutung, Lesung, Manga-Beispiel.</strong>
          <p>Drei sichere Treffer festigen ein Zeichen. Danach kehrt es automatisch zwischen neuen Kanji zurück.</p>
        </div>
      </div>

      <div class="start-bar">
        <div class="selection-count"><strong>${kanji.length}</strong> <span>Kanji bis ${state.maxKanjiLevel}</span></div>
        <button class="primary-button" type="button" data-action="start-kanji-session">
          Kanji-Training starten <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  `;
}

function renderConversationSetup() {
  const conversations = getEligibleConversations();
  const levelEligible = getLevelEligibleConversations();
  const selectedIds = getSelectedConversationIdSet();
  const dueConversations = getGlobalConversationReviews();
  const learnedConversations = getGlobalConversationReviews(false);
  const maxLevelIndex = CONVERSATION_LEVELS.findIndex(
    (level) => level.id === state.maxConversationLevel,
  );
  const pronunciationLabs = [
    {
      icon: "高低",
      title: "Tonhöhe statt Druck",
      japanese: "雨です。飴です。",
      pattern: "あめ: H–L｜あめ: L–H (Tokyo)",
      copy: "Japanisch organisiert Wörter mit hohen und tiefen Tönen. Sprich den Unterschied nicht lauter, sondern ändere die Tonhöhe.",
    },
    {
      icon: "拍",
      title: "Jede Mora bekommt Zeit",
      japanese: "おばさん。おばあさん。",
      pattern: "o · ba · sa · n｜o · ba · a · sa · n",
      copy: "Lange Vokale zählen doppelt. Halte den Takt gleichmäßig, statt einzelne Silben zu beschleunigen.",
    },
    {
      icon: "っ",
      title: "Die hörbare kleine Pause",
      japanese: "来てください。切手をください。",
      pattern: "ki · te｜ki · Q · te",
      copy: "Das kleine っ ist eine volle Pause-Mora. Stoppe kurz, bevor der nächste Konsonant beginnt.",
    },
    {
      icon: "ー",
      title: "Kurze und lange Vokale",
      japanese: "ここです。高校です。",
      pattern: "ko · ko｜ko · o · ko · o",
      copy: "Ein zu kurzer langer Vokal kann die Bedeutung ändern. Klatsche jede Mora einmal mit.",
    },
    {
      icon: "息",
      title: "Leichte unbetonte Vokale",
      japanese: "好きです。聞きました。",
      pattern: "su-ki de-su｜ki-ki-ma-shi-ta",
      copy: "i und u können zwischen stimmlosen Lauten sehr leise werden. Die Mora bleibt rhythmisch trotzdem vorhanden.",
    },
    {
      icon: "句",
      title: "Phrasen statt Wortsalat",
      japanese: "駅はどこですか。駅はここです。",
      pattern: "駅は｜どこですか。駅は｜ここです。",
      copy: "Gliedere nach Sinn. Eine Frage muss nicht deutsch stark ansteigen; Partikel, Pausen und ein klarer Schluss tragen die Absicht.",
    },
  ];

  return `
    <section class="setup word-setup conversation-setup" id="setup" aria-labelledby="setup-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Dein Gesprächstraining</span>
          <h2 id="setup-title">Hören. Reagieren. Vergleichen. Festigen.</h2>
        </div>
        <p>Wähle Themen und Trainingsart. Jede Situation führt dich vom echten Gesprächsimpuls über deine eigene Aufnahme bis zu einem konkreten Aussprachevergleich.</p>
      </div>

      <div class="conversation-method-note">
        <span aria-hidden="true">会</span>
        <div>
          <strong>50 praktische Situationen – vom ersten Satz bis zur souveränen Diskussion</strong>
          <small>Keine automatische Punktzahl täuscht Präzision vor: Du vergleichst Inhalt, Verständlichkeit und Rhythmus anhand einer klaren Rubrik.</small>
        </div>
        <div class="privacy-pill"><span aria-hidden="true">●</span> Aufnahmen bleiben im Browser</div>
      </div>

      <section class="pronunciation-lab" aria-labelledby="pronunciation-title">
        <div class="pronunciation-heading">
          <div><span class="eyebrow">Aussprache-Lab</span><h3 id="pronunciation-title">Sechs Muster, die natürliches Japanisch tragen.</h3></div>
          <p>Tokyo-Standard als Orientierung. Regionale Akzente sind natürlich; Geräte-Stimmen sind ein Modell, keine Messung deiner Aussprache.</p>
        </div>
        <div class="pronunciation-grid">
          ${pronunciationLabs
            .map(
              (lab) => `
                <article class="pronunciation-card">
                  <span class="pronunciation-icon" aria-hidden="true">${lab.icon}</span>
                  <div>
                    <h4>${lab.title}</h4>
                    <p lang="ja">${lab.japanese}</p>
                    <code>${lab.pattern}</code>
                    <small>${lab.copy}</small>
                  </div>
                  <button type="button" data-action="speak-japanese" data-speech="${lab.japanese}" data-rate="0.82" aria-label="Japanisches Beispiel anhören"><span aria-hidden="true">▶</span> Anhören</button>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="speaking-mode-section" aria-labelledby="speaking-mode-title">
        <div class="conversation-path-heading compact-heading">
          <div><span class="eyebrow">Trainingsart</span><h3 id="speaking-mode-title">Wie viel Hilfe möchtest du?</h3></div>
          <p>Du kannst jederzeit wechseln. Der Fortschritt gehört zur Situation und bleibt in allen Trainingsarten erhalten.</p>
        </div>
        <div class="speaking-mode-grid" role="radiogroup" aria-label="Trainingsart wählen">
          ${[
            ["roleplay", "会", "Rollenspiel", "Erst frei reagieren, dann mit dem Modell vergleichen."],
            ["guided", "組", "Geführt", "Bei Bedarf Satzbausteine öffnen und selbst zusammensetzen."],
            ["shadowing", "影", "Shadowing", "Modell direkt hören und nahezu gleichzeitig nachsprechen."],
          ].map(([id, icon, title, copy]) => {
            const active = state.conversationPracticeMode === id;
            return `
              <button class="speaking-mode-card${active ? " active" : ""}" type="button" role="radio" aria-checked="${active}" data-action="set-conversation-mode" data-mode="${id}">
                <span aria-hidden="true">${icon}</span><strong>${title}</strong><small>${copy}</small><em>${active ? "Ausgewählt" : "Wählen"}</em>
              </button>
            `;
          }).join("")}
        </div>
      </section>

      <div class="conversation-path-heading">
        <div><span class="eyebrow">Situationspfad</span><h3>Wie weit möchtest du gehen?</h3></div>
        <p>Ein höheres Ziel schaltet alle einfacheren Situationen mit frei. Häufige und nützliche Gespräche kommen zuerst.</p>
      </div>

      <div class="jlpt-word-path conversation-level-path" role="radiogroup" aria-label="Maximale Gesprächsstufe">
        ${CONVERSATION_LEVELS.map((level, levelIndex) => {
          const active = state.maxConversationLevel === level.id;
          const included = levelIndex <= maxLevelIndex;
          const levelConversations = CONVERSATIONS.filter(
            (conversation) => conversation.level === level.id,
          );
          const levelStats = getConversationLevelStats(level.id);
          const preview = levelConversations
            .slice(0, 3)
            .map((conversation) => conversation.situation)
            .join(" · ");
          const progress = levelStats.total
            ? Math.round((levelStats.learned / levelStats.total) * 100)
            : 0;
          return `
            <button class="word-level-row conversation-level-row${included ? " included" : ""}${active ? " active" : ""}" type="button" role="radio" aria-checked="${active}" data-action="set-conversation-level" data-level="${level.id}">
              <span class="word-level-step"><b>${level.label}</b><small>${levelIndex === 0 ? "Start" : levelIndex === CONVERSATION_LEVELS.length - 1 ? "Ziel" : `Stufe ${levelIndex + 1}`}</small></span>
              <span class="word-level-copy">
                <strong>${level.title}</strong>
                <small>${level.description}</small>
                <em>${preview}</em>
              </span>
              <span class="word-level-progress">
                <span><b>${levelStats.learned}</b> / ${levelStats.total} sicher</span>
                <i><u style="width:${progress}%"></u></i>
              </span>
              <span class="word-level-state">${active ? "Dein Ziel" : included ? "Enthalten" : "Als Ziel wählen"}</span>
            </button>
          `;
        }).join("")}
      </div>

      <section class="conversation-topic-section" aria-labelledby="conversation-topic-title">
        <div class="conversation-path-heading compact-heading">
          <div><span class="eyebrow">Szenarien</span><h3 id="conversation-topic-title">Was möchtest du sprechen können?</h3></div>
          <p>Mehrere Themen lassen sich kombinieren. Unter „Einzelne Situationen“ kannst du die Auswahl fein anpassen.</p>
        </div>
        <div class="conversation-topic-grid">
          ${CONVERSATION_TOPICS.map((topic) => {
            const topicItems = topic.id === "all"
              ? levelEligible
              : levelEligible.filter((conversation) => conversation.topic === topic.id);
            const active = state.selectedConversationTopics.has(topic.id);
            return `
              <button class="conversation-topic-card${active ? " active" : ""}" type="button" data-action="toggle-conversation-topic" data-topic="${topic.id}" aria-pressed="${active}" ${topicItems.length ? "" : "disabled"}>
                <span aria-hidden="true">${topic.icon}</span>
                <span><strong>${topic.title}</strong><small>${topic.description}</small></span>
                <em>${topicItems.length}</em>
              </button>
            `;
          }).join("")}
        </div>

        <details class="individual-word-picker conversation-picker">
          <summary>
            <span><strong>Einzelne Situationen auswählen</strong><small>Auswahl durchsuchen, hinzufügen oder abwählen</small></span>
            <b>Öffnen</b>
          </summary>
          <div class="word-picker-tools">
            <label class="word-search-shell" for="conversation-search"><span aria-hidden="true">⌕</span><input id="conversation-search" type="search" placeholder="Situation oder deutscher Satz …" autocomplete="off"></label>
            <span><b id="conversation-visible-count">${levelEligible.length}</b> Situationen sichtbar</span>
          </div>
          <div class="individual-word-grid individual-conversation-grid" id="individual-conversation-grid">
            ${levelEligible.map((conversation) => {
              const active = selectedIds.has(conversation.id);
              const topic = CONVERSATION_TOPICS.find((entry) => entry.id === conversation.topic);
              const search = `${conversation.situation} ${conversation.german} ${conversation.target} ${conversation.level}`.toLowerCase();
              return `
                <button class="individual-word individual-conversation${active ? " selected" : ""}" type="button" data-action="toggle-conversation" data-conversation="${conversation.id}" data-search="${search}" aria-pressed="${active}">
                  <span lang="ja">${topic?.icon || "会"}</span>
                  <b>${conversation.situation}</b><small>${conversation.level} · ${topic?.title || "Gespräch"}</small>
                  <em aria-hidden="true">${active ? "✓" : "+"}</em>
                </button>
              `;
            }).join("")}
          </div>
          <p class="word-search-empty" id="conversation-search-empty" hidden>Keine passende Situation gefunden.</p>
        </details>
      </section>

      <div class="srs-pot-card conversation-srs-card">
        <div class="srs-pot-icon" aria-hidden="true">声</div>
        <div>
          <span class="eyebrow">Globaler Sprech-Wiederholungstopf</span>
          <strong>${dueConversations.length ? `${dueConversations.length} ${dueConversations.length === 1 ? "Situation ist" : "Situationen sind"} fällig` : learnedConversations.length ? "Alles ist für heute frisch" : "Dein Langzeitgedächtnis startet hier"}</strong>
          <p>${learnedConversations.length} sicher gelernte Situationen bleiben unabhängig von Themenwahl und Level im Wiederholungsplan.</p>
        </div>
        <button type="button" data-action="start-conversation-review" ${dueConversations.length ? "" : "disabled"}>${dueConversations.length ? "Fällige Gespräche üben" : "Nichts fällig"} <span aria-hidden="true">→</span></button>
      </div>

      <div class="cycle-explainer conversation-cycle-explainer">
        <div class="cycle-visual conversation-cycle-visual" aria-hidden="true">
          <span>挨拶</span><span>注文</span><span>道案内</span><span>会話</span>
        </div>
        <div>
          <strong>Vier Situationen. Klare Rückmeldung statt Bauchgefühl.</strong>
          <p>Bewerte Inhalt, Verständlichkeit und Rhythmus. „Fast sicher“ und „Noch üben“ erscheinen später erneut; nach jeder Bewertung entscheidest du selbst, wann es weitergeht.</p>
        </div>
      </div>

      <div class="start-bar">
        <div class="selection-count"><strong>${conversations.length}</strong> <span>Gespräche · ${state.maxConversationLevel === "N5" ? "Grundstufe N5" : `N5 bis ${state.maxConversationLevel}`}</span></div>
        <button class="primary-button" type="button" data-action="start-conversation-session" ${conversations.length ? "" : "disabled"}>
          ${state.conversationPracticeMode === "shadowing" ? "Shadowing starten" : state.conversationPracticeMode === "guided" ? "Geführt sprechen" : "Rollenspiel starten"} <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  `;
}

function scriptButton(mode, glyph, label) {
  const active = state.mode === mode;
  return `
    <button class="script-option${active ? " active" : ""}" type="button" data-action="set-script" data-mode="${mode}" aria-pressed="${active}">
      <span aria-hidden="true">${glyph}</span>${label}
    </button>
  `;
}

function renderCategory(category) {
  const groups = GROUPS.filter((group) => group.category === category.id);
  const allSelected = groups.every((group) => state.selectedRows.has(group.id));
  return `
    <section class="row-section" aria-labelledby="category-${category.id}">
      <div class="row-section-header">
        <h3 id="category-${category.id}">${category.title} <span class="sr-only">${category.description}</span></h3>
        <button type="button" data-action="toggle-category" data-category="${category.id}">${allSelected ? "Keine auswählen" : "Alle auswählen"}</button>
      </div>
      <div class="row-grid">
        ${groups.map(renderRow).join("")}
      </div>
    </section>
  `;
}

function renderRow(group) {
  const selected = state.selectedRows.has(group.id);
  const entryIndex = state.mode === "katakana" ? 1 : 0;
  let preview;
  if (state.mode === "mixed") {
    preview = group.kana.map((entry) => `${entry[0]} ${entry[1]}`).join(" · ");
  } else {
    preview = group.kana.map((entry) => entry[entryIndex]).join(" ");
  }

  return `
    <button class="row-option${selected ? " selected" : ""}" type="button" role="checkbox" aria-checked="${selected}" data-action="toggle-row" data-row="${group.id}">
      <span class="row-check">${checkIcon()}</span>
      <span class="row-copy">
        <strong>${group.label}</strong>
        <span>${group.sublabel}</span>
      </span>
      <span class="row-kana" aria-hidden="true">${preview}</span>
    </button>
  `;
}

function renderSelectionCount() {
  const count = getItemsForSelection().length;
  return `<strong>${count}</strong> <span>Zeichen ausgewählt</span>`;
}

function refreshSetup() {
  const container = document.querySelector("#row-sections");
  const switcher = document.querySelector(".script-switcher");
  const count = document.querySelector(".selection-count");
  const start = document.querySelector('[data-action="start-session"]');
  if (!container || !switcher || !count || !start) return renderHome();
  switcher.innerHTML = `
    ${scriptButton("hiragana", "あ", "Hiragana")}
    ${scriptButton("katakana", "ア", "Katakana")}
    ${scriptButton("mixed", "あ/ア", "Beide mischen")}
  `;
  container.innerHTML = CATEGORIES.map(renderCategory).join("");
  count.innerHTML = renderSelectionCount();
  start.disabled = getItemsForSelection().length === 0;
}

function startWordSession(wordPool = null, sourceOverride = null) {
  const focusedPractice = Array.isArray(wordPool);
  const eligible = focusedPractice ? wordPool : getEligibleWords();
  const weakWords = eligible.filter((word) => getWordStrength(word.id) < 3);
  const maintenance = !focusedPractice && weakWords.length === 0;
  const candidates = focusedPractice
    ? eligible
    : maintenance
    ? [...eligible]
        .sort(
        (a, b) =>
            Number(data.words[a.id]?.nextReviewAt || data.words[a.id]?.lastPracticed || 0) -
            Number(data.words[b.id]?.nextReviewAt || data.words[b.id]?.lastPracticed || 0),
        )
        .slice(0, 5)
    : weakWords;
  if (!candidates.length) {
    showToast("Wähle mindestens ein Wort oder ein Szenario aus.");
    return;
  }

  clearTimeout(state.timer);
  const targetIds = candidates.map((word) => word.id);
  const reviewOnly = maintenance || sourceOverride === "srs-review";
  state.session = {
    kind: "words",
    source: sourceOverride || (maintenance ? "maintenance" : "word-selection"),
    maxLevel: state.maxWordLevel,
    cycleIds: [],
    targetIds: new Set(targetIds),
    itemIds: targetIds,
    pendingIds: [...targetIds],
    queue: [],
    currentId: null,
    mastered: new Set(),
    reviewedIds: new Set(),
    maintenance,
    reviewOnly,
    answersSinceReview: 0,
    completedCycles: 0,
    attempts: 0,
    correctAttempts: 0,
    wrongAttempts: 0,
    mistakesById: {},
    startedAt: Date.now(),
    locked: false,
  };
  state.view = "quiz";
  loadNextWordCycle();
  advanceWordSession();
}

function startWordReviewSession() {
  const dueWords = getGlobalReviewWords();
  if (!dueWords.length) {
    showToast("Im Wiederholungstopf ist gerade nichts fällig.");
    return;
  }
  startWordSession(dueWords, "srs-review");
}

function startHardWordSession() {
  const hardWords = getHardWords();
  if (!hardWords.length) {
    showToast("Noch keine schwierigen Wörter gespeichert.");
    return;
  }
  startWordSession(hardWords.slice(0, 4), "hard-words");
}

function advanceWordSession() {
  const session = state.session;
  if (!session || session.kind !== "words") return;
  if (session.queue.length === 0) {
    const cycleComplete = session.cycleIds.every((id) => session.mastered.has(id));
    if (cycleComplete) {
      session.completedCycles += 1;
      if (session.pendingIds.length) loadNextWordCycle();
      else {
        finishWordSession();
        return;
      }
    } else {
      session.queue = shuffle(
        session.cycleIds.filter((id) => !session.mastered.has(id)),
      );
    }
  }
  session.currentId = session.queue.shift();
  session.locked = false;
  renderWordQuiz();
}

function loadNextWordCycle() {
  const session = state.session;
  if (!session || session.kind !== "words") return;
  session.cycleIds = session.pendingIds.splice(0, 4);
  session.queue = shuffle(session.cycleIds);
}

function insertWordLater(wordId, minDistance = 2) {
  const session = state.session;
  if (!session || session.kind !== "words" || session.queue.includes(wordId)) return;
  const minIndex = Math.min(minDistance, session.queue.length);
  const maxIndex = Math.min(minDistance + 2, session.queue.length);
  const insertionIndex =
    minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
  session.queue.splice(insertionIndex, 0, wordId);
}

function maybeInsertWordReview() {
  const session = state.session;
  if (!session || session.kind !== "words") return;
  if (session.source === "hard-words" || session.source === "srs-review") return;
  session.answersSinceReview += 1;
  if (session.answersSinceReview < 4) return;
  const excluded = new Set([
    ...session.cycleIds,
    ...session.queue,
    ...session.reviewedIds,
    session.currentId,
  ]);
  const review = getGlobalReviewWords().find((word) => !excluded.has(word.id));
  if (review) {
    session.answersSinceReview = 0;
    insertWordLater(review.id, 2);
  }
}

function wordConfidenceDots(strength) {
  const safeStrength = Math.min(3, Math.max(0, strength));
  return `
    <span class="confidence-label">Sicherheit</span>
    <span class="confidence-dots" aria-label="${safeStrength} von 3 sicheren Treffern">
      ${[1, 2, 3].map((step) => `<i class="${step <= safeStrength ? "filled" : ""}"></i>`).join("")}
    </span>
  `;
}

function renderWordQuiz() {
  const session = state.session;
  if (!session || session.kind !== "words") return;
  const word = WORD_BY_ID.get(session.currentId);
  const isInjectedReview = !session.targetIds.has(word.id);
  const isReview = isInjectedReview || session.reviewOnly;
  const focusedPractice = session.source === "hard-words";
  const srsReview = session.source === "srs-review";
  const total = session.itemIds.length;
  const mastered = session.mastered.size;
  const accuracy = formatPercent(session.correctAttempts, session.attempts);
  const strength = getWordStrength(word.id);
  const wordLength = [...word.kana].length;
  const lengthClass =
    wordLength >= 6 ? "word-long" : wordLength >= 5 ? "word-medium" : "";

  document.body.classList.add("is-quizzing");
  app.innerHTML = `
    <div class="quiz-view word-quiz-view">
      <div class="quiz-top">
        <button class="icon-button" type="button" data-action="quit-session"><span aria-hidden="true">←</span> Beenden</button>
        <div class="progress-wrap" aria-label="${mastered} von ${total} Wörtern sicher">
          <div class="progress-track"><div class="progress-fill word-progress" style="width: ${(mastered / total) * 100}%"></div></div>
          <span class="progress-label">${mastered} / ${total}</span>
        </div>
        <div class="quiz-stats">
          <div class="quiz-stat"><span>Aktiv</span><strong>${session.cycleIds.length} Wörter</strong></div>
          <div class="quiz-stat"><span>Genauigkeit</span><strong>${accuracy}</strong></div>
          <div class="quiz-stat"><span>Fehler</span><strong>${session.wrongAttempts}</strong></div>
        </div>
      </div>

      <section class="quiz-stage word-quiz-stage" aria-labelledby="quiz-prompt">
        <div class="word-cycle-badge ${isReview ? "review" : ""}${focusedPractice ? " hard-word-badge" : ""}">
          ${focusedPractice ? `◆ Schwierige Wörter · ${word.level}` : srsReview ? "↻ Spaced-Repetition-Topf" : isInjectedReview ? "↻ Globale Langzeit-Wiederholung" : `Lerngruppe ${session.completedCycles + 1} · ${word.level}`}
        </div>
        <p class="quiz-prompt" id="quiz-prompt">Was bedeutet dieses japanische Wort?</p>
        <div class="quiz-kana-wrap word-card-wrap">
          <span class="quiz-script-tag">${word.level} · nur Kana</span>
          <div class="quiz-kana quiz-word ${lengthClass}" lang="ja">${word.kana}</div>
        </div>

        <div class="word-confidence">${wordConfidenceDots(strength)}</div>

        <form class="answer-form word-answer-form" autocomplete="off">
          <label class="answer-label" for="kana-answer">Deutsche Bedeutung</label>
          <div class="input-shell">
            <input
              class="answer-input"
              id="kana-answer"
              name="answer"
              type="text"
              inputmode="text"
              enterkeyhint="go"
              autocapitalize="none"
              autocorrect="off"
              spellcheck="false"
              aria-describedby="answer-feedback"
              placeholder="z. B. Wasser"
              maxlength="48"
              autofocus
            >
            <span class="enter-hint" aria-hidden="true">↵</span>
          </div>
          <div class="answer-meta">
            <p class="feedback" id="answer-feedback" aria-live="polite"></p>
            <button class="reveal-button" type="button" data-action="reveal-word-answer">Antwort zeigen</button>
          </div>
        </form>
        <p class="queue-note"><span aria-hidden="true">◎</span> Drei sichere Treffer festigen ein Wort. Später kommt es zur Kontrolle wieder.</p>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() =>
    document.querySelector("#kana-answer")?.focus({ preventScroll: true }),
  );
}

function submitWordAnswer(rawAnswer, revealed = false) {
  const session = state.session;
  if (!session || session.kind !== "words" || session.locked) return;
  const word = WORD_BY_ID.get(session.currentId);
  const answer = normalizeGerman(rawAnswer);
  if (!answer && !revealed) return;
  const wasCorrect =
    !revealed && word.answers.map(normalizeGerman).includes(answer);
  const isInjectedReview = !session.targetIds.has(word.id);
  const isReview = isInjectedReview || session.reviewOnly;

  session.locked = true;
  session.attempts += 1;
  if (wasCorrect) session.correctAttempts += 1;
  else {
    session.wrongAttempts += 1;
    session.mistakesById[word.id] = (session.mistakesById[word.id] || 0) + 1;
  }
  const newStrength = recordWordAttempt(word, wasCorrect);

  if (isInjectedReview) {
    if (wasCorrect) session.reviewedIds.add(word.id);
    else insertWordLater(word.id, 2);
  } else if (
    wasCorrect &&
    (session.reviewOnly || newStrength >= 3)
  ) {
    session.mastered.add(word.id);
  } else {
    insertWordLater(word.id, 2);
  }

  const card = document.querySelector(".quiz-kana-wrap");
  const input = document.querySelector("#kana-answer");
  const feedback = document.querySelector(".feedback");
  const revealButton = document.querySelector(".reveal-button");
  input.disabled = true;
  revealButton.hidden = true;
  if (wasCorrect) {
    card.classList.add("quiz-card-correct");
    feedback.className = "feedback correct";
    feedback.textContent =
      !isReview && newStrength < 3
        ? `Richtig — ${word.primary} · noch ${3 - newStrength}×`
        : `Richtig — ${word.primary}`;
  } else {
    card.classList.add("quiz-card-wrong");
    feedback.className = "feedback wrong";
    feedback.textContent = `${revealed ? "Antwort" : "Noch nicht"} — ${word.primary}`;
  }

  state.timer = window.setTimeout(
    () => {
      if (!state.session || state.session !== session) return;
      maybeInsertWordReview();
      advanceWordSession();
    },
    wasCorrect ? 650 : 1550,
  );
}

function finishWordSession() {
  const session = state.session;
  if (!session || session.kind !== "words") return;
  const durationSeconds = Math.max(
    1,
    Math.round((Date.now() - session.startedAt) / 1000),
  );
  const result = {
    kind: "words",
    source: session.source,
    itemIds: [...session.itemIds],
    total: session.itemIds.length,
    attempts: session.attempts,
    correctAttempts: session.correctAttempts,
    wrongAttempts: session.wrongAttempts,
    mistakesById: { ...session.mistakesById },
    accuracy: formatPercent(session.correctAttempts, session.attempts),
    durationSeconds,
    maintenance: session.maintenance,
  };
  notifyAndroidSession("words", durationSeconds, result.total);
  data.wordSessions.push({
    date: localDateKey(),
    total: result.total,
    attempts: result.attempts,
    wrong: result.wrongAttempts,
  });
  data.wordSessions = data.wordSessions.slice(-365);
  saveData();
  state.lastResult = result;
  state.session = null;
  state.view = "result";
  renderWordResult();
}

function startKanjiWordSession(wordPool = null, sourceOverride = null) {
  const focusedPractice = Array.isArray(wordPool);
  const eligible = focusedPractice ? wordPool : getEligibleKanjiWords();
  const weakWords = eligible.filter(
    (word) => getKanjiWordStrength(word.id) < 3,
  );
  const maintenance = !focusedPractice && weakWords.length === 0;
  const candidates = focusedPractice
    ? eligible
    : maintenance
      ? [...eligible].sort(
          (a, b) =>
            Number(data.kanjiWords[a.id]?.lastPrompt || 0) -
            Number(data.kanjiWords[b.id]?.lastPrompt || 0),
        )
      : weakWords;
  const cycleWords = candidates.slice(0, 4);
  if (!maintenance && !focusedPractice && cycleWords.length < 3) {
    const cycleIds = new Set(cycleWords.map((word) => word.id));
    const reviewFillers = eligible
      .filter(
        (word) =>
          !cycleIds.has(word.id) && getKanjiWordStrength(word.id) >= 3,
      )
      .sort(
        (a, b) =>
          Number(data.kanjiWords[a.id]?.lastPrompt || 0) -
          Number(data.kanjiWords[b.id]?.lastPrompt || 0),
      );
    cycleWords.push(...reviewFillers.slice(0, 3 - cycleWords.length));
  }
  if (!cycleWords.length) {
    showToast("Für dieses Level sind noch keine Kanji-Wörter vorhanden.");
    return;
  }

  clearTimeout(state.timer);
  state.session = {
    kind: "kanji-words",
    source: sourceOverride || (maintenance ? "maintenance" : "kanji-word-cycle"),
    maxLevel: state.maxKanjiWordLevel,
    cycleIds: cycleWords.map((word) => word.id),
    itemIds: cycleWords.map((word) => word.id),
    queue: shuffle(cycleWords.map((word) => word.id)),
    currentId: null,
    mastered: new Set(),
    reviewedIds: new Set(),
    maintenance,
    reviewOnly: sourceOverride === "kanji-word-review",
    attempts: 0,
    correctAttempts: 0,
    wrongAttempts: 0,
    mistakesById: {},
    startedAt: Date.now(),
    locked: false,
    awaitingAdvance: false,
  };
  state.view = "quiz";
  advanceKanjiWordSession();
}

function startHardKanjiWordSession() {
  const hardWords = getHardKanjiWords();
  if (!hardWords.length) {
    showToast("Noch keine schwierigen Kanji-Wörter gespeichert.");
    return;
  }
  startKanjiWordSession(hardWords.slice(0, 4), "hard-kanji-words");
}

function startKanjiWordReviewSession() {
  const dueWords = getGlobalKanjiWordReviews().slice(0, 20);
  if (!dueWords.length) {
    showToast("Gerade ist keine Kanji-Wort-Wiederholung fällig.");
    return;
  }
  startKanjiWordSession(dueWords, "kanji-word-review");
}

function advanceKanjiWordSession() {
  const session = state.session;
  if (!session || session.kind !== "kanji-words") return;
  if (session.queue.length === 0) {
    const cycleComplete = session.cycleIds.every((id) =>
      session.mastered.has(id),
    );
    if (cycleComplete) {
      finishKanjiWordSession();
      return;
    }
    session.queue = shuffle(
      session.cycleIds.filter((id) => !session.mastered.has(id)),
    );
  }
  session.currentId = session.queue.shift();
  session.locked = false;
  session.awaitingAdvance = false;
  renderKanjiWordQuiz();
}

function insertKanjiWordLater(wordId, minDistance = 2) {
  const session = state.session;
  if (
    !session ||
    session.kind !== "kanji-words" ||
    session.queue.includes(wordId)
  ) {
    return;
  }
  const minIndex = Math.min(minDistance, session.queue.length);
  const maxIndex = Math.min(minDistance + 2, session.queue.length);
  const insertionIndex =
    minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
  session.queue.splice(insertionIndex, 0, wordId);
}

function maybeInsertKanjiWordReview() {
  const session = state.session;
  if (!session || session.kind !== "kanji-words") return;
  if (session.source === "hard-kanji-words" || session.reviewOnly) return;
  const excluded = new Set([
    ...session.cycleIds,
    ...session.queue,
    ...session.reviewedIds,
    session.currentId,
  ]);
  const review = getGlobalKanjiWordReviews()
    .filter((word) => !excluded.has(word.id))
    .sort(
      (a, b) =>
        Number(data.kanjiWords[a.id]?.lastPrompt || 0) -
        Number(data.kanjiWords[b.id]?.lastPrompt || 0),
    )[0];
  if (review) insertKanjiWordLater(review.id, 2);
}

function renderKanjiWordQuiz() {
  const session = state.session;
  if (!session || session.kind !== "kanji-words") return;
  const word = KANJI_WORD_BY_ID.get(session.currentId);
  const isReview = session.reviewOnly || !session.cycleIds.includes(word.id);
  const focusedPractice = session.source === "hard-kanji-words";
  const total = session.cycleIds.length;
  const mastered = session.mastered.size;
  const accuracy = formatPercent(session.correctAttempts, session.attempts);
  const strength = getKanjiWordStrength(word.id);
  const wordLength = [...word.spelling].length;
  const lengthClass =
    wordLength >= 6 ? "word-long" : wordLength >= 4 ? "word-medium" : "";

  document.body.classList.add("is-quizzing");
  app.innerHTML = `
    <div class="quiz-view word-quiz-view kanji-word-quiz-view">
      <div class="quiz-top">
        <button class="icon-button" type="button" data-action="quit-session"><span aria-hidden="true">←</span> Beenden</button>
        <div class="progress-wrap" aria-label="${mastered} von ${total} Kanji-Wörtern sicher">
          <div class="progress-track"><div class="progress-fill kanji-word-progress" style="width: ${(mastered / total) * 100}%"></div></div>
          <span class="progress-label">${mastered} / ${total}</span>
        </div>
        <div class="quiz-stats">
          <div class="quiz-stat"><span>Gruppe</span><strong>${total} ${total === 1 ? "Wort" : "Wörter"}</strong></div>
          <div class="quiz-stat"><span>Genauigkeit</span><strong>${accuracy}</strong></div>
          <div class="quiz-stat"><span>Fehler</span><strong>${session.wrongAttempts}</strong></div>
        </div>
      </div>

      <section class="quiz-stage word-quiz-stage kanji-word-quiz-stage" aria-labelledby="quiz-prompt">
        <div class="word-cycle-badge kanji-word-badge${isReview ? " review" : ""}${focusedPractice ? " hard-word-badge" : ""}">
          ${focusedPractice ? `◆ Schwierige Kanji-Wörter · ${word.level}` : isReview ? "↻ Langzeit-Wiederholung" : `Kanji-Wortgruppe · ${word.level}`}
        </div>
        <p class="quiz-prompt" id="quiz-prompt">Was bedeutet dieses Kanji-Wort?</p>
        <div class="quiz-kana-wrap word-card-wrap kanji-word-card-wrap">
          <span class="quiz-script-tag">${word.level} · Kanji-Wort</span>
          <div class="quiz-kana quiz-word quiz-kanji-word ${lengthClass}" lang="ja">${word.spelling}</div>
        </div>

        <div class="word-confidence">${wordConfidenceDots(strength)}</div>
        <div class="kanji-word-learning-note" hidden>
          <span><small>Kana-Lesung</small><strong lang="ja">${word.reading}</strong></span>
          <span><small>Deutsche Bedeutung</small><strong>${word.primary}</strong>${word.answers.length > 1 ? `<em>Auch: ${word.answers.slice(1).join(", ")}</em>` : ""}</span>
        </div>

        <form class="answer-form word-answer-form kanji-word-answer-form" autocomplete="off">
          <label class="answer-label" for="kana-answer">Deutsche Bedeutung</label>
          <div class="input-shell">
            <input
              class="answer-input"
              id="kana-answer"
              name="answer"
              type="text"
              inputmode="text"
              enterkeyhint="go"
              autocapitalize="none"
              autocorrect="off"
              spellcheck="false"
              aria-describedby="answer-feedback"
              placeholder="z. B. Schule"
              maxlength="64"
            >
            <span class="enter-hint" aria-hidden="true">↵</span>
          </div>
          <div class="answer-meta">
            <p class="feedback" id="answer-feedback" aria-live="polite"></p>
            <button class="reveal-button" type="button" data-action="reveal-kanji-word-answer">Antwort zeigen</button>
            <button class="kanji-continue-button kanji-word-continue-button" type="submit" hidden>
              Weiter <span>Enter ↵</span>
            </button>
          </div>
        </form>
        <p class="queue-note"><span aria-hidden="true">読</span> Nach jeder Antwort siehst du die Kana-Lesung. Ein Fehler kommt später erneut.</p>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() =>
    document.querySelector("#kana-answer")?.focus({ preventScroll: true }),
  );
}

function submitKanjiWordAnswer(rawAnswer, revealed = false) {
  const session = state.session;
  if (!session || session.kind !== "kanji-words") return;
  if (session.awaitingAdvance) {
    session.awaitingAdvance = false;
    maybeInsertKanjiWordReview();
    advanceKanjiWordSession();
    return;
  }
  if (session.locked) return;
  const word = KANJI_WORD_BY_ID.get(session.currentId);
  const answer = normalizeGerman(rawAnswer);
  if (!answer && !revealed) return;
  const wasCorrect =
    !revealed && word.answers.map(normalizeGerman).includes(answer);
  const isReview = session.reviewOnly || !session.cycleIds.includes(word.id);

  session.locked = true;
  session.attempts += 1;
  if (wasCorrect) session.correctAttempts += 1;
  else {
    session.wrongAttempts += 1;
    session.mistakesById[word.id] =
      (session.mistakesById[word.id] || 0) + 1;
  }
  const newStrength = recordKanjiWordAttempt(word, wasCorrect);

  if (isReview) {
    if (wasCorrect) {
      session.reviewedIds.add(word.id);
      if (session.reviewOnly) session.mastered.add(word.id);
    }
    else insertKanjiWordLater(word.id, 2);
  } else if (wasCorrect && (session.maintenance || newStrength >= 3)) {
    session.mastered.add(word.id);
  } else {
    insertKanjiWordLater(word.id, 2);
  }

  const card = document.querySelector(".quiz-kana-wrap");
  const input = document.querySelector("#kana-answer");
  const feedback = document.querySelector(".feedback");
  const revealButton = document.querySelector(".reveal-button");
  const continueButton = document.querySelector(".kanji-word-continue-button");
  const learningNote = document.querySelector(".kanji-word-learning-note");
  input.disabled = true;
  revealButton.hidden = true;
  learningNote.hidden = false;
  if (wasCorrect) {
    card.classList.add("quiz-card-correct");
    feedback.className = "feedback correct";
    feedback.textContent =
      !isReview && !session.maintenance && newStrength < 3
        ? `Richtig — ${word.primary} · noch ${3 - newStrength}×`
        : `Richtig — ${word.primary}`;
  } else {
    card.classList.add("quiz-card-wrong");
    feedback.className = "feedback wrong";
    feedback.textContent = revealed ? "Lösung" : "Falsch";
    session.awaitingAdvance = true;
    continueButton.hidden = false;
    requestAnimationFrame(() =>
      continueButton.focus({ preventScroll: true }),
    );
  }

  if (wasCorrect) {
    state.timer = window.setTimeout(() => {
      if (!state.session || state.session !== session) return;
      maybeInsertKanjiWordReview();
      advanceKanjiWordSession();
    }, 1450);
  }
}

function finishKanjiWordSession() {
  const session = state.session;
  if (!session || session.kind !== "kanji-words") return;
  const durationSeconds = Math.max(
    1,
    Math.round((Date.now() - session.startedAt) / 1000),
  );
  const result = {
    kind: "kanji-words",
    source: session.source,
    itemIds: [...session.cycleIds],
    total: session.cycleIds.length,
    attempts: session.attempts,
    correctAttempts: session.correctAttempts,
    wrongAttempts: session.wrongAttempts,
    mistakesById: { ...session.mistakesById },
    accuracy: formatPercent(session.correctAttempts, session.attempts),
    durationSeconds,
    maintenance: session.maintenance,
  };
  notifyAndroidSession("kanji-words", durationSeconds, result.total);
  data.kanjiWordSessions.push({
    date: localDateKey(),
    total: result.total,
    attempts: result.attempts,
    wrong: result.wrongAttempts,
  });
  data.kanjiWordSessions = data.kanjiWordSessions.slice(-365);
  saveData();
  state.lastResult = result;
  state.session = null;
  state.view = "result";
  renderKanjiWordResult();
}

function speakJapanese(text, rate = 0.9) {
  if (window.Android?.speakJapanese) {
    window.Android.speakJapanese(text, Number(rate) || 0.9);
    return;
  }
  if (!("speechSynthesis" in window)) {
    showToast("Dieser Browser unterstützt keine Sprachausgabe.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = Number(rate) || 0.9;
  utterance.pitch = 1;
  const japaneseVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith("ja"));
  if (japaneseVoice) utterance.voice = japaneseVoice;
  window.speechSynthesis.speak(utterance);
}

function releaseConversationMedia({ keepRecording = false } = {}) {
  window.speechSynthesis?.cancel();
  if (recordingTimer) {
    window.clearInterval(recordingTimer);
    recordingTimer = null;
  }
  recordingStartedAt = 0;
  if (!keepRecording && activeMediaRecorder?.state === "recording") {
    activeMediaRecorder.ondataavailable = null;
    activeMediaRecorder.onstop = null;
    activeMediaRecorder.stop();
  }
  if (!keepRecording) activeMediaRecorder = null;
  if (!keepRecording && activeMediaStream) {
    activeMediaStream.getTracks().forEach((track) => track.stop());
    activeMediaStream = null;
  }
  if (!keepRecording && recordedAudioUrl) {
    URL.revokeObjectURL(recordedAudioUrl);
    recordedAudioUrl = null;
  }
}

async function toggleConversationRecording() {
  const button = document.querySelector('[data-action="toggle-recording"]');
  const status = document.querySelector("#recording-status");
  if (activeMediaRecorder?.state === "recording") {
    if (recordingTimer) {
      window.clearInterval(recordingTimer);
      recordingTimer = null;
    }
    activeMediaRecorder.stop();
    if (button) button.innerHTML = '<span aria-hidden="true">●</span> Neu aufnehmen';
    if (status) status.textContent = "Aufnahme wird vorbereitet …";
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia || !("MediaRecorder" in window)) {
    showToast("Die Mikrofonaufnahme wird in diesem Browser nicht unterstützt.");
    return;
  }

  try {
    activeMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    activeMediaRecorder = new MediaRecorder(activeMediaStream);
    activeMediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) chunks.push(event.data);
    });
    activeMediaRecorder.addEventListener("stop", () => {
      if (recordingTimer) {
        window.clearInterval(recordingTimer);
        recordingTimer = null;
      }
      const mimeType = activeMediaRecorder?.mimeType || "audio/webm";
      const blob = new Blob(chunks, { type: mimeType });
      if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
      recordedAudioUrl = URL.createObjectURL(blob);
      const player = document.querySelector("#conversation-recording");
      if (player) {
        player.src = recordedAudioUrl;
        player.hidden = false;
      }
      activeMediaStream?.getTracks().forEach((track) => track.stop());
      activeMediaStream = null;
      activeMediaRecorder = null;
      const currentStatus = document.querySelector("#recording-status");
      if (currentStatus)
        currentStatus.textContent =
          "Fertig – höre erst dich, dann das Modell und vergleiche gezielt.";
      const timerLabel = document.querySelector("#recording-time");
      if (timerLabel && recordingStartedAt) {
        const seconds = Math.max(1, Math.round((Date.now() - recordingStartedAt) / 1000));
        timerLabel.textContent = `${seconds} s`;
      }
      document.querySelector(".recording-visualizer")?.classList.remove("active");
      recordingStartedAt = 0;
    });
    activeMediaRecorder.start();
    recordingStartedAt = Date.now();
    const updateRecordingTime = () => {
      const timerLabel = document.querySelector("#recording-time");
      if (timerLabel)
        timerLabel.textContent = `${Math.floor((Date.now() - recordingStartedAt) / 1000)} s`;
    };
    updateRecordingTime();
    recordingTimer = window.setInterval(updateRecordingTime, 250);
    document.querySelector(".recording-visualizer")?.classList.add("active");
    if (button)
      button.innerHTML = '<span aria-hidden="true">■</span> Aufnahme stoppen';
    if (status)
      status.textContent =
        "Aufnahme läuft … Sprich deine Antwort in normalem Tempo.";
  } catch {
    if (recordingTimer) {
      window.clearInterval(recordingTimer);
      recordingTimer = null;
    }
    recordingStartedAt = 0;
    activeMediaStream?.getTracks().forEach((track) => track.stop());
    activeMediaStream = null;
    activeMediaRecorder = null;
    showToast("Mikrofonzugriff nicht verfügbar. Du kannst ohne Aufnahme weiterüben.");
    if (status)
      status.textContent =
        "Kein Mikrofonzugriff – die übrigen Übungen funktionieren weiterhin.";
  }
}

function splitIntoMora(reading) {
  const smallKana = /[ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ]/;
  const punctuation = /[\s。、！？,.!?]/;
  const mora = [];
  for (const character of [...reading]) {
    if (punctuation.test(character)) {
      if (mora.at(-1) !== "|") mora.push("|");
    } else if (smallKana.test(character) && mora.length && mora.at(-1) !== "|") {
      mora[mora.length - 1] += character;
    } else {
      mora.push(character);
    }
  }
  while (mora.at(-1) === "|") mora.pop();
  return mora;
}

function renderMoraRhythm(reading) {
  return splitIntoMora(reading)
    .map((mora) =>
      mora === "|"
        ? '<i class="mora-pause" aria-label="kurze Pause">Pause</i>'
        : `<span class="${mora === "っ" || mora === "ッ" ? "mora-stop" : ""}" lang="ja">${mora}</span>`,
    )
    .join("");
}

function renderIntonationPattern(segments) {
  const markers = {
    rise: "↗",
    high: "→",
    fall: "↘",
    focus: "◆",
    question: "↗",
  };
  return segments
    .map(
      ([text, tone]) => `
        <span class="intonation-segment tone-${tone}">
          <b lang="ja">${text}</b><i aria-hidden="true">${markers[tone] || "→"}</i>
        </span>
      `,
    )
    .join("");
}

function startConversationSession(conversationPool = null, sourceOverride = null) {
  const eligible = conversationPool || getEligibleConversations();
  const weakConversations = eligible.filter(
    (conversation) => getConversationStrength(conversation.id) < 3,
  );
  const focusedPractice = Boolean(conversationPool);
  const maintenance = !focusedPractice && weakConversations.length === 0;
  const candidates = focusedPractice
    ? eligible
    : maintenance
      ? [...eligible].sort(
          (a, b) =>
            Number(data.conversations[a.id]?.lastPrompt || 0) -
            Number(data.conversations[b.id]?.lastPrompt || 0),
        )
      : weakConversations;
  const cycleConversations = candidates.slice(0, 4);

  if (!focusedPractice && !maintenance && cycleConversations.length < 3) {
    const cycleIds = new Set(
      cycleConversations.map((conversation) => conversation.id),
    );
    const reviewFillers = eligible
      .filter(
        (conversation) =>
          !cycleIds.has(conversation.id) &&
          getConversationStrength(conversation.id) >= 3,
      )
      .sort(
        (a, b) =>
          Number(data.conversations[a.id]?.lastPrompt || 0) -
          Number(data.conversations[b.id]?.lastPrompt || 0),
      );
    cycleConversations.push(
      ...reviewFillers.slice(0, 3 - cycleConversations.length),
    );
  }
  if (!cycleConversations.length) {
    showToast("Für diese Stufe sind noch keine Gespräche vorhanden.");
    return;
  }

  clearTimeout(state.timer);
  releaseConversationMedia();
  state.session = {
    kind: "conversation",
    source:
      sourceOverride ||
      (maintenance ? "conversation-maintenance" : "conversation-cycle"),
    maxLevel: state.maxConversationLevel,
    cycleIds: cycleConversations.map((conversation) => conversation.id),
    itemIds: cycleConversations.map((conversation) => conversation.id),
    queue: shuffle(cycleConversations.map((conversation) => conversation.id)),
    currentId: null,
    mastered: new Set(),
    reviewedIds: new Set(),
    maintenance,
    reviewOnly: sourceOverride === "conversation-review",
    practiceMode: state.conversationPracticeMode,
    attempts: 0,
    correctAttempts: 0,
    partialAttempts: 0,
    wrongAttempts: 0,
    mistakesById: {},
    startedAt: Date.now(),
    revealed: false,
    hintVisible: false,
    locked: false,
    awaitingAdvance: false,
    lastRating: null,
  };
  state.view = "quiz";
  advanceConversationSession();
}

function startHardConversationSession() {
  const hardConversations = getHardConversations().slice(0, 4);
  if (!hardConversations.length) {
    showToast("Noch keine schwierigen Gespräche gespeichert.");
    return;
  }
  startConversationSession(hardConversations, "hard-conversations");
}

function startConversationReviewSession() {
  const dueConversations = getGlobalConversationReviews();
  if (!dueConversations.length) {
    showToast("Gerade ist keine Sprech-Wiederholung fällig.");
    return;
  }
  startConversationSession(dueConversations, "conversation-review");
}

function advanceConversationSession() {
  const session = state.session;
  if (!session || session.kind !== "conversation") return;
  releaseConversationMedia();
  if (session.queue.length === 0) {
    const cycleComplete = session.cycleIds.every((id) =>
      session.mastered.has(id),
    );
    if (cycleComplete) {
      finishConversationSession();
      return;
    }
    session.queue = shuffle(
      session.cycleIds.filter((id) => !session.mastered.has(id)),
    );
  }
  session.currentId = session.queue.shift();
  session.revealed = session.practiceMode === "shadowing";
  session.hintVisible = false;
  session.locked = false;
  session.awaitingAdvance = false;
  session.lastRating = null;
  renderConversationQuiz();
}

function insertConversationLater(conversationId, minDistance = 2) {
  const session = state.session;
  if (
    !session ||
    session.kind !== "conversation" ||
    session.queue.includes(conversationId)
  ) {
    return;
  }
  const minIndex = Math.min(minDistance, session.queue.length);
  const maxIndex = Math.min(minDistance + 2, session.queue.length);
  const insertionIndex =
    minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
  session.queue.splice(insertionIndex, 0, conversationId);
}

function maybeInsertConversationReview() {
  const session = state.session;
  if (!session || session.kind !== "conversation") return;
  if (session.reviewOnly || session.source === "hard-conversations") return;
  const excluded = new Set([
    ...session.cycleIds,
    ...session.queue,
    ...session.reviewedIds,
    session.currentId,
  ]);
  const review = getGlobalConversationReviews()
    .filter(
      (conversation) =>
        !excluded.has(conversation.id) && isConversationReviewDue(conversation),
    )
    .sort(
      (a, b) =>
        Number(data.conversations[a.id]?.lastPrompt || 0) -
        Number(data.conversations[b.id]?.lastPrompt || 0),
    )[0];
  if (review) insertConversationLater(review.id, 2);
}

function revealConversationAnswer() {
  const session = state.session;
  if (!session || session.kind !== "conversation" || session.locked) return;
  if (activeMediaRecorder?.state === "recording") {
    showToast("Stoppe zuerst deine Aufnahme, damit sie erhalten bleibt.");
    return;
  }
  session.revealed = true;
  renderConversationQuiz();
}

function toggleConversationHint() {
  const session = state.session;
  if (!session || session.kind !== "conversation" || session.revealed) return;
  session.hintVisible = !session.hintVisible;
  renderConversationQuiz();
}

function continueConversationSession() {
  const session = state.session;
  if (!session || session.kind !== "conversation" || !session.awaitingAdvance)
    return;
  maybeInsertConversationReview();
  advanceConversationSession();
}

function renderConversationQuiz() {
  const session = state.session;
  if (!session || session.kind !== "conversation") return;
  const conversation = CONVERSATION_BY_ID.get(session.currentId);
  const isReview =
    session.reviewOnly || !session.cycleIds.includes(conversation.id);
  const total = session.cycleIds.length;
  const mastered = session.mastered.size;
  const confidence = formatPercent(
    session.correctAttempts,
    session.attempts,
  );
  const strength = getConversationStrength(conversation.id);
  const existingRecording = recordedAudioUrl
    ? `src="${recordedAudioUrl}"`
    : "";
  const modeLabel =
    session.practiceMode === "shadowing"
      ? "Shadowing"
      : session.practiceMode === "guided"
        ? "Geführt"
        : "Rollenspiel";
  const topic = CONVERSATION_TOPICS.find(
    (entry) => entry.id === conversation.topic,
  );

  document.body.classList.add("is-quizzing");
  app.innerHTML = `
    <div class="quiz-view conversation-quiz-view">
      <div class="quiz-top">
        <button class="icon-button" type="button" data-action="quit-session"><span aria-hidden="true">←</span> Beenden</button>
        <div class="progress-wrap" aria-label="${mastered} von ${total} Gesprächen sicher">
          <div class="progress-track"><div class="progress-fill conversation-progress" style="width: ${(mastered / total) * 100}%"></div></div>
          <span class="progress-label">${mastered} / ${total}</span>
        </div>
        <div class="quiz-stats">
          <div class="quiz-stat"><span>Gruppe</span><strong>${total} Situationen</strong></div>
          <div class="quiz-stat"><span>Sicher</span><strong>${confidence}</strong></div>
          <div class="quiz-stat"><span>Noch üben</span><strong>${session.wrongAttempts}</strong></div>
        </div>
      </div>

      <section class="conversation-practice-card" aria-labelledby="conversation-situation">
        <div class="conversation-card-head">
          <span class="word-cycle-badge conversation-badge ${isReview ? "review" : ""}">${isReview ? "↻ Langzeit-Wiederholung" : `${conversation.level} · ${modeLabel} · ${session.cycleIds.indexOf(conversation.id) + 1}/${total}`}</span>
          <div class="word-confidence" aria-label="${strength} von 3 sicheren Durchgängen">${wordConfidenceDots(strength)}</div>
        </div>

        <div class="situation-heading">
          <span>${topic?.icon || "会"} · ${topic?.title || "Situation"}</span>
          <h1 id="conversation-situation">${conversation.situation}</h1>
        </div>

        <div class="dialogue-bubble partner-bubble">
          <span class="speaker-label">Gesprächspartner</span>
          <div><strong lang="ja">${conversation.partner}</strong><small>${conversation.partnerGerman}</small></div>
          <button type="button" data-action="speak-japanese" data-speech="${conversation.partner}" data-rate="0.9" aria-label="Gesprächspartner anhören"><span aria-hidden="true">▶</span></button>
        </div>

        <div class="conversation-task">
          <span aria-hidden="true">あなた</span>
          <div><small>Deine Aufgabe</small><strong>${conversation.task}</strong></div>
        </div>

        ${
          session.practiceMode === "guided" && !session.revealed
            ? `
              <section class="conversation-coach${session.hintVisible ? " open" : ""}" aria-label="Satzbauhilfe">
                <button type="button" data-action="toggle-conversation-hint" aria-expanded="${session.hintVisible}">
                  <span aria-hidden="true">組</span><span><strong>${session.hintVisible ? "Satzbausteine ausblenden" : "Einen Satzbau-Hinweis öffnen"}</strong><small>Nur so viel Hilfe wie nötig</small></span><em>${session.hintVisible ? "×" : "+"}</em>
                </button>
                ${session.hintVisible ? `<div class="coach-chunks">${conversation.intonation.map(([text], index) => `<span><small>${index + 1}</small><b lang="ja">${text}</b></span>`).join("")}</div>` : ""}
              </section>
            `
            : ""
        }

        <section class="recording-studio" aria-labelledby="recording-title">
          <div class="recording-copy">
            <small id="recording-title">Deine Stimme · freiwillig</small>
            <strong>${session.practiceMode === "shadowing" ? "Höre einen Abschnitt und sprich direkt mit oder knapp danach." : "Antworte laut – möglichst ohne den deutschen Satz abzulesen."}</strong>
            <p id="recording-status">Die Aufnahme bleibt nur lokal und wird bei der nächsten Situation gelöscht.</p>
          </div>
          <div class="recording-meter" aria-hidden="true">
            <span class="recording-visualizer"><i></i><i></i><i></i><i></i><i></i></span>
            <b id="recording-time">${activeMediaRecorder?.state === "recording" ? "0 s" : "Bereit"}</b>
          </div>
          <button class="record-button" type="button" data-action="toggle-recording"><span aria-hidden="true">●</span> ${recordedAudioUrl ? "Neu aufnehmen" : "Aufnehmen"}</button>
          <div class="own-recording" ${recordedAudioUrl ? "" : "hidden"}><small>Deine Aufnahme</small><audio id="conversation-recording" controls ${existingRecording}></audio></div>
        </section>

        ${
          session.revealed
            ? `
              <div class="model-answer" aria-live="polite">
                <div class="model-answer-heading"><span>Natürliches Antwortmodell</span><div><button type="button" data-action="speak-japanese" data-speech="${conversation.target}" data-rate="0.9"><span aria-hidden="true">▶</span> Natürlich</button><button type="button" data-action="speak-japanese" data-speech="${conversation.target}" data-rate="0.62"><span aria-hidden="true">◐</span> Langsam</button></div></div>
                <strong lang="ja">${conversation.target}</strong>
                <span class="kana-reading" lang="ja">${conversation.reading}</span>
                <p>${conversation.german}</p>
                ${conversation.alternative ? `<div class="answer-alternative"><small>Auch natürlich möglich</small><span lang="ja">${conversation.alternative}</span><button type="button" data-action="speak-japanese" data-speech="${conversation.alternative}" data-rate="0.86" aria-label="Alternative Antwort anhören">▶</button></div>` : ""}
              </div>

              <section class="chunk-shadowing" aria-label="Antwort in Sinnabschnitten üben">
                <div><small>Abschnitt für Abschnitt</small><strong>Hören → kurz pausieren → mit gleichem Rhythmus nachsprechen</strong></div>
                <div class="chunk-buttons">
                  ${conversation.intonation.map(([text, tone], index) => `<button type="button" data-action="speak-japanese" data-speech="${text}" data-rate="0.72"><span>${index + 1}</span><b lang="ja">${text}</b><em aria-hidden="true">${{ rise: "↗", high: "→", fall: "↘", focus: "◆", question: "↗" }[tone] || "→"}</em></button>`).join("")}
                </div>
              </section>

              <div class="speech-analysis-grid">
                <section class="intonation-panel">
                  <div class="analysis-heading"><span aria-hidden="true">↗↘</span><div><small>Phrasenkontur · Richtwert</small><strong>Informationsfluss und Satzschluss</strong></div></div>
                  <div class="intonation-track">${renderIntonationPattern(conversation.intonation)}</div>
                  <p>↗ neu ansetzen · → tragen · ↘ abschließen · ◆ Information hervorheben. Das ist keine wortgenaue Pitch-Akzent-Notation.</p>
                </section>
                <section class="mora-panel">
                  <div class="analysis-heading"><span aria-hidden="true">拍</span><div><small>Mora-Rhythmus</small><strong>Jede Kachel bekommt einen Schlag</strong></div></div>
                  <div class="mora-track">${renderMoraRhythm(conversation.reading)}</div>
                </section>
              </div>

              <div class="conversation-notes">
                <div><span aria-hidden="true">口</span><p><small>Aussprache-Tipp</small>${conversation.tip}</p></div>
                <div><span aria-hidden="true">礼</span><p><small>Natürlich & passend</small>${conversation.culture}</p></div>
              </div>

              <div class="conversation-assessment">
                <div class="assessment-heading"><small>Deine ehrliche Bewertung</small><strong>Vergleiche Inhalt, Verständlichkeit und Rhythmus – nicht deine Stimme.</strong></div>
                <div class="speaking-rubric" role="group" aria-label="Sprechleistung bewerten">
                  <button class="practice-more-button" type="button" data-action="assess-conversation" data-score="1"><span>1</span><strong>Noch üben</strong><small>Inhalt fehlte oder schwer verständlich</small></button>
                  <button class="almost-button" type="button" data-action="assess-conversation" data-score="2"><span>2</span><strong>Fast sicher</strong><small>Verständlich, aber noch stockend</small></button>
                  <button class="confident-button" type="button" data-action="assess-conversation" data-score="3"><span>3</span><strong>Sicher</strong><small>Inhalt, Takt und Satzschluss sitzen</small></button>
                </div>
                <p class="conversation-feedback" aria-live="polite"></p>
                <button class="conversation-continue-button" type="button" data-action="continue-conversation" hidden>Weiter zur nächsten Situation <span aria-hidden="true">→</span></button>
              </div>
            `
            : `
              <button class="reveal-conversation-button" type="button" data-action="reveal-conversation-answer">
                Musterantwort & Aussprache öffnen <span aria-hidden="true">→</span>
              </button>
              <p class="conversation-first-tip"><span aria-hidden="true">灯</span> Formuliere laut, auch wenn du noch nicht jedes Wort kennst. Ziel ist eine passende Reaktion, nicht das Erraten exakt dieses Modells.</p>
            `
        }
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function assessConversation(rating) {
  const session = state.session;
  if (
    !session ||
    session.kind !== "conversation" ||
    !session.revealed ||
    session.locked
  ) {
    return;
  }
  const numericRating = Math.max(1, Math.min(3, Number(rating) || 1));
  const wasConfident = numericRating === 3;
  const conversation = CONVERSATION_BY_ID.get(session.currentId);
  const isReview =
    session.reviewOnly || !session.cycleIds.includes(conversation.id);
  session.locked = true;
  session.awaitingAdvance = true;
  session.lastRating = numericRating;
  session.attempts += 1;
  if (wasConfident) {
    session.correctAttempts += 1;
  } else if (numericRating === 2) {
    session.partialAttempts += 1;
  } else {
    session.wrongAttempts += 1;
    session.mistakesById[conversation.id] =
      (session.mistakesById[conversation.id] || 0) + 1;
  }
  const newStrength = recordConversationAttempt(conversation, numericRating);

  if (isReview) {
    if (wasConfident) {
      session.reviewedIds.add(conversation.id);
      if (session.reviewOnly) session.mastered.add(conversation.id);
    } else insertConversationLater(conversation.id, 2);
  } else if (
    wasConfident &&
    (session.maintenance || newStrength >= 3)
  ) {
    session.mastered.add(conversation.id);
  } else {
    insertConversationLater(conversation.id, 2);
  }

  document.querySelectorAll('[data-action="assess-conversation"]').forEach(
    (button) => {
      button.disabled = true;
    },
  );
  const card = document.querySelector(".conversation-practice-card");
  const feedback = document.querySelector(".conversation-feedback");
  card?.classList.add(
    wasConfident
      ? "conversation-secure"
      : numericRating === 2
        ? "conversation-almost"
        : "conversation-repeat",
  );
  if (feedback) {
    feedback.textContent = wasConfident
      ? newStrength >= 3 || session.maintenance
        ? "Sicher – diese Situation wandert in die Langzeit-Wiederholung."
        : `Guter Durchgang – noch ${3 - newStrength}× sicher sprechen.`
      : numericRating === 2
        ? "Fast geschafft – die Situation bleibt im Zyklus, bis sie ohne Stocken sitzt."
        : "Gute Selbsteinschätzung – höre die Abschnitte nochmals; die Situation kommt wieder.";
  }
  const continueButton = document.querySelector(".conversation-continue-button");
  if (continueButton) {
    continueButton.hidden = false;
    continueButton.focus({ preventScroll: true });
  }
}

function finishConversationSession() {
  const session = state.session;
  if (!session || session.kind !== "conversation") return;
  releaseConversationMedia();
  const durationSeconds = Math.max(
    1,
    Math.round((Date.now() - session.startedAt) / 1000),
  );
  const result = {
    kind: "conversation",
    source: session.source,
    itemIds: [...session.cycleIds],
    total: session.cycleIds.length,
    attempts: session.attempts,
    correctAttempts: session.correctAttempts,
    partialAttempts: session.partialAttempts,
    wrongAttempts: session.wrongAttempts,
    mistakesById: { ...session.mistakesById },
    accuracy: formatPercent(session.correctAttempts, session.attempts),
    durationSeconds,
    maintenance: session.maintenance,
  };
  notifyAndroidSession("conversation", durationSeconds, result.total);
  data.conversationSessions.push({
    date: localDateKey(),
    total: result.total,
    attempts: result.attempts,
    wrong: result.wrongAttempts,
  });
  data.conversationSessions = data.conversationSessions.slice(-365);
  saveData();
  state.lastResult = result;
  state.session = null;
  state.view = "result";
  renderConversationResult();
}

function startKanjiSession(kanjiPool = null, sourceOverride = null) {
  const focusedPractice = Array.isArray(kanjiPool);
  const eligible = focusedPractice ? kanjiPool : getEligibleKanji();
  const weakKanji = eligible.filter((kanji) => getKanjiStrength(kanji.id) < 3);
  const maintenance = !focusedPractice && weakKanji.length === 0;
  const candidates = focusedPractice
    ? eligible
    : maintenance
    ? [...eligible].sort(
        (a, b) =>
          Number(data.kanji[a.id]?.lastPrompt || 0) -
          Number(data.kanji[b.id]?.lastPrompt || 0),
      )
    : weakKanji;
  const cycleKanji = candidates.slice(0, 4);
  if (!focusedPractice && !maintenance && cycleKanji.length < 3) {
    const cycleIds = new Set(cycleKanji.map((kanji) => kanji.id));
    const reviewFillers = eligible
      .filter(
        (kanji) =>
          !cycleIds.has(kanji.id) && getKanjiStrength(kanji.id) >= 3,
      )
      .sort(
        (a, b) =>
          Number(data.kanji[a.id]?.lastPrompt || 0) -
          Number(data.kanji[b.id]?.lastPrompt || 0),
      );
    cycleKanji.push(...reviewFillers.slice(0, 3 - cycleKanji.length));
  }
  if (!cycleKanji.length) {
    showToast("Für dieses Level sind noch keine Kanji vorhanden.");
    return;
  }

  clearTimeout(state.timer);
  state.session = {
    kind: "kanji",
    source: sourceOverride || (maintenance ? "maintenance" : "kanji-cycle"),
    maxLevel: state.maxKanjiLevel,
    sentenceMode: state.kanjiSentenceMode,
    cycleIds: cycleKanji.map((kanji) => kanji.id),
    itemIds: cycleKanji.map((kanji) => kanji.id),
    queue: shuffle(cycleKanji.map((kanji) => kanji.id)),
    currentId: null,
    mastered: new Set(),
    reviewedIds: new Set(),
    maintenance,
    reviewOnly: sourceOverride === "kanji-review",
    attempts: 0,
    correctAttempts: 0,
    wrongAttempts: 0,
    mistakesById: {},
    startedAt: Date.now(),
    locked: false,
    awaitingAdvance: false,
  };
  state.view = "quiz";
  advanceKanjiSession();
}

function startKanjiReviewSession() {
  const dueKanji = getGlobalKanjiReviews().slice(0, 20);
  if (!dueKanji.length) {
    showToast("Gerade ist keine Kanji-Wiederholung fällig.");
    return;
  }
  startKanjiSession(dueKanji, "kanji-review");
}

function advanceKanjiSession() {
  const session = state.session;
  if (!session || session.kind !== "kanji") return;
  if (session.queue.length === 0) {
    const cycleComplete = session.cycleIds.every((id) =>
      session.mastered.has(id),
    );
    if (cycleComplete) {
      finishKanjiSession();
      return;
    }
    session.queue = shuffle(
      session.cycleIds.filter((id) => !session.mastered.has(id)),
    );
  }
  session.currentId = session.queue.shift();
  session.locked = false;
  session.awaitingAdvance = false;
  renderKanjiQuiz();
}

function insertKanjiLater(kanjiId, minDistance = 2) {
  const session = state.session;
  if (
    !session ||
    session.kind !== "kanji" ||
    session.queue.includes(kanjiId)
  ) {
    return;
  }
  const minIndex = Math.min(minDistance, session.queue.length);
  const maxIndex = Math.min(minDistance + 2, session.queue.length);
  const insertionIndex =
    minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
  session.queue.splice(insertionIndex, 0, kanjiId);
}

function maybeInsertKanjiReview() {
  const session = state.session;
  if (!session || session.kind !== "kanji") return;
  if (session.reviewOnly) return;
  const excluded = new Set([
    ...session.cycleIds,
    ...session.queue,
    ...session.reviewedIds,
    session.currentId,
  ]);
  const review = getGlobalKanjiReviews()
    .filter((kanji) => !excluded.has(kanji.id))
    .sort(
      (a, b) =>
        Number(data.kanji[a.id]?.lastPrompt || 0) -
        Number(data.kanji[b.id]?.lastPrompt || 0),
    )[0];
  if (review) insertKanjiLater(review.id, 2);
}

function renderKanjiQuiz() {
  const session = state.session;
  if (!session || session.kind !== "kanji") return;
  const kanji = KANJI_BY_ID.get(session.currentId);
  const isReview = session.reviewOnly || !session.cycleIds.includes(kanji.id);
  const total = session.cycleIds.length;
  const mastered = session.mastered.size;
  const accuracy = formatPercent(session.correctAttempts, session.attempts);
  const strength = getKanjiStrength(kanji.id);
  const sentenceContext = session.sentenceMode
    ? getKanjiSentenceContext(kanji)
    : null;

  document.body.classList.add("is-quizzing");
  app.innerHTML = `
    <div class="quiz-view word-quiz-view kanji-quiz-view">
      <div class="quiz-top">
        <button class="icon-button" type="button" data-action="quit-session"><span aria-hidden="true">←</span> Beenden</button>
        <div class="progress-wrap" aria-label="${mastered} von ${total} Kanji sicher">
          <div class="progress-track"><div class="progress-fill kanji-progress" style="width: ${(mastered / total) * 100}%"></div></div>
          <span class="progress-label">${mastered} / ${total}</span>
        </div>
        <div class="quiz-stats">
          <div class="quiz-stat"><span>Gruppe</span><strong>${total} Kanji</strong></div>
          <div class="quiz-stat"><span>Genauigkeit</span><strong>${accuracy}</strong></div>
          <div class="quiz-stat"><span>Fehler</span><strong>${session.wrongAttempts}</strong></div>
        </div>
      </div>

      <section class="quiz-stage word-quiz-stage kanji-quiz-stage" aria-labelledby="quiz-prompt">
        <div class="word-cycle-badge kanji-badge ${isReview ? "review" : ""}">
          ${isReview ? "↻ Langzeit-Wiederholung" : `Manga-Kanji · ${kanji.level}`}
        </div>
        <p class="quiz-prompt" id="quiz-prompt">${sentenceContext ? "Was bedeutet das markierte Kanji?" : "Was bedeutet dieses Kanji?"}</p>
        ${sentenceContext ? `
          <div class="quiz-kana-wrap kanji-card-wrap sentence-context-card kanji-sentence-context">
            <span class="quiz-script-tag">${kanji.level} · Satzkontext</span>
            <p class="sentence-japanese" lang="ja">${sentenceContext.japanese}</p>
            <div class="sentence-context-answer" hidden>
              <span><small>Lesung</small><strong lang="ja">${sentenceContext.reading}</strong></span>
              <span><small>Deutsch</small><strong>${sentenceContext.german}</strong></span>
            </div>
          </div>
        ` : `
          <div class="quiz-kana-wrap kanji-card-wrap">
            <span class="quiz-script-tag">${kanji.level} · Kanji</span>
            <div class="quiz-kana quiz-kanji" lang="ja">${kanji.character}</div>
          </div>
        `}

        <div class="word-confidence">${wordConfidenceDots(strength)}</div>
        <div class="kanji-learning-note" hidden>
          <span class="kanji-meaning">
            <small>Deutsche Bedeutung</small>
            <strong>${kanji.primary}</strong>
            ${kanji.answers.length > 1 ? `<em>Auch: ${kanji.answers.slice(1).join(", ")}</em>` : ""}
          </span>
          <span><small>Lesung</small><strong lang="ja">${kanji.readings}</strong></span>
          <span><small>Manga-Beispiel</small><strong lang="ja">${kanji.example}</strong></span>
        </div>

        <form class="answer-form word-answer-form kanji-answer-form" autocomplete="off">
          <label class="answer-label" for="kana-answer">${sentenceContext ? "Bedeutung des markierten Kanji" : "Deutsche Bedeutung"}</label>
          <div class="input-shell">
            <input
              class="answer-input"
              id="kana-answer"
              name="answer"
              type="text"
              inputmode="text"
              enterkeyhint="go"
              autocapitalize="none"
              autocorrect="off"
              spellcheck="false"
              aria-describedby="answer-feedback"
              placeholder="z. B. Kraft"
              maxlength="48"
            >
            <span class="enter-hint" aria-hidden="true">↵</span>
          </div>
          <div class="answer-meta">
            <p class="feedback" id="answer-feedback" aria-live="polite"></p>
            <button class="reveal-button" type="button" data-action="reveal-kanji-answer">Antwort zeigen</button>
            <button class="kanji-continue-button" type="submit" hidden>
              Weiter <span>Enter ↵</span>
            </button>
          </div>
        </form>
        <p class="queue-note"><span aria-hidden="true">${sentenceContext ? "文" : "漫"}</span> ${sentenceContext ? "Nach der Antwort erscheinen Satzlesung und deutsche Übersetzung." : "Nach jeder Antwort siehst du Lesung und ein typisches Manga-Beispiel."}</p>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() =>
    document.querySelector("#kana-answer")?.focus({ preventScroll: true }),
  );
}

function submitKanjiAnswer(rawAnswer, revealed = false) {
  const session = state.session;
  if (!session || session.kind !== "kanji") return;
  if (session.awaitingAdvance) {
    session.awaitingAdvance = false;
    maybeInsertKanjiReview();
    advanceKanjiSession();
    return;
  }
  if (session.locked) return;
  const kanji = KANJI_BY_ID.get(session.currentId);
  const answer = normalizeGerman(rawAnswer);
  if (!answer && !revealed) return;
  const wasCorrect =
    !revealed && kanji.answers.map(normalizeGerman).includes(answer);
  const isReview = session.reviewOnly || !session.cycleIds.includes(kanji.id);

  session.locked = true;
  session.attempts += 1;
  if (wasCorrect) session.correctAttempts += 1;
  else {
    session.wrongAttempts += 1;
    session.mistakesById[kanji.id] =
      (session.mistakesById[kanji.id] || 0) + 1;
  }
  const newStrength = recordKanjiAttempt(kanji, wasCorrect);

  if (isReview) {
    if (wasCorrect) {
      session.reviewedIds.add(kanji.id);
      if (session.reviewOnly) session.mastered.add(kanji.id);
    }
    else insertKanjiLater(kanji.id, 2);
  } else if (
    wasCorrect &&
    (session.maintenance || newStrength >= 3)
  ) {
    session.mastered.add(kanji.id);
  } else {
    insertKanjiLater(kanji.id, 2);
  }

  const card = document.querySelector(".quiz-kana-wrap");
  const input = document.querySelector("#kana-answer");
  const feedback = document.querySelector(".feedback");
  const revealButton = document.querySelector(".reveal-button");
  const continueButton = document.querySelector(".kanji-continue-button");
  const learningNote = document.querySelector(".kanji-learning-note");
  const sentenceAnswer = document.querySelector(".sentence-context-answer");
  input.disabled = true;
  revealButton.hidden = true;
  learningNote.hidden = false;
  if (sentenceAnswer) sentenceAnswer.hidden = false;
  if (wasCorrect) {
    card.classList.add("quiz-card-correct");
    feedback.className = "feedback correct";
    feedback.textContent =
      !isReview && !session.maintenance && newStrength < 3
        ? `Richtig — ${kanji.primary} · noch ${3 - newStrength}×`
        : `Richtig — ${kanji.primary}`;
  } else {
    card.classList.add("quiz-card-wrong");
    feedback.className = "feedback wrong";
    feedback.textContent = revealed ? "Lösung" : "Falsch";
    session.awaitingAdvance = true;
    continueButton.hidden = false;
    requestAnimationFrame(() =>
      continueButton.focus({ preventScroll: true }),
    );
  }

  if (wasCorrect) {
    state.timer = window.setTimeout(() => {
      if (!state.session || state.session !== session) return;
      maybeInsertKanjiReview();
      advanceKanjiSession();
    }, session.sentenceMode ? 2600 : 1500);
  }
}

function finishKanjiSession() {
  const session = state.session;
  if (!session || session.kind !== "kanji") return;
  const durationSeconds = Math.max(
    1,
    Math.round((Date.now() - session.startedAt) / 1000),
  );
  const result = {
    kind: "kanji",
    source: session.source,
    itemIds: [...session.cycleIds],
    total: session.cycleIds.length,
    attempts: session.attempts,
    correctAttempts: session.correctAttempts,
    wrongAttempts: session.wrongAttempts,
    mistakesById: { ...session.mistakesById },
    accuracy: formatPercent(session.correctAttempts, session.attempts),
    durationSeconds,
    maintenance: session.maintenance,
    sentenceMode: session.sentenceMode,
  };
  notifyAndroidSession("kanji", durationSeconds, result.total);
  data.kanjiSessions.push({
    date: localDateKey(),
    total: result.total,
    attempts: result.attempts,
    wrong: result.wrongAttempts,
  });
  data.kanjiSessions = data.kanjiSessions.slice(-365);
  saveData();
  state.lastResult = result;
  state.session = null;
  state.view = "result";
  renderKanjiResult();
}

function startSession(items, source = "selection") {
  if (!items.length) {
    showToast("Wähle zuerst mindestens eine Reihe aus.");
    return;
  }

  clearTimeout(state.timer);
  const ids = shuffle(items.map((item) => item.id));
  state.session = {
    kind: "kana",
    source,
    sentenceMode: state.kanaSentenceMode,
    itemIds: items.map((item) => item.id),
    targetIds: new Set(items.map((item) => item.id)),
    queue: ids,
    currentId: null,
    mastered: new Set(),
    reviewedIds: new Set(),
    reviewOnly: source === "kana-review",
    answersSinceReview: 0,
    attempts: 0,
    correctAttempts: 0,
    wrongAttempts: 0,
    mistakesById: {},
    startedAt: Date.now(),
    locked: false,
    feedback: null,
  };
  state.view = "quiz";
  advanceSession();
}

function startKanaReviewSession() {
  const dueKana = getGlobalKanaReviews().slice(0, 20);
  if (!dueKana.length) {
    showToast("Gerade ist keine Kana-Wiederholung fällig.");
    return;
  }
  startSession(dueKana, "kana-review");
}

function insertKanaLater(kanaId, minDistance = 2) {
  const session = state.session;
  if (!session || session.kind !== "kana" || session.queue.includes(kanaId)) return;
  const minIndex = Math.min(minDistance, session.queue.length);
  const maxIndex = Math.min(minDistance + 3, session.queue.length);
  const insertionIndex =
    minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
  session.queue.splice(insertionIndex, 0, kanaId);
}

function maybeInsertKanaReview() {
  const session = state.session;
  if (!session || session.kind !== "kana" || session.reviewOnly || session.source === "hard") return;
  session.answersSinceReview += 1;
  if (session.answersSinceReview < 4) return;
  const excluded = new Set([
    ...session.targetIds,
    ...session.queue,
    ...session.reviewedIds,
    session.currentId,
  ]);
  const review = getGlobalKanaReviews().find((kana) => !excluded.has(kana.id));
  if (review) {
    session.answersSinceReview = 0;
    insertKanaLater(review.id, 2);
  }
}

function advanceSession() {
  const session = state.session;
  if (!session) return;
  if (session.queue.length === 0) {
    finishSession();
    return;
  }
  session.currentId = session.queue.shift();
  session.locked = false;
  session.feedback = null;
  renderQuiz();
}

function renderQuiz() {
  const session = state.session;
  if (!session) return renderHome();
  if (session.kind === "words") return renderWordQuiz();
  if (session.kind === "kanji-words") return renderKanjiWordQuiz();
  if (session.kind === "kanji") return renderKanjiQuiz();
  if (session.kind === "conversation") return renderConversationQuiz();
  const kana = KANA_BY_ID.get(session.currentId);
  const mnemonic = getKanaMnemonic(kana);
  const sentenceContext = session.sentenceMode
    ? getKanaSentenceContext(kana)
    : null;
  const isReview = session.reviewOnly || !session.targetIds.has(kana.id);
  const total = session.itemIds.length;
  const mastered = session.mastered.size;
  const accuracy = formatPercent(session.correctAttempts, session.attempts);

  document.body.classList.add("is-quizzing");
  app.innerHTML = `
    <div class="quiz-view kana-quiz-view">
      <div class="quiz-top">
        <button class="icon-button" type="button" data-action="quit-session"><span aria-hidden="true">←</span> Beenden</button>
        <div class="progress-wrap" aria-label="${mastered} von ${total} gemeistert">
          <div class="progress-track"><div class="progress-fill" style="width: ${(mastered / total) * 100}%"></div></div>
          <span class="progress-label">${mastered} / ${total}</span>
        </div>
        <div class="quiz-stats">
          <div class="quiz-stat"><span>Übrig</span><strong>${total - mastered}</strong></div>
          <div class="quiz-stat"><span>Genauigkeit</span><strong>${accuracy}</strong></div>
          <div class="quiz-stat"><span>Fehler</span><strong>${session.wrongAttempts}</strong></div>
        </div>
      </div>

      <section class="quiz-stage kana-quiz-stage" aria-labelledby="quiz-prompt">
        ${isReview ? '<div class="word-cycle-badge review">↻ Langzeit-Wiederholung</div>' : ""}
        <p class="quiz-prompt" id="quiz-prompt">${sentenceContext ? "Wie liest man das markierte Kana?" : "Wie liest man dieses Zeichen?"}</p>
        ${sentenceContext ? `
          <div class="quiz-kana-wrap sentence-context-card kana-sentence-context">
            <span class="quiz-script-tag">${kana.script} · Satzkontext</span>
            <p class="sentence-japanese" lang="ja">${sentenceContext.japanese}</p>
            <div class="sentence-context-answer" hidden>
              <span><small>Gesamte Lesung</small><strong>${sentenceContext.reading}</strong></span>
              <span><small>Deutsch</small><strong>${sentenceContext.german}</strong></span>
            </div>
          </div>
        ` : `
          <div class="quiz-kana-wrap">
            <span class="quiz-script-tag">${kana.script}</span>
            <div class="quiz-kana${[...kana.glyph].length > 1 ? " quiz-kana-combo" : ""}" lang="ja">${kana.glyph}</div>
          </div>
        `}

        <div class="mnemonic-tools">
          <button class="mnemonic-button" type="button" data-action="toggle-mnemonic" aria-expanded="false" aria-controls="kana-mnemonic">
            <span aria-hidden="true">💡</span> Eselsbrücke anzeigen
          </button>
          <div class="mnemonic-panel" id="kana-mnemonic" hidden>
            ${renderMnemonicVisual(kana, mnemonic)}
            <div>
              <strong>${mnemonic.title}</strong>
              <p>${mnemonic.text}</p>
              <small>${mnemonic.tip}</small>
            </div>
          </div>
        </div>

        <form class="answer-form" autocomplete="off">
          <label class="answer-label" for="kana-answer">${sentenceContext ? "Markiertes Kana in Romaji" : "Deine Antwort in Romaji"}</label>
          <div class="input-shell">
            <input
              class="answer-input"
              id="kana-answer"
              name="answer"
              type="text"
              inputmode="text"
              enterkeyhint="go"
              autocapitalize="none"
              autocorrect="off"
              spellcheck="false"
              aria-describedby="answer-feedback"
              placeholder="z. B. ka"
              maxlength="8"
              autofocus
            >
            <span class="enter-hint" aria-hidden="true">↵</span>
          </div>
          <div class="answer-meta">
            <p class="feedback" id="answer-feedback" aria-live="polite"></p>
            <button class="reveal-button" type="button" data-action="reveal-answer">Antwort zeigen</button>
          </div>
        </form>
        <p class="queue-note"><span aria-hidden="true">${sentenceContext ? "文" : "↻"}</span> ${sentenceContext ? "Nach der Antwort siehst du die gesamte Lesung und Übersetzung; Fehler kehren später zurück." : "Ein Fehler? Das Zeichen wird später automatisch erneut eingestreut."}</p>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() =>
    document.querySelector("#kana-answer")?.focus({ preventScroll: true }),
  );
}

function submitAnswer(rawAnswer, revealed = false) {
  const session = state.session;
  if (!session || session.locked) return;
  const kana = KANA_BY_ID.get(session.currentId);
  const answer = normalizeRomaji(rawAnswer);
  if (!answer && !revealed) return;

  const wasCorrect =
    !revealed && kana.answers.map(normalizeRomaji).includes(answer);
  const isInjectedReview = !session.targetIds.has(kana.id);
  const isReview = session.reviewOnly || isInjectedReview;
  session.locked = true;
  session.attempts += 1;
  if (wasCorrect) {
    session.correctAttempts += 1;
    if (isInjectedReview) session.reviewedIds.add(kana.id);
    else session.mastered.add(kana.id);
  } else {
    session.wrongAttempts += 1;
    session.mistakesById[kana.id] = (session.mistakesById[kana.id] || 0) + 1;
  }
  recordAttempt(kana, wasCorrect);

  const card = document.querySelector(".quiz-kana-wrap");
  const input = document.querySelector("#kana-answer");
  const feedback = document.querySelector(".feedback");
  const revealButton = document.querySelector(".reveal-button");
  const sentenceAnswer = document.querySelector(".sentence-context-answer");
  input.disabled = true;
  revealButton.hidden = true;
  if (sentenceAnswer) sentenceAnswer.hidden = false;

  if (wasCorrect) {
    card.classList.add("quiz-card-correct");
    feedback.className = "feedback correct";
    feedback.textContent = `Richtig — ${kana.primary}`;
  } else {
    card.classList.add("quiz-card-wrong");
    feedback.className = "feedback wrong";
    feedback.textContent = `${revealed ? "Antwort" : "Noch nicht"} — ${kana.primary}`;
  }

  state.timer = window.setTimeout(
    () => {
      if (!state.session || state.session !== session) return;
      if (!wasCorrect) insertKanaLater(kana.id, 2);
      if (!isReview || isInjectedReview) maybeInsertKanaReview();
      advanceSession();
    },
    session.sentenceMode ? (wasCorrect ? 1800 : 2800) : wasCorrect ? 520 : 1350,
  );
}

function finishSession() {
  const session = state.session;
  if (!session) return;
  const durationSeconds = Math.max(1, Math.round((Date.now() - session.startedAt) / 1000));
  const result = {
    itemIds: [...session.itemIds],
    total: session.itemIds.length,
    attempts: session.attempts,
    correctAttempts: session.correctAttempts,
    wrongAttempts: session.wrongAttempts,
    mistakesById: { ...session.mistakesById },
    accuracy: formatPercent(session.correctAttempts, session.attempts),
    durationSeconds,
    source: session.source,
    sentenceMode: session.sentenceMode,
  };
  notifyAndroidSession("kana", durationSeconds, result.total);
  data.sessions.push({
    date: localDateKey(),
    total: result.total,
    attempts: result.attempts,
    wrong: result.wrongAttempts,
  });
  data.sessions = data.sessions.slice(-365);
  saveData();

  state.lastResult = result;
  state.session = null;
  state.view = "result";
  renderResult();
}

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function renderResult() {
  const result = state.lastResult;
  if (!result) return renderHome();
  if (result.kind === "words") return renderWordResult();
  if (result.kind === "kanji-words") return renderKanjiWordResult();
  if (result.kind === "kanji") return renderKanjiResult();
  if (result.kind === "conversation") return renderConversationResult();
  document.body.classList.remove("is-quizzing");
  const difficultIds = Object.entries(result.mistakesById)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);
  const difficultGlyphs = difficultIds
    .slice(0, 8)
    .map((id) => KANA_BY_ID.get(id)?.glyph)
    .filter(Boolean)
    .join(" · ");
  const srsReview = result.source === "kana-review";

  app.innerHTML = `
    <div class="result-view">
      <section class="result-card" aria-labelledby="result-title">
        <div class="result-seal" aria-hidden="true">完</div>
        <span class="eyebrow">${srsReview ? "Fällige Kana wiederholt" : "Lerneinheit geschafft"}</span>
        <h1 id="result-title">${srsReview ? "Erinnerung aufgefrischt!" : "Alle Kana sitzen!"}</h1>
        <p>${srsReview ? "Alle Zeichen dieser Runde haben einen neuen Termin. Mit jedem sicheren Abruf wird der Abstand größer." : "Jedes ausgewählte Zeichen wurde mindestens einmal richtig erkannt. Gute Arbeit – diese Runde ist komplett."}</p>

        <div class="result-stats">
          <div class="result-stat"><strong>${result.total}</strong><span>Gemeistert</span></div>
          <div class="result-stat"><strong>${result.accuracy}</strong><span>Genauigkeit</span></div>
          <div class="result-stat"><strong>${formatDuration(result.durationSeconds)}</strong><span>Zeit</span></div>
        </div>

        ${
          difficultIds.length
            ? `<div class="result-hard"><strong>Noch etwas knifflig:</strong> ${difficultGlyphs}<br>Diese Zeichen sind jetzt auch unter „Deine schwierigen Kana“ gespeichert.</div>`
            : `<div class="result-hard"><strong>Fehlerfreie Runde.</strong> Heute konnte dich kein Zeichen aufhalten.</div>`
        }

        <div class="result-actions">
          <button class="secondary-button" type="button" data-action="home">Andere Reihen wählen</button>
          ${
            srsReview
              ? `<button class="primary-button" type="button" data-action="start-kana-review">Weitere fällige Kana →</button>`
              : difficultIds.length
              ? `<button class="primary-button" type="button" data-action="retry-mistakes">Fehler nochmals üben →</button>`
              : `<button class="primary-button" type="button" data-action="retry-session">Runde wiederholen →</button>`
          }
        </div>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderWordResult() {
  const result = state.lastResult;
  if (!result || result.kind !== "words") return renderHome();
  document.body.classList.remove("is-quizzing");
  const words = result.itemIds.map((id) => WORD_BY_ID.get(id)).filter(Boolean);
  const learnedTotal = getGlobalReviewWords(false).length;
  const focusedPractice = result.source === "hard-words";
  const srsReview = result.source === "srs-review";
  app.innerHTML = `
    <div class="result-view">
      <section class="result-card word-result-card" aria-labelledby="result-title">
        <div class="result-seal" aria-hidden="true">語</div>
        <span class="eyebrow">${focusedPractice ? "Problemwörter trainiert" : srsReview ? "Wiederholungstopf geleert" : result.maintenance ? "Wiederholung geschafft" : "Auswahl vollständig gelernt"}</span>
        <h1 id="result-title">${focusedPractice ? "Schwierige Wörter geknackt!" : srsReview ? "Erinnerung aufgefrischt!" : result.maintenance ? "Wissen aufgefrischt!" : `${result.total} Wörter sitzen!`}</h1>
        <p>${focusedPractice ? "Diese Problemwörter sind jetzt sicherer. Falls sie noch Schwierigkeiten machen, bleiben sie automatisch in deiner Wiederholungsliste." : srsReview ? "Alle fälligen Wörter haben einen neuen Wiederholungstermin bekommen. Der Abstand wächst mit jeder sicheren Antwort." : result.maintenance ? "Diese Wörter sind wieder frisch im Gedächtnis. Ihre nächste Wiederholung kommt mit größerem Abstand." : "Deine gesamte Auswahl wurde in kleinen Gruppen gefestigt. Alle sicheren Wörter liegen jetzt dauerhaft im globalen Spaced-Repetition-Topf."}</p>

        <div class="learned-word-list" aria-label="Wörter dieser Runde">
          ${words.slice(0, 32).map((word) => `<span><b lang="ja">${word.kana}</b><small>${word.primary}</small></span>`).join("")}
          ${words.length > 32 ? `<span class="learned-word-more"><b>+${words.length - 32}</b><small>weitere Wörter</small></span>` : ""}
        </div>

        <div class="result-stats">
          <div class="result-stat"><strong>${learnedTotal}</strong><span>Insgesamt sicher</span></div>
          <div class="result-stat"><strong>${result.accuracy}</strong><span>Genauigkeit</span></div>
          <div class="result-stat"><strong>${formatDuration(result.durationSeconds)}</strong><span>Zeit</span></div>
        </div>

        <div class="result-actions">
          <button class="secondary-button" type="button" data-action="home">Sets & Wörter wählen</button>
          <button class="primary-button" type="button" data-action="${focusedPractice ? "retry-word-session" : "home"}">${focusedPractice ? "Diese Wörter nochmals prüfen" : "Zur Wortschatz-Auswahl"} →</button>
        </div>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderKanjiWordResult() {
  const result = state.lastResult;
  if (!result || result.kind !== "kanji-words") return renderHome();
  document.body.classList.remove("is-quizzing");
  const words = result.itemIds
    .map((id) => KANJI_WORD_BY_ID.get(id))
    .filter(Boolean);
  const learnedTotal = getKanjiWordStats().learned;
  const focusedPractice = result.source === "hard-kanji-words";
  const srsReview = result.source === "kanji-word-review";
  app.innerHTML = `
    <div class="result-view">
      <section class="result-card word-result-card kanji-word-result-card" aria-labelledby="result-title">
        <div class="result-seal" aria-hidden="true">語</div>
        <span class="eyebrow">${srsReview ? "Fällige Kanji-Wörter wiederholt" : focusedPractice ? "Schwierige Kanji-Wörter trainiert" : result.maintenance ? "Wiederholung geschafft" : "JLPT-Kanji-Wortgruppe geschafft"}</span>
        <h1 id="result-title">${srsReview ? "Langzeitwissen aufgefrischt!" : focusedPractice ? "Problemwörter geknackt!" : result.maintenance ? "Sicher gelesen!" : `${result.total} Kanji-Wörter sitzen!`}</h1>
        <p>${srsReview ? "Alle Wörter haben einen neuen, größeren Wiederholungsabstand bekommen." : focusedPractice ? "Bedeutung und Kana-Lesung dieser schwierigen Wörter sind jetzt stärker verknüpft." : result.maintenance ? "Diese Kanji-Wörter sind wieder frisch im Gedächtnis und kehren später erneut zurück." : "Du hast Schreibweise, Bedeutung und Kana-Lesung sicher miteinander verbunden. Die Wörter bleiben in der Langzeit-Wiederholung."}</p>

        <div class="learned-word-list learned-kanji-word-list" aria-label="Kanji-Wörter dieser Runde">
          ${words.map((word) => `<span><b lang="ja">${word.spelling}</b><em lang="ja">${word.reading}</em><small>${word.primary}</small></span>`).join("")}
        </div>

        <div class="result-stats">
          <div class="result-stat"><strong>${learnedTotal}</strong><span>Insgesamt sicher</span></div>
          <div class="result-stat"><strong>${result.accuracy}</strong><span>Genauigkeit</span></div>
          <div class="result-stat"><strong>${formatDuration(result.durationSeconds)}</strong><span>Zeit</span></div>
        </div>

        <div class="result-actions">
          <button class="secondary-button" type="button" data-action="home">Level & Modus</button>
          <button class="primary-button" type="button" data-action="${srsReview ? "start-kanji-word-review" : focusedPractice ? "retry-kanji-word-session" : "start-kanji-word-session"}">${srsReview ? "Weitere fällige Wörter" : focusedPractice ? "Diese Wörter nochmals prüfen" : "Nächste Vierergruppe"} →</button>
        </div>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderConversationResult() {
  const result = state.lastResult;
  if (!result || result.kind !== "conversation") return renderHome();
  document.body.classList.remove("is-quizzing");
  const conversations = result.itemIds
    .map((id) => CONVERSATION_BY_ID.get(id))
    .filter(Boolean);
  const focusedPractice = result.source === "hard-conversations";
  const reviewPractice = result.source === "conversation-review";
  app.innerHTML = `
    <div class="result-view conversation-result-view">
      <section class="result-card word-result-card conversation-result-card" aria-labelledby="result-title">
        <div class="result-seal" aria-hidden="true">話</div>
        <span class="eyebrow">${reviewPractice ? "Fällige Gespräche wiederholt" : focusedPractice ? "Schwierige Situationen trainiert" : result.maintenance ? "Gespräche aufgefrischt" : "Sprechgruppe geschafft"}</span>
        <h1 id="result-title">${reviewPractice ? "Im Gespräch geblieben!" : focusedPractice ? "Sprachhürden geknackt!" : result.maintenance ? "Natürlich reagiert!" : `${result.total} Situationen sitzen!`}</h1>
        <p>${reviewPractice ? "Die fälligen Reaktionen sind wieder frisch. Ihr nächster Abstand wächst mit jedem sicheren Durchgang." : focusedPractice ? "Du hast genau die Situationen wiederholt, bei denen Rhythmus oder Formulierung noch unsicher waren." : result.maintenance ? "Diese Reaktionen sind wieder frisch und kehren später erneut zurück." : "Du kannst in diesen Situationen verständlich reagieren. Sie bleiben in deiner Langzeit-Wiederholung und werden mit neuen Gesprächen vermischt."}</p>

        <div class="learned-conversation-list" aria-label="Situationen dieser Runde">
          ${conversations
            .map(
              (conversation) => `
                <span><b>${conversation.situation}</b><em lang="ja">${conversation.target}</em><small>${conversation.german}</small></span>
              `,
            )
            .join("")}
        </div>

        <div class="result-stats">
          <div class="result-stat"><strong>${result.partialAttempts || 0}</strong><span>Fast sicher</span></div>
          <div class="result-stat"><strong>${result.accuracy}</strong><span>Sicher gesprochen</span></div>
          <div class="result-stat"><strong>${formatDuration(result.durationSeconds)}</strong><span>Sprechzeit</span></div>
        </div>

        <div class="result-actions">
          <button class="secondary-button" type="button" data-action="home">Stufe & Aussprache-Lab</button>
          <button class="primary-button" type="button" data-action="${reviewPractice ? "start-conversation-review" : focusedPractice ? "retry-conversation-session" : "start-conversation-session"}">${reviewPractice ? "Weitere fällige Gespräche" : focusedPractice ? "Diese Situationen nochmals" : "Nächste Gesprächsgruppe"} →</button>
        </div>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderKanjiResult() {
  const result = state.lastResult;
  if (!result || result.kind !== "kanji") return renderHome();
  document.body.classList.remove("is-quizzing");
  const kanjiItems = result.itemIds
    .map((id) => KANJI_BY_ID.get(id))
    .filter(Boolean);
  const learnedTotal = getKanjiStats().learned;
  const srsReview = result.source === "kanji-review";
  app.innerHTML = `
    <div class="result-view">
      <section class="result-card word-result-card kanji-result-card" aria-labelledby="result-title">
        <div class="result-seal" aria-hidden="true">漢</div>
        <span class="eyebrow">${srsReview ? "Fällige Kanji wiederholt" : result.maintenance ? "Kanji aufgefrischt" : "Kanji-Gruppe geschafft"}</span>
        <h1 id="result-title">${srsReview ? "Langzeitwissen aufgefrischt!" : result.maintenance ? "Sicher wiedererkannt!" : `${result.total} Kanji sitzen!`}</h1>
        <p>${srsReview ? "Alle Zeichen haben einen neuen Wiederholungstermin. Der Abstand wächst mit jeder sicheren Antwort." : result.maintenance ? "Diese Zeichen sind wieder frisch im Gedächtnis und kehren später erneut zurück." : "Bedeutung, Lesung und Manga-Kontext sind verknüpft. Die Zeichen werden später automatisch zwischen neue Kanji gemischt."}</p>

        <div class="learned-word-list learned-kanji-list" aria-label="Kanji dieser Runde">
          ${kanjiItems.map((kanji) => `<span><b lang="ja">${kanji.character}</b><small>${kanji.primary}</small><em lang="ja">${kanji.readings.split("・").slice(0, 2).join("・")}</em></span>`).join("")}
        </div>

        <div class="result-stats">
          <div class="result-stat"><strong>${learnedTotal}</strong><span>Insgesamt sicher</span></div>
          <div class="result-stat"><strong>${result.accuracy}</strong><span>Genauigkeit</span></div>
          <div class="result-stat"><strong>${formatDuration(result.durationSeconds)}</strong><span>Zeit</span></div>
        </div>

        <div class="result-actions">
          <button class="secondary-button" type="button" data-action="home">Level & Modus</button>
          <button class="primary-button" type="button" data-action="${srsReview ? "start-kanji-review" : "start-kanji-session"}">${srsReview ? "Weitere fällige Kanji" : "Nächste Kanji-Gruppe"} →</button>
        </div>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function requestConfirmation({ title, message, acceptLabel, onAccept }) {
  document.querySelector("#confirm-title").textContent = title;
  document.querySelector("#confirm-message").textContent = message;
  document.querySelector('[data-confirm="accept"]').textContent = acceptLabel;
  pendingConfirmation = onAccept;
  confirmDialog.showModal();
}

function quitSession() {
  requestConfirmation({
    title: "Lerneinheit beenden?",
    message: "Der Fortschritt dieser laufenden Runde geht verloren. Deine bisherige Gesamtstatistik bleibt gespeichert.",
    acceptLabel: "Lerneinheit beenden",
    onAccept: () => {
      clearTimeout(state.timer);
      releaseConversationMedia();
      state.session = null;
      renderHome();
    },
  });
}

function resetProgress() {
  requestConfirmation({
    title: "Fortschritt zurücksetzen?",
    message: "Alle Treffer, schwierigen Kana, Kana-Wörter, Kanji, Kanji-Wörter, Gespräche und abgeschlossenen Lerneinheiten werden unwiderruflich gelöscht.",
    acceptLabel: "Alles zurücksetzen",
    onAccept: () => {
      clearTimeout(state.timer);
      releaseConversationMedia();
      data = structuredClone(DEFAULT_DATA);
      state.learningMode = "kana";
      state.mode = "hiragana";
      state.maxWordLevel = "N5";
      state.selectedWordSets = new Set(["first-contact"]);
      state.includedWordIds = new Set();
      state.excludedWordIds = new Set();
      state.wordScenarioGroup = "essentials";
      state.maxKanjiLevel = "N5";
      state.maxKanjiWordLevel = "N5";
      state.maxConversationLevel = "N5";
      state.selectedRows = new Set(["vowels"]);
      state.session = null;
      state.lastResult = null;
      saveData();
      renderHome();
      showToast("Dein Fortschritt wurde zurückgesetzt.");
    },
  });
}

function showToast(message) {
  const region = document.querySelector("#toast-region");
  region.innerHTML = `<div class="toast">${message}</div>`;
  window.setTimeout(() => {
    region.innerHTML = "";
  }, 3000);
}

function refreshWordSelectionControls() {
  const selectedIds = getSelectedWordIdSet();
  document.querySelectorAll(".individual-word[data-word]").forEach((button) => {
    const selected = selectedIds.has(button.dataset.word);
    button.classList.toggle("selected", selected);
    const mark = button.querySelector("span");
    if (mark) mark.textContent = selected ? "✓" : "+";
  });
  document.querySelectorAll(".scenario-set-card[data-set]").forEach((button) => {
    const selected = state.selectedWordSets.has(button.dataset.set);
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    const mark = button.querySelector(".scenario-set-check");
    if (mark) mark.textContent = selected ? "✓" : "+";
  });
  const count = document.querySelector(".word-setup .start-bar .selection-count strong");
  const start = document.querySelector('.word-setup [data-action="start-word-session"]');
  const total = getEligibleWords().length;
  if (count) count.textContent = String(total);
  if (start) start.disabled = total === 0;
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  const closeTrigger = event.target.closest("[data-close-dialog]");
  const confirmation = event.target.closest("[data-confirm]");

  if (closeTrigger) {
    closeTrigger.closest("dialog")?.close();
    return;
  }

  if (confirmation) {
    const accepted = confirmation.dataset.confirm === "accept";
    confirmDialog.close();
    if (accepted && pendingConfirmation) pendingConfirmation();
    pendingConfirmation = null;
    return;
  }

  if (!trigger) return;
  const action = trigger.dataset.action;

  if (action === "home") {
    event.preventDefault();
    if (state.session) quitSession();
    else renderHome();
  }

  if (action === "show-guide") guideDialog.showModal();
  if (action === "reset-progress") resetProgress();
  if (action === "toggle-theme") {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  }

  if (action === "set-learning-mode") {
    state.learningMode = trigger.dataset.learningMode;
    saveData();
    renderHome();
  }

  if (action === "set-kana-sentence-mode") {
    const scrollPosition = window.scrollY;
    state.kanaSentenceMode = trigger.dataset.sentenceMode === "true";
    saveData();
    renderHome();
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPosition, behavior: "instant" }),
    );
  }

  if (action === "set-kanji-sentence-mode") {
    const scrollPosition = window.scrollY;
    state.kanjiSentenceMode = trigger.dataset.sentenceMode === "true";
    saveData();
    renderHome();
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPosition, behavior: "instant" }),
    );
  }

  if (action === "set-word-level") {
    const scrollPosition = window.scrollY;
    state.maxWordLevel = trigger.dataset.level;
    saveData();
    renderHome();
    requestAnimationFrame(() => window.scrollTo({ top: scrollPosition, behavior: "instant" }));
  }

  if (action === "set-word-group") {
    const scrollPosition = window.scrollY;
    state.wordScenarioGroup = trigger.dataset.group;
    saveData();
    renderHome();
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPosition, behavior: "instant" }),
    );
  }

  if (action === "toggle-word-set") {
    const setId = trigger.dataset.set;
    if (state.selectedWordSets.has(setId)) {
      state.selectedWordSets.delete(setId);
    } else {
      state.selectedWordSets.add(setId);
      getWordsForSet(setId, false).forEach((word) =>
        state.excludedWordIds.delete(word.id),
      );
    }
    saveData();
    refreshWordSelectionControls();
  }

  if (action === "toggle-word") {
    const wordId = trigger.dataset.word;
    if (getSelectedWordIdSet().has(wordId)) {
      state.includedWordIds.delete(wordId);
      state.excludedWordIds.add(wordId);
    } else {
      state.excludedWordIds.delete(wordId);
      state.includedWordIds.add(wordId);
    }
    saveData();
    refreshWordSelectionControls();
  }

  if (action === "select-word-group") {
    const sets = state.wordScenarioGroup === "all"
      ? VOCABULARY_SETS
      : VOCABULARY_SETS.filter(
          (set) => set.groupId === state.wordScenarioGroup,
        );
    sets.forEach((set) => {
      state.selectedWordSets.add(set.id);
      getWordsForSet(set.id, false).forEach((word) =>
        state.excludedWordIds.delete(word.id),
      );
    });
    saveData();
    refreshWordSelectionControls();
    showToast(`${sets.length} Szenarien ausgewählt.`);
  }

  if (action === "clear-word-selection") {
    state.selectedWordSets.clear();
    state.includedWordIds.clear();
    state.excludedWordIds.clear();
    saveData();
    refreshWordSelectionControls();
    showToast("Wortauswahl geleert.");
  }

  if (action === "set-kanji-level") {
    const scrollPosition = window.scrollY;
    state.maxKanjiLevel = trigger.dataset.level;
    saveData();
    renderHome();
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPosition, behavior: "instant" }),
    );
  }

  if (action === "set-kanji-word-level") {
    const scrollPosition = window.scrollY;
    state.maxKanjiWordLevel = trigger.dataset.level;
    saveData();
    renderHome();
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPosition, behavior: "instant" }),
    );
  }

  if (action === "set-conversation-level") {
    const scrollPosition = window.scrollY;
    state.maxConversationLevel = trigger.dataset.level;
    saveData();
    renderHome();
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPosition, behavior: "instant" }),
    );
  }

  if (action === "set-conversation-mode") {
    const scrollPosition = window.scrollY;
    state.conversationPracticeMode = trigger.dataset.mode;
    saveData();
    renderHome();
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPosition, behavior: "instant" }),
    );
  }

  if (action === "toggle-conversation-topic") {
    const scrollPosition = window.scrollY;
    const topicId = trigger.dataset.topic;
    if (topicId === "all") {
      state.selectedConversationTopics = new Set(["all"]);
      state.includedConversationIds.clear();
      state.excludedConversationIds.clear();
    } else {
      state.selectedConversationTopics.delete("all");
      if (state.selectedConversationTopics.has(topicId))
        state.selectedConversationTopics.delete(topicId);
      else state.selectedConversationTopics.add(topicId);
      if (!state.selectedConversationTopics.size)
        state.selectedConversationTopics.add("all");
    }
    saveData();
    renderHome();
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPosition, behavior: "instant" }),
    );
  }

  if (action === "toggle-conversation") {
    const scrollPosition = window.scrollY;
    const conversationId = trigger.dataset.conversation;
    const conversation = CONVERSATION_BY_ID.get(conversationId);
    if (conversation) {
      const selectedByTopic =
        state.selectedConversationTopics.has("all") ||
        state.selectedConversationTopics.has(conversation.topic);
      const currentlySelected = getSelectedConversationIdSet().has(
        conversationId,
      );
      if (currentlySelected) {
        state.includedConversationIds.delete(conversationId);
        state.excludedConversationIds.add(conversationId);
      } else {
        state.excludedConversationIds.delete(conversationId);
        if (!selectedByTopic)
          state.includedConversationIds.add(conversationId);
      }
      saveData();
      renderHome();
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollPosition, behavior: "instant" });
        document.querySelector(".conversation-picker")?.setAttribute("open", "");
      });
    }
  }

  if (action === "manga-preset") {
    const basicRows = GROUPS.filter((group) => group.category === "basic").map(
      (group) => group.id,
    );
    const allRows = GROUPS.map((group) => group.id);
    if (trigger.dataset.preset === "dialogue") {
      state.mode = "hiragana";
      state.selectedRows = new Set(basicRows);
    }
    if (trigger.dataset.preset === "sounds") {
      state.mode = "katakana";
      state.selectedRows = new Set(allRows);
    }
    if (trigger.dataset.preset === "complete") {
      state.mode = "mixed";
      state.selectedRows = new Set(allRows);
    }
    saveData();
    refreshSetup();
    showToast("Manga-Pfad ausgewählt.");
  }

  if (action === "set-script") {
    state.mode = trigger.dataset.mode;
    saveData();
    refreshSetup();
  }

  if (action === "toggle-row") {
    const rowId = trigger.dataset.row;
    if (state.selectedRows.has(rowId)) state.selectedRows.delete(rowId);
    else state.selectedRows.add(rowId);
    saveData();
    refreshSetup();
  }

  if (action === "toggle-category") {
    const groupIds = GROUPS.filter(
      (group) => group.category === trigger.dataset.category,
    ).map((group) => group.id);
    const allSelected = groupIds.every((id) => state.selectedRows.has(id));
    groupIds.forEach((id) =>
      allSelected ? state.selectedRows.delete(id) : state.selectedRows.add(id),
    );
    saveData();
    refreshSetup();
  }

  if (action === "start-session") startSession(getItemsForSelection());
  if (action === "start-kana-review") startKanaReviewSession();
  if (action === "start-word-session") startWordSession();
  if (action === "start-word-review") startWordReviewSession();
  if (action === "practice-hard-words") startHardWordSession();
  if (action === "retry-word-session" && state.lastResult?.kind === "words") {
    const words = state.lastResult.itemIds
      .map((id) => WORD_BY_ID.get(id))
      .filter(Boolean);
    startWordSession(words, "hard-words");
  }
  if (action === "start-kanji-word-session") startKanjiWordSession();
  if (action === "start-kanji-word-review") startKanjiWordReviewSession();
  if (action === "practice-hard-kanji-words") startHardKanjiWordSession();
  if (
    action === "retry-kanji-word-session" &&
    state.lastResult?.kind === "kanji-words"
  ) {
    const words = state.lastResult.itemIds
      .map((id) => KANJI_WORD_BY_ID.get(id))
      .filter(Boolean);
    startKanjiWordSession(words, "hard-kanji-words");
  }
  if (action === "start-kanji-session") startKanjiSession();
  if (action === "start-kanji-review") startKanjiReviewSession();
  if (action === "start-conversation-session") startConversationSession();
  if (action === "start-conversation-review")
    startConversationReviewSession();
  if (action === "practice-hard-conversations")
    startHardConversationSession();
  if (
    action === "retry-conversation-session" &&
    state.lastResult?.kind === "conversation"
  ) {
    const conversations = state.lastResult.itemIds
      .map((id) => CONVERSATION_BY_ID.get(id))
      .filter(Boolean);
    startConversationSession(conversations, "hard-conversations");
  }
  if (action === "practice-hard") startSession(getHardItems(), "hard");
  if (action === "start-area-review") {
    const starters = {
      kana: startKanaReviewSession,
      words: startWordReviewSession,
      kanji: startKanjiReviewSession,
      "kanji-words": startKanjiWordReviewSession,
      conversation: startConversationReviewSession,
    };
    starters[trigger.dataset.reviewArea]?.();
  }
  if (action === "quit-session") quitSession();
  if (action === "toggle-mnemonic") {
    const panel = document.querySelector("#kana-mnemonic");
    const willOpen = panel?.hidden;
    if (panel) panel.hidden = !willOpen;
    trigger.setAttribute("aria-expanded", String(Boolean(willOpen)));
    trigger.innerHTML = willOpen
      ? '<span aria-hidden="true">×</span> Eselsbrücke ausblenden'
      : '<span aria-hidden="true">💡</span> Eselsbrücke anzeigen';
  }
  if (action === "reveal-answer") submitAnswer("", true);
  if (action === "reveal-word-answer") submitWordAnswer("", true);
  if (action === "reveal-kanji-word-answer")
    submitKanjiWordAnswer("", true);
  if (action === "reveal-kanji-answer") submitKanjiAnswer("", true);
  if (action === "reveal-conversation-answer") revealConversationAnswer();
  if (action === "toggle-conversation-hint") toggleConversationHint();
  if (action === "assess-conversation")
    assessConversation(trigger.dataset.score);
  if (action === "continue-conversation") continueConversationSession();
  if (action === "speak-japanese")
    speakJapanese(trigger.dataset.speech || "", trigger.dataset.rate);
  if (action === "toggle-recording") toggleConversationRecording();

  if (action === "retry-session" && state.lastResult) {
    const items = state.lastResult.itemIds.map((id) => KANA_BY_ID.get(id)).filter(Boolean);
    startSession(items, "retry");
  }

  if (action === "retry-mistakes" && state.lastResult) {
    const items = Object.keys(state.lastResult.mistakesById)
      .map((id) => KANA_BY_ID.get(id))
      .filter(Boolean);
    startSession(items, "mistakes");
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("#conversation-search")) {
    const query = event.target.value.trim().toLowerCase();
    let visible = 0;
    document
      .querySelectorAll(
        "#individual-conversation-grid .individual-conversation",
      )
      .forEach((conversation) => {
        const matches = !query || conversation.dataset.search.includes(query);
        conversation.hidden = !matches;
        if (matches) visible += 1;
      });
    const count = document.querySelector("#conversation-visible-count");
    if (count) count.textContent = String(visible);
    const empty = document.querySelector("#conversation-search-empty");
    if (empty) empty.hidden = visible > 0;
    return;
  }
  if (!event.target.matches("#word-search")) return;
  const query = event.target.value.trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll("#individual-word-grid .individual-word").forEach((word) => {
    const matches = !query || word.dataset.search.includes(query);
    word.hidden = !matches;
    if (matches) visible += 1;
  });
  const empty = document.querySelector("#word-search-empty");
  if (empty) empty.hidden = visible > 0;
});

document.addEventListener("keydown", (event) => {
  const session = state.session;
  if (!session || session.kind !== "conversation") return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target.closest("button, input, textarea, audio, a")) return;
  if (event.key === "Enter") {
    event.preventDefault();
    if (session.awaitingAdvance) continueConversationSession();
    else if (!session.revealed) revealConversationAnswer();
    return;
  }
  if (session.revealed && !session.locked && ["1", "2", "3"].includes(event.key)) {
    event.preventDefault();
    assessConversation(event.key);
  }
});

app.addEventListener("submit", (event) => {
  if (!event.target.matches(".answer-form")) return;
  event.preventDefault();
  const formData = new FormData(event.target);
  if (state.session?.kind === "kanji-words") {
    submitKanjiWordAnswer(formData.get("answer") || "");
  } else if (state.session?.kind === "kanji") {
    submitKanjiAnswer(formData.get("answer") || "");
  } else if (state.session?.kind === "words") {
    submitWordAnswer(formData.get("answer") || "");
  } else {
    submitAnswer(formData.get("answer") || "");
  }
});

for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      if (dialog === confirmDialog) pendingConfirmation = null;
      dialog.close();
    }
  });
}

saveData();
window.addEventListener("kana-garten-dashboard-settings", () => {
  if (state.view === "home") renderHome();
});

renderHome();
