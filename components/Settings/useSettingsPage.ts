'use client';

import { useMemo, useRef, useState } from 'react';
import type { ChangeEvent, RefObject } from 'react';
import { useI18n, type Language } from '../../lib/i18n';
import { useStore } from '../../lib/store';
import type {
  NotificationPreferences,
  NotificationSound,
} from '../../lib/types';
import { useThemePreference } from '../../lib/useThemePreference';

type SectionId = 'general' | 'appearance' | 'work-schedule' | 'notifications';

type SettingsNavItem = {
  id: SectionId;
  title: string;
  description: string;
};

type SettingsState = {
  t: ReturnType<typeof useI18n>['t'];
  language: Language;
  theme: 'light' | 'dark';
  selectedSection: SectionId;
  showConfirm: boolean;
  navItems: SettingsNavItem[];
  fileInputRef: RefObject<HTMLInputElement | null>;
  notificationPreferences: NotificationPreferences;
};

type SettingsActions = {
  setSelectedSection: (section: SectionId) => void;
  setLanguage: (language: Language) => void;
  handleImport: (event: ChangeEvent<HTMLInputElement>) => void;
  exportData: () => void;
  requestClear: () => void;
  confirmClear: () => void;
  cancelClear: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setNotificationSoundEnabled: (
    notification: keyof NotificationPreferences,
    enabled: boolean
  ) => void;
  setNotificationSound: (
    notification: keyof NotificationPreferences,
    sound: NotificationSound
  ) => void;
};

export default function useSettingsPage(): {
  state: SettingsState;
  actions: SettingsActions;
} {
  const { t, language, setLanguage } = useI18n();
  const { exportData, importData, clearAll } = useStore(state => ({
    exportData: state.exportData,
    importData: state.importData,
    clearAll: state.clearAll,
  }));
  const {
    notificationPreferences,
    setNotificationSoundEnabled,
    setNotificationSound,
  } = useStore(state => ({
    notificationPreferences: state.notificationPreferences,
    setNotificationSoundEnabled: state.setNotificationSoundEnabled,
    setNotificationSound: state.setNotificationSound,
  }));
  const { theme, setThemePreference } = useThemePreference();
  const [selectedSection, setSelectedSection] = useState<SectionId>('general');
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        importData(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const navItems: SettingsNavItem[] = useMemo(
    () => [
      {
        id: 'general',
        title: t('settingsPage.sections.general.title'),
        description: t('settingsPage.sections.general.description'),
      },
      {
        id: 'appearance',
        title: t('settingsPage.sections.appearance.title'),
        description: t('settingsPage.sections.appearance.description'),
      },
      {
        id: 'work-schedule',
        title: t('settingsPage.sections.workSchedule.title'),
        description: t('settingsPage.sections.workSchedule.description'),
      },
      {
        id: 'notifications',
        title: t('settingsPage.sections.notifications.title'),
        description: t('settingsPage.sections.notifications.description'),
      },
    ],
    [t]
  );

  return {
    state: {
      t,
      language,
      theme,
      selectedSection,
      showConfirm,
      navItems,
      fileInputRef,
      notificationPreferences,
    },
    actions: {
      setSelectedSection,
      setLanguage,
      handleImport,
      exportData,
      requestClear: () => setShowConfirm(true),
      confirmClear: () => {
        clearAll();
        setShowConfirm(false);
      },
      cancelClear: () => setShowConfirm(false),
      setTheme: setThemePreference,
      setNotificationSoundEnabled,
      setNotificationSound,
    },
  } as const;
}
