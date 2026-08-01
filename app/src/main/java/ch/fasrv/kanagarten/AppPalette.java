package ch.fasrv.kanagarten;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Configuration;

final class AppPalette {
    private static final String PREFS = "kana_garten_ui";
    private static final String DARK_MODE = "dark_mode";

    final boolean dark;
    final int paper;
    final int paperLight;
    final int ink;
    final int muted;
    final int red;
    final int green;
    final int line;
    final int track;
    final int chartGrid;
    final int emptyBar;

    AppPalette(boolean dark) {
        this.dark = dark;
        if (dark) {
            paper = 0xFF111714;
            paperLight = 0xFF1B2420;
            ink = 0xFFEDF4EF;
            muted = 0xFFA8B4AD;
            red = 0xFFFF715C;
            green = 0xFF6BD0A4;
            line = 0xFF3A4841;
            track = 0xFF344139;
            chartGrid = 0xFF2B3832;
            emptyBar = 0xFF46554D;
        } else {
            paper = 0xFFF5F0E8;
            paperLight = 0xFFFFFAF2;
            ink = 0xFF17201C;
            muted = 0xFF69716C;
            red = 0xFFD94A36;
            green = 0xFF1D7455;
            line = 0xFFD8D2C8;
            track = 0xFFE6E1D8;
            chartGrid = 0xFFE7E1D8;
            emptyBar = 0xFFD7D2C9;
        }
    }

    static boolean isDark(Context context) {
        SharedPreferences preferences = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        if (preferences.contains(DARK_MODE)) return preferences.getBoolean(DARK_MODE, false);
        int nightMode = context.getResources().getConfiguration().uiMode
            & Configuration.UI_MODE_NIGHT_MASK;
        return nightMode == Configuration.UI_MODE_NIGHT_YES;
    }

    static void save(Context context, boolean dark) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit()
            .putBoolean(DARK_MODE, dark)
            .apply();
    }
}
