package ch.fasrv.kanagarten;

/** Maps the compact settings slider to useful daily-goal durations. */
final class DailyGoalScale {
    static final int MIN_MINUTES = 5;
    static final int MAX_MINUTES = 24 * 60;
    static final int MAX_PROGRESS = 65;

    private DailyGoalScale() {}

    static int clampMinutes(int minutes) {
        return Math.max(MIN_MINUTES, Math.min(MAX_MINUTES, minutes));
    }

    static int minutesForProgress(int progress) {
        int safeProgress = Math.max(0, Math.min(MAX_PROGRESS, progress));
        if (safeProgress <= 35) return 5 + safeProgress * 5;
        if (safeProgress <= 53) return 210 + (safeProgress - 36) * 30;
        return 780 + (safeProgress - 54) * 60;
    }

    static int progressForMinutes(int minutes) {
        int safeMinutes = clampMinutes(minutes);
        int bestProgress = 0;
        int bestDistance = Integer.MAX_VALUE;
        for (int progress = 0; progress <= MAX_PROGRESS; progress++) {
            int distance = Math.abs(minutesForProgress(progress) - safeMinutes);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestProgress = progress;
            }
        }
        return bestProgress;
    }
}
