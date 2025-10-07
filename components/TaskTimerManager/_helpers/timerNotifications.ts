import type { Notification, Task } from '../../../lib/types';
import type { useI18n } from '../../../lib/i18n';

export type Translate = ReturnType<typeof useI18n>['t'];

export function getTimerTaskTitle(
  task: Task | undefined,
  t: Translate
): string {
  const rawTitle = task?.title?.trim();
  if (rawTitle) {
    return rawTitle;
  }
  return t('notifications.timerFinished.untitledTask');
}

export function createTimerNotificationId(taskId: string): string {
  const randomId =
    typeof globalThis.crypto?.randomUUID === 'function'
      ? globalThis.crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `timer-finished-${taskId}-${randomId}`;
}

export function buildTimerFinishedNotification(
  taskId: string,
  taskTitle: string,
  t: Translate
): Notification {
  const description = t('timer.finished').replace('{task}', taskTitle);
  return {
    id: createTimerNotificationId(taskId),
    type: 'info',
    titleKey: 'notifications.timerFinished.title',
    descriptionKey: 'notifications.timerFinished.description',
    title: t('notifications.timerFinished.title'),
    description,
    read: false,
    createdAt: new Date().toISOString(),
  };
}
