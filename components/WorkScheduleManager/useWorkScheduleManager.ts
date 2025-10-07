import { usePlanningReminderNotifications } from './usePlanningReminderNotifications';
import { useWorkScheduleSuggestion } from './useWorkScheduleSuggestion';

export function useWorkScheduleManager() {
  useWorkScheduleSuggestion();
  usePlanningReminderNotifications();
}
