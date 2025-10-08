'use client';

import { Check } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import useWelcomeModal from './useWelcomeModal';

export default function WelcomeModal() {
  const {
    state: { open, checklistItems, dialogRef, primaryButtonRef },
    actions: { handleClose, onFocusStartGuard, onFocusEndGuard },
  } = useWelcomeModal();
  const { t } = useI18n();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        className="w-full max-w-md rounded-lg bg-white p-6 text-gray-900 shadow-lg dark:bg-gray-800 dark:text-gray-100"
      >
        <span
          tabIndex={0}
          aria-hidden="true"
          data-focus-guard
          onFocus={onFocusStartGuard}
          className="sr-only"
        />
        <h2
          id="welcome-modal-title"
          className="mb-4 text-2xl font-bold"
        >
          {t('welcomeModal.title')}
        </h2>
        <ul className="mb-6 space-y-2">
          {checklistItems.map(n => (
            <li
              key={n}
              className="flex items-start gap-2"
            >
              <Check className="h-5 w-5 flex-shrink-0 text-green-600" />
              <span>{t(`welcomeModal.p${n}`)}</span>
            </li>
          ))}
        </ul>
        <button
          ref={primaryButtonRef}
          onClick={handleClose}
          className="w-full rounded bg-[#57886C] px-4 py-2 text-white hover:brightness-110 focus:ring"
        >
          {t('welcomeModal.cta')}
        </button>
        <span
          tabIndex={0}
          aria-hidden="true"
          data-focus-guard
          onFocus={onFocusEndGuard}
          className="sr-only"
        />
      </div>
    </div>
  );
}
