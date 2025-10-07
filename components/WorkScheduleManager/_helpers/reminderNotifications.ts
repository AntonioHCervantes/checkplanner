import type { Notification } from '../../../lib/types';

function createRandomId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `${Date.now().toString(36)}`;
}

export function createPlanningReminderNotification(
  todayKey: string
): Notification {
  return {
    id: `work-reminder-${todayKey}-${createRandomId()}`,
    type: 'tip',
    titleKey: 'notifications.workReminder.title',
    descriptionKey: 'notifications.workReminder.description',
    read: false,
    createdAt: new Date().toISOString(),
  };
}
