'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../lib/types';
import { useStore } from '../../lib/store';
import { useI18n } from '../../lib/i18n';
import confetti from 'canvas-confetti';
import { playApplause } from '../../lib/sounds';

export interface UseTaskCardProps {
  task: Task;
  dragOverlay?: boolean;
  mode?: 'my-day' | 'kanban';
}

export default function useTaskCard({
  task,
  dragOverlay = false,
}: UseTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: dragOverlay,
  });
  const style = dragOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      };
  const {
    moveTask,
    removeTask,
    toggleMyDay,
    tags: allTags,
    mainMyDayTaskId,
    setMainMyDayTask,
    vsCodeAgentEnabled,
  } = useStore(state => ({
    moveTask: state.moveTask,
    removeTask: state.removeTask,
    toggleMyDay: state.toggleMyDay,
    tags: state.tags,
    mainMyDayTaskId: state.mainMyDayTaskId,
    setMainMyDayTask: state.setMainMyDayTask,
    vsCodeAgentEnabled: state.vsCodeAgentEnabled,
  }));
  const { t } = useI18n();

  const markInProgress = () => {
    if (task.dayStatus !== 'doing') {
      moveTask(task.id, { dayStatus: 'doing' });
    }
  };

  const markDone = () => {
    if (task.dayStatus !== 'done') {
      moveTask(task.id, { dayStatus: 'done' });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      if (mainMyDayTaskId === task.id) {
        playApplause();
      }
    }
  };

  const deleteTask = () => {
    const isRecurringWeeklyTask =
      task.repeat?.frequency === 'weekly' && task.repeat.days.length > 0;

    if (isRecurringWeeklyTask && task.plannedFor) {
      toggleMyDay(task.id);
      return;
    }

    removeTask(task.id);
  };

  const getTagColor = (tagLabel: string) => {
    const tag = allTags.find(t => t.label === tagLabel);
    return tag ? tag.color : '#ccc';
  };

  const toggleMainTask = () => {
    if (!task.plannedFor) {
      return;
    }
    setMainMyDayTask(mainMyDayTaskId === task.id ? null : task.id);
  };

  const openInVsCodeAgent = () => {
    const prompt = [task.title, task.description]
      .map(part => (typeof part === 'string' ? part.trim() : ''))
      .filter(Boolean)
      .join('\n\n');

    if (!prompt) {
      return;
    }

    const url = `vscode://github.copilot-chat?mode=agent&prompt=${encodeURIComponent(
      prompt
    )}`;
    window.location.href = url;
  };

  return {
    state: {
      attributes,
      listeners,
      setNodeRef,
      style,
      t,
      allTags,
      isMainTask: mainMyDayTaskId === task.id,
      isDragging,
      vsCodeAgentEnabled,
    },
    actions: {
      markInProgress,
      markDone,
      getTagColor,
      deleteTask,
      toggleMainTask,
      openInVsCodeAgent,
    },
  } as const;
}
