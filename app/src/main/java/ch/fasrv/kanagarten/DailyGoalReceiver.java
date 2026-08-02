package ch.fasrv.kanagarten;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public final class DailyGoalReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && DailyGoalScheduler.ACTION_DAILY_GOAL.equals(intent.getAction())) {
            DailyGoalScheduler.postGoalNotification(context);
        }
    }
}
