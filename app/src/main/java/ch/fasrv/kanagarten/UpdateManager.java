package ch.fasrv.kanagarten;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;
import android.provider.Settings;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public final class UpdateManager {
    private static final String PREFS = "kana_garten_updates";
    private static final String DOWNLOAD_ID = "download_id";
    private static final String DOWNLOAD_VERSION = "download_version";
    private static final String INSTALL_LAUNCHED_ID = "install_launched_id";
    private static final String INSTALLED_VERSION = "installed_version";
    private static final ExecutorService EXECUTOR = Executors.newSingleThreadExecutor();

    private UpdateManager() {}

    public static void initialize(Context context) {
        SharedPreferences preferences = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String previouslyInstalled = preferences.getString(INSTALLED_VERSION, "");
        if (!BuildConfig.VERSION_NAME.equals(previouslyInstalled)) {
            clearPending(context, true);
            preferences.edit().putString(INSTALLED_VERSION, BuildConfig.VERSION_NAME).apply();
        }
    }

    public static void checkForUpdates(Activity activity, boolean userInitiated) {
        if (userInitiated) Toast.makeText(activity, "Suche nach Updates …", Toast.LENGTH_SHORT).show();
        EXECUTOR.execute(() -> {
            try {
                String endpoint = "https://api.github.com/repos/" + BuildConfig.UPDATE_REPOSITORY + "/releases/latest";
                HttpURLConnection connection = (HttpURLConnection) new URL(endpoint).openConnection();
                connection.setConnectTimeout(8_000);
                connection.setReadTimeout(8_000);
                connection.setRequestProperty("Accept", "application/vnd.github+json");
                connection.setRequestProperty("User-Agent", "Kana-Garten-Android/" + BuildConfig.VERSION_NAME);
                int status = connection.getResponseCode();
                if (status != 200) throw new IllegalStateException("GitHub antwortet mit " + status);
                StringBuilder body = new StringBuilder();
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
                    String line;
                    while ((line = reader.readLine()) != null) body.append(line);
                }
                JSONObject release = new JSONObject(body.toString());
                String tag = release.optString("tag_name", "").replaceFirst("^[vV]", "");
                String apkUrl = findApk(release.optJSONArray("assets"));
                if (tag.isEmpty() || apkUrl == null) throw new IllegalStateException("Kein APK im neuesten Release");
                boolean newer = compareVersions(tag, BuildConfig.VERSION_NAME) > 0;
                activity.runOnUiThread(() -> {
                    if (newer) showUpdateDialog(activity, tag, release.optString("body", ""), apkUrl);
                    else if (userInitiated) Toast.makeText(activity, "Kana Garten ist aktuell.", Toast.LENGTH_LONG).show();
                });
            } catch (Exception error) {
                if (userInitiated) {
                    activity.runOnUiThread(() -> Toast.makeText(
                        activity,
                        "Update-Prüfung derzeit nicht möglich. Offline-Lernen funktioniert weiter.",
                        Toast.LENGTH_LONG
                    ).show());
                }
            }
        });
    }

    private static String findApk(JSONArray assets) {
        if (assets == null) return null;
        for (int i = 0; i < assets.length(); i++) {
            JSONObject asset = assets.optJSONObject(i);
            if (asset == null) continue;
            String name = asset.optString("name", "");
            if (name.toLowerCase(Locale.ROOT).endsWith(".apk")) return asset.optString("browser_download_url", null);
        }
        return null;
    }

    private static void showUpdateDialog(Activity activity, String version, String notes, String apkUrl) {
        String cleanNotes = notes == null || notes.trim().isEmpty()
            ? "Eine neue Version mit Verbesserungen ist verfügbar."
            : notes.trim();
        if (cleanNotes.length() > 700) cleanNotes = cleanNotes.substring(0, 700) + "…";
        new AlertDialog.Builder(
            activity,
            AppPalette.isDark(activity)
                ? AlertDialog.THEME_DEVICE_DEFAULT_DARK
                : AlertDialog.THEME_DEVICE_DEFAULT_LIGHT
        )
            .setTitle("Kana Garten " + version)
            .setMessage(cleanNotes + "\n\nDas Update wird direkt aus dem offiziellen GitHub-Release geladen.")
            .setNegativeButton("Später", null)
            .setPositiveButton("Update laden", (dialog, which) -> downloadUpdate(activity, version, apkUrl))
            .show();
    }

    private static void downloadUpdate(Activity activity, String version, String apkUrl) {
        try {
            DownloadManager manager = (DownloadManager) activity.getSystemService(Context.DOWNLOAD_SERVICE);
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(apkUrl))
                .setTitle("Kana Garten " + version)
                .setDescription("Sicheres App-Update wird heruntergeladen")
                .setMimeType("application/vnd.android.package-archive")
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                .setAllowedOverMetered(true)
                .setDestinationInExternalFilesDir(activity, Environment.DIRECTORY_DOWNLOADS, "kana-garten-" + version + ".apk");
            long id = manager.enqueue(request);
            activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
                .edit()
                .putLong(DOWNLOAD_ID, id)
                .putString(DOWNLOAD_VERSION, version)
                .remove(INSTALL_LAUNCHED_ID)
                .apply();
            Toast.makeText(activity, "Update wird heruntergeladen.", Toast.LENGTH_LONG).show();
        } catch (Exception error) {
            Toast.makeText(activity, "Download konnte nicht gestartet werden.", Toast.LENGTH_LONG).show();
        }
    }

    public static long getPendingDownloadId(Context context) {
        return context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getLong(DOWNLOAD_ID, -1L);
    }

    public static void tryInstallPending(Activity activity, boolean explainPermission) {
        SharedPreferences preferences = activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        long id = preferences.getLong(DOWNLOAD_ID, -1L);
        if (id < 0) return;
        String targetVersion = preferences.getString(DOWNLOAD_VERSION, "");
        if (!targetVersion.isEmpty() && compareVersions(targetVersion, BuildConfig.VERSION_NAME) <= 0) {
            clearPending(activity, true);
            return;
        }
        if (preferences.getLong(INSTALL_LAUNCHED_ID, -1L) == id) return;

        DownloadManager manager = (DownloadManager) activity.getSystemService(Context.DOWNLOAD_SERVICE);
        try (Cursor cursor = manager.query(new DownloadManager.Query().setFilterById(id))) {
            if (!cursor.moveToFirst()) {
                clearPending(activity, false);
                return;
            }
            int status = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS));
            if (status == DownloadManager.STATUS_FAILED) {
                clearPending(activity, true);
                return;
            }
            if (status != DownloadManager.STATUS_SUCCESSFUL) return;
        }

        if (!activity.getPackageManager().canRequestPackageInstalls()) {
            if (!explainPermission) return;
            new AlertDialog.Builder(
                activity,
                AppPalette.isDark(activity)
                    ? AlertDialog.THEME_DEVICE_DEFAULT_DARK
                    : AlertDialog.THEME_DEVICE_DEFAULT_LIGHT
            )
                .setTitle("Update installieren")
                .setMessage("Android benötigt einmalig die Erlaubnis, Updates aus Kana Garten zu installieren. Die APK stammt direkt aus dem GitHub-Repository der App.")
                .setNegativeButton("Später", null)
                .setPositiveButton("Einstellung öffnen", (dialog, which) -> {
                    Intent settings = new Intent(
                        Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                        Uri.parse("package:" + activity.getPackageName())
                    );
                    activity.startActivity(settings);
                })
                .show();
            return;
        }

        Uri apk = manager.getUriForDownloadedFile(id);
        if (apk == null) return;
        Intent install = new Intent(Intent.ACTION_VIEW)
            .setDataAndType(apk, "application/vnd.android.package-archive")
            .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        preferences.edit().putLong(INSTALL_LAUNCHED_ID, id).apply();
        try {
            activity.startActivity(install);
        } catch (Exception error) {
            preferences.edit().remove(INSTALL_LAUNCHED_ID).apply();
            Toast.makeText(activity, "Android konnte den Paketinstaller nicht öffnen.", Toast.LENGTH_LONG).show();
        }
    }

    private static void clearPending(Context context, boolean removeDownload) {
        SharedPreferences preferences = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        long id = preferences.getLong(DOWNLOAD_ID, -1L);
        if (removeDownload && id >= 0) {
            DownloadManager manager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            if (manager != null) manager.remove(id);
        }
        preferences.edit()
            .remove(DOWNLOAD_ID)
            .remove(DOWNLOAD_VERSION)
            .remove(INSTALL_LAUNCHED_ID)
            .apply();
    }

    private static int compareVersions(String left, String right) {
        String[] a = left.replaceAll("[^0-9.]", "").split("\\.");
        String[] b = right.replaceAll("[^0-9.]", "").split("\\.");
        int length = Math.max(a.length, b.length);
        for (int i = 0; i < length; i++) {
            int av = i < a.length && !a[i].isEmpty() ? Integer.parseInt(a[i]) : 0;
            int bv = i < b.length && !b[i].isEmpty() ? Integer.parseInt(b[i]) : 0;
            if (av != bv) return Integer.compare(av, bv);
        }
        return 0;
    }
}
