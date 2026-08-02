package ch.fasrv.kanagarten;

import android.Manifest;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.provider.Settings;

import org.json.JSONArray;
import org.json.JSONObject;

final class ReviewReminderScheduler {
    static final String CHANNEL_ID = "review_reminders";
    static final String ACTION_REVIEW_REMINDER = "ch.fasrv.kanagarten.REVIEW_REMINDER";

    private static final String PREFS = "kana_garten_review_reminders";
    private static final String LAST_NOTIFIED = "last_notified_at";
    private static final int ALARM_REQUEST = 4801;
    private static final int NOTIFICATION_ID = 4802;
    private static final long MINUTE = 60_000L;
    private static final long HOUR = 60 * MINUTE;

    private ReviewReminderScheduler() {}

    static void initialize(Context context) {
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        if (manager != null) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Lern-Wiederholungen",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Erinnert dich, sobald gelernte Kana, Wörter, Kanji, Grammatik oder Gespräche fällig sind.");
            channel.enableVibration(true);
            manager.createNotificationChannel(channel);
        }
        scheduleFromProgress(context, new UsageStore(context).restoreProgress());
    }

    static boolean areNotificationsAllowed(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
            && context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            return false;
        }
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        return manager != null && manager.areNotificationsEnabled();
    }

    static Intent notificationSettingsIntent(Context context) {
        Intent intent = new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS);
        intent.putExtra(Settings.EXTRA_APP_PACKAGE, context.getPackageName());
        intent.putExtra(Settings.EXTRA_CHANNEL_ID, CHANNEL_ID);
        return intent;
    }

    static void scheduleFromProgress(Context context, String progressJson) {
        Context appContext = context.getApplicationContext();
        AlarmManager alarms = appContext.getSystemService(AlarmManager.class);
        if (alarms == null) return;
        PendingIntent alarmIntent = alarmIntent(appContext);
        alarms.cancel(alarmIntent);
        if (!areNotificationsAllowed(appContext)) return;

        ReviewSummary summary = readSummary(progressJson, System.currentTimeMillis());
        if (!summary.hasScheduledItems()) return;

        long now = System.currentTimeMillis();
        long triggerAt = summary.earliestReviewAt;
        if (summary.dueCount > 0) {
            long lastNotified = appContext
                .getSharedPreferences(PREFS, Context.MODE_PRIVATE)
                .getLong(LAST_NOTIFIED, 0L);
            triggerAt = lastNotified > now - 12 * HOUR
                ? Math.max(now + 15 * MINUTE, lastNotified + 24 * HOUR)
                : now + 5 * MINUTE;
        }
        alarms.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, alarmIntent);
    }

    static void postDueNotification(Context context) {
        Context appContext = context.getApplicationContext();
        UsageStore store = new UsageStore(appContext);
        long now = System.currentTimeMillis();
        ReviewSummary summary = readSummary(store.restoreProgress(), now);
        if (summary.dueCount <= 0 || !areNotificationsAllowed(appContext)) {
            scheduleFromProgress(appContext, store.restoreProgress());
            return;
        }

        Intent openApp = new Intent(appContext, MainActivity.class)
            .putExtra("open_reviews", true)
            .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent contentIntent = PendingIntent.getActivity(
            appContext,
            NOTIFICATION_ID,
            openApp,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        Notification notification = new Notification.Builder(appContext, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_review_notification)
            .setColor(Color.rgb(217, 74, 54))
            .setContentTitle(summary.dueCount == 1
                ? "Eine Wiederholung ist bereit"
                : summary.dueCount + " Wiederholungen sind bereit")
            .setContentText(summary.notificationText())
            .setStyle(new Notification.BigTextStyle().bigText(
                summary.notificationText() + " Eine kurze Runde hält dein Japanisch sicher im Gedächtnis."
            ))
            .setCategory(Notification.CATEGORY_REMINDER)
            .setAutoCancel(true)
            .setContentIntent(contentIntent)
            .build();

        NotificationManager manager = appContext.getSystemService(NotificationManager.class);
        if (manager != null) manager.notify(NOTIFICATION_ID, notification);
        appContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit()
            .putLong(LAST_NOTIFIED, now)
            .apply();

        AlarmManager alarms = appContext.getSystemService(AlarmManager.class);
        if (alarms != null) {
            alarms.setAndAllowWhileIdle(
                AlarmManager.RTC_WAKEUP,
                now + 24 * HOUR,
                alarmIntent(appContext)
            );
        }
    }

    private static PendingIntent alarmIntent(Context context) {
        Intent intent = new Intent(context, ReviewReminderReceiver.class)
            .setAction(ACTION_REVIEW_REMINDER);
        return PendingIntent.getBroadcast(
            context,
            ALARM_REQUEST,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
    }

    private static ReviewSummary readSummary(String json, long now) {
        ReviewSummary summary = new ReviewSummary();
        if (json == null || json.length() < 2) return summary;
        try {
            JSONObject progress = new JSONObject(json);
            int wordMasteryTarget = Math.max(
                1,
                Math.min(
                    20,
                    progress.optJSONObject("settings") == null
                        ? 3
                        : progress.optJSONObject("settings").optInt("wordMasteryTarget", 3)
                )
            );
            String[] groups = {"kana", "words", "kanji", "kanjiWords", "conversations", "grammar"};
            for (String group : groups) {
                JSONObject entries = progress.optJSONObject(group);
                if (entries == null) continue;
                JSONArray names = entries.names();
                if (names == null) continue;
                int minimumStrength = "kana".equals(group)
                    ? 1
                    : ("words".equals(group) || "kanjiWords".equals(group))
                        ? wordMasteryTarget
                        : 3;
                for (int i = 0; i < names.length(); i++) {
                    JSONObject stat = entries.optJSONObject(names.optString(i));
                    if (stat == null) continue;
                    int peak = Math.max(
                        stat.optInt("peakStrength", 0),
                        stat.optInt("strength", 0)
                    );
                    if (peak < minimumStrength) continue;
                    long reviewAt = stat.optLong("nextReviewAt", 0L);
                    if (reviewAt <= 0L) continue;
                    summary.earliestReviewAt = Math.min(summary.earliestReviewAt, reviewAt);
                    if (reviewAt <= now) {
                        summary.dueCount++;
                        summary.incrementGroup(group);
                    }
                }
            }
        } catch (Exception ignored) {
            // Eine beschädigte Sicherung darf weder App noch Erinnerungen blockieren.
        }
        return summary;
    }

    private static final class ReviewSummary {
        long earliestReviewAt = Long.MAX_VALUE;
        int dueCount;
        int kana;
        int words;
        int kanji;
        int kanjiWords;
        int conversations;
        int grammar;

        boolean hasScheduledItems() {
            return earliestReviewAt != Long.MAX_VALUE;
        }

        void incrementGroup(String group) {
            switch (group) {
                case "kana": kana++; break;
                case "words": words++; break;
                case "kanji": kanji++; break;
                case "kanjiWords": kanjiWords++; break;
                case "conversations": conversations++; break;
                case "grammar": grammar++; break;
                default: break;
            }
        }

        String notificationText() {
            StringBuilder text = new StringBuilder();
            append(text, kana, "Kana");
            append(text, words, "Kana-Wörter");
            append(text, kanji, "Kanji");
            append(text, kanjiWords, "Kanji-Wörter");
            append(text, conversations, "Gespräche");
            append(text, grammar, "Grammatik");
            return text.length() == 0 ? "Deine nächste Lernrunde wartet." : text.toString();
        }

        private void append(StringBuilder text, int count, String label) {
            if (count <= 0) return;
            if (text.length() > 0) text.append(" · ");
            text.append(count).append(' ').append(label);
        }
    }
}
