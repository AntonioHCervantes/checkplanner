'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../lib/store';

export default function AppReadyMarker() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    const markReady = () => {
      setReady(true);
    };

    if (typeof window !== 'undefined') {
      markReady();
      unsub = useStore.subscribe(markReady);
    }

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <div
      data-testid="app-ready"
      style={{ display: 'none' }}
    />
  );
}
