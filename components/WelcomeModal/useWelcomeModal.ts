'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../../lib/store';
import useDialogFocusTrap from '../../lib/useDialogFocusTrap';

export default function useWelcomeModal() {
  const [open, setOpen] = useState(false);
  const tasks = useStore(state => state.tasks);
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const primaryButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const seen =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('welcomeSeen')
        : null;

    if (!seen && tasks.length === 0) {
      setOpen(true);
    }
  }, [tasks]);

  const handleClose = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('welcomeSeen', '1');
    }
    setOpen(false);
    router.push('/my-tasks');
  }, [router]);

  const checklistItems = [1, 2, 3, 4, 5] as const;

  const { onFocusStartGuard, onFocusEndGuard } = useDialogFocusTrap(
    open,
    dialogRef,
    {
      initialFocusRef: primaryButtonRef,
    }
  );

  return {
    state: {
      open,
      checklistItems,
      dialogRef,
      primaryButtonRef,
    },
    actions: {
      handleClose,
      onFocusStartGuard,
      onFocusEndGuard,
    },
  } as const;
}
