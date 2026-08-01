export const WORD_LEVELS = [
  { id: "N5", label: "N5", title: "Einstieg", description: "Alltag & Grundwortschatz" },
  { id: "N4", label: "N4", title: "Grundlagen", description: "Häufige Situationen" },
  { id: "N3", label: "N3", title: "Mittelstufe", description: "Gespräche & Zusammenhänge" },
  { id: "N2", label: "N2", title: "Fortgeschritten", description: "Abstrakter Wortschatz" },
  { id: "N1", label: "N1", title: "Sehr fortgeschritten", description: "Präzise & anspruchsvoll" },
];

const WORDS_BY_LEVEL = {
  N5: [
    ["ありがとう", "danke"],
    ["こんにちは", "hallo"],
    ["はい", "ja"],
    ["いいえ", "nein"],
    ["おはよう", "guten Morgen"],
    ["こんばんは", "guten Abend"],
    ["さようなら", "auf Wiedersehen", "tschüss"],
    ["すみません", "Entschuldigung", "entschuldigen Sie"],
    ["おねがい", "bitte", "Wunsch"],
    ["みず", "Wasser"],
    ["ごはん", "Reis", "Mahlzeit", "Essen"],
    ["パン", "Brot"],
    ["おちゃ", "Tee"],
    ["たべもの", "Essen", "Lebensmittel"],
    ["のみもの", "Getränk"],
    ["いえ", "Haus", "Zuhause"],
    ["がっこう", "Schule"],
    ["せんせい", "Lehrer", "Lehrerin"],
    ["ともだち", "Freund", "Freundin"],
    ["かぞく", "Familie"],
    ["ひと", "Person", "Mensch"],
    ["こども", "Kind"],
    ["いぬ", "Hund"],
    ["ねこ", "Katze"],
    ["ほん", "Buch"],
    ["くるま", "Auto", "Wagen"],
    ["でんしゃ", "Zug"],
    ["えき", "Bahnhof", "Station"],
    ["きょう", "heute"],
    ["あした", "morgen"],
    ["きのう", "gestern"],
    ["いま", "jetzt"],
    ["おおきい", "groß"],
    ["ちいさい", "klein"],
    ["あたらしい", "neu"],
    ["ふるい", "alt"],
    ["たべる", "essen"],
    ["のむ", "trinken"],
    ["いく", "gehen", "fahren"],
    ["くる", "kommen"],
    ["みる", "sehen", "anschauen"],
    ["きく", "hören", "fragen"],
    ["はなす", "sprechen", "reden"],
    ["だいじょうぶ", "in Ordnung", "alles gut", "okay"],
    ["ほんとう", "wirklich", "Wahrheit"],
    ["まって", "warte", "warten"],
    ["いっしょ", "zusammen", "gemeinsam"],
    ["すごい", "unglaublich", "toll", "großartig"],
    ["かわいい", "süß", "niedlich"],
    ["こわい", "gruselig", "beängstigend"],
    ["つよい", "stark"],
    ["よわい", "schwach"],
    ["だれ", "wer"],
    ["どこ", "wo"],
    ["なに", "was"],
  ],
  N4: [
    ["てんき", "Wetter"],
    ["しごと", "Arbeit", "Beruf"],
    ["びょういん", "Krankenhaus"],
    ["ぎんこう", "Bank"],
    ["ゆうびんきょく", "Post", "Postamt"],
    ["りょうり", "Kochen", "Gericht", "Küche"],
    ["せかい", "Welt"],
    ["ばしょ", "Ort", "Platz"],
    ["いみ", "Bedeutung", "Sinn"],
    ["きもち", "Gefühl"],
    ["じかん", "Zeit"],
    ["きせつ", "Jahreszeit"],
    ["しゅうまつ", "Wochenende"],
    ["りょこう", "Reise"],
    ["でんわ", "Telefon", "Anruf"],
    ["じてんしゃ", "Fahrrad"],
    ["ひこうき", "Flugzeug"],
    ["かいしゃ", "Firma", "Unternehmen"],
    ["しゃしん", "Foto", "Fotografie"],
    ["うんどう", "Sport", "Bewegung"],
    ["べんきょう", "Lernen", "Studium"],
    ["おぼえる", "sich merken", "lernen"],
    ["わすれる", "vergessen"],
    ["はじめる", "beginnen", "anfangen"],
    ["おわる", "enden", "aufhören"],
    ["つかう", "benutzen", "verwenden"],
    ["つくる", "machen", "herstellen"],
    ["あそぶ", "spielen"],
    ["およぐ", "schwimmen"],
    ["いそがしい", "beschäftigt"],
    ["たいせつ", "wichtig", "wertvoll"],
    ["べんり", "praktisch", "bequem"],
    ["げんき", "gesund", "munter"],
    ["しずか", "ruhig", "still"],
    ["なかま", "Gefährte", "Kamerad", "Verbündeter"],
    ["てき", "Feind", "Gegner"],
    ["たたかう", "kämpfen"],
    ["にげる", "fliehen", "weglaufen"],
    ["まほう", "Magie", "Zauberei"],
    ["ちから", "Kraft", "Stärke"],
    ["ひみつ", "Geheimnis"],
    ["ゆめ", "Traum"],
    ["こころ", "Herz", "Seele"],
    ["まもる", "beschützen", "verteidigen"],
    ["たすける", "helfen", "retten"],
    ["ゆうしゃ", "Held", "Heldin"],
    ["おうさま", "König"],
    ["おひめさま", "Prinzessin"],
    ["ドキドキ", "Herzklopfen"],
    ["キラキラ", "funkeln", "glitzern"],
  ],
  N3: [
    ["けいけん", "Erfahrung"],
    ["せいかつ", "Alltag", "Leben"],
    ["しゃかい", "Gesellschaft"],
    ["ぶんか", "Kultur"],
    ["れきし", "Geschichte"],
    ["しゅうかん", "Gewohnheit"],
    ["きょうみ", "Interesse"],
    ["よてい", "Plan", "Vorhaben"],
    ["やくそく", "Versprechen", "Verabredung"],
    ["じゅんび", "Vorbereitung"],
    ["せつめい", "Erklärung"],
    ["いけん", "Meinung"],
    ["りゆう", "Grund", "Begründung"],
    ["もくてき", "Zweck", "Ziel"],
    ["かんけい", "Beziehung", "Zusammenhang"],
    ["へんか", "Veränderung", "Wandel"],
    ["せいこう", "Erfolg"],
    ["しっぱい", "Misserfolg", "Fehler"],
    ["あんぜん", "Sicherheit", "sicher"],
    ["きけん", "Gefahr", "gefährlich"],
    ["ひつよう", "notwendig", "erforderlich"],
    ["じゅうぶん", "ausreichend", "genug"],
    ["とくべつ", "besonders", "speziell"],
    ["ふくざつ", "kompliziert", "komplex"],
    ["えらぶ", "wählen", "auswählen"],
    ["きめる", "entscheiden", "festlegen"],
    ["つづける", "fortsetzen", "weitermachen"],
    ["くらべる", "vergleichen"],
    ["しらべる", "untersuchen", "nachschlagen"],
    ["まにあう", "rechtzeitig schaffen", "pünktlich sein"],
    ["うんめい", "Schicksal"],
    ["しょうぶ", "Wettkampf", "Duell"],
    ["ふくしゅう", "Rache"],
    ["しょうたい", "wahre Identität", "Identität"],
    ["さくせん", "Strategie", "Plan"],
    ["きおく", "Erinnerung", "Gedächtnis"],
    ["のうりょく", "Fähigkeit", "Kraft"],
    ["へんしん", "Verwandlung", "Transformation"],
    ["ぼうけん", "Abenteuer"],
    ["きずな", "Bindung", "Band"],
    ["ぎせい", "Opfer"],
    ["ワクワク", "Vorfreude", "Aufregung"],
    ["シーン", "Stille"],
    ["ガーン", "Schock", "Entsetzen"],
  ],
  N2: [
    ["げんいん", "Ursache", "Grund"],
    ["けっか", "Ergebnis", "Folge"],
    ["えいきょう", "Einfluss", "Auswirkung"],
    ["じょうきょう", "Situation", "Lage"],
    ["かんきょう", "Umwelt", "Umgebung"],
    ["せきにん", "Verantwortung"],
    ["かのうせい", "Möglichkeit", "Potenzial"],
    ["ほうほう", "Methode", "Vorgehensweise"],
    ["たいど", "Haltung", "Verhalten"],
    ["ちしき", "Wissen", "Kenntnis"],
    ["ぎじゅつ", "Technik", "Technologie"],
    ["せいど", "System", "Regelung"],
    ["けいざい", "Wirtschaft", "Ökonomie"],
    ["せいじ", "Politik"],
    ["きょうそう", "Wettbewerb", "Konkurrenz"],
    ["きょうりょく", "Zusammenarbeit", "Kooperation"],
    ["はんだん", "Urteil", "Entscheidung"],
    ["かいけつ", "Lösung", "Klärung"],
    ["ていあん", "Vorschlag"],
    ["かいぜん", "Verbesserung"],
    ["たしかめる", "überprüfen", "sich vergewissern"],
    ["みとめる", "anerkennen", "zugeben"],
    ["ことわる", "ablehnen", "absagen"],
    ["うけいれる", "akzeptieren", "annehmen"],
    ["たっせいする", "erreichen", "vollbringen"],
    ["かくご", "Entschlossenheit", "Bereitschaft"],
    ["けっしん", "Entschluss", "Entschlossenheit"],
    ["しょうげき", "Schock", "Aufprall"],
    ["しょうこ", "Beweis"],
    ["うらぎり", "Verrat"],
    ["ゴゴゴ", "bedrohliches Grollen", "Grollen"],
    ["ザワザワ", "Gemurmel", "Unruhe"],
    ["バン", "Knall"],
  ],
  N1: [
    ["がいねん", "Konzept", "Begriff"],
    ["げんしょう", "Phänomen", "Erscheinung"],
    ["ほんしつ", "Wesen", "Essenz"],
    ["してん", "Perspektive", "Blickwinkel"],
    ["ぜんてい", "Voraussetzung", "Annahme"],
    ["こんきょ", "Grundlage", "Begründung"],
    ["けいこう", "Tendenz", "Neigung"],
    ["たいさく", "Gegenmaßnahme", "Maßnahme"],
    ["かだい", "Aufgabe", "Herausforderung"],
    ["りねん", "Leitbild", "Ideal"],
    ["とうけい", "Statistik"],
    ["ぶんせき", "Analyse"],
    ["ひょうか", "Bewertung", "Beurteilung"],
    ["じっせき", "Leistung", "Ergebnis"],
    ["こうけん", "Beitrag", "Verdienst"],
    ["そくしん", "Förderung", "Beschleunigung"],
    ["よくせい", "Eindämmung", "Unterdrückung"],
    ["ぼうし", "Verhinderung", "Vorbeugung"],
    ["じゅうし", "Betonung", "Schwerpunkt"],
    ["かくほ", "Sicherstellung", "Gewährleistung"],
    ["うながす", "anregen", "fördern"],
    ["になう", "tragen", "verantworten"],
    ["そこなう", "beeinträchtigen", "schädigen"],
    ["くつがえす", "umkehren", "widerlegen"],
    ["みきわめる", "beurteilen", "erkennen"],
    ["しゅくめい", "Fügung", "Schicksal"],
    ["たましい", "Seele"],
    ["せいやく", "Pakt", "Vertrag"],
    ["ふういん", "Versiegelung", "Siegel"],
    ["めざめる", "erwachen"],
    ["ぼうそう", "Kontrollverlust", "Amoklauf"],
    ["ニヤニヤ", "Grinsen"],
    ["ドン", "Wumm", "Donnern"],
  ],
};

