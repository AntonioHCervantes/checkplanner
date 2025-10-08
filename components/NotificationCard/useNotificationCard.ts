'use client';

import { useCallback, useMemo } from 'react';
import { AlertTriangle, Info, Lightbulb, type LucideIcon } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { Notification } from '../../lib/types';
import { useStore } from '../../lib/store';
import { getNotificationIconClasses } from '../../lib/notifications';
import { usePwaInstallPrompt } from '../../lib/usePwaInstallPrompt';

export type NotificationAction =
  | {
      key: string;
      type: 'link' | 'external-link';
      href: string;
      label: string;
      variant: 'primary' | 'secondary';
      icon?: 'layout-template';
    }
  | {
      key: string;
      type: 'button';
      label: string;
      variant: 'primary' | 'secondary';
      icon?: 'monitor-smartphone';
      disabled?: boolean;
      title?: string;
      onClick: () => void;
    };

interface Options {
  notification: Notification;
}

export default function useNotificationCard({ notification }: Options) {
  const removeNotification = useStore(state => state.removeNotification);
  const { t } = useI18n();
  const { canInstall, isInstalled, promptInstall } = usePwaInstallPrompt();

  const icon: LucideIcon = useMemo(() => {
    if (notification.type === 'alert') {
      return AlertTriangle;
    }

    if (notification.type === 'tip') {
      return Lightbulb;
    }

    return Info;
  }, [notification.type]);

  const title = notification.title ?? t(notification.titleKey);
  const description =
    notification.description ?? t(notification.descriptionKey);
  const dismissLabel = t('notifications.dismiss');
  const iconClassName = getNotificationIconClasses(notification.type);
  const isWelcomeNotification = notification.id === 'welcome';

  const handleDismiss = useCallback(() => {
    removeNotification(notification.id);
  }, [notification.id, removeNotification]);

  const installDisabled = isInstalled || !canInstall;
  const installTitle = isInstalled
    ? t('notifications.welcome.installInstalled')
    : !canInstall
      ? t('notifications.welcome.installUnavailable')
      : undefined;

  const actionItems: NotificationAction[] = useMemo(() => {
    const items: NotificationAction[] = [];

    if (isWelcomeNotification) {
      items.push({
        key: 'demo',
        type: 'link',
        href: '/demo-templates',
        label: t('notifications.welcome.demoCta'),
        variant: 'secondary',
        icon: 'layout-template',
      });

      items.push({
        key: 'install',
        type: 'button',
        label: t('notifications.welcome.installCta'),
        variant: 'primary',
        icon: 'monitor-smartphone',
        disabled: installDisabled,
        title: installTitle,
        onClick: () => {
          if (!installDisabled) {
            void promptInstall();
          }
        },
      });
    }

    if (notification.actionUrl && notification.actionLabelKey) {
      const baseAction = {
        key: 'action',
        label: t(notification.actionLabelKey),
        variant: 'primary' as const,
      };

      if (notification.actionUrl.startsWith('/')) {
        items.push({
          ...baseAction,
          type: 'link',
          href: notification.actionUrl,
        });
      } else {
        items.push({
          ...baseAction,
          type: 'external-link',
          href: notification.actionUrl,
        });
      }
    }

    return items;
  }, [
    installDisabled,
    installTitle,
    isWelcomeNotification,
    notification.actionLabelKey,
    notification.actionUrl,
    promptInstall,
    t,
  ]);

  return {
    state: {
      icon,
      iconClassName,
      title,
      description,
      dismissLabel,
      isWelcomeNotification,
      actionItems,
    },
    actions: {
      handleDismiss,
    },
  } as const;
}
