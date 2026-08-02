package ch.fasrv.kanagarten;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

public final class UsageStore {
    private static final String PREFS = "kana_garten_native_v1";
    private static final String SESSIONS = "usage_sessions";
    private static final String PROGRESS = "progress_backup";
    private static final String JLPT_PROGRESS = "jlpt_progress";
    private static final String DAILY_GOAL_ENABLED = "daily_goal_enabled";
    private static final String DAILY_GOAL_MINUTES = "daily_goal_minutes";
    private static final String DAILY_GOAL_REMINDER_HOUR = "daily_goal_reminder_hour";
    private static final String DAILY_GOAL_REMINDER_MINUTE = "daily_goal_reminder_minute";
    private static final String SHOW_DAILY_GOAL = "show_daily_goal";
    private static final String SHOW_JLPT_PROGRESS = "show_jlpt_progress";
    private static final DateTimeFormatter DATE = DateTimeFormatter.ISO_LOCAL_DATE;

    private final SharedPreferences preferences;

    public UsageStore(Context context) {
        preferences = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    public synchronized void recordSession(String mode, int durationSeconds, int itemCount) {
        try {
            JSONArray sessions = readSessionArray();
            JSONObject entry = new JSONObject();
            entry.put("date", LocalDate.now().format(DATE));
            entry.put("timestamp", System.currentTimeMillis());
            entry.put("mode", sanitizeMode(mode));
            entry.put("durationSeconds", Math.max(1, durationSeconds));
            entry.put("itemCount", Math.max(1, itemCount));
            sessions.put(entry);

            JSONArray trimmed = new JSONArray();
            int start = Math.max(0, sessions.length() - 730);
            for (int i = start; i < sessions.length(); i++) trimmed.put(sessions.get(i));
            preferences.edit().putString(SESSIONS, trimmed.toString()).apply();
        } catch (Exception ignored) {
            // Eine beschädigte Statistik darf nie den Lernfortschritt blockieren.
        }
    }

    public synchronized void backupProgress(String progressJson) {
        if (progressJson == null || progressJson.length() < 2) return;
        preferences.edit().putString(PROGRESS, progressJson).apply();
    }

    public synchronized String restoreProgress() {
        return preferences.getString(PROGRESS, "");
    }

    public synchronized void backupJlptProgress(String progressJson) {
        if (progressJson == null || progressJson.length() < 2) return;
        preferences.edit().putString(JLPT_PROGRESS, progressJson).apply();
    }

    public synchronized GoalSettings goalSettings() {
        return new GoalSettings(
            preferences.getBoolean(DAILY_GOAL_ENABLED, false),
            clampGoalMinutes(preferences.getInt(DAILY_GOAL_MINUTES, 20)),
            Math.max(0, Math.min(23, preferences.getInt(DAILY_GOAL_REMINDER_HOUR, 19))),
            Math.max(0, Math.min(59, preferences.getInt(DAILY_GOAL_REMINDER_MINUTE, 0))),
            preferences.getBoolean(SHOW_DAILY_GOAL, true),
            preferences.getBoolean(SHOW_JLPT_PROGRESS, false)
        );
    }

    public synchronized void setDailyGoalEnabled(boolean enabled) {
        preferences.edit().putBoolean(DAILY_GOAL_ENABLED, enabled).apply();
    }

    public synchronized void setDailyGoalMinutes(int minutes) {
        preferences.edit().putInt(DAILY_GOAL_MINUTES, clampGoalMinutes(minutes)).apply();
    }

    public synchronized void setDailyGoalReminderTime(int hour, int minute) {
        preferences.edit()
            .putInt(DAILY_GOAL_REMINDER_HOUR, Math.max(0, Math.min(23, hour)))
            .putInt(DAILY_GOAL_REMINDER_MINUTE, Math.max(0, Math.min(59, minute)))
            .apply();
    }

    public synchronized void setShowDailyGoal(boolean show) {
        preferences.edit().putBoolean(SHOW_DAILY_GOAL, show).apply();
    }

    public synchronized void setShowJlptProgress(boolean show) {
        preferences.edit().putBoolean(SHOW_JLPT_PROGRESS, show).apply();
    }

    public synchronized String dashboardPreferencesJson() {
        GoalSettings settings = goalSettings();
        JSONObject result = new JSONObject();
        try {
            result.put("dailyGoalEnabled", settings.dailyGoalEnabled);
            result.put("dailyGoalMinutes", settings.dailyGoalMinutes);
            result.put("showDailyGoal", settings.showDailyGoal);
            result.put("showJlptProgress", settings.showJlptProgress);
            result.put("todaySeconds", todaySeconds());
        } catch (Exception ignored) {
            return "{}";
        }
        return result.toString();
    }

    public synchronized int todaySeconds() {
        String today = LocalDate.now().format(DATE);
        int seconds = 0;
        for (Session session : readSessions()) {
            if (today.equals(session.date)) seconds += session.durationSeconds;
        }
        return seconds;
    }

    public synchronized Snapshot snapshot() {
        List<Session> sessions = readSessions();
        LocalDate today = LocalDate.now();
        Map<String, Integer> secondsByDate = new HashMap<>();
        Map<String, Integer> secondsByMode = new LinkedHashMap<>();
        secondsByMode.put("kana", 0);
        secondsByMode.put("words", 0);
        secondsByMode.put("kanji", 0);
        secondsByMode.put("kanji-words", 0);
        secondsByMode.put("conversation", 0);
        secondsByMode.put("grammar", 0);

        int weekSeconds = 0;
        int totalSeconds = 0;
        for (Session session : sessions) {
            secondsByDate.merge(session.date, session.durationSeconds, Integer::sum);
            totalSeconds += session.durationSeconds;
            LocalDate day = parseDate(session.date);
            if (day != null && !day.isBefore(today.minusDays(6))) {
                weekSeconds += session.durationSeconds;
                secondsByMode.merge(session.mode, session.durationSeconds, Integer::sum);
            }
        }

        List<DayStat> lastFourteenDays = new ArrayList<>();
        for (int offset = 13; offset >= 0; offset--) {
            LocalDate day = today.minusDays(offset);
            String key = day.format(DATE);
            lastFourteenDays.add(new DayStat(day, secondsByDate.getOrDefault(key, 0)));
        }

        List<Session> recent = new ArrayList<>(sessions);
        Collections.reverse(recent);
        if (recent.size() > 12) recent = new ArrayList<>(recent.subList(0, 12));

        return new Snapshot(
            getStreak(sessions),
            secondsByDate.getOrDefault(today.format(DATE), 0),
            weekSeconds,
            totalSeconds,
            countDueReviews(),
            secondsByDate.containsKey(today.format(DATE)),
            lastFourteenDays,
            secondsByMode,
            recent,
            goalSettings(),
            readJlptProgress()
        );
    }

    public synchronized int getStreak() {
        return getStreak(readSessions());
    }

    public synchronized boolean hasPracticedToday() {
        String today = LocalDate.now().format(DATE);
        for (Session session : readSessions()) {
            if (today.equals(session.date)) return true;
        }
        return false;
    }

    private int getStreak(List<Session> sessions) {
        Set<String> practicedDays = new HashSet<>();
        for (Session session : sessions) practicedDays.add(session.date);
        LocalDate today = LocalDate.now();
        LocalDate cursor = practicedDays.contains(today.format(DATE))
            ? today
            : today.minusDays(1);
        int streak = 0;
        while (practicedDays.contains(cursor.format(DATE))) {
            streak++;
            cursor = cursor.minusDays(1);
        }
        return streak;
    }

    private int countDueReviews() {
        String json = restoreProgress();
        if (json.isEmpty()) return 0;
        try {
            JSONObject progress = new JSONObject(json);
            long now = System.currentTimeMillis();
            int due = 0;
            String[] groups = {"kana", "words", "kanji", "kanjiWords", "conversations", "grammar"};
            for (String group : groups) {
                JSONObject entries = progress.optJSONObject(group);
                if (entries == null) continue;
                JSONArray names = entries.names();
                if (names == null) continue;
                int minimumStrength = "kana".equals(group) ? 1 : 3;
                for (int i = 0; i < names.length(); i++) {
                    JSONObject stat = entries.optJSONObject(names.optString(i));
                    if (stat == null || Math.max(
                        stat.optInt("strength", 0),
                        stat.optInt("peakStrength", 0)
                    ) < minimumStrength) continue;
                    long nextReview = stat.optLong("nextReviewAt", Long.MAX_VALUE);
                    if (nextReview <= now) due++;
                }
            }
            return due;
        } catch (Exception ignored) {
            return 0;
        }
    }

    private JSONArray readSessionArray() {
        try {
            return new JSONArray(preferences.getString(SESSIONS, "[]"));
        } catch (Exception ignored) {
            return new JSONArray();
        }
    }

    private List<Session> readSessions() {
        List<Session> result = new ArrayList<>();
        JSONArray array = readSessionArray();
        for (int i = 0; i < array.length(); i++) {
            JSONObject item = array.optJSONObject(i);
            if (item == null) continue;
            result.add(new Session(
                item.optString("date", ""),
                item.optLong("timestamp", 0L),
                sanitizeMode(item.optString("mode", "kana")),
                Math.max(1, item.optInt("durationSeconds", 1)),
                Math.max(1, item.optInt("itemCount", 1))
            ));
        }
        return result;
    }

    private String sanitizeMode(String mode) {
        if (mode == null) return "kana";
        switch (mode) {
            case "words":
            case "kanji":
            case "kanji-words":
            case "conversation":
            case "grammar":
            case "kana":
                return mode;
            default:
                return "kana";
        }
    }

    private LocalDate parseDate(String value) {
        try {
            return LocalDate.parse(value, DATE);
        } catch (Exception ignored) {
            return null;
        }
    }

    private int clampGoalMinutes(int minutes) {
        return Math.max(5, Math.min(180, minutes));
    }

    private JlptProgress readJlptProgress() {
        String json = preferences.getString(JLPT_PROGRESS, "");
        if (json.isEmpty()) return JlptProgress.empty();
        try {
            JSONObject value = new JSONObject(json);
            return new JlptProgress(
                value.optString("target", "N5"),
                Math.max(0, Math.min(100, value.optInt("percent", 0))),
                Math.max(0, value.optInt("learned", 0)),
                Math.max(0, value.optInt("total", 0)),
                value.optBoolean("complete", false)
            );
        } catch (Exception ignored) {
            return JlptProgress.empty();
        }
    }

    public static String modeLabel(String mode) {
        switch (mode) {
            case "words": return "Kana-Wörter";
            case "kanji": return "Kanji";
            case "kanji-words": return "Kanji-Wörter";
            case "conversation": return "Gespräche";
            case "grammar": return "Grammatik";
            default: return "Kana lesen";
        }
    }

    public static final class Session {
        public final String date;
        public final long timestamp;
        public final String mode;
        public final int durationSeconds;
        public final int itemCount;

        Session(String date, long timestamp, String mode, int durationSeconds, int itemCount) {
            this.date = date;
            this.timestamp = timestamp;
            this.mode = mode;
            this.durationSeconds = durationSeconds;
            this.itemCount = itemCount;
        }
    }

    public static final class DayStat {
        public final LocalDate date;
        public final int seconds;

        DayStat(LocalDate date, int seconds) {
            this.date = date;
            this.seconds = seconds;
        }
    }

    public static final class Snapshot {
        public final int streak;
        public final int todaySeconds;
        public final int weekSeconds;
        public final int totalSeconds;
        public final int dueReviews;
        public final boolean practicedToday;
        public final List<DayStat> days;
        public final Map<String, Integer> modeSeconds;
        public final List<Session> recentSessions;
        public final GoalSettings goalSettings;
        public final JlptProgress jlptProgress;

        Snapshot(int streak, int todaySeconds, int weekSeconds, int totalSeconds,
                 int dueReviews, boolean practicedToday, List<DayStat> days,
                 Map<String, Integer> modeSeconds, List<Session> recentSessions,
                 GoalSettings goalSettings, JlptProgress jlptProgress) {
            this.streak = streak;
            this.todaySeconds = todaySeconds;
            this.weekSeconds = weekSeconds;
            this.totalSeconds = totalSeconds;
            this.dueReviews = dueReviews;
            this.practicedToday = practicedToday;
            this.days = days;
            this.modeSeconds = modeSeconds;
            this.recentSessions = recentSessions;
            this.goalSettings = goalSettings;
            this.jlptProgress = jlptProgress;
        }
    }

    public static final class GoalSettings {
        public final boolean dailyGoalEnabled;
        public final int dailyGoalMinutes;
        public final int reminderHour;
        public final int reminderMinute;
        public final boolean showDailyGoal;
        public final boolean showJlptProgress;

        GoalSettings(boolean dailyGoalEnabled, int dailyGoalMinutes,
                     int reminderHour, int reminderMinute, boolean showDailyGoal,
                     boolean showJlptProgress) {
            this.dailyGoalEnabled = dailyGoalEnabled;
            this.dailyGoalMinutes = dailyGoalMinutes;
            this.reminderHour = reminderHour;
            this.reminderMinute = reminderMinute;
            this.showDailyGoal = showDailyGoal;
            this.showJlptProgress = showJlptProgress;
        }
    }

    public static final class JlptProgress {
        public final String target;
        public final int percent;
        public final int learned;
        public final int total;
        public final boolean complete;

        JlptProgress(String target, int percent, int learned, int total, boolean complete) {
            this.target = target;
            this.percent = percent;
            this.learned = learned;
            this.total = total;
            this.complete = complete;
        }

        static JlptProgress empty() {
            return new JlptProgress("N5", 0, 0, 0, false);
        }
    }
}
