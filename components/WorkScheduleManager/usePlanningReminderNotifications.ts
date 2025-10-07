import { useEffect } from 'react';
import { useStore } from '../../lib/store';
import { playReminderSound } from '../../lib/sounds';
import {
  findNextReminderWindow,
  getDayKey,
  getLocalDateKey,
  getReminderWindow,
} from './_helpers/scheduleReminders';
import { createPlanningReminderNotification } from './_helpers/reminderNotifications';

export function usePlanningReminderNotifications() {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let destroyed = false;

    const scheduleCheck = (delay: number) => {
      if (destroyed) {
        return;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const normalizedDelay = Number.isFinite(delay) ? Math.floor(delay) : 0;
      const safeDelay = Math.min(
        2_147_483_647,
        Math.max(1000, normalizedDelay)
      );
      timeoutId = setTimeout(runCheck, safeDelay);
    };

    const runCheck = () => {
      if (destroyed) {
        return;
      }

      const state = useStore.getState();
      const reminder = state.workPreferences.planningReminder;
      if (!reminder.enabled) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        return;
      }

      const now = new Date();
      const nowTimestamp = now.getTime();
      const dayKey = getDayKey(now);
      const slots = state.workSchedule[dayKey];
      const window = slots
        ? getReminderWindow(now, slots, reminder.minutesBefore)
        : null;

      if (window) {
        const { reminderAt, endAt } = window;

        if (nowTimestamp >= reminderAt && nowTimestamp < endAt) {
          const todayKey = getLocalDateKey(now);
          if (reminder.lastNotifiedDate !== todayKey) {
            state.setPlanningReminderLastNotified(todayKey);
            playReminderSound();
            state.addNotification(createPlanningReminderNotification(todayKey));
          }

          scheduleCheck(Math.max(1000, endAt - nowTimestamp));
          return;
        }

        if (nowTimestamp < reminderAt) {
          scheduleCheck(reminderAt - nowTimestamp);
          return;
        }
      }

      const nextWindow = findNextReminderWindow(
        now,
        state.workSchedule,
        reminder.minutesBefore
      );

      if (nextWindow) {
        scheduleCheck(nextWindow.reminderAt - nowTimestamp);
      } else {
        scheduleCheck(6 * 60 * 60 * 1000);
      }
    };

    runCheck();

    const unsubscribe = useStore.subscribe((state, previousState) => {
      const planningChanged =
        state.workPreferences.planningReminder !==
        previousState.workPreferences.planningReminder;
      const scheduleChanged = state.workSchedule !== previousState.workSchedule;

      if (planningChanged || scheduleChanged) {
        runCheck();
      }
    });

    return () => {
      destroyed = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      unsubscribe();
    };
  }, []);
}
