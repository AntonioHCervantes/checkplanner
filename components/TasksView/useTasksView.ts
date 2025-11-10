'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../../lib/store';
import { loadState } from '../../lib/storage';
import { Priority } from '../../lib/types';

const ALL_TAB = 'all';

export default function useTasksView() {
  const store = useStore();
  const [activeTab, setActiveTab] = useState<string>(ALL_TAB);
  const [tagToRemove, setTagToRemove] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (store.tags.length === 0) {
      const persisted = loadState();
      persisted?.tags?.forEach(tag => store.addTag(tag));
    }
  }, [store]);

  useEffect(() => {
    setActiveTab(prev => {
      const labels = store.tags.map(t => t.label);
      const favoriteTag = store.tags.find(tag => tag.favorite);
      if (prev !== ALL_TAB && !labels.includes(prev)) {
        return favoriteTag?.label ?? ALL_TAB;
      }
      if (!hasInteractedRef.current && favoriteTag && prev === ALL_TAB) {
        return favoriteTag.label;
      }
      return prev;
    });
  }, [store.tags]);

  const toggleTagFilter = (label: string) => {
    hasInteractedRef.current = true;
    setActiveTab(label);
  };

  const resetTagFilter = () => {
    hasInteractedRef.current = true;
    setActiveTab(ALL_TAB);
  };

  const removeTag = (label: string) => {
    const isUsed = store.tasks.some(task => task.tags.includes(label));
    if (isUsed) {
      setTagToRemove(label);
      return;
    }
    store.removeTag(label);
    setActiveTab(prev => {
      if (prev === label) {
        const favoriteTag = store.tags.find(
          tag => tag.label !== label && tag.favorite
        );
        if (favoriteTag) {
          return favoriteTag.label;
        }
        return ALL_TAB;
      }
      return prev;
    });
  };

  const confirmRemoveTag = () => {
    if (!tagToRemove) return;
    store.removeTag(tagToRemove);
    setActiveTab(prev => {
      if (prev === tagToRemove) {
        const favoriteTag = store.tags.find(
          tag => tag.label !== tagToRemove && tag.favorite
        );
        if (favoriteTag) {
          return favoriteTag.label;
        }
        return ALL_TAB;
      }
      return prev;
    });
    setTagToRemove(null);
  };

  const cancelRemoveTag = () => setTagToRemove(null);

  const filteredTasks = useMemo(() => {
    if (activeTab === ALL_TAB) {
      return store.tasks;
    }
    return store.tasks.filter(task => task.tags.includes(activeTab));
  }, [store.tasks, activeTab]);

  const orderedTasks = useMemo(() => {
    const ids = [
      ...(store.order['priority-high'] || []),
      ...(store.order['priority-medium'] || []),
      ...(store.order['priority-low'] || []),
    ];
    const map = new Map(filteredTasks.map(t => [t.id, t]));
    const list = ids
      .map(id => map.get(id))
      .filter((t): t is (typeof filteredTasks)[number] => !!t);
    const remaining = filteredTasks.filter(t => !ids.includes(t.id));
    return [...list, ...remaining];
  }, [filteredTasks, store.order]);

  const hasTasks = store.tasks.length > 0;
  const isFiltering = activeTab !== ALL_TAB;

  return {
    state: {
      tasks: orderedTasks,
      tags: store.tags,
      activeTag: activeTab,
      tagToRemove,
      highlightedId,
      hasTasks,
      isFiltering,
    },
    actions: {
      addTask: (input: {
        title: string;
        tags: string[];
        priority: Priority;
      }) => {
        const id = store.addTask(input);
        setHighlightedId(id);
        setTimeout(() => setHighlightedId(null), 3000);
        return id;
      },
      addTag: store.addTag,
      toggleTagFilter,
      resetTagFilter,
      removeTag,
      toggleFavoriteTag: store.toggleFavoriteTag,
      confirmRemoveTag,
      cancelRemoveTag,
    },
  } as const;
}
