'use client';

import { useEffect, useState } from 'react';

type ThemePreference = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

function applyTheme(next: ThemePreference) {
  document.documentElement.classList.toggle('dark', next === 'dark');
  localStorage.setItem(THEME_STORAGE_KEY, next);
}

const getSystemTheme = (): ThemePreference => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getInitialTheme = (): ThemePreference => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return getSystemTheme();
};

export function useThemePreference() {
  const [theme, setTheme] = useState<ThemePreference>('dark');

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event: MediaQueryListEvent) => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return;
      }

      const next = event.matches ? 'dark' : 'light';
      setTheme(next);
      applyTheme(next);
    };

    mediaQuery.addEventListener('change', handleSystemChange);

    return () => mediaQuery.removeEventListener('change', handleSystemChange);
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
