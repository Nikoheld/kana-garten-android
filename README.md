# Kana Garten für Android

Eine vollständige, offlinefähige Android-App zum Lesen, Verstehen und Sprechen von Japanisch. Sie enthält die gesamte Lernlogik von [japanese.fasrv.ch](https://japanese.fasrv.ch/) und ergänzt sie um ein natives Usage-Dashboard, zeitbasiertes Spaced Repetition, GitHub-Auto-Updates und das Hibi-Streak-Widget.

[Neueste APK herunterladen](https://github.com/Nikoheld/kana-garten-android/releases/latest)

## App

| Lernen | Aktivitäts-Dashboard | Offline & Updates |
| --- | --- | --- |
| ![Lernansicht](docs/app-home.png) | ![Usage-Dashboard](docs/usage-dashboard.png) | ![Einstellungen](docs/app-settings.png) |

## Funktionen

- Hiragana und Katakana, frei kombinierbare Reihen und Eselsbrücken
- 65 kombinierbare Alltagsszenarien mit 750+ Kana-Wörtern, Einzelwortauswahl und globalem Spaced-Repetition-Topf
- einzelne Kanji und Kanji-Wörter von N5 bis N1
- 50 Gesprächssituationen in sieben Themenbereichen mit Rollenspiel, geführtem Sprechen und Shadowing
- lokaler Aufnahmevergleich, natürliche Alternativantworten, Sinnabschnitt-Training, Mora-Rhythmus und ehrliche dreistufige Selbsteinschätzung
- globaler Sprech-Wiederholungstopf unabhängig von der aktuellen Themen- und Levelauswahl
- ein gemeinsamer Spaced-Repetition-Plan für Kana, Wörter, Kanji, Kanji-Wörter und Gespräche; Kana starten nach 10 Minuten, später wachsen die Abstände bis auf 120 Tage
- native Lern-Erinnerungen zum nächsten fälligen Termin, auch bei geschlossener App und nach einem Geräteneustart
- vollständig offline gebündelte Inhalte, Datensätze und Noto Sans JP
- doppelte Fortschrittssicherung: Web-Speicher plus natives Android-Backup
- lokales Usage-Dashboard mit Lernzeit pro Tag, Bereich, Woche, Streak, fälligen Reviews und letzten Einheiten
- Hibi-Widget mit vier Emotionen, die sich bis zum drohenden Streak-Verlust steigern
- Auto-Updater über signierte APKs aus GitHub Releases
- App-weiter Hell-/Dunkelmodus inklusive Systemleisten, Dashboard, Einstellungen, Dialogen und Widget

## Datenschutz und Offline-Verhalten

Lernfortschritt, Aufnahmen und Nutzungsdaten verlassen das Gerät nicht. Sprachaufnahmen werden nur temporär im WebView gehalten und beim nächsten Gespräch gelöscht. Internet wird ausschliesslich für die freiwillige Update-Prüfung benötigt. Details stehen in [PRIVACY.md](PRIVACY.md).

Die japanische Sprachausgabe nutzt Android Text-to-Speech. Wenn auf einem Gerät noch keine japanische Offline-Stimme installiert ist, weist die App darauf hin; alle übrigen Lernfunktionen funktionieren trotzdem offline.

## Technik

- Java 17, Android SDK 35, Mindestversion Android 8.0
- eigenständiges, touch-orientiertes Mobile-Layout sowie native Android-Views für Dashboard, Navigation, Erinnerungen, Update-Flow und Widget
- sichere lokale HTTPS-Origin `https://app.local` für die gebündelte Lernoberfläche
- SharedPreferences für Usage-Daten und natives Fortschritts-Backup
- Android `DownloadManager` und Paketinstaller für Updates
- `AppWidgetProvider`/`RemoteViews` für das Streak-Widget

## Lokal bauen

```bash
export ANDROID_HOME=/path/to/android-sdk
./gradlew assembleDebug
```

Die Debug-APK liegt danach unter `app/build/outputs/apk/debug/app-debug.apk`.

Ein signierter Release-Build erwartet diese Umgebungsvariablen:

```text
KEYSTORE_PATH
KEYSTORE_PASSWORD
KEY_ALIAS
KEY_PASSWORD
```

Signierschlüssel und Passwörter werden nicht im Repository gespeichert. Offizielle APKs werden mit dem dauerhaft gesicherten Projektschlüssel signiert.

## Releases und Auto-Updater

Offizielle Versionen werden als signierte APK zusammen mit ihrer SHA-256-Prüfsumme unter [GitHub Releases](https://github.com/Nikoheld/kana-garten-android/releases) veröffentlicht. Installierte Apps vergleichen ihre Versionsnummer mit dem neuesten Release und bieten das APK direkt in der App an. Android prüft zusätzlich, dass ein Update mit demselben App-Schlüssel signiert ist.

## Maskottchen

Hibi ist ein eigens für Kana Garten erstellter, KI-generierter Feuergeist. Das Sprite mit allen vier Streak-Stimmungen liegt in [`docs/hibi-mascot-sprite.png`](docs/hibi-mascot-sprite.png).

## Lizenz

Quellcode: [MIT](LICENSE). Noto Sans JP wird unter der SIL Open Font License verteilt. Hibi und die zugehörigen Illustrationen sind Projekt-Assets und nicht Teil der MIT-Code-Lizenz.
