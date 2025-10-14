'use client';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { Play, Pause } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { useStore, DEFAULT_TIMER_DURATION } from '../../lib/store';

const options = [
  { label: '5m', value: 5 * 60 },
  { label: '15m', value: 15 * 60 },
  { label: '30m', value: 30 * 60 },
  { label: '1h', value: 60 * 60 },
];

interface TimerProps {
  taskId: string;
  'data-testid'?: string;
}

export default function Timer({ taskId, 'data-testid': testId }: TimerProps) {
  const timer = useStore(state => state.timers[taskId]);
  const setTimerDuration = useStore(state => state.setTimerDuration);
  const toggleTimer = useStore(state => state.toggleTimer);
  const { t } = useI18n();
  const duration = timer?.duration ?? DEFAULT_TIMER_DURATION;
  const timeLeft = timer?.remaining ?? duration;
  const running = timer?.running ?? false;

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDuration = Number(e.target.value);
    setTimerDuration(taskId, newDuration);
  };

  const toggle = () => {
    toggleTimer(taskId);
  };

  const handleControlKeyDown = (
    event: KeyboardEvent<HTMLSelectElement | HTMLButtonElement>
  ) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.stopPropagation();
    }
  };

  const progress = Math.min(
    100,
    Math.max(0, duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0)
  );

  return (
    <div
      className="mt-2 flex items-center gap-2"
      data-testid={testId ?? 'task-timer'}
    >
      <select
        value={duration}
        onChange={handleDurationChange}
        onKeyDown={handleControlKeyDown}
        className="rounded bg-gray-200 p-1 text-sm dark:bg-gray-700"
        data-testid="task-timer-duration"
      >
        {options.map(o => (
          <option
            key={o.value}
            value={o.value}
          >
            {o.label}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-1">
        <button
          onClick={toggle}
          aria-label={running ? t('timer.pause') : t('timer.start')}
          title={running ? t('timer.pause') : t('timer.start')}
          className="rounded bg-blue-500 p-1 text-white hover:brightness-110 focus:ring"
          onKeyDown={handleControlKeyDown}
          data-testid="task-timer-toggle"
        >
          {running ? (
            <Pause
              className="h-4 w-4"
              data-testid="task-timer-pause-icon"
            />
          ) : (
            <Play
              className="h-4 w-4"
              data-testid="task-timer-play-icon"
            />
          )}
        </button>
        <span
          className="w-12 text-right text-xs"
          data-testid="task-timer-remaining"
        >
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </span>
      </div>
      <div
        className="h-2 flex-1 rounded bg-gray-300 dark:bg-gray-700"
        data-testid="task-timer-progress"
      >
        <div
          className="h-2 rounded bg-blue-500 dark:bg-blue-400"
          style={{ width: `${progress}%` }}
          data-testid="task-timer-progress-bar"
        />
      </div>
    </div>
  );
}
