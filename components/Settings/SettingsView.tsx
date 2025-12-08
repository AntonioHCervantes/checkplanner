'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import {
  Bell,
  CalendarClock,
  ChevronRight,
  Download,
  Languages,
  Moon,
  Palette,
  Sun,
  Trash2,
  Upload,
} from 'lucide-react';
import useDialogFocusTrap from '../../lib/useDialogFocusTrap';
import type useSettingsPage from './useSettingsPage';
import { LANGUAGES } from '../../lib/i18n';

import type { Language } from '../../lib/i18n';

type SettingsViewProps = {
  state: ReturnType<typeof useSettingsPage>['state'];
  actions: ReturnType<typeof useSettingsPage>['actions'];
};

type SectionId = ReturnType<typeof useSettingsPage>['state']['selectedSection'];

function SectionCard({
  title,
  description,
  icon,
  children,
  testId,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  testId?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70"
      data-testid={testId}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function GeneralSection({
  language,
  t,
  setLanguage,
  handleImport,
  exportData,
  requestClear,
  fileInputRef,
}: {
  language: Language;
  t: SettingsViewProps['state']['t'];
  setLanguage: SettingsViewProps['actions']['setLanguage'];
  handleImport: SettingsViewProps['actions']['handleImport'];
  exportData: SettingsViewProps['actions']['exportData'];
  requestClear: SettingsViewProps['actions']['requestClear'];
  fileInputRef: SettingsViewProps['state']['fileInputRef'];
}) {
  return (
    <div
      className="space-y-4"
      data-testid="settings-section-general"
    >
      <SectionCard
        title={t('settingsPage.general.language.title')}
        description={t('settingsPage.general.language.description')}
        icon={<Languages className="h-5 w-5" />}
        testId="settings-language-card"
      >
        <label
          htmlFor="settings-language"
          className="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {t('actions.language')}
        </label>
        <select
          id="settings-language"
          value={language}
          onChange={event => setLanguage(event.target.value as Language)}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          data-testid="header-actions-language-select"
        >
          {LANGUAGES.map(code => (
            <option
              key={code}
              value={code}
            >
              {code.toUpperCase()} - {t(`lang.${code}`)}
            </option>
          ))}
        </select>
      </SectionCard>

      <SectionCard
        title={t('settingsPage.general.data.title')}
        description={t('settingsPage.general.data.description')}
        icon={<Upload className="h-5 w-5" />}
        testId="settings-data-card"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {t('actions.import')}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {t('settingsPage.general.data.importHelper')}
            </p>
            <label className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:text-blue-200 dark:hover:border-blue-400 dark:hover:bg-blue-900/30">
              <Upload className="h-4 w-4" />
              {t('actions.import')}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleImport}
                className="sr-only"
                data-testid="header-actions-import-input"
              />
            </label>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {t('actions.export')}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {t('settingsPage.general.data.exportHelper')}
            </p>
            <button
              type="button"
              onClick={exportData}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-blue-200 dark:hover:border-blue-400 dark:hover:bg-blue-900/30"
              data-testid="header-actions-export"
            >
              <Download className="h-4 w-4" />
              {t('actions.export')}
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {t('actions.clearAll')}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {t('settingsPage.general.data.clearHelper')}
            </p>
            <button
              type="button"
              onClick={requestClear}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:bg-red-900/30 dark:text-red-100 dark:hover:bg-red-900/40"
              data-testid="header-actions-clear"
            >
              <Trash2 className="h-4 w-4" />
              {t('actions.clearAll')}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function AppearanceSection({
  theme,
  setTheme,
  t,
}: {
  theme: 'light' | 'dark';
  setTheme: SettingsViewProps['actions']['setTheme'];
  t: SettingsViewProps['state']['t'];
}) {
  const options: {
    value: 'light' | 'dark';
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: 'light',
      label: t('settingsPage.appearance.theme.light'),
      description: t('settingsPage.appearance.theme.lightDescription'),
      icon: <Sun className="h-4 w-4" />,
    },
    {
      value: 'dark',
      label: t('settingsPage.appearance.theme.dark'),
      description: t('settingsPage.appearance.theme.darkDescription'),
      icon: <Moon className="h-4 w-4" />,
    },
  ];

  return (
    <div
      className="space-y-4"
      data-testid="settings-section-appearance"
    >
      <SectionCard
        title={t('settingsPage.appearance.theme.title')}
        description={t('settingsPage.appearance.theme.description')}
        icon={<Palette className="h-5 w-5" />}
        testId="settings-appearance-card"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                theme === option.value
                  ? 'border-blue-500/70 bg-blue-50 shadow-sm dark:border-blue-500/60 dark:bg-blue-900/30'
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-500/60 dark:hover:bg-blue-900/20'
              }`}
              data-testid={`settings-theme-option-${option.value}`}
            >
              <div className="mt-1 text-blue-600 dark:text-blue-200">
                {option.icon}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {option.label}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {option.description}
                </p>
              </div>
              {theme === option.value && (
                <span className="ml-auto rounded-full bg-blue-100 px-2 py-1 text-[11px] font-semibold uppercase text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
                  {t('settingsPage.appearance.theme.active')}
                </span>
              )}
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function WorkScheduleSection({ t }: { t: SettingsViewProps['state']['t'] }) {
  return (
    <div
      className="space-y-4"
      data-testid="settings-section-work-schedule"
    >
      <SectionCard
        title={t('settingsPage.workSchedule.title')}
        description={t('settingsPage.workSchedule.description')}
        icon={<CalendarClock className="h-5 w-5" />}
        testId="settings-work-schedule-card"
      >
        <div className="flex flex-col gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:bg-gray-800/60 dark:text-gray-200 md:flex-row md:items-center md:justify-between">
          <p>{t('settingsPage.workSchedule.helper')}</p>
          <Link
            href="/settings/work-schedule"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            data-testid="settings-work-schedule-link"
          >
            {t('settingsPage.workSchedule.cta')}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}

function NotificationsSection({ t }: { t: SettingsViewProps['state']['t'] }) {
  return (
    <div
      className="space-y-4"
      data-testid="settings-section-notifications"
    >
      <SectionCard
        title={t('settingsPage.notifications.title')}
        description={t('settingsPage.notifications.description')}
        icon={<Bell className="h-5 w-5" />}
        testId="settings-notifications-card"
      >
        <div className="flex flex-col gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:bg-gray-800/60 dark:text-gray-200 md:flex-row md:items-center md:justify-between">
          <p>{t('settingsPage.notifications.helper')}</p>
          <Link
            href="/notifications"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-blue-400 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:border-blue-400 dark:hover:text-blue-200"
            data-testid="settings-notifications-link"
          >
            {t('settingsPage.notifications.cta')}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}

export default function SettingsView({ state, actions }: SettingsViewProps) {
  const {
    t,
    language,
    theme,
    selectedSection,
    showConfirm,
    navItems,
    fileInputRef,
  } = state;
  const {
    setSelectedSection,
    setLanguage,
    handleImport,
    exportData,
    requestClear,
    confirmClear,
    cancelClear,
    setTheme,
  } = actions;
  const confirmDialogRef = useRef<HTMLDivElement | null>(null);
  const confirmCancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const { onFocusEndGuard, onFocusStartGuard } = useDialogFocusTrap(
    showConfirm,
    confirmDialogRef,
    {
      initialFocusRef: confirmCancelButtonRef,
    }
  );

  const renderSection = (section: SectionId) => {
    switch (section) {
      case 'general':
        return (
          <GeneralSection
            language={language}
            t={t}
            setLanguage={setLanguage}
            handleImport={handleImport}
            exportData={exportData}
            requestClear={requestClear}
            fileInputRef={fileInputRef}
          />
        );
      case 'appearance':
        return (
          <AppearanceSection
            theme={theme}
            setTheme={setTheme}
            t={t}
          />
        );
      case 'work-schedule':
        return <WorkScheduleSection t={t} />;
      case 'notifications':
        return <NotificationsSection t={t} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950"
      data-testid="settings-page"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            {t('settingsPage.title')}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            {t('settingsPage.subtitle')}
          </h1>
          <p className="max-w-3xl text-base text-gray-600 dark:text-gray-300">
            {t('settingsPage.description')}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px,1fr]">
          <aside
            className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70"
            data-testid="settings-nav"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSection(item.id)}
                  className={`group flex w-full flex-col items-start gap-1 rounded-xl px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    selectedSection === item.id
                      ? 'bg-blue-50 text-blue-800 shadow-sm dark:bg-blue-900/30 dark:text-blue-100'
                      : 'hover:bg-blue-50/70 dark:hover:bg-blue-900/20'
                  }`}
                  data-testid={`settings-nav-item-${item.id}`}
                >
                  <div className="flex w-full items-center gap-2 text-sm font-semibold">
                    <span>{item.title}</span>
                    {selectedSection === item.id && (
                      <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold uppercase text-blue-700 dark:bg-blue-950/60 dark:text-blue-200">
                        {t('settingsPage.badges.current')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </button>
              ))}
            </nav>
          </aside>

          <main
            className="space-y-6"
            data-testid="settings-content"
          >
            {renderSection(selectedSection)}
          </main>
        </div>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          data-testid="header-confirm-overlay"
        >
          <div
            ref={confirmDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            className="w-full max-w-sm rounded-2xl bg-gray-900 p-6 text-center text-gray-100 shadow-2xl shadow-black/40"
            data-testid="header-confirm-dialog"
          >
            <span
              tabIndex={0}
              aria-hidden="true"
              data-focus-guard
              onFocus={onFocusStartGuard}
              className="sr-only"
            />
            <h2
              id="confirm-delete-title"
              className="mb-4 text-lg font-semibold"
            >
              {t('confirmDelete.message')}
            </h2>
            <div className="flex justify-center gap-2">
              <button
                ref={confirmCancelButtonRef}
                onClick={cancelClear}
                className="rounded-lg bg-gray-700 px-4 py-2 font-semibold text-white transition hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                data-testid="header-confirm-cancel"
              >
                {t('confirmDelete.cancel')}
              </button>
              <button
                onClick={confirmClear}
                className="rounded-lg bg-[rgb(184,75,79)] px-4 py-2 font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(184,75,79)]"
                data-testid="header-confirm-delete"
              >
                {t('confirmDelete.delete')}
              </button>
            </div>
            <span
              tabIndex={0}
              aria-hidden="true"
              data-focus-guard
              onFocus={onFocusEndGuard}
              className="sr-only"
            />
          </div>
        </div>
      )}
    </div>
  );
}
