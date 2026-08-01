package ch.fasrv.kanagarten;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import java.time.LocalTime;

public final class StreakWidgetProvider extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        for (int id : appWidgetIds) manager.updateAppWidget(id, buildViews(context));
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
        for (int id : ids) manager.updateAppWidget(id, buildViews(context));
    }

    private static RemoteViews buildViews(Context context) {
        UsageStore store = new UsageStore(context);
        int streak = store.getStreak();
        boolean practicedToday = store.hasPracticedToday();
        int hour = LocalTime.now().getHour();

        int mascot;
        String message;
        if (practicedToday) {
            mascot = R.drawable.hibi_happy;
            message = "Geschafft! Hibi ist stolz auf dich.";
        } else if (streak == 0) {
            mascot = R.drawable.hibi_worried;
            message = "Starte heute deine neue Serie!";
        } else if (hour < 18) {
            mascot = R.drawable.hibi_worried;
            message = "Heute fehlt noch eine kurze Runde.";
        } else if (hour < 21) {
            mascot = R.drawable.hibi_angry;
            message = "Hibi wird wütend – Streak retten!";
        } else {
            mascot = R.drawable.hibi_furious;
            message = "Jetzt lernen! Dein Streak brennt!";
        }

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_streak);
        AppPalette palette = new AppPalette(AppPalette.isDark(context));
        views.setInt(
            R.id.widget_root,
            "setBackgroundResource",
            palette.dark ? R.drawable.widget_background_dark : R.drawable.widget_background
        );
        views.setTextColor(R.id.widget_label, palette.muted);
        views.setTextColor(R.id.widget_streak, palette.ink);
        views.setTextColor(R.id.widget_message, palette.red);
        views.setImageViewResource(R.id.widget_mascot, mascot);
        views.setTextViewText(R.id.widget_streak, streak + (streak == 1 ? " Tag" : " Tage"));
        views.setTextViewText(R.id.widget_message, message);

        Intent openApp = new Intent(context, MainActivity.class);
        openApp.putExtra("open_dashboard", false);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context,
            301,
            openApp,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_root, pendingIntent);
        return views;
    }
}
