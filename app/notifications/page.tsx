'use client';

import { useEffect } from 'react';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { useStore } from '../../lib/store';
import { useI18n } from '../../lib/i18n';

export default function NotificationsPage() {
  const notifications = useStore(state => state.notifications);
  const markAllNotificationsRead = useStore(
    state => state.markAllNotificationsRead
  );
  const { t } = useI18n();

  useEffect(() => {
    markAllNotificationsRead();
  }, [markAllNotificationsRead]);

  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main
      className="mx-auto max-w-2xl space-y-4 px-4 py-16"
      data-testid="view-notifications"
    >
      <h1
        className="text-2xl font-bold"
        data-testid="notifications-title"
      >
        {t('notifications.title')}
      </h1>
      {sorted.length === 0 ? (
        <p data-testid="notifications-empty">{t('notifications.empty')}</p>
      ) : (
        <div
          className="space-y-4"
          data-testid="notifications-list"
        >
          {sorted.map(n => (
            <NotificationCard
              key={n.id}
              notification={n}
              data-testid="notifications-item"
            />
          ))}
        </div>
      )}
    </main>
  );
}
