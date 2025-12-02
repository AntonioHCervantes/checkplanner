import { act, renderHook } from '@testing-library/react';
import useTasksView from '../useTasksView';
import { useStore } from '../../../lib/store';

describe('useTasksView', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    useStore.getState().clearAll();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('activates the last tag of a newly added task', () => {
    useStore.getState().addTag({
      id: 'tag-work',
      label: 'work',
      color: '#000000',
      favorite: false,
    });
    const { result } = renderHook(() => useTasksView());

    act(() => {
      result.current.actions.addTask({
        title: 'Review PR',
        tags: ['work'],
        priority: 'medium',
      });
      jest.runAllTimers();
    });

    expect(result.current.state.activeTag).toBe('work');
  });

  it('resets to all when adding a task without tags', () => {
    useStore.getState().addTag({
      id: 'tag-home',
      label: 'home',
      color: '#111111',
      favorite: false,
    });
    const { result } = renderHook(() => useTasksView());

    act(() => {
      result.current.actions.toggleTagFilter('home');
    });

    act(() => {
      result.current.actions.addTask({
        title: 'Plan weekend',
        tags: [],
        priority: 'low',
      });
      jest.runAllTimers();
    });

    expect(result.current.state.activeTag).toBe('all');
  });
});
