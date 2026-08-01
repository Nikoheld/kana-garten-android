package ch.fasrv.kanagarten;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public final class LocalContentWebViewClient extends WebViewClient {
    public static final String APP_ORIGIN = "https://app.local";
    private final Context context;

    public LocalContentWebViewClient(Context context) {
        this.context = context;
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        Uri uri = request.getUrl();
        if (!"app.local".equals(uri.getHost())) return null;
        String path = uri.getPath();
        if (path == null || path.equals("/")) path = "/index.html";
        path = Uri.decode(path.substring(1));
        if (path.contains("..")) return null;
        try {
            InputStream stream = context.getAssets().open("web/" + path);
            Map<String, String> headers = new HashMap<>();
            headers.put("Cache-Control", "no-store");
            headers.put("Access-Control-Allow-Origin", APP_ORIGIN);
            return new WebResourceResponse(
                mimeType(path),
                path.endsWith(".ttf") ? null : "UTF-8",
                200,
                "OK",
                headers,
                stream
            );
        } catch (Exception ignored) {
            return null;
        }
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        Uri uri = request.getUrl();
        if ("app.local".equals(uri.getHost())) return false;
        try {
            context.startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (Exception ignored) {
            // Externe Links sind optional; der Lernbereich bleibt immer verfügbar.
        }
        return true;
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        super.onPageStarted(view, url, favicon);
        view.evaluateJavascript(
            "document.documentElement.classList.add('android-app');",
            null
        );
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
        view.evaluateJavascript(
            "document.documentElement.classList.add('android-app');",
            null
        );
    }

    private String mimeType(String path) {
        if (path.endsWith(".html")) return "text/html";
        if (path.endsWith(".css")) return "text/css";
        if (path.endsWith(".js")) return "application/javascript";
        if (path.endsWith(".json")) return "application/json";
        if (path.endsWith(".svg")) return "image/svg+xml";
        if (path.endsWith(".png")) return "image/png";
        if (path.endsWith(".ttf")) return "font/ttf";
        return "application/octet-stream";
    }
}
