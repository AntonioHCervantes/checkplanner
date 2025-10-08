'use client';

import { useCallback, useState } from 'react';

export default function useAccordion(initialIndex: number | null = null) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialIndex);

  const toggle = useCallback((index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  }, []);

  return {
    state: {
      openIndex,
    },
    actions: {
      toggle,
    },
  } as const;
}
