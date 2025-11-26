'use client';
import { useCallback } from 'react';
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Task } from '../../lib/types';
import { useStore } from '../../lib/store';

export interface UseTaskListProps {
  tasks: Task[];
}

export default function useTaskList({ tasks: _tasks }: UseTaskListProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const { reorderMyTasks, order } = useStore(state => ({
    reorderMyTasks: state.reorderMyTasks,
    order: state.order,
  }));

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;
      if (active.id === over.id) return;
      const priorityOrder = [
        ...(order['priority-high'] || []),
        ...(order['priority-medium'] || []),
        ...(order['priority-low'] || []),
      ];

      const activeId = active.id as string;
      const overId = over.id as string;
      const newIndex = priorityOrder.indexOf(overId);

      if (newIndex === -1) return;

      reorderMyTasks(activeId, newIndex);
    },
    [order, reorderMyTasks]
  );

  return { state: { sensors }, actions: { handleDragEnd } } as const;
}
