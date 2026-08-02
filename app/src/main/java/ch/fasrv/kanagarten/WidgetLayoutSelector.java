package ch.fasrv.kanagarten;

/** Keeps launcher-dependent widget sizing deterministic and independently testable. */
final class WidgetLayoutSelector {
    enum SizeClass { TINY, SQUARE, WIDE, LARGE }

    private WidgetLayoutSelector() {}

    static SizeClass select(int widthDp, int heightDp) {
        if (heightDp < 90) return SizeClass.TINY;
        if (widthDp < 190) return SizeClass.SQUARE;
        if (heightDp >= 180) return SizeClass.LARGE;
        return SizeClass.WIDE;
    }
}