const LEGACY_VOCABULARY = WORD_LEVELS.flatMap((level, levelIndex) =>
  WORDS_BY_LEVEL[level.id].map(([kana, primary, ...aliases], index) => ({
    id: `word:${level.id.toLowerCase()}:${index}`,
    kana,
    primary,
    answers: [primary, ...aliases],
    level: level.id,
    levelIndex,
    frequency: levelIndex * 1000 + index,
    setIds: [],
    setRanks: {},
  })),
);

export const VOCABULARY_GROUPS = [
  { id: "essentials", icon: "基", title: "Sofort klarkommen", description: "Grundlagen für jeden Tag" },
  { id: "food", icon: "食", title: "Essen & Trinken", description: "Vom Konbini bis zum Izakaya" },
  { id: "travel", icon: "旅", title: "Reisen in Japan", description: "Unterwegs, übernachten und entdecken" },
  { id: "daily", icon: "暮", title: "Alltag & Freizeit", description: "Zuhause, einkaufen und Hobbys" },
  { id: "social", icon: "人", title: "Menschen & Kultur", description: "Beziehungen, Feste und Umgangsformen" },
  { id: "work", icon: "学", title: "Schule & Beruf", description: "Lernen, arbeiten und organisieren" },
  { id: "health", icon: "安", title: "Gesundheit & Sicherheit", description: "Hilfe bekommen, wenn es zählt" },
  { id: "advanced", icon: "知", title: "Leben auf hohem Niveau", description: "Behörden, Gesellschaft und Fachsprache" },
];

