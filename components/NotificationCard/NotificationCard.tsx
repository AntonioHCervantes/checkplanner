'use client';

import Link from 'next/link';
import { MonitorSmartphone, LayoutTemplate, X } from 'lucide-react';
import { Notification } from '../../lib/types';
import useNotificationCard, {
  type NotificationAction,
} from './useNotificationCard';

interface Props {
  notification: Notification;
}

export default function NotificationCard({ notification }: Props) {
  const {
    state: {
      icon: Icon,
      iconClassName,
      title,
      description,
      dismissLabel,
      isWelcomeNotification,
      actionItems,
    },
    actions: { handleDismiss },
  } = useNotificationCard({ notification });

  const primaryActionClasses =
    'inline-flex items-center justify-center gap-2 rounded bg-[#57886C] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-[#57886C] disabled:cursor-not-allowed disabled:opacity-60';
  const secondaryActionClasses =
    'inline-flex items-center justify-center gap-2 rounded bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus-visible:outline-gray-600';

  const getActionClasses = (action: NotificationAction) => {
    return action.variant === 'primary'
      ? primaryActionClasses
      : secondaryActionClasses;
  };

  const renderActionIcon = (action: NotificationAction) => {
    if (action.icon === 'layout-template') {
      return (
        <LayoutTemplate
          className="h-4 w-4"
          aria-hidden="true"
        />
      );
    }

    if (action.icon === 'monitor-smartphone') {
      return (
        <MonitorSmartphone
          className="h-4 w-4"
          aria-hidden="true"
        />
      );
    }

    return null;
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-700/60">
      {!isWelcomeNotification && (
        <button
          type="button"
          aria-label={dismissLabel}
          title={dismissLabel}
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <X
            className="h-4 w-4"
            aria-hidden="true"
          />
        </button>
      )}
      <div className="flex items-start gap-4">
        <Icon
          className={`mt-1 h-6 w-6 flex-shrink-0 ${iconClassName}`}
          aria-hidden="true"
        />
        <div className="flex-1 space-y-3 pr-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-gray-700 break-words dark:text-gray-200">
            {description}
          </p>
          {actionItems.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-end gap-2">
              {actionItems.map(action => (
                <span
                  key={action.key}
                  className="inline-flex"
                >
                  {action.type === 'button' ? (
                    <button
                      type="button"
                      onClick={action.onClick}
                      disabled={action.disabled}
                      title={action.title}
                      className={getActionClasses(action)}
                    >
                      {renderActionIcon(action)}
                      {action.label}
                    </button>
                  ) : action.type === 'link' ? (
                    <Link
                      href={action.href}
                      className={getActionClasses(action)}
                    >
                      {renderActionIcon(action)}
                      {action.label}
                    </Link>
                  ) : (
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={getActionClasses(action)}
                    >
                      {renderActionIcon(action)}
                      {action.label}
                    </a>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
