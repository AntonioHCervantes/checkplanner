import { useEffect } from 'react';
import { useI18n } from '../../lib/i18n';
import { useStore } from '../../lib/store';
import { handleTimerTick } from './_helpers/handleTimerTick';

export function useTaskTimerManager() {
  const { t } = useI18n();

  useEffect(() => {
    const interval = setInterval(() => {
      const state = useStore.getState();
      handleTimerTick(state, t);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [t]);
}
