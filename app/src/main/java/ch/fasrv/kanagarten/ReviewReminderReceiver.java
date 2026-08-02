package ch.fasrv.kanagarten;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public final class ReviewReminderReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (ReviewReminderScheduler.ACTION_REVIEW_REMINDER.equals(intent.getAction())) {
            ReviewReminderScheduler.postDueNotification(context);
        }
    }
}
