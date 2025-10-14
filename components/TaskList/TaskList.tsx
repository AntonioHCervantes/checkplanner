'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskItem from '../TaskItem/TaskItem';
import { useI18n } from '../../lib/i18n';
import useTaskList, { UseTaskListProps } from './useTaskList';
import NoTasksIllustration from './NoTasksIllustration';

interface TaskListProps extends UseTaskListProps {
  highlightedId?: string | null;
  hasTasks: boolean;
  isFiltering: boolean;
  'data-testid'?: string;
}

export default function TaskList({
  tasks,
  highlightedId,
  hasTasks,
  isFiltering,
  'data-testid': testId,
}: TaskListProps) {
  const { state, actions } = useTaskList({ tasks });
  const { sensors } = state;
  const { handleDragEnd } = actions;
  const [myDayHelpTaskId, setMyDayHelpTaskId] = useState<string | null>(null);
  const [showMyDayHelp, setShowMyDayHelp] = useState(false);
  const showHelpDelayRef = useRef<number | null>(null);
  const previousLengthRef = useRef(tasks.length);
  const hasShownHelpRef = useRef(false);
  const hideMyDayHelp = useCallback(() => {
    if (showHelpDelayRef.current !== null) {
      window.clearTimeout(showHelpDelayRef.current);
      showHelpDelayRef.current = null;
    }
    setShowMyDayHelp(false);
    setMyDayHelpTaskId(null);
  }, []);

  useEffect(() => {
    const previousLength = previousLengthRef.current;
    if (
      !hasShownHelpRef.current &&
      tasks.length === 1 &&
      previousLength === 0
    ) {
      const [firstTask] = tasks;
      if (firstTask) {
        let shouldShowHelp = true;

        if (typeof window !== 'undefined') {
          try {
            const hasSeenTooltip = window.localStorage.getItem('myDayHelpSeen');
            if (hasSeenTooltip) {
              shouldShowHelp = false;
            } else {
              window.localStorage.setItem('myDayHelpSeen', 'true');
            }
          } catch {
            // Ignore storage access issues
          }
        }

        if (shouldShowHelp) {
          setMyDayHelpTaskId(firstTask.id);
          if (showHelpDelayRef.current !== null) {
            window.clearTimeout(showHelpDelayRef.current);
          }
          showHelpDelayRef.current = window.setTimeout(() => {
            setShowMyDayHelp(true);
            showHelpDelayRef.current = null;
          }, 3000);
        }

        hasShownHelpRef.current = true;
      }
    }

    if (tasks.length === 0) {
      hideMyDayHelp();
    }

    previousLengthRef.current = tasks.length;
  }, [tasks, hideMyDayHelp]);

  useEffect(() => {
    return () => {
      if (showHelpDelayRef.current !== null) {
        window.clearTimeout(showHelpDelayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showMyDayHelp) {
      return;
    }

    const timeout = window.setTimeout(() => {
      hideMyDayHelp();
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [showMyDayHelp, hideMyDayHelp]);

  useEffect(() => {
    if (!showMyDayHelp || !myDayHelpTaskId) {
      return;
    }

    if (!tasks.some(task => task.id === myDayHelpTaskId)) {
      hideMyDayHelp();
    }
  }, [tasks, showMyDayHelp, myDayHelpTaskId, hideMyDayHelp]);

  const { t } = useI18n();
  const emptyMessageKey =
    !hasTasks && !isFiltering ? 'taskList.noTasksIntro' : 'taskList.noTasks';
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="space-y-2 p-4"
          data-testid={testId ?? 'task-list'}
        >
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              taskId={task.id}
              highlighted={task.id === highlightedId}
              showMyDayHelp={showMyDayHelp && task.id === myDayHelpTaskId}
              onCloseMyDayHelp={hideMyDayHelp}
              data-testid="task-list-item"
            />
          ))}
          {tasks.length === 0 && (
            <div
              className="flex flex-col items-center"
              data-testid="task-list-empty"
            >
              <p
                className="text-center text-sm text-gray-500 dark:text-gray-400"
                data-testid="task-list-empty-message"
              >
                {t(emptyMessageKey)}
              </p>
              <NoTasksIllustration
                className="mt-2 text-gray-400 dark:text-gray-500"
                data-testid="task-list-empty-illustration"
              />
              {!hasTasks && !isFiltering && (
                <Link
                  href="/demo-templates"
                  className="mt-4 inline-flex items-center rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                  data-testid="task-list-empty-templates"
                >
                  {t('taskList.exploreDemoTemplates')}
                </Link>
              )}
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
