import { useEffect } from 'react';
import { useStore } from '../../lib/store';
import { hasWorkSchedule } from './_helpers/scheduleReminders';

const SUGGESTION_NOTIFICATION_ID = 'work-schedule-suggestion';

export function useWorkScheduleSuggestion() {
  useEffect(() => {
    const ensureSuggestionVisibility = () => {
      const state = useStore.getState();
      const shouldSuggest =
        state.tasks.length >= 3 && !hasWorkSchedule(state.workSchedule);
      const existing = state.notifications.find(
        notification => notification.id === SUGGESTION_NOTIFICATION_ID
      );
      const isDismissed = state.dismissedNotifications.includes(
        SUGGESTION_NOTIFICATION_ID
      );

      if (isDismissed) {
        if (existing) {
          state.removeNotification(SUGGESTION_NOTIFICATION_ID);
        }
        return;
      }

      if (shouldSuggest) {
        if (!existing) {
          state.addNotification({
            id: SUGGESTION_NOTIFICATION_ID,
            type: 'tip',
            titleKey: 'notifications.workScheduleSuggestion.title',
            descriptionKey: 'notifications.workScheduleSuggestion.description',
            actionUrl: '/settings/work-schedule',
            actionLabelKey: 'notifications.workScheduleSuggestion.cta',
            read: false,
            createdAt: new Date().toISOString(),
          });
        }
        return;
      }

      if (existing) {
        state.removeNotification(SUGGESTION_NOTIFICATION_ID);
      }
    };

    ensureSuggestionVisibility();

    const unsubscribe = useStore.subscribe((state, previousState) => {
      const tasksChanged = state.tasks !== previousState.tasks;
      const scheduleChanged = state.workSchedule !== previousState.workSchedule;

      if (tasksChanged || scheduleChanged) {
        ensureSuggestionVisibility();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
}
