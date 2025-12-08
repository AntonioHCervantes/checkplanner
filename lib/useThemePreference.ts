'use client';

import { useEffect, useState } from 'react';

type ThemePreference = 'light' | 'dark';

function applyTheme(next: ThemePreference) {
  document.documentElement.classList.toggle('dark', next === 'dark');
  localStorage.setItem('theme', next);
}

export function useThemePreference() {
  const [theme, setTheme] = useState<ThemePreference>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
      return;
    }

    document.documentElement.classList.add('dark');
  }, []);

  const setThemePreference = (next: ThemePreference) => {
    setTheme(next);
    applyTheme(next);
  };

  const toggleTheme = () => {
    setTheme(current => {
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  };

  return {
    theme,
    setThemePreference,
    toggleTheme,
  } as const;
}
