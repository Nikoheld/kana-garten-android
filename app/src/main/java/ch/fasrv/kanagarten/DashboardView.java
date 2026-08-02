package ch.fasrv.kanagarten;

import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.DecelerateInterpolator;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public final class DashboardView extends ScrollView {
    private final UsageStore store;
    private final LinearLayout content;
    private AppPalette palette;

    public DashboardView(Context context) {
        this(context, new UsageStore(context));
    }

    public DashboardView(Context context, UsageStore store) {
        this(context, store, AppPalette.isDark(context));
    }

    public DashboardView(Context context, UsageStore store, boolean darkMode) {
        super(context);
        this.store = store;
        palette = new AppPalette(darkMode);
        setFillViewport(true);
        setBackgroundColor(palette.paper);
        setClipToPadding(false);
        content = new LinearLayout(context);
        content.setOrientation(LinearLayout.VERTICAL);
        content.setPadding(dp(18), dp(22), dp(18), dp(32));
        addView(content, new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT));
        refresh();
    }

    public void setDarkMode(boolean darkMode) {
        if (palette.dark == darkMode) return;
        palette = new AppPalette(darkMode);
        setBackgroundColor(palette.paper);
        refresh();
    }

    public void refresh() {
        content.removeAllViews();
        UsageStore.Snapshot snapshot = store.snapshot();
        addEyebrow("DEINE LERNZEIT");
        addTitle("Aktivität, die sichtbar wird.");
        addSubtitle("Jede abgeschlossene Runde wird lokal erfasst. So siehst du nicht nur, was du gelernt hast, sondern auch wann und wie lange.");
        addStreakHero(snapshot);
        addStatCards(snapshot);
        if (snapshot.goalSettings.dailyGoalEnabled && snapshot.goalSettings.showDailyGoal) {
            addDailyGoal(snapshot);
        }
        if (snapshot.goalSettings.showJlptProgress) addJlptProgress(snapshot.jlptProgress);
        addSectionTitle("Die letzten 14 Tage", "Minuten pro Lerntag");
        ActivityChart chart = new ActivityChart(getContext(), snapshot.days);
        content.addView(chart, marginParams(LayoutParams.MATCH_PARENT, dp(210), 0, 12, 0, 24));
        chart.startAnimation();
        addModeBreakdown(snapshot.modeSeconds, snapshot.weekSeconds);
        addRecentSessions(snapshot.recentSessions);
    }

    private void addStreakHero(UsageStore.Snapshot snapshot) {
        LinearLayout hero = new LinearLayout(getContext());
        hero.setGravity(Gravity.CENTER_VERTICAL);
        hero.setPadding(dp(16), dp(12), dp(18), dp(12));
        hero.setBackground(rounded(palette.paperLight, 1, palette.ink, 22));

        ImageView mascot = new ImageView(getContext());
        mascot.setScaleType(ImageView.ScaleType.CENTER_CROP);
        int hour = java.time.LocalTime.now().getHour();
        int image = snapshot.practicedToday
            ? R.drawable.hibi_happy
            : snapshot.streak == 0 || hour < 18
                ? R.drawable.hibi_worried
                : hour < 21 ? R.drawable.hibi_angry : R.drawable.hibi_furious;
        mascot.setImageResource(image);
        hero.addView(mascot, new LinearLayout.LayoutParams(dp(122), dp(122)));

        LinearLayout copy = new LinearLayout(getContext());
        copy.setOrientation(LinearLayout.VERTICAL);
        copy.setPadding(dp(13), 0, 0, 0);
        TextView label = text("AKTUELLER STREAK", 10, palette.muted, Typeface.BOLD);
        label.setLetterSpacing(0.12f);
        copy.addView(label);
        copy.addView(text(snapshot.streak + (snapshot.streak == 1 ? " Tag" : " Tage"), 31, palette.ink, Typeface.BOLD));
        String message = snapshot.practicedToday
            ? "Heute erledigt. Hibi kann entspannen."
            : snapshot.streak > 0
                ? "Eine kurze Runde schützt deine Serie."
                : "Heute ist der perfekte erste Tag.";
        TextView description = text(message, 12, snapshot.practicedToday ? palette.green : palette.red, Typeface.BOLD);
        description.setPadding(0, dp(4), 0, 0);
        copy.addView(description);
        hero.addView(copy, new LinearLayout.LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f));
        content.addView(hero, marginParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 0, 22, 0, 18));
    }

    private void addStatCards(UsageStore.Snapshot snapshot) {
        LinearLayout row = new LinearLayout(getContext());
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.addView(statCard(formatTime(snapshot.todaySeconds), "Heute"), weighted(1f, 0));
        row.addView(statCard(formatTime(snapshot.weekSeconds), "7 Tage"), weighted(1f, 8));
        row.addView(statCard(String.valueOf(snapshot.dueReviews), "Fällige Reviews"), weighted(1f, 8));
        content.addView(row, marginParams(LayoutParams.MATCH_PARENT, dp(105), 0, 0, 0, 30));
    }

    private View statCard(String value, String label) {
        LinearLayout card = new LinearLayout(getContext());
        card.setOrientation(LinearLayout.VERTICAL);
        card.setGravity(Gravity.CENTER_VERTICAL);
        card.setPadding(dp(12), dp(10), dp(9), dp(10));
        card.setBackground(rounded(palette.paperLight, 1, palette.line, 16));
        card.addView(text(value, 23, palette.ink, Typeface.BOLD));
        TextView caption = text(label, 9, palette.muted, Typeface.BOLD);
        caption.setPadding(0, dp(5), 0, 0);
        card.addView(caption);
        return card;
    }

    private void addDailyGoal(UsageStore.Snapshot snapshot) {
        int targetSeconds = snapshot.goalSettings.dailyGoalMinutes * 60;
        float ratio = targetSeconds == 0 ? 0f : snapshot.todaySeconds / (float) targetSeconds;
        int learnedMinutes = Math.round(snapshot.todaySeconds / 60f);
        int remainingMinutes = Math.max(0, (int) Math.ceil((targetSeconds - snapshot.todaySeconds) / 60d));

        addSectionTitle("Dein Tagesziel", snapshot.goalSettings.dailyGoalMinutes + " Minuten");
        LinearLayout card = verticalCard();
        LinearLayout row = new LinearLayout(getContext());
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.addView(text(
            learnedMinutes + " / " + snapshot.goalSettings.dailyGoalMinutes + " Min",
            23,
            palette.ink,
            Typeface.BOLD
        ), new LinearLayout.LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f));
        row.addView(text(Math.min(100, Math.round(ratio * 100)) + "%", 12, palette.green, Typeface.BOLD));
        card.addView(row);
        addProgressTrack(card, ratio, palette.green);

        String detail;
        if (ratio >= 1f) {
            int extra = Math.max(0, learnedMinutes - snapshot.goalSettings.dailyGoalMinutes);
            detail = extra > 0
                ? "Ziel erreicht · " + extra + " Minuten freiwillig darüber. Weiterlernen ist jederzeit möglich."
                : "Ziel erreicht. Weiterlernen ist jederzeit möglich.";
        } else {
            detail = remainingMinutes + (remainingMinutes == 1 ? " Minute fehlt" : " Minuten fehlen")
                + " noch. Die Erinnerung kommt um "
                + String.format(java.util.Locale.GERMANY, "%02d:%02d", snapshot.goalSettings.reminderHour, snapshot.goalSettings.reminderMinute)
                + " Uhr.";
        }
        card.addView(text(detail, 11, ratio >= 1f ? palette.green : palette.muted, Typeface.BOLD));
        content.addView(card, marginParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 0, 8, 0, 24));
    }

    private void addJlptProgress(UsageStore.JlptProgress progress) {
        addSectionTitle("Nächstes JLPT-Ziel", progress.target);
        LinearLayout card = verticalCard();
        LinearLayout row = new LinearLayout(getContext());
        row.setGravity(Gravity.CENTER_VERTICAL);
        String title = progress.complete ? "App-Pfad abgeschlossen" : "Auf dem Weg zu JLPT " + progress.target;
        row.addView(text(title, 16, palette.ink, Typeface.BOLD), new LinearLayout.LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f));
        row.addView(text(progress.percent + "%", 18, palette.red, Typeface.BOLD));
        card.addView(row);
        addProgressTrack(card, progress.percent / 100f, palette.red);
        String count = progress.total > 0
            ? progress.learned + " von " + progress.total + " Inhalten sicher gelernt. "
            : "Beginne mit N5-Inhalten. ";
        card.addView(text(
            count + "Die Leiste misst deinen App-Lernstand und ist keine offizielle Prüfungsprognose.",
            10,
            palette.muted,
            Typeface.NORMAL
        ));
        content.addView(card, marginParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 0, 8, 0, 24));
    }

    private void addProgressTrack(LinearLayout card, float progress, int color) {
        float clamped = Math.max(0f, Math.min(1f, progress));
        LinearLayout track = new LinearLayout(getContext());
        track.setBackground(rounded(palette.track, 0, 0, 99));
        if (clamped > 0f) {
            View fill = new View(getContext());
            fill.setBackground(rounded(color, 0, 0, 99));
            track.addView(fill, new LinearLayout.LayoutParams(0, dp(10), clamped));
        }
        if (clamped < 1f) {
            track.addView(new View(getContext()), new LinearLayout.LayoutParams(0, dp(10), 1f - clamped));
        }
        card.addView(track, marginParams(LayoutParams.MATCH_PARENT, dp(10), 0, 12, 0, 11));
    }

    private void addModeBreakdown(Map<String, Integer> modeSeconds, int totalSeconds) {
        addSectionTitle("Diese Woche gelernt", "Zeit nach Bereich");
        LinearLayout card = verticalCard();
        for (Map.Entry<String, Integer> entry : modeSeconds.entrySet()) {
            LinearLayout labelRow = new LinearLayout(getContext());
            labelRow.setGravity(Gravity.CENTER_VERTICAL);
            TextView name = text(UsageStore.modeLabel(entry.getKey()), 12, palette.ink, Typeface.BOLD);
            TextView time = text(formatTime(entry.getValue()), 11, palette.muted, Typeface.BOLD);
            time.setGravity(Gravity.END);
            labelRow.addView(name, new LinearLayout.LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f));
            labelRow.addView(time);
            card.addView(labelRow);

            LinearLayout track = new LinearLayout(getContext());
            track.setBackground(rounded(palette.track, 0, 0, 99));
            View fill = new View(getContext());
            fill.setBackground(rounded(colorForMode(entry.getKey()), 0, 0, 99));
            float ratio = totalSeconds == 0 ? 0f : Math.max(0.03f, entry.getValue() / (float) totalSeconds);
            track.addView(fill, new LinearLayout.LayoutParams(0, dp(8), ratio));
            track.addView(new View(getContext()), new LinearLayout.LayoutParams(0, dp(8), 1f - ratio));
            card.addView(track, marginParams(LayoutParams.MATCH_PARENT, dp(8), 0, 7, 0, 14));
        }
        content.addView(card, marginParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 0, 10, 0, 28));
    }

    private void addRecentSessions(List<UsageStore.Session> sessions) {
        addSectionTitle("Letzte Einheiten", "Was du konkret gemacht hast");
        LinearLayout card = verticalCard();
        if (sessions.isEmpty()) {
            TextView empty = text("Noch keine abgeschlossene Lerneinheit. Starte im Tab „Lernen“ – danach erscheint sie hier.", 12, palette.muted, Typeface.NORMAL);
            empty.setPadding(0, dp(8), 0, dp(8));
            card.addView(empty);
        } else {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.");
            for (int i = 0; i < sessions.size(); i++) {
                UsageStore.Session session = sessions.get(i);
                LinearLayout row = new LinearLayout(getContext());
                row.setGravity(Gravity.CENTER_VERTICAL);
                TextView icon = text(modeGlyph(session.mode), 18, colorForMode(session.mode), Typeface.BOLD);
                icon.setGravity(Gravity.CENTER);
                icon.setBackground(rounded(palette.dark ? 0x22FF715C : 0x0FD94A36, 0, 0, 11));
                row.addView(icon, new LinearLayout.LayoutParams(dp(44), dp(44)));

                LinearLayout labels = new LinearLayout(getContext());
                labels.setOrientation(LinearLayout.VERTICAL);
                labels.setPadding(dp(12), 0, 0, 0);
                labels.addView(text(UsageStore.modeLabel(session.mode), 12, palette.ink, Typeface.BOLD));
                java.time.LocalDate date;
                try { date = java.time.LocalDate.parse(session.date); }
                catch (Exception ignored) { date = java.time.LocalDate.now(); }
                labels.addView(text(date.format(formatter) + " · " + session.itemCount + " Inhalte", 9, palette.muted, Typeface.NORMAL));
                row.addView(labels, new LinearLayout.LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f));
                row.addView(text(formatTime(session.durationSeconds), 11, palette.ink, Typeface.BOLD));
                card.addView(row, marginParams(LayoutParams.MATCH_PARENT, dp(58), 0, i == 0 ? 0 : 5, 0, 0));
            }
        }
        content.addView(card, marginParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 0, 10, 0, 20));
    }

    private void addEyebrow(String value) {
        TextView view = text(value, 10, palette.red, Typeface.BOLD);
        view.setLetterSpacing(0.14f);
        content.addView(view);
    }

    private void addTitle(String value) {
        TextView view = text(value, 34, palette.ink, Typeface.BOLD);
        view.setLineSpacing(0, 0.93f);
        content.addView(view, marginParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 0, 7, 0, 0));
    }

    private void addSubtitle(String value) {
        TextView view = text(value, 13, palette.muted, Typeface.NORMAL);
        view.setLineSpacing(0, 1.35f);
        content.addView(view, marginParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 0, 12, 0, 0));
    }

    private void addSectionTitle(String title, String subtitle) {
        LinearLayout row = new LinearLayout(getContext());
        row.setGravity(Gravity.BOTTOM);
        TextView heading = text(title, 19, palette.ink, Typeface.BOLD);
        TextView detail = text(subtitle, 9, palette.muted, Typeface.BOLD);
        detail.setGravity(Gravity.END);
        row.addView(heading, new LinearLayout.LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f));
        row.addView(detail);
        content.addView(row, marginParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 0, 6, 0, 0));
    }

    private LinearLayout verticalCard() {
        LinearLayout card = new LinearLayout(getContext());
        card.setOrientation(LinearLayout.VERTICAL);
        card.setPadding(dp(16), dp(16), dp(16), dp(10));
        card.setBackground(rounded(palette.paperLight, 1, palette.line, 17));
        return card;
    }

    private TextView text(String value, int sp, int color, int style) {
        TextView view = new TextView(getContext());
        view.setText(value);
        view.setTextSize(sp);
        view.setTextColor(color);
        view.setTypeface(Typeface.create("sans", style));
        return view;
    }

    private GradientDrawable rounded(int color, int strokeWidth, int strokeColor, int radius) {
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(color);
        drawable.setCornerRadius(dp(radius));
        if (strokeWidth > 0) drawable.setStroke(dp(strokeWidth), strokeColor);
        return drawable;
    }

    private LinearLayout.LayoutParams weighted(float weight, int leftMargin) {
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(0, LayoutParams.MATCH_PARENT, weight);
        params.leftMargin = dp(leftMargin);
        return params;
    }

    private LinearLayout.LayoutParams marginParams(int width, int height, int left, int top, int right, int bottom) {
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(width, height);
        params.setMargins(dp(left), dp(top), dp(right), dp(bottom));
        return params;
    }

    private int dp(float value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private String formatTime(int seconds) {
        if (seconds < 60) return seconds + "s";
        int minutes = Math.round(seconds / 60f);
        if (minutes < 60) return minutes + "m";
        return (minutes / 60) + "h " + (minutes % 60) + "m";
    }

    private int colorForMode(String mode) {
        if (palette.dark) {
            switch (mode) {
                case "words": return 0xFFF3C75F;
                case "kanji": return palette.red;
                case "kanji-words": return 0xFFFF8A72;
                case "conversation": return palette.green;
                case "grammar": return 0xFFB9A2FF;
                default: return 0xFF73BDD4;
            }
        }
        switch (mode) {
            case "words": return 0xFFF0B943;
            case "kanji": return 0xFFD94A36;
            case "kanji-words": return 0xFFB64231;
            case "conversation": return 0xFF1D7455;
            case "grammar": return 0xFF7357B5;
            default: return 0xFF43849A;
        }
    }

    private String modeGlyph(String mode) {
        switch (mode) {
            case "words": return "語";
            case "kanji": return "漢";
            case "kanji-words": return "熟";
            case "conversation": return "話";
            case "grammar": return "文";
            default: return "あ";
        }
    }

    private final class ActivityChart extends View {
        private final List<UsageStore.DayStat> days;
        private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        private float progress = 0f;

        ActivityChart(Context context, List<UsageStore.DayStat> source) {
            super(context);
            days = new ArrayList<>(source);
            setBackground(roundedStatic(context, palette.paperLight, palette.line, 18));
            setContentDescription("Balkendiagramm der Lernminuten der letzten vierzehn Tage");
        }

        void startAnimation() {
            ValueAnimator animator = ValueAnimator.ofFloat(0f, 1f);
            animator.setDuration(700);
            animator.setInterpolator(new DecelerateInterpolator());
            animator.addUpdateListener(value -> {
                progress = (float) value.getAnimatedValue();
                invalidate();
            });
            animator.start();
        }

        @Override
        protected void onDraw(Canvas canvas) {
            super.onDraw(canvas);
            int width = getWidth();
            int height = getHeight();
            float left = dpStatic(getContext(), 15);
            float right = width - dpStatic(getContext(), 15);
            float top = dpStatic(getContext(), 20);
            float baseline = height - dpStatic(getContext(), 34);
            int max = 60;
            for (UsageStore.DayStat day : days) max = Math.max(max, day.seconds);
            float slot = (right - left) / Math.max(1, days.size());
            float barWidth = Math.max(dpStatic(getContext(), 7), slot * 0.56f);

            paint.setColor(palette.chartGrid);
            paint.setStrokeWidth(dpStatic(getContext(), 1));
            for (int i = 0; i < 3; i++) {
                float y = top + (baseline - top) * i / 2f;
                canvas.drawLine(left, y, right, y, paint);
            }

            paint.setTextAlign(Paint.Align.CENTER);
            paint.setTypeface(Typeface.create("sans", Typeface.BOLD));
            for (int i = 0; i < days.size(); i++) {
                UsageStore.DayStat day = days.get(i);
                float x = left + slot * i + slot / 2f;
                float barHeight = (baseline - top) * (day.seconds / (float) max) * progress;
                paint.setColor(day.seconds > 0 ? palette.green : palette.emptyBar);
                canvas.drawRoundRect(
                    x - barWidth / 2f,
                    baseline - Math.max(dpStatic(getContext(), 4), barHeight),
                    x + barWidth / 2f,
                    baseline,
                    dpStatic(getContext(), 5),
                    dpStatic(getContext(), 5),
                    paint
                );
                if (i % 2 == 0 || i == days.size() - 1) {
                    paint.setColor(palette.muted);
                    paint.setTextSize(dpStatic(getContext(), 8));
                    canvas.drawText(day.date.format(DateTimeFormatter.ofPattern("dd.")), x, height - dpStatic(getContext(), 14), paint);
                }
            }
        }

        private static GradientDrawable roundedStatic(Context context, int color, int stroke, int radius) {
            GradientDrawable drawable = new GradientDrawable();
            drawable.setColor(color);
            drawable.setCornerRadius(dpStatic(context, radius));
            drawable.setStroke(dpStatic(context, 1), stroke);
            return drawable;
        }

        private static int dpStatic(Context context, float value) {
            return Math.round(value * context.getResources().getDisplayMetrics().density);
        }
    }
}
