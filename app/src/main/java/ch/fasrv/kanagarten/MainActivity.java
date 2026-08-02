package ch.fasrv.kanagarten;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.app.TimePickerDialog;
import android.appwidget.AppWidgetManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.Build;
import android.provider.Settings;
import android.speech.tts.TextToSpeech;
import android.speech.tts.Voice;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.StyleSpan;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.SeekBar;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public final class MainActivity extends Activity {
    private static final int REQUEST_AUDIO = 801;
    private static final int REQUEST_NOTIFICATIONS = 802;
    private static final String REMINDER_UI_PREFS = "kana_garten_reminder_ui";
    private static final String REMINDER_PROMPTED = "permission_prompted";
    private static final int NAVIGATION_HEIGHT_DP = 78;

    private final List<TextView> navigationButtons = new ArrayList<>();
    private AppPalette palette;
    private LinearLayout rootView;
    private FrameLayout contentFrame;
    private View bottomNavigation;
    private WebView webView;
    private DashboardView dashboardView;
    private View settingsView;
    private View currentView;
    private UsageStore usageStore;
    private TextToSpeech textToSpeech;
    private boolean japaneseSpeechReady;
    private PermissionRequest pendingAudioPermission;
    private boolean learningActive;
    private int selectedTab;

    private final BroadcastReceiver downloadReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            long completedId = intent.getLongExtra(android.app.DownloadManager.EXTRA_DOWNLOAD_ID, -1L);
            if (completedId == UpdateManager.getPendingDownloadId(MainActivity.this)) {
                UpdateManager.tryInstallPending(MainActivity.this, true);
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        palette = new AppPalette(AppPalette.isDark(this));
        Window window = getWindow();
        configureSystemBars(window);
        UpdateManager.initialize(this);
        ReviewReminderScheduler.initialize(this);
        DailyGoalScheduler.initialize(this);

        usageStore = new UsageStore(this);
        initializeTextToSpeech();
        buildInterface();
        selectTab(getIntent().getBooleanExtra("open_dashboard", false) ? 1 : 0, false);
        UpdateManager.checkForUpdates(this, false);
    }

    private void buildInterface() {
        rootView = new LinearLayout(this);
        rootView.setOrientation(LinearLayout.VERTICAL);
        rootView.setBackgroundColor(palette.paper);
        installSystemBarInsets(rootView);

        contentFrame = new FrameLayout(this);
        rootView.addView(contentFrame, new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            0,
            1f
        ));

        webView = buildWebView();
        dashboardView = new DashboardView(this, usageStore, palette.dark);
        settingsView = buildSettingsView();
        contentFrame.addView(webView, matchParent());
        contentFrame.addView(dashboardView, matchParent());
        contentFrame.addView(settingsView, matchParent());

        bottomNavigation = buildBottomNavigation();
        rootView.addView(bottomNavigation, new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            dp(NAVIGATION_HEIGHT_DP)
        ));
        setContentView(rootView);
        rootView.requestApplyInsets();
    }

    @SuppressWarnings("deprecation")
    private void configureSystemBars(Window window) {
        window.setBackgroundDrawable(new ColorDrawable(palette.paper));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false);
            window.setStatusBarColor(Color.TRANSPARENT);
            window.setNavigationBarColor(Color.TRANSPARENT);
            window.setNavigationBarContrastEnforced(false);
            android.view.WindowInsetsController controller =
                window.getDecorView().getWindowInsetsController();
            if (controller != null) {
                int mask = android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                    | android.view.WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
                controller.setSystemBarsAppearance(
                    palette.dark ? 0 : mask,
                    mask
                );
            }
        } else {
            window.setStatusBarColor(palette.paper);
            window.setNavigationBarColor(palette.paperLight);
            int flags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
                | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            window.getDecorView().setSystemUiVisibility(palette.dark ? 0 : flags);
        }
    }

    private void installSystemBarInsets(View root) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.R) return;
        root.setOnApplyWindowInsetsListener((view, windowInsets) -> {
            android.graphics.Insets safeArea = windowInsets.getInsets(
                WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout()
            );
            android.graphics.Insets keyboard = windowInsets.getInsets(WindowInsets.Type.ime());
            view.setPadding(
                safeArea.left,
                safeArea.top,
                safeArea.right,
                Math.max(safeArea.bottom, keyboard.bottom)
            );
            return windowInsets;
        });
    }

    @SuppressLint("SetJavaScriptEnabled")
    private WebView buildWebView() {
        if (BuildConfig.DEBUG) WebView.setWebContentsDebuggingEnabled(true);
        WebView view = new WebView(this);
        view.setBackgroundColor(palette.paper);
        view.setOverScrollMode(View.OVER_SCROLL_NEVER);
        WebSettings settings = view.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setTextZoom(100);
        view.addJavascriptInterface(new AndroidBridge(), "Android");
        view.setWebViewClient(new LocalContentWebViewClient(this));
        view.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                runOnUiThread(() -> handleWebPermission(request));
            }
        });
        view.loadUrl(LocalContentWebViewClient.APP_ORIGIN + "/index.html");
        return view;
    }

    private void handleWebPermission(PermissionRequest request) {
        if (!LocalContentWebViewClient.APP_ORIGIN.equals(request.getOrigin().toString().replaceAll("/$", ""))) {
            request.deny();
            return;
        }
        boolean audioRequested = false;
        for (String resource : request.getResources()) {
            if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(resource)) audioRequested = true;
        }
        if (!audioRequested) {
            request.deny();
            return;
        }
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) {
            request.grant(new String[]{PermissionRequest.RESOURCE_AUDIO_CAPTURE});
        } else {
            pendingAudioPermission = request;
            requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, REQUEST_AUDIO);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_NOTIFICATIONS) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                ReviewReminderScheduler.scheduleFromProgress(this, usageStore.restoreProgress());
                DailyGoalScheduler.schedule(this);
                Toast.makeText(this, "Lern-Erinnerungen sind aktiv.", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Du kannst Erinnerungen später unter Einstellungen aktivieren.", Toast.LENGTH_LONG).show();
            }
            return;
        }
        if (requestCode != REQUEST_AUDIO || pendingAudioPermission == null) return;
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            pendingAudioPermission.grant(new String[]{PermissionRequest.RESOURCE_AUDIO_CAPTURE});
        } else {
            pendingAudioPermission.deny();
            Toast.makeText(this, "Aufnahme deaktiviert – alle anderen Übungen bleiben verfügbar.", Toast.LENGTH_LONG).show();
        }
        pendingAudioPermission = null;
    }

    private View buildBottomNavigation() {
        FrameLayout area = new FrameLayout(this);
        area.setPadding(dp(10), dp(4), dp(10), dp(8));
        area.setBackgroundColor(palette.paper);

        LinearLayout dock = new LinearLayout(this);
        dock.setGravity(Gravity.CENTER);
        dock.setPadding(dp(4), dp(4), dp(4), dp(4));
        GradientDrawable dockBackground = rounded(palette.paperLight, 20);
        dockBackground.setStroke(dp(1), palette.line);
        dock.setBackground(dockBackground);
        dock.setElevation(dp(12));
        dock.addView(navigationButton("あ", "Lernen", 0), weighted());
        dock.addView(navigationButton("▥", "Fortschritt", 1), weighted());
        dock.addView(navigationButton("⚙", "Einstellungen", 2), weighted());
        area.addView(dock, new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        ));
        return area;
    }

    private TextView navigationButton(String icon, String label, int index) {
        TextView button = new TextView(this);
        SpannableString content = new SpannableString(icon + "\n" + label);
        content.setSpan(
            new AbsoluteSizeSpan(20, true),
            0,
            icon.length(),
            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE
        );
        content.setSpan(
            new StyleSpan(Typeface.BOLD),
            0,
            icon.length(),
            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE
        );
        button.setText(content);
        button.setTextSize(10);
        button.setTypeface(Typeface.create("sans", Typeface.BOLD));
        button.setGravity(Gravity.CENTER);
        button.setLineSpacing(dp(1), 0.94f);
        button.setLetterSpacing(0.01f);
        button.setPadding(dp(4), dp(3), dp(4), dp(2));
        button.setContentDescription(label);
        button.setOnClickListener(view -> {
            view.animate().scaleX(0.96f).scaleY(0.96f).setDuration(70).withEndAction(() ->
                view.animate().scaleX(1f).scaleY(1f).setDuration(140).start()
            ).start();
            selectTab(index, true);
        });
        navigationButtons.add(button);
        return button;
    }

    private void selectTab(int index, boolean animate) {
        selectedTab = index;
        View next = index == 0 ? webView : index == 1 ? dashboardView : settingsView;
        if (index == 1) dashboardView.refresh();
        updateNavigationAppearance();
        if (currentView == next) return;
        if (!animate || currentView == null) {
            webView.setVisibility(next == webView ? View.VISIBLE : View.GONE);
            dashboardView.setVisibility(next == dashboardView ? View.VISIBLE : View.GONE);
            settingsView.setVisibility(next == settingsView ? View.VISIBLE : View.GONE);
            currentView = next;
            return;
        }
        View previous = currentView;
        next.setAlpha(0f);
        next.setTranslationY(dp(14));
        next.setVisibility(View.VISIBLE);
        previous.animate().alpha(0f).translationY(-dp(8)).setDuration(150).withEndAction(() -> {
            previous.setVisibility(View.GONE);
            previous.setAlpha(1f);
            previous.setTranslationY(0f);
        }).start();
        next.animate().alpha(1f).translationY(0f).setDuration(240).start();
        currentView = next;
    }

    private void updateNavigationAppearance() {
        for (int i = 0; i < navigationButtons.size(); i++) {
            TextView button = navigationButtons.get(i);
            boolean selected = i == selectedTab;
            button.setTextColor(selected
                ? (palette.dark ? palette.paper : Color.WHITE)
                : palette.muted);
            button.setBackground(selected
                ? rounded(palette.ink, 15)
                : rounded(Color.TRANSPARENT, 15));
            button.setAlpha(selected ? 1f : 0.86f);
            button.setSelected(selected);
        }
    }

    private void setLearningActive(boolean active) {
        if (bottomNavigation == null || learningActive == active) return;
        learningActive = active;
        bottomNavigation.animate().cancel();
        if (active) {
            bottomNavigation.animate()
                .alpha(0f)
                .translationY(dp(18))
                .setDuration(150)
                .withEndAction(() -> {
                    if (learningActive) bottomNavigation.setVisibility(View.GONE);
                })
                .start();
        } else {
            bottomNavigation.setVisibility(View.VISIBLE);
            bottomNavigation.setAlpha(0f);
            bottomNavigation.setTranslationY(dp(18));
            bottomNavigation.animate()
                .alpha(1f)
                .translationY(0f)
                .setDuration(210)
                .start();
        }
    }

    private void applyDarkMode(boolean darkMode, boolean persist) {
        if (persist) AppPalette.save(this, darkMode);
        if (palette.dark == darkMode) return;
        palette = new AppPalette(darkMode);
        configureSystemBars(getWindow());

        rootView.setBackgroundColor(palette.paper);
        webView.setBackgroundColor(palette.paper);
        dashboardView.setDarkMode(darkMode);

        boolean settingsVisible = selectedTab == 2;
        contentFrame.removeView(settingsView);
        settingsView = buildSettingsView();
        settingsView.setVisibility(settingsVisible ? View.VISIBLE : View.GONE);
        contentFrame.addView(settingsView, matchParent());
        if (settingsVisible) currentView = settingsView;

        rootView.removeView(bottomNavigation);
        navigationButtons.clear();
        bottomNavigation = buildBottomNavigation();
        if (learningActive) bottomNavigation.setVisibility(View.GONE);
        rootView.addView(bottomNavigation, new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            dp(NAVIGATION_HEIGHT_DP)
        ));
        updateNavigationAppearance();
        StreakWidgetProvider.updateAll(this);
    }

    private View buildSettingsView() {
        ScrollView scroll = new ScrollView(this);
        scroll.setFillViewport(true);
        scroll.setBackgroundColor(palette.paper);
        LinearLayout content = new LinearLayout(this);
        content.setOrientation(LinearLayout.VERTICAL);
        content.setPadding(dp(18), dp(22), dp(18), dp(32));
        scroll.addView(content);

        TextView eyebrow = label("APP & OFFLINE", 10, palette.red, Typeface.BOLD);
        eyebrow.setLetterSpacing(0.14f);
        content.addView(eyebrow);
        content.addView(label("Mehr Kontrolle.", 34, palette.ink, Typeface.BOLD), margins(0, 8, 0, 8));
        TextView intro = label("Tagesziel, JLPT-Fortschritt, Erinnerungen, Darstellung und Offline-App an einem Ort.", 13, palette.muted, Typeface.NORMAL);
        intro.setLineSpacing(0, 1.3f);
        content.addView(intro, margins(0, 0, 0, 24));

        LinearLayout offline = settingCard();
        offline.addView(label("✓  Vollständig offline", 17, palette.green, Typeface.BOLD));
        offline.addView(label("Alle Kana, Wörter, Kanji, Grammatik, Gespräche, Eselsbrücken, Statistiken und Noto Sans JP sind im APK gespeichert. Nur die optionale Update-Prüfung benötigt Internet.", 12, palette.muted, Typeface.NORMAL), margins(0, 8, 0, 0));
        content.addView(offline, margins(0, 0, 0, 12));

        UsageStore.GoalSettings goalSettings = usageStore.goalSettings();
        LinearLayout dailyGoal = settingCard();
        LinearLayout dailyHeader = new LinearLayout(this);
        dailyHeader.setGravity(Gravity.CENTER_VERTICAL);
        dailyHeader.addView(label("Tägliche Lernzeit", 17, palette.ink, Typeface.BOLD), new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        Switch dailyGoalSwitch = settingsSwitch(goalSettings.dailyGoalEnabled, "Tagesziel aktivieren");
        dailyHeader.addView(dailyGoalSwitch);
        dailyGoal.addView(dailyHeader);
        dailyGoal.addView(label(
            "Lege ein motivierendes Tagesziel fest. Es begrenzt dich nicht: Jede zusätzliche Lernminute wird weiterhin vollständig gezählt.",
            12,
            palette.muted,
            Typeface.NORMAL
        ), margins(0, 7, 0, 12));

        TextView goalMinutesLabel = label(
            formatGoalMinutes(goalSettings.dailyGoalMinutes),
            13,
            palette.ink,
            Typeface.BOLD
        );
        dailyGoal.addView(goalMinutesLabel);
        SeekBar goalMinutes = new SeekBar(this);
        goalMinutes.setMax(DailyGoalScale.MAX_PROGRESS);
        goalMinutes.setProgress(DailyGoalScale.progressForMinutes(goalSettings.dailyGoalMinutes));
        goalMinutes.setContentDescription("Tägliche Lernzeit zwischen fünf Minuten und vierundzwanzig Stunden");
        dailyGoal.addView(goalMinutes, margins(0, 4, 0, 8));
        dailyGoal.addView(label(
            "5 Min · fein bis 3 Std · danach bis maximal 24 Std",
            10,
            palette.muted,
            Typeface.NORMAL
        ), margins(0, 0, 0, 10));

        Switch showDailyGoal = settingsSwitch(goalSettings.showDailyGoal, "Auf dem Hauptdashboard anzeigen");
        dailyGoal.addView(showDailyGoal, margins(0, 0, 0, 9));
        Button reminderTime = actionButton(
            formatReminderTime(goalSettings.reminderHour, goalSettings.reminderMinute),
            palette.ink
        );
        dailyGoal.addView(reminderTime);
        content.addView(dailyGoal, margins(0, 0, 0, 12));

        dailyGoalSwitch.setOnCheckedChangeListener((button, checked) -> {
            usageStore.setDailyGoalEnabled(checked);
            refreshGoalSurfaces();
            if (checked) requestNotificationPermissionIfNeeded();
        });
        goalMinutes.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                goalMinutesLabel.setText(formatGoalMinutes(DailyGoalScale.minutesForProgress(progress)));
            }
            @Override public void onStartTrackingTouch(SeekBar seekBar) {}
            @Override public void onStopTrackingTouch(SeekBar seekBar) {
                usageStore.setDailyGoalMinutes(DailyGoalScale.minutesForProgress(seekBar.getProgress()));
                refreshGoalSurfaces();
            }
        });
        showDailyGoal.setOnCheckedChangeListener((button, checked) -> {
            usageStore.setShowDailyGoal(checked);
            refreshGoalSurfaces();
        });
        reminderTime.setOnClickListener(view -> {
            UsageStore.GoalSettings current = usageStore.goalSettings();
            TimePickerDialog picker = new TimePickerDialog(
                this,
                palette.dark ? AlertDialog.THEME_DEVICE_DEFAULT_DARK : AlertDialog.THEME_DEVICE_DEFAULT_LIGHT,
                (timePicker, hour, minute) -> {
                    usageStore.setDailyGoalReminderTime(hour, minute);
                    reminderTime.setText(formatReminderTime(hour, minute));
                    refreshGoalSurfaces();
                },
                current.reminderHour,
                current.reminderMinute,
                true
            );
            picker.setTitle("Wann soll Kana Garten dich erinnern?");
            picker.show();
        });

        LinearLayout jlpt = settingCard();
        LinearLayout jlptHeader = new LinearLayout(this);
        jlptHeader.setGravity(Gravity.CENTER_VERTICAL);
        jlptHeader.addView(label("JLPT-Fortschrittsleiste", 17, palette.ink, Typeface.BOLD), new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        Switch jlptSwitch = settingsSwitch(goalSettings.showJlptProgress, "JLPT-Leiste anzeigen");
        jlptHeader.addView(jlptSwitch);
        jlpt.addView(jlptHeader);
        jlpt.addView(label(
            "Zeigt den Weg zum nächsten Level von N5 bis N1 anhand deiner sicher gelernten Wörter, Kanji-Wörter, Kanji, Grammatik und Gespräche. Das ist eine App-Messung, keine offizielle Prüfungsprognose.",
            12,
            palette.muted,
            Typeface.NORMAL
        ), margins(0, 8, 0, 0));
        jlptSwitch.setOnCheckedChangeListener((button, checked) -> {
            usageStore.setShowJlptProgress(checked);
            refreshGoalSurfaces();
        });
        content.addView(jlpt, margins(0, 0, 0, 12));

        LinearLayout reminders = settingCard();
        boolean notificationsAllowed = ReviewReminderScheduler.areNotificationsAllowed(this);
        reminders.addView(label(
            notificationsAllowed ? "✓  Lern-Erinnerungen aktiv" : "Lern-Erinnerungen",
            17,
            notificationsAllowed ? palette.green : palette.ink,
            Typeface.BOLD
        ));
        reminders.addView(label(
            "Die App meldet sich bei fälligen Wiederholungen und – falls aktiviert – bei noch fehlender täglicher Lernzeit.",
            12,
            palette.muted,
            Typeface.NORMAL
        ), margins(0, 8, 0, 13));
        Button reminderButton = actionButton(
            notificationsAllowed ? "Benachrichtigungen verwalten" : "Erinnerungen aktivieren",
            notificationsAllowed ? palette.ink : palette.red
        );
        reminderButton.setOnClickListener(view -> enableOrOpenReviewNotifications());
        reminders.addView(reminderButton);
        content.addView(reminders, margins(0, 0, 0, 12));

        LinearLayout appearance = settingCard();
        appearance.addView(label("Darstellung", 17, palette.ink, Typeface.BOLD));
        appearance.addView(label(
            palette.dark ? "Der Dunkelmodus ist in der gesamten App aktiv." : "Der helle Papiermodus ist in der gesamten App aktiv.",
            12,
            palette.muted,
            Typeface.NORMAL
        ), margins(0, 7, 0, 13));
        Button appearanceButton = actionButton(
            palette.dark ? "Hellen Modus verwenden" : "Dunkelmodus verwenden",
            palette.ink
        );
        appearanceButton.setOnClickListener(view ->
            webView.evaluateJavascript(
                "document.querySelector('[data-action=\"toggle-theme\"]')?.click()",
                null
            )
        );
        appearance.addView(appearanceButton);
        content.addView(appearance, margins(0, 0, 0, 12));

        LinearLayout update = settingCard();
        update.addView(label("App-Updates", 17, palette.ink, Typeface.BOLD));
        update.addView(label("Installiert: Version " + BuildConfig.VERSION_NAME + "\nQuelle: GitHub Releases", 12, palette.muted, Typeface.NORMAL), margins(0, 7, 0, 13));
        Button updateButton = actionButton("Jetzt nach Updates suchen", palette.red);
        updateButton.setOnClickListener(view -> UpdateManager.checkForUpdates(this, true));
        update.addView(updateButton);
        content.addView(update, margins(0, 0, 0, 12));

        LinearLayout widget = settingCard();
        LinearLayout widgetHeader = new LinearLayout(this);
        widgetHeader.setGravity(Gravity.CENTER_VERTICAL);
        ImageView mascot = new ImageView(this);
        mascot.setImageResource(R.drawable.hibi_worried);
        mascot.setScaleType(ImageView.ScaleType.CENTER_CROP);
        widgetHeader.addView(mascot, new LinearLayout.LayoutParams(dp(84), dp(84)));
        LinearLayout widgetCopy = new LinearLayout(this);
        widgetCopy.setOrientation(LinearLayout.VERTICAL);
        widgetCopy.setPadding(dp(12), 0, 0, 0);
        widgetCopy.addView(label("Hibi-Streak-Widget", 17, palette.ink, Typeface.BOLD));
        widgetCopy.addView(label("Vier responsive Größen: Hibi zeigt Streak, Tagesziel und fällige Wiederholungen – und wird bis Mitternacht immer wütender.", 11, palette.muted, Typeface.NORMAL));
        widgetHeader.addView(widgetCopy, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        widget.addView(widgetHeader);
        Button widgetButton = actionButton("Widget zum Startbildschirm", palette.ink);
        widgetButton.setOnClickListener(view -> requestWidgetPin());
        widget.addView(widgetButton, margins(0, 10, 0, 0));
        content.addView(widget, margins(0, 0, 0, 12));

        LinearLayout source = settingCard();
        source.addView(label("Open Source", 17, palette.ink, Typeface.BOLD));
        source.addView(label("Quellcode, Release-APK und Prüfsumme liegen im GitHub-Repository.", 12, palette.muted, Typeface.NORMAL), margins(0, 7, 0, 13));
        Button sourceButton = actionButton("GitHub-Repository öffnen", palette.green);
        sourceButton.setOnClickListener(view -> startActivity(new Intent(
            Intent.ACTION_VIEW,
            Uri.parse("https://github.com/" + BuildConfig.UPDATE_REPOSITORY)
        )));
        source.addView(sourceButton);
        content.addView(source, margins(0, 0, 0, 12));
        return scroll;
    }

    private void requestWidgetPin() {
        AppWidgetManager manager = getSystemService(AppWidgetManager.class);
        if (manager == null || !manager.isRequestPinAppWidgetSupported()) {
            new AlertDialog.Builder(
                this,
                palette.dark ? AlertDialog.THEME_DEVICE_DEFAULT_DARK : AlertDialog.THEME_DEVICE_DEFAULT_LIGHT
            )
                .setTitle("Widget hinzufügen")
                .setMessage("Halte den Startbildschirm gedrückt, öffne „Widgets“ und wähle „Kana Garten“.")
                .setPositiveButton("Verstanden", null)
                .show();
            return;
        }
        ComponentName provider = new ComponentName(this, StreakWidgetProvider.class);
        PendingIntent success = PendingIntent.getActivity(
            this,
            99,
            new Intent(this, MainActivity.class),
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        manager.requestPinAppWidget(provider, null, success);
    }

    private void maybeRequestReviewNotificationPermission() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU
            || checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                == PackageManager.PERMISSION_GRANTED) {
            return;
        }
        android.content.SharedPreferences preferences = getSharedPreferences(
            REMINDER_UI_PREFS,
            Context.MODE_PRIVATE
        );
        if (preferences.getBoolean(REMINDER_PROMPTED, false)) return;
        preferences.edit().putBoolean(REMINDER_PROMPTED, true).apply();
        new AlertDialog.Builder(
            this,
            palette.dark ? AlertDialog.THEME_DEVICE_DEFAULT_DARK : AlertDialog.THEME_DEVICE_DEFAULT_LIGHT
        )
            .setTitle("Wissen rechtzeitig auffrischen")
            .setMessage("Kana Garten kann dich benachrichtigen, sobald eine kurze Wiederholung fällig ist. Die Abstände werden mit jedem sicheren Treffer länger.")
            .setNegativeButton("Später", null)
            .setPositiveButton("Erinnerungen aktivieren", (dialog, which) ->
                requestPermissions(
                    new String[]{Manifest.permission.POST_NOTIFICATIONS},
                    REQUEST_NOTIFICATIONS
                )
            )
            .show();
    }

    private void enableOrOpenReviewNotifications() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
            && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(
                new String[]{Manifest.permission.POST_NOTIFICATIONS},
                REQUEST_NOTIFICATIONS
            );
            return;
        }
        Intent intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS)
            .putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
        startActivity(intent);
    }

    private void requestNotificationPermissionIfNeeded() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
            && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(
                new String[]{Manifest.permission.POST_NOTIFICATIONS},
                REQUEST_NOTIFICATIONS
            );
        }
    }

    private void refreshGoalSurfaces() {
        DailyGoalScheduler.schedule(this);
        if (dashboardView != null) dashboardView.refresh();
        if (webView != null) {
            webView.evaluateJavascript(
                "window.dispatchEvent(new Event('kana-garten-dashboard-settings'))",
                null
            );
        }
    }

    private Switch settingsSwitch(boolean checked, String description) {
        Switch control = new Switch(this);
        control.setChecked(checked);
        control.setTextColor(palette.ink);
        control.setContentDescription(description);
        control.setMinWidth(dp(54));
        return control;
    }

    private String formatGoalMinutes(int minutes) {
        if (minutes < 60) {
            return String.format(Locale.GERMANY, "Ziel: %d Minuten pro Tag", minutes);
        }
        int hours = minutes / 60;
        int rest = minutes % 60;
        if (rest == 0) {
            return String.format(
                Locale.GERMANY,
                "Ziel: %d %s pro Tag",
                hours,
                hours == 1 ? "Stunde" : "Stunden"
            );
        }
        return String.format(Locale.GERMANY, "Ziel: %d Std. %d Min. pro Tag", hours, rest);
    }

    private String formatReminderTime(int hour, int minute) {
        return String.format(Locale.GERMANY, "Erinnerung um %02d:%02d Uhr", hour, minute);
    }

    private LinearLayout settingCard() {
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setPadding(dp(17), dp(17), dp(17), dp(17));
        GradientDrawable background = rounded(palette.paperLight, 18);
        background.setStroke(dp(1), palette.line);
        card.setBackground(background);
        return card;
    }

    private Button actionButton(String text, int color) {
        Button button = new Button(this);
        button.setText(text);
        button.setTextColor(palette.dark ? palette.paper : Color.WHITE);
        button.setTextSize(12);
        button.setAllCaps(false);
        button.setTypeface(Typeface.DEFAULT_BOLD);
        button.setBackground(rounded(color, 12));
        button.setMinHeight(dp(48));
        return button;
    }

    private TextView label(String text, int size, int color, int style) {
        TextView label = new TextView(this);
        label.setText(text);
        label.setTextSize(size);
        label.setTextColor(color);
        label.setTypeface(Typeface.create("sans", style));
        return label;
    }

    private LinearLayout.LayoutParams margins(int left, int top, int right, int bottom) {
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        );
        params.setMargins(dp(left), dp(top), dp(right), dp(bottom));
        return params;
    }

    private LinearLayout.LayoutParams weighted() {
        return new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.MATCH_PARENT, 1f);
    }

    private FrameLayout.LayoutParams matchParent() {
        return new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        );
    }

    private GradientDrawable rounded(int color, int radius) {
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(color);
        drawable.setCornerRadius(dp(radius));
        return drawable;
    }

    private int dp(float value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private void initializeTextToSpeech() {
        textToSpeech = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int language = textToSpeech.setLanguage(Locale.JAPAN);
                if (language == TextToSpeech.LANG_MISSING_DATA
                    || language == TextToSpeech.LANG_NOT_SUPPORTED) {
                    japaneseSpeechReady = false;
                    return;
                }
                Voice bestOfflineVoice = null;
                java.util.Set<Voice> voices = textToSpeech.getVoices();
                if (voices != null) {
                    for (Voice voice : voices) {
                        if (!Locale.JAPAN.getLanguage().equals(voice.getLocale().getLanguage())
                            || voice.isNetworkConnectionRequired()) {
                            continue;
                        }
                        if (bestOfflineVoice == null || voice.getQuality() > bestOfflineVoice.getQuality()) {
                            bestOfflineVoice = voice;
                        }
                    }
                }
                japaneseSpeechReady = bestOfflineVoice != null;
                if (bestOfflineVoice != null) textToSpeech.setVoice(bestOfflineVoice);
            }
        });
    }

    private void speakJapanese(String text, double rate) {
        runOnUiThread(() -> {
            if (textToSpeech == null) {
                Toast.makeText(this, "Die japanische Sprachausgabe wird vorbereitet.", Toast.LENGTH_SHORT).show();
                return;
            }
            if (!japaneseSpeechReady) {
                Toast.makeText(this, "Bitte installiere in Android einmalig die japanische Offline-Stimme.", Toast.LENGTH_LONG).show();
                return;
            }
            textToSpeech.setSpeechRate((float) Math.max(0.45, Math.min(1.1, rate)));
            textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, "kana-garten-ja");
        });
    }

    @Override
    @SuppressLint("UnspecifiedRegisterReceiverFlag")
    protected void onStart() {
        super.onStart();
        IntentFilter filter = new IntentFilter(android.app.DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(downloadReceiver, filter, Context.RECEIVER_NOT_EXPORTED);
        } else {
            registerReceiver(downloadReceiver, filter);
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
        try { unregisterReceiver(downloadReceiver); } catch (Exception ignored) {}
    }

    @Override
    protected void onResume() {
        super.onResume();
        StreakWidgetProvider.updateAll(this);
        ReviewReminderScheduler.scheduleFromProgress(this, usageStore.restoreProgress());
        DailyGoalScheduler.schedule(this);
        UpdateManager.tryInstallPending(this, false);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        if (intent.getBooleanExtra("open_dashboard", false)) selectTab(1, true);
        else if (intent.getBooleanExtra("open_reviews", false)) selectTab(0, true);
    }

    @Override
    public void onBackPressed() {
        if (currentView != webView) {
            selectTab(0, true);
        } else if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        if (webView != null) webView.destroy();
        super.onDestroy();
    }

    public final class AndroidBridge {
        @JavascriptInterface
        public void recordSession(String mode, int durationSeconds, int itemCount) {
            usageStore.recordSession(mode, durationSeconds, itemCount);
            DailyGoalScheduler.schedule(MainActivity.this);
            runOnUiThread(() -> {
                StreakWidgetProvider.updateAll(MainActivity.this);
                if (dashboardView != null) dashboardView.refresh();
                maybeRequestReviewNotificationPermission();
            });
        }

        @JavascriptInterface
        public void backupProgress(String json) {
            usageStore.backupProgress(json);
            ReviewReminderScheduler.scheduleFromProgress(MainActivity.this, json);
        }

        @JavascriptInterface
        public void backupJlptProgress(String json) {
            usageStore.backupJlptProgress(json);
        }

        @JavascriptInterface
        public String getDashboardPreferences() {
            return usageStore.dashboardPreferencesJson();
        }

        @JavascriptInterface
        public String restoreProgress() {
            return usageStore.restoreProgress();
        }

        @JavascriptInterface
        public void speakJapanese(String text, double rate) {
            MainActivity.this.speakJapanese(text, rate);
        }

        @JavascriptInterface
        public void setLearningActive(boolean active) {
            runOnUiThread(() -> MainActivity.this.setLearningActive(active));
        }

        @JavascriptInterface
        public void setDarkMode(boolean darkMode, boolean persist) {
            runOnUiThread(() -> MainActivity.this.applyDarkMode(darkMode, persist));
        }
    }
}
