import { useStore } from '../../../lib/store';
import { playTimerFinishedSound } from './timerSound';
import {
  buildTimerFinishedNotification,
  getTimerTaskTitle,
  type Translate,
} from './timerNotifications';

type StoreState = ReturnType<typeof useStore.getState>;

export function handleTimerTick(state: StoreState, t: Translate) {
  const now = Date.now();

  Object.entries(state.timers).forEach(([taskId, timer]) => {
    if (!timer.running || !timer.endsAt) {
      return;
    }

    const endsAt = new Date(timer.endsAt).getTime();
    if (Number.isNaN(endsAt)) {
      state.completeTimer(taskId);
      return;
    }

    const remaining = Math.max(0, Math.ceil((endsAt - now) / 1000));

    if (remaining <= 0) {
      state.completeTimer(taskId);
      const task = state.tasks.find(currentTask => currentTask.id === taskId);
      const taskTitle = getTimerTaskTitle(task, t);
      state.addNotification(
        buildTimerFinishedNotification(taskId, taskTitle, t)
      );
      playTimerFinishedSound();
      return;
    }

    if (remaining !== timer.remaining) {
      state.updateTimerRemaining(taskId, remaining);
    }
  });
}
