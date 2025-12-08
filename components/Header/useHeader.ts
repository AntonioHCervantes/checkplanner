'use client';
import { useMemo } from 'react';
import { useStore } from '../../lib/store';
import { useI18n } from '../../lib/i18n';
import { useThemePreference } from '../../lib/useThemePreference';

export default function useHeader() {
  const { tasks, exportData, importData, clearAll, notifications } = useStore(
    state => ({
      tasks: state.tasks,
      exportData: state.exportData,
      importData: state.importData,
      clearAll: state.clearAll,
      notifications: state.notifications,
    })
  );
  const { t, language, setLanguage } = useI18n();
  const { theme, toggleTheme } = useThemePreference();
  const myDayCount = tasks.filter(t => t.plannedFor !== null).length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const latestUnreadNotification = useMemo(() => {
    const unread = notifications.filter(n => !n.read);
    if (unread.length === 0) {
      return null;
    }

    return unread.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }, [notifications]);

  return {
    state: {
      theme,
      t,
      language,
      myDayCount,
      unreadNotifications,
      notifications,
      latestUnreadNotification,
    },
    actions: {
      exportData,
      toggleTheme,
      setLanguage,
      importData,
      clearAll,
    },
  } as const;
}
