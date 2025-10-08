'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import useDialogFocusTrap from '../../lib/useDialogFocusTrap';

interface Options {
  hasTasks: boolean;
  tagToRemove: string | null;
  cancelRemoveTag: () => void;
}

export default function useTasksViewLayout({
  hasTasks,
  tagToRemove,
  cancelRemoveTag,
}: Options) {
  const [showMobileAddTask, setShowMobileAddTask] = useState(!hasTasks);
  const confirmDialogRef = useRef<HTMLDivElement | null>(null);
  const confirmCancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmDeleteTitleId = useId();
  const confirmDeleteDescriptionId = useId();

  useEffect(() => {
    if (!hasTasks) {
      setShowMobileAddTask(true);
    }
  }, [hasTasks]);

  useEffect(() => {
    if (!tagToRemove) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelRemoveTag();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [tagToRemove, cancelRemoveTag]);

  const showMobileForm = useCallback(() => {
    setShowMobileAddTask(true);
  }, []);

  const { onFocusStartGuard, onFocusEndGuard } = useDialogFocusTrap(
    Boolean(tagToRemove),
    confirmDialogRef,
    { initialFocusRef: confirmCancelButtonRef }
  );

  return {
    state: {
      showMobileAddTask,
      confirmDialogRef,
      confirmCancelButtonRef,
      confirmDeleteTitleId,
      confirmDeleteDescriptionId,
    },
    actions: {
      showMobileForm,
      onFocusStartGuard,
      onFocusEndGuard,
    },
  } as const;
}