function scenario(id, groupId, icon, title, description, level, source) {
  return {
    id,
    groupId,
    icon,
    title,
    description,
    level,
    words: source
      .trim()
      .split("\n")
      .map((line) => line.split("|").map((value) => value.trim())),
  };
}

export const VOCABULARY_SETS = [
  scenario("first-contact", "essentials", "👋", "Erstes Kennenlernen", "Begrüßen, danken und höflich reagieren", "N5", `
こんにちは|hallo|guten Tag
おはよう|guten Morgen
こんばんは|guten Abend
ありがとう|danke|vielen Dank
すみません|Entschuldigung|entschuldigen Sie
おねがいします|bitte
はじめまして|freut mich|zum ersten Mal
よろしく|freut mich|auf gute Zusammenarbeit
なまえ|Name
わたし|ich
`),
  scenario("numbers-money", "essentials", "💴", "Zahlen & Geld", "Preise verstehen und bezahlen", "N5", `
いち|eins
に|zwei
さん|drei
じゅう|zehn
ひゃく|hundert
せん|tausend
えん|Yen
いくら|wie viel
おかね|Geld
おつり|Wechselgeld|Rückgeld
`),
  scenario("time-date", "essentials", "🕒", "Zeit & Datum", "Uhrzeiten und Termine verstehen", "N5", `
いま|jetzt
じかん|Zeit
なんじ|wie spät|welche Uhrzeit
きょう|heute
あした|morgen
きのう|gestern
あさ|Morgen
ひる|Mittag
よる|Abend|Nacht
しゅうまつ|Wochenende
`),
  scenario("directions", "essentials", "🧭", "Orientierung", "Nach dem Weg fragen und Schilder verstehen", "N5", `
どこ|wo
ここ|hier
そこ|dort
みぎ|rechts
ひだり|links
まっすぐ|geradeaus
ちかく|in der Nähe|nahe
とおい|weit|entfernt
いりぐち|Eingang
でぐち|Ausgang
`),
  scenario("weather", "essentials", "🌦", "Wetter & Jahreszeiten", "Über Temperatur und Wetter sprechen", "N5", `
てんき|Wetter
はれ|sonnig|heiter
あめ|Regen
ゆき|Schnee
かぜ|Wind
あつい|heiß
さむい|kalt
はる|Frühling
なつ|Sommer
ふゆ|Winter
`),
  scenario("colors-shapes", "essentials", "🎨", "Farben & Formen", "Dinge genauer beschreiben", "N5", `
いろ|Farbe
あか|rot
あお|blau
しろ|weiß
くろ|schwarz
きいろ|gelb
まるい|rund
しかくい|viereckig|quadratisch
おおきい|groß
ちいさい|klein
`),
  scenario("questions", "essentials", "❓", "Fragen stellen", "Die wichtigsten Fragewörter", "N5", `
だれ|wer
なに|was
どこ|wo
いつ|wann
どうして|warum
どう|wie
どれ|welches
いくつ|wie viele|wie alt
ほんとう|wirklich|Wahrheit
だいじょうぶ|in Ordnung|alles gut
`),
  scenario("useful-verbs", "essentials", "🏃", "Wichtige Verben", "Handlungen im Alltag ausdrücken", "N5", `
いく|gehen|fahren
くる|kommen
みる|sehen|anschauen
きく|hören|fragen
はなす|sprechen|reden
たべる|essen
のむ|trinken
かう|kaufen
まつ|warten
わかる|verstehen
`),

  scenario("restaurant", "food", "🍽", "Im Restaurant", "Bestellen, nachfragen und bezahlen", "N5", `
レストラン|Restaurant
メニュー|Speisekarte|Menü
ちゅうもん|Bestellung
おすすめ|Empfehlung
みず|Wasser
りょうり|Gericht|Kochen
おいしい|lecker
おかいけい|Rechnung
よやく|Reservierung
てんいん|Bedienung|Angestellter
`),
  scenario("cafe", "food", "☕", "Im Café & in der Bäckerei", "Getränke und kleine Speisen bestellen", "N5", `
カフェ|Café
コーヒー|Kaffee
おちゃ|Tee
ミルク|Milch
さとう|Zucker
パン|Brot
ケーキ|Kuchen
サンドイッチ|Sandwich
あたたかい|warm
つめたい|kalt|gekühlt
`),
  scenario("izakaya", "food", "🏮", "Im Izakaya", "Gemeinsam essen und anstoßen", "N4", `
いざかや|Izakaya|japanische Kneipe
ビール|Bier
かんぱい|Prost
つまみ|Snack|Beilage
やきとり|Hähnchenspieß|Yakitori
えだまめ|Edamame|Sojabohnen
おかわり|Nachschlag|noch einmal
よっぱらう|betrunken werden
わりかん|getrennt bezahlen|Rechnung teilen
ラストオーダー|letzte Bestellung
`),
  scenario("sushi", "food", "🍣", "Im Sushi-Restaurant", "Sushi-Arten und Bestellung", "N5", `
すし|Sushi
さかな|Fisch
まぐろ|Thunfisch
さけ|Lachs
えび|Garnele
たまご|Ei
わさび|Wasabi
しょうゆ|Sojasoße
かいてんずし|Sushi vom Laufband
さら|Teller
`),
  scenario("ramen", "food", "🍜", "Im Ramen-Laden", "Nudeln passend bestellen", "N4", `
ラーメン|Ramen
めん|Nudeln
スープ|Suppe|Brühe
しょうゆ|Sojasoße
みそ|Miso
しお|Salz
チャーシュー|Schweinebraten|Chashu
おおもり|große Portion
かため|fest gekocht
からい|scharf
`),
  scenario("konbini", "food", "🏪", "Im Konbini", "Schnell einkaufen rund um die Uhr", "N5", `
コンビニ|Konbini|Minimarkt
おにぎり|Reisbällchen|Onigiri
べんとう|Lunchbox|Bento
のみもの|Getränk
ふくろ|Tüte|Beutel
レシート|Kassenbon|Quittung
あたためる|aufwärmen
コピー|Kopie
チケット|Ticket
レジ|Kasse
`),
  scenario("supermarket", "food", "🛒", "Im Supermarkt", "Lebensmittel finden und vergleichen", "N5", `
スーパー|Supermarkt
やさい|Gemüse
くだもの|Obst
にく|Fleisch
さかな|Fisch
ぎゅうにゅう|Milch
たまご|Ei
やすい|günstig|billig
たかい|teuer|hoch
しょうみきげん|Mindesthaltbarkeitsdatum
`),
  scenario("cooking", "food", "🍳", "Japanisch kochen", "Zutaten und Handgriffe in der Küche", "N4", `
りょうり|Kochen|Gericht
だいどころ|Küche
ほうちょう|Küchenmesser
なべ|Topf
やく|braten|backen
にる|kochen|köcheln
きる|schneiden
まぜる|mischen|umrühren
あじ|Geschmack
ざいりょう|Zutat|Material
`),

  scenario("airport", "travel", "✈️", "Am Flughafen", "Einchecken, Gepäck und Abflug", "N4", `
くうこう|Flughafen
ひこうき|Flugzeug
パスポート|Reisepass
にもつ|Gepäck
チェックイン|Check-in
しゅっぱつ|Abflug|Abfahrt
とうちゃく|Ankunft
とうじょうけん|Bordkarte
ほあんけんさ|Sicherheitskontrolle
おくれる|sich verspäten|zu spät kommen
`),
  scenario("train", "travel", "🚆", "Bahn & Bahnhof", "Tickets kaufen und umsteigen", "N5", `
えき|Bahnhof|Station
でんしゃ|Zug
きっぷ|Fahrkarte|Ticket
ホーム|Bahnsteig
のりば|Haltestelle|Bahnsteig
のりかえ|Umsteigen|Umstieg
かいそく|Schnellzug
かくえき|Regionalzug|Zug mit allen Halten
しゅうでん|letzter Zug
ちえん|Verspätung
`),
  scenario("bus-taxi", "travel", "🚌", "Bus & Taxi", "Einsteigen, Ziel nennen und aussteigen", "N5", `
バス|Bus
タクシー|Taxi
バスてい|Bushaltestelle
うんてんしゅ|Fahrer|Fahrerin
つぎ|nächste|als Nächstes
おります|aussteigen
のります|einsteigen
もくてきち|Zielort
うんちん|Fahrpreis
ついてください|bitte folgen Sie|bitte fahren Sie dorthin
`),
  scenario("hotel", "travel", "🏨", "Im Hotel", "Einchecken und Probleme lösen", "N5", `
ホテル|Hotel
よやく|Reservierung
へや|Zimmer
かぎ|Schlüssel
フロント|Rezeption
チェックイン|Check-in
チェックアウト|Check-out
あさごはん|Frühstück
タオル|Handtuch
エアコン|Klimaanlage
`),
  scenario("ryokan-onsen", "travel", "♨️", "Ryokan & Onsen", "Traditionell übernachten und baden", "N4", `
りょかん|Ryokan|japanisches Gasthaus
おんせん|Onsen|heiße Quelle
ゆかた|Yukata
たたみ|Tatami
ふとん|Futon
ろてんぶろ|Freiluftbad
だいよくじょう|großes Gemeinschaftsbad
げた|Holzsandalen|Geta
なかい|Zimmerbedienung im Ryokan
にゅうよく|Baden|Bad
`),
  scenario("sightseeing", "travel", "📸", "Sehenswürdigkeiten", "Besichtigen und fotografieren", "N5", `
かんこう|Sightseeing|Tourismus
おてら|Tempel
じんじゃ|Schrein
おしろ|Schloss|Burg
はくぶつかん|Museum
にわ|Garten
しゃしん|Foto|Fotografie
けしき|Landschaft|Aussicht
にゅうじょうりょう|Eintrittspreis
あんない|Führung|Information
`),
  scenario("navigation", "travel", "🗺", "In der Stadt navigieren", "Adressen und Wege finden", "N5", `
ちず|Karte
じゅうしょ|Adresse
みち|Weg|Straße
こうさてん|Kreuzung
しんごう|Ampel
はし|Brücke
かど|Ecke
となり|nebenan|Nachbar
むかい|gegenüber
まよう|sich verirren
`),
  scenario("outdoors", "travel", "🥾", "Wandern & Natur", "Draußen sicher unterwegs sein", "N4", `
やま|Berg
かわ|Fluss
うみ|Meer
もり|Wald
みち|Weg
のぼる|steigen|klettern
くだる|hinabsteigen
きゅうけい|Pause|Erholung
ちゅうい|Vorsicht|Achtung
てんぼうだい|Aussichtsplattform
`),

  scenario("home", "daily", "🏠", "Zuhause", "Räume und Dinge in der Wohnung", "N5", `
いえ|Haus|Zuhause
へや|Zimmer
げんかん|Eingangsbereich
だいどころ|Küche
おふろ|Bad|Badewanne
トイレ|Toilette|WC
まど|Fenster
つくえ|Schreibtisch|Tisch
いす|Stuhl
ベッド|Bett
`),
  scenario("morning", "daily", "🌅", "Morgenroutine", "Vom Aufstehen bis zum Losgehen", "N5", `
おきる|aufstehen
ねむい|müde|schläfrig
かお|Gesicht
あらう|waschen
はみがき|Zähneputzen
きがえる|sich umziehen
あさごはん|Frühstück
コーヒー|Kaffee
でかける|ausgehen|losgehen
いってきます|ich gehe jetzt
`),
  scenario("cleaning", "daily", "🧹", "Putzen & Haushalt", "Ordnung schaffen und Aufgaben teilen", "N4", `
そうじ|Putzen|Reinigung
ごみ|Müll
ごみばこ|Mülleimer
ほうき|Besen
そうじき|Staubsauger
ふきとる|abwischen|wegwischen
かたづける|aufräumen
すてる|wegwerfen
よごれ|Schmutz|Fleck
ぶんべつ|Mülltrennung|Sortierung
`),
  scenario("laundry", "daily", "🧺", "Wäsche waschen", "Waschen, trocknen und bügeln", "N4", `
せんたく|Wäsche|Waschen
せんたくき|Waschmaschine
せんざい|Waschmittel
かわかす|trocknen
ほす|aufhängen|trocknen lassen
たたむ|falten
アイロン|Bügeleisen
よごれ|Fleck|Schmutz
コインランドリー|Waschsalon
じゅうなんざい|Weichspüler
`),
  scenario("clothes", "daily", "👕", "Kleidung kaufen", "Größe, Farbe und Anprobe", "N5", `
ふく|Kleidung
シャツ|Hemd|Shirt
ズボン|Hose
くつ|Schuhe
サイズ|Größe
いろ|Farbe
しちゃく|Anprobe
きてみる|anprobieren|probeweise tragen
にあう|passen|gut stehen
こうかん|Umtausch|Austausch
`),
  scenario("electronics", "daily", "📱", "Handy & Elektronik", "Geräte kaufen und Probleme beschreiben", "N4", `
けいたい|Handy|Mobiltelefon
スマホ|Smartphone
パソコン|Computer|PC
じゅうでん|Aufladen
でんち|Batterie|Akku
でんげん|Strom|Einschalter
こしょう|Defekt|Störung
がめん|Bildschirm
せつぞく|Verbindung
ほしょう|Garantie
`),
  scenario("sports", "daily", "🏋️", "Sport & Fitness", "Trainieren und über Bewegung sprechen", "N5", `
うんどう|Sport|Bewegung
ジム|Fitnessstudio
はしる|laufen
およぐ|schwimmen
れんしゅう|Training|Übung
しあい|Spiel|Wettkampf
チーム|Mannschaft|Team
つかれる|müde werden|erschöpft sein
きんにく|Muskel
ストレッチ|Dehnen|Stretching
`),
  scenario("pets", "daily", "🐕", "Haustiere", "Über Tiere und ihre Pflege sprechen", "N5", `
いぬ|Hund
ねこ|Katze
ペット|Haustier
えさ|Tierfutter|Futter
さんぽ|Spaziergang
なく|bellen|miauen
かわいい|süß|niedlich
どうぶつびょういん|Tierklinik
しつけ|Erziehung|Training
せわ|Pflege|Betreuung
`),

  scenario("family", "social", "👨‍👩‍👧", "Familie", "Verwandte vorstellen und beschreiben", "N5", `
かぞく|Familie
りょうしん|Eltern
おかあさん|Mutter
おとうさん|Vater
きょうだい|Geschwister
あね|ältere Schwester
あに|älterer Bruder
いもうと|jüngere Schwester
おとうと|jüngerer Bruder
そふぼ|Großeltern
`),
  scenario("friends", "social", "🫶", "Freunde treffen", "Verabreden und gemeinsam etwas machen", "N5", `
ともだち|Freund|Freundin
いっしょ|zusammen|gemeinsam
あそぶ|spielen|Zeit verbringen
あう|treffen
やくそく|Verabredung|Versprechen
ひま|frei|Freizeit
たのしい|spaßig|unterhaltsam
またね|bis später|bis bald
れんらく|Kontakt|Benachrichtigung
ちこく|Verspätung|Zuspätkommen
`),
  scenario("dating", "social", "💞", "Dating", "Gefühle und Verabredungen", "N4", `
デート|Date|Verabredung
すき|mögen|Liebe
こいびと|Partner|Partnerin
こくはく|Liebesgeständnis
つきあう|zusammen sein|eine Beziehung führen
きもち|Gefühl
きれい|schön
やさしい|freundlich|sanft
きんちょう|Nervosität|Anspannung
わかれる|sich trennen
`),
  scenario("party", "social", "🎉", "Party & Einladung", "Einladen, feiern und gratulieren", "N4", `
パーティー|Party|Feier
おさそい|Einladung
さんか|Teilnahme
たんじょうび|Geburtstag
おめでとう|Glückwunsch
プレゼント|Geschenk
かんぱい|Prost
たのしむ|genießen|Spaß haben
おくれる|sich verspäten
つごう|Umstände|Zeit haben
`),
  scenario("festival", "social", "🎆", "Japanisches Fest", "Matsuri, Feuerwerk und Stände", "N4", `
まつり|Fest|Festival
はなび|Feuerwerk
やたい|Essensstand|Marktstand
ゆかた|Yukata
おどり|Tanz
おみこし|tragbarer Schrein|Mikoshi
にぎやか|lebhaft
こんざつ|Gedränge|Überfüllung
わたあめ|Zuckerwatte
きんぎょすくい|Goldfischfangen
`),
  scenario("shrine-etiquette", "social", "⛩", "Schrein & Tempel", "Respektvoll besuchen und Rituale verstehen", "N4", `
じんじゃ|Schrein
おてら|Tempel
おまいり|Tempelbesuch|Gebet
おみくじ|Orakelzettel
おまもり|Glücksbringer|Amulett
えんりょ|Zurückhaltung|Verzicht
れいぎ|Etikette|Höflichkeit
しずか|ruhig|still
ぬぐ|ausziehen
さつえいきんし|Fotografieren verboten
`),
  scenario("manga-anime", "social", "📚", "Manga & Anime", "Geschichten, Figuren und Fandom", "N4", `
まんが|Manga|Comic
アニメ|Anime|Zeichentrick
しゅじんこう|Hauptfigur
てき|Feind|Gegner
なかま|Gefährte|Verbündeter
ものがたり|Geschichte|Erzählung
せいゆう|Synchronsprecher|Synchronsprecherin
さいしゅうかい|letzte Folge|Finale
ネタバレ|Spoiler
おし|Lieblingsfigur|Favorit
`),
  scenario("gift-etiquette", "social", "🎁", "Geschenke & Höflichkeit", "Schenken und passend reagieren", "N4", `
おみやげ|Souvenir|Mitbringsel
プレゼント|Geschenk
つつむ|einpacken
わたす|überreichen|geben
うけとる|entgegennehmen
おれい|Dank|Gegengeschenk
えんりょ|Zurückhaltung
たいせつ|wichtig|wertvoll
こころづかい|Aufmerksamkeit|Rücksichtnahme
いただきます|ich nehme dankbar an|guten Appetit
`),

  scenario("school", "work", "🏫", "In der Schule", "Unterricht, Aufgaben und Prüfungen", "N5", `
がっこう|Schule
せんせい|Lehrer|Lehrerin
せいと|Schüler|Schülerin
きょうしつ|Klassenzimmer
じゅぎょう|Unterricht
しゅくだい|Hausaufgabe
しけん|Prüfung
きょうかしょ|Schulbuch
しつもん|Frage
こたえ|Antwort
`),
  scenario("university", "work", "🎓", "An der Universität", "Studium und Campusleben", "N3", `
だいがく|Universität
がくせい|Student|Studentin
こうぎ|Vorlesung
ゼミ|Seminar
けんきゅう|Forschung
せんこう|Hauptfach|Studienrichtung
たんい|Leistungspunkt|Credit
そつぎょう|Abschluss
ろんぶん|wissenschaftliche Arbeit|Abhandlung
としょかん|Bibliothek
`),
  scenario("office", "work", "🖥", "Im Büro", "Arbeitsalltag und Kollegen", "N4", `
かいしゃ|Firma|Unternehmen
しごと|Arbeit|Beruf
じょうし|Vorgesetzter|Vorgesetzte
どうりょう|Kollege|Kollegin
しりょう|Unterlagen|Material
しめきり|Frist|Abgabetermin
ざんぎょう|Überstunden
きゅうけい|Pause
ほうこく|Bericht|Meldung
かくにん|Bestätigung|Überprüfung
`),
  scenario("meeting", "work", "🗣", "Besprechung", "Meinungen und Entscheidungen im Meeting", "N3", `
かいぎ|Besprechung|Sitzung
ぎだい|Tagesordnung|Thema
いけん|Meinung
ていあん|Vorschlag
しつもん|Frage
せつめい|Erklärung
けってい|Entscheidung
さんせい|Zustimmung
はんたい|Ablehnung|Widerspruch
ぎじろく|Protokoll
`),
  scenario("job-interview", "work", "🤝", "Bewerbungsgespräch", "Über Erfahrung und Stärken sprechen", "N3", `
めんせつ|Bewerbungsgespräch|Interview
りれきしょ|Lebenslauf
けいけん|Erfahrung
しぼうどうき|Bewerbungsgrund|Motivation
とくい|Stärke|gut in etwas
にがて|Schwäche|nicht gut in etwas
きぼう|Wunsch|Hoffnung
さいよう|Einstellung|Anstellung
きゅうりょう|Gehalt
きんむじかん|Arbeitszeit
`),
  scenario("email-phone", "work", "📧", "E-Mail & Telefon", "Professionell Kontakt halten", "N4", `
メール|E-Mail
でんわ|Telefon|Anruf
けんめい|Betreff
へんじ|Antwort|Rückmeldung
てんぷ|Anhang|Beifügung
でんごん|Nachricht|Mitteilung
つたえる|mitteilen|übermitteln
おりかえす|zurückrufen
しょうしょう|einen Moment|ein wenig
たいおう|Bearbeitung|Umgang
`),
  scenario("remote-work", "work", "🏡", "Homeoffice", "Online zusammenarbeiten", "N3", `
ざいたくきんむ|Homeoffice|Arbeit von zu Hause
オンライン|online
かいぎ|Besprechung
せつぞく|Verbindung
マイク|Mikrofon
がめんきょうゆう|Bildschirmfreigabe
つうしん|Kommunikation|Datenverbindung
しゅうちゅう|Konzentration
こうりつ|Effizienz
じかんかんり|Zeitmanagement
`),
  scenario("bank-post", "work", "🏦", "Bank & Post", "Geld und Sendungen erledigen", "N4", `
ぎんこう|Bank
こうざ|Konto
げんきん|Bargeld
ふりこみ|Überweisung
ひきだす|abheben|herausziehen
ゆうびんきょく|Postamt|Post
にもつ|Paket|Gepäck
きって|Briefmarke
そうりょう|Porto|Versandkosten
とどける|zustellen|liefern
`),

  scenario("doctor", "health", "🧑‍⚕️", "Beim Arzt", "Beschwerden erklären und Rat verstehen", "N4", `
びょういん|Krankenhaus
いしゃ|Arzt|Ärztin
よやく|Termin|Reservierung
しょうじょう|Symptom
いたい|schmerzhaft|weh tun
ねつ|Fieber
せき|Husten
かぜをひく|sich erkälten|eine Erkältung bekommen
けんさ|Untersuchung|Test
しんさつ|ärztliche Untersuchung
`),
  scenario("pharmacy", "health", "💊", "In der Apotheke", "Medikamente und Anwendung", "N4", `
くすり|Medikament|Arznei
やっきょく|Apotheke
しょほうせん|Rezept
じょうざい|Tablette
ぬりぐすり|Salbe
ふくさよう|Nebenwirkung
アレルギー|Allergie
しょくご|nach dem Essen
いちにちさんかい|dreimal täglich
ねむけ|Schläfrigkeit|Müdigkeit
`),
  scenario("dentist", "health", "🦷", "Beim Zahnarzt", "Zahnschmerzen und Behandlung", "N4", `
はいしゃ|Zahnarzt|Zahnärztin
は|Zahn
はぐき|Zahnfleisch
むしば|Karies
いたみ|Schmerz
ちりょう|Behandlung
ますい|Betäubung|Narkose
はをみがく|Zähne putzen
よやく|Termin
けんしん|Vorsorgeuntersuchung
`),
  scenario("food-allergy", "health", "🥜", "Allergien beim Essen", "Sicher bestellen und Zutaten prüfen", "N4", `
アレルギー|Allergie
たまご|Ei
ぎゅうにゅう|Milch
こむぎ|Weizen
そば|Buchweizen|Soba
らっかせい|Erdnuss
はいっています|ist enthalten
ぬいてください|bitte weglassen
せいぶん|Inhaltsstoff|Bestandteil
きけん|Gefahr|gefährlich
`),
  scenario("emergency", "health", "🚑", "Medizinischer Notfall", "Schnell Hilfe holen", "N4", `
たすけて|Hilfe|helfen Sie
きゅうきゅうしゃ|Krankenwagen
きゅうきゅう|Notfall|Erste Hilfe
いしき|Bewusstsein
こきゅう|Atmung
けが|Verletzung
ち|Blut
うごけない|kann mich nicht bewegen
れんらくさき|Kontaktadresse|Notfallkontakt
きんきゅう|dringend|Notfall
`),
  scenario("disaster", "health", "⛑", "Erdbeben & Katastrophe", "Warnungen und Evakuierung verstehen", "N3", `
じしん|Erdbeben
つなみ|Tsunami
たいふう|Taifun
ひなん|Evakuierung|Flucht
ひなんじょ|Notunterkunft
けいほう|Warnung|Alarm
あんぜん|Sicherheit|sicher
そなえる|vorsorgen|vorbereiten
ひじょうぐち|Notausgang
きゅうじょ|Rettung
`),
  scenario("police-lost", "health", "👮", "Polizei & Fundsachen", "Verlorenes melden und Hilfe erhalten", "N4", `
けいさつ|Polizei
こうばん|Polizeiposten
なくす|verlieren
おとしもの|Fundsache|verlorener Gegenstand
さいふ|Geldbörse
パスポート|Reisepass
ぬすまれる|bestohlen werden
とどけ|Meldung|Anzeige
みぶんしょうめいしょ|Ausweis
みつかる|gefunden werden
`),
  scenario("mental-health", "health", "🌿", "Gefühle & mentale Gesundheit", "Über Belastung und Wohlbefinden sprechen", "N3", `
きもち|Gefühl
ふあん|Angst|Unsicherheit
ストレス|Stress
つかれる|erschöpft sein|müde werden
ねむれない|nicht schlafen können
なやみ|Sorge|Problem
そうだん|Beratung|Besprechung
やすむ|sich ausruhen|pausieren
あんしん|Erleichterung|Sicherheit
むり|unmöglich|Überforderung
`),

  scenario("apartment", "advanced", "🏢", "Wohnungssuche", "Mieten, besichtigen und einziehen", "N3", `
ふどうさん|Immobilie|Immobilienmakler
ちんたい|Mietwohnung|Miete
やちん|Miete
しききん|Kaution
れいきん|Schlüsselgeld
けいやく|Vertrag
ないけん|Besichtigung
ひっこし|Umzug
かんりひ|Verwaltungsgebühr|Nebenkosten
ほしょうにん|Bürge|Garant
`),
  scenario("city-hall", "advanced", "🏛", "Auf dem Amt", "Anmelden und Dokumente beantragen", "N3", `
しやくしょ|Rathaus|Stadtverwaltung
てつづき|Verfahren|Formalität
じゅうみんひょう|Meldebescheinigung
ざいりゅうカード|Aufenthaltskarte
とどけで|Anmeldung|Meldung
しょうめいしょ|Bescheinigung|Zertifikat
まどぐち|Schalter|Anlaufstelle
しんせい|Antrag
きにゅう|Eintragen|Ausfüllen
ほんにんかくにん|Identitätsprüfung
`),
  scenario("contracts", "advanced", "📝", "Verträge & Versicherung", "Bedingungen und Pflichten verstehen", "N2", `
けいやく|Vertrag
じょうけん|Bedingung
きかん|Zeitraum|Frist
こうしん|Verlängerung|Erneuerung
かいやく|Kündigung|Vertragsauflösung
ほけん|Versicherung
ほしょう|Garantie|Entschädigung
せきにん|Verantwortung
ぎむ|Pflicht
どうい|Zustimmung|Einverständnis
`),
  scenario("taxes", "advanced", "🧾", "Steuern & Finanzen", "Abgaben und Einkommen besprechen", "N2", `
ぜいきん|Steuer
しょとく|Einkommen
しんこく|Steuererklärung|Meldung
こうじょ|Abzug|Freibetrag
けいひ|Ausgabe|Kosten
りょうしゅうしょ|Quittung|Beleg
ねんきん|Rente|Pension
しゃかいほけん|Sozialversicherung
のうぜい|Steuerzahlung
かいけい|Buchhaltung|Abrechnung
`),
  scenario("news-politics", "advanced", "📰", "Nachrichten & Politik", "Berichte und öffentliche Debatten", "N2", `
ニュース|Nachrichten
ほうどう|Berichterstattung
せいじ|Politik
せんきょ|Wahl
せいふ|Regierung
こっかい|Parlament
せいさく|Politikmaßnahme|Strategie
よとう|Regierungspartei
やとう|Oppositionspartei
よろん|öffentliche Meinung
`),
  scenario("environment", "advanced", "🌏", "Umwelt & Klima", "Nachhaltigkeit und Natur diskutieren", "N2", `
かんきょう|Umwelt|Umgebung
きこう|Klima
おんだんか|Erderwärmung
おせん|Verschmutzung
はいきぶつ|Abfall
さいせいかのう|erneuerbar
しょうエネ|Energiesparen
ほご|Schutz
せいたいけい|Ökosystem
じぞくかのう|nachhaltig
`),
  scenario("technology", "advanced", "🤖", "Technologie & KI", "Digitale Systeme und Innovation", "N2", `
ぎじゅつ|Technologie|Technik
じんこうちのう|künstliche Intelligenz|KI
データ|Daten
じょうほう|Information
かいはつ|Entwicklung
じどうか|Automatisierung
あんぜんせい|Sicherheit
こじんじょうほう|personenbezogene Daten
かそうげんじつ|virtuelle Realität
かくしん|Innovation|Neuerung
`),
  scenario("business", "advanced", "📈", "Wirtschaft & Unternehmen", "Märkte und Strategien verstehen", "N2", `
けいざい|Wirtschaft
きぎょう|Unternehmen
しじょう|Markt
うりあげ|Umsatz
りえき|Gewinn
とうし|Investition
せいちょう|Wachstum
きょうそう|Wettbewerb
せんりゃく|Strategie
じゅよう|Nachfrage
`),
  scenario("law-debate", "advanced", "⚖️", "Recht & Diskussion", "Argumentieren und Regeln einordnen", "N1", `
ほうりつ|Gesetz|Recht
けんり|Recht|Berechtigung
いはん|Verstoß
はんざい|Verbrechen
しょうこ|Beweis
ろんてん|Streitpunkt
こんきょ|Begründung|Grundlage
しゅちょう|Behauptung|Standpunkt
はんろん|Gegenargument|Widerlegung
ごうい|Einigung|Konsens
`),
];

const vocabularyByKana = new Map(
  LEGACY_VOCABULARY.map((word) => [word.kana, word]),
);

VOCABULARY_SETS.forEach((set, setIndex) => {
  const defaultLevelIndex = WORD_LEVELS.findIndex((level) => level.id === set.level);
  set.wordIds = set.words.map(([kana, primary, ...aliases], wordIndex) => {
    let word = vocabularyByKana.get(kana);
    if (!word) {
      word = {
        id: `word:vocab:${kana}`,
        kana,
        primary,
        answers: [primary, ...aliases],
        level: set.level,
        levelIndex: defaultLevelIndex,
        frequency: 10_000 + setIndex * 100 + wordIndex,
        setIds: [],
        setRanks: {},
      };
      vocabularyByKana.set(kana, word);
    } else {
      word.answers = [...new Set([...word.answers, primary, ...aliases])];
      if (defaultLevelIndex < word.levelIndex) {
        word.level = set.level;
        word.levelIndex = defaultLevelIndex;
      }
    }
    if (!word.setIds.includes(set.id)) word.setIds.push(set.id);
    word.setRanks[set.id] = wordIndex;
    return word.id;
  });
  delete set.words;
});

export const VOCABULARY = [...vocabularyByKana.values()];
