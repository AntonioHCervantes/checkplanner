'use client';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Sun,
  Moon,
  Settings,
  Bell,
  AlertTriangle,
  Info,
  Lightbulb,
} from 'lucide-react';
import { getNotificationIconClasses } from '../../lib/notifications';
import Icon from '../Icon/Icon';
import useHeader from './useHeader';

export default function Header() {
  const { state, actions } = useHeader();
  const {
    theme,
    t,
    myDayCount,
    unreadNotifications,
    latestUnreadNotification,
  } = state;
  const { toggleTheme } = actions;
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);
  const [lastNotificationId, setLastNotificationId] = useState<string | null>(
    null
  );
  const headerRef = useRef<HTMLElement | null>(null);
  const bellRef = useRef<HTMLAnchorElement | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);
  const pathname = usePathname();
  const popoverTitle = useMemo(() => {
    if (!latestUnreadNotification) {
      return '';
    }
    return (
      latestUnreadNotification.title ?? t(latestUnreadNotification.titleKey)
    );
  }, [latestUnreadNotification, t]);
  const popoverDescription = useMemo(() => {
    if (!latestUnreadNotification) {
      return '';
    }
    const description =
      latestUnreadNotification.description ??
      t(latestUnreadNotification.descriptionKey);
    return description.length > 80
      ? `${description.slice(0, 77)}...`
      : description;
  }, [latestUnreadNotification, t]);
  const NotificationIcon =
    latestUnreadNotification?.type === 'alert'
      ? AlertTriangle
      : latestUnreadNotification?.type === 'tip'
        ? Lightbulb
        : Info;

  const updatePopoverPosition = useCallback(() => {
    if (!bellRef.current) {
      return;
    }
    const rect = bellRef.current.getBoundingClientRect();
    const headerRect = headerRef.current?.getBoundingClientRect();
    setPopoverPosition({
      top: headerRect?.bottom ?? rect.bottom,
      right: Math.max(0, window.innerWidth - (rect.left + rect.width)),
    });
  }, []);

  useEffect(() => {
    if (!latestUnreadNotification) {
      setShowNotificationPopover(false);
      return;
    }
    if (latestUnreadNotification.id !== lastNotificationId) {
      setLastNotificationId(latestUnreadNotification.id);
      setShowNotificationPopover(true);
    }
  }, [latestUnreadNotification, lastNotificationId]);

  useEffect(() => {
    if (!showNotificationPopover) {
      setPopoverPosition(null);
      return;
    }
    updatePopoverPosition();
    const handleReposition = () => {
      updatePopoverPosition();
    };
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition);
    const timeout = window.setTimeout(() => {
      setShowNotificationPopover(false);
    }, 5000);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition);
    };
  }, [showNotificationPopover, lastNotificationId, updatePopoverPosition]);

  return (
    <>
      <header
        ref={headerRef}
        className="relative grid grid-cols-3 items-center bg-gray-100 px-2 py-2 dark:bg-gray-950 md:px-4 md:py-3 lg:py-4"
        data-testid="app-header"
      >
        <div
          className="flex items-center gap-2"
          data-testid="header-brand"
        >
          <Icon />
          <span className="hidden text-lg font-semibold text-black dark:text-white sm:inline">
            CheckPlanner
          </span>
        </div>
        <nav
          className="flex h-full items-center justify-center gap-4"
          data-testid="header-nav"
        >
          <Link
            href="/my-day"
            className={`relative flex h-full min-w-[80px] items-center justify-center whitespace-nowrap no-underline hover:no-underline focus:no-underline ${
              pathname === '/my-day'
                ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black dark:after:bg-white'
                : ''
            }`}
            data-testid="nav-link-my-day"
          >
            {t('nav.myDay')}
            <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-current dark:bg-[rgb(62,74,113)]">
              {myDayCount}
            </span>
          </Link>
          <Link
            href="/my-tasks"
            className={`relative flex h-full min-w-[80px] items-center justify-center whitespace-nowrap no-underline hover:no-underline focus:no-underline ${
              pathname === '/my-tasks'
                ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black dark:after:bg-white'
                : ''
            }`}
            data-testid="nav-link-my-tasks"
          >
            {t('nav.myTasks')}
          </Link>
        </nav>
        <div className="flex items-center justify-self-end gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={toggleTheme}
              aria-label={t('actions.toggleTheme')}
              title={t('actions.toggleTheme')}
              className="rounded p-2 hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              data-testid="theme-toggle-button"
            >
              {theme === 'dark' ? (
                <Sun
                  className="h-4 w-4"
                  data-testid="theme-icon-sun"
                />
              ) : (
                <Moon
                  className="h-4 w-4"
                  data-testid="theme-icon-moon"
                />
              )}
            </button>
          </div>
          <Link
            href="/notifications"
            aria-label={t('actions.notifications')}
            title={t('actions.notifications')}
            className="relative rounded p-2 hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
            ref={bellRef}
            data-testid="header-notifications"
          >
            <Bell
              className="h-4 w-4"
              data-testid="header-notifications-icon"
            />
            {unreadNotifications > 0 && (
              <span className="absolute -right-1 -top-1 min-w-[16px] rounded-full bg-red-500 px-1 text-center text-[10px] leading-4 text-white">
                {unreadNotifications}
              </span>
            )}
          </Link>
          {showNotificationPopover &&
            latestUnreadNotification &&
            popoverPosition && (
              <Link
                href="/notifications"
                onClick={() => setShowNotificationPopover(false)}
                className="fixed z-30 w-[min(92vw,22rem)] translate-y-2 rounded-2xl border border-slate-200/80 bg-white/95 px-6 py-5 text-left shadow-2xl shadow-slate-900/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700/70 dark:bg-slate-900/95 dark:text-slate-100 dark:shadow-black/30 dark:focus-visible:ring-offset-slate-900"
                style={{
                  top: popoverPosition.top,
                  right: popoverPosition.right,
                }}
                data-testid="header-notifications-popover"
              >
                <div className="flex items-start gap-4">
                  <NotificationIcon
                    className={`mt-1 h-6 w-6 flex-shrink-0 ${getNotificationIconClasses(latestUnreadNotification.type)}`}
                    data-testid="header-notifications-popover-icon"
                  />
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {popoverTitle}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                      {popoverDescription}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          <Link
            href="/settings"
            aria-label={t('actions.settings')}
            title={t('actions.settings')}
            className="rounded p-2 hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
            data-testid="header-settings"
          >
            <Settings
              className="h-4 w-4"
              data-testid="header-settings-icon"
            />
          </Link>
        </div>
      </header>
    </>
  );
}
