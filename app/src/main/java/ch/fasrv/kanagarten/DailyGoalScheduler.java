package ch.fasrv.kanagarten;

import android.Manifest;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.provider.Settings;

import java.time.ZonedDateTime;

final class DailyGoalScheduler {
    static final String CHANNEL_ID = "daily_study_goal";
    static final String ACTION_DAILY_GOAL = "ch.fasrv.kanagarten.DAILY_GOAL";

    private static final int ALARM_REQUEST = 4901;
    private static final int NOTIFICATION_ID = 4902;

    private DailyGoalScheduler() {}

    static void initialize(Context context) {
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        if (manager != null) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Tägliches Lernziel",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Erinnert dich an die noch fehlende Lernzeit deines persönlichen Tagesziels.");
            channel.enableVibration(true);
            manager.createNotificationChannel(channel);
        }
        schedule(context);
    }

    static void schedule(Context context) {
        Context appContext = context.getApplicationContext();
        AlarmManager alarms = appContext.getSystemService(AlarmManager.class);
        if (alarms == null) return;
        PendingIntent alarm = alarmIntent(appContext);
        alarms.cancel(alarm);

        UsageStore.GoalSettings settings = new UsageStore(appContext).goalSettings();
        if (!settings.dailyGoalEnabled || !areNotificationsAllowed(appContext)) return;

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime target = now
            .withHour(settings.reminderHour)
            .withMinute(settings.reminderMinute)
            .withSecond(0)
            .withNano(0);
        if (!target.isAfter(now)) target = target.plusDays(1);
        alarms.setAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            target.toInstant().toEpochMilli(),
            alarm
        );
    }

    static void postGoalNotification(Context context) {
        Context appContext = context.getApplicationContext();
        UsageStore store = new UsageStore(appContext);
        UsageStore.GoalSettings settings = store.goalSettings();
        int goalSeconds = settings.dailyGoalMinutes * 60;
        int remainingSeconds = Math.max(0, goalSeconds - store.todaySeconds());

        if (settings.dailyGoalEnabled && remainingSeconds > 0
            && areNotificationsAllowed(appContext)) {
            int remainingMinutes = Math.max(1, (int) Math.ceil(remainingSeconds / 60d));
            Intent openDashboard = new Intent(appContext, MainActivity.class)
                .putExtra("open_dashboard", true)
                .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            PendingIntent contentIntent = PendingIntent.getActivity(
                appContext,
                NOTIFICATION_ID,
                openDashboard,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            String amount = remainingMinutes == 1
                ? "Noch eine Minute"
                : "Noch " + remainingMinutes + " Minuten";
            Notification notification = new Notification.Builder(appContext, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_review_notification)
                .setColor(Color.rgb(29, 116, 85))
                .setContentTitle(amount + " bis zu deinem Tagesziel")
                .setContentText("Eine kurze Runde reicht – und danach darfst du natürlich weiterlernen.")
                .setStyle(new Notification.BigTextStyle().bigText(
                    amount + " fehlen heute noch. Starte eine kurze Runde; dein Tagesziel ist ein Ansporn und keine Lernbegrenzung."
                ))
                .setCategory(Notification.CATEGORY_REMINDER)
                .setAutoCancel(true)
                .setContentIntent(contentIntent)
                .build();

            NotificationManager manager = appContext.getSystemService(NotificationManager.class);
            if (manager != null) manager.notify(NOTIFICATION_ID, notification);
        }
        schedule(appContext);
    }

    static boolean areNotificationsAllowed(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
            && context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            return false;
        }
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        if (manager == null || !manager.areNotificationsEnabled()) return false;
        NotificationChannel channel = manager.getNotificationChannel(CHANNEL_ID);
        return channel == null || channel.getImportance() != NotificationManager.IMPORTANCE_NONE;
    }

    static Intent notificationSettingsIntent(Context context) {
        Intent intent = new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS);
        intent.putExtra(Settings.EXTRA_APP_PACKAGE, context.getPackageName());
        intent.putExtra(Settings.EXTRA_CHANNEL_ID, CHANNEL_ID);
        return intent;
    }

    private static PendingIntent alarmIntent(Context context) {
        Intent intent = new Intent(context, DailyGoalReceiver.class).setAction(ACTION_DAILY_GOAL);
        return PendingIntent.getBroadcast(
            context,
            ALARM_REQUEST,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
    }
}
