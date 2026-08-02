package ch.fasrv.kanagarten;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.SizeF;
import android.widget.RemoteViews;

import java.time.LocalTime;
import java.util.LinkedHashMap;
import java.util.Map;

public final class StreakWidgetProvider extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        for (int id : appWidgetIds) {
            manager.updateAppWidget(id, buildResponsiveViews(context, manager, id));
        }
    }

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager manager,
                                          int appWidgetId, Bundle newOptions) {
        super.onAppWidgetOptionsChanged(context, manager, appWidgetId, newOptions);
        manager.updateAppWidget(appWidgetId, buildResponsiveViews(context, manager, appWidgetId));
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (Intent.ACTION_DATE_CHANGED.equals(intent.getAction())
            || Intent.ACTION_TIME_CHANGED.equals(intent.getAction())
            || Intent.ACTION_TIMEZONE_CHANGED.equals(intent.getAction())) {
            updateAll(context);
        }
    }

    public static void updateAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName provider = new ComponentName(context, StreakWidgetProvider.class);
        int[] ids = manager.getAppWidgetIds(provider);
        for (int id : ids) {
            manager.updateAppWidget(id, buildResponsiveViews(context, manager, id));
        }
    }

    private static RemoteViews buildResponsiveViews(Context context, AppWidgetManager manager,
                                                     int appWidgetId) {
        WidgetData data = readWidgetData(context);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            Map<SizeF, RemoteViews> sizes = new LinkedHashMap<>();
            sizes.put(new SizeF(110f, 40f), buildViews(context, appWidgetId, WidgetLayoutSelector.SizeClass.TINY, data));
            sizes.put(new SizeF(110f, 110f), buildViews(context, appWidgetId, WidgetLayoutSelector.SizeClass.SQUARE, data));
            sizes.put(new SizeF(250f, 110f), buildViews(context, appWidgetId, WidgetLayoutSelector.SizeClass.WIDE, data));
            sizes.put(new SizeF(250f, 180f), buildViews(context, appWidgetId, WidgetLayoutSelector.SizeClass.LARGE, data));
            return new RemoteViews(sizes);
        }

        Bundle options = manager.getAppWidgetOptions(appWidgetId);
        int width = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 250);
        int height = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 110);
        return buildViews(context, appWidgetId, WidgetLayoutSelector.select(width, height), data);
    }

    private static WidgetData readWidgetData(Context context) {
        UsageStore store = new UsageStore(context);
        UsageStore.Snapshot snapshot = store.snapshot();
        int hour = LocalTime.now().getHour();

        Mood mood;
        String message;
        String shortMessage;
        if (snapshot.practicedToday) {
            mood = Mood.HAPPY;
            message = "Stark! Heute ist dein Streak sicher.";
            shortMessage = "Heute geschafft!";
        } else if (snapshot.streak == 0) {
            mood = Mood.WORRIED;
            message = "Beginne heute deine neue Serie.";
            shortMessage = "Heute starten";
        } else if (hour < 18) {
            mood = Mood.WORRIED;
            message = "Hibi wartet auf deine Lernrunde.";
            shortMessage = "Heute lernen";
        } else if (hour < 21) {
            mood = Mood.ANGRY;
            message = "Nicht vergessen – rette deinen Streak.";
            shortMessage = "Streak retten";
        } else {
            mood = Mood.FURIOUS;
            message = "Jetzt lernen – Mitternacht kommt näher!";
            shortMessage = "Jetzt lernen!";
        }

        int todayMinutes = snapshot.todaySeconds == 0
            ? 0
            : Math.max(1, (int) Math.ceil(snapshot.todaySeconds / 60d));
        int goalProgress;
        String goalLabel;
        if (snapshot.goalSettings.dailyGoalEnabled) {
            int goalMinutes = snapshot.goalSettings.dailyGoalMinutes;
            goalProgress = Math.min(100, Math.round(todayMinutes * 100f / goalMinutes));
            goalLabel = formatMinutes(todayMinutes) + " / " + formatMinutes(goalMinutes) + " heute";
        } else {
            goalProgress = snapshot.practicedToday ? 100 : 0;
            goalLabel = snapshot.practicedToday ? "Heute gelernt" : "Heute noch offen";
        }

        return new WidgetData(
            snapshot.streak,
            snapshot.practicedToday,
            snapshot.dueReviews,
            goalProgress,
            goalLabel,
            mood,
            message,
            shortMessage
        );
    }

    private static RemoteViews buildViews(Context context, int appWidgetId,
                                          WidgetLayoutSelector.SizeClass sizeClass,
                                          WidgetData data) {
        int layout;
        switch (sizeClass) {
            case TINY: layout = R.layout.widget_streak_tiny; break;
            case SQUARE: layout = R.layout.widget_streak_square; break;
            case LARGE: layout = R.layout.widget_streak_large; break;
            default: layout = R.layout.widget_streak;
        }

        RemoteViews views = new RemoteViews(context.getPackageName(), layout);
        AppPalette palette = new AppPalette(AppPalette.isDark(context));
        views.setInt(
            R.id.widget_root,
            "setBackgroundResource",
            backgroundFor(data.mood, palette.dark)
        );
        views.setTextColor(
            R.id.widget_label,
            sizeClass == WidgetLayoutSelector.SizeClass.SQUARE ? 0xFFFFFFFF : palette.muted
        );
        views.setTextColor(
            R.id.widget_streak,
            sizeClass == WidgetLayoutSelector.SizeClass.SQUARE ? 0xFFFFFFFF : palette.ink
        );
        views.setTextColor(R.id.widget_message, data.practicedToday ? palette.green : palette.red);
        views.setImageViewResource(R.id.widget_mascot, mascotFor(data.mood));
        views.setContentDescription(R.id.widget_mascot, "Hibi: " + data.shortMessage);
        views.setTextViewText(R.id.widget_streak, streakText(data.streak, sizeClass));
        views.setTextViewText(
            R.id.widget_label,
            sizeClass == WidgetLayoutSelector.SizeClass.TINY
                ? (data.streak == 1 ? "TAG" : "TAGE")
                : "DEIN STREAK"
        );
        views.setTextViewText(
            R.id.widget_message,
            sizeClass == WidgetLayoutSelector.SizeClass.WIDE
                || sizeClass == WidgetLayoutSelector.SizeClass.LARGE
                ? data.message
                : data.shortMessage
        );

        if (sizeClass == WidgetLayoutSelector.SizeClass.WIDE
            || sizeClass == WidgetLayoutSelector.SizeClass.LARGE) {
            views.setTextColor(R.id.widget_goal_label, palette.muted);
            views.setTextColor(R.id.widget_review, palette.muted);
            views.setTextViewText(R.id.widget_goal_label, data.goalLabel);
            views.setProgressBar(R.id.widget_goal_progress, 100, data.goalProgress, false);
            views.setTextViewText(
                R.id.widget_review,
                data.dueReviews == 0
                    ? "Alles wiederholt"
                    : data.dueReviews + (data.dueReviews == 1
                        ? " Wiederholung fällig"
                        : " Wiederholungen fällig")
            );
            views.setTextViewText(R.id.widget_action, data.practicedToday ? "WEITERLERNEN" : "JETZT LERNEN");
        }

        Intent openApp = new Intent(context, MainActivity.class);
        openApp.putExtra("open_dashboard", false);
        openApp.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context,
            301 + appWidgetId,
            openApp,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_root, pendingIntent);
        return views;
    }

    private static String streakText(int streak, WidgetLayoutSelector.SizeClass sizeClass) {
        if (sizeClass == WidgetLayoutSelector.SizeClass.TINY) return "🔥 " + streak;
        if (sizeClass == WidgetLayoutSelector.SizeClass.SQUARE) return "🔥 " + streak;
        return streak + (streak == 1 ? " Tag" : " Tage");
    }

    private static String formatMinutes(int minutes) {
        if (minutes < 60) return minutes + " Min.";
        int hours = minutes / 60;
        int rest = minutes % 60;
        return rest == 0 ? hours + " Std." : hours + " Std. " + rest + " Min.";
    }

    private static int mascotFor(Mood mood) {
        switch (mood) {
            case HAPPY: return R.drawable.hibi_happy_widget;
            case ANGRY: return R.drawable.hibi_angry_widget;
            case FURIOUS: return R.drawable.hibi_furious_widget;
            default: return R.drawable.hibi_worried_widget;
        }
    }

    private static int backgroundFor(Mood mood, boolean dark) {
        switch (mood) {
            case HAPPY:
                return dark ? R.drawable.widget_background_happy_dark : R.drawable.widget_background_happy;
            case ANGRY:
                return dark ? R.drawable.widget_background_angry_dark : R.drawable.widget_background_angry;
            case FURIOUS:
                return dark ? R.drawable.widget_background_furious_dark : R.drawable.widget_background_furious;
            default:
                return dark ? R.drawable.widget_background_worried_dark : R.drawable.widget_background_worried;
        }
    }

    private enum Mood { HAPPY, WORRIED, ANGRY, FURIOUS }

    private static final class WidgetData {
        final int streak;
        final boolean practicedToday;
        final int dueReviews;
        final int goalProgress;
        final String goalLabel;
        final Mood mood;
        final String message;
        final String shortMessage;

        WidgetData(int streak, boolean practicedToday, int dueReviews, int goalProgress,
                   String goalLabel, Mood mood, String message, String shortMessage) {
            this.streak = streak;
            this.practicedToday = practicedToday;
            this.dueReviews = dueReviews;
            this.goalProgress = goalProgress;
            this.goalLabel = goalLabel;
            this.mood = mood;
            this.message = message;
            this.shortMessage = shortMessage;
        }
    }
}
